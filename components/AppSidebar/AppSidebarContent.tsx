'use client';
import {
  Sidebar,
  SidebarMenu,
  SidebarGroupContent,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarFooter,
} from '../ui/sidebar';
import { AppSidebarMenuItem } from './AppSidebarMenuItem';
import { User } from '@supabase/supabase-js';
import SidebarAction from './SidebarAction';
import { Home, Plus, Search, Utensils, User as UserIcon } from 'lucide-react';
import { Profile } from '@/types/profileTypes';
import { useWindow } from '@/hooks/useWindow';

const AppSidebarContent = ({ profile, user, firstName }: { profile: Profile; user: User; firstName: string }) => {
  const { width } = useWindow();
  const isMobile = width < 768;
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
      url: `/profile/${profile.username}`,
      icon: UserIcon,
    },
    {
      title: 'Create AI Recipe',
      url: '/create-ai-recipe',
      icon: Plus,
    },
  ];

  console.log(isMobile);

  return (
    <Sidebar side={isMobile ? 'right' : 'left'}>
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
};

export default AppSidebarContent;
