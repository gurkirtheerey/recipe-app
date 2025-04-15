import { Home, Search, User, Utensils, Settings } from 'lucide-react';

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
} from '@/components/ui/sidebar';
import { createClient } from '@/lib/supabase/server';
import SidebarAction from './SidebarAction';
import { redirect } from 'next/navigation';
import { AppSidebarMenuItem } from './AppSidebarMenuItem';

export async function AppSidebar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const firstName = user?.user_metadata.first_name;

  // Menu items.
  const items = [
    {
      title: 'Home',
      url: '/dashboard',
      icon: Home,
    },
    {
      title: 'Discover',
      url: '/discover',
      icon: Search,
    },
    {
      title: 'Recipes',
      url: '/recipes',
      icon: Utensils,
    },
    {
      title: 'Account Settings',
      url: '/account-settings',
      icon: Settings,
    },
    {
      title: 'Profile',
      url: `/profile/${user?.user_metadata.username}`,
      icon: User,
    },
  ];

  if (!user) {
    redirect('/login');
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Welcome, {firstName}!</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <AppSidebarMenuItem key={item.title} title={item.title} url={item.url} icon={<item.icon />} />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarAction user={user} />
      </SidebarFooter>
    </Sidebar>
  );
}
