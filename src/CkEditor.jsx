import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import { useState } from "react";

export default function CkEditor() {
  const [value, setValue] = useState("<p>Hello CMS</p>");

  return (
    <div style={{ maxWidth: "800px", margin: "20px auto" }}>
      <CKEditor
        editor={ClassicEditor}
        data={value}
        config={{
          licenseKey: "GPL", // ✅ required
        }}
        onChange={(event, editor) => {
          setValue(editor.getData());
        }}
      />
      <p>{value}</p>
    </div>
  );
}
