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

  async getUserFavorites(userId: string): Promise<Recipe[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('favorites')
      .select('recipe_id, is_favorite')
      .eq('user_id', userId)
      .eq('is_favorite', true);

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }

    // Fetch the full recipe details for each favorite
    const recipes = await Promise.all(
      data.map(async (favorite) => {
        const { data: recipe } = await supabase.from('recipes').select('*').eq('id', favorite.recipe_id).single();
        return recipe;
      })
    );

    return recipes.filter((recipe): recipe is Recipe => recipe !== null);
  },

  async getFavoriteCarousel(userId: string): Promise<Recipe[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('favorites')
      .select('recipe_id, is_favorite')
      .eq('user_id', userId)
      .eq('is_favorite', true)
      .order('favorited_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }

    // Fetch the full recipe details for each favorite
    const recipes = await Promise.all(
      data.map(async (favorite) => {
        const { data: recipe } = await supabase.from('recipes').select('*').eq('id', favorite.recipe_id).single();
        return recipe;
      })
    );

    return recipes.filter((recipe): recipe is Recipe => recipe !== null);
  },
};
