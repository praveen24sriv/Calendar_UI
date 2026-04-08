import { format } from 'date-fns'
import { useCalendar } from '../../hooks/useCalendar'
import { useDateSelection } from '../../hooks/useDateSelection'
import {
  buildMonthGrid,
  formatRangeLabel,
  getMonthLabel,
  getWeekdayLabels,
} from '../../utils/dateHelpers'
import MonthHeader from './MonthHeader'
import DayGrid from './DayGrid'
import NotesSection from '../Notes/NotesSection'
import styles from './Calendar.module.css'

function Calendar() {
  const { month, goToNextMonth, goToPreviousMonth, goToToday } = useCalendar()
  const {
    startDate,
    endDate,
    hoverDate,
    onDayClick,
    onDayHover,
    resetHover,
  } = useDateSelection()

  const days = buildMonthGrid(month)
  const weekdayLabels = getWeekdayLabels()
  const monthLabel = getMonthLabel(month)
  const rangeLabel = formatRangeLabel(startDate, endDate)
  const notesKey = `${format(month, 'yyyy-MM')}:${format(startDate ?? month, 'yyyy-MM-dd')}`

  return (
    <section className={styles.wrapper}>
      <p className={styles.selectionHint}>{rangeLabel}</p>

      <div className={styles.contentRow}>
        <NotesSection key={notesKey} notesKey={notesKey} />

        <section className={styles.datesPane}>
          <MonthHeader
            monthLabel={monthLabel}
            onPrevious={goToPreviousMonth}
            onNext={goToNextMonth}
            onToday={goToToday}
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
        </section>
      </div>
    </section>
  )
}

export default Calendar
