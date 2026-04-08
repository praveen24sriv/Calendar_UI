import { useMemo, useState } from 'react'
import { addMonths, startOfMonth } from 'date-fns'

export function useCalendar(initialDate = new Date()) {
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(initialDate))

  const month = useMemo(() => visibleMonth, [visibleMonth])

  function goToPreviousMonth() {
    setVisibleMonth((current) => startOfMonth(addMonths(current, -1)))
  }

  function goToNextMonth() {
    setVisibleMonth((current) => startOfMonth(addMonths(current, 1)))
  }

  function goToToday() {
    setVisibleMonth(startOfMonth(new Date()))
  }

  return {
    month,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  }
}
