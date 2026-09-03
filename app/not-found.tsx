import { Metadata } from "next";
import css from "./not-found.module.css";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Сторінку не знайдено | RecipeBook",
  description: "Запитану сторінку не знайдено.",
};

export default function NotFound() {
  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.content}>
          <p className={css.code}>404</p>

          <h1 className={css.title}>Сторінку не знайдено</h1>

          <p className={css.description}>
            Схоже, такої сторінки немає або її адресу було змінено.
          </p>

          <div className={css.actions}>
            <Link href="/" className={css.primaryLink}>
              На головну
            </Link>

            <Link href="/recipes" className={css.secondaryLink}>
              Переглянути рецепти
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
