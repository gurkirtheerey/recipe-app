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
import { FileErrors } from '@/app/data/recipe-error-types';

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
      prep_time: 0,
      cook_time: 0,
      servings: 0,
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
        return FileErrors.NO_FILE_SELECTED;
      }

      // 5MB limit
      if (file.size > 5 * 1024 * 1024) {
        return FileErrors.FILE_TOO_LARGE;
      }

      // Only allow JPEG, PNG, or WebP images
      const allowedTypes = ['image/jpeg', 'image/png', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        return FileErrors.INVALID_FILE_TYPE;
      }

      // Create a form data object to send the file to the server
      const formData = new FormData();
      formData.append('file', file);

      // Send the file to the server
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      // If the file upload fails, return the error and show a toast
      if (!res.ok) {
        const error = await res.text();
        console.error('Upload failed:', error);
      }

      // Get the URL from the response
      const data = await res.json();
      if (!data.url) {
        console.error('No URL received from upload');
      }

      // Return the URL
      return data.url;
    } catch (error) {
      // If there is an error, return the error and show a toast
      console.error('Error uploading image:', error);
      return FileErrors.UPLOAD_FAILED;
    }
  };

  const onSubmit = async (values: CreateRecipeSchema) => {
    // If the user is not logged in, return
    if (!user) {
      console.error('No user found');
      return;
    }

    // Set the loading state to true
    setIsLoading(true);

    try {
      const totalTime = values.prep_time + values.cook_time;
      let imageUrl;
      // If the user has selected an image, upload it
      if (values.image) {
        try {
          // Upload the image and get the URL
          imageUrl = await handleUpload(values.image);
        } catch (error) {
          // If the image upload fails, return the error and show a toast
          toast.error(error instanceof Error ? error.message : FileErrors.UPLOAD_FAILED);
          return;
        }
      }

      // If the image URL returned is an error, return the error and show a toast
      if (imageUrl === FileErrors.FILE_TOO_LARGE || imageUrl === FileErrors.INVALID_FILE_TYPE) {
        toast.error(imageUrl);
        return;
      }

      // console.log(values.ingredients.split('\n'));
      console.log(values.ingredients.split('\n').filter((step) => step.trim() !== ''));
      // console.log(values.ingredients.replace(/\n/g, ''));
      // Insert the recipe into the database
      const { error } = await supabase.from('recipes').insert([
        {
          title: values.title,
          description: values.description,
          ingredients: values.ingredients.split('\n').filter((step) => step.trim() !== ''),
          instructions: values.instructions.split('\n').filter((step) => step.trim() !== ''),
          user_id: user.id,
          prep_time: values.prep_time,
          cook_time: values.cook_time,
          total_time: totalTime,
          servings: values.servings,
          image: imageUrl,
        },
      ]);

      // If the recipe creation fails, return the error and show a toast
      if (error) throw error;

      // Close the modal
      setOpen(false);

      // Show a success toast
      toast.success('Recipe created successfully');
    } catch (error) {
      // If there is an error, return the error and show a toast
      console.error('Error creating recipe:', error);
      toast.error('Error creating recipe');
    } finally {
      // Set the loading state to false
      setIsLoading(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-h-[90vh] overflow-y-auto">
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
            <div className="grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="prep_time">Prep Time</Label>
                <Input
                  type="number"
                  id="prep_time"
                  placeholder="Mins"
                  {...register('prep_time', { valueAsNumber: true })}
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
                />
                {errors.servings && <p className="text-red-500">{errors.servings.message}</p>}
              </div>
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
