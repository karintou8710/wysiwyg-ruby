import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import './Editor.css'

function Editor() {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text],
    content: '<p></p>',
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: 'editor',
        spellcheck: 'false',
        'aria-label': 'Editor',
      },
    },
  })

  return (
    <div className="editor-shell">
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
