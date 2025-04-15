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
import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';
import { Skeleton } from '../ui/skeleton';
const SidebarAction = ({ user }: { user: User }) => {
  const supabase = createClient();

  const {
    data: profile,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['sidebar-profile-picture', user.id],
    queryFn: async () => {
      const { data, error } = await supabase.from('profiles').select('profile_picture').eq('id', user.id).single();
      if (error) {
        throw error;
      }
      return data;
    },
  });

  if (isLoading) {
    return <Skeleton className="h-8 w-8 rounded-full" />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <SidebarMenuButton>
          <Avatar>
            <AvatarImage src={profile?.profile_picture} />
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
