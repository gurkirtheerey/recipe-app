"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { signup } from "../actions/auth/actions";
import { useActionState } from "react";
import Link from "next/link";

const SignUpForm = () => {
  const [state, formAction, isPending] = useActionState(signup, null);

  return (
    <form
      className="flex flex-col border border-gray-200 rounded-2xl shadow-xl p-4"
      action={formAction}
    >
      <h1 className="text-2xl font-bold mb-4 text-center">Sign Up</h1>
      <div className="flex gap-2 mb-2">
        <Input type="text" placeholder="First Name" name="first_name" />
        <Input type="text" placeholder="Last Name" name="last_name" />
      </div>
      <div className="flex flex-col gap-2 mb-4">
        <Input type="email" placeholder="Email" name="email" />
        <Input type="password" placeholder="Password" name="password" />
      </div>
      <Button className="bg-blue-500" type="submit" disabled={isPending}>
        {isPending ? "Signing up..." : "Sign Up"}
      </Button>
      <p className="text-sm text-gray-500  mt-4">
        Already have an account?{" "}
        <Link className="text-blue-500 font-semibold" href="/login">
          Log in
        </Link>
      </p>
      {state?.error && (
        <p className="text-sm font-bold text-red-500">{state.error}</p>
      )}
    </form>
  );
};

export default SignUpForm;
