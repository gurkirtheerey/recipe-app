import { createClient } from "@/lib/supabase/server";
import SignInForm from "./login-form";
import { redirect } from "next/navigation";
export default async function Login() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <SignInForm />
    </div>
  );
}
