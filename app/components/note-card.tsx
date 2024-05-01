import { Note } from "~/schema";
import { CirclePlus, Clipboard, Eye } from "lucide-react";
import { Link } from "@remix-run/react";
import toast from "react-hot-toast";

interface NoteCardSkeletonProps {
  children: React.ReactNode;
}

function NoteCardSkeleton({ children }: NoteCardSkeletonProps) {
  return (
    <div className="flex h-64 w-64 flex-col rounded-lg border border-emerald-900 bg-gradient-to-bl from-zinc-900 to-emerald-900/70 p-5 hover:cursor-pointer">
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
      <h2 className="line-clamp-1 text-xl font-semibold text-emerald-400">
        {title}
      </h2>
      <p
        className="line-clamp-6 grow text-emerald-50"
        dangerouslySetInnerHTML={{ __html: body }}
      />
      <div className="flex items-center gap-3 self-end">
        <Clipboard
          size={16}
          onClick={() => {
            navigator.clipboard.writeText(
              window.location.origin + "/note/" + id,
            );

            toast.success("Link copied to clipboard");
          }}
        />
        <div className="flex items-center gap-2 text-sm">
          <Eye size={16} /> {views}
        </div>
      </div>
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
        <CirclePlus className="text-emerald-500" width={44} height={44} />
      </Link>
      <p className="mt-2 text-center text-sm text-emerald-50">{text}</p>
    </NoteCardSkeleton>
  );
}
