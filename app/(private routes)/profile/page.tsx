import Link from "next/link";
import css from "./ProfilePage.module.css";
import Image from "next/image";
import { Metadata } from "next";
import RecipeList from "@/components/RecipeList/RecipeList";
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
    <section className={css.mainContent}>
      <div className={css.profileCard}>
        <div className={css.header}>
          <h1 className={css.formTitle}>Profile Page</h1>
          <Link href="/profile/edit" className={css.editProfileButton}>
            Edit Profile
          </Link>
        </div>
        <div className={css.avatarWrapper}>
          <Image
            src={avatar}
            alt="User Avatar"
            width={120}
            height={120}
            className={css.avatar}
          />
        </div>
        <div className={css.profileInfo}>
          <p>Username: {username}</p>
          <p>Email: {email}</p>
        </div>
      </div>
      <section>
        <h2>Мої рецепти</h2>
        <RecipeList recipes={recipes} showActions={true} />
      </section>
      <section>
        <h2>Обране</h2>
        <RecipeList recipes={favoriteRecipes} refreshAfterChange={true}/>
      </section>
    </section>
  );
};

export default Profile;
