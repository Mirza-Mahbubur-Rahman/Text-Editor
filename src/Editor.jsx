import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { useState } from "react";

export default function Editor() {
  const [content, setContent] = useState("");

  const editor = useEditor({
    extensions: [
      StarterKit,
      Underline,
      Link,
      Heading.configure({ levels: [1, 2, 3, 4, 5, 6] }),
      Image,
      Table.configure({ resizable: true }),
      TableRow,
      TableHeader,
      TableCell,
    ],
    content: "<p>Hello CMS editor!</p>",
    onUpdate: ({ editor }) => {
      setContent(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <div style={{ margin: "20px" }}>
      <h2>Tiptap Editor Demo</h2>

      <div className="toolbar">
        <button onClick={() => editor.chain().focus().toggleBold().run()}>
          Bold
        </button>
        <button onClick={() => editor.chain().focus().toggleItalic().run()}>
          Italic
        </button>
        <button onClick={() => editor.chain().focus().toggleUnderline().run()}>
          Underline
        </button>
        {[1, 2, 3, 4, 5, 6].map((level) => (
          <button
            key={level}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level }).run()
            }
          >
            H{level}
          </button>
        ))}
        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
        <button onClick={() => editor.chain().focus().setParagraph().run()}>
          Paragraph
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setLink({ href: "https://example.com" })
              .run()
          }
        >
          Add Link
        </button>
        <button onClick={() => editor.chain().focus().unsetLink().run()}>
          Remove Link
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .setImage({ src: "https://placekitten.com/300/200" })
              .run()
          }
        >
          Insert Image
        </button>
        <button
          onClick={() =>
            editor
              .chain()
              .focus()
              .insertTable({ rows: 3, cols: 3, withHeaderRow: true })
              .run()
          }
        >
          Insert Table
        </button>
        {/* Heading dropdown */}
        <select
          onChange={(e) => {
            const level = parseInt(e.target.value, 10);
            editor.chain().focus().toggleHeading({ level }).run();
          }}
          defaultValue=""
        >
          <option value="" disabled>
            Select Heading
          </option>
          <option value="1">Heading 1</option>
          <option value="2">Heading 2</option>
          <option value="3">Heading 3</option>
          <option value="4">Heading 4</option>
          <option value="5">Heading 5</option>
          <option value="6">Heading 6</option>
        </select>
      </div>

      <EditorContent editor={editor} className="editor" />

      <div style={{ marginTop: "20px" }}>
        <h3>Stored HTML:</h3>
        <pre>{content}</pre>
      </div>
    </div>
  );
}
