import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchRecipeById } from "@/lib/api/serverApi";
import EditRecipeLink from "@/components/EditRecipeLink/EditRecipeLink";

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
    <main className="container">
      <p>{recipe.category}</p>

      <h1>{recipe.title}</h1>

      <Image
        src={recipe.image}
        alt={recipe.title}
        width={800}
        height={600}
      />

      <p>{recipe.shortDescription}</p>
<section>
  <h2>Інгредієнти</h2>
      <div style={{ whiteSpace: "pre-wrap" }}>
        {recipe.ingredients}
        </div>
      </section>
      <section>
  <h2>Приготування</h2>
      <div style={{ whiteSpace: "pre-wrap" }}>
        {recipe.instructions}
        </div>
        </section>
      <EditRecipeLink
  recipeId={recipe._id}
  recipeUserId={recipe.userId}
/>
    </main>
  );
}