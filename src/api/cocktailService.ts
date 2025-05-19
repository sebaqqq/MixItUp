import { Cocktail, CocktailsResponse, FilterType } from "../types/cocktail";

const API_BASE_URL = "https://www.thecocktaildb.com/api/json/v1/1";

/**
 * Search for cocktails by name
 */
export const searchCocktailsByName = async (
  searchTerm: string
): Promise<Cocktail[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/search.php?s=${encodeURIComponent(searchTerm)}`
    );
    const data: CocktailsResponse = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error("Error searching cocktails:", error);
    throw new Error("Failed to search cocktails");
  }
};

/**
 * Get cocktail by ID
 */
export const getCocktailById = async (id: string): Promise<Cocktail | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/lookup.php?i=${id}`);
    const data: CocktailsResponse = await response.json();
    return data.drinks?.[0] || null;
  } catch (error) {
    console.error("Error fetching cocktail details:", error);
    throw new Error("Failed to fetch cocktail details");
  }
};

/**
 * Get a random cocktail
 */
export const getRandomCocktail = async (): Promise<Cocktail | null> => {
  try {
    const response = await fetch(`${API_BASE_URL}/random.php`);
    const data: CocktailsResponse = await response.json();
    return data.drinks?.[0] || null;
  } catch (error) {
    console.error("Error fetching random cocktail:", error);
    throw new Error("Failed to fetch random cocktail");
  }
};

/**
 * Filter cocktails by various criteria
 */
export const filterCocktails = async (
  filterType: FilterType,
  filterValue: string
): Promise<Cocktail[]> => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/filter.php?${filterType}=${encodeURIComponent(
        filterValue
      )}`
    );
    const data: CocktailsResponse = await response.json();
    return data.drinks || [];
  } catch (error) {
    console.error("Error filtering cocktails:", error);
    throw new Error("Failed to filter cocktails");
  }
};

/**
 * Get ingredient image URL
 */
export const getIngredientImageUrl = (
  ingredientName: string,
  isSmall = false
): string => {
  const size = isSmall ? "Small" : "Medium";
  return `https://www.thecocktaildb.com/images/ingredients/${encodeURIComponent(
    ingredientName
  )}-${size}.png`;
};

/**
 * Fetch all filter categories
 */
export const getCategories = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/list.php?c=list`);
    const data = await response.json();
    return (
      data.drinks?.map((item: { strCategory: string }) => item.strCategory) ||
      []
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw new Error("Failed to fetch categories");
  }
};

/**
 * Fetch all glass types
 */
export const getGlassTypes = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/list.php?g=list`);
    const data = await response.json();
    return (
      data.drinks?.map((item: { strGlass: string }) => item.strGlass) || []
    );
  } catch (error) {
    console.error("Error fetching glass types:", error);
    throw new Error("Failed to fetch glass types");
  }
};

/**
 * Fetch all alcoholic filters
 */
export const getAlcoholicFilters = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/list.php?a=list`);
    const data = await response.json();
    return (
      data.drinks?.map((item: { strAlcoholic: string }) => item.strAlcoholic) ||
      []
    );
  } catch (error) {
    console.error("Error fetching alcoholic filters:", error);
    throw new Error("Failed to fetch alcoholic filters");
  }
};

/**
 * Fetch all ingredients
 */
export const getIngredients = async (): Promise<string[]> => {
  try {
    const response = await fetch(`${API_BASE_URL}/list.php?i=list`);
    const data = await response.json();
    return (
      data.drinks?.map(
        (item: { strIngredient1: string }) => item.strIngredient1
      ) || []
    );
  } catch (error) {
    console.error("Error fetching ingredients:", error);
    throw new Error("Failed to fetch ingredients");
  }
};
