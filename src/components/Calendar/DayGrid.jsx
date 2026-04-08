import DayCell from './DayCell'
import { getHolidayLabel } from '../../utils/dateHelpers'
import styles from './DayGrid.module.css'

function DayGrid({
  days,
  weekdayLabels,
  visibleMonth,
  startDate,
  endDate,
  hoverDate,
  onDayClick,
  onDayHover,
  onGridLeave,
}) {
  return (
    <section className={styles.wrapper} onMouseLeave={onGridLeave}>
      <div className={styles.weekdayRow}>
        {weekdayLabels.map((label) => (
          <span key={label} className={styles.weekdayCell}>
            {label}
          </span>
        ))}
      </div>

      <div className={styles.grid}>
        {days.map((day) => (
          <DayCell
            key={day.date.toISOString()}
            dayDate={day.date}
            holidayLabel={getHolidayLabel(day.date)}
            isCurrentMonth={day.isCurrentMonth}
            visibleMonth={visibleMonth}
            startDate={startDate}
            endDate={endDate}
            hoverDate={hoverDate}
            onClick={onDayClick}
            onHover={onDayHover}
          />
        ))}
      </div>
    </section>
  )
}

export default DayGrid
