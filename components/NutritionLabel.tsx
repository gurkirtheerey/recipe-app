'use client';
import { NutritionInfo } from '@/types/nutritionLabelTypes';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const nutritionSchema = z.object({
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
});

type NutritionFormData = z.infer<typeof nutritionSchema>;

const defaultNutrition: NutritionInfo = {
  calories: 0,
  totalFat: 0,
  saturatedFat: 0,
  transFat: 0,
  cholesterol: 0,
  sodium: 0,
  totalCarbohydrates: 0,
  dietaryFiber: 0,
  sugars: 0,
  protein: 0,
};

const NutritionLabel = ({ nutrition, servings }: { nutrition: NutritionInfo | undefined; servings: number }) => {
  const [isEditing, setIsEditing] = useState(false);
  const { id } = useParams();
  const router = useRouter();

  const { register, handleSubmit } = useForm<NutritionFormData>({
    resolver: zodResolver(nutritionSchema),
    defaultValues: nutrition || defaultNutrition,
  });

  const onSubmit = async (data: NutritionFormData) => {
    try {
      const res = await fetch(`/api/recipe/${id}`, {
        method: 'POST',
        body: JSON.stringify({ nutrition: data }),
      });

      if (!res.ok) {
        throw new Error('Failed to update nutrition facts');
      }
      setIsEditing(false);
      toast.success('Nutrition facts updated successfully');
      router.refresh();
    } catch (error) {
      toast.error('Failed to update nutrition facts');
      console.error('Error updating nutrition facts:', error);
    }
  };

  const displayNutrition = nutrition || defaultNutrition;
  const isDefaultNutrition = !nutrition;

  return (
    <div className="bg-white dark:bg-gray-950 p-4 rounded-lg shadow-md max-w-sm mx-auto">
      {isDefaultNutrition && !isEditing ? (
        <div className="text-center py-4">
          <p className="text-gray-600 dark:text-gray-400 mb-4">No nutrition information available</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
          >
            Add Nutrition Facts
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="border-8 border-black dark:border-gray-800 p-2">
            <div className="flex justify-between items-center pt-2">
              <h2 className="text-3xl font-black text-center text-gray-900 dark:text-gray-100">Nutrition Facts</h2>
              <button
                type="button"
                onClick={() => {
                  setIsEditing(!isEditing);
                }}
                className="text-xs bg-gray-200 dark:bg-gray-800 px-2 py-1 rounded hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-gray-100"
              >
                {isEditing ? 'Cancel' : 'Edit'}
              </button>
            </div>

            <div className="text-xs border-b-8 border-black dark:border-gray-800">
              <div className="flex justify-between py-3">
                <span className="font-bold text-gray-900 dark:text-gray-100">Servings:</span>
                <span className="text-gray-900 dark:text-gray-100">{servings}</span>
              </div>
            </div>

            <div className="text-xs border-b-4 border-black dark:border-gray-800 py-2">
              <p className="font-bold text-gray-900 dark:text-gray-100">Amount Per Serving</p>
              <div className="flex justify-between items-baseline">
                <span className="font-bold text-lg text-gray-900 dark:text-gray-100">Calories</span>
                {isEditing ? (
                  <input
                    type="number"
                    {...register('calories', { valueAsNumber: true })}
                    className="border rounded px-1 w-16 text-lg dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                  />
                ) : (
                  <span className="font-bold text-lg text-gray-900 dark:text-gray-100">
                    {displayNutrition.calories}
                  </span>
                )}
              </div>
            </div>

            <div className="text-xs border-b border-black dark:border-gray-800 py-2">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900 dark:text-gray-100">Total Fat</span>
                {isEditing ? (
                  <input
                    type="number"
                    {...register('totalFat', { valueAsNumber: true })}
                    className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                  />
                ) : (
                  <span className="text-gray-900 dark:text-gray-100">{displayNutrition.totalFat}g</span>
                )}
              </div>
              <div className="pl-4">
                <div className="flex justify-between">
                  <span className="text-gray-900 dark:text-gray-100">Saturated Fat</span>
                  {isEditing ? (
                    <input
                      type="number"
                      {...register('saturatedFat', { valueAsNumber: true })}
                      className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-gray-100">{displayNutrition.saturatedFat}g</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900 dark:text-gray-100">Trans Fat</span>
                  {isEditing ? (
                    <input
                      type="number"
                      {...register('transFat', { valueAsNumber: true })}
                      className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-gray-100">{displayNutrition.transFat}g</span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-xs border-b border-black dark:border-gray-800 py-2">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900 dark:text-gray-100">Cholesterol</span>
                {isEditing ? (
                  <input
                    type="number"
                    {...register('cholesterol', { valueAsNumber: true })}
                    className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                  />
                ) : (
                  <span className="text-gray-900 dark:text-gray-100">{displayNutrition.cholesterol}mg</span>
                )}
              </div>
              <div className="flex justify-between">
                <span className="font-bold text-gray-900 dark:text-gray-100">Sodium</span>
                {isEditing ? (
                  <input
                    type="number"
                    {...register('sodium', { valueAsNumber: true })}
                    className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                  />
                ) : (
                  <span className="text-gray-900 dark:text-gray-100">{displayNutrition.sodium}mg</span>
                )}
              </div>
            </div>

            <div className="text-xs border-b border-black dark:border-gray-800 py-2">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900 dark:text-gray-100">Total Carbohydrate</span>
                {isEditing ? (
                  <input
                    type="number"
                    {...register('totalCarbohydrates', { valueAsNumber: true })}
                    className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                  />
                ) : (
                  <span className="text-gray-900 dark:text-gray-100">{displayNutrition.totalCarbohydrates}g</span>
                )}
              </div>
              <div className="pl-4">
                <div className="flex justify-between">
                  <span className="text-gray-900 dark:text-gray-100">Dietary Fiber</span>
                  {isEditing ? (
                    <input
                      type="number"
                      {...register('dietaryFiber', { valueAsNumber: true })}
                      className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-gray-100">{displayNutrition.dietaryFiber}g</span>
                  )}
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-900 dark:text-gray-100">Total Sugars</span>
                  {isEditing ? (
                    <input
                      type="number"
                      {...register('sugars', { valueAsNumber: true })}
                      className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                    />
                  ) : (
                    <span className="text-gray-900 dark:text-gray-100">{displayNutrition.sugars}g</span>
                  )}
                </div>
              </div>
            </div>

            <div className="text-xs border-b-8 border-black dark:border-gray-800 py-2">
              <div className="flex justify-between">
                <span className="font-bold text-gray-900 dark:text-gray-100">Protein</span>
                {isEditing ? (
                  <input
                    type="number"
                    {...register('protein', { valueAsNumber: true })}
                    className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                  />
                ) : (
                  <span className="text-gray-900 dark:text-gray-100">{displayNutrition.protein}g</span>
                )}
              </div>
            </div>

            <div className="text-[8px] mt-2">
              <p className="font-bold text-gray-900 dark:text-gray-100">
                * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet.
                2,000 calories a day is used for general nutrition advice.
              </p>
            </div>

            {isEditing && (
              <div className="mt-4 flex justify-end">
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
                >
                  Save Changes
                </button>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default NutritionLabel;
