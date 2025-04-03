import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
import { Button } from '@/components/ui/button';

export default async function Dashboard() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <>
      <div className="flex justify-between p-4 w-full">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <div className="flex justify-center gap-4">
          <Button>Discover</Button>
          <Button variant="outline">Create Recipe</Button>
        </div>
      </div>
    </>
  );
}
