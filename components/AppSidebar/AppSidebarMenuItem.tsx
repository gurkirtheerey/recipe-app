'use client';

import { SidebarMenuButton, SidebarMenuItem, useSidebar } from '@/components/ui/sidebar';
import { cn } from '@/lib/utils';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
export function AppSidebarMenuItem({ title, url, icon }: { title: string; url: string; icon: React.ReactNode }) {
  const pathname = usePathname();
  const isActive = pathname.includes(url);
  const { setOpenMobile } = useSidebar();
  return (
    <SidebarMenuItem>
      <SidebarMenuButton asChild className={cn('peer-data-[active=true]:bg-primary/10', isActive && 'bg-primary/10')}>
        <Link href={url} onClick={() => setOpenMobile(false)}>
          {icon}
          <span>{title}</span>
        </Link>
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}
