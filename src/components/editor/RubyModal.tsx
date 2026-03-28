import { useEffect, useRef } from 'react'
import type { RubyDraft } from './types'

type RubyModalProps = {
  open: boolean
  draft: RubyDraft | null
  reading: string
  onChangeReading: (value: string) => void
  onClose: () => void
  onSubmit: () => void
}

function RubyModal({
  open,
  draft,
  reading,
  onChangeReading,
  onClose,
  onSubmit,
}: RubyModalProps) {
  const readingInputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) {
      return
    }

    readingInputRef.current?.focus()
    readingInputRef.current?.select()
  }, [open])

  if (!open || !draft) {
    return null
  }

  return (
    <div className="ruby-modal-backdrop" onClick={onClose} role="presentation">
      <div
        className="ruby-modal"
        onClick={(event) => {
          event.stopPropagation()
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ruby-modal-title"
      >
        <p className="ruby-modal-label">Selected text</p>
        <p className="ruby-modal-text">{draft.text}</p>
        <label className="ruby-modal-field" htmlFor="ruby-reading">
          <span id="ruby-modal-title">Reading</span>
          <input
            id="ruby-reading"
            ref={readingInputRef}
            value={reading}
            onChange={(event) => {
              onChangeReading(event.target.value)
            }}
            onKeyDown={(event) => {
              if (event.key === 'Escape') {
                event.preventDefault()
                onClose()
              }
            }}
          />
        </label>
        <div className="ruby-modal-actions">
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className="is-primary"
            disabled={!reading.trim()}
            onClick={onSubmit}
          >
            Add ruby
          </button>
        </div>
      </div>
    </div>
  )
}

export default RubyModal
