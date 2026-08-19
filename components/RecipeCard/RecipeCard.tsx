import Image from "next/image";
import type { Recipe } from "@/types/recipe";
import Link from "next/link";

interface RecipeCardProps {
  recipe: Recipe;
}


export default function RecipeCard({
  recipe,
}: RecipeCardProps) {
  return (
    <article>
      <Image
        src={recipe.image}
        alt={recipe.title}
        width={400}
        height={300}
      />

      <p>{recipe.category}</p>

      <h2>{recipe.title}</h2>

          <p>{recipe.shortDescription}</p>
          <Link href={`/recipes/${recipe._id}`}>
        Переглянути рецепт
      </Link>
    </article>
  );
}