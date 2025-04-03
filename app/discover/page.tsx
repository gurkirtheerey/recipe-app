import { getAllRecipes } from '../recipes/actions';
import { RecipeListPage } from '@/components/Recipe/RecipeListPage';

export default async function DiscoverPage() {
  const recipes = await getAllRecipes();

  return <RecipeListPage title="Discover Recipes" items={recipes} type="recipe" />;
}
