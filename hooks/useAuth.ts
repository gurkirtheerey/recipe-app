/**
 * Custom hook for managing authentication state using Supabase
 * This hook provides the current user's authentication state and loading status
 *
 * @returns {Object} An object containing:
 *   - user: The current authenticated user object from Supabase, or null if not authenticated
 *   - isLoading: Boolean indicating whether the initial auth state is still being fetched
 */
import { useState, useEffect } from 'react';
import { User } from '@supabase/supabase-js';
import { createClient } from '@/lib/supabase/client';

export function useAuth() {
  // State to store the current authenticated user
  const [user, setUser] = useState<User | null>(null);
  // State to track the loading status of the initial auth check
  const [isLoading, setIsLoading] = useState(true);
  // Initialize Supabase client
  const supabase = createClient();

  useEffect(() => {
    /**
     * Fetches the current authenticated user from Supabase
     * Updates the user state and loading status accordingly
     */
    const getUser = async () => {
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUser(user);
      } catch (error) {
        console.error('Error fetching user:', error);
      } finally {
        setIsLoading(false);
      }
    };
    getUser();
  }, [supabase.auth]);

  return { user, isLoading };
}
