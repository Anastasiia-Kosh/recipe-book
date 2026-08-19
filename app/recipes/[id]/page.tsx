import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchRecipeById } from "@/lib/api/serverApi";

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

      <div style={{ whiteSpace: "pre-wrap" }}>
        {recipe.text}
      </div>
    </main>
  );
}