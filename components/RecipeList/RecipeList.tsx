import RecipeCard from "@/components/RecipeCard/RecipeCard";
import type { Recipe } from "@/types/recipe";

interface RecipeListProps {
  recipes: Recipe[];
}

export default function RecipeList({ recipes }: RecipeListProps) {
  if (recipes.length === 0) {
    return <p>Рецептів поки немає.</p>;
  }

  return (
    <ul>
      {recipes.map((recipe) => (
        <li key={recipe._id}>
          <RecipeCard recipe={recipe} />
        </li>
      ))}
    </ul>
  );
}