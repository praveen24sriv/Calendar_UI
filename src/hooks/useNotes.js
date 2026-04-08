import { useCallback, useEffect, useState } from 'react'

const NOTES_STORAGE_KEY = 'calendar-ui-notes-v1'

function readNotesMap() {
  try {
    const raw = localStorage.getItem(NOTES_STORAGE_KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

export function useNotes(noteKey) {
  const [note, setNote] = useState(() => {
    const notesMap = readNotesMap()
    return notesMap[noteKey] ?? ''
  })
  const [savedNote, setSavedNote] = useState(() => {
    const notesMap = readNotesMap()
    return notesMap[noteKey] ?? ''
  })
  const [status, setStatus] = useState('idle')
  const [lastSavedAt, setLastSavedAt] = useState(null)

  const hasUnsavedChanges = note !== savedNote

  const persistNote = useCallback((nextNote, nextStatus) => {
    try {
      const notesMap = readNotesMap()
      notesMap[noteKey] = nextNote
      localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notesMap))
      setSavedNote(nextNote)
      setStatus(nextStatus)
      setLastSavedAt(new Date())
      return true
    } catch {
      setStatus('error')
      return false
    }
  }, [noteKey])

  function updateNote(value) {
    setNote(value)
    setStatus(value === savedNote ? 'saved' : 'typing')
  }

  function saveNote() {
    if (!hasUnsavedChanges) return

    setStatus('saving')
    persistNote(note, 'saved')
  }

  useEffect(() => {
    if (!hasUnsavedChanges) return

    const autosaveTimeout = window.setTimeout(() => {
      persistNote(note, 'autosaved')
    }, 900)

    return () => {
      window.clearTimeout(autosaveTimeout)
    }
  }, [hasUnsavedChanges, note, persistNote])

  return {
    note,
    setNote: updateNote,
    saveNote,
    status,
    hasUnsavedChanges,
    lastSavedAt,
  }
}
