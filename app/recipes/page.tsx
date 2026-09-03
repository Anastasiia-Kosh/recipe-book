import { fetchRecipes } from "@/lib/api/serverApi";
import RecipeList from "@/components/RecipeList/RecipeList";
import Link from "next/link";
import css from "./RecipesPage.module.css";
import Pagination from "@/components/Pagination/Pagination";
import SearchBox from "@/components/SearchBox/SearchBox";
import type { Metadata } from "next";

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

export async function generateMetadata({
  searchParams,
}: RecipesPageProps): Promise<Metadata> {
  const { category, search, page } = await searchParams;
  const currentPage = Number(page ?? 1);
  const canonicalParams = new URLSearchParams();

  if (category) {
    canonicalParams.set("category", category);
    
  }

  if (currentPage > 1) {
    canonicalParams.set("page", String(currentPage));
  }

  const canonicalUrl = canonicalParams.size
    ? `/recipes?${canonicalParams.toString()}`
    : "/recipes";

  if (search) {
    return {
      title: `Пошук: ${search}`,
      description: `Результати пошуку рецептів за запитом «${search}» у RecipeBook.`,
      robots: {
        index: false,
        follow: true,
      },
    };
  }

  if (category) {
  const title =
    currentPage > 1
      ? `${category} — рецепти, сторінка ${currentPage}`
      : `${category} — рецепти`;

  const description = `Домашні рецепти в категорії «${category}» у RecipeBook.`;

  return {
    title,
    description,

    alternates: {
      canonical: canonicalUrl,
    },

    openGraph: {
      type: "website",
      url: canonicalUrl,
      title,
      description,
      images: [
  {
    url: "/images/og/recipe-book-categories-og.jpg",
    width: 1200,
    height: 630,
    alt: "RecipeBook — домашні рецепти",
  },
],
    },
  };
}
const title =
  currentPage > 1
    ? `Рецепти — сторінка ${currentPage}`
    : "Рецепти";

const description =
  "Домашні рецепти випічки, десертів, основних страв та інших улюблених страв у RecipeBook.";

return {
  title,
  description,

  alternates: {
    canonical: canonicalUrl,
  },

  openGraph: {
    type: "website",
    url: canonicalUrl,
    title,
    description,
  },
};
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
        <RecipeList recipes={recipes} search={search} />
        <Pagination totalPages={totalPages} currentPage={currentPage} />
      </div>
    </section>
  );
}
