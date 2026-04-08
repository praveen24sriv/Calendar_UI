import { isSameDay, isSameMonth } from 'date-fns'
import {
  isDateInClosedRange,
  isDateInPreviewRange,
} from '../../utils/dateHelpers'
import { classNames } from '../../utils/classNames'
import styles from './DayCell.module.css'

function DayCell({
  dayDate,
  holidayLabel,
  isCurrentMonth,
  visibleMonth,
  startDate,
  endDate,
  hoverDate,
  onClick,
  onHover,
}) {
  const isStart = startDate && isSameDay(dayDate, startDate)
  const isEnd = endDate && isSameDay(dayDate, endDate)
  const isToday = isSameDay(dayDate, new Date())
  const isInSelectedRange = isDateInClosedRange(dayDate, startDate, endDate)
  const isInPreviewRange = isDateInPreviewRange(dayDate, startDate, endDate, hoverDate)
  const isOutsideCurrentMonth = !isCurrentMonth || !isSameMonth(dayDate, visibleMonth)

  const buttonClass = classNames(
    styles.day,
    isToday && styles.today,
    isOutsideCurrentMonth && styles.outsideMonth,
    isInSelectedRange && styles.inRange,
    isInPreviewRange && !isInSelectedRange && styles.previewRange,
    (isStart || isEnd) && styles.endpoint,
  )

  return (
    <button
      type="button"
      className={buttonClass}
      onClick={() => onClick(dayDate)}
      onMouseEnter={() => onHover(dayDate)}
      aria-pressed={Boolean(isStart || isEnd)}
      title={holidayLabel ?? undefined}
    >
      {dayDate.getDate()}
      {holidayLabel ? <span className={styles.holidayDot} aria-hidden /> : null}
    </button>
  )
}

export default DayCell
