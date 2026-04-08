import styles from './MonthHeader.module.css'

function MonthHeader({ monthLabel, onPrevious, onNext, onToday }) {
  return (
    <header className={styles.header}>
      <button type="button" className={styles.navButton} onClick={onPrevious}>
        ‹
      </button>
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>{monthLabel}</h2>
        <button type="button" className={styles.todayButton} onClick={onToday}>
          Today
        </button>
      </div>
      <button type="button" className={styles.navButton} onClick={onNext}>
        ›
      </button>
    </header>
  )
}

export default MonthHeader
