import { fetchRecipes } from "@/lib/api/serverApi";
import RecipeList from "@/components/RecipeList/RecipeList";
import Link from "next/link";
import css from "./RecipesPage.module.css"
const categories = [
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
];

interface RecipesPageProps {
  searchParams: Promise<{
    category?: string;
  }>;
}

export default async function RecipesPage(props: RecipesPageProps) {
  const { category } = await props.searchParams;
  const { recipes } = await fetchRecipes(category);

  return (
    <section className="container">
      <h1>Рецепти</h1>

      <ul className={css.categoryFilters}>
        <li>
          <Link href="/recipes" className={`${css.categoryFilter} ${
  !category ? css.activeCategory : ""
}`}>
            Усі категорії
          </Link>
        </li>
        {categories.map((item) => (
          <li key={item}>
            <Link href={`/recipes?category=${encodeURIComponent(item)}`} className={`${css.categoryFilter} ${
  item === category ? css.activeCategory : ""
}`}>
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <RecipeList recipes={recipes} />
    </section>
  );
}
