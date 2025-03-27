import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { Mail } from "lucide-react";

export default async function CheckEmail() {
  const supabase = await createClient();
  const { data } = await supabase.auth.getUser();

  if (data.user) {
    redirect("/dashboard");
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-white to-gray-50 px-4">
      <div className="w-full max-w-md space-y-8 text-center">
        <div className="flex justify-center">
          <div className="rounded-full bg-blue-100 p-4">
            <Mail className="h-12 w-12 text-blue-600" />
          </div>
        </div>

        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-gray-900">Check your email</h1>
          <p className="text-gray-600">
            We&apos;ve sent you a magic link to sign in. Please check your inbox
            and click the link to continue.
          </p>
        </div>

        <div className="mt-8 text-sm text-gray-500">
          <p>Didn&apos;t receive an email?</p>
          <p className="mt-2">
            Check your spam folder or try signing in again.
          </p>
        </div>
      </div>
    </div>
  );
}
