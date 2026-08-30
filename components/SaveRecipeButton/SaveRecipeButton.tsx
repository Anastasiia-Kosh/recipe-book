"use client";

import { useState } from "react";
import {
  saveRecipeToFavorites,
  removeSavedRecipe,
} from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/store/authStore";

interface SaveRecipeButtonProps {
  recipeId: string;
  initialSaved: boolean;
  refreshAfterChange?: boolean;
  variant?: "icon" | "text";
}

export default function SaveRecipeButton({
  recipeId,
  initialSaved,
  refreshAfterChange = false,
  variant = "icon",
}: SaveRecipeButtonProps) {
  const router = useRouter();
  const user = useAuth((store) => store.user);

  const [localSaved, setLocalSaved] = useState<boolean | null>(null);

  const isSaved = localSaved ?? initialSaved;

  async function handleClick() {
    if (!user) {
      router.push("/sign-in");
      return;
    }
    if (isSaved) {
      await removeSavedRecipe(recipeId);
      setLocalSaved(false);

      if (refreshAfterChange) {
        router.refresh();
      }

      return;
    }

    await saveRecipeToFavorites(recipeId);
    setLocalSaved(true);
  }
const buttonContent =
  variant === "icon"
    ? isSaved
      ? "🔖"
      : "♡"
    : isSaved
      ? "Обраний"
      : "Додати в обране";
  return (
    <button type="button" onClick={handleClick}>
     {buttonContent}
    </button>
  );
}
