import { createClient } from '@/lib/supabase/client';
import { Rating } from '@/types/ratingTypes';

export const ratingsService = {
  async getRating(recipeId: string, userId: string): Promise<number> {
    const supabase = createClient();
    const { data } = await supabase
      .from('ratings')
      .select('rating')
      .eq('recipe_id', recipeId)
      .eq('user_id', userId)
      .single();

    return data?.rating || 0;
  },

  async updateRating(rating: Rating): Promise<void> {
    const supabase = createClient();
    await supabase.from('ratings').upsert(rating);
  },
};
