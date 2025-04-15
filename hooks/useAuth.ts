import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';
import { useQuery } from '@tanstack/react-query';

/**
 * Custom hook for managing authentication state using Supabase with React Query
 * This hook provides the current user's authentication state and loading status
 *
 * @returns {Object} An object containing:
 *   - user: The current authenticated user object from Supabase, or null if not authenticated
 *   - isLoading: Boolean indicating whether the initial auth state is still being fetched
 */
export function useAuth() {
  const supabase = createClient();

  const { data: user, isLoading } = useQuery({
    queryKey: ['supabase-auth-user'],
    queryFn: async (): Promise<User | null> => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        return user;
      } catch (error) {
        console.error('Error fetching user:', error);
        return null;
      }
    },
    staleTime: 1000 * 60 * 5,
    refetchOnWindowFocus: true,
  });

  return { user: user ?? null, isLoading };
}
