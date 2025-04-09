'use client';

import { Heart } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useAuth } from '@/hooks/useAuth';
import { useParams } from 'next/navigation';
import { favoritesService } from '@/lib/services/favorites';
import { Favorite } from '@/types/favoriteTypes';

const FavoriteButton = () => {
  const [isFavorite, setIsFavorite] = useState(false);

  const { user } = useAuth();

  const params = useParams();
  const recipeId = params.id as string;

  // Update the favorite status of specific recipe
  const handleClick = async () => {
    const favorite: Favorite = {
      recipe_id: recipeId,
      user_id: user?.id as string,
      is_favorite: !isFavorite,
    };
    await favoritesService.updateFavorite(favorite);
    setIsFavorite(!isFavorite);
  };

  return (
    <Button onClick={handleClick} className="p-2 bg-gray-200 rounded-full">
      <Heart className={`h-5 w-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-black'}`} />
    </Button>
  );
};

export default FavoriteButton;
