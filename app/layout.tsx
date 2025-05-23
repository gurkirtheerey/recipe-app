import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import { createClient } from '@/lib/supabase/server';
import { SidebarProvider } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar/app-sidebar';
import AppSidebarTrigger from '@/components/AppSidebar/AppSidebarTrigger';
import QueryProvider from './providers/query-provider';
import { FeatureFlagProvider } from './providers/flagsmith-provider';
import flagsmith from 'flagsmith/isomorphic';
import { Analytics } from '@vercel/analytics/react';
import MixpanelProvider from './providers/mixpanel-provider';
import ThemeProvider from './providers/theme-provider';
import ToasterWithTheme from '@/components/ToasterWithTheme';

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

  await flagsmith.init({
    environmentID: process.env.FLAGSMITH_API_KEY,
  });
  const serverState = flagsmith.getState();

  if (!user) {
    return (
      <html lang="en">
        <body>{children}</body>
      </html>
    );
  }

  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
      <body>
        <QueryProvider>
          <SidebarProvider>
            <FeatureFlagProvider serverState={serverState}>
              <MixpanelProvider>
                <ThemeProvider>
                  <AppSidebar />
                  <AppSidebarTrigger />
                  <main className="flex-1">{children}</main>
                  <ToasterWithTheme />
                </ThemeProvider>
              </MixpanelProvider>
            </FeatureFlagProvider>
          </SidebarProvider>
        </QueryProvider>
        <Analytics />
      </body>
    </html>
  );
}
