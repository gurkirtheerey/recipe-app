import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";

export default async function CheckEmail() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold">Check your email</h1>
    </div>
  );
}
