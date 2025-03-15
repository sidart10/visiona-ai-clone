import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import replicate from '@/lib/replicate';

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
    
    // Check user quota
    const { data: modelsData } = await supabase
      .from('models')
      .select('id')
      .eq('user_id', userData.id);
    
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
    
    // Check if user has reached model limit
    if (!isPremium && modelsData && modelsData.length >= 5) {
      return NextResponse.json({ error: 'Model limit reached. Upgrade to premium for unlimited models.' }, { status: 403 });
    }
    
    const body = await request.json();
    const { triggerWord, modelName } = body;
    
    if (!triggerWord || !modelName) {
      return NextResponse.json({ error: 'Trigger word and model name are required' }, { status: 400 });
    }
    
    // Get user's photos
    const { data: photos, error: photosError } = await supabase
      .from('photos')
      .select('file_url')
      .eq('user_id', userData.id);
    
    if (photosError || !photos || photos.length < 5) {
      return NextResponse.json({ error: 'At least 5 photos are required for training' }, { status: 400 });
    }
    
    // Extract photo URLs
    const photoUrls = photos.map(photo => photo.file_url);
    
    // Start training on Replicate
    const training = await replicate.trainings.create({
      input: {
        input_images: photoUrls,
        trigger_word: triggerWord,
        // Additional parameters for Flux LoRA trainer
        train_batch_size: 1,
        num_train_epochs: 4000,
        learning_rate: 1e-4,
        resolution: 512,
        mixed_precision: "fp16",
      },
      model: "flux-lora",
    });
    
    // Store training job in Supabase
    const { data: modelData, error: modelError } = await supabase
      .from('models')
      .insert([
        {
          user_id: userData.id,
          model_id: training.id,
          trigger_word: triggerWord,
          status: 'Processing',
          parameters: {
            train_batch_size: 1,
            num_train_epochs: 4000,
            learning_rate: 1e-4,
            resolution: 512,
            mixed_precision: "fp16",
          },
        },
      ])
      .select()
      .single();
    
    if (modelError) {
      console.error('Error storing model data:', modelError);
      return NextResponse.json({ error: 'Failed to store model data' }, { status: 500 });
    }
    
    // Log the training action
    await supabase.from('audit_logs').insert([
      {
        user_id: userData.id,
        action: 'model_training_started',
        details: {
          model_id: modelData.id,
          replicate_id: training.id,
          trigger_word: triggerWord,
        },
      },
    ]);
    
    return NextResponse.json({
      success: true,
      model: modelData,
      trainingId: training.id,
    });
  } catch (error) {
    console.error('Error in model training API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 