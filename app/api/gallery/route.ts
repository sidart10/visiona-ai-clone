import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
    
    // Get the page and limit from the query parameters
    const url = new URL(request.url);
    const page = parseInt(url.searchParams.get('page') || '1');
    const limit = parseInt(url.searchParams.get('limit') || '20');
    const offset = (page - 1) * limit;
    
    // Get all generations for the user
    const { data: generationsData, error: generationsError } = await supabase
      .from('generations')
      .select('*, models(trigger_word)')
      .eq('user_id', userData.id)
      .order('created_at', { ascending: false })
      .range(offset, offset + limit - 1);
    
    if (generationsError) {
      console.error('Error fetching generations data:', generationsError);
      return NextResponse.json({ error: 'Failed to fetch gallery' }, { status: 500 });
    }
    
    // Get the total count of generations
    const { count, error: countError } = await supabase
      .from('generations')
      .select('id', { count: 'exact' })
      .eq('user_id', userData.id);
    
    if (countError) {
      console.error('Error fetching generations count:', countError);
      return NextResponse.json({ error: 'Failed to fetch gallery count' }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      images: generationsData,
      pagination: {
        page,
        limit,
        total: count,
        totalPages: Math.ceil(count / limit),
      },
    });
  } catch (error) {
    console.error('Error in gallery API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 