'use client';

import { createClient } from '@/lib/supabase/client';
import { Button } from '../ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Textarea } from '../ui/textarea';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { createRecipeSchema, type CreateRecipeSchema } from '@/lib/schemas/recipe';

interface CreateRecipeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

const CreateRecipeModal = ({ open, setOpen }: CreateRecipeModalProps) => {
  const form = useForm<CreateRecipeSchema>({
    resolver: zodResolver(createRecipeSchema),
    defaultValues: {
      title: '',
      description: '',
      ingredients: '',
      instructions: '',
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: isAuthLoading } = useAuth();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = form;

  const onSubmit = async (values: CreateRecipeSchema) => {
    if (!user) {
      console.error('No user found');
      return;
    }

    setIsLoading(true);

    try {
      const { error } = await supabase.from('recipes').insert([
        {
          title: values.title,
          description: values.description,
          ingredients: values.ingredients.split('\n'),
          instructions: values.instructions.split('\n'),
          user_id: user.id,
        },
      ]);

      if (error) throw error;
      setOpen(false);
      toast.success('Recipe created successfully');
    } catch (error) {
      console.error('Error creating recipe:', error);
      toast.error('Error creating recipe');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogTitle>Create Recipe</DialogTitle>
        <DialogDescription>Create a new recipe to get started.</DialogDescription>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Title</Label>
              <Input type="text" id="title" placeholder="Recipe title" {...register('title')} />
              {errors.title && <p className="text-red-500">{errors.title.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea id="description" placeholder="Recipe description" {...register('description')} />
              {errors.description && <p className="text-red-500">{errors.description.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="ingredients">Ingredients</Label>
              <Textarea id="ingredients" placeholder="Recipe ingredients" {...register('ingredients')} />
              {errors.ingredients && <p className="text-red-500">{errors.ingredients.message}</p>}
            </div>
            <div className="grid gap-2">
              <Label htmlFor="instructions">Instructions</Label>
              <Textarea id="instructions" placeholder="Recipe instructions" {...register('instructions')} />
              {errors.instructions && <p className="text-red-500">{errors.instructions.message}</p>}
            </div>
          </div>
          <Button className="w-full mt-4" type="submit" disabled={isLoading || isAuthLoading || !user}>
            {isLoading ? 'Creating...' : 'Create'}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateRecipeModal;
