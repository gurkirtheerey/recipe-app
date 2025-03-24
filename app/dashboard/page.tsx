import { createClient } from "@/lib/supabase/server";
import SignOut from "@/components/ui/SignOut";
import { redirect } from "next/navigation";

export default async function Dashboard() {
  const supabase = await createClient();

  const { data } = await supabase.auth.getUser();

  if (!data?.user) {
    redirect("/login");
  }

  return (
    <div className="flex justify-between items-center p-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>
      <p>Hello, {data?.user?.email}</p>
      <SignOut />
    </div>
  );
}
