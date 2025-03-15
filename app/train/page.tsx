import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import TrainingPage from '@/frontend-pages/training-page/training-page';

export default function Train() {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return <TrainingPage />;
} 