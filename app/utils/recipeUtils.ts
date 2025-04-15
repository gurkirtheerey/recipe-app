export interface ParsedIngredient {
  measurements: string;
  cleaned: string;
}

/**
 * Parses an ingredient string into a cleaned string and measurements
 * @param ingredient - The ingredient string to parse
 * @returns An object containing the cleaned string and measurements
 * @example
 * parseIngredient('1 cup of flour') // { measurements: '1 cup', cleaned: 'flour' }
 */
export function parseIngredient(ingredient: string): ParsedIngredient {
  const measurements =
    ingredient.match(
      /(\d+\/\d+|\d+\.\d+|\d+|[¼½¾⅓⅔⅛⅜⅝⅞])\s?(cups?|tbsps?|tablespoons?|tsps?|teaspoons?|lbs?|grams?|g|kg|liters?|ml|oz)/gi
    ) || [];

  // Remove the measurements from the string
  const cleaned = ingredient
    .replace(measurements.join('|'), '')
    .replace(/\s{2,}/g, ' ')
    .trim();

  return {
    measurements: measurements.join(', '),
    cleaned,
  };
}
