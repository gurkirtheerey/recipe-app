/**
 * Custom hook for managing authentication state using Supabase and React Query
 * This hook provides the current user's authentication state and loading status
 *
 * @returns {Object} An object containing:
 *   - user: The current authenticated user object from Supabase, or null if not authenticated
 *   - isLoading: Boolean indicating whether the initial auth state is still being fetched
 */
import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';

export function useAuth() {
  const supabase = createClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['auth', 'user'],
    queryFn: async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      return user;
    },
  });

  return { user: user ?? null, isLoading };
}
