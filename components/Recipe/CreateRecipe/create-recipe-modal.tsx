'use client';

import { Button } from '../../ui/button';
import { Input } from '../../ui/input';
import { Label } from '../../ui/label';
import { Textarea } from '../../ui/textarea';
import { useState } from 'react';
import { useAuth } from '@/hooks/useAuth';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  createRecipeStep1Schema,
  createRecipeStep2Schema,
  createRecipeStep3Schema,
  createRecipeStep4Schema,
} from '@/lib/schemas/recipe';
import Modal from '../../Modal';
import { z } from 'zod';
import { useCreateRecipe } from './useCreateRecipe';
interface CreateRecipeModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
}

// Merge all the schemas into one
const fullSchema = createRecipeStep1Schema
  .merge(createRecipeStep2Schema)
  .merge(createRecipeStep3Schema)
  .merge(createRecipeStep4Schema);

// Define the type for the form
type CreateRecipeSchema = z.infer<typeof fullSchema>;

/**
 * Create Recipe Modal
 * @param open - Whether the modal is open
 * @param setOpen - Function to set the modal open state
 * @returns The Create Recipe Modal component
 */
const CreateRecipeModal = ({ open, setOpen }: CreateRecipeModalProps) => {
  const { createRecipe, isPending } = useCreateRecipe();
  // State for the current step of the form
  const [step, setStep] = useState(1);
  // Use the form hook to create the form
  const form = useForm<CreateRecipeSchema>({
    resolver: zodResolver(fullSchema), // Use the full schema for all steps
    mode: 'onBlur', // Validate on blur
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

  const { user, isLoading: isAuthLoading } = useAuth();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
    trigger,
  } = form;

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setValue('image', file);
  };

  // Function to handle moving to the next step
  const handleNextStep = async (nextStep: number) => {
    let fieldsToValidate: (keyof CreateRecipeSchema)[] = []; // Array to store the fields to validate

    // Define which fields to validate for each step
    switch (step) {
      case 1:
        fieldsToValidate = ['title', 'description']; // Fields to validate for step 1
        break;
      case 2:
        fieldsToValidate = ['ingredients', 'instructions']; // Fields to validate for step 2
        break;
      case 3:
        fieldsToValidate = ['prep_time', 'cook_time', 'servings']; // Fields to validate for step 3
        break;
      // Step 4 validation happens on final submit
    }

    // Validate only the fields for the current step
    const isValid = await trigger(fieldsToValidate);

    // If the fields are valid, move to the next step
    if (isValid) {
      setStep(nextStep);
    }
  };

  const onSubmit = async (values: CreateRecipeSchema) => {
    if (!user) return;
    const recipe = {
      ...values,
      ingredients: values.ingredients.split('\n').filter((step) => step.trim() !== ''),
      instructions: values.instructions.split('\n').filter((step) => step.trim() !== ''),
      image: values.image ? (values.image as string) : ('' as string),
    };

    await createRecipe.mutateAsync({ ...recipe, userId: user.id });
    setOpen(false);
  };

  let formContent = null;

  if (step === 1) {
    formContent = (
      <div className="">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="title">Title</Label>
            <Input type="text" id="title" placeholder="Recipe title" {...register('title')} />
            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="description">Description</Label>
            <Input type="text" id="description" placeholder="Recipe description" {...register('description')} />
            {errors.description && <p className="text-red-500 text-xs">{errors.description.message}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <Button type="button" onClick={() => handleNextStep(2)}>
            Next
          </Button>
          <Button type="button" variant="outline" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </div>
      </div>
    );
  } else if (step === 2) {
    formContent = (
      <div className="">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="ingredients">Ingredients</Label>
            <Textarea id="ingredients" placeholder="Recipe ingredients" {...register('ingredients')} className="h-32" />
            {errors.ingredients && <p className="text-red-500 text-xs">{errors.ingredients.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="instructions">Instructions</Label>
            <Textarea
              id="instructions"
              placeholder="Recipe instructions"
              {...register('instructions')}
              className="h-32"
            />
            {errors.instructions && <p className="text-red-500 text-xs">{errors.instructions.message}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <Button type="button" onClick={() => handleNextStep(3)}>
            Next
          </Button>
          <Button type="button" variant="outline" onClick={() => setStep(1)}>
            Go Back
          </Button>
        </div>
      </div>
    );
  } else if (step === 3) {
    formContent = (
      <div className="">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="prep_time">Prep Time</Label>
            <Input
              type="number"
              id="prep_time"
              placeholder="Mins"
              {...register('prep_time', { valueAsNumber: true })}
            />
            {errors.prep_time && <p className="text-red-500 text-xs">{errors.prep_time.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="cook_time">Cook Time</Label>
            <Input
              type="number"
              id="cook_time"
              placeholder="Mins"
              {...register('cook_time', { valueAsNumber: true })}
            />
            {errors.cook_time && <p className="text-red-500 text-xs">{errors.cook_time.message}</p>}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="servings">Servings</Label>
            <Input
              type="number"
              id="servings"
              placeholder="# of servings"
              {...register('servings', { valueAsNumber: true })}
            />
            {errors.servings && <p className="text-red-500 text-xs">{errors.servings.message}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <Button type="button" onClick={() => handleNextStep(4)}>
            Next
          </Button>
          <Button type="button" variant="outline" onClick={() => setStep(2)}>
            Go Back
          </Button>
        </div>
      </div>
    );
  } else if (step === 4) {
    formContent = (
      <div className="">
        <div className="grid gap-4 py-4">
          <div className="grid gap-2">
            <Label htmlFor="file">Image</Label>
            <Input type="file" accept="image/*" id="file" onChange={handleFileChange} className="mt-2" />
            {errors.image && <p className="text-red-500 text-xs">{errors.image.message}</p>}
          </div>
        </div>
        <div className="flex flex-col gap-2 mb-4">
          <Button
            className="w-full"
            type="button"
            onClick={handleSubmit(onSubmit)}
            disabled={isPending || isAuthLoading || !user}
          >
            {isPending ? 'Creating...' : 'Create'}
          </Button>
          <Button type="button" variant="outline" onClick={() => setStep(3)}>
            Go Back
          </Button>
        </div>
      </div>
    );
  }

  return (
    <Modal
      open={open}
      onOpenChange={setOpen}
      title="Create Recipe"
      description="Create a new recipe to get started."
      drawerClassName="min-w-screen min-h-screen"
    >
      <form className="overflow-y-auto" onSubmit={handleSubmit(onSubmit)}>
        {formContent}
      </form>
    </Modal>
  );
};

export default CreateRecipeModal;
