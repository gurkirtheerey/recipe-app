import { createClient } from '@/lib/supabase/server';
import { Recipe } from '../../types/recipeTypes';
import { Profile } from '@/types/profileTypes';

type RecipeWithProfile = {
  recipe: Recipe;
  profile: Profile;
};

/**
 * Get a recipe by its ID
 * @param id - The ID of the recipe to get
 * @returns A promise that resolves to the recipe and its profile
 */
export async function getRecipeById(id: string): Promise<RecipeWithProfile> {
  try {
    const supabase = await createClient();
    // Get the recipe
    const { data: recipe, error: recipeError } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
      .single<Recipe>();

    // If the recipe is not found, throw an error
    if (recipeError || !recipe) {
      console.error('Error fetching recipe:', recipeError);
      throw new Error('Recipe not found');
    }

    // Get the user's profile
    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('id', recipe.user_id)
      .single<Profile>();

    // If the profile is not found, throw an error
    if (profileError || !profile) {
      console.error('Error fetching profile:', profileError);
      console.error('Profile query details:', {
        userId: recipe.user_id,
        error: profileError,
      });
      throw new Error('Profile not found');
    }

    // Return the recipe and profile
    return { recipe, profile };
  } catch (e) {
    // If an unexpected error occurs, throw an error
    console.error('Unexpected error in getRecipeById:', e);
    throw new Error('Unexpected error in getRecipeById');
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

export async function getAllRecipes(): Promise<Recipe[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('recipes').select('*');

  if (error) {
    throw new Error(error.message);
  }
  return data as Recipe[];
}
