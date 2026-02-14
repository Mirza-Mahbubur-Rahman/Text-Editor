# 📖 Tiptap Setup Guide (React 19 + Vite)

## 🔧 Installation

Run the following commands to install Tiptap and the required extensions:

```bash
pnpm install @tiptap/react @tiptap/pm @tiptap/starter-kit \
 @tiptap/extension-heading @tiptap/extension-image \
 @tiptap/extension-link @tiptap/extension-table \
 @tiptap/extension-table-cell @tiptap/extension-table-header \
 @tiptap/extension-table-row @tiptap/extension-underline
```

## 📝 Editor Component Example

Create src/Editor.jsx:

```jsx
import { useState } from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Heading from "@tiptap/extension-heading";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import { Table } from "@tiptap/extension-table";
import { TableCell } from "@tiptap/extension-table-cell";
import { TableHeader } from "@tiptap/extension-table-header";
import { TableRow } from "@tiptap/extension-table-row";
import Underline from "@tiptap/extension-underline";

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

      {/* Toolbar */}
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
        <button onClick={() => editor.chain().focus().setParagraph().run()}>
          Paragraph
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

        <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
          • List
        </button>
        <button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          1. List
        </button>
        <button
          onClick={() => {
            const url = prompt("Enter URL:");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
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
      </div>

      {/* Editor */}
      <EditorContent editor={editor} className="editor" />

      {/* Stored HTML */}
      <div style={{ marginTop: "20px" }}>
        <h3>Stored HTML:</h3>
        <pre>{content}</pre>
      </div>
    </div>
  );
}
```



## 🎨 Styles

Add to src/index.css:

```css
.toolbar {
  margin-bottom: 10px;
}
.toolbar button,
.toolbar select {
  margin-right: 5px;
  padding: 5px 10px;
  cursor: pointer;
}
.editor {
  border: 1px solid #ccc;
  min-height: 200px;
  padding: 10px;
}
.editor table {
  border-collapse: collapse;
  width: 100%;
}
.editor th,
.editor td {
  border: 1px solid #333;
  padding: 8px;
}
```

## ✅ Features

- Bold, Italic, Underline
- Paragraph button
- Headings H1–H6 via dropdown
- Bullet & Ordered lists
- Add/Remove links
- Insert images
- Insert tables with borders
- Content stored as HTML in React state (ready for CMS storage)

# For CKEditor

## 📝 CKEditor 5 Setup (React 19 + Vite + pnpm)

This project uses CKEditor 5 (Classic Build) with React 19 and Vite.

Due to CKEditor v44+ licensing changes, a licenseKey must be provided even for free GPL usage.

## ✅ Installation (pnpm)

```bash
pnpm add @ckeditor/ckeditor5-react
pnpm add @ckeditor/ckeditor5-build-classic
```

or

```bash
pnpm add @ckeditor/ckeditor5-react@11.0.1
pnpm add @ckeditor/ckeditor5-build-classic@44.3.0
```

## ✅ Working Component (CkEditor.jsx)

```jsx
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { useState } from "react";

export default function CkEditor() {
  const [value, setValue] = useState("<p>Hello CMS</p>");

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: "GPL", // Required since CKEditor v44+
        }}
        onChange={(event, editor) => {
          const data = editor.getData();
          setValue(data);
        }}
      />
    </div>
  );
}
```

⚠ Important Notes

## 1️⃣ License Key

Since CKEditor 5 v44+, you must provide a license key.

For free GPL usage:

`licenseKey: "GPL"`

If building a commercial project, you need a paid license.

## 2️⃣ Do NOT Install

Do NOT install:

ckeditor5

That is the modular enterprise version and requires full configuration.

We are using:

`@ckeditor/ckeditor5-build-classic`

## 3️⃣ If You See This Error

CKEditorError: license-key-missing

Fix by adding:

```js
config={{
  licenseKey: "GPL"
}}
```

## 4️⃣ If Vite Acts Weird

Clear cache:

PowerShell:

Remove-Item -Recurse -Force node_modules\.vite

Then restart:

pnpm run dev

## 🎯 Result

✔ Full toolbar
✔ Editable WYSIWYG
✔ React state controlled
✔ Works with React 19
✔ Works with Vite
