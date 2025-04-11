'use client';

import { updateUserMetadata } from '@/app/actions/auth/actions';
import { useMutation } from '@tanstack/react-query';
import { useAuth } from './useAuth';

// Hook to update user metadata so any profile changes are reflected in the sidebar
export function useMetadata() {
  const { user } = useAuth();

  const { mutate: updateMetadata } = useMutation({
    mutationFn: async (metadata: { first_name?: string; last_name?: string; username?: string }) => {
      if (!user) {
        throw new Error('User not authenticated');
      }
      return updateUserMetadata(metadata);
    },
  });

  return { updateMetadata };
}
