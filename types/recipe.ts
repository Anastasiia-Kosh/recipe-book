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
  id: string;
  category: RecipeCategory;
  title: string;
  shortDescription: string;
  image: string;
  text: string;
  baseRecipeId?: string;
  createdAt: string;
  updatedAt: string;
}