/**
 * Get a greeting based on the current time
 * @returns A greeting - string
 */
export const getGreeting = () => {
  const hour = new Date().getHours();

  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
};
