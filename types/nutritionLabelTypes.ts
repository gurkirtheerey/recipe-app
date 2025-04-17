export interface NutritionInfo {
  calories: number;
  totalFat: number;
  saturatedFat: number;
  transFat: number;
  cholesterol: number;
  sodium: number;
  totalCarbohydrates: number;
  dietaryFiber: number;
  sugars: number;
  protein: number;
  vitaminD?: number;
  calcium?: number;
  iron?: number;
  potassium?: number;
}

export interface NutritionLabelProps {
  nutritionInfo: NutritionInfo;
  servingSize: number;
  servingsPerContainer: number;
  className?: string;
}
