import { recentRecipes } from "@/app/data/dummy-recipes";
import { RecipeListPage } from "@/components/Recipe/RecipeListPage";

export default function RecentRecipesPage() {
  return (
    <RecipeListPage
      title="Recent Recipes"
      items={recentRecipes}
      type="recipe"
    />
  );
}
