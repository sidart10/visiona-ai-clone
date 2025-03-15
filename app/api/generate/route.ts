import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import replicate from '@/lib/replicate';
import openai from '@/lib/openai';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get user data from Supabase
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id')
      .eq('clerk_id', userId)
      .single();
    
    if (userError || !userData) {
      console.error('Error fetching user data:', userError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    // Check daily generation quota
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    
    const { data: generationsData } = await supabase
      .from('generations')
      .select('id')
      .eq('user_id', userData.id)
      .gte('created_at', today.toISOString());
    
    // Check if user has premium subscription
    const { data: paymentData } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userData.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    const isPremium = !!paymentData;
    const dailyLimit = isPremium ? 100 : 20;
    
    // Check if user has reached daily generation limit
    if (generationsData && generationsData.length >= dailyLimit) {
      return NextResponse.json({ error: 'Daily generation limit reached. Upgrade to premium for more generations.' }, { status: 403 });
    }
    
    const body = await request.json();
    const { modelId, prompt, enhancePrompt, imageCount = 1, guidanceScale = 7.5, aspectRatio = '1:1' } = body;
    
    if (!modelId || !prompt) {
      return NextResponse.json({ error: 'Model ID and prompt are required' }, { status: 400 });
    }
    
    // Get the model from Supabase
    const { data: modelData, error: modelError } = await supabase
      .from('models')
      .select('*')
      .eq('id', modelId)
      .eq('user_id', userData.id)
      .single();
    
    if (modelError || !modelData) {
      console.error('Error fetching model data:', modelError);
      return NextResponse.json({ error: 'Model not found' }, { status: 404 });
    }
    
    // Check if model is ready
    if (modelData.status !== 'Ready') {
      return NextResponse.json({ error: 'Model is not ready for generation' }, { status: 400 });
    }
    
    // Enhance prompt with OpenAI if requested
    let finalPrompt = prompt;
    let enhancedPrompt = null;
    
    if (enhancePrompt) {
      try {
        const response = await openai.chat.completions.create({
          model: 'gpt-4o',
          messages: [
            {
              role: 'system',
              content: 'You are an expert at enhancing image generation prompts. Your task is to take a basic prompt and make it more detailed and effective for AI image generation. Focus on adding details about lighting, composition, style, and other visual elements. Keep the original intent of the prompt intact.',
            },
            {
              role: 'user',
              content: `Enhance this image generation prompt: "${prompt}"`,
            },
          ],
          max_tokens: 200,
        });
        
        enhancedPrompt = response.choices[0].message.content;
        finalPrompt = enhancedPrompt || prompt;
      } catch (error) {
        console.error('Error enhancing prompt:', error);
        // Continue with original prompt if enhancement fails
      }
    }
    
    // Set dimensions based on aspect ratio
    let width = 512;
    let height = 512;
    
    switch (aspectRatio) {
      case '4:3':
        width = 512;
        height = 384;
        break;
      case '3:4':
        width = 384;
        height = 512;
        break;
      case '16:9':
        width = 512;
        height = 288;
        break;
      case '9:16':
        width = 288;
        height = 512;
        break;
      default:
        width = 512;
        height = 512;
    }
    
    // Generate images with Replicate
    const prediction = await replicate.predictions.create({
      version: modelData.model_id,
      input: {
        prompt: finalPrompt,
        negative_prompt: 'blurry, distorted, low quality, unrealistic, pixelated',
        num_outputs: imageCount,
        guidance_scale: guidanceScale,
        width,
        height,
      },
    });
    
    // Wait for prediction to complete
    const result = await replicate.wait(prediction);
    
    // Store generated images in Supabase
    const generatedImages = [];
    
    for (const imageUrl of result.output) {
      // Store the image in Supabase
      const { data: generationData, error: generationError } = await supabase
        .from('generations')
        .insert([
          {
            user_id: userData.id,
            model_id: modelId,
            prompt,
            enhanced_prompt: enhancedPrompt,
            image_url: imageUrl,
          },
        ])
        .select()
        .single();
      
      if (generationError) {
        console.error('Error storing generation data:', generationError);
        continue;
      }
      
      generatedImages.push(generationData);
    }
    
    // Log the generation action
    await supabase.from('audit_logs').insert([
      {
        user_id: userData.id,
        action: 'image_generation',
        details: {
          model_id: modelId,
          prompt,
          enhanced_prompt: enhancedPrompt,
          image_count: imageCount,
          generated_images: generatedImages.map(img => img.id),
        },
      },
    ]);
    
    return NextResponse.json({
      success: true,
      images: generatedImages,
    });
  } catch (error) {
    console.error('Error in image generation API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 