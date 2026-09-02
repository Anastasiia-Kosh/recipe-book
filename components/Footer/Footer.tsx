import Link from "next/link";
import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <div className="container">
        <div className={css.content}>
          <div className={css.brand}>
            <Link href="/" className={css.logo}>
              Recipe<span>Book</span>
            </Link>

            <p className={css.description}>
              Улюблені рецепти в одному місці.
            </p>
          </div>

          <nav className={css.navigation} aria-label="Footer Navigation">
            <Link href="/">Головна</Link>
            <Link href="/recipes">Рецепти</Link>
          </nav>
        </div>

        <div className={css.bottom}>
          <p>
            © {new Date().getFullYear()} RecipeBook
          </p>

          <p>
            Створено з любов&apos;ю для домашньої кухні
          </p>
        </div>
      </div>
    </footer>
  );
}