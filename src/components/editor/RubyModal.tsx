import { useEffect, useRef } from 'react'
import type { RubyDraft } from './types'
import styles from './RubyModal.module.css'

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
  const previewReading = reading.trim()

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
    <div className={styles.rubyModalBackdrop} onClick={onClose} role="presentation">
      <div
        className={styles.rubyModal}
        onClick={(event) => {
          event.stopPropagation()
        }}
        role="dialog"
        aria-modal="true"
        aria-labelledby="ruby-modal-title"
      >
        <p className={styles.rubyModalLabel}>Selected text</p>
        <p className={styles.rubyModalText}>{draft.text}</p>
        <label className={styles.rubyModalField} htmlFor="ruby-reading">
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
        <div className={styles.rubyModalPreview}>
          <p className={styles.rubyModalLabel}>Preview</p>
          <div className={styles.rubyModalPreviewCard}>
            <ruby
              className={
                !previewReading
                  ? `${styles.rubyModalPreviewRuby} ${styles.isEmpty}`
                  : styles.rubyModalPreviewRuby
              }
            >
              {draft.text}
              <rt>{previewReading || 'よみ'}</rt>
            </ruby>
          </div>
        </div>
        <div className={styles.rubyModalActions}>
          <button type="button" onClick={onClose}>
            Cancel
          </button>
          <button
            type="button"
            className={styles.isPrimary}
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
