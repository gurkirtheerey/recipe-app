import { recipesService } from '@/lib/services/recipes';
import { useQuery } from '@tanstack/react-query';
import { useAuth } from './useAuth';

export const useRecipeCarousel = () => {
  const { user } = useAuth();
  const { data: myRecipeCarousel, isFetching } = useQuery({
    queryKey: ['recipes', user?.id],
    queryFn: async () => {
      if (!user) return [];
      return await recipesService.getMyRecipesCarousel(user.id);
    },
    enabled: !!user,
  });
  // Consider loading if either fetching or no user
  const isLoading = isFetching || !user;

  return { myRecipeCarousel, myRecipeCarouselLoading: isLoading };
};
