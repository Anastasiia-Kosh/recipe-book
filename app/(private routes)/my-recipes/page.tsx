import RecipeList from "@/components/RecipeList/RecipeList";
import { fetchMyRecipes } from "@/lib/api/serverApi";
import css from "./MyRecipesPage.module.css";
import RecipesEmptyState from "@/components/RecipesEmptyState/RecipesEmptyState";

export default async function MyRecipesPage() {
  const { recipes } = await fetchMyRecipes();
  return (
    <section className={css.page}>
      <div className="container">
        <h1 className={css.title}>Мої рецепти</h1>

        {recipes.length > 0 ? (
  <RecipeList recipes={recipes} />
) : (
  <RecipesEmptyState
    image="/images/empty-states/my-recipes.png"
    title="У вас поки немає власних рецептів"
    description="Створіть свій перший рецепт і збирайте всі улюблені страви в одному місці."
    linkHref="/recipes/create"
    linkText="Додати рецепт"
  />
)}
      </div>
    </section>
  );
}
