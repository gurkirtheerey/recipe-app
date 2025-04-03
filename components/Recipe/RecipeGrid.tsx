import { RecipeCard } from "@/components/Recipe/RecipeCard";
import { type Recipe, type Collection } from "@/types/recipeTypes";

interface RecipeGridProps {
  items?: (Recipe | Collection)[];
  type: "recipe" | "collection";
  className?: string;
}

export function RecipeGrid({ items, type, className = "" }: RecipeGridProps) {
  return (
    <div
      className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6 ${className}`}
    >
      {items?.map((item) => (
        <RecipeCard key={item.id} item={item} type={type} />
      ))}
    </div>
  );
}
