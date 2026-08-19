import { fetchRecipes } from "@/lib/api/serverApi";
import RecipeList from "@/components/RecipeList/RecipeList";

export default async function RecipesPage() {
  const { recipes } = await fetchRecipes();

  return (
    <main className="container">
      <h1>Рецепти</h1>

      <RecipeList recipes={recipes} />
    </main>
  );
}