import { type Recipe, type Collection } from "@/types/recipeTypes";
import { RecipeGrid } from "@/components/Recipe/RecipeGrid";

interface RecipeListPageProps {
  title: string;
  items?: (Recipe | Collection)[];
  type: "recipe" | "collection";
}

export function RecipeListPage({ title, items, type }: RecipeListPageProps) {
  return (
    <main className="min-h-screen bg-background">
      <div className="container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold tracking-tight mb-8">{title}</h1>
        <RecipeGrid items={items} type={type} />
      </div>
    </main>
  );
}
