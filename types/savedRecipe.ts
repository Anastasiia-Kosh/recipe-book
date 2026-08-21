import type { Recipe } from "./recipe";

export interface SavedRecipe {
  _id: string;
  userId: string;
  recipeId: string | Recipe;
  createdAt: string;
  updatedAt: string;
}