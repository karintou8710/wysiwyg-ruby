import EditorSurface from './editor/EditorSurface'
import RubyModal from './editor/RubyModal'
import useRubyEditor from './editor/useRubyEditor'
import useRubyModal from './editor/useRubyModal'

function Editor() {
  const editor = useRubyEditor()
  const {
    isOpen,
    rubyDraft,
    reading,
    setReading,
    openRubyModal,
    closeRubyModal,
    submitRuby,
  } = useRubyModal(editor)

  return (
    <>
      <EditorSurface
        editor={editor}
        isRubyModalOpen={isOpen}
        onOpenRubyModal={openRubyModal}
      />

      <RubyModal
        open={isOpen}
        draft={rubyDraft}
        reading={reading}
        onChangeReading={setReading}
        onClose={closeRubyModal}
        onSubmit={submitRuby}
      />
    </>
  )
}

export default Editor
