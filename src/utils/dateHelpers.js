import {
  addDays,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isWithinInterval,
  startOfMonth,
  startOfWeek,
} from 'date-fns'

export function getMonthLabel(monthDate) {
  return format(monthDate, 'MMMM yyyy')
}

export function getWeekdayLabels() {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 0 })

  return Array.from({ length: 7 }).map((_, index) =>
    format(addDays(weekStart, index), 'EEE'),
  )
}

export function buildMonthGrid(monthDate) {
  const monthStart = startOfMonth(monthDate)
  const monthEnd = endOfMonth(monthDate)
  const gridStart = startOfWeek(monthStart, { weekStartsOn: 0 })
  const gridEnd = endOfWeek(monthEnd, { weekStartsOn: 0 })

  const days = []
  let cursor = gridStart

  while (isBefore(cursor, gridEnd) || isSameDay(cursor, gridEnd)) {
    days.push({
      date: cursor,
      isCurrentMonth: cursor.getMonth() === monthDate.getMonth(),
    })

    cursor = addDays(cursor, 1)
  }

  return days
}

export function isDateInClosedRange(date, start, end) {
  if (!start || !end) return false

  return isWithinInterval(date, { start, end })
}

export function isDateInPreviewRange(date, start, end, hover) {
  if (!start || end || !hover) return false

  const rangeStart = isAfter(start, hover) ? hover : start
  const rangeEnd = isAfter(start, hover) ? start : hover

  return isWithinInterval(date, { start: rangeStart, end: rangeEnd })
}

export function formatRangeLabel(start, end) {
  if (!start && !end) return 'Pick a start date'
  if (start && !end) return `${format(start, 'MMM d')} selected. Pick an end date.`

  return `${format(start, 'MMM d')} - ${format(end, 'MMM d, yyyy')}`
}

const HOLIDAYS_BY_MONTH_DAY = {
  '01-01': "New Year's Day",
  '02-14': "Valentine's Day",
  '07-04': 'Independence Day',
  '10-31': 'Halloween',
  '12-25': 'Christmas Day',
}

export function getHolidayLabel(date) {
  return HOLIDAYS_BY_MONTH_DAY[format(date, 'MM-dd')] ?? null
}
