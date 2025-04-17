'use client';
import { useMutation, useQuery } from '@tanstack/react-query';
import { User } from '@supabase/supabase-js';
import { Ingredient } from '@/types/ingredientTypes';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import { useState } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Card } from '@/components/ui/card';
import { ShoppingCart, Plus, Trash2, Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Skeleton } from '@/components/ui/skeleton';

const ShoppingListContent = ({ user }: { user: User }) => {
  const queryClient = useQueryClient();
  const [name, setName] = useState('');
  const [deletingIngredients, setDeletingIngredients] = useState<string[]>([]);
  const { data, isLoading, error } = useQuery({
    queryKey: ['shopping-list', user.id],
    queryFn: () => fetch('/api/shopping-list').then((res) => res.json()),
    enabled: !!user,
  });

  const handleAddItem = useMutation({
    mutationFn: async (name: string) => {
      const res = await fetch('/api/shopping-list', {
        method: 'POST',
        body: JSON.stringify({ name }),
      });
      const { data, error } = await res.json();
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      setName('');
      queryClient.invalidateQueries({ queryKey: ['shopping-list', user.id] });
      toast.success('Item added to shopping list');
      return data;
    },
  });

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    handleAddItem.mutate(name);
  };

  const handleDeleteItem = useMutation({
    mutationFn: async (ids: string[]) => {
      const isMultiple = ids.length > 1;
      const res = await fetch('/api/shopping-list', {
        method: 'DELETE',
        body: JSON.stringify({ ids }),
      });
      const { data, error } = await res.json();
      if (error) {
        toast.error(error.message);
        throw new Error(error.message);
      }
      queryClient.invalidateQueries({ queryKey: ['shopping-list', user.id] });
      toast.success(isMultiple ? 'Items deleted from shopping list' : 'Item deleted from shopping list');
      return data;
    },
    onSettled: () => {
      setDeletingIngredients([]);
    },
  });

  const handleCircleClick = (ingredientId: string) => {
    setDeletingIngredients((prev) => [...prev, ingredientId]);
    // Add a slight delay before actually deleting to allow for the animation
    setTimeout(() => {
      handleDeleteItem.mutate([ingredientId]);
    }, 500);
  };

  const handleClearAll = () => {
    if (ingredients.length > 0) {
      handleDeleteItem.mutate(ingredients.map((ingredient: Ingredient) => ingredient.id));
    }
  };

  if (isLoading) {
    return (
      <div className="max-w-3xl mx-auto p-4 space-y-6">
        <div className="flex items-center gap-2 mb-6">
          <Skeleton className="h-6 w-6 rounded-full" />
          <Skeleton className="h-8 w-48" />
        </div>

        <Card className="p-4">
          <div className="space-y-2">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex items-center justify-between px-4 py-3 rounded-md border bg-card/50">
                <div className="flex items-center gap-3">
                  <Skeleton className="w-6 h-6 rounded-full" />
                  <Skeleton className="h-5 w-32" />
                </div>
                <Skeleton className="h-8 w-8 rounded-md" />
              </div>
            ))}
          </div>
        </Card>

        <div className="flex gap-2">
          <div className="relative flex-1">
            <Skeleton className="h-9 w-full" />
          </div>
          <Skeleton className="h-9 w-28" />
        </div>
      </div>
    );
  }

  if (error) {
    return <div>Error: {error.message}</div>;
  }

  if (!data) {
    return <div>No data</div>;
  }

  const { ingredients } = data;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <div className="flex items-center gap-2 mb-6">
        <ShoppingCart className="text-primary h-6 w-6" />
        <h1 className="text-2xl font-bold">Shopping List</h1>
      </div>
      {/* Shopping list form */}
      <form onSubmit={onSubmit} className="flex gap-2">
        <div className="relative flex-1">
          <Input
            type="text"
            placeholder="Add ingredient"
            value={name}
            onChange={(e) => setName(e.target.value)}
            disabled={handleAddItem.isPending || handleDeleteItem.isPending}
            className="pr-10"
          />
          <Button
            type="submit"
            size="icon"
            variant="ghost"
            className={cn(
              'absolute right-1 top-1/2 -translate-y-1/2 h-7 w-7',
              !name && 'opacity-50 pointer-events-none'
            )}
            disabled={!name || handleAddItem.isPending || handleDeleteItem.isPending}
          >
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <Button
          variant="destructive"
          onClick={handleClearAll}
          disabled={ingredients.length === 0 || handleDeleteItem.isPending || handleAddItem.isPending}
          className="whitespace-nowrap"
          type="button"
        >
          <Trash2 className="h-4 w-4" />
          Clear All
        </Button>
      </form>
      {/* Shopping list ingredients */}
      <Card className="p-4">
        {ingredients.length === 0 ? (
          <div className="text-center py-6 text-muted-foreground">Your shopping list is empty</div>
        ) : (
          <ul className="space-y-2">
            {ingredients.map((ingredient: Ingredient) => {
              const isDeleting = deletingIngredients.includes(ingredient.id);
              return (
                <li
                  key={ingredient.id}
                  className={cn(
                    'group flex items-center justify-between px-4 py-3 rounded-md border bg-card transition-all',
                    isDeleting && 'opacity-50'
                  )}
                >
                  <div className="flex items-center gap-3">
                    <div
                      onClick={() => !isDeleting && handleCircleClick(ingredient.id)}
                      className={cn(
                        'w-6 h-6 rounded-full border flex items-center justify-center cursor-pointer transition-all',
                        isDeleting
                          ? 'bg-primary border-primary text-primary-foreground'
                          : 'border-border hover:border-primary/50'
                      )}
                    >
                      {isDeleting && <Check className="h-3 w-3" />}
                    </div>
                    <span className={cn('text-base transition-all', isDeleting && 'line-through')}>
                      {ingredient.name}
                    </span>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="h-8 w-8 text-muted-foreground hover:text-foreground"
                    onClick={() => handleDeleteItem.mutate([ingredient.id])}
                    aria-label={`Options for ${ingredient.name}`}
                    disabled={isDeleting}
                  >
                    <svg
                      width="20"
                      height="20"
                      viewBox="0 0 15 3"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <circle cx="1.5" cy="1.5" r="1.5" />
                      <circle cx="7.5" cy="1.5" r="1.5" />
                      <circle cx="13.5" cy="1.5" r="1.5" />
                    </svg>
                  </Button>
                </li>
              );
            })}
          </ul>
        )}
      </Card>
    </div>
  );
};

export default ShoppingListContent;
