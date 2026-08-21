"use client";

import Link from "next/link";
import { useAuth } from "@/lib/store/authStore";

interface EditRecipeLinkProps {
  recipeId: string;
  recipeUserId: string;
}

export default function EditRecipeLink({
  recipeId,
  recipeUserId,
}: EditRecipeLinkProps) {
  const user = useAuth((store) => store.user);

  if (!user || user._id !== recipeUserId) {
    return null;
  }

  return (
    <Link href={`/recipes/${recipeId}/edit`}>
      Редагувати
    </Link>
  );
}