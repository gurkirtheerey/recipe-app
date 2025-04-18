'use client';
import { Loader2, TrashIcon } from 'lucide-react';
import { Button } from '../ui/button';
import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Modal from '../Modal';
import { useState } from 'react';

const DeleteRecipeButton = ({ recipeId }: { recipeId: string }) => {
  const [open, setOpen] = useState(false);
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
      setOpen(false);
      router.back();
    },
  });
  return (
    <>
      <Button
        variant="outline"
        size="icon"
        className="rounded-full bg-gray-100 p-2 hover:bg-gray-200 cursor-pointer"
        disabled={isPending}
        onClick={() => setOpen(!open)}
      >
        {isPending ? (
          <Loader2 className="animate-spin text-black" size={20} />
        ) : (
          <TrashIcon className="w-4 h-4 sm:w-5 sm:h-5" />
        )}
      </Button>
      <Modal
        title="Delete Recipe"
        description="Are you sure you want to delete this recipe? You will not be able to recover it. Other users will not be able to see it and it will be removed from all user's recipe lists."
        open={open}
        onOpenChange={setOpen}
      >
        <Button className="mb-4 sm:mb-0" variant="destructive" disabled={isPending} onClick={() => deleteRecipe()}>
          {isPending ? <Loader2 className="animate-spin text-black" size={20} /> : 'Delete'}
        </Button>
      </Modal>
    </>
  );
};

export default DeleteRecipeButton;
