import { createClient } from '@/lib/supabase/server';
import { Recipe } from '../../types/recipeTypes';

export async function getRecipes(userId: string): Promise<Recipe[]> {
  const supabase = await createClient();
  const { data, error } = await supabase.from('recipes').select('*').eq('user_id', userId);

  if (error) {
    throw new Error(error.message);
  }
  return data as Recipe[];
}

export async function createRecipe(recipe: Recipe) {
  const supabase = await createClient();
  const { data, error } = await supabase.from('recipes').insert(recipe);

  if (error) {
    throw new Error(error.message);
  }

  return data;
}
