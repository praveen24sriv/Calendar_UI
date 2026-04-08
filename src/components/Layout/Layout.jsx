import styles from './Layout.module.css'

function Layout({ hero, calendar }) {
  return (
    <main className={styles.page}>
      <section className={styles.frame}>
        <div className={styles.hook} aria-hidden />
        <div className={styles.binding} aria-hidden />
        <div className={styles.sheet}>
          {hero}
          {calendar}
        </div>
      </section>
    </main>
  )
}

export default Layout
