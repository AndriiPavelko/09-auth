import { cookies } from "next/headers";
import type { Note } from "@/types/note";
import type { User } from "@/types/user";
import { nextServer } from "./api";

export interface FetchNotesParams {
  page: number;
  search?: string;
  tag?: string;
}

export interface FetchNotesResponse {
  notes: Note[];
  totalPages: number;
}

async function cookieHeader() {
  const cookieStore = await cookies();
  return cookieStore.toString();
}

export async function fetchNotes({
  page,
  search,
  tag,
}: FetchNotesParams): Promise<FetchNotesResponse> {
  const params: FetchNotesParams = { page };

  if (search) {
    params.search = search;
  }

  if (tag && tag !== "all") {
    params.tag = tag;
  }

  const response = await nextServer.get<FetchNotesResponse>("/notes", {
    params,
    headers: {
      Cookie: await cookieHeader(),
    },
  });
  return response.data;
}

export async function fetchNoteById(noteId: Note["id"]): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`, {
    headers: {
      Cookie: await cookieHeader(),
    },
  });
  return data;
}

export async function getMe(): Promise<User> {
  const { data } = await nextServer.get<User>("/users/me", {
    headers: {
      Cookie: await cookieHeader(),
    },
  });
  return data;
}

export async function checkSession() {
  const response = await nextServer.get("/auth/session", {
    headers: {
      Cookie: await cookieHeader(),
    },
  });
  return response;
}
