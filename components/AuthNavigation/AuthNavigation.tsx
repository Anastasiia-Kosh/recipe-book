"use client";
import { useAuth } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";

interface AuthNavigationProps {
  isMobile?: boolean;
  onCloseMobileMenu?: () => void;
  pathname: string;
}

const AuthNavigation = ({
  isMobile = false,
  onCloseMobileMenu,
  pathname,
}: AuthNavigationProps) => {
  const router = useRouter();
  const { isAuthenticated, user, clearIsAuthenticated } = useAuth();

  const [menuPathname, setMenuPathname] = useState<string | null>(null);

  const isUserMenuOpen = menuPathname === pathname;

  const handleMenu = () => {
    setMenuPathname((prev) => (prev === pathname ? null : pathname));
  };

  const handleCloseMenu = () => {
    setMenuPathname(null);
  };

  const handleLogout = async () => {
    onCloseMobileMenu?.();

    await logout();
    clearIsAuthenticated();
    router.replace("/sign-in");
  };

  if (isMobile) {
    return isAuthenticated && user ? (
      <>
        <li>
          <Link href="/recipes/create" onClick={onCloseMobileMenu}>
            Додати рецепт
          </Link>
        </li>

        <li>
          <Link href="/profile" onClick={onCloseMobileMenu}>
            Профіль
          </Link>
        </li>

        <li>
          <Link href="/my-recipes" onClick={onCloseMobileMenu}>
            Мої рецепти
          </Link>
        </li>

        <li>
          <Link href="/favorites" onClick={onCloseMobileMenu}>
            Обрані рецепти
          </Link>
        </li>

        <li>
          <button type="button" onClick={handleLogout}>
            Вийти
          </button>
        </li>
      </>
    ) : (
      <>
        <li>
          <Link href="/sign-in" onClick={onCloseMobileMenu}>
            Увійти
          </Link>
        </li>

        <li>
          <Link href="/sign-up" onClick={onCloseMobileMenu}>
            Реєстрація
          </Link>
        </li>
      </>
    );
  }
  return isAuthenticated && user ? (
    <>
      <li className={css.navigationItem}>
        <Link
          href="/recipes/create"
          prefetch={false}
          className={`${css.navigationLink} ${
            pathname === "/recipes/create" ? css.activeLink : ""
          }`}
        >
          Додати рецепт
        </Link>
      </li>
      <li className={css.userMenu}>
        <button
          type="button"
          className={css.userButton}
          onClick={handleMenu}
          aria-expanded={isUserMenuOpen}
        >
          <Image
            src={user.avatar}
            alt={user.username}
            width={32}
            height={32}
            className={css.avatar}
          />

          <span>{user.username}</span>
        </button>

        {isUserMenuOpen && (
          <ul className={css.dropdown}>
            <li className={css.userInfo}>
              <strong>{user.username}</strong>
              <span>{user.email}</span>
            </li>

            <li className={css.divider} />
            <li>
              <Link href="/profile" prefetch={false} onClick={handleCloseMenu}>
                Профіль
              </Link>
            </li>
            <li>
              <Link href="/my-recipes" onClick={handleCloseMenu}>
                Мої рецепти
              </Link>
            </li>
            <li>
              <Link href="/favorites" onClick={handleCloseMenu}>
                Обрані рецепти
              </Link>
            </li>
            <li>
              <button
                type="button"
                className={css.dropdownLogout}
                onClick={handleLogout}
              >
                Вийти
              </button>
            </li>
          </ul>
        )}
      </li>
    </>
  ) : (
    <>
      <li className={css.navigationItem}>
        <Link href="/sign-in" prefetch={false} className={css.navigationLink}>
          Увійти
        </Link>
      </li>

      <li className={css.navigationItem}>
        <Link href="/sign-up" prefetch={false} className={css.navigationLink}>
          Реєстрація
        </Link>
      </li>
    </>
  );
};
export default AuthNavigation;
