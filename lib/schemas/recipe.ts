import { z } from 'zod';

export const createRecipeSchema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
  ingredients: z.string().min(1, { message: 'Ingredients are required.' }),
  instructions: z.string().min(1, { message: 'Instructions are required.' }),
  prep_time: z.number().min(0),
  cook_time: z.number().min(0),
  servings: z.number().min(1, { message: 'Servings is required.' }),
  image: z.union([z.string(), z.instanceof(File)]).optional(),
});

export type CreateRecipeSchema = z.infer<typeof createRecipeSchema>;
