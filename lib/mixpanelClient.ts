import mixpanel from 'mixpanel-browser';

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
