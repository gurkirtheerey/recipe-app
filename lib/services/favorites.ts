import { createClient } from '@/lib/supabase/client';
import { Favorite } from '@/types/favoriteTypes';
export const favoritesService = {
  async updateFavorite(favorite: Favorite): Promise<void> {
    const supabase = createClient();
    await supabase.from('favorites').upsert(favorite);
  },
};
