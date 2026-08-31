"use client";

import { useState } from "react";
import { EditorContent, useEditor, useEditorState } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import css from "./RichTextEditor.module.css";

interface RichTextEditorProps {
  name: string;
  initialContent?: string;
}

export default function RichTextEditor({
  name,
  initialContent = "",
}: RichTextEditorProps) {
  const [content, setContent] = useState(initialContent);

  const editor = useEditor({
    extensions: [StarterKit],

    content: initialContent,

    immediatelyRender: false,

    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });
  const editorState = useEditorState({
    editor,
    selector: ({ editor }) => ({
      isBold: editor?.isActive("bold") ?? false,
      isItalic: editor?.isActive("italic") ?? false,
      isBulletList: editor?.isActive("bulletList") ?? false,
      isOrderedList: editor?.isActive("orderedList") ?? false,
    }),
  });

  return (
    <div className={css.wrapper}>
      <div className={css.toolbar}>
        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          B
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          I
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleBulletList().run()}
        >
          • List
        </button>

        <button
          type="button"
          onClick={() => editor?.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
      </div>

      <EditorContent editor={editor} className={css.editor} />

      <input type="hidden" name={name} value={content} />
    </div>
  );
}
