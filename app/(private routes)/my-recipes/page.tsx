import RecipeList from "@/components/RecipeList/RecipeList";
import { fetchMyRecipes } from "@/lib/api/serverApi";
import css from "../MyRecipesPage-Favorites.module.css";
import RecipesEmptyState from "@/components/RecipesEmptyState/RecipesEmptyState";
import Pagination from "@/components/Pagination/Pagination";

interface MyRecipesPageProps {
  searchParams: Promise<{
    page?: string;
  }>;
}

export default async function MyRecipesPage({
  searchParams,
}: MyRecipesPageProps) {
  const params = await searchParams;
  const currentPage = Math.max(1, Number(params.page) || 1);
  const { recipes, totalPages } = await fetchMyRecipes(currentPage);
  return (
    <section className={css.page}>
      <div className="container">
        <h1 className={css.title}>Мої рецепти</h1>

        {recipes.length > 0 ? (
          <>
            <RecipeList recipes={recipes} />
            <Pagination totalPages={totalPages} currentPage={currentPage} />
          </>
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
