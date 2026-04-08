import { useNotes } from '../../hooks/useNotes'
import styles from './NotesSection.module.css'

function NotesSection({ notesKey }) {
  const { note, setNote, saveNote, status } = useNotes(notesKey)

  return (
    <section className={styles.wrapper}>
      <div className={styles.headerRow}>
        <h3 className={styles.title}>Notes</h3>
        <span className={`${styles.status} calendar-ui-chrome`}>
          {status === 'saved' ? 'Saved' : 'Not saved'}
        </span>
      </div>

      <textarea
        className={styles.textarea}
        value={note}
        onChange={(event) => setNote(event.target.value)}
        placeholder="Write your plan, reminders, and tasks here..."
        rows={5}
      />

      <button type="button" className={`${styles.saveButton} calendar-ui-chrome`} onClick={saveNote}>
        Save note
      </button>
    </section>
  )
}

export default NotesSection
