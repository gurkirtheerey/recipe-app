'use client';

import { Heart } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { useParams } from 'next/navigation';
import { useFavorite } from '@/hooks/useFavorite';

const FavoriteButton = () => {
  const params = useParams();
  const recipeId = params.id as string;
  const { updateFavoriteStatus, isFavorite } = useFavorite(recipeId);

  const handleClick = () => {
    updateFavoriteStatus(!isFavorite);
  };

  return (
    <Button onClick={handleClick} className="p-2 bg-gray-200 rounded-full">
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-black'}`} />
    </Button>
  );
};

export default FavoriteButton;
