import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import DashboardContent from './DashboardContent';

export default async function Dashboard() {
  const supabase = await createClient();
  console.log('OPENAI_API_KEY is set:', Boolean(process.env.OPENAI_API_KEY), process.env.OPENAI_API_KEY);

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <DashboardContent />;
}
