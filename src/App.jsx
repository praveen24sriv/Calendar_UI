import Layout from './components/Layout/Layout'
import HeroImage from './components/Hero/HeroImage'
import Calendar from './components/Calendar/Calendar'
import { useCalendar } from './hooks/useCalendar'
import { getMonthThemeVars } from './utils/dateHelpers'

function App() {
  const {
    month,
    transitionDirection,
    goToNextMonth,
    goToPreviousMonth,
    goToToday,
  } = useCalendar()
  const monthThemeVars = getMonthThemeVars(month)

  return (
    <Layout
      themeVars={monthThemeVars}
      hero={<HeroImage month={month} />}
      calendar={(
        <Calendar
          month={month}
          transitionDirection={transitionDirection}
          onNextMonth={goToNextMonth}
          onPreviousMonth={goToPreviousMonth}
          onToday={goToToday}
        />
      )}
    />
  )
}

export default App