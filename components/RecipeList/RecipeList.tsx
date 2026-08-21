"use client";

import { useEffect, useState } from "react";
import { getSavedRecipes } from "@/lib/api/clientApi";
import type { SavedRecipe } from "@/types/savedRecipe";
import RecipeCard from "@/components/RecipeCard/RecipeCard";
import type { Recipe } from "@/types/recipe";
import { useAuth } from "@/lib/store/authStore";

interface RecipeListProps {
  recipes: Recipe[];
  showActions?: boolean;
  refreshAfterChange?: boolean;
}

export default function RecipeList({
  recipes,
  showActions = false,
 refreshAfterChange = false,
}: RecipeListProps) {
  const user = useAuth((store) => store.user);

  const [savedRecipes, setSavedRecipes] = useState<SavedRecipe[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }

    async function loadSavedRecipes() {
      const data = await getSavedRecipes();
      setSavedRecipes(data);
    }

    loadSavedRecipes();
  }, [user]);

  if (recipes.length === 0) {
    return <p>Рецептів поки немає.</p>;
  }

  return (
    <ul>
      {recipes.map((recipe) => {
        const isSaved = savedRecipes.some((savedRecipe) => {
          if (typeof savedRecipe.recipeId === "string") {
            return savedRecipe.recipeId === recipe._id;
          }

          return savedRecipe.recipeId._id === recipe._id;
        });

        return (
          <li key={recipe._id}>
            <RecipeCard
              recipe={recipe}
              showActions={showActions}
              initialSaved={isSaved}
              refreshAfterChange={refreshAfterChange}
            />
          </li>
        );
      })}
    </ul>
  );
}
