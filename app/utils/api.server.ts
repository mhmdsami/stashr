import { db } from "~/utils/db.server";
import { sql } from "drizzle-orm";
import { Note } from "~/schema";

export const getNotes = async (userId: string): Promise<Note[]> => {
  return db.execute(sql`
    SELECT * FROM notes WHERE user_id = ${userId}`);
};

export const getNote = async (noteId: string): Promise<Note | null> => {
  const [note]: Note[] = await db.execute(sql`
        SELECT * FROM notes WHERE id = ${noteId}`);

  return note;
};

export const createNote = async (
  userId: string,
  title: string,
  body: string,
): Promise<Note> => {
  const [note]: Note[] = await db.execute(sql`
    INSERT INTO notes (user_id, title, body)
    VALUES (${userId}, ${title}, ${body})
    RETURNING *`);

  return note;
};

export const deleteNote = async (noteId: string): Promise<void> => {
  await db.execute(sql`
        DELETE FROM notes WHERE id = ${noteId}`);
};
