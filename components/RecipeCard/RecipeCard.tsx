import Image from "next/image";
import type { Recipe } from "@/types/recipe";
import Link from "next/link";
import DeleteRecipeButton from "../DeleteRecipeButton/DeleteRecipeButton";
import SaveRecipeButton from "../SaveRecipeButton/SaveRecipeButton";

interface RecipeCardProps {
  recipe: Recipe;
  showActions?: boolean;
  initialSaved?: boolean;
  refreshAfterChange?: boolean;
}

export default function RecipeCard({
  recipe,
  showActions = false,
  initialSaved = false,
     refreshAfterChange = false,
}: RecipeCardProps) {
  return (
    <article>
      <Image src={recipe.image} alt={recipe.title} width={400} height={300} />
<SaveRecipeButton
  recipeId={recipe._id}
        initialSaved={initialSaved}
          refreshAfterChange={refreshAfterChange}
/>
      <p>{recipe.category}</p>

      <h2>{recipe.title}</h2>

      <p>{recipe.shortDescription}</p>
      <Link href={`/recipes/${recipe._id}`}>Переглянути рецепт</Link>
      {showActions && (
  <div>
    <Link href={`/recipes/${recipe._id}/edit`}>
      Редагувати
    </Link>

    <DeleteRecipeButton recipeId={recipe._id} />
  </div>
)}
    </article>
  );
}
