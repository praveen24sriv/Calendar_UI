import { useState } from 'react'

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
  const [status, setStatus] = useState('idle')

  function updateNote(value) {
    setNote(value)
    setStatus('idle')
  }

  function saveNote() {
    const notesMap = readNotesMap()
    notesMap[noteKey] = note
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notesMap))
    setStatus('saved')
  }

  return {
    note,
    setNote: updateNote,
    saveNote,
    status,
  }
}
