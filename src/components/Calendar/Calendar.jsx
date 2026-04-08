import { useEffect, useMemo } from 'react'
import { format } from 'date-fns'
import { useDateSelection } from '../../hooks/useDateSelection'
import {
  buildMonthGrid,
  formatRangeLabel,
  getMonthThemeVars,
  getRangeSummary,
  getHolidaysForMonth,
  getMonthLabel,
  getWeekdayLabels,
} from '../../utils/dateHelpers'
import MonthHeader from './MonthHeader'
import DayGrid from './DayGrid'
import NotesSection from '../Notes/NotesSection'
import { classNames } from '../../utils/classNames'
import styles from './Calendar.module.css'

function Calendar({ month, transitionDirection, onNextMonth, onPreviousMonth, onToday }) {
  const {
    startDate,
    endDate,
    hoverDate,
    onDayClick,
    onDayHover,
    resetHover,
    clearSelection,
  } = useDateSelection()

  const days = buildMonthGrid(month)
  const monthToken = format(month, 'yyyy-MM')
  const weekdayLabels = getWeekdayLabels()
  const monthLabel = getMonthLabel(month)
  const rangeLabel = formatRangeLabel(startDate, endDate)
  const rangeSummary = useMemo(() => getRangeSummary(startDate, endDate), [startDate, endDate])
  const notesKey = monthToken
  const monthHolidays = getHolidaysForMonth(month)
  const monthThemeVars = useMemo(() => getMonthThemeVars(month), [month])
  const datesPaneClassName = classNames(
    styles.datesPane,
    'calendar-flip',
    transitionDirection === 'prev' && 'calendar-flip-prev',
    transitionDirection === 'next' && 'calendar-flip-next',
    transitionDirection === 'today' && 'calendar-flip-today',
  )

  useEffect(() => {
    function handleKeyboard(event) {
      if (event.metaKey || event.ctrlKey || event.altKey) return

      const target = event.target
      const tagName = target?.tagName?.toLowerCase()
      const isEditable = tagName === 'input' || tagName === 'textarea' || target?.isContentEditable

      if (isEditable) return

      if (event.key === 'ArrowLeft') {
        event.preventDefault()
        onPreviousMonth()
      }

      if (event.key === 'ArrowRight') {
        event.preventDefault()
        onNextMonth()
      }

      if (event.key === 'Escape') {
        event.preventDefault()
        clearSelection()
      }
    }

    window.addEventListener('keydown', handleKeyboard)

    return () => {
      window.removeEventListener('keydown', handleKeyboard)
    }
  }, [clearSelection, onNextMonth, onPreviousMonth])

  function formatNights(count) {
    return `${count} night${count === 1 ? '' : 's'}`
  }

  function formatWeekends(count) {
    return `${count} weekend${count === 1 ? '' : 's'}`
  }

  function formatHolidays(count) {
    return `${count} holiday${count === 1 ? '' : 's'}`
  }

  return (
    <section className={styles.wrapper} style={monthThemeVars}>
      <section key={monthToken} className={datesPaneClassName}>
        <MonthHeader
          monthLabel={monthLabel}
          onPrevious={onPreviousMonth}
          onNext={onNextMonth}
          onToday={onToday}
        />

        <DayGrid
          days={days}
          weekdayLabels={weekdayLabels}
          visibleMonth={month}
          startDate={startDate}
          endDate={endDate}
          hoverDate={hoverDate}
          onDayClick={onDayClick}
          onDayHover={onDayHover}
          onGridLeave={resetHover}
        />

        <section className={`${styles.holidayStrip} calendar-ui-chrome`} aria-label="Holidays this month">
          <p className={styles.holidayTitle}>Holiday markers</p>
          {monthHolidays.length ? (
            <div className={styles.holidayChips}>
              {monthHolidays.map((holiday) => (
                <span key={holiday.key} className={styles.holidayChip}>
                  <span className={styles.holidayChipDot} aria-hidden />
                  {holiday.dateText}: {holiday.label}
                </span>
              ))}
            </div>
          ) : (
            <p className={styles.holidayEmpty}>No configured holiday markers this month.</p>
          )}
        </section>

        {rangeSummary ? (
          <p
            key={`${format(startDate, 'yyyy-MM-dd')}-${format(endDate, 'yyyy-MM-dd')}`}
            className={styles.rangeSummaryBar}
          >
            📅 {rangeSummary.rangeText} · {formatNights(rangeSummary.nights)} · {formatWeekends(rangeSummary.weekendCount)} · {formatHolidays(rangeSummary.holidayCount)}
          </p>
        ) : null}
      </section>

      <section className={styles.selectionPane}>
        <p className={styles.selectionHint}>Selected: {rangeLabel}</p>
        <p className={`${styles.keyboardHint} calendar-ui-chrome`}>
          ⌨︎ ←/→ change month · Enter select day · Esc clear range
        </p>
      </section>

      <section className={styles.notesPane}>
        <NotesSection key={notesKey} notesKey={notesKey} />
      </section>
    </section>
  )
}

export default Calendar
