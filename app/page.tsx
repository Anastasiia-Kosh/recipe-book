
import Link from "next/link";
import css from "./page.module.css";
import HomeCategories from "@/components/HomeCategories/HomeCategories";
import HomeLatestRecipes from "@/components/HomeLatestRecipes/HomeLatestRecipes";


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