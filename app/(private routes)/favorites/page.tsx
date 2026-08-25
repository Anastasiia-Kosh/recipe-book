import RecipeList from "@/components/RecipeList/RecipeList";
import { fetchSavedRecipes } from "@/lib/api/serverApi";
import type { Recipe } from "@/types/recipe";

export default async function FavoritesPage() {
  const savedRecipes = await fetchSavedRecipes();

  const favoriteRecipes = savedRecipes
    .map((savedRecipe) => savedRecipe.recipeId)
    .filter(
      (recipe): recipe is Recipe =>
        typeof recipe !== "string",
    );

  return (
    <section>
      <h1>Обране</h1>

      <RecipeList
        recipes={favoriteRecipes}
        refreshAfterChange
      />
    </section>
  );
}