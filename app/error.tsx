"use client";

import Link from "next/link";
import css from "./error.module.css";

interface ErrorPageProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function ErrorPage({
  error,
  reset,
}: ErrorPageProps) {
  return (
    <section className={css.page}>
      <div className="container">
        <div className={css.content}>
          <p className={css.code}>Ой...</p>

          <h1 className={css.title}>
            Щось пішло не так
          </h1>

          <p className={css.description}>
            Не вдалося завантажити сторінку. Спробуйте ще раз або поверніться
            до рецептів.
          </p>

          <div className={css.actions}>
            <button
              type="button"
              onClick={reset}
              className={css.primaryButton}
            >
              Спробувати ще раз
            </button>

            <Link
              href="/recipes"
              className={css.secondaryLink}
            >
              Переглянути рецепти
            </Link>
          </div>

          {process.env.NODE_ENV === "development" && (
            <p className={css.devError}>
              {error.message}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}