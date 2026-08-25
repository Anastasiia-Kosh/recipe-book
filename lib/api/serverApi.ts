import { cookies } from "next/headers";
import { nextServerInstance } from "./api";
import { User } from "@/types/user";
import { Recipe } from "@/types/recipe";
import { SavedRecipe } from "@/types/savedRecipe";

export interface ServerSession {
  success: boolean;
}
export const checkSession = async () => {
  const cookiesData = await cookies();
  const res = await nextServerInstance.get<ServerSession>(`/auth/session`, {
    headers: { Cookie: cookiesData.toString() },
  });
  return res;
};

export const getMe = async () => {
  const cookiesData = await cookies();
  const { data } = await nextServerInstance.get<User>(`/users/me`, {
    headers: { Cookie: cookiesData.toString() },
  });
  return data;
};

export interface FetchRecipesResponse {
  recipes: Recipe[];
  page: number;
  perPage: number;
  totalRecipes: number;
  totalPages: number;
}

export const fetchRecipes = async (
  category?: string,
): Promise<FetchRecipesResponse> => {
  const params = new URLSearchParams();
  if (category) {
    params.set("category", category);
  }
  const queryString = params.toString();

  const response = await fetch(
    queryString
      ? `${process.env.BACKEND_URL}/recipes?${queryString}`
      : `${process.env.BACKEND_URL}/recipes`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch recipes");
  }

  return response.json();
};

export const fetchRecipeById = async (id: string): Promise<Recipe | null> => {
  const response = await fetch(`${process.env.BACKEND_URL}/recipes/${id}`, {
    cache: "no-store",
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error("Failed to fetch recipe");
  }

  return response.json();
};

export const fetchMyRecipes = async (): Promise<FetchRecipesResponse> => {
  const cookiesData = await cookies();
  const { data } = await nextServerInstance.get<FetchRecipesResponse>(
    `/users/me/recipes`,
    {
      headers: { Cookie: cookiesData.toString() },
    },
  );

  return data;
};
export const fetchSavedRecipes = async (): Promise<SavedRecipe[]> => {
  const cookieStore = await cookies();

  const { data } = await nextServerInstance.get<SavedRecipe[]>(
    "/saved-recipes",
    {
      headers: {
        Cookie: cookieStore.toString(),
      },
    },
  );

  return data;
};

export interface CategoryCount {
  category: string;
  count: number;
}

export const fetchCategoryCounts = async (): Promise<CategoryCount[]> => {
  const response = await fetch(
    `${process.env.BACKEND_URL}/recipes/categories/counts`,
    {
      cache: "no-store",
    },
  );

  if (!response.ok) {
    throw new Error("Failed to fetch category counts");
  }

  return response.json();
};
