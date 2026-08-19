import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";

export default function Header() {
  return (
    <header className={css.header}>
      <Link href="/" aria-label="RecipeBook">
        RecipeBook
      </Link>
      <nav aria-label="Main Navigation">
        <ul className={css.navigation}>
          <li>
            <Link href="/">Головна</Link>
          </li>
          <li>
            <Link href="/recipes">Рецепти</Link>
          </li>
          <AuthNavigation />
        </ul>
      </nav>
    </header>
  );
}
