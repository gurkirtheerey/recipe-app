import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

/**
 * Get the user's dashboard data
 * User's favorites and recent recipes
 * @returns A JSON object containing the user's dashboard data - user, favorites, recent recipes
 */
export async function GET() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const { data: favorites, error: favoritesError } = await supabase
    .from('favorites')
    .select(
      `
    recipe:recipes(
      *,
      user:profiles!recipes_user_id_fkey(*)
    )
  `
    )
    .eq('user_id', user.id)
    .eq('is_favorite', true);

  if (favoritesError) {
    return NextResponse.json({ error: favoritesError.message }, { status: 500 });
  }

  const { data: recentRecipes, error: recentRecipesError } = await supabase
    .from('recipes')
    .select('*')
    .eq('user_id', user.id)
    .order('created_at', { ascending: false })
    .limit(7);

  if (recentRecipesError) {
    return NextResponse.json({ error: recentRecipesError.message }, { status: 500 });
  }

  return NextResponse.json({ user, favorites, recentRecipes });
}
