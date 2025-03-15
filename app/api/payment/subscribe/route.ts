import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import stripe from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const { userId } = auth();
    
    if (!userId) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    
    // Get user data from Supabase
    const { data: userData, error: userError } = await supabase
      .from('users')
      .select('id, email')
      .eq('clerk_id', userId)
      .single();
    
    if (userError || !userData) {
      console.error('Error fetching user data:', userError);
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }
    
    const body = await request.json();
    const { plan } = body;
    
    if (!plan || !['monthly', 'yearly'].includes(plan)) {
      return NextResponse.json({ error: 'Valid plan (monthly or yearly) is required' }, { status: 400 });
    }
    
    // Define price IDs for different plans
    const priceIds = {
      monthly: process.env.STRIPE_MONTHLY_PRICE_ID,
      yearly: process.env.STRIPE_YEARLY_PRICE_ID,
    };
    
    const priceId = priceIds[plan as keyof typeof priceIds];
    
    if (!priceId) {
      return NextResponse.json({ error: 'Invalid plan selected' }, { status: 400 });
    }
    
    // Create a Stripe checkout session
    const session = await stripe.checkout.sessions.create({
      customer_email: userData.email,
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      mode: 'subscription',
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/subscription?payment=canceled`,
      metadata: {
        userId: userData.id.toString(),
        clerkId: userId,
      },
    });
    
    // Log the subscription attempt
    await supabase.from('audit_logs').insert([
      {
        user_id: userData.id,
        action: 'subscription_initiated',
        details: {
          plan,
          session_id: session.id,
        },
      },
    ]);
    
    return NextResponse.json({
      success: true,
      url: session.url,
    });
  } catch (error) {
    console.error('Error in subscription API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 