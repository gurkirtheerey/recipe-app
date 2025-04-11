import { Recipe } from '@/types/recipeTypes';
import { createClient } from '../supabase/client';

export const recipesService = {
  async getMyRecipesCarousel(user_id: string): Promise<Recipe[]> {
    const supabase = createClient();
    const { data, error } = await supabase
      .from('recipes')
      .select('*')
      .eq('user_id', user_id)
      .order('created_at', { ascending: false })
      .limit(6);

    if (error) {
      console.error('Error fetching recipes:', error);
      return [];
    }

    return data as Recipe[];
  },
};
