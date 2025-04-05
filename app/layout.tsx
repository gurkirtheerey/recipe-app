import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { createClient } from '@/lib/supabase/server';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar/app-sidebar';
import { Toaster } from 'sonner';
import AppSidebarTrigger from '@/components/AppSidebar/AppSidebarTrigger';
import QueryProvider from './providers/query-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Nibbl',
  description: 'Nibbl',
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <SidebarProvider>
          <QueryProvider>
            <AppSidebar />
            <AppSidebarTrigger />
            <main className="flex-1">{children}</main>
          </QueryProvider>
        </SidebarProvider>
        <Toaster />
      </body>
    </html>
  );
}
