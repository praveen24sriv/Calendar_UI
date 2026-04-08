import styles from './Layout.module.css'

function Layout({ hero, calendar, themeVars }) {
  return (
    <main className={`${styles.page} calendar-page`} style={themeVars}>
      <section className={`${styles.frame} calendar-frame`}>
        <div className={`${styles.hook} calendar-ui-chrome`} aria-hidden />
        <div className={`${styles.binding} calendar-ui-chrome`} aria-hidden />
        <div className={`${styles.sheet} calendar-sheet`}>
          {hero}
          {calendar}
        </div>
      </section>
    </main>
  )
}

export default Layout
