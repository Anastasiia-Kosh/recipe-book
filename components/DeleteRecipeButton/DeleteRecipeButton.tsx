"use client";

import { deleteRecipe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import { useState } from "react";
import css from "./DeleteRecipeButton.module.css";
import Loader from "@/components/Loader/Loader";
import toast from "react-hot-toast";

interface DeleteRecipeButtonProps {
  recipeId: string;
}

export default function DeleteRecipeButton({
  recipeId,
}: DeleteRecipeButtonProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();

  async function handleDelete() {
    try {
      setIsDeleting(true);

      await deleteRecipe(recipeId);
toast.success("Рецепт видалено");
      router.push("/recipes");
    } catch (error) {
    console.error(error);
    toast.error("Не вдалося видалити рецепт");
  } finally {
    setIsDeleting(false);
  }
  }

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        Видалити
      </button>
      {isOpen && (
        <div className={css.overlay} onClick={() => setIsOpen(false)}>
          <div
            className={css.modal}
            onClick={(event) => event.stopPropagation()}
          >
            <h2 className={css.title}>Видалити рецепт?</h2>

            <p className={css.text}>
              Ви впевнені, що хочете видалити цей рецепт? Цю дію неможливо
              скасувати.
            </p>

            <div className={css.actions}>
              <button
                type="button"
                className={css.cancelButton}
                onClick={() => setIsOpen(false)}
                disabled={isDeleting}
              >
                Ні
              </button>

              <button
                type="button"
                className={css.deleteButton}
                onClick={handleDelete}
                disabled={isDeleting}
              >
                {isDeleting ? (
                  <>
                    <Loader size="small" />
                    Видаляємо...
                  </>
                ) : (
                  "Так, видалити"
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
