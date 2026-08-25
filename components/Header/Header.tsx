"use client";

import { useState } from "react";
import Link from "next/link";
import css from "./Header.module.css";
import AuthNavigation from "../AuthNavigation/AuthNavigation";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const handleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  const handleCloseMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  return (
    <header className={css.header}>
      <div className="container">
        <div className={css.headerInner}>
          <Link href="/" aria-label="RecipeBook" className={css.logo}>
            Recipe<span className={css.logoAccent}>Book</span>
          </Link>
          <button
            type="button"
            onClick={handleMobileMenu}
            aria-label="Відкрити меню"
            className={css.menuButton}
            aria-expanded={isMobileMenuOpen}
          >
            ☰
          </button>

          <nav aria-label="Main Navigation" className={css.desktopNav}>
            <ul className={css.navigation}>
              <li className={css.navLink}>
              <Link
                href="/"
                className={pathname === "/" ? css.activeLink : undefined}
              >
                Головна
                </Link>
                </li>
              <li className={css.navLink}>
              <Link
                href="/recipes"
                className={
                  pathname === "/recipes" || /^\/recipes\/[^/]+$/.test(pathname)
                    ? css.activeLink
                    : undefined
                }
              >
                Рецепти
                </Link>
                </li>
              <AuthNavigation pathname={pathname}/>
            </ul>
          </nav>
        </div>
        {isMobileMenuOpen && (
          <nav className={css.mobileNav} aria-label="Mobile Navigation">
            <ul className={css.mobileNavigation}>
              <li>
                <Link href="/" onClick={handleCloseMobileMenu}>
                  Головна
                </Link>
              </li>

              <li>
                <Link href="/recipes" onClick={handleCloseMobileMenu}>
                  Рецепти
                </Link>
              </li>
              <AuthNavigation
                isMobile
                onCloseMobileMenu={handleCloseMobileMenu}
                pathname={pathname}
              />
            </ul>
          </nav>
        )}
      </div>
    </header>
  );
}
