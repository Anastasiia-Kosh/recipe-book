export const recipeCategories = [
  "Macarons",
  "Млинці",
  "Варення",
  "Десерти",
  "Кекси",
  "Торти",
  "Тарти",
  "Пироги",
  "Печиво",
  "Рогалики",
  "Інше",
  "Основні страви",
  "Перші страви",
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
