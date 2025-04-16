import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import AppSidebarContent from './AppSidebarContent';

const getProfile = async (id: string) => {
  if (!id) {
    return null;
  }
  const supabase = await createClient();
  const { data } = await supabase.from('profiles').select('*').eq('id', id).single();
  return data;
};

export async function AppSidebar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const profile = await getProfile(user.id);

  const firstName = profile.first_name;

  if (!user) {
    redirect('/login');
  }

  return <AppSidebarContent profile={profile} user={user} firstName={firstName} />;
}
