import { createClient } from '@/lib/supabase/server';
import TagsContent from './tags-content';
import { redirect } from 'next/navigation';
export default async function TagsPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) {
    redirect('/login');
  }
  return <TagsContent userId={user.id} />;
}
