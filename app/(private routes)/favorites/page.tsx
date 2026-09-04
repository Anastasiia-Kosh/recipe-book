import RecipeList from "@/components/RecipeList/RecipeList";
import { fetchSavedRecipes } from "@/lib/api/serverApi";
import type { Recipe } from "@/types/recipe";
import css from "../MyRecipesPage-Favorites.module.css";
import RecipesEmptyState from "@/components/RecipesEmptyState/RecipesEmptyState";

export default async function FavoritesPage() {
  const savedRecipes = await fetchSavedRecipes();

  const favoriteRecipes = savedRecipes
    .map((savedRecipe) => savedRecipe.recipeId)
    .filter(
      (recipe): recipe is Recipe =>
        recipe !== null && typeof recipe !== "string",
    );

  return (
    <section className={css.page}>
      <div className="container">
        <h1 className={css.title}>Обрані рецепти</h1>

        {favoriteRecipes.length > 0 ? (
          <RecipeList
            recipes={favoriteRecipes}
            initialSavedRecipes={savedRecipes}
            refreshAfterChange
          />
        ) : (
          <RecipesEmptyState
            image="/images/empty-states/favorites.png"
            title="У вас поки немає обраних рецептів"
            description="Додавайте улюблені рецепти в обране, щоб швидко знаходити їх пізніше."
            linkHref="/recipes"
            linkText="Переглянути рецепти"
          />
        )}
      </div>
    </section>
  );
}
