"use client";

import { signOut } from "@/app/actions/auth/actions";
import { DropdownMenuItem } from "@radix-ui/react-dropdown-menu";

const SidebarSignOut = () => {
  return (
    <DropdownMenuItem
      className="flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-gray-100"
      onClick={() => signOut()}
    >
      <span>Sign out</span>
    </DropdownMenuItem>
  );
};

export default SidebarSignOut;
