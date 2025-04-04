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
      image: undefined,
    },
  });

  const [isLoading, setIsLoading] = useState(false);
  const { user, isLoading: isAuthLoading } = useAuth();
  const supabase = createClient();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = form;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue('image', file);
  };

  const handleUpload = async (file: File) => {
    try {
      if (!file) {
        console.error('No file selected');
        return;
      }

      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        toast.error('File size too large. Please upload an image smaller than 5MB');
        console.error('File size too large. Please upload an image smaller than 5MB');
        return;
      }

      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Invalid file type. Please upload a JPEG, PNG, or WebP image');
        console.error('Invalid file type. Please upload a JPEG, PNG, or WebP image');
        return;
      }

      const formData = new FormData();
      formData.append('file', file);

      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        const error = await res.text();
        console.error('Upload failed:', error);
      }

      const data = await res.json();
      if (!data.url) {
        console.error('No URL received from upload');
      }

      return data.url;
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to upload image');
    }
  };

  const onSubmit = async (values: CreateRecipeSchema) => {
    if (!user) {
      console.error('No user found');
      return;
    }

    setIsLoading(true);

    try {
      let imageUrl;
      if (values.image) {
        try {
          imageUrl = await handleUpload(values.image);
        } catch (error) {
          toast.error(error instanceof Error ? error.message : 'Failed to upload image');
          return;
        }
      }

      if (!imageUrl) {
        toast.error('Failed to upload image');
        return;
      }

      const { error } = await supabase.from('recipes').insert([
        {
          title: values.title,
          description: values.description,
          ingredients: values.ingredients.split('\n'),
          instructions: values.instructions.split('\n'),
          user_id: user.id,
          image: imageUrl,
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
          <div className="mt-4">
            <Label htmlFor="file">Image</Label>
            <Input type="file" id="file" accept="image/*" onChange={handleFileChange} className="mt-2" />
            {errors.image && <p className="text-red-500">{errors.image.message}</p>}
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
