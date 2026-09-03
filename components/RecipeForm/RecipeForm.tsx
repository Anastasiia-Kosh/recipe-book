"use client";

import { Recipe, recipeCategories } from "@/types/recipe";
import { createRecipe, updateRecipe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";
import RichTextEditor from "@/components/RichTextEditor/RichTextEditor";
import css from "./RecipeForm.module.css";
import Image from "next/image";
import { useState } from "react";
import toast from "react-hot-toast";
import SubmitButton from "../SubmitButton/SubmitButton";
import Icon from "../Icon/Icon";

interface RecipeFormProps {
  recipe?: Recipe;
}
export default function RecipeForm({ recipe }: RecipeFormProps) {
  const router = useRouter();
  const [imagePreview, setImagePreview] = useState(recipe?.image ?? "");
  function handleImageChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onload = () => {
      if (typeof reader.result === "string") {
        setImagePreview(reader.result);
      }
    };

    reader.readAsDataURL(file);
  }
  async function handleSubmit(formData: FormData) {
    try {
      if (recipe) {
        const updatedRecipe = await updateRecipe(recipe._id, formData);
        toast.success("Рецепт оновлено");
        router.push(`/recipes/${updatedRecipe._id}`);
        return;
      }

      const createdRecipe = await createRecipe(formData);
      toast.success("Рецепт створено");
      router.push(`/recipes/${createdRecipe._id}`);
    } catch (error) {
      console.error("Failed to save recipe:", error);
      toast.error(
        recipe ? "Не вдалося оновити рецепт" : "Не вдалося створити рецепт",
      );
    }
  }

  return (
    <form action={handleSubmit} className={css.form}>
      <div className={css.topFields}>
        <div className={css.photoField}>
          <p className={css.label}>Фото</p>

          <label htmlFor="image" className={css.photoPicker}>
            {imagePreview ? (
              <>
                <Image
                  src={imagePreview}
                  alt="Попередній перегляд фото рецепта"
                  fill
                  className={css.previewImage}
                />

                <div className={css.photoOverlay}>
                  <Icon name="pencil" size={20} />
                  <span>Змінити фото</span>
                </div>
              </>
            ) : (
              <div className={css.photoPlaceholder}>
                <Icon name="camera" size={20} />
                <span className={css.placeholderTitle}>Додати фото</span>
                <span className={css.placeholderText}>
                  Натисніть, щоб вибрати файл
                </span>
              </div>
            )}
          </label>

          <input
            id="image"
            name="image"
            type="file"
            accept="image/*"
            required={!recipe}
            onChange={handleImageChange}
            className={css.hiddenFileInput}
          />
        </div>

        <div className={css.mainFields}>
          <div className={css.field}>
            <label htmlFor="category" className={css.label}>
              Категорія
            </label>

            <select
              id="category"
              name="category"
              defaultValue={recipe?.category ?? ""}
              required
              className={css.select}
            >
              <option value="" disabled>
                Оберіть категорію
              </option>

              {recipeCategories.map((category) => (
                <option key={category} value={category}>
                  {category}
                </option>
              ))}
            </select>
          </div>

          <div className={css.field}>
            <label htmlFor="title" className={css.label}>
              Заголовок
            </label>

            <input
              id="title"
              name="title"
              type="text"
              defaultValue={recipe?.title ?? ""}
              required
              className={css.input}
            />
          </div>

          <div className={css.field}>
            <label htmlFor="shortDescription" className={css.label}>
              Короткий опис
            </label>

            <textarea
              id="shortDescription"
              name="shortDescription"
              defaultValue={recipe?.shortDescription ?? ""}
              required
              className={css.textarea}
            />
          </div>
        </div>
      </div>
      <div className={css.field}>
        <p className={css.label}>Інгредієнти</p>

        <RichTextEditor
          name="ingredients"
          initialContent={recipe?.ingredients ?? ""}
        />
      </div>

      <div className={css.field}>
        <p className={css.label}>Приготування</p>

        <RichTextEditor
          name="instructions"
          initialContent={recipe?.instructions ?? ""}
        />
      </div>

      <div className={css.submitWrapper}>
        {
          <SubmitButton pendingText={recipe ? "Зберігаємо..." : "Створюємо..."}>
            {recipe ? "Зберегти зміни" : "Створити рецепт"}
          </SubmitButton>
        }
      </div>
    </form>
  );
}
