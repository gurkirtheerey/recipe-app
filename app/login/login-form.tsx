"use client";

import { Button } from "@/components/ui/button";
import { login } from "../actions/auth/actions";
import { Input } from "@/components/ui/input";
import { useActionState } from "react";
import Link from "next/link";
const SignInForm = () => {
  const [state, formAction, isPending] = useActionState(login, null);

  return (
    <form
      className="flex flex-col gap-4 border-2 border-gray-200 rounded-2xl shadow-xl p-4"
      action={formAction}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>
      <Input type="email" placeholder="Email" name="email" />
      <Input type="password" placeholder="Password" name="password" />
      <Button
        className="bg-blue-500"
        type="submit"
        formAction={formAction}
        disabled={isPending}
      >
        {isPending ? "Logging in..." : "Login"}
      </Button>
      <div className="flex gap-2 text-sm justify-center items-center">
        <span className="text-gray-500">Don&apos;t have an account?</span>
        <Link className="text-blue-500 font-semibold" href="/signup">
          Sign up
        </Link>
      </div>
      {state?.error && (
        <p className="text-sm font-bold text-red-500">{state.error}</p>
      )}
    </form>
  );
};

export default SignInForm;
