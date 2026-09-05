import Image from "next/image";
import type { Recipe } from "@/types/recipe";
import Link from "next/link";
import SaveRecipeButton from "../SaveRecipeButton/SaveRecipeButton";
import css from "./RecipeCard.module.css";
import Icon from "../Icon/Icon";

interface RecipeCardProps {
  recipe: Recipe;
  initialSaved?: boolean;
  refreshAfterChange?: boolean;
}

export default function RecipeCard({
  recipe,
  initialSaved = false,
  refreshAfterChange = false,
}: RecipeCardProps) {
  return (
 <article className={css.card}>
    <Link
      href={`/recipes/${recipe._id}`}
      className={css.cardLink}
      aria-label={`Переглянути рецепт: ${recipe.title}`}
    >
      <div className={css.photoWrapper}>
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          loading="eager"
          className={css.photo}
          sizes="(min-width: 1440px) 420px, (min-width: 768px) calc(50vw - 44px), calc(100vw - 40px)"
        />

        <p className={css.category}>{recipe.category}</p>
      </div>

      <div className={css.content}>
        <h2 className={css.title}>{recipe.title}</h2>

        <p className={css.description}>{recipe.shortDescription}</p>

        <span className={css.detailsLink}>
          Переглянути рецепт
          <Icon name="arrow-right" size={18} />
        </span>
      </div>
    </Link>

    <div className={css.bookmarkWrapper}>
      <SaveRecipeButton
        recipeId={recipe._id}
        initialSaved={initialSaved}
        refreshAfterChange={refreshAfterChange}
      />
    </div>
  </article>
  );
}
