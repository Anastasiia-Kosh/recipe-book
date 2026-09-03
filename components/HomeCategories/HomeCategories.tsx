import Image from "next/image";
import Link from "next/link";
import css from "./HomeCategories.module.css";
import { fetchCategoryCounts } from "@/lib/api/serverApi";
import Icon from "../Icon/Icon";

const homeCategories = [
  {
    title: "Торти",
    image: "/images/categories/cakes.png",
  },
  {
    title: "Кекси",
    image: "/images/categories/cupcakes.png",
  },
  {
    title: "Печиво",
    image: "/images/categories/cookies.png",
  },
  {
    title: "Пироги",
    image: "/images/categories/pies.png",
  },
  {
    title: "Десерти",
    image: "/images/categories/desserts.png",
  },
  {
    title: "Macarons",
    image: "/images/categories/macarons.png",
  },
];
function getRecipeWord(count: number) {
  if (count % 10 === 1 && count % 100 !== 11) {
    return "рецепт";
  }

  if (
    count % 10 >= 2 &&
    count % 10 <= 4 &&
    (count % 100 < 12 || count % 100 > 14)
  ) {
    return "рецепти";
  }

  return "рецептів";
}
export default async function HomeCategories() {
  const categoryCounts = await fetchCategoryCounts();

  return (
    <section className={css.categories}>
      <div className="container">
        <div className={css.categoriesHeader}>
          <div>
            <p className={css.sectionLabel}>Категорії</p>

            <h2 className={css.sectionTitle}>Обери, що хочеться приготувати</h2>
          </div>

          <Link href="/recipes" className={css.link}>
            Усі категорії<Icon name="arrow-right" size={22} />
          </Link>
        </div>

        <ul className={css.categoryGrid}>
   {homeCategories.map((category, index) => {
  const count =
    categoryCounts.find(
      (categoryCount) => categoryCount.category === category.title,
    )?.count ?? 0;

  return (
    <li key={category.title}>
      <Link
        href={`/recipes?category=${encodeURIComponent(category.title)}`}
        className={css.categoryCard}
      >
        <div className={css.categoryImage}>
          <Image
            src={category.image}
            alt={category.title}
            fill
            loading={index === 0 ? "eager" : "lazy"}
            sizes="(min-width: 1440px) 400px, (min-width: 768px) 50vw, 100vw"
          />
        </div>

        <div className={css.categoryInfo}>
            <h3>{category.title}</h3>
            <p className={css.recipeCount}>{count} {getRecipeWord(count)}</p>
          <Icon name="arrow-right" size={22} />
        </div>
      </Link>
    </li>
  );
})}
        </ul>
      </div>
    </section>
  );
}
