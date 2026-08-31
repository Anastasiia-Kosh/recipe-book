import RecipeForm from "@/components/RecipeForm/RecipeForm";
import css from "./CreateRecipePage.module.css";
export default function CreateRecipePage() {
  return (
    <section className={css.page}>
      <div className="container">
        <h1 className={css.title}>Додати рецепт</h1>

        <RecipeForm />
      </div>
    </section>
  );
}
