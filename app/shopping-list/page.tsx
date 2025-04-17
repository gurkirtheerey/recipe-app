import { redirect } from 'next/navigation';
import ShoppingListContent from './shopping-list-content';
import { createClient } from '@/lib/supabase/server';

export default async function ShoppingListPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return <ShoppingListContent user={user} />;
}
