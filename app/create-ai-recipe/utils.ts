// Function to extract information from the recipe paragraph
export function extractRecipeData(paragraph: string) {
  const recipe = {
    title: '', // Extracted dynamically
    description: '',
    ingredients: [] as string[],
    instructions: [] as string[],
    prep_time: 0,
    cook_time: 0,
    servings: 0,
  };

  // Regular expressions to extract data from the paragraph
  const titleMatch = paragraph.match(/Title:\s([\s\S]*?)\n/); // Extract title
  const descriptionMatch = paragraph.match(/Description:\s([\s\S]*?)\n/);
  const prepTimeMatch = paragraph.match(/Prep Time:\s([\d\w\s-]+)/);
  const cookTimeMatch = paragraph.match(/Cook Time:\s([\d\w\s-]+)/);
  const servingsMatch = paragraph.match(/Servings:\s(\d+)/);
  const ingredientsMatch = paragraph.match(/Ingredients:\s([\s\S]*?)Instructions:/);
  const instructionsMatch = paragraph.match(/Instructions:\s([\s\S]*)/);

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

  return recipe;
}
