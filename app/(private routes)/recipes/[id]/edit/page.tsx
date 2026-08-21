import { fetchRecipeById } from "@/lib/api/serverApi";
import { notFound } from "next/navigation";
import RecipeForm from "@/components/RecipeForm/RecipeForm";

interface EditRecipePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditRecipePage({
  params,
}: EditRecipePageProps) {
  const { id } = await params;

  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return (
    <main>
      <h1>Редагувати рецепт</h1>
      <RecipeForm recipe={recipe} />
    </main>
  );
}