import { User } from "@/types/user";
import type { Note } from "../../types/note";
import { nextServerInstance } from "./api";
import type { Recipe } from "@/types/recipe";
import { SavedRecipe } from "@/types/savedRecipe";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

export const fetchNotes = async (
  userQuery: string,
  page: number,
  tag?: string,
) => {
  const response = await nextServerInstance.get<FetchNotesResponse>("/notes", {
    params: {
      search: userQuery,
      page,
      perPage: 12,
      tag,
    },
  });
  return response.data;
};
export const fetchNoteById = async (id: string) => {
  const response = await nextServerInstance.get<Note>(`/notes/${id}`);
  return response.data;
};

interface CreateNoteRequest {
  title: string;
  content: string;
  tag: string;
}

export const createNote = async (newNote: CreateNoteRequest): Promise<Note> => {
  const response = await nextServerInstance.post<Note>("/notes", newNote);
  return response.data;
};

export const deleteNote = async (id: string): Promise<Note> => {
  const response = await nextServerInstance.delete<Note>(`/notes/${id}`);
  return response.data;
};

export interface LoginRequest {
  email: string;
  password: string;
}
export const login = async (loginData: LoginRequest) => {
  const { data } = await nextServerInstance.post<User>(
    `/auth/login`,
    loginData,
  );
  return data;
};
export const logout = async () => {
  const { data } = await nextServerInstance.post<ServerSession>(`/auth/logout`);
  return data;
};

export interface RegisterRequest {
  email: string;
  password: string;
}
export const register = async (registerData: RegisterRequest) => {
  const { data } = await nextServerInstance.post<User>(
    `/auth/register`,
    registerData,
  );
  return data;
};

export interface ServerSession {
  success: boolean;
}
export const checkSession = async () => {
  const { data } = await nextServerInstance.get<ServerSession>(`/auth/session`);
  return data.success;
};

export const getMe = async () => {
  const { data } = await nextServerInstance.get<User>(`/users/me`);
  return data;
};

export interface EditRequest {
  username: string;
}
export const updateMe = async (editRequest: EditRequest) => {
  const { data } = await nextServerInstance.patch<User>(
    `/users/me`,
    editRequest,
  );
  return data;
};
export const updateAvatar = async (
  formData: FormData,
): Promise<{ url: string }> => {
  const { data } = await nextServerInstance.patch<{ url: string }>(
    "/users/me/avatar",
    formData,
  );

  return data;
};

export const createRecipe = async (formData: FormData): Promise<Recipe> => {
  const { data } = await nextServerInstance.post<Recipe>("/recipes", formData);

  return data;
};

export const deleteRecipe = async (id: string): Promise<Recipe> => {
  const res = await nextServerInstance.delete<Recipe>(
    `/recipes/${id}`,
  );
  return res.data;
};

export const updateRecipe = async ( id: string , formData: FormData): Promise<Recipe> => {
  const res = await nextServerInstance.patch<Recipe>(
    `/recipes/${id}`, formData
  );
  return res.data;
};

export const saveRecipeToFavorites = async (
  id: string,
): Promise<SavedRecipe> => {
 const { data } = await nextServerInstance.post<SavedRecipe>(`/saved-recipes/${id}`);

  return data;
};

export const removeSavedRecipe = async (
  id: string,
): Promise<SavedRecipe> => {
  const { data } = await nextServerInstance.delete<SavedRecipe>(`/saved-recipes/${id}`);

  return data;
};

export const getSavedRecipes = async (): Promise<SavedRecipe[]> => {
  const { data } = await nextServerInstance.get<SavedRecipe[]>("/saved-recipes");

  return data;
};