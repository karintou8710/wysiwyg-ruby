import './Editor.css'

function Editor() {
  return (
    <div
      className="editor"
      contentEditable
      data-placeholder="Start writing..."
      suppressContentEditableWarning
      spellCheck={false}
    >
      <p>Text<ruby contentEditable="false">開発<rt>かいはつ</rt></ruby>ルビフル</p>
    </div>
  )
}

export default Editor
