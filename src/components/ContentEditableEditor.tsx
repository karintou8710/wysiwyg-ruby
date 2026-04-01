import { useEffect, useRef, useState } from 'react'
import styles from './Editor.module.css'
import { DEFAULT_EDITOR_CONTENT } from './editor/defaultEditorContent'

function ContentEditableEditor() {
  const [isVertical, setIsVertical] = useState(false)
  const editorRef = useRef<HTMLDivElement>(null)
  const editorShellClassName = isVertical
    ? `${styles.editorShell} ${styles.editorShellVertical}`
    : styles.editorShell
  const toggleButtonClassName = isVertical
    ? `${styles.toolbarButton} ${styles.toolbarButtonActive}`
    : styles.toolbarButton
  const editorViewportClassName = isVertical
    ? `${styles.editorViewport} ${styles.editorViewportVertical}`
    : styles.editorViewport
  const editorClassName = isVertical
    ? `${styles.editor} ${styles.contentEditable} ${styles.editorVerticalFlow}`
    : `${styles.editor} ${styles.contentEditable}`

  useEffect(() => {
    if (!editorRef.current) return
    editorRef.current.innerHTML = DEFAULT_EDITOR_CONTENT
  }, [])

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

      <div className={editorViewportClassName}>
        <div
          ref={editorRef}
          className={editorClassName}
          contentEditable
          suppressContentEditableWarning
          spellCheck={false}
          aria-label="contenteditable editor"
        />
      </div>
    </div>
  )
}

export default ContentEditableEditor
