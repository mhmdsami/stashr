import { db } from "~/utils/db.server";
import { eq, sql } from "drizzle-orm";
import { Note, User, users, notes } from "~/schema";

export const getNotes = async (userId: string): Promise<Note[]> => {
  const userNotes = await db
    .select()
    .from(notes)
    .where(eq(notes.userId, userId))
    .orderBy(notes.createdAt);

  return userNotes;
};

export const getNoteById = async (noteId: string): Promise<Note | null> => {
  const [note] = await db.select().from(notes).where(eq(notes.id, noteId));

  return note;
};

export const increaseNoteViews = async (noteId: string): Promise<void> => {
  await db
    .update(notes)
    .set({ views: sql`${notes.views} + 1` })
    .where(eq(notes.id, noteId));
};

export const getAuthor = async (userId: string): Promise<User> => {
  const [user] = await db.select().from(users).where(eq(users.id, userId));

  return user;
};

export const createNote = async (
  userId: string,
  title: string,
  body: string,
): Promise<Note> => {
  const [note] = await db.insert(notes).values({
    userId,
    title,
    body,
  });

  return note;
};

export const deleteNote = async (noteId: string): Promise<void> => {
  await db.delete(notes).where(eq(notes.id, noteId));
};
