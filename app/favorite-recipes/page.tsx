import { createClient } from '@/lib/supabase/server';
import { RecipeListPage } from '@/components/Recipe/RecipeListPage';
import { redirect } from 'next/navigation';
import { toast } from 'sonner';
import { getUserFavorites } from './actions';

export default async function FavoriteRecipesPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Redirect to login if user is not authenticated
  if (!user) {
    toast.error('You must be logged in to view your favorite recipes');
    redirect('/login');
  }

  // Fetch user's favorite recipe IDs from the database
  const favorites = await getUserFavorites(user?.id as string);

  return <RecipeListPage title="Favorite Recipes" items={favorites} type="recipe" />;
}
