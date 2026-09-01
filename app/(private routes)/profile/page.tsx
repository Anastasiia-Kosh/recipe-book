import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { Metadata } from "next";
import { getMe, fetchMyRecipes, fetchSavedRecipes } from "@/lib/api/serverApi";
import type { Recipe } from "@/types/recipe";

export const metadata: Metadata = {
  title: "Профіль | RecipeBook",
  description: "Особистий профіль користувача RecipeBook",
};

const Profile = async () => {
  const { email, username, avatar } = await getMe();
  const { recipes } = await fetchMyRecipes();
  const savedRecipes = await fetchSavedRecipes();
  const favoriteRecipes = savedRecipes
    .map((savedRecipe) => savedRecipe.recipeId)
    .filter((recipe): recipe is Recipe => recipe !== null && typeof recipe !== "string");

  return (
  <section className={css.page}>
    <div className="container">
      <div className={css.profileHeader}>
        <div className={css.userInfo}>
          <Image
            src={avatar}
            alt="Аватар користувача"
            width={120}
            height={120}
            className={css.avatar}
          />

          <div>
            <h1 className={css.title}>{username}</h1>
            <p className={css.email}>{email}</p>
          </div>
        </div>

        <Link href="/profile/edit" className={css.editProfileButton}>
          Редагувати профіль
        </Link>
      </div>

      <div className={css.profileNavigation}>
        <Link href="/my-recipes" className={css.navigationCard}>
          <div>
            <h2 className={css.cardTitle}>Мої рецепти</h2>
            <p className={css.cardDescription}>
              Рецепти, які ви створили
            </p>
          </div>

          <div className={css.cardFooter}>
            <span className={css.count}>{recipes.length}</span>
            <span className={css.cardLink}>Переглянути →</span>
          </div>
        </Link>

        <Link href="/favorites" className={css.navigationCard}>
          <div>
            <h2 className={css.cardTitle}>Обрані рецепти</h2>
            <p className={css.cardDescription}>
              Рецепти, які ви додали в обране
            </p>
          </div>

          <div className={css.cardFooter}>
            <span className={css.count}>
              {favoriteRecipes.length}
            </span>
            <span className={css.cardLink}>Переглянути →</span>
          </div>
        </Link>
      </div>
    </div>
  </section>
);
};

export default Profile;
