"use client";

import { deleteRecipe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

interface DeleteRecipeButtonProps {
  recipeId: string;
}

export default function DeleteRecipeButton({
  recipeId,
}: DeleteRecipeButtonProps) {
  const router = useRouter();

  async function handleDelete() {
    await deleteRecipe(recipeId);

    router.push("/recipes");
  }

  return (
    <button type="button" onClick={handleDelete}>
      Видалити
    </button>
  );
}
