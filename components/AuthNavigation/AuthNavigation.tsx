"use client";
import { useAuth } from "@/lib/store/authStore";
import css from "./AuthNavigation.module.css";
import Link from "next/link";
import { logout } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

const AuthNavigation = () => {
  const router = useRouter();
  const { isAuthenticated, user, clearIsAuthenticated } = useAuth();
  const handleLogout = async () => {
    await logout();
    clearIsAuthenticated();
    router.replace("/sign-in");
  };
  return isAuthenticated ? (
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
      <Link href="/favorites">Обране</Link>
      <li className={css.navigationItem}>
        <Link href="/profile" prefetch={false} className={css.navigationLink}>
          Профіль
        </Link>
      </li>

      <li className={css.navigationItem}>
        <p className={css.username}>{user?.username}</p>
        <button className={css.logoutButton} onClick={handleLogout}>
          Вийти
        </button>
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
