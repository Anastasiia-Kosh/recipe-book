import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchRecipeById } from "@/lib/api/serverApi";
import css from "./RecipePage.module.css"
import RecipeActions from "@/components/RecipeActions/RecipeActions";
import BackButton from "@/components/BackButton/BackButton";

interface RecipePageProps {
  params: Promise<{
    id: string;
  }>;
}

export default async function RecipePage({
  params,
}: RecipePageProps) {
  const { id } = await params;

  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    notFound();
  }

  return (
<section className={css.page}>
  <div className="container">
    <div className={css.hero}>
      <div className={css.imageWrapper}>
        <Image
          src={recipe.image}
          alt={recipe.title}
          fill
          className={css.image}
          sizes="(min-width: 1440px) 600px, (min-width: 768px) 50vw, calc(100vw - 40px)"
        />
      </div>

      <div className={css.intro}>
        <p className={css.category}>{recipe.category}</p>

        <h1 className={css.title}>{recipe.title}</h1>

        <p className={css.description}>
          {recipe.shortDescription}
        </p>

        <RecipeActions
  recipeId={recipe._id}
  recipeUserId={recipe.userId}
/>
      </div>
    </div>

   <div className={css.recipeDetails}>
  <section className={css.recipeColumn}>
    <h2 className={css.sectionTitle}>Інгредієнти</h2>

    <div className={css.recipeText}>
      {recipe.ingredients}
    </div>
  </section>

  <section className={css.recipeColumn}>
    <h2 className={css.sectionTitle}>Приготування</h2>

    <div className={css.recipeText}>
      {recipe.instructions}
    </div>
  </section>
        </div>
        <BackButton />
  </div>
</section>
  );
}