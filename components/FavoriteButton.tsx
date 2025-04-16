'use client';

import { Heart, Loader2 } from 'lucide-react';
import React, { useState } from 'react';
import { Button } from './ui/button';
import { useParams } from 'next/navigation';
import { useFavorite } from '@/hooks/useFavorite';
import { useAuth } from '@/hooks/useAuth';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';

const FavoriteButton = ({ type, id, isFavorite }: { type?: 'post' | 'recipe'; id?: string; isFavorite?: boolean }) => {
  const [toggle, setToggle] = useState(isFavorite);
  const params = useParams();
  const { user } = useAuth();
  const recipeId = id || (params.id as string);
  const { createFavorite, deleteFavorite } = useFavorite(recipeId);

  const handleFavorite = useMutation({
    mutationFn: async (newState: boolean) => {
      if (!user) return;
      if (newState) {
        await createFavorite();
        toast.success('Added to favorites');
        setToggle(true);
      } else {
        await deleteFavorite();
        toast.success('Removed from favorites');
        setToggle(false);
      }
    },
  });

  return (
    <Button
      onClick={() => handleFavorite.mutate(!isFavorite)}
      disabled={handleFavorite.isPending}
      className={
        type === 'post'
          ? 'p-0 has-[>svg]:p-0 bg-transparent shadow-none hover:bg-transparent disabled:opacity-50'
          : 'p-2 bg-gray-200 rounded-full hover:bg-gray-300 disabled:opacity-50'
      }
    >
      {handleFavorite.isPending ? (
        <Loader2 className="animate-spin text-black" size={20} />
      ) : (
        <Heart
          className={`${toggle ? 'fill-red-500 text-red-500' : type === 'post' ? 'text-gray-800' : 'text-black'}`}
        />
      )}
    </Button>
  );
};

export default FavoriteButton;
