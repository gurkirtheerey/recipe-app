import { CreateRecipe } from '@/types';
import { useMutation } from '@tanstack/react-query';
import { toast } from 'sonner';
export const useCreateRecipe = () => {
  const createRecipe = useMutation({
    mutationFn: async (recipe: CreateRecipe) => {
      const { error } = await fetch('/api/recipe', {
        method: 'POST',
        body: JSON.stringify(recipe),
      }).then((res) => res.json());

      if (error) {
        toast.error(`Error creating recipe: ${error}`);
        throw new Error(error);
      }
      toast.success('Recipe created successfully');
      return null;
    },
  });

  return { createRecipe, isPending: createRecipe.isPending };
};
