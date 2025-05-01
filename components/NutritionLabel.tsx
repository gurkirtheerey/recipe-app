'use client';
import { NutritionInfo } from '@/types/nutritionLabelTypes';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const NutritionLabel = ({ nutrition, servings }: { nutrition: NutritionInfo; servings: number }) => {
  const [data, setData] = useState(nutrition);
  const [isEditing, setIsEditing] = useState(false);

  const { id } = useParams();
  const router = useRouter();

  const handleChange = (field: keyof NutritionInfo, value: string) => {
    const numValue = parseFloat(value) || 0;
    setData((prev) => ({
      ...prev,
      [field]: numValue,
    }));
  };

  const handleSave = async () => {
    setIsEditing(false);
    const res = await fetch(`/api/recipe/${id}`, {
      method: 'POST',
      body: JSON.stringify({ nutrition: data }),
    });
    if (!res.ok) {
      toast.error('Failed to update nutrition facts');
      throw new Error('Failed to update nutrition facts');
    }
    router.refresh();
    toast.success('Nutrition facts updated successfully');
  };

  return (
    <div className="bg-white dark:bg-gray-950 p-4 rounded-lg shadow-md max-w-sm mx-auto">
      <div className="border-8 border-black dark:border-gray-800 p-2">
        <div className="flex justify-between items-center pt-2">
          <h2 className="text-3xl font-black text-center text-gray-900 dark:text-gray-100">Nutrition Facts</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
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
              <div>
                <input
                  type="text"
                  value={data.calories}
                  onChange={(e) => handleChange('calories', e.target.value)}
                  className="border rounded px-1 w-16 text-lg dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                />
              </div>
            ) : (
              <span className="font-bold text-lg text-gray-900 dark:text-gray-100">{data.calories}</span>
            )}
          </div>
        </div>

        <div className="text-xs border-b border-black dark:border-gray-800 py-2">
          <div className="flex justify-between">
            <span className="font-bold text-gray-900 dark:text-gray-100">Total Fat</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={data.totalFat}
                  onChange={(e) => handleChange('totalFat', e.target.value)}
                  className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                />
              </div>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">{data.totalFat}g</span>
            )}
          </div>
          <div className="pl-4">
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-gray-100">Saturated Fat</span>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={data.saturatedFat}
                    onChange={(e) => handleChange('saturatedFat', e.target.value)}
                    className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                  />
                </div>
              ) : (
                <span className="text-gray-900 dark:text-gray-100">{data.saturatedFat}g</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-gray-100">Trans Fat</span>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={data.transFat}
                    onChange={(e) => handleChange('transFat', e.target.value)}
                    className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                  />
                </div>
              ) : (
                <span className="text-gray-900 dark:text-gray-100">{data.transFat}g</span>
              )}
            </div>
          </div>
        </div>

        <div className="text-xs border-b border-black dark:border-gray-800 py-2">
          <div className="flex justify-between">
            <span className="font-bold text-gray-900 dark:text-gray-100">Cholesterol</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={data.cholesterol}
                  onChange={(e) => handleChange('cholesterol', e.target.value)}
                  className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                />
              </div>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">{data.cholesterol}mg</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-bold text-gray-900 dark:text-gray-100">Sodium</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={data.sodium}
                  onChange={(e) => handleChange('sodium', e.target.value)}
                  className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                />
              </div>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">{data.sodium}mg</span>
            )}
          </div>
        </div>

        <div className="text-xs border-b border-black dark:border-gray-800 py-2">
          <div className="flex justify-between">
            <span className="font-bold text-gray-900 dark:text-gray-100">Total Carbohydrate</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={data.totalCarbohydrates}
                  onChange={(e) => handleChange('totalCarbohydrates', e.target.value)}
                  className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                />
              </div>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">{data.totalCarbohydrates}g</span>
            )}
          </div>
          <div className="pl-4">
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-gray-100">Dietary Fiber</span>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={data.dietaryFiber}
                    onChange={(e) => handleChange('dietaryFiber', e.target.value)}
                    className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                  />
                </div>
              ) : (
                <span className="text-gray-900 dark:text-gray-100">{data.dietaryFiber}g</span>
              )}
            </div>
            <div className="flex justify-between">
              <span className="text-gray-900 dark:text-gray-100">Total Sugars</span>
              {isEditing ? (
                <div>
                  <input
                    type="text"
                    value={data.sugars}
                    onChange={(e) => handleChange('sugars', e.target.value)}
                    className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                  />
                </div>
              ) : (
                <span className="text-gray-900 dark:text-gray-100">{data.sugars}g</span>
              )}
            </div>
          </div>
        </div>

        <div className="text-xs border-b-8 border-black dark:border-gray-800 py-2">
          <div className="flex justify-between">
            <span className="font-bold text-gray-900 dark:text-gray-100">Protein</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={data.protein}
                  onChange={(e) => handleChange('protein', e.target.value)}
                  className="border rounded px-1 w-12 dark:bg-gray-900 dark:text-gray-100 dark:border-gray-700"
                />
              </div>
            ) : (
              <span className="text-gray-900 dark:text-gray-100">{data.protein}g</span>
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
              onClick={handleSave}
              className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600 dark:bg-blue-600 dark:hover:bg-blue-700"
            >
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionLabel;
