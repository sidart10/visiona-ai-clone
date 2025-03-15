import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function DELETE(request: Request) {
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
    
    const body = await request.json();
    const { imageId } = body;
    
    if (!imageId) {
      return NextResponse.json({ error: 'Image ID is required' }, { status: 400 });
    }
    
    // Get the image to verify ownership
    const { data: imageData, error: imageError } = await supabase
      .from('generations')
      .select('*')
      .eq('id', imageId)
      .eq('user_id', userData.id)
      .single();
    
    if (imageError || !imageData) {
      console.error('Error fetching image data:', imageError);
      return NextResponse.json({ error: 'Image not found or not owned by user' }, { status: 404 });
    }
    
    // Delete the image from the database
    const { error: deleteError } = await supabase
      .from('generations')
      .delete()
      .eq('id', imageId)
      .eq('user_id', userData.id);
    
    if (deleteError) {
      console.error('Error deleting image:', deleteError);
      return NextResponse.json({ error: 'Failed to delete image' }, { status: 500 });
    }
    
    // Log the deletion action
    await supabase.from('audit_logs').insert([
      {
        user_id: userData.id,
        action: 'image_deleted',
        details: {
          image_id: imageId,
          image_url: imageData.image_url,
        },
      },
    ]);
    
    return NextResponse.json({
      success: true,
      message: 'Image deleted successfully',
    });
  } catch (error) {
    console.error('Error in gallery delete API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 