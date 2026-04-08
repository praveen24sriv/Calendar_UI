import Layout from './components/Layout/Layout'
import HeroImage from './components/Hero/HeroImage'
import Calendar from './components/Calendar/Calendar'
import { useCalendar } from './hooks/useCalendar'

function App() {
  const { month, goToNextMonth, goToPreviousMonth, goToToday } = useCalendar()

  return (
    <Layout
      hero={<HeroImage month={month} />}
      calendar={(
        <Calendar
          month={month}
          onNextMonth={goToNextMonth}
          onPreviousMonth={goToPreviousMonth}
          onToday={goToToday}
        />
      )}
    />
  )
}

export default App