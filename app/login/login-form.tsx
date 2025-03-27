"use client";

import { Button } from "@/components/ui/button";
import { login } from "../actions/auth/actions";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import Link from "next/link";
import { Mail, Lock } from "lucide-react";

const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <form
        className="flex flex-col gap-6 w-full max-w-md bg-white rounded-2xl shadow-lg p-8"
        action={formAction}
      >
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-gray-800">Welcome Back</h1>
          <p className="text-gray-500">Please sign in to your account</p>
        </div>

        <div className="space-y-4">
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              placeholder="Email"
              name="email"
              className="pl-10 py-6 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="password"
              placeholder="Password"
              name="password"
              className="pl-10 py-6 border-gray-200 focus:border-blue-500 focus:ring-blue-500"
            />
          </div>
        </div>

        <Button
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-6 rounded-xl font-semibold transition-all duration-200 transform hover:scale-[1.02]"
          type="submit"
          formAction={formAction}
          disabled={isPending}
        >
          {isPending ? (
            <span className="flex items-center justify-center gap-2">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Logging in...
            </span>
          ) : (
            "Sign In"
          )}
        </Button>

        <div className="flex gap-2 text-sm justify-center items-center text-gray-600">
          <span>Don&apos;t have an account?</span>
          <Link
            className="text-blue-600 font-semibold hover:text-blue-700 transition-colors"
            href="/signup"
          >
            Sign up
          </Link>
        </div>

        {state?.error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm font-medium text-red-600 text-center">
              {state.error}
            </p>
          </div>
        )}
      </form>
    </div>
  );
};

export default SignInForm;
