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
}

const AuthNavigation = ({ isMobile = false,   onCloseMobileMenu, }: AuthNavigationProps) => {
  const router = useRouter();
  const { isAuthenticated, user, clearIsAuthenticated } = useAuth();

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const handleMenu = () => {
    setIsUserMenuOpen((prev) => !prev);
  };
  const handleCloseMenu = () => {
    setIsUserMenuOpen(false);
  };

  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.replace("/sign-in");
  };
  if (isMobile) {
  return isAuthenticated && user ? (
    <>
      <li>
        <Link href="/recipes/create" onClick={onCloseMobileMenu}>Додати рецепт</Link>
      </li>

      <li>
        <Link href="/profile" onClick={onCloseMobileMenu}>Профіль</Link>
      </li>

      <li>
        <Link href="/my-recipes" onClick={onCloseMobileMenu}>Мої рецепти</Link>
      </li>

      <li>
        <Link href="/favorites" onClick={onCloseMobileMenu}>Обране</Link>
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
        <Link href="/sign-in">Увійти</Link>
      </li>

      <li>
        <Link href="/sign-up">Реєстрація</Link>
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
          className={css.navigationLink}
        >
          Додати рецепт
        </Link>
      </li>
      <li className={css.navigationItem}>
        <button type="button" className={css.username} onClick={handleMenu}>
          <Image
            src={user.avatar}
            alt={user.username}
            width={32}
            height={32}
          />

          <span>{user.username}</span>
        </button>
      </li>
      {isUserMenuOpen && (
        <div>
          <li className={css.navigationItem}>
            <Link
              href="/profile"
              prefetch={false}
              className={css.navigationLink}
              onClick={handleCloseMenu}
            >
              Профіль
            </Link>
          </li>
            <li>
            <Link href="/my-recipes" onClick={handleCloseMenu}>Мої рецепти</Link>
          </li>
          <li>
            <Link href="/favorites" onClick={handleCloseMenu}>Обране</Link>
          </li>
          <li>
            <button
              type="button"
              className={css.logoutButton}
              onClick={handleLogout}
            >
              Вийти
            </button>
          </li>
        </div>
      )}
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
