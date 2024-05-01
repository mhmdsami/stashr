import { LoaderFunction, json } from "@remix-run/node";
import { Link, useLoaderData } from "@remix-run/react";
import { Eye } from "lucide-react";
import { Note, User } from "~/schema";
import { getAuthor, getNoteById, increaseNoteViews } from "~/utils/api.server";

type LoaderData = {
  note: Note;
  author: User;
};

export const loader: LoaderFunction = async ({ params }) => {
  const id = params.id;

  if (!id) {
    return json({ error: "Invalid note id" }, { status: 400 });
  }

  increaseNoteViews(id);
  const note = await getNoteById(id);

  if (!note) {
    return json({ error: "Note not found" }, { status: 404 });
  }

  const author = await getAuthor(note.userId);

  return json({ note, author });
};

export default function NoteDisplay() {
  const {
    note: { title, body, views },
    author: { name, createdAt },
  } = useLoaderData<LoaderData>();

  return (
    <>
      <nav className="flex justify-between p-10">
        <Link to="/" className="text-mint-400 text-4xl font-bold">
          stashr
        </Link>
      </nav>
      <main className="flex flex-col px-10">
        <div className="flex items-center gap-2 self-end">
          <div className="flex items-center gap-2">
            <Eye /> {views}
          </div>
        </div>
        <h1 className="text-mint-50 text-4xl font-semibold">{title}</h1>
        <p className="text-mint-50 text-sm italic">
          Written by {name}{" "}
          {createdAt && `on ${new Date(createdAt).toDateString()}`}
        </p>
        <p dangerouslySetInnerHTML={{ __html: body }} className="mt-5 text-lg" />
      </main>
    </>
  );
}
