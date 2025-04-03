import { favoriteRecipes } from "@/app/data/dummy-recipes";
import { RecipeListPage } from "@/components/Recipe/RecipeListPage";

export default function FavoriteRecipesPage() {
  return (
    <RecipeListPage
      title="Favorite Recipes"
      items={favoriteRecipes}
      type="recipe"
    />
  );
}
