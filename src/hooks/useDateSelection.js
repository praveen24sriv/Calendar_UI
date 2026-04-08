import { useState } from 'react'
import { isAfter } from 'date-fns'

export function useDateSelection() {
  const [startDate, setStartDate] = useState(null)
  const [endDate, setEndDate] = useState(null)
  const [hoverDate, setHoverDate] = useState(null)

  function onDayClick(date) {
    if (!startDate || endDate) {
      setStartDate(date)
      setEndDate(null)
      setHoverDate(null)
      return
    }

    if (isAfter(startDate, date)) {
      setEndDate(startDate)
      setStartDate(date)
      setHoverDate(null)
      return
    }

    setEndDate(date)
    setHoverDate(null)
  }

  function onDayHover(date) {
    if (startDate && !endDate) {
      setHoverDate(date)
    }
  }

  function resetHover() {
    setHoverDate(null)
  }

  function clearSelection() {
    setStartDate(null)
    setEndDate(null)
    setHoverDate(null)
  }

  return {
    startDate,
    endDate,
    hoverDate,
    onDayClick,
    onDayHover,
    resetHover,
    clearSelection,
  }
}
