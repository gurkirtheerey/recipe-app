import { createClient } from "@/lib/supabase/server";
import SignInForm from "./login-form";
import { redirect } from "next/navigation";
import Navbar from "@/components/navbar";

export default async function Login() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      {/* Main Content */}
      <div className="container mx-auto px-4">
        <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)]">
          <SignInForm />
        </div>
      </div>
    </div>
  );
}
