import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import GeneratePage from '@/frontend-pages/generate-page/app/generate/page';

export default function Generate() {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return <GeneratePage />;
} 