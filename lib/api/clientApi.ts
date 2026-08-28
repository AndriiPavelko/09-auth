import type { Note, NoteTag } from "@/types/note";
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

export interface AuthRequest {
  email: string;
  password: string;
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
  });
  return response.data;
}

export async function fetchNoteById(noteId: Note["id"]): Promise<Note> {
  const { data } = await nextServer.get<Note>(`/notes/${noteId}`);
  return data;
}

interface CreateNotePayload {
  title: string;
  content: string;
  tag: NoteTag;
}

export async function createNote(params: CreateNotePayload): Promise<Note> {
  const { data } = await nextServer.post<Note>("/notes", params);
  return data;
}

export async function deleteNote(noteId: Note["id"]): Promise<Note> {
  const { data } = await nextServer.delete<Note>(`/notes/${noteId}`);
  return data;
}

export async function register(payload: AuthRequest): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/register", payload);
  return data;
}

export async function login(payload: AuthRequest): Promise<User> {
  const { data } = await nextServer.post<User>("/auth/login", payload);
  return data;
}

export async function logout(): Promise<void> {
  await nextServer.post("/auth/logout");
}

export async function checkSession(): Promise<boolean> {
  const { data } = await nextServer.get<{ success: boolean }>("/auth/session");
  return data.success;
}

export async function getMe(): Promise<User> {
  const { data } = await nextServer.get<User>("/users/me");
  return data;
}

export async function updateMe(payload: { username: string }): Promise<User> {
  const { data } = await nextServer.patch<User>("/users/me", payload);
  return data;
}
