import { useState } from 'react'
import Bold from '@tiptap/extension-bold'
import Document from '@tiptap/extension-document'
import Paragraph from '@tiptap/extension-paragraph'
import Text from '@tiptap/extension-text'
import { UndoRedo } from '@tiptap/extensions'
import { EditorContent, useEditor } from '@tiptap/react'
import './Editor.css'
import EditorBubbleMenu from './editor/EditorBubbleMenu'
import RubyModal from './editor/RubyModal'
import type { RubyDraft } from './editor/types'
import Ruby from './extensions/Ruby'

function Editor() {
  const [rubyDraft, setRubyDraft] = useState<RubyDraft | null>(null)
  const [reading, setReading] = useState('')
  const editor = useEditor({
    extensions: [Document, Paragraph, Text, Bold, Ruby, UndoRedo],
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

  const openRubyModal = () => {
    if (!editor) {
      return
    }

    const { from, to, empty } = editor.state.selection

    if (empty) {
      return
    }

    const text = editor.state.doc.textBetween(from, to, '')

    if (!text.trim()) {
      return
    }

    setRubyDraft({ from, to, text })
    setReading('')
  }

  const closeRubyModal = () => {
    setRubyDraft(null)
    setReading('')
    editor?.commands.focus()
  }

  const submitRuby = () => {
    if (!editor || !rubyDraft || !reading.trim()) {
      return
    }

    editor
      .chain()
      .focus()
      .setTextSelection({ from: rubyDraft.from, to: rubyDraft.to })
      .insertRuby({
        text: rubyDraft.text,
        reading: reading.trim(),
      })
      .run()

    closeRubyModal()
  }

  return (
    <>
      <div className="editor-shell">
        {editor ? (
          <EditorBubbleMenu
            editor={editor}
            rubyDraft={rubyDraft}
            onOpenRubyModal={openRubyModal}
          />
        ) : null}
        <EditorContent editor={editor} />
      </div>

      {rubyDraft ? (
        <RubyModal
          draft={rubyDraft}
          reading={reading}
          onChangeReading={setReading}
          onClose={closeRubyModal}
          onSubmit={submitRuby}
        />
      ) : null}
    </>
  )
}

export default Editor
