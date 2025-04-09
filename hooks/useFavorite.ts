import { useMutation, useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { favoritesService } from '@/lib/services/favorites';
import { Favorite } from '@/types/favoriteTypes';
import { useState } from 'react';
import { toast } from 'sonner';

export const useFavorite = (recipeId: string) => {
  const { user } = useAuth();
  const [isFavorite, setIsFavorite] = useState(false);

  // Get the favorite status of specific recipe
  const { data: favoriteStatus } = useQuery({
    queryKey: ['favorites', recipeId, user?.id],
    queryFn: async () => {
      if (!user) return false;
      const currentStatus = await favoritesService.getFavoriteStatus(recipeId, user.id);
      return currentStatus;
    },
    enabled: !!user,
  });

  // Update the favorite status of specific recipe
  const { mutate: updateFavoriteStatus } = useMutation({
    mutationFn: async (newStatus: boolean) => {
      if (!user) return;
      const favorite: Favorite = {
        recipe_id: recipeId,
        user_id: user.id,
        is_favorite: newStatus,
      };
      await favoritesService.updateFavorite(favorite);
      setIsFavorite(newStatus);
      toast.success('Favorite status updated successfully');
    },
  });

  return {
    favoriteStatus,
    updateFavoriteStatus,
    isFavorite,
  };
};

export const useFavoriteCarousel = () => {
  const { user } = useAuth();

  const { data: favoriteCarousel, isFetching } = useQuery({
    queryKey: ['favoriteCarousel', user?.id],
    queryFn: async () => {
      if (!user) return [];
      return await favoritesService.getFavoriteCarousel(user.id);
    },
    enabled: !!user,
  });

  // Consider loading if either fetching or no user
  const isLoading = isFetching || !user;

  return {
    favoriteCarousel: favoriteCarousel || [],
    favoriteCarouselLoading: isLoading,
  };
};
