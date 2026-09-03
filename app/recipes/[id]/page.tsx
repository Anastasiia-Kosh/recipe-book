import Image from "next/image";
import { notFound } from "next/navigation";
import { fetchRecipeById } from "@/lib/api/serverApi";
import css from "./RecipePage.module.css";
import RecipeActions from "@/components/RecipeActions/RecipeActions";
import BackButton from "@/components/BackButton/BackButton";
import type { Metadata } from "next";

interface RecipePageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params,
}: RecipePageProps): Promise<Metadata> {
  const { id } = await params;
  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    return {
      title: "Рецепт не знайдено",
    };
  }

  return {
    title: recipe.title,
    description: recipe.shortDescription,
    alternates: {
      canonical: `/recipes/${id}`,
    },

    openGraph: {
      type: "article",
      url: `/recipes/${id}`,
      title: recipe.title,
      description: recipe.shortDescription,
      images: [
        {
          url: recipe.image,
          alt: recipe.title,
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: recipe.title,
      description: recipe.shortDescription,
      images: [recipe.image],
    },
  };
}
function htmlToText(html: string) {
  return html
    .replace(/<br\s*\/?>/gi, " ")
    .replace(/<[^>]+>/g, "")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/\s+/g, " ")
    .trim();
}

function extractTextBlocks(html: string) {
  return [...html.matchAll(/<(li|p)\b[^>]*>([\s\S]*?)<\/\1>/gi)]
    .map((match) => htmlToText(match[2]))
    .filter(Boolean);
}

export default async function RecipePage({ params }: RecipePageProps) {
  const { id } = await params;

  const recipe = await fetchRecipeById(id);

  if (!recipe) {
    notFound();
  }
  const recipeIngredients = extractTextBlocks(recipe.ingredients);

  const recipeInstructions = extractTextBlocks(recipe.instructions).map(
    (text) => ({
      "@type": "HowToStep",
      text,
    }),
  );
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Recipe",

    name: recipe.title,
    description: recipe.shortDescription,
    image: [recipe.image],

    recipeCategory: recipe.category,

    datePublished: recipe.createdAt,
    dateModified: recipe.updatedAt,

    ...(recipeIngredients.length > 0 && {
      recipeIngredient: recipeIngredients,
    }),

    ...(recipeInstructions.length > 0 && {
      recipeInstructions,
    }),
  };
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
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

              <p className={css.description}>{recipe.shortDescription}</p>

              <RecipeActions
                recipeId={recipe._id}
                recipeUserId={recipe.userId}
              />
            </div>
          </div>

          <div className={css.recipeDetails}>
            <section className={css.recipeColumn}>
              <h2 className={css.sectionTitle}>Інгредієнти</h2>

              <div
                className={css.recipeText}
                dangerouslySetInnerHTML={{ __html: recipe.ingredients }}
              />
            </section>

            <section className={css.recipeColumn}>
              <h2 className={css.sectionTitle}>Приготування</h2>

              <div
                className={css.recipeText}
                dangerouslySetInnerHTML={{ __html: recipe.instructions }}
              />
            </section>
          </div>
          <BackButton />
        </div>
      </section>
    </>
  );
}
