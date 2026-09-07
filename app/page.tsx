import Link from "next/link";
import css from "./page.module.css";
import HomeCategories from "@/components/HomeCategories/HomeCategories";
import HomeLatestRecipes from "@/components/HomeLatestRecipes/HomeLatestRecipes";
import type { Metadata } from "next";
import Image from "next/image";

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
        <picture className={css.heroPicture}>
  <source
    media="(min-width: 1440px)"
    srcSet="/images/home/hero-desktop.webp"
  />

  <source
    media="(min-width: 768px)"
    srcSet="/images/home/hero-tablet.webp"
  />

  <Image
    src="/images/home/hero-mobile.webp"
    alt=""
    fill
    sizes="100vw"
    className={css.heroBackground}
    loading="eager"
    fetchPriority="high"
  />
</picture>
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