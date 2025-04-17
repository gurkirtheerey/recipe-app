import { useAuth } from '@/hooks/useAuth';
import mixpanel from 'mixpanel-browser';
import { useEffect } from 'react';

const MIXPANEL_TOKEN = process.env.NEXT_PUBLIC_MIXPANEL_TOKEN;

export const initMixpanel = async () => {
  if (!MIXPANEL_TOKEN) {
    console.warn('Mixpanel token is missing! Check your .env file.');
    return;
  }

  await mixpanel.init(MIXPANEL_TOKEN, {
    debug: true,
  });

  console.log('Mixpanel initialized', mixpanel);
};

export const MixpanelUserSetup = () => {
  const { user } = useAuth(); // your logged-in user from Supabase or context

  useEffect(() => {
    if (user) {
      mixpanel.identify(user.id);
      mixpanel.people.set({
        $email: user.email,
        $first_name: user.user_metadata.first_name,
        $last_name: user.user_metadata.last_name,
      });
    }
  }, [user]);

  return null;
};
