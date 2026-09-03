import type { MetadataRoute } from "next";
import { fetchRecipes } from "@/lib/api/serverApi";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000";

  const firstPage = await fetchRecipes({
    page: 1,
    perPage: 50,
  });

  let recipes = firstPage.recipes;

  if (firstPage.totalPages > 1) {
    const remainingPages = await Promise.all(
      Array.from(
        { length: firstPage.totalPages - 1 },
        (_, index) =>
          fetchRecipes({
            page: index + 2,
            perPage: 50,
          }),
      ),
    );

    recipes = [
      ...recipes,
      ...remainingPages.flatMap((page) => page.recipes),
    ];
  }

  const recipeUrls: MetadataRoute.Sitemap = recipes.map((recipe) => ({
    url: `${siteUrl}/recipes/${recipe._id}`,
    lastModified: new Date(recipe.updatedAt),
  }));

  return [
    {
      url: siteUrl,
    },
    {
      url: `${siteUrl}/recipes`,
    },
    ...recipeUrls,
  ];
}