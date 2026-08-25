import Image from "next/image";
import type { Recipe } from "@/types/recipe";
import Link from "next/link";
import DeleteRecipeButton from "../DeleteRecipeButton/DeleteRecipeButton";
import SaveRecipeButton from "../SaveRecipeButton/SaveRecipeButton";
import css from "./RecipeCard.module.css";

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
    <article className={css.card}>
      <div className={css.photoWrapper}>
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className={css.photo}
          sizes="(min-width: 1440px) 420px, (min-width: 768px) calc(50vw - 44px), calc(100vw - 40px)"
        />

        <div className={css.bookmarkWrapper}>
          <SaveRecipeButton
            recipeId={recipe._id}
            initialSaved={initialSaved}
            refreshAfterChange={refreshAfterChange}
          />
        </div>
        <p className={css.category}>{recipe.category}</p>
      </div>

      <div className={css.content}>
        

        <h2 className={css.title}>{recipe.title}</h2>

        <p className={css.description}>{recipe.shortDescription}</p>

        <Link href={`/recipes/${recipe._id}`} className={css.detailsLink}>
          Переглянути рецепт
        </Link>

        {showActions && (
          <div>
            <Link href={`/recipes/${recipe._id}/edit`}>Редагувати</Link>

            <DeleteRecipeButton recipeId={recipe._id} />
          </div>
        )}
      </div>
    </article>
  );
}
