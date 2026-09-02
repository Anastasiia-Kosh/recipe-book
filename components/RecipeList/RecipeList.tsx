"use client";

import { useEffect, useState } from "react";
import { getSavedRecipes, checkSession } from "@/lib/api/clientApi";
import type { SavedRecipe } from "@/types/savedRecipe";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import type { Recipe } from "@/types/recipe";
import { useAuth } from "@/lib/store/authStore";
import css from "./RecipeList.module.css";
import toast from "react-hot-toast";
import RecipesEmptyState from "../RecipesEmptyState/RecipesEmptyState";

interface RecipeListProps {
  recipes: Recipe[];
  search?: string;
  refreshAfterChange?: boolean;
}

export default function RecipeList({
  recipes,
  search,
  refreshAfterChange = false,
}: RecipeListProps) {
  const user = useAuth((store) => store.user);
  const isAuthenticated = useAuth((store) => store.isAuthenticated);
  const clearIsAuthenticated = useAuth((store) => store.clearIsAuthenticated);

  useEffect(() => {
    if (search && recipes.length === 0) {
      toast.error(`За запитом "${search}" нічого не знайдено`, {
        id: "search-no-results",
      });
    }
  }, [search, recipes.length]);

  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);
  useEffect(() => {
    if (!isAuthenticated || !user) {
      return;
    }

    async function loadSavedRecipes() {
      const hasSession = await checkSession();

      if (!hasSession) {
        clearIsAuthenticated();
        return;
      }

      const data = await getSavedRecipes();
      setSavedRecipes(data);
    }

    loadSavedRecipes();
  }, [isAuthenticated, user, clearIsAuthenticated]);

  if (recipes.length === 0) {
    return   <RecipesEmptyState
        image="/images/empty-states/my-recipes.png"
        title="Рецептів в цій категорії поки немає"
        description=""
         linkHref="/recipes"
    linkText="Переглянути усі категорії"
      />;
  }

  return (
    <ul className={css.list}>
      {recipes.map((recipe) => {
        const isSaved =
          isAuthenticated &&
          !!user &&
          savedRecipes.some((savedRecipe) => {
            if (!savedRecipe.recipeId) {
              return false;
            }
            if (typeof savedRecipe.recipeId === "string") {
              return savedRecipe.recipeId === recipe._id;
            }

            return savedRecipe.recipeId._id === recipe._id;
          });
        return (
          <li key={recipe._id} className={css.item}>
            <RecipeCard
              recipe={recipe}
              initialSaved={isSaved}
              refreshAfterChange={refreshAfterChange}
            />
          </li>
        );
      })}
    </ul>
  );
}
