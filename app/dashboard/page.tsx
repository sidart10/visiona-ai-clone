import { auth } from '@clerk/nextjs';
import { redirect } from 'next/navigation';
import DashboardPage from '@/frontend-pages/visiona-dashboard-page/app/dashboard/page';

export default function Dashboard() {
  const { userId } = auth();
  
  if (!userId) {
    redirect('/sign-in');
  }
  
  return <DashboardPage />;
} 