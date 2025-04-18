/**
 * Extracts recipe data from a paragraph
 * @param paragraph - The paragraph to extract recipe data from
 * @returns The recipe data
 */
export function extractRecipeData(paragraph: string) {
  const recipe = {
    title: '', // Extracted dynamically
    description: '',
    ingredients: [] as string[],
    instructions: [] as string[],
    prep_time: 0,
    cook_time: 0,
    servings: 0,
    nutrition: {
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
    },
  };

  // Regular expressions to extract data from the paragraph
  const titleMatch = paragraph.match(/Title:\s([\s\S]*?)\n/); // Extract title
  const descriptionMatch = paragraph.match(/Description:\s([\s\S]*?)\n/);
  const prepTimeMatch = paragraph.match(/Prep Time:\s([\d\w\s-]+)/);
  const cookTimeMatch = paragraph.match(/Cook Time:\s([\d\w\s-]+)/);
  const servingsMatch = paragraph.match(/Servings:\s(\d+)/);
  const ingredientsMatch = paragraph.match(/Ingredients:\s([\s\S]*?)Instructions:/);
  const instructionsMatch = paragraph.match(/Instructions:\s*([\s\S]*?)Nutrition Facts \(per serving\):/);
  const nutritionMatch = paragraph.match(/Nutrition Facts \(per serving\):\s*([\s\S]*)/);

  // Assign matches to respective keys
  if (titleMatch) recipe.title = titleMatch[1].trim();
  if (descriptionMatch) recipe.description = descriptionMatch[1].trim();
  if (prepTimeMatch) recipe.prep_time = parseInt(prepTimeMatch[1].trim());
  if (cookTimeMatch) recipe.cook_time = parseInt(cookTimeMatch[1].trim());
  if (servingsMatch) recipe.servings = parseInt(servingsMatch[1].trim());
  // Extract ingredients and instructions; remove any leading numbers, dashes,and whitespace
  if (ingredientsMatch) {
    recipe.ingredients = ingredientsMatch[1]
      .split('\n')
      .map((ingredient) => ingredient.replace(/^[-\d.]+\s*/, '').trim())
      .filter((ingredient) => ingredient !== '');
  }
  if (instructionsMatch) {
    recipe.instructions = instructionsMatch[1]
      .split('\n')
      .map((instruction) => instruction.replace(/^[-\d.]+\s*/, '').trim())
      .filter((instruction) => instruction !== '');
  }
  // Nutrition is saved as an obj in db, so we need to parse the string into an obj
  if (nutritionMatch) {
    const labelMap = {
      Calories: 'calories',
      'Total Fat': 'totalFat',
      'Saturated Fat': 'saturatedFat',
      'Trans Fat': 'transFat',
      Cholesterol: 'cholesterol',
      Sodium: 'sodium',
      'Total Carbohydrates': 'totalCarbohydrates',
      'Dietary Fiber': 'dietaryFiber',
      Sugars: 'sugars',
      Protein: 'protein',
    };
    // Split the nutrition string into lines and iterate over each line
    nutritionMatch[1].split('\n').forEach((line) => {
      const cleanLine = line.replace(/^- /, ''); // remove dash
      const [label, valueWithUnit] = cleanLine.split(/:\s*/);
      const key = labelMap[label.trim() as keyof typeof labelMap];
      if (key && valueWithUnit) {
        const numberValue = parseFloat(valueWithUnit); // gets number only (ignores g, mg, etc.)
        recipe.nutrition[key as keyof typeof recipe.nutrition] = isNaN(numberValue) ? 0 : numberValue;
      }
    });
  }

  return recipe;
}
