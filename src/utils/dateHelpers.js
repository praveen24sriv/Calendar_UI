import {
  addDays,
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfMonth,
  endOfWeek,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isSaturday,
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
  '01-14': 'Makar Sankranti / Pongal',
  '01-26': 'Republic Day',
  '04-14': 'Dr. Ambedkar Jayanti / Baisakhi',
  '05-01': 'Labour Day',
  '08-15': 'Independence Day',
  '10-02': 'Gandhi Jayanti',
  '12-25': 'Christmas',
}

const MOVABLE_INDIAN_FESTIVALS_BY_YEAR = {
  2026: {
    '03-04': 'Holi',
    '03-21': 'Eid al-Fitr',
    '05-27': 'Eid al-Adha',
    '10-20': 'Dussehra',
    '11-08': 'Diwali',
  },
}

function getHolidayMapForYear(year) {
  return {
    ...HOLIDAYS_BY_MONTH_DAY,
    ...(MOVABLE_INDIAN_FESTIVALS_BY_YEAR[year] ?? {}),
  }
}

const MONTH_THEME_PALETTE = [
  {
    accent: '#3f7fe0',
    strong: '#2356a8',
    soft: '#e8f0fe',
    ghost: '#f3f7ff',
    ink: '#0f1f3a',
    muted: '#6a7a93',
    line: '#c7d6ef',
  },
  {
    accent: '#be5a93',
    strong: '#8b3c6c',
    soft: '#fcecf5',
    ghost: '#fff5fa',
    ink: '#33192a',
    muted: '#816277',
    line: '#e6cad9',
  },
  {
    accent: '#23937d',
    strong: '#16685a',
    soft: '#e5f7f2',
    ghost: '#f0fbf8',
    ink: '#12352f',
    muted: '#5c8078',
    line: '#bfdfd7',
  },
  {
    accent: '#4a6fd4',
    strong: '#2f4aa5',
    soft: '#ebeffd',
    ghost: '#f4f6ff',
    ink: '#172447',
    muted: '#61719a',
    line: '#cad3ef',
  },
  {
    accent: '#2e9b5d',
    strong: '#1f7143',
    soft: '#e7f8ee',
    ghost: '#f1fcf5',
    ink: '#123624',
    muted: '#5f7f6c',
    line: '#c7e3d1',
  },
  {
    accent: '#2f96b8',
    strong: '#1d6d88',
    soft: '#e5f7fc',
    ghost: '#f1fbfe',
    ink: '#133743',
    muted: '#607f8a',
    line: '#c4dfe8',
  },
  {
    accent: '#db6a3c',
    strong: '#a54822',
    soft: '#fdecdf',
    ghost: '#fff6f0',
    ink: '#3b1f13',
    muted: '#8f6a5a',
    line: '#ebcfbf',
  },
  {
    accent: '#d1663f',
    strong: '#95472d',
    soft: '#fce9e0',
    ghost: '#fff4ef',
    ink: '#3a1f16',
    muted: '#8f6b5e',
    line: '#e8cabd',
  },
  {
    accent: '#6f7c3f',
    strong: '#505b2d',
    soft: '#f0f5e3',
    ghost: '#f7faef',
    ink: '#232c15',
    muted: '#707a56',
    line: '#d5ddbc',
  },
  {
    accent: '#d28a2b',
    strong: '#995f16',
    soft: '#fef1db',
    ghost: '#fff8eb',
    ink: '#3b270f',
    muted: '#8e754d',
    line: '#ebd8b8',
  },
  {
    accent: '#5c6779',
    strong: '#394252',
    soft: '#edf1f7',
    ghost: '#f6f8fb',
    ink: '#1a2230',
    muted: '#667387',
    line: '#ccd5e3',
  },
  {
    accent: '#2b93b6',
    strong: '#1a6d87',
    soft: '#e4f6fb',
    ghost: '#f0fafd',
    ink: '#133341',
    muted: '#5a7a88',
    line: '#c1dde7',
  },
]

export function getHolidayLabel(date) {
  const year = date.getFullYear()
  const holidayMap = getHolidayMapForYear(year)
  return holidayMap[format(date, 'MM-dd')] ?? null
}

export function getMonthThemeVars(monthDate) {
  const palette = MONTH_THEME_PALETTE[monthDate.getMonth()]

  return {
    '--month-accent': palette.accent,
    '--month-accent-strong': palette.strong,
    '--month-accent-soft': palette.soft,
    '--month-accent-ghost': palette.ghost,
    '--month-ink': palette.ink,
    '--month-muted': palette.muted,
    '--month-line': palette.line,
    '--primary': palette.accent,
    '--primary-600': palette.strong,
    '--primary-100': palette.soft,
  }
}

export function formatDayAriaLabel(date, holidayLabel) {
  const baseLabel = format(date, 'EEEE, MMMM d, yyyy')
  return holidayLabel ? `${baseLabel}. ${holidayLabel}.` : baseLabel
}

export function getRangeProgressLabel(date, start, end) {
  if (!start || !end) return null
  if (!isWithinInterval(date, { start, end })) return null

  const dayIndex = differenceInCalendarDays(date, start) + 1
  const totalDays = differenceInCalendarDays(end, start) + 1

  return `Day ${dayIndex} of ${totalDays}`
}

export function getRangeSummary(start, end) {
  if (!start || !end) return null

  const days = eachDayOfInterval({ start, end })
  const nights = Math.max(0, differenceInCalendarDays(end, start))
  const weekendCount = days.filter((date) => isSaturday(date)).length
  const holidayCount = days.filter((date) => Boolean(getHolidayLabel(date))).length

  return {
    rangeText: `${format(start, 'MMM d')} → ${format(end, 'MMM d')}`,
    nights,
    weekendCount,
    holidayCount,
  }
}

export function getHolidaysForMonth(monthDate) {
  const year = monthDate.getFullYear()
  const month = format(monthDate, 'MM')
  const holidayMap = getHolidayMapForYear(year)

  return Object.entries(holidayMap)
    .filter(([monthDay]) => monthDay.startsWith(`${month}-`))
    .map(([monthDay, label]) => {
      const [, day] = monthDay.split('-')
      const holidayDate = new Date(year, monthDate.getMonth(), Number(day))

      return {
        key: `${format(monthDate, 'yyyy-MM')}-${monthDay}`,
        label,
        dateText: format(holidayDate, 'MMM d'),
      }
    })
}
