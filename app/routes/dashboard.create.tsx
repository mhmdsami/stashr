import Button from "~/components/button";
import { EditorProvider, useCurrentEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import {
  Bold,
  Code,
  CornerDownLeft,
  Italic,
  Redo2,
  Strikethrough,
  Undo2,
} from "lucide-react";
import { useNavigate, useSubmit } from "@remix-run/react";
import { ActionFunction, TypedResponse, json } from "@remix-run/node";
import Input from "~/components/input";
import { useState } from "react";
import { validateCreateNote } from "~/utils/validation.server";
import { requireUserId } from "~/utils/session.server";
import { createNote } from "~/utils/api.server";
import { ActionData } from "~/types";
import useActionDataWithToast from "~/hooks/use-action-data-with-toast";

export const action: ActionFunction = async ({
  request,
}): Promise<TypedResponse<ActionData>> => {
  const userId = await requireUserId(request);
  const formData = await request.formData();
  const body = Object.fromEntries(formData);

  const parseRes = validateCreateNote(body);
  if (!parseRes.success) {
    return json({ fieldErrors: parseRes.errors }, { status: 400 });
  }

  try {
    await createNote(userId, parseRes.data.title, parseRes.data.body);
    return json({ message: "Note created successfully" });
  } catch (error) {
    return json({ error: "Something went wrong" }, { status: 500 });
  }
};

const MenuBar = () => {
  const submit = useSubmit();
  const { editor } = useCurrentEditor();
  const [title, setTitle] = useState("");

  if (!editor) {
    return null;
  }

  const handleSubmit = async () =>
    submit(
      {
        title,
        body: editor.getHTML(),
      },
      { method: "post" },
    );

  return (
    <div className="flex flex-col gap-4 px-10">
      <Input
        label="Title"
        value={title}
        placeholder="Enter title..."
        onChange={(e) => setTitle(e.target.value)}
      />
      <div className="flex justify-between">
        <div className="mb-5 flex flex-wrap gap-2">
          <Button
            onClick={() => editor.chain().focus().toggleBold().run()}
            disabled={!editor.can().chain().focus().toggleBold().run()}
            className={editor.isActive("bold") ? "is-active" : ""}
          >
            <Bold />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleItalic().run()}
            disabled={!editor.can().chain().focus().toggleItalic().run()}
            className={editor.isActive("italic") ? "is-active" : ""}
          >
            <Italic />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleStrike().run()}
            disabled={!editor.can().chain().focus().toggleStrike().run()}
            className={editor.isActive("strike") ? "is-active" : ""}
          >
            <Strikethrough />
          </Button>
          <Button
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
            className={editor.isActive("codeBlock") ? "is-active" : ""}
          >
            <Code />
          </Button>
          <Button onClick={() => editor.chain().focus().setHardBreak().run()}>
            <CornerDownLeft />
          </Button>
          <Button
            onClick={() => editor.chain().focus().undo().run()}
            disabled={!editor.can().chain().focus().undo().run()}
          >
            <Undo2 />
          </Button>
          <Button
            onClick={() => editor.chain().focus().redo().run()}
            disabled={!editor.can().chain().focus().redo().run()}
          >
            <Redo2 />
          </Button>
        </div>
        <Button disabled={!title || !editor.getText()} onClick={handleSubmit}>
          Save
        </Button>
      </div>
    </div>
  );
};

const extensions = [StarterKit];

export default function CreateNote() {
  const navigate = useNavigate();
  const actionData = useActionDataWithToast({
    onMessage: () => setTimeout(() => navigate("/dashboard"), 2000),
  });

  return (
    <EditorProvider
      slotBefore={<MenuBar />}
      extensions={extensions}
      content=""
      editorProps={{
        attributes: {
          class:
            "text-xl h-[50vh] mx-10 focus:border-emerald-600 focus:ring-emerald-600 flex rounded-lg border border-gray-700 bg-zinc-900 px-3 py-2 text-sm transition-colors duration-200 ease-in-out focus:outline-none focus:ring-1",
        },
      }}
    >
      <p className="text-sm text-red-500">{actionData?.fieldErrors?.body}</p>
    </EditorProvider>
  );
}
