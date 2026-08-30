import { fetchRecipes } from "@/lib/api/serverApi";
import RecipeList from "@/components/RecipeList/RecipeList";
import Link from "next/link";
import css from "./RecipesPage.module.css";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
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
    search?: string;
    page?: string;
  }>;
}
export default async function RecipesPage(props: RecipesPageProps) {
  const { category, search, page } = await props.searchParams;
  const currentPage = Number(page ?? 1);
  const { recipes, totalPages } = await fetchRecipes({
    category,
    search,
    page: currentPage,
  });

  return (
    <section className={css.page}>
    <div className="container">
      <h1>Рецепти</h1>
      <ul className={css.categoryFilters}>
        <li>
          <Link
            href="/recipes"
            className={`${css.categoryFilter} ${
              !category ? css.activeCategory : ""
            }`}
          >
            Усі категорії
          </Link>
        </li>
        {categories.map((item) => (
          <li key={item}>
            <Link
              href={`/recipes?category=${encodeURIComponent(item)}`}
              className={`${css.categoryFilter} ${
                item === category ? css.activeCategory : ""
              }`}
            >
              {item}
            </Link>
          </li>
        ))}
      </ul>
      <SearchBox />
      <RecipeList recipes={recipes} search={search}/>
      <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
      </section>
  );
}
