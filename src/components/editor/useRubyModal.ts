import { useState } from 'react'
import { NodeSelection } from '@tiptap/pm/state'
import type { Editor } from '@tiptap/react'
import type { RubyDraft } from './types'

function useRubyModal(editor: Editor | null) {
  const [isOpen, setIsOpen] = useState(false)
  const [rubyDraft, setRubyDraft] = useState<RubyDraft | null>(null)
  const [reading, setReading] = useState('')

  const openRubyModal = () => {
    if (!editor) {
      return
    }

    const { selection } = editor.state
    const { from, to, empty } = selection

    if (empty) {
      return
    }

    if (
      selection instanceof NodeSelection &&
      selection.node.type.name === 'ruby'
    ) {
      const text = String(selection.node.attrs.text ?? '').trim()

      if (!text) {
        return
      }

      setRubyDraft({ from, to, text })
      setReading(String(selection.node.attrs.reading ?? ''))
      setIsOpen(true)
      return
    }

    const text = editor.state.doc.textBetween(from, to, '')

    if (!text.trim()) {
      return
    }

    setRubyDraft({ from, to, text })
    setReading('')
    setIsOpen(true)
  }

  const closeRubyModal = () => {
    setIsOpen(false)
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

  return {
    isOpen,
    rubyDraft,
    reading,
    setReading,
    openRubyModal,
    closeRubyModal,
    submitRuby,
  }
}

export default useRubyModal
