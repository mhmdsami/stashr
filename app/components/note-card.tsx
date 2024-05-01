import { Note } from "~/schema";
import { CirclePlus } from "lucide-react";
import { Link } from "@remix-run/react";

interface NoteCardSkeletonProps {
  children: React.ReactNode;
}

function NoteCardSkeleton({ children }: NoteCardSkeletonProps) {
  return (
    <div className="to-mint-900/70 flex h-60 w-60 flex-col rounded-lg border border-gray-700 bg-gradient-to-br from-zinc-900 p-5 hover:cursor-pointer">
      {children}
    </div>
  );
}

interface NoteCardProps extends Omit<Note, "createdAt" | "updatedAt"> {
  createdAt: string;
  updatedAt: string;
}

export function NoteCard({ id, title, body, views }: NoteCardProps) {
  return (
    <NoteCardSkeleton>
      <h2 className="text-mint-400 text-xl font-semibold line-clamp-1 text-ellipsis">{title}</h2>
      <p className="text-mint-50 mt-2 line-clamp-6 text-ellipsis">{body}</p>
    </NoteCardSkeleton>
  );
}

interface NoteCardCreateProps {
  text: string;
}

export function NoteCardCreate({ text }: NoteCardCreateProps) {
  return (
    <NoteCardSkeleton>
      <Link
        to="/dashboard/create"
        className="flex grow items-center justify-center"
      >
        <CirclePlus className="text-mint-500" width={44} height={44} />
      </Link>
      <p className="text-mint-50 mt-2 text-center text-sm">
        {text}
      </p>
    </NoteCardSkeleton>
  );
}
