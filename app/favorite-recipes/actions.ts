import { createClient } from '@/lib/supabase/server';
import { getRecipeById } from '../recipes/actions';
import { Recipe } from '@/types/recipeTypes';

export async function getFavoriteCarousel(userId: string): Promise<Recipe[]> {
  const supabase = await createClient();
  // Get the user's most recent 6 favorite recipes
  const { data, error } = await supabase
    .from('favorites')
    .select('*')
    .eq('user_id', userId)
    .eq('is_favorite', true)
    .order('favorited_at', { ascending: false })
    .limit(6);

  // Call getRecipeById for each favorited recipe to retrieve the recipe data
  const recipes = await Promise.all(
    data?.map(async (favorite) => {
      const recipe = await getRecipeById(favorite.recipe_id);
      return recipe;
    }) || []
  );

  if (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }

  // Ensure recipes are not null and return the recipes that were successfully fetched
  return recipes.filter((recipe) => recipe !== null) as Recipe[];
}

export async function getUserFavorites(userId: string): Promise<Recipe[]> {
  const supabase = await createClient();
  // Get the user's favorite recipes
  const { data, error } = await supabase.from('favorites').select('*').eq('user_id', userId).eq('is_favorite', true);

  // Call getRecipeById for each favorited recipe to retrieve the recipe data
  const recipes = await Promise.all(
    data?.map(async (favorite) => {
      const recipe = await getRecipeById(favorite.recipe_id);
      return recipe;
    }) || []
  );

  if (error) {
    console.error('Error fetching favorites:', error);
    return [];
  }

  // Ensure recipes are not null and return the recipes that were successfully fetched
  return recipes.filter((recipe) => recipe !== null) as Recipe[];
}
