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
      isUnderline: editor?.isActive("underline") ?? false,
      isStrike: editor?.isActive("strike") ?? false,
      isHeading3: editor?.isActive("heading", { level: 3 }) ?? false,
      isBulletList: editor?.isActive("bulletList") ?? false,
      isOrderedList: editor?.isActive("orderedList") ?? false,

      canUndo: editor?.can().chain().focus().undo().run() ?? false,
      canRedo: editor?.can().chain().focus().redo().run() ?? false,
    }),
  });

  return (
    <div className={css.wrapper}>
      <div className={css.toolbar}>
        <button
          type="button"
          title="Жирний"
          className={editorState?.isBold ? css.active : ""}
          onClick={() => editor?.chain().focus().toggleBold().run()}
        >
          B
        </button>

        <button
          type="button"
          title="Курсив"
          className={editorState?.isItalic ? css.active : ""}
          onClick={() => editor?.chain().focus().toggleItalic().run()}
        >
          I
        </button>

        <button
          type="button"
          title="Підкреслений"
          className={editorState?.isUnderline ? css.active : ""}
          onClick={() => editor?.chain().focus().toggleUnderline().run()}
        >
          U
        </button>

        <button
          type="button"
          title="Закреслений"
          className={editorState?.isStrike ? css.active : ""}
          onClick={() => editor?.chain().focus().toggleStrike().run()}
        >
          S
        </button>

        <span className={css.divider} />

        <button
          type="button"
          title="Підзаголовок"
          className={editorState?.isHeading3 ? css.active : ""}
          onClick={() =>
            editor?.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          H3
        </button>

        <span className={css.divider} />

        <button
          type="button"
          title="Маркерований список"
          className={editorState?.isBulletList ? css.active : ""}
          onClick={() =>
            editor?.chain().focus().toggleBulletList().run()
          }
        >
          • List
        </button>

        <button
          type="button"
          title="Нумерований список"
          className={editorState?.isOrderedList ? css.active : ""}
          onClick={() =>
            editor?.chain().focus().toggleOrderedList().run()
          }
        >
          1. List
        </button>

        <span className={css.divider} />

        <button
          type="button"
          title="Скасувати"
          disabled={!editorState?.canUndo}
          onClick={() => editor?.chain().focus().undo().run()}
        >
          ↶
        </button>

        <button
          type="button"
          title="Повторити"
          disabled={!editorState?.canRedo}
          onClick={() => editor?.chain().focus().redo().run()}
        >
          ↷
        </button>
      </div>

      <EditorContent
        editor={editor}
        className={css.editor}
      />

      <input
        type="hidden"
        name={name}
        value={content}
      />
    </div>
  );
}
