import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Link from "next/link";
import {
  type Recipe,
  type Collection,
  recentRecipes,
  favoriteRecipes,
  collections,
} from "@/app/data/dummy-recipes";

interface RecipeRowProps {
  title: string;
  items: Recipe[] | Collection[];
  type: "recipe" | "collection";
}

function RecipeRow({ title, items, type }: RecipeRowProps) {
  return (
    <div className="space-y-4">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      <div className="relative w-full">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-full"
        >
          <CarouselContent className="-ml-1 sm:-ml-4">
            {items.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-1 sm:pl-4 basis-[200px] min-w-0 sm:basis-[300px]"
              >
                <Link href={`/${type}s/${item.id}`}>
                  <Card className="h-full">
                    <CardHeader className="p-0">
                      <div className="aspect-[16/9] w-full overflow-hidden rounded-t-lg">
                        <img
                          src={
                            type === "recipe"
                              ? (item as Recipe).image
                              : (item as Collection).coverImage
                          }
                          alt={item.title}
                          className="h-full w-full object-cover transition-transform hover:scale-105"
                          loading="lazy"
                        />
                      </div>
                      <div className="p-2 sm:p-6">
                        <CardTitle className="line-clamp-1 text-sm sm:text-lg">
                          {item.title}
                        </CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent className="hidden sm:block p-6">
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <div className="sm:block">
            <CarouselPrevious className="hidden sm:flex -left-12 lg:-left-16" />
            <CarouselNext className="hidden sm:flex -right-12 lg:-right-16" />
          </div>
        </Carousel>
      </div>
    </div>
  );
}

export default function ProfilePage() {
  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="container relative mx-auto py-8 space-y-8 px-2 sm:px-16 lg:px-24">
        <RecipeRow title="Recent Recipes" items={recentRecipes} type="recipe" />
        <RecipeRow
          title="Favorite Recipes"
          items={favoriteRecipes}
          type="recipe"
        />
        <RecipeRow
          title="Recipe Collections"
          items={collections}
          type="collection"
        />
      </div>
    </main>
  );
}
