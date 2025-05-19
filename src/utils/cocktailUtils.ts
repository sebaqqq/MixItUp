import { Cocktail, IngredientsAndMeasures } from '../types/cocktail';

/**
 * Extract all ingredients and measures from a cocktail
 */
export const extractIngredientsAndMeasures = (cocktail: Cocktail): IngredientsAndMeasures[] => {
  const result: IngredientsAndMeasures[] = [];

  for (let i = 1; i <= 15; i++) {
    const ingredient = cocktail[`strIngredient${i}` as keyof Cocktail] as string | null;
    const measure = cocktail[`strMeasure${i}` as keyof Cocktail] as string | null;

    if (ingredient) {
      result.push({
        ingredient: ingredient.trim(),
        measure: measure?.trim() || '',
      });
    }
  }

  return result;
};

/**
 * Format tags from a comma-separated string into an array
 */
export const formatTags = (tags: string | null): string[] => {
  if (!tags) return [];
  return tags.split(',').map((tag) => tag.trim());
};

/**
 * Get a color based on alcoholic status
 */
export const getAlcoholicColor = (alcoholic: string): string => {
  switch (alcoholic.toLowerCase()) {
    case 'alcoholic':
      return 'bg-rose-100 text-rose-800 border-rose-200';
    case 'non alcoholic':
      return 'bg-mint-100 text-mint-800 border-mint-200';
    default:
      return 'bg-blue-100 text-blue-800 border-blue-200';
  }
};

/**
 * Format names for display (capitalize first letter of each word)
 */
export const formatDisplayName = (name: string): string => {
  return name
    .split(' ')
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
    .join(' ');
};