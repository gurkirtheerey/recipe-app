'use client';

import React from 'react';
import { useTheme } from 'next-themes';
import { Toaster } from 'sonner';

const ToasterWithTheme = () => {
  const { theme } = useTheme();

  return <Toaster theme={theme as 'light' | 'dark' | 'system'} />;
};

export default ToasterWithTheme;
