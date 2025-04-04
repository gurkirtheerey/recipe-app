import { z } from 'zod';

export const createRecipeSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  ingredients: z.string().min(1, { message: 'Ingredients are required.' }),
  instructions: z.string().min(1, { message: 'Instructions are required.' }),
  image: z.instanceof(File, { message: 'Image is required.' }),
});

export type CreateRecipeSchema = z.infer<typeof createRecipeSchema>;
