import { fetchRecipes } from "@/lib/api/serverApi";
import RecipeList from "@/components/RecipeList/RecipeList";
import Link from "next/link";
import css from "./HomeLatestRecipes.module.css"

export default async function HomeLatestRecipes() {
  const { recipes } = await fetchRecipes({ page: 1, perPage: 6 });
  return (
    <section className={css.section}>
      <div className="container">
        <div className={css.header}>
          <h2 className={css.title}>Останні рецепти</h2>

          <Link href="/recipes" className={css.link}>
            Усі рецепти →
          </Link>
        </div>

        <RecipeList recipes={recipes} />
      </div>
    </section>
  );
}
