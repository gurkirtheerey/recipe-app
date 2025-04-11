'use client';

import { StarIcon } from 'lucide-react';
import { useRating } from '@/hooks/useRating';
import { Skeleton } from '@/components/ui/skeleton';

interface StarRatingProps {
  initialRating?: number;
  recipeId: string;
}

const MAX_RATING = 5;

export function StarRating({ initialRating = 0, recipeId }: StarRatingProps) {
  const { rating, hoverRating, setHoverRating, handleStarClick, isLoading, isAuthenticated } = useRating(
    recipeId,
    initialRating
  );

  if (isLoading) {
    return (
      <div className="flex items-center gap-2">
        {Array.from({ length: MAX_RATING }, (_, i) => (
          <Skeleton key={i} className="h-4 w-4 rounded-full" />
        ))}
      </div>
    );
  }

  return (
    <div className="flex items-center gap-2">
      {Array.from({ length: MAX_RATING }, (_, i) => i + 1).map((star) => (
        <button
          key={star}
          onClick={() => handleStarClick(star)}
          onMouseEnter={() => setHoverRating(star)}
          onMouseLeave={() => setHoverRating(0)}
          className="focus:outline-none"
          disabled={!isAuthenticated}
          aria-label={`Rate ${star} out of ${MAX_RATING}`}
        >
          <StarIcon
            className={`h-4 w-4 transition-colors ${
              star <= (hoverRating || rating) ? 'text-yellow-500 fill-yellow-500' : 'text-gray-300'
            }`}
          />
        </button>
      ))}
    </div>
  );
}
