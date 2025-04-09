'use client';

import { Heart, Loader2 } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { useParams } from 'next/navigation';
import { useFavorite } from '@/hooks/useFavorite';

const FavoriteButton = () => {
  const params = useParams();
  const recipeId = params.id as string;
  const { updateFavoriteStatus, isFavorite, favoriteStatusLoading } = useFavorite(recipeId);

  const handleClick = () => {
    updateFavoriteStatus(!isFavorite);
  };

  return (
    <Button onClick={handleClick} className="p-2 bg-gray-200 rounded-full hover:bg-gray-300">
      {favoriteStatusLoading ? (
        <Loader2 className="h-5 w-5 animate-spin text-black" />
      ) : (
        <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-black'}`} />
      )}
    </Button>
  );
};

export default FavoriteButton;
