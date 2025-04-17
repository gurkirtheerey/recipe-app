import { DiscoverCard } from '@/components/DiscoverCard';
import { getAllRecipes } from '../recipes/actions';
import { createClient } from '@/lib/supabase/server';
import { redirect } from 'next/navigation';
export default async function DiscoverPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect('/login');
  }

  const recipes = await getAllRecipes(user.id);

  return (
    <div className="container mx-auto py-8 space-y-8 px-2 sm:px-16 lg:px-24">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Discover Recipes</h1>
      <div className="flex flex-col justify-center items-center">
        {recipes.map((recipe) => (
          <DiscoverCard key={recipe.id} item={recipe} />
        ))}
      </div>
    </div>
  );
}
