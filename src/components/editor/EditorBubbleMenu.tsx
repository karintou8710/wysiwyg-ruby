import { useEditorState, type Editor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
import { TbBold, TbLanguageHiragana } from 'react-icons/tb'

type EditorBubbleMenuProps = {
  editor: Editor | null
  isRubyModalOpen: boolean
  onOpenRubyModal: () => void
}

function EditorBubbleMenu({
  editor,
  isRubyModalOpen,
  onOpenRubyModal,
}: EditorBubbleMenuProps) {
  const activeState = useEditorState({
    editor,
    selector: ({ editor: currentEditor }) => ({
      isBoldActive: currentEditor?.isActive('bold') ?? false,
      isRubyActive: currentEditor?.isActive('ruby') ?? false,
    }),
  }) ?? {
    isBoldActive: false,
    isRubyActive: false,
  }

  if (!editor || isRubyModalOpen) {
    return null
  }

  return (
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
        className={activeState.isBoldActive ? 'is-active' : ''}
        aria-label="Bold"
        title="Bold"
        onMouseDown={(event) => {
          event.preventDefault()
        }}
        onClick={() => {
          editor.chain().focus().toggleBold().run()
        }}
      >
        <TbBold aria-hidden="true" />
      </button>
      <button
        type="button"
        className={activeState.isRubyActive ? 'is-active' : ''}
        aria-label="Ruby"
        title="Ruby"
        onMouseDown={(event) => {
          event.preventDefault()
        }}
        onClick={onOpenRubyModal}
      >
        <TbLanguageHiragana aria-hidden="true" />
      </button>
    </BubbleMenu>
  )
}

export default EditorBubbleMenu
