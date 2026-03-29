import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { UndoRedo } from '@tiptap/extensions'
import { useEditor } from '@tiptap/react'
import styles from '../Editor.module.css'
import Ruby from '../extensions/Ruby'
import { DEFAULT_EDITOR_CONTENT } from './defaultEditorContent'

const editorExtensions = [Document, Paragraph, Text, Bold, Ruby, UndoRedo]

function useRubyEditor() {
  return useEditor({
    extensions: editorExtensions,
    content: DEFAULT_EDITOR_CONTENT,
    immediatelyRender: false,
    editorProps: {
      attributes: {
        class: styles.editor,
        spellcheck: 'false',
        'aria-label': 'エディタ',
      },
    },
  })
}

export default useRubyEditor
