import './Editor.css'

function Editor() {
  return (
    <div
      className="editor"
      contentEditable
      data-placeholder="Start writing..."
      suppressContentEditableWarning
      spellCheck={false}
    />
  )
}

export default Editor
