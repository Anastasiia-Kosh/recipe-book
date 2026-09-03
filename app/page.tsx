import Link from "next/link";
import css from "./page.module.css";
import HomeCategories from "@/components/HomeCategories/HomeCategories";
import HomeLatestRecipes from "@/components/HomeLatestRecipes/HomeLatestRecipes";
import type { Metadata } from "next";

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },

  openGraph: {
    type: "website",
    url: "/",
    title: "RecipeBook — домашні рецепти",
    description:
      "Перевірені домашні рецепти випічки, десертів та улюблених страв, які хочеться готувати знову.",
    images: [
      {
        url: "/images/og/recipe-book-og.jpg",
        width: 1200,
        height: 630,
        alt: "RecipeBook — домашні рецепти",
      },
    ],
  },
}

export default function Home() {
  return (
    <>
    <section className={css.hero}>
  <div className={`container ${css.heroContainer}`}>
    <div className={css.heroText}>
      <h1 className={css.title}>
        Моя книга
        <span className={css.titleAccent}>
          улюблених рецептів
        </span>
      </h1>

      <p className={css.description}>
        Перевірені домашні рецепти, які хочеться готувати знову.
      </p>

      <Link href="/recipes" className={css.button}>
        Переглянути рецепти
      </Link>
    </div>
  </div>
</section>
      <HomeCategories />
      <HomeLatestRecipes/>
</>
  );
}