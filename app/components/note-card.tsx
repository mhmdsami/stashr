import { Note } from "~/schema";
import { CirclePlus, Clipboard, Eye } from "lucide-react";
import { Link } from "@remix-run/react";
import toast from "react-hot-toast";

interface NoteCardSkeletonProps {
  children: React.ReactNode;
}

function NoteCardSkeleton({ children }: NoteCardSkeletonProps) {
  return (
    <div className="to-mint-900/70 flex h-64 w-64 flex-col rounded-lg border border-gray-700 bg-gradient-to-br from-zinc-900 p-5 hover:cursor-pointer">
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
      <h2 className="text-mint-400 line-clamp-1 text-ellipsis text-xl font-semibold">
        {title}
      </h2>
      <p
        className="text-mint-50 my-2 line-clamp-6 grow text-ellipsis"
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
        <CirclePlus className="text-mint-500" width={44} height={44} />
      </Link>
      <p className="text-mint-50 mt-2 text-center text-sm">{text}</p>
    </NoteCardSkeleton>
  );
}
