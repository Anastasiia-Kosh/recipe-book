export const recipeCategories = [
  'Торти',
  'Кекси',
  'Печиво',
  'Млинці',
  'Пироги',
  'Десерти',
  'Тарти',
  'Варення',
  'Macarons',
  'Хліб і тісто',
] as const;

export type RecipeCategory = (typeof recipeCategories)[number];

export interface Recipe {
  _id: string;
  category: RecipeCategory;
  title: string;
  shortDescription: string;
  image: string;
  imagePublicId: string;
  ingredients: string;
  instructions: string;
  baseRecipeId: string | null;
  userId: string;
  createdAt: string;
  updatedAt: string;
}

