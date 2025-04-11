import { useState } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'sonner';
import { useAuth } from './useAuth';
import { ratingsService } from '@/lib/services/ratings';
import { Rating } from '@/types/ratingTypes';

export const useRating = (recipeId: string, initialRating = 0) => {
  const [rating, setRating] = useState(initialRating);
  const [hoverRating, setHoverRating] = useState(0);
  const { user, isLoading: isAuthLoading } = useAuth();

  // Fetch initial rating
  const { isLoading: isRatingLoading } = useQuery({
    queryKey: ['rating', recipeId, user?.id],
    queryFn: async () => {
      if (!user) return 0;
      const currentRating = await ratingsService.getRating(recipeId, user.id);
      setRating(currentRating);
      return currentRating;
    },
    enabled: !!user,
  });

  // Handle rating updates
  const { mutate: updateRatingMutation } = useMutation({
    mutationFn: async (newRating: number) => {
      if (!user) return;

      const ratingData: Rating = {
        user_id: user.id,
        recipe_id: recipeId,
        rating: newRating,
      };

      await ratingsService.updateRating(ratingData);
      setRating(newRating);
      toast.success('Rating updated successfully');
    },
  });

  const handleStarClick = (starValue: number) => {
    if (!user) return;
    const newRating = rating === starValue ? 0 : starValue;
    updateRatingMutation(newRating);
  };

  return {
    rating,
    hoverRating,
    setHoverRating,
    handleStarClick,
    isLoading: isAuthLoading || isRatingLoading,
    isAuthenticated: !!user,
  };
};
