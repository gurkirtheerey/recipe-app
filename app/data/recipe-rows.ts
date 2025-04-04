import { getMyRecipes } from '../recipes/actions';
import { favoriteRecipes } from './dummy-recipes';
import { createClient } from '@/lib/supabase/server';

export async function getRecipeRows() {
  // Get the user from the session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // Get the user's recipes
  const myRecipes = await getMyRecipes(user.id);

  return [
    {
      title: 'My Recipes',
      items: myRecipes,
      type: 'recipe' as const,
    },
    {
      title: 'Favorite Recipes',
      items: favoriteRecipes, // still getting from dummy data
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
