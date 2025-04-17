'use client';
import React, { useState } from 'react';
import { z } from 'zod';
import { nutritionLabelSchema, type NutritionLabelData } from '@/lib/schemas/nutritionLabel';

interface NutritionLabelProps {
  initialData: NutritionLabelData;
  onSave?: (data: NutritionLabelData) => void;
  className?: string;
}

const NutritionLabel: React.FC<NutritionLabelProps> = ({ initialData, onSave, className = '' }) => {
  const [data, setData] = useState(initialData);
  const [isEditing, setIsEditing] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof typeof data.nutritionInfo, value: string) => {
    const numValue = parseFloat(value) || 0;
    setData((prev) => ({
      ...prev,
      nutritionInfo: {
        ...prev.nutritionInfo,
        [field]: numValue,
      },
    }));
  };

  const handleServingSizeChange = (value: string) => {
    setData((prev) => ({
      ...prev,
      servingSize: value,
    }));
  };

  const handleServingsPerContainerChange = (value: string) => {
    const numValue = parseInt(value) || 1;
    setData((prev) => ({
      ...prev,
      servingsPerContainer: numValue,
    }));
  };

  const validateData = () => {
    try {
      nutritionLabelSchema.parse(data);
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const newErrors: Record<string, string> = {};
        error.errors.forEach((err) => {
          const path = err.path.join('.');
          newErrors[path] = err.message;
        });
        setErrors(newErrors);
      }
      return false;
    }
  };

  const handleSave = () => {
    if (validateData()) {
      setIsEditing(false);
      onSave?.(data);
    }
  };

  return (
    <div className={`bg-white p-4 rounded-lg shadow-md max-w-xs ${className}`}>
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
            <span className="font-bold">Serving Size</span>
            {isEditing ? (
              <div>
                <input
                  type="text"
                  value={data.servingSize}
                  onChange={(e) => handleServingSizeChange(e.target.value)}
                  className={`border rounded px-1 w-32 ${errors['servingSize'] ? 'border-red-500' : ''}`}
                />
                {errors['servingSize'] && <p className="text-red-500 text-[8px]">{errors['servingSize']}</p>}
              </div>
            ) : (
              <span>{data.servingSize}</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Servings Per Container</span>
            {isEditing ? (
              <div>
                <input
                  type="number"
                  value={data.servingsPerContainer}
                  onChange={(e) => handleServingsPerContainerChange(e.target.value)}
                  className={`border rounded px-1 w-16 ${errors['servingsPerContainer'] ? 'border-red-500' : ''}`}
                />
                {errors['servingsPerContainer'] && (
                  <p className="text-red-500 text-[8px]">{errors['servingsPerContainer']}</p>
                )}
              </div>
            ) : (
              <span>{data.servingsPerContainer}</span>
            )}
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
                  value={data.nutritionInfo.calories}
                  onChange={(e) => handleChange('calories', e.target.value)}
                  className={`border rounded px-1 w-16 text-lg ${errors['nutritionInfo.calories'] ? 'border-red-500' : ''}`}
                />
                {errors['nutritionInfo.calories'] && (
                  <p className="text-red-500 text-[8px]">{errors['nutritionInfo.calories']}</p>
                )}
              </div>
            ) : (
              <span className="font-bold text-lg">{data.nutritionInfo.calories}</span>
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
                  value={data.nutritionInfo.totalFat}
                  onChange={(e) => handleChange('totalFat', e.target.value)}
                  className={`border rounded px-1 w-12 ${errors['nutritionInfo.totalFat'] ? 'border-red-500' : ''}`}
                />
                {errors['nutritionInfo.totalFat'] && (
                  <p className="text-red-500 text-[8px]">{errors['nutritionInfo.totalFat']}</p>
                )}
              </div>
            ) : (
              <span>{data.nutritionInfo.totalFat}g</span>
            )}
          </div>
          <div className="pl-4">
            <div className="flex justify-between">
              <span>Saturated Fat</span>
              {isEditing ? (
                <div>
                  <input
                    type="number"
                    value={data.nutritionInfo.saturatedFat}
                    onChange={(e) => handleChange('saturatedFat', e.target.value)}
                    className={`border rounded px-1 w-12 ${errors['nutritionInfo.saturatedFat'] ? 'border-red-500' : ''}`}
                  />
                  {errors['nutritionInfo.saturatedFat'] && (
                    <p className="text-red-500 text-[8px]">{errors['nutritionInfo.saturatedFat']}</p>
                  )}
                </div>
              ) : (
                <span>{data.nutritionInfo.saturatedFat}g</span>
              )}
            </div>
            <div className="flex justify-between">
              <span>Trans Fat</span>
              {isEditing ? (
                <div>
                  <input
                    type="number"
                    value={data.nutritionInfo.transFat}
                    onChange={(e) => handleChange('transFat', e.target.value)}
                    className={`border rounded px-1 w-12 ${errors['nutritionInfo.transFat'] ? 'border-red-500' : ''}`}
                  />
                  {errors['nutritionInfo.transFat'] && (
                    <p className="text-red-500 text-[8px]">{errors['nutritionInfo.transFat']}</p>
                  )}
                </div>
              ) : (
                <span>{data.nutritionInfo.transFat}g</span>
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
                  value={data.nutritionInfo.cholesterol}
                  onChange={(e) => handleChange('cholesterol', e.target.value)}
                  className={`border rounded px-1 w-12 ${errors['nutritionInfo.cholesterol'] ? 'border-red-500' : ''}`}
                />
                {errors['nutritionInfo.cholesterol'] && (
                  <p className="text-red-500 text-[8px]">{errors['nutritionInfo.cholesterol']}</p>
                )}
              </div>
            ) : (
              <span>{data.nutritionInfo.cholesterol}mg</span>
            )}
          </div>
          <div className="flex justify-between">
            <span className="font-bold">Sodium</span>
            {isEditing ? (
              <div>
                <input
                  type="number"
                  value={data.nutritionInfo.sodium}
                  onChange={(e) => handleChange('sodium', e.target.value)}
                  className={`border rounded px-1 w-12 ${errors['nutritionInfo.sodium'] ? 'border-red-500' : ''}`}
                />
                {errors['nutritionInfo.sodium'] && (
                  <p className="text-red-500 text-[8px]">{errors['nutritionInfo.sodium']}</p>
                )}
              </div>
            ) : (
              <span>{data.nutritionInfo.sodium}mg</span>
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
                  value={data.nutritionInfo.totalCarbohydrates}
                  onChange={(e) => handleChange('totalCarbohydrates', e.target.value)}
                  className={`border rounded px-1 w-12 ${errors['nutritionInfo.totalCarbohydrates'] ? 'border-red-500' : ''}`}
                />
                {errors['nutritionInfo.totalCarbohydrates'] && (
                  <p className="text-red-500 text-[8px]">{errors['nutritionInfo.totalCarbohydrates']}</p>
                )}
              </div>
            ) : (
              <span>{data.nutritionInfo.totalCarbohydrates}g</span>
            )}
          </div>
          <div className="pl-4">
            <div className="flex justify-between">
              <span>Dietary Fiber</span>
              {isEditing ? (
                <div>
                  <input
                    type="number"
                    value={data.nutritionInfo.dietaryFiber}
                    onChange={(e) => handleChange('dietaryFiber', e.target.value)}
                    className={`border rounded px-1 w-12 ${errors['nutritionInfo.dietaryFiber'] ? 'border-red-500' : ''}`}
                  />
                  {errors['nutritionInfo.dietaryFiber'] && (
                    <p className="text-red-500 text-[8px]">{errors['nutritionInfo.dietaryFiber']}</p>
                  )}
                </div>
              ) : (
                <span>{data.nutritionInfo.dietaryFiber}g</span>
              )}
            </div>
            <div className="flex justify-between">
              <span>Total Sugars</span>
              {isEditing ? (
                <div>
                  <input
                    type="number"
                    value={data.nutritionInfo.sugars}
                    onChange={(e) => handleChange('sugars', e.target.value)}
                    className={`border rounded px-1 w-12 ${errors['nutritionInfo.sugars'] ? 'border-red-500' : ''}`}
                  />
                  {errors['nutritionInfo.sugars'] && (
                    <p className="text-red-500 text-[8px]">{errors['nutritionInfo.sugars']}</p>
                  )}
                </div>
              ) : (
                <span>{data.nutritionInfo.sugars}g</span>
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
                  value={data.nutritionInfo.protein}
                  onChange={(e) => handleChange('protein', e.target.value)}
                  className={`border rounded px-1 w-12 ${errors['nutritionInfo.protein'] ? 'border-red-500' : ''}`}
                />
                {errors['nutritionInfo.protein'] && (
                  <p className="text-red-500 text-[8px]">{errors['nutritionInfo.protein']}</p>
                )}
              </div>
            ) : (
              <span>{data.nutritionInfo.protein}g</span>
            )}
          </div>
        </div>

        {(data.nutritionInfo.vitaminD ||
          data.nutritionInfo.calcium ||
          data.nutritionInfo.iron ||
          data.nutritionInfo.potassium) && (
          <div className="text-xs py-1">
            <p className="font-bold">Vitamins & Minerals</p>
            <div className="grid grid-cols-2 gap-x-4">
              {data.nutritionInfo.vitaminD !== undefined && (
                <div className="flex justify-between">
                  <span>Vitamin D</span>
                  {isEditing ? (
                    <div>
                      <input
                        type="number"
                        value={data.nutritionInfo.vitaminD}
                        onChange={(e) => handleChange('vitaminD', e.target.value)}
                        className={`border rounded px-1 w-12 ${errors['nutritionInfo.vitaminD'] ? 'border-red-500' : ''}`}
                      />
                      {errors['nutritionInfo.vitaminD'] && (
                        <p className="text-red-500 text-[8px]">{errors['nutritionInfo.vitaminD']}</p>
                      )}
                    </div>
                  ) : (
                    <span>{data.nutritionInfo.vitaminD}%</span>
                  )}
                </div>
              )}
              {data.nutritionInfo.calcium !== undefined && (
                <div className="flex justify-between">
                  <span>Calcium</span>
                  {isEditing ? (
                    <div>
                      <input
                        type="number"
                        value={data.nutritionInfo.calcium}
                        onChange={(e) => handleChange('calcium', e.target.value)}
                        className={`border rounded px-1 w-12 ${errors['nutritionInfo.calcium'] ? 'border-red-500' : ''}`}
                      />
                      {errors['nutritionInfo.calcium'] && (
                        <p className="text-red-500 text-[8px]">{errors['nutritionInfo.calcium']}</p>
                      )}
                    </div>
                  ) : (
                    <span>{data.nutritionInfo.calcium}%</span>
                  )}
                </div>
              )}
              {data.nutritionInfo.iron !== undefined && (
                <div className="flex justify-between">
                  <span>Iron</span>
                  {isEditing ? (
                    <div>
                      <input
                        type="number"
                        value={data.nutritionInfo.iron}
                        onChange={(e) => handleChange('iron', e.target.value)}
                        className={`border rounded px-1 w-12 ${errors['nutritionInfo.iron'] ? 'border-red-500' : ''}`}
                      />
                      {errors['nutritionInfo.iron'] && (
                        <p className="text-red-500 text-[8px]">{errors['nutritionInfo.iron']}</p>
                      )}
                    </div>
                  ) : (
                    <span>{data.nutritionInfo.iron}%</span>
                  )}
                </div>
              )}
              {data.nutritionInfo.potassium !== undefined && (
                <div className="flex justify-between">
                  <span>Potassium</span>
                  {isEditing ? (
                    <div>
                      <input
                        type="number"
                        value={data.nutritionInfo.potassium}
                        onChange={(e) => handleChange('potassium', e.target.value)}
                        className={`border rounded px-1 w-12 ${errors['nutritionInfo.potassium'] ? 'border-red-500' : ''}`}
                      />
                      {errors['nutritionInfo.potassium'] && (
                        <p className="text-red-500 text-[8px]">{errors['nutritionInfo.potassium']}</p>
                      )}
                    </div>
                  ) : (
                    <span>{data.nutritionInfo.potassium}%</span>
                  )}
                </div>
              )}
            </div>
          </div>
        )}

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
