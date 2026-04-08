import { useMemo, useState } from 'react'
import { addMonths, startOfMonth } from 'date-fns'

export function useCalendar(initialDate = new Date()) {
  const [visibleMonth, setVisibleMonth] = useState(startOfMonth(initialDate))
  const [transitionDirection, setTransitionDirection] = useState('next')

  const month = useMemo(() => visibleMonth, [visibleMonth])

  function goToPreviousMonth() {
    setTransitionDirection('prev')
    setVisibleMonth((current) => startOfMonth(addMonths(current, -1)))
  }

  function goToNextMonth() {
    setTransitionDirection('next')
    setVisibleMonth((current) => startOfMonth(addMonths(current, 1)))
  }

  function goToToday() {
    setTransitionDirection('today')
    setVisibleMonth(startOfMonth(new Date()))
  }

  return {
    month,
    transitionDirection,
    goToPreviousMonth,
    goToNextMonth,
    goToToday,
  }
}
