import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { EditorContent, useEditor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import './Editor.css'
import Ruby from './extensions/Ruby'

function Editor() {
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Bold, Ruby],
    content: '<p><ruby>開発<rt>かいはつ</rt></ruby>のテスト</p>',
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
      {editor ? (
        <BubbleMenu
          editor={editor}
          className="bubble-menu"
          options={{ placement: 'top', offset: 8 }}
          shouldShow={({ editor: currentEditor, state }) => {
            const { empty } = state.selection

            return !empty && currentEditor.isEditable
          }}
        >
          <button
            type="button"
            className={editor.isActive('bold') ? 'is-active' : ''}
            onMouseDown={(event) => {
              event.preventDefault()
            }}
            onClick={() => {
              editor.chain().focus().toggleBold().run()
            }}
          >
            Bold
          </button>
        </BubbleMenu>
      ) : null}
      <EditorContent editor={editor} />
    </div>
  )
}

export default Editor
