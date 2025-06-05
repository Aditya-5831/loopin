"use client";

import { Button } from "@/components/ui/button";
import UserAvatar from "@/components/UserAvatar";
import { useSession } from "@/providers/SessionProvider";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { Loader2 } from "lucide-react";
import { useSubmitPostMutation } from "../mutations";
import "./styles.css";

const PostEditor = () => {
  const { user } = useSession();

  const { mutate, isPending } = useSubmitPostMutation();

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        bold: false,
        italic: false,
      }),
      Placeholder.configure({
        placeholder: "Write something...",
      }),
    ],
  });

  const input =
    editor?.getText({
      blockSeparator: "\n",
    }) || "";

  const onSubmit = async () => {
    mutate(input, {
      onSuccess: () => {
        editor?.commands.clearContent();
      },
    });
    editor?.commands.clearContent();
  };

  return (
    <div className="bg-card flex flex-col gap-5 rounded-2xl p-5 shadow-sm">
      <div className="flex gap-5">
        <UserAvatar avatarUrl={user.avatarUrl} className="hidden sm:inline" />
        <EditorContent
          editor={editor}
          className="max-h-[20rem] w-full overflow-y-auto rounded-2xl bg-gray-100 px-5 py-3 outline-none dark:bg-black"
        />
      </div>
      <div className="flex justify-end">
        <Button
          onClick={onSubmit}
          disabled={!input.trim()}
          className="te min-w-20 font-semibold"
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin text-white" />
          ) : (
            "Post"
          )}
        </Button>
      </div>
    </div>
  );
};

export default PostEditor;
