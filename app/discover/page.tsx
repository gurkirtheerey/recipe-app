import { DiscoverCard } from '@/components/DiscoverCard';
import { getAllRecipes } from '../recipes/actions';
export default async function DiscoverPage() {
  const recipes = await getAllRecipes();

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
