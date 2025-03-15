import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function GET() {
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
    
    // Get all models for the user
    const { data: modelsData, error: modelsError } = await supabase
      .from('models')
      .select('*')
      .eq('user_id', userData.id)
      .order('created_at', { ascending: false });
    
    if (modelsError) {
      console.error('Error fetching models data:', modelsError);
      return NextResponse.json({ error: 'Failed to fetch models' }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      models: modelsData,
    });
  } catch (error) {
    console.error('Error in models API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 