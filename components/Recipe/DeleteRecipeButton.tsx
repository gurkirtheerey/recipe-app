'use client';
import { Loader2, TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { DialogContent, DialogDescription, DialogTitle, DialogTrigger } from '../ui/dialog';
import { Dialog } from '../ui/dialog';

const DeleteRecipeButton = ({ recipeId }: { recipeId: string }) => {
  const router = useRouter();
  const { mutate: deleteRecipe, isPending } = useMutation({
    mutationFn: async () => {
      const res = await fetch(`/api/recipe/${recipeId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        toast.error('Failed to delete recipe');
        throw new Error('Failed to delete recipe');
      }
      toast.success('Recipe deleted successfully');
      router.push('/recipes');
    },
  });
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          size="icon"
          className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 cursor-pointer"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="animate-spin text-black" size={20} />
          ) : (
            <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
          )}
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogTitle>Delete Recipe</DialogTitle>
        <DialogDescription>
          Are you sure you want to delete this recipe? You will not be able to recover it.
        </DialogDescription>
        <Button variant="destructive" disabled={isPending} onClick={() => deleteRecipe()}>
          {isPending ? <Loader2 className="animate-spin text-black" size={20} /> : 'Delete'}
        </Button>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteRecipeButton;
