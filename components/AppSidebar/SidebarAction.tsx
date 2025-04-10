'use client';

import { signOut } from '@/app/actions/auth/actions';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { ChevronUp } from 'lucide-react';
import { redirect } from 'next/navigation';
import { User } from '@supabase/supabase-js';
import { SidebarMenuButton } from '../ui/sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';
const SidebarAction = ({ user }: { user: User }) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <Avatar>
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>{user?.email?.charAt(0)}</AvatarFallback>
          </Avatar>
          {user?.email}
          <ChevronUp className="ml-auto" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width] min-w-[200px] rounded-md border bg-white p-1 shadow-md"
      >
        <DropdownMenuItem
          onClick={() => redirect('/profile')}
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
