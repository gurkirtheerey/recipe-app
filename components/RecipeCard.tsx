import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { type Recipe, type Collection } from "@/app/data/dummy-recipes";
import Link from "next/link";

interface RecipeCardProps {
  item: Recipe | Collection;
  type: "recipe" | "collection";
  className?: string;
}

export function RecipeCard({ item, type, className = "" }: RecipeCardProps) {
  return (
    <Link href={`/${type}s/${item.id}`} className="block h-full">
      <Card
        className={`h-full hover:shadow-lg transition-all duration-300 ${className}`}
      >
        <CardHeader className="p-0">
          <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg">
            <img
              src={item.image}
              alt={item.title}
              className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
              loading="lazy"
            />
          </div>
          <div className="p-3 sm:p-4">
            <CardTitle className="line-clamp-1 text-base sm:text-lg">
              {item.title}
            </CardTitle>
          </div>
        </CardHeader>
        <CardContent className="hidden sm:block p-3 sm:p-4">
          {type === "recipe" ? (
            <p className="text-sm text-muted-foreground line-clamp-2">
              {(item as Recipe).description}
            </p>
          ) : (
            <p className="text-sm text-muted-foreground">
              {(item as Collection).recipeCount} recipes
            </p>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
