import { type RecipeRowProps } from "@/types/recipeTypes";
import { RecipeRow } from "@/components/Recipe/RecipeRow";
import rows from "../data/recipe-rows";
export default async function RecipesPage() {


  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="container mx-auto py-8 space-y-8 px-2 sm:px-16 lg:px-24">
        {rows.map((row: RecipeRowProps) => (
          <RecipeRow key={row.title} {...row} />
        ))}
      </div>
    </main>
  );
}
