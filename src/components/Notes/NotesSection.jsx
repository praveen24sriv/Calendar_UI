import { useNotes } from '../../hooks/useNotes'
import styles from './NotesSection.module.css'

const NOTE_TEMPLATES = [
  {
    label: 'Day plan',
    text: 'Top priorities:\n-\n-\n-',
  },
  {
    label: 'Reminders',
    text: 'Reminder list:\n•\n•\n•',
  },
  {
    label: 'Wins',
    text: 'Today went well:\n1)\n2)\n3)',
  },
]

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
    idle: '',
    typing: 'Typing…',
    saving: 'Saving…',
    saved: 'Saved',
    autosaved: 'Autosaved',
    error: 'Save failed',
  }[status] ?? ''

  const lastSavedLabel = lastSavedAt
    ? lastSavedAt.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    : null
  const hasContent = note.trim().length > 0

  function handleTextareaKeyDown(event) {
    if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 's') {
      event.preventDefault()
      saveNote()
    }
  }

  function handleTemplateInsert(templateText) {
    const nextValue = note.trim()
      ? `${note.trimEnd()}\n\n${templateText}`
      : templateText

    setNote(nextValue)
  }

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>Notes</h3>
        {statusLabel ? (
          <span className={`${styles.status} calendar-ui-chrome`} aria-live="polite">
            {statusLabel}
          </span>
        ) : null}
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

      {hasContent ? (
        <div className={styles.metaRow}>
          {lastSavedLabel ? (
            <p className={styles.metaText}>Last save: {lastSavedLabel}</p>
          ) : null}
          <p className={styles.metaText}>{note.length} chars</p>
        </div>
      ) : null}

      <section className={styles.starterPanel} aria-label="Quick note starters">
        <p className={styles.starterTitle}>Quick starters</p>
        <div className={styles.templateRow}>
          {NOTE_TEMPLATES.map((template) => (
            <button
              key={template.label}
              type="button"
              className={styles.templateButton}
              onClick={() => handleTemplateInsert(template.text)}
            >
              {template.label}
            </button>
          ))}
        </div>
      </section>

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
