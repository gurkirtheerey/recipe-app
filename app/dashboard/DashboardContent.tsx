'use client';

import { Button } from '@/components/ui/button';
import { useState } from 'react';
import CreateRecipeModal from '@/components/Recipe/CreateRecipe/create-recipe-modal';
import { useQuery } from '@tanstack/react-query';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MixpanelUserSetup } from '@/lib/mixpanel/mixpanelClient';
import { Recipe, Profile } from '@/types';
import { PlusIcon, HeartIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { getGreeting } from '@/lib/utils/getGreeting';
import Loading from './loading';
type FavoriteWithProfile = {
  recipe: Recipe & { user: Profile };
};

export default function DashboardContent({ userId }: { userId: string }) {
  MixpanelUserSetup(); // Initialize Mixpanel on user login/signup dashboard page
  const [open, setOpen] = useState(false);

  const { data, isLoading, error } = useQuery({
    queryKey: ['dashboard', userId],
    queryFn: async () => {
      const res = await fetch('/api/dashboard');
      return res.json();
    },
    enabled: !!userId,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  const { favorites, recentRecipes, user } = data;

  const favoriteRecipes = favorites.map((favorite: FavoriteWithProfile) => favorite.recipe);

  return (
    <>
      <div className="flex justify-between p-4 w-full">
        {/* User greeting */}
        <div>
          <span className="text-2xl font-medium">{getGreeting()}, </span>
          <span className="text-2xl font-semibold">
            {user?.user_metadata?.first_name
              ? user.user_metadata.first_name.charAt(0).toUpperCase() + user.user_metadata.first_name.slice(1)
              : user?.email}
            .
          </span>
        </div>
        {/* Create recipe button on desktop */}
        <div className="hidden md:flex justify-center gap-2">
          <Button onClick={() => setOpen((prev) => !prev)}>
            <PlusIcon className="w-4 h-4 mr-2" />
            Create Recipe
          </Button>
        </div>
      </div>
      {/* Dashboard content */}
      <div className="grid grid-cols-1 sm:grid-cols-[60%_39%] gap-4 p-4">
        {/* Favorites card */}
        <Card className="min-h-[300px] max-h-[300px]">
          <CardHeader>
            <CardTitle>Favorites</CardTitle>
            <CardDescription>You have {favoriteRecipes.length} favorite recipes.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[500px]">
              {favoriteRecipes.map((recipe: Recipe) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.id}`}
                  className="flex items-center gap-2 justify-between hover:bg-muted p-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    <Image
                      src={recipe.user?.profile_picture || ''}
                      alt={recipe.title}
                      width={30}
                      height={30}
                      className="rounded-full mr-2"
                    />
                    <div className="flex flex-col">
                      <h2 className="text-md font-medium">{recipe.title}</h2>
                      <p className="text-sm text-muted-foreground">{recipe.user?.username}</p>
                    </div>
                  </div>
                  <Button variant="outline" size="icon">
                    <HeartIcon fill="red" className="w-4 h-4" />
                  </Button>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
        {/* Recent recipes card */}
        <Card className="min-h-[300px] max-h-[300px]">
          <CardHeader>
            <CardTitle>Recent Recipes</CardTitle>
            <CardDescription>Here are your most recent recipes you&apos;ve created.</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col gap-4 overflow-y-auto max-h-[200px]">
              {recentRecipes.map((recipe: Recipe) => (
                <Link
                  key={recipe.id}
                  href={`/recipes/${recipe.id}`}
                  className="flex items-center gap-2 justify-between hover:bg-muted p-2 rounded-md"
                >
                  <div className="flex items-center gap-2">
                    {recipe.image && (
                      <Image
                        src={recipe.image}
                        alt={recipe.title}
                        width={30}
                        height={30}
                        className="rounded-full mr-2"
                      />
                    )}
                    <div className="flex flex-col">
                      <h2 className="text-md font-medium">{recipe.title}</h2>
                      <p className="text-sm text-muted-foreground">{recipe.user?.username}</p>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Floating Action Button for mobile */}
      <div className="md:hidden fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setOpen((prev) => !prev)}
          size="lg"
          className="rounded-full w-14 h-14 shadow-lg bg-black hover:bg-black/80"
        >
          <PlusIcon className="w-6 h-6" />
          <span className="sr-only">Create Recipe</span>
        </Button>
      </div>

      {/* Create recipe modal */}
      {open && <CreateRecipeModal open={open} setOpen={setOpen} />}
    </>
  );
}
