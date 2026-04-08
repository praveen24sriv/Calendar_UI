import { useNotes } from '../../hooks/useNotes'
import styles from './NotesSection.module.css'

function NotesSection({ notesKey }) {
  const {
    note,
    setNote,
    saveNote,
    status,
    hasUnsavedChanges,
    lastSavedAt,
  } = useNotes(notesKey)

  const statusLabel = {
    idle: 'Ready',
    typing: 'Typing…',
    saving: 'Saving…',
    saved: 'Saved',
    autosaved: 'Autosaved',
    error: 'Save failed',
  }[status] ?? 'Ready'

  const lastSavedLabel = lastSavedAt
    ? lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null

  function handleTextareaKeyDown(event) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
      event.preventDefault()
      saveNote()
    }
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>Notes</h3>
        <span className={`${styles.status} calendar-ui-chrome`} aria-live="polite">
          {statusLabel}
        </span>
      </div>

      <textarea
        className={styles.textarea}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        onKeyDown={handleTextareaKeyDown}
        placeholder="Write your plan, reminders, and tasks here..."
        aria-label="Monthly notes"
        rows={5}
      />

      <div className={styles.metaRow}>
        <p className={styles.metaText}>
          {lastSavedLabel ? `Last save: ${lastSavedLabel}` : 'Not saved yet'}
        </p>
        <p className={styles.metaText}>{note.length} chars</p>
      </div>

      <button
        type="button"
        className={`${styles.saveButton} calendar-ui-chrome`}
        onClick={saveNote}
        disabled={!hasUnsavedChanges || status === 'saving'}
      >
        Save note
      </button>
    </section>
  )
}

export default NotesSection
