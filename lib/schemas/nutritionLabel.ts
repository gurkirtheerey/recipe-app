import { z } from 'zod';

export const nutritionInfoSchema = z.object({
  calories: z.number().min(0),
  totalFat: z.number().min(0),
  saturatedFat: z.number().min(0),
  transFat: z.number().min(0),
  cholesterol: z.number().min(0),
  sodium: z.number().min(0),
  totalCarbohydrates: z.number().min(0),
  dietaryFiber: z.number().min(0),
  sugars: z.number().min(0),
  protein: z.number().min(0),
  vitaminD: z.number().min(0).optional(),
  calcium: z.number().min(0).optional(),
  iron: z.number().min(0).optional(),
  potassium: z.number().min(0).optional(),
});

export const nutritionLabelSchema = z.object({
  nutritionInfo: nutritionInfoSchema,
  servingSize: z.string().min(1),
  servingsPerContainer: z.number().min(1),
});

export type NutritionInfo = z.infer<typeof nutritionInfoSchema>;
export type NutritionLabelData = z.infer<typeof nutritionLabelSchema>;
