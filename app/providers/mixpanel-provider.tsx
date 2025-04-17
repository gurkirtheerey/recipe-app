'use client';

import { useEffect } from 'react';
import { initMixpanel } from '@/lib/mixpanel/mixpanelClient';

export default function MixpanelProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    initMixpanel(); // Initialize Mixpanel
  }, []);

  return <>{children}</>;
}
