'use client';
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Dialog } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { CreateRecipeSchema } from '@/lib/schemas/recipe';
import { Recipe } from '@/types/recipeTypes';
import { PencilIcon } from 'lucide-react';
import { useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { Skeleton } from '@/components/ui/skeleton';

const EditRecipeModal = ({ recipe }: { recipe: Recipe }) => {
  const { user, isLoading } = useAuth();
  const [open, setOpen] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateRecipeSchema>();
  const router = useRouter();

  /**
   * Reset the form with the recipe data
   */
  useEffect(() => {
    if (recipe) {
      const obj = {
        ...recipe,
        ingredients: recipe.ingredients.join('\n\n'),
        instructions: recipe.instructions.join('\n\n'),
        image: recipe.image && recipe.image !== '' ? recipe.image : undefined,
      };
      reset(obj);
    }
  }, [reset, recipe]);

  /**
   * Edit a recipe
   * @param data - The data to edit the recipe with
   * @returns The updated recipe
   */
  const handleEditRecipe = useMutation({
    mutationFn: async (data: CreateRecipeSchema) => {
      const obj = {
        ...data,
        ingredients: data.ingredients.split('\n').filter((step) => step.trim() !== ''),
        instructions: data.instructions.split('\n').filter((step) => step.trim() !== ''),
        favorites: undefined,
      };
      const res = await fetch(`/api/recipe/${recipe.id}`, {
        method: 'POST',
        body: JSON.stringify(obj),
      });
      if (!res.ok) {
        toast.error('Failed to update recipe');
        throw new Error('Failed to update recipe');
      }
      toast.success('Recipe updated successfully');
      router.refresh();
      setOpen(false);
      return res.json();
    },
  });

  const onSubmit = (data: CreateRecipeSchema) => {
    handleEditRecipe.mutate(data);
  };

  if (isLoading)
    return (
      <Skeleton className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 cursor-pointer">
        <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
      </Skeleton>
    );

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {user?.id === recipe.user_id && (
        <DialogTrigger asChild>
          <div className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 cursor-pointer">
            <PencilIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
        </DialogTrigger>
      )}
      <DialogContent className="max-h-[90vh] overflow-y-auto">
        <DialogTitle>Edit Recipe</DialogTitle>
        <DialogDescription>Edit your recipe to get started.</DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input
                type="text"
                id="title"
                placeholder="Recipe title"
                {...register('title')}
                disabled={handleEditRecipe.isPending}
              />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Recipe description"
                {...register('description')}
                disabled={handleEditRecipe.isPending}
              />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="prep_time">Prep Time</Label>
                <Input
                  type="number"
                  id="prep_time"
                  placeholder="Mins"
                  {...register('prep_time', { valueAsNumber: true })}
                  disabled={handleEditRecipe.isPending}
                />
                {errors.prep_time && <p className="text-red-500">{errors.prep_time.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="cook_time">Cook Time</Label>
                <Input
                  type="number"
                  id="cook_time"
                  placeholder="Mins"
                  {...register('cook_time', { valueAsNumber: true })}
                  disabled={handleEditRecipe.isPending}
                />
                {errors.cook_time && <p className="text-red-500">{errors.cook_time.message}</p>}
              </div>
              <div className="grid gap-2">
                <Label htmlFor="servings">Servings</Label>
                <Input
                  type="number"
                  id="servings"
                  placeholder="# of servings"
                  {...register('servings', { valueAsNumber: true })}
                  disabled={handleEditRecipe.isPending}
                />
                {errors.servings && <p className="text-red-500">{errors.servings.message}</p>}
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea
                id="ingredients"
                placeholder="Recipe ingredients"
                {...register('ingredients')}
                disabled={handleEditRecipe.isPending}
              />
              {errors.ingredients && <p className="text-red-500">{errors.ingredients.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea
                id="instructions"
                placeholder="Recipe instructions"
                {...register('instructions')}
                disabled={handleEditRecipe.isPending}
              />
              {errors.instructions && <p className="text-red-500">{errors.instructions.message}</p>}
            </div>
          </div>
          <div className="mt-4">
            <Label htmlFor="file">Image</Label>
            {/* <Input type="file" id="file" accept="image/*" onChange={handleFileChange} className="mt-2" /> */}
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
          </div>
          <Button className="w-full mt-4" type="submit" disabled={handleEditRecipe.isPending}>
            {handleEditRecipe.isPending ? 'Saving...' : 'Save'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditRecipeModal;
