import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import {
  type Recipe,
  type Collection,
  recentRecipes,
  favoriteRecipes,
  collections,
} from "@/app/data/dummy-recipes";
import { createClient } from "@/lib/supabase/server";
import { RecipeCard } from "@/components/RecipeCard";

interface RecipeRowProps {
  title: string;
  items: Recipe[] | Collection[];
  type: "recipe" | "collection";
}

function RecipeRow({ title, items, type }: RecipeRowProps) {
  const route = title.toLowerCase().replace(/\s+/g, "-");
  const displayItems = items.slice(0, 6);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
        <Link
          href={`/${route}`}
          className="text-sm text-primary hover:underline"
        >
          View All
        </Link>
      </div>
      <div className="relative -mx-4 sm:mx-0">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
        >
          <CarouselContent className="-ml-1 pr-2 sm:-ml-4 sm:pr-0">
            {displayItems.map((item) => (
              <CarouselItem
                key={item.id}
                className="pl-1 sm:pl-4 basis-[280px] min-w-0"
              >
                <RecipeCard item={item} type={type} />
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

export default async function ProfilePage() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  const rows = [
    { title: "Recent Recipes", items: recentRecipes, type: "recipe" as const },
    {
      title: "Favorite Recipes",
      items: favoriteRecipes,
      type: "recipe" as const,
    },
    {
      title: "Recipe Collections",
      items: collections,
      type: "collection" as const,
    },
  ];

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="container mx-auto py-8 space-y-8 px-2 sm:px-16 lg:px-24">
        {rows.map((row) => (
          <RecipeRow key={row.title} {...row} />
        ))}
      </div>
    </main>
  );
}
