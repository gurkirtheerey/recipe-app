'use client';
import { NutritionInfo } from '@/types/nutritionLabelTypes';
import { useParams, useRouter } from 'next/navigation';
import React, { useState } from 'react';
import { toast } from 'sonner';

const NutritionLabel = ({ nutrition }: { nutrition: NutritionInfo }) => {
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
    <div className={`bg-white p-4 rounded-lg shadow-md max-w-xs`}>
      <div className="border-8 border-black p-2">
        <div className="flex justify-between items-center mb-1">
          <h2 className="text-3xl font-black text-center">Nutrition Facts</h2>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="text-xs bg-gray-200 px-2 py-1 rounded hover:bg-gray-300"
          >
            {isEditing ? 'Cancel' : 'Edit'}
          </button>
        </div>

        <div className="text-xs border-b-8 border-black">
          <div className="flex justify-between">
            <span className="font-bold">Serving Size placeholder</span>
            <span>{data.protein}g</span>
          </div>
        </div>

        <div className="text-xs border-b-4 border-black py-1">
          <p className="font-bold">Amount Per Serving</p>
          <div className="flex justify-between items-baseline">
            <span className="font-bold text-lg">Calories</span>
            {isEditing ? (
              <div>
                <input
                  type="number"
                  value={data.calories}
                  onChange={(e) => handleChange('calories', e.target.value)}
                  className={`border rounded px-1 w-16 text-lg`}
                />
              </div>
            ) : (
              <span className="font-bold text-lg">{data.calories}</span>
            )}
          </div>
        </div>

        <div className="text-xs border-b border-black py-1">
          <div className="flex justify-between">
            <span className="font-bold">Total Fat</span>
            {isEditing ? (
              <div>
                <input
                  type="number"
                  value={data.totalFat}
                  onChange={(e) => handleChange('totalFat', e.target.value)}
                  className={`border rounded px-1 w-12`}
                />
              </div>
            ) : (
              <span>{data.totalFat}g</span>
            )}
          </div>
          <div className="pl-4">
            <div className="flex justify-between">
              <span>Saturated Fat</span>
              {isEditing ? (
                <div>
                  <input
                    type="number"
                    value={data.saturatedFat}
                    onChange={(e) => handleChange('saturatedFat', e.target.value)}
                    className={`border rounded px-1 w-12`}
                  />
                </div>
              ) : (
                <span>{data.saturatedFat}g</span>
              )}
            </div>
            <div className="flex justify-between">
              <span>Trans Fat</span>
              {isEditing ? (
                <div>
                  <input
                    type="number"
                    value={data.transFat}
                    onChange={(e) => handleChange('transFat', e.target.value)}
                    className={`border rounded px-1 w-12`}
                  />
                </div>
              ) : (
                <span>{data.transFat}g</span>
              )}
            </div>
          </div>
        </div>

        <div className="text-xs border-b border-black py-1">
          <div className="flex justify-between">
            <span className="font-bold">Cholesterol</span>
            {isEditing ? (
              <div>
                <input
                  type="number"
                  value={data.cholesterol}
                  onChange={(e) => handleChange('cholesterol', e.target.value)}
                  className={`border rounded px-1 w-12`}
                />
              </div>
            ) : (
              <span>{data.cholesterol}mg</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Sodium</span>
            {isEditing ? (
              <div>
                <input
                  type="number"
                  value={data.sodium}
                  onChange={(e) => handleChange('sodium', e.target.value)}
                  className={`border rounded px-1 w-12`}
                />
              </div>
            ) : (
              <span>{data.sodium}mg</span>
            )}
          </div>
        </div>

        <div className="text-xs border-b border-black py-1">
          <div className="flex justify-between">
            <span className="font-bold">Total Carbohydrate</span>
            {isEditing ? (
              <div>
                <input
                  type="number"
                  value={data.totalCarbohydrates}
                  onChange={(e) => handleChange('totalCarbohydrates', e.target.value)}
                  className={`border rounded px-1 w-12`}
                />
              </div>
            ) : (
              <span>{data.totalCarbohydrates}g</span>
            )}
          </div>
          <div className="pl-4">
            <div className="flex justify-between">
              <span>Dietary Fiber</span>
              {isEditing ? (
                <div>
                  <input
                    type="number"
                    value={data.dietaryFiber}
                    onChange={(e) => handleChange('dietaryFiber', e.target.value)}
                    className={`border rounded px-1 w-12`}
                  />
                </div>
              ) : (
                <span>{data.dietaryFiber}g</span>
              )}
            </div>
            <div className="flex justify-between">
              <span>Total Sugars</span>
              {isEditing ? (
                <div>
                  <input
                    type="number"
                    value={data.sugars}
                    onChange={(e) => handleChange('sugars', e.target.value)}
                    className={`border rounded px-1 w-12`}
                  />
                </div>
              ) : (
                <span>{data.sugars}g</span>
              )}
            </div>
            <div className="flex justify-between italic">
              <span>Includes Added Sugars</span>
              <span>0g</span>
            </div>
          </div>
        </div>

        <div className="text-xs border-b-8 border-black py-1">
          <div className="flex justify-between">
            <span className="font-bold">Protein</span>
            {isEditing ? (
              <div>
                <input
                  type="number"
                  value={data.protein}
                  onChange={(e) => handleChange('protein', e.target.value)}
                  className={`border rounded px-1 w-12`}
                />
              </div>
            ) : (
              <span>{data.protein}g</span>
            )}
          </div>
        </div>

        <div className="text-[8px] mt-1">
          <p className="font-bold">
            * The % Daily Value (DV) tells you how much a nutrient in a serving of food contributes to a daily diet.
            2,000 calories a day is used for general nutrition advice.
          </p>
        </div>

        {isEditing && (
          <div className="mt-4 flex justify-end">
            <button onClick={handleSave} className="bg-blue-500 text-white px-3 py-1 rounded text-sm hover:bg-blue-600">
              Save Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default NutritionLabel;
