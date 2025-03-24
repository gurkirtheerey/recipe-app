import { signOut } from "@/app/actions/auth/actions";
import { Button } from "@/components/ui/button";

export default async function SignOut() {
  return (
    <form action={signOut}>
      <Button type="submit">Sign Out</Button>
    </form>
  );
}
