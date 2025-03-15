import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import stripe from '@/lib/stripe';

export async function POST(request: Request) {
  try {
    const body = await request.text();
    const signature = request.headers.get('stripe-signature') || '';
    
    if (!signature) {
      return NextResponse.json({ error: 'Missing Stripe signature' }, { status: 400 });
    }
    
    // Verify the webhook signature
    let event;
    try {
      event = stripe.webhooks.constructEvent(
        body,
        signature,
        process.env.STRIPE_WEBHOOK_SECRET || ''
      );
    } catch (error) {
      console.error('Error verifying webhook signature:', error);
      return NextResponse.json({ error: 'Invalid signature' }, { status: 400 });
    }
    
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object;
        const userId = session.metadata?.userId;
        
        if (!userId) {
          console.error('Missing user ID in session metadata');
          return NextResponse.json({ error: 'Missing user ID' }, { status: 400 });
        }
        
        // Store the payment in the database
        const { data: paymentData, error: paymentError } = await supabase
          .from('payments')
          .insert([
            {
              user_id: parseInt(userId),
              stripe_charge_id: session.id,
              amount: session.amount_total / 100, // Convert from cents to dollars
              currency: session.currency,
              status: 'active',
            },
          ])
          .select()
          .single();
        
        if (paymentError) {
          console.error('Error storing payment data:', paymentError);
          return NextResponse.json({ error: 'Failed to store payment data' }, { status: 500 });
        }
        
        // Log the payment success
        await supabase.from('audit_logs').insert([
          {
            user_id: parseInt(userId),
            action: 'payment_successful',
            details: {
              payment_id: paymentData.id,
              stripe_session_id: session.id,
              amount: session.amount_total / 100,
              currency: session.currency,
            },
          },
        ]);
        
        break;
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object;
        const stripeCustomerId = subscription.customer;
        
        // Find the payment with the customer ID
        const { data: paymentData, error: paymentError } = await supabase
          .from('payments')
          .select('id, user_id')
          .eq('stripe_charge_id', stripeCustomerId)
          .single();
        
        if (paymentError || !paymentData) {
          console.error('Error finding payment data:', paymentError);
          return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
        }
        
        // Update the payment status
        await supabase
          .from('payments')
          .update({
            status: subscription.status,
          })
          .eq('id', paymentData.id);
        
        // Log the subscription update
        await supabase.from('audit_logs').insert([
          {
            user_id: paymentData.user_id,
            action: 'subscription_updated',
            details: {
              payment_id: paymentData.id,
              stripe_subscription_id: subscription.id,
              status: subscription.status,
            },
          },
        ]);
        
        break;
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object;
        const stripeCustomerId = subscription.customer;
        
        // Find the payment with the customer ID
        const { data: paymentData, error: paymentError } = await supabase
          .from('payments')
          .select('id, user_id')
          .eq('stripe_charge_id', stripeCustomerId)
          .single();
        
        if (paymentError || !paymentData) {
          console.error('Error finding payment data:', paymentError);
          return NextResponse.json({ error: 'Payment not found' }, { status: 404 });
        }
        
        // Update the payment status
        await supabase
          .from('payments')
          .update({
            status: 'canceled',
          })
          .eq('id', paymentData.id);
        
        // Log the subscription cancellation
        await supabase.from('audit_logs').insert([
          {
            user_id: paymentData.user_id,
            action: 'subscription_canceled',
            details: {
              payment_id: paymentData.id,
              stripe_subscription_id: subscription.id,
            },
          },
        ]);
        
        break;
      }
    }
    
    return NextResponse.json({ received: true });
  } catch (error) {
    console.error('Error in Stripe webhook API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 