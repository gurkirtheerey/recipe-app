import { createClient } from '@/lib/supabase/server';
import { Recipe, RecipeWithFavorites } from '../../types/recipeTypes';

export async function getRecipeById(id: string): Promise<Recipe | null> {
  try {
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    const { data, error } = await supabase
      .from('recipes')
      .select(
        `
      *,
      favorites (
        is_favorite
      )
    `
      )
      .eq('id', id)
      .eq('favorites.user_id', user?.id) // only get favorite for this user
      .single();

    if (error) {
      console.error('Error fetching recipe:', error);
      return null;
    }

    return data as Recipe;
  } catch (e) {
    console.error('Unexpected error in getRecipeById:', e);
    return null;
  }
}

export async function getMyRecipes(user_id: string): Promise<Recipe[]> {
  const supabase = await createClient();
  // Get the user's recipes sorted by most recent
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data as Recipe[];
}

export async function getMyRecipesCarousel(user_id: string): Promise<Recipe[]> {
  const supabase = await createClient();
  // Get the user's 6 most recent recipes
  const { data, error } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', user_id)
    .order('created_at', { ascending: false })
    .limit(6);

  if (error) {
    throw new Error(error.message);
  }
  return data as Recipe[];
}

export async function getAllRecipes(user_id: string): Promise<RecipeWithFavorites[]> {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from('recipes')
    .select(
      `
    *,
    favorites (
      is_favorite
    )
  `
    )
    .eq('favorites.user_id', user_id)
    .order('created_at', { ascending: false });

  if (error) {
    throw new Error(error.message);
  }
  return data as RecipeWithFavorites[];
}
