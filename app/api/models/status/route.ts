import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import replicate from '@/lib/replicate';

export async function GET(request: Request) {
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
    
    // Get the model ID from the query parameters
    const url = new URL(request.url);
    const modelId = url.searchParams.get('modelId');
    
    if (!modelId) {
      return NextResponse.json({ error: 'Model ID is required' }, { status: 400 });
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
    
    // Check the training status on Replicate
    const training = await replicate.trainings.get(modelData.model_id);
    
    // Update the model status in Supabase
    let status = modelData.status;
    
    if (training.status === 'succeeded') {
      status = 'Ready';
    } else if (training.status === 'failed') {
      status = 'Failed';
    } else {
      status = 'Processing';
    }
    
    // Update the model status in Supabase if it has changed
    if (status !== modelData.status) {
      await supabase
        .from('models')
        .update({ status })
        .eq('id', modelId)
        .eq('user_id', userData.id);
      
      // Log the status change
      await supabase.from('audit_logs').insert([
        {
          user_id: userData.id,
          action: 'model_status_changed',
          details: {
            model_id: modelId,
            replicate_id: modelData.model_id,
            old_status: modelData.status,
            new_status: status,
          },
        },
      ]);
    }
    
    return NextResponse.json({
      success: true,
      model: {
        ...modelData,
        status,
      },
      training: {
        status: training.status,
        progress: training.progress,
        error: training.error,
      },
    });
  } catch (error) {
    console.error('Error in model status API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 