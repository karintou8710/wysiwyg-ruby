import type { Editor } from '@tiptap/react'
import { BubbleMenu } from '@tiptap/react/menus'
type EditorBubbleMenuProps = {
  editor: Editor
  isRubyModalOpen: boolean
  onOpenRubyModal: () => void
}

function EditorBubbleMenu({
  editor,
  isRubyModalOpen,
  onOpenRubyModal,
}: EditorBubbleMenuProps) {
  return (
    <BubbleMenu
      editor={editor}
      className="bubble-menu"
      options={{ placement: 'top', offset: 8 }}
      shouldShow={({ editor: currentEditor, state }) => {
        const { empty } = state.selection

        return !isRubyModalOpen && !empty && currentEditor.isEditable
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
      <button
        type="button"
        onMouseDown={(event) => {
          event.preventDefault()
        }}
        onClick={onOpenRubyModal}
      >
        Ruby
      </button>
    </BubbleMenu>
  )
}

export default EditorBubbleMenu
