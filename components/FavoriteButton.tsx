'use client';

import { Heart, Loader2 } from 'lucide-react';
import React from 'react';
import { Button } from './ui/button';
import { useParams } from 'next/navigation';
import { useFavorite } from '@/hooks/useFavorite';

const FavoriteButton = ({ type, id }: { type?: 'post'; id?: string }) => {
  const params = useParams();
  const recipeId = id || (params.id as string);
  const { updateFavoriteStatus, isFavorite, favoriteStatusLoading } = useFavorite(recipeId);

  const handleClick = () => {
    updateFavoriteStatus(!isFavorite);
  };

  return (
    <Button
      onClick={handleClick}
      className={
        type === 'post'
          ? // has-[>svg]:p-0 --> overrides Button styling
            'p-0 has-[>svg]:p-0 bg-transparent shadow-none hover:bg-transparent'
          : 'p-2 bg-gray-200 rounded-full hover:bg-gray-300'
      }
    >
      {favoriteStatusLoading ? (
        <Loader2 className="animate-spin text-black" />
      ) : (
        <Heart
          className={`${isFavorite ? 'fill-red-500 text-red-500' : type === 'post' ? 'text-white' : 'text-black'}`}
        />
      )}
    </Button>
  );
};

export default FavoriteButton;
