import { createClient } from "@/lib/supabase/server";

export default async function ProfilePage() {
  const supabase = await createClient();
  const { error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 space-y-8 px-2 sm:px-16 lg:px-24">
        <h1 className="text-3xl font-bold">Profile</h1>
        {/* Add profile content here */}
      </div>
    </main>
  );
}
