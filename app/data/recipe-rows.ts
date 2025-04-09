import { getMyRecipesCarousel } from '../recipes/actions';
import { createClient } from '@/lib/supabase/server';
import { getFavoriteCarousel } from '@/app/favorite-recipes/actions';
export async function getRecipeRows() {
  // Get the user from the session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // Get the user's recipes
  const myRecipes = await getMyRecipesCarousel(user.id);
  const favorites = await getFavoriteCarousel(user.id);

  return [
    {
      title: 'My Recipes',
      items: myRecipes,
      type: 'recipe' as const,
    },
    {
      title: 'Favorite Recipes',
      items: favorites,
      type: 'recipe' as const,
    },
    // TODO: Add recipe collections
    //   {
    //     title: "Recipe Collections",
    //     items: collections,
    //     type: "collection" as const,
    //   },
  ];
}
