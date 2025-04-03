import { RecipeListPage } from '@/components/Recipe/RecipeListPage';
import { getMyRecipes } from '../recipes/actions';
import { createClient } from '@/lib/supabase/server';

export default async function RecentRecipesPage() {
  // Get the user from the session
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) return;

  // Get the user's recipes
  const myRecipes = await getMyRecipes(user.id);

  return <RecipeListPage title="My Recipes" items={myRecipes} type="recipe" />;
}
