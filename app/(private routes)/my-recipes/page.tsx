import RecipeList from "@/components/RecipeList/RecipeList";
import { fetchMyRecipes } from "@/lib/api/serverApi";

export default async function MyRecipesPage() {
  const { recipes } = await fetchMyRecipes();
  return (
    <section>
      <h1>Мої рецепти</h1>

      <RecipeList recipes={recipes} showActions />
    </section>
  );
}
