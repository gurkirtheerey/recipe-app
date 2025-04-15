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

  /**
   * This query is used to fetch the favorite recipes for a user.
   * It joins the favorites table with the recipes table and returns the recipes that are favorites.
   * It also orders the recipes by the date they were favorited and limits the number of recipes to 6.
   * @param userId - The user ID of the user to fetch the favorite recipes for.
   * @returns A promise that resolves to an array of favorite recipes.
   */
  async getFavoriteCarousel(userId: string): Promise<Recipe[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('favorites')
      .select('recipe:recipes(*)')
      .eq('user_id', userId)
      .eq('is_favorite', true)
      .order('favorited_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Error fetching favorites:', error);
      return [];
    }

    return data.map((item) => item.recipe as unknown as Recipe);
  },
};
