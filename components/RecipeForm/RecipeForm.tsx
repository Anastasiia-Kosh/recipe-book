"use client";

import { Recipe, recipeCategories } from "@/types/recipe";
import { createRecipe, updateRecipe } from "@/lib/api/clientApi";
import { useRouter } from "next/navigation";

interface RecipeFormProps {
  recipe?: Recipe;
}
export default function RecipeForm({ recipe }: RecipeFormProps) {
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    try {
      if (recipe) {
        const updatedRecipe = await updateRecipe(recipe._id, formData);

        router.push(`/recipes/${updatedRecipe._id}`);
        return;
      }

      const createdRecipe = await createRecipe(formData);

      router.push(`/recipes/${createdRecipe._id}`);
    } catch (error) {
      console.error("Failed to save recipe:", error);
    }
  }

  return (
    <form action={handleSubmit}>
      <div>
        <label htmlFor="category">Категорія</label>

        <select
          id="category"
          name="category"
          defaultValue={recipe?.category ?? ""}
          required
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

      <div>
        <label htmlFor="image">Фото</label>

        <input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          required={!recipe}
        />
      </div>

      <div>
        <label htmlFor="title">Заголовок</label>

        <input
          id="title"
          name="title"
          type="text"
          defaultValue={recipe?.title ?? ""}
          required
        />
      </div>

      <div>
        <label htmlFor="shortDescription">Короткий опис</label>

        <textarea
          id="shortDescription"
          name="shortDescription"
          defaultValue={recipe?.shortDescription ?? ""}
          required
        />
      </div>

      <div>
        <label>
          Інгредієнти
          <textarea
            name="ingredients"
            defaultValue={recipe?.ingredients ?? ""}
            required
          />
        </label>
      </div>

      <div>
        <label>
          Приготування
          <textarea
            name="instructions"
            defaultValue={recipe?.instructions ?? ""}
            required
          />
        </label>
      </div>

      <button type="submit">
        {recipe ? "Зберегти зміни" : "Створити рецепт"}
      </button>
    </form>
  );
}
