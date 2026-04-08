import { format } from 'date-fns'
import { useDateSelection } from '../../hooks/useDateSelection'
import {
  buildMonthGrid,
  formatRangeLabel,
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
  } = useDateSelection()

  const days = buildMonthGrid(month)
  const monthToken = format(month, 'yyyy-MM')
  const weekdayLabels = getWeekdayLabels()
  const monthLabel = getMonthLabel(month)
  const rangeLabel = formatRangeLabel(startDate, endDate)
  const notesKey = monthToken
  const monthHolidays = getHolidaysForMonth(month)
  const datesPaneClassName = classNames(
    styles.datesPane,
    'calendar-flip',
    transitionDirection === 'prev' && 'calendar-flip-prev',
    transitionDirection === 'next' && 'calendar-flip-next',
    transitionDirection === 'today' && 'calendar-flip-today',
  )

  return (
    <section className={styles.wrapper}>
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

        <section className={styles.holidayStrip} aria-label="Holidays this month">
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
      </section>

      <p className={styles.selectionHint}>Selected: {rangeLabel}</p>

      <section className={styles.notesPane}>
        <NotesSection key={notesKey} notesKey={notesKey} />
      </section>
    </section>
  )
}

export default Calendar
