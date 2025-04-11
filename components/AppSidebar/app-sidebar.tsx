import { Home, Search, User, Utensils } from 'lucide-react';

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
    title: 'Profile',
    url: '/profile',
    icon: User,
  },
];

export async function AppSidebar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Mrs. Nusantara</SidebarGroupLabel>
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
