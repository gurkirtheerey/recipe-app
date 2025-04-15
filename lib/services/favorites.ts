import { createClient } from '@/lib/supabase/client';
import { Favorite } from '@/types/favoriteTypes';
import { Recipe } from '@/types/recipeTypes';

export const favoritesService = {
  async updateFavorite(favorite: Favorite): Promise<void> {
    const supabase = createClient();
    await supabase.from('favorites').upsert(favorite);
  },

  async getFavoriteStatus(recipeId: string, userId: string): Promise<boolean> {
    const supabase = createClient();
    const { data } = await supabase
      .from('favorites')
      .select('is_favorite')
      .eq('user_id', userId)
      .eq('recipe_id', recipeId)
      .single();

    return !!data?.is_favorite;
  },

  async deleteFavorite(recipeId: string, userId: string): Promise<void> {
    const supabase = createClient();
    await supabase.from('favorites').delete().eq('user_id', userId).eq('recipe_id', recipeId);
  },

  async getFavoriteCarousel(userId: string): Promise<Recipe[]> {
    const supabase = createClient();
    // get recipes that are favorited by the user using inner join
    const { data: recipes, error } = await supabase
      .from('recipes')
      .select('*, favorites!inner(*)') // inner join
      .eq('favorites.is_favorite', true)
      .eq('favorites.user_id', userId)
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }

    return recipes;
  },
};
