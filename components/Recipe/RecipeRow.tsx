import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import Link from 'next/link';
import { type RecipeRowProps } from '@/types/recipeTypes';
import { RecipeCard } from './RecipeCard';
import { Button } from '@/components/ui/button';
import { ChefHat } from 'lucide-react';

export function RecipeRow({ title, items, type }: RecipeRowProps) {
  // Convert title to lowercase and replace spaces with hyphens i.e. "Recent Recipes" -> "recent-recipes"
  const route = title.toLowerCase().replace(/\s+/g, '-');

  // Header with with title and 'view all' link
  const Header = () => (
    <div className="flex items-center justify-between">
      <h2 className="text-2xl font-bold tracking-tight">{title}</h2>
      {items && items.length > 0 && (
        <Link href={`/${route}`} className="text-sm text-primary hover:underline">
          View All
        </Link>
      )}
    </div>
  );

  // If no items are available, show message with 'Explore Recipes' button--routes to /discover
  if (!items || items.length === 0) {
    return (
      <div className="space-y-4">
        <Header />
        <div className="h-[300px] rounded-lg border border-dashed border-muted-foreground/25 flex items-center justify-center bg-muted/50">
          <div className="flex flex-col items-center gap-3 max-w-md text-center px-4">
            <ChefHat className="h-8 w-8 text-muted-foreground" />
            <div>
              <p className="font-semibold">No {title === 'My Recipes' ? 'recipes' : title.toLowerCase()} available</p>
              <p className="text-sm text-muted-foreground mt-1">
                {type === 'recipe'
                  ? 'Start exploring our collection to find delicious recipes!'
                  : 'Create your first collection to organize your favorite recipes!'}
              </p>
            </div>
            <Link href="/discover">
              <Button variant="outline" size="sm" className="mt-2">
                Explore Recipes
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <Header />
      <div className="relative -mx-4 sm:mx-0">
        {/* Carousel component */}
        <Carousel
          opts={{
            align: 'start',
            loop: true,
          }}
        >
          <CarouselPrevious className="hidden sm:flex absolute -left-12 lg:-left-16 z-10" />
          <CarouselContent className="-ml-1 pr-2 sm:-ml-4 sm:pr-0">
            {items.map((item) => (
              <CarouselItem key={item.id} className="pl-1 sm:pl-4 basis-[200px]">
                <RecipeCard item={item} type={type} />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselNext className="hidden sm:flex absolute -right-12 lg:-right-16 z-10" />
        </Carousel>
      </div>
    </div>
  );
}
