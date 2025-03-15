import { auth } from '@clerk/nextjs';
import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

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
    
    const formData = await request.formData();
    const file = formData.get('file') as File;
    
    if (!file) {
      return NextResponse.json({ error: 'No file provided' }, { status: 400 });
    }
    
    // Check file type
    if (!file.type.startsWith('image/')) {
      return NextResponse.json({ error: 'File must be an image' }, { status: 400 });
    }
    
    // Generate a unique filename
    const fileName = `${userId}_${Date.now()}_${file.name}`;
    
    // Upload file to Supabase Storage
    const { data: uploadData, error: uploadError } = await supabase.storage
      .from('photos')
      .upload(fileName, file);
    
    if (uploadError) {
      console.error('Error uploading file:', uploadError);
      return NextResponse.json({ error: 'Failed to upload file' }, { status: 500 });
    }
    
    // Get the public URL for the uploaded file
    const { data: publicUrlData } = supabase.storage
      .from('photos')
      .getPublicUrl(fileName);
    
    const fileUrl = publicUrlData.publicUrl;
    
    // Save photo record in the database
    const { data: photoData, error: photoError } = await supabase
      .from('photos')
      .insert([
        {
          user_id: userData.id,
          file_url: fileUrl,
        },
      ])
      .select()
      .single();
    
    if (photoError) {
      console.error('Error saving photo record:', photoError);
      return NextResponse.json({ error: 'Failed to save photo record' }, { status: 500 });
    }
    
    return NextResponse.json({
      success: true,
      photo: photoData,
    });
  } catch (error) {
    console.error('Error in photo upload API route:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
} 