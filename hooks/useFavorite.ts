import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';
import { favoritesService } from '@/lib/services/favorites';
import { createClient } from '@/lib/supabase/client';
import { useRouter } from 'next/navigation';

/**
 * Hook for managing favorites
 * @param recipeId - The id of the recipe to manage favorites for
 * @returns An object containing the createFavorite and deleteFavorite functions
 */
export const useFavorite = (recipeId: string) => {
  const { user } = useAuth();
  const supabase = createClient();
  const router = useRouter();

  /**
   * Creates favorite in database and refreshes the page
   */
  const createFavorite = async () => {
    if (!user) return;
    await supabase.from('favorites').upsert({
      user_id: user.id,
      recipe_id: recipeId,
      is_favorite: true,
    });
    router.refresh();
  };

  /**
   * Deletes favorite from database and refreshes the page
   */
  const deleteFavorite = async () => {
    if (!user) return;
    await supabase.from('favorites').delete().eq('user_id', user.id).eq('recipe_id', recipeId);
    router.refresh();
  };

  return {
    createFavorite,
    deleteFavorite,
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
