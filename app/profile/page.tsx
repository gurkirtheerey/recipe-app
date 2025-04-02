import { createClient } from '@/lib/supabase/server';

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    throw new Error('User not authenticated');
  }

  // Now TypeScript knows user is not null
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Profile</h1>
      <div className="mt-4">
        <p>Email: {user.email}</p>
        <p>User ID: {user.id}</p>
      </div>
    </div>
  );
}
