'use client';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { DropdownMenuItem } from './ui/dropdown-menu';
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Avoid hydration mismatch
  if (!mounted) return null;

  return (
    <DropdownMenuItem
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm text-gray-900 dark:text-gray-100 outline-none hover:bg-gray-100 dark:hover:bg-gray-700"
    >
      {theme === 'dark' ? 'Light' : 'Dark'} Mode
    </DropdownMenuItem>
  );
}
