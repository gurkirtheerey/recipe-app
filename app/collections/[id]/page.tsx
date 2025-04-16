'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useParams } from 'next/navigation';
import Loading from './loading';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from '@/components/ui/dialog';
import { Collection, Recipe } from '@/types';
import { useEffect, useState } from 'react';
import { RecipeCard } from '@/components/Recipe/RecipeCard';
import { toast } from 'sonner';
import { useQueryClient } from '@tanstack/react-query';
import { ContextMenu, ContextMenuItem, ContextMenuContent, ContextMenuTrigger } from '@/components/ui/context-menu';

const CollectionIdPage = () => {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const [selectedRecipes, setSelectedRecipes] = useState<Recipe[]>([]);
  const { id } = useParams();
  const { data, isLoading, error } = useQuery<{
    collection: Collection;
    recipes: Recipe[];
    myRecipes: Recipe[];
  }>({
    queryKey: ['collections', id],
    queryFn: () => fetch(`/api/collections/${id}`).then((res) => res.json()),
  });

  useEffect(() => {
    if (data) {
      setSelectedRecipes(data.recipes);
    }
  }, [data]);

  const handleClick = (recipe: Recipe) => {
    if (selectedRecipes.find((r) => r.id === recipe.id)) {
      setSelectedRecipes(selectedRecipes.filter((r) => r.id !== recipe.id));
    } else {
      setSelectedRecipes([...selectedRecipes, recipe]);
    }
  };

  const handleDelete = useMutation({
    mutationFn: async ({ collectionId, recipeId }: { collectionId: string; recipeId: string }) => {
      const res = await fetch(`/api/collections/${collectionId}`, {
        method: 'DELETE',
        body: JSON.stringify({ recipeId }),
      });
      if (!res.ok) {
        toast.error('Failed to delete recipe from collection');
        throw new Error('Failed to delete recipe from collection');
      }
      const data = await res.json();
      queryClient.invalidateQueries({ queryKey: ['collections', id] });
      toast.success('Recipe deleted from collection');
      return data;
    },
  });

  const handleAddRecipes = useMutation({
    mutationFn: async () => {
      const collectionRecipes = selectedRecipes.map((r) => ({ recipe_id: r.id, collection_id: id }));
      await fetch(`/api/collections/${id}`, {
        method: 'POST',
        body: JSON.stringify(collectionRecipes),
      });
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ['collections', id] });
      toast.success('Recipes added to collection');
    },
  });

  if (isLoading) {
    return <Loading />;
  }
  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { collection, recipes, myRecipes } = data;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold">{collection.name}</h1>
          <p className="text-gray-500 text-sm">{collection.description}</p>
        </div>
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger asChild>
            <Button>Add Recipe</Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add Recipe</DialogTitle>
            </DialogHeader>
            <DialogDescription>Add a recipe to your collection.</DialogDescription>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {myRecipes.map((recipe) => (
                <div
                  onClick={() => handleClick(recipe)}
                  key={recipe.id}
                  className={`border border-gray-200 bg-gray-200 rounded-lg p-4 shadow-md cursor-pointer hover:bg-gray-50 ${
                    selectedRecipes.find((r) => r.id === recipe.id) ? 'bg-gray-500' : ''
                  }`}
                >
                  <h2>{recipe.title}</h2>
                </div>
              ))}
            </div>
            <Button onClick={() => handleAddRecipes.mutate()}>
              {handleAddRecipes.isPending ? 'Adding...' : 'Add'}
            </Button>
          </DialogContent>
        </Dialog>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {recipes.map((recipe) => (
          <div key={recipe.id} className="ml-1.5 sm:pl-4 basis-[200px]">
            <ContextMenu>
              <ContextMenuTrigger>
                <RecipeCard item={recipe} type="recipe" />
              </ContextMenuTrigger>
              <ContextMenuContent>
                <ContextMenuItem
                  onClick={() => handleDelete.mutate({ collectionId: collection.id, recipeId: recipe.id })}
                >
                  Delete
                </ContextMenuItem>
              </ContextMenuContent>
            </ContextMenu>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CollectionIdPage;
