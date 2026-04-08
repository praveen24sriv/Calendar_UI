import Layout from './components/Layout/Layout'
import HeroImage from './components/Hero/HeroImage'
import Calendar from './components/Calendar/Calendar'

function App() {
  return (
    <Layout
      hero={<HeroImage />}
      calendar={<Calendar />}
    />
  )
}

export default App