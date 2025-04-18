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
import mixpanel from 'mixpanel-browser';
import ThemeToggle from '../DropdownThemeToggle';
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

  const handleSignOut = async () => {
    await signOut();
    mixpanel.track('Sign Out');
    mixpanel.reset();
  };

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
          <span className="text-gray-900 dark:text-gray-100">{user?.email}</span>
          <ChevronUp className="ml-auto text-gray-700 dark:text-gray-300" />
        </SidebarMenuButton>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="w-[--radix-popper-anchor-width] min-w-[200px] rounded-md border bg-white dark:bg-gray-800/10 dark:border-gray-700 p-1 shadow-md"
      >
        <ThemeToggle />
        <DropdownMenuItem
          onClick={() => redirect('/account-settings')}
          className="flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span>Account Settings</span>
        </DropdownMenuItem>
        <DropdownMenuItem
          onClick={handleSignOut}
          className="flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
        >
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SidebarAction;
