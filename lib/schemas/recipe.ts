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

export const createRecipeStep1Schema = z.object({
  title: z.string().min(1, { message: 'Title is required.' }),
  description: z.string().min(1, { message: 'Description is required.' }),
});

export const createRecipeStep2Schema = z.object({
  ingredients: z.string().min(1, { message: 'Ingredients are required.' }),
  instructions: z.string().min(1, { message: 'Instructions are required.' }),
});

export const createRecipeStep3Schema = z.object({
  prep_time: z.number().min(0),
  cook_time: z.number().min(0),
  servings: z.number().min(1, { message: 'Servings is required.' }),
});

export const createRecipeStep4Schema = z.object({
  image: z.union([z.string(), z.instanceof(File)]).optional(),
});

export type CreateRecipeSchema = z.infer<typeof createRecipeSchema>;
export type CreateRecipeStep1Schema = z.infer<typeof createRecipeStep1Schema>;
export type CreateRecipeStep2Schema = z.infer<typeof createRecipeStep2Schema>;
export type CreateRecipeStep3Schema = z.infer<typeof createRecipeStep3Schema>;
export type CreateRecipeStep4Schema = z.infer<typeof createRecipeStep4Schema>;
