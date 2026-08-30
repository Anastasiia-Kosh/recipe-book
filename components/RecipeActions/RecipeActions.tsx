"use client";

import { useAuth } from "@/lib/store/authStore";
import SaveRecipeButton from "@/components/SaveRecipeButton/SaveRecipeButton";
import EditRecipeLink from "@/components/EditRecipeLink/EditRecipeLink";
import DeleteRecipeButton from "@/components/DeleteRecipeButton/DeleteRecipeButton";
import { useEffect, useState } from "react";
import { getSavedRecipes } from "@/lib/api/clientApi";
import css from "./RecipeActions.module.css";

interface RecipeActionsProps {
  recipeId: string;
  recipeUserId: string;
}

export default function RecipeActions({
  recipeId,
  recipeUserId,
}: RecipeActionsProps) {
  const [isSaved, setIsSaved] = useState(false);
  const user = useAuth((store) => store.user);

  const isOwner = user?._id === recipeUserId;
  useEffect(() => {
    if (!user) {
      return;
    }

    async function loadSavedState() {
      const savedRecipes = await getSavedRecipes();

      const saved = savedRecipes.some((savedRecipe) => {
        if (typeof savedRecipe.recipeId === "string") {
          return savedRecipe.recipeId === recipeId;
        }

        return savedRecipe.recipeId._id === recipeId;
      });

      setIsSaved(saved);
    }

    loadSavedState();
  }, [user, recipeId]);

  return (
    <div className={css.actions}>
      <div className={css.saveAction}>
        <SaveRecipeButton
          recipeId={recipeId}
          initialSaved={user ? isSaved : false}
          variant="text"
        />
      </div>

      {isOwner && (
        <>
          <div className={css.editAction}>
            <EditRecipeLink recipeId={recipeId} recipeUserId={recipeUserId} />
          </div>

          <div className={css.deleteAction}>
            <DeleteRecipeButton recipeId={recipeId} />
          </div>
        </>
      )}
    </div>
  );
}
