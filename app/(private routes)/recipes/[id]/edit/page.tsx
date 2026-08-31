import { fetchRecipeById } from "@/lib/api/serverApi";
import { notFound } from "next/navigation";
import RecipeForm from "@/components/RecipeForm/RecipeForm";
import css from "./EditRecipePage.module.css";
interface EditRecipePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function EditRecipePage({ params }: EditRecipePageProps) {
  const { id } = await params;

  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return (
    <section className={css.page}>
      <div className="container">
        <h1 className={css.title}>Редагувати рецепт</h1>
        <RecipeForm recipe={recipe} />
      </div>
    </section>
  );
}
