"use client";

import { signOut } from "@/app/actions/auth/actions";
import { User2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { SidebarMenuButton } from "../sidebar";
import { ChevronUp } from "lucide-react";
import { redirect } from "next/navigation";
import { User } from "@supabase/supabase-js";
const SidebarAction = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <User2 /> {user?.email}
          <ChevronUp className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width] min-w-[200px] rounded-md border bg-white p-1 shadow-md"
      >
        <DropdownMenuItem
          onClick={() => redirect("/profile")}
          className="flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-gray-100"
        >
          <span>Profile</span>
        </DropdownMenuItem>
        <DropdownMenuItem className="flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-gray-100">
          <span>Billing</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={() => signOut()}
          className="flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm outline-none hover:bg-gray-100"
        >
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarAction;
