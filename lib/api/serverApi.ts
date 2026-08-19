import { cookies } from "next/headers";
import type { Note } from "../../types/note";
import { nextServerInstance } from "./api";
import { User } from "@/types/user";

interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}


export const fetchNotes = async (
  userQuery: string,
  page: number,
  tag?: string,
) => {
  const cookiesData = await cookies();
  const response = await nextServerInstance.get<FetchNotesResponse>("/notes", {
    params: {
      search: userQuery,
      page,
      perPage: 12,
      tag,
    },
    headers: { Cookie: cookiesData.toString() },
  });
  return response.data;
};
export const fetchNoteById = async (id: string) => {
  const cookiesData = await cookies();
  const response = await nextServerInstance.get<Note>(`/notes/${id}`, {
    headers: { Cookie: cookiesData.toString() },
  });
  return response.data;
};

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
