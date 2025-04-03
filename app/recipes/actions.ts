import { createClient } from '@/lib/supabase/server';
import { Recipe } from '../../types/recipeTypes';

export async function getRecipeById(id: string): Promise<Recipe | null> {
  
  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('id', id)
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
  const { data, error } = await supabase.from('recipes').select('*').eq('user_id', user_id);

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
