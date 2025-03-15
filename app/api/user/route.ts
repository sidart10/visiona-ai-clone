import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { User, UserQuota } from '@/lib/types';

export async function GET() {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get user data from Supabase
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('*')
      .eq('clerk_id', userId)
      .single();
    
    if (userError) {
      console.error('Error fetching user data:', userError);
      return NextResponse.json({ error: 'Failed to fetch user data' }, { status: 500 });
    }
    
    // If user doesn't exist, create a new user
    if (!userData) {
      const { data: clerkUser } = await supabase.auth.getUser(userId);
      
      if (!clerkUser) {
        return NextResponse.json({ error: 'User not found' }, { status: 404 });
      }
      
      const { data: newUser, error: createError } = await supabase
        .from('users')
        .insert([
          {
            clerk_id: userId,
            email: clerkUser.user?.email || '',
          },
        ])
        .select()
        .single();
      
      if (createError) {
        console.error('Error creating user:', createError);
        return NextResponse.json({ error: 'Failed to create user' }, { status: 500 });
      }
      
      return NextResponse.json(newUser);
    }
    
    // Get user quota information
    const { data: modelsData } = await supabase
      .from('models')
      .select('id')
      .eq('user_id', userData.id);
    
    const { data: generationsData } = await supabase
      .from('generations')
      .select('id')
      .eq('user_id', userData.id)
      .gte('created_at', new Date(new Date().setHours(0, 0, 0, 0)).toISOString());
    
    // Get user subscription status
    const { data: paymentData } = await supabase
      .from('payments')
      .select('*')
      .eq('user_id', userData.id)
      .eq('status', 'active')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();
    
    const isPremium = !!paymentData;
    
    const userQuota: UserQuota = {
      modelsCreated: modelsData?.length || 0,
      modelsLimit: isPremium ? Infinity : 5,
      dailyGenerations: generationsData?.length || 0,
      dailyGenerationsLimit: isPremium ? 100 : 20,
      plan: isPremium ? 'Premium' : 'Free',
    };
    
    return NextResponse.json({
      ...userData,
      quota: userQuota,
    });
  } catch (error) {
    console.error('Error in user API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 