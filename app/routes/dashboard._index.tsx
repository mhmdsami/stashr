import {
  json,
  LoaderFunction,
  MetaFunction,
  TypedResponse,
} from "@remix-run/node";
import { requireUserId } from "~/utils/session.server";
import { getNotes } from "~/utils/api.server";
import { Note } from "~/schema";
import { useLoaderData } from "@remix-run/react";
import { NoteCard, NoteCardCreate } from "~/components/note-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Stashr" },
    { name: "description", content: "Store and share your thoughts" },
  ];
};

type LoaderData = {
  notes: Note[];
};

export const loader: LoaderFunction = async ({
  request,
}): Promise<TypedResponse<LoaderData>> => {
  const userId = await requireUserId(request);

  const notes = await getNotes(userId);
  return json({ notes });
};

export default function Dashboard() {
  const { notes } = useLoaderData<LoaderData>();

  return (
    <main className="flex flex-col gap-5 px-10">
      <div>
        <h1 className="text-2xl font-semibold text-emerald-50">Your Notes</h1>
        <div className="mt-5 grid grid-flow-col place-content-start gap-5">
          {notes.length === 0 ? (
            <NoteCardCreate text="create your first note" />
          ) : (
            <>
              {notes.map((note) => (
                <NoteCard key={note.id} {...note} />
              ))}
              <NoteCardCreate text="create a new note" />
            </>
          )}
        </div>
      </div>
    </main>
  );
}
