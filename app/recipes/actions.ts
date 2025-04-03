import { createClient } from '@/lib/supabase/server';
import { Recipe } from '../../types/recipeTypes';

export async function getRecipes(): Promise<Recipe[]> {
  
  const supabase = await createClient();
  const { data, error } = await supabase.from('recipes').select('*');

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
