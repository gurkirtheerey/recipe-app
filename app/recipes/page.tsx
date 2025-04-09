'use client';
import { type RecipeRowProps } from '@/types/recipeTypes';
import { RecipeRow } from '@/components/Recipe/RecipeRow';
import { useFavoriteCarousel } from '@/hooks/useFavorite';
import { useRecipeCarousel } from '@/hooks/useRecipe';

export default function RecipesPage() {
  const { favoriteCarousel, favoriteCarouselLoading } = useFavoriteCarousel();
  const { myRecipeCarousel, myRecipeCarouselLoading } = useRecipeCarousel();

  const rows: RecipeRowProps[] = [
    {
      title: 'My Recipes',
      items: myRecipeCarousel || [],
      isLoading: myRecipeCarouselLoading,
      type: 'recipe' as const,
    },
    {
      title: 'Favorite Recipes',
      items: favoriteCarousel || [],
      isLoading: favoriteCarouselLoading,
      type: 'recipe' as const,
    },
  ];

  return (
    <main className="min-h-screen bg-background overflow-x-hidden">
      <div className="container mx-auto py-8 space-y-8 px-2 sm:px-16 lg:px-24">
        {rows.map((row) =>
          row.isLoading ? (
            <div key={row.title} className="space-y-4">
              <div className="flex items-center justify-between">
                <h2 className="text-2xl font-bold tracking-tight">{row.title}</h2>
              </div>
              <div className="relative -mx-4 sm:mx-0">
                <div className="flex gap-4 overflow-hidden">
                  {[...Array(3)].map((_, i) => (
                    <div key={i} className="min-w-[280px] pl-1 sm:pl-4">
                      <div className="h-[200px] bg-muted-foreground/20 rounded-lg animate-pulse" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <RecipeRow key={row.title} {...row} />
          )
        )}
      </div>
    </main>
  );
}
