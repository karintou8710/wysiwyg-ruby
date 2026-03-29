import { useState } from 'react'
import { EditorContent, type Editor } from '@tiptap/react'
import styles from '../Editor.module.css'
import EditorBubbleMenu from './EditorBubbleMenu'

type EditorSurfaceProps = {
  editor: Editor | null
  isRubyModalOpen: boolean
  onOpenRubyModal: () => void
}

function EditorSurface({
  editor,
  isRubyModalOpen,
  onOpenRubyModal,
}: EditorSurfaceProps) {
  const [isVertical, setIsVertical] = useState(false)
  const editorShellClassName = isVertical
    ? `${styles.editorShell} ${styles.editorShellVertical}`
    : styles.editorShell
  const toggleButtonClassName = isVertical
    ? `${styles.toolbarButton} ${styles.toolbarButtonActive}`
    : styles.toolbarButton
  const editorViewportClassName = isVertical
    ? `${styles.editorViewport} ${styles.editorViewportVertical}`
    : styles.editorViewport

  return (
    <div className={editorShellClassName}>
      <div className={styles.editorToolbar}>
        <button
          type="button"
          className={toggleButtonClassName}
          onClick={() => {
            setIsVertical((current) => !current)
          }}
        >
          {isVertical ? '横書きに戻す' : '縦書きにする'}
        </button>
      </div>

      <EditorBubbleMenu
        editor={editor}
        isRubyModalOpen={isRubyModalOpen}
        onOpenRubyModal={onOpenRubyModal}
      />

      <div className={editorViewportClassName}>
        <EditorContent
          editor={editor}
          className={isVertical ? styles.editorContentVertical : undefined}
        />
      </div>
    </div>
  )
}

export default EditorSurface
