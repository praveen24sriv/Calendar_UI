import styles from './MonthHeader.module.css'

function MonthHeader({ monthLabel, onPrevious, onNext, onToday }) {
  return (
    <header className={styles.header}>
      <button
        type="button"
        className={`${styles.navButton} calendar-ui-chrome`}
        onClick={onPrevious}
        aria-label="Go to previous month"
      >
        ‹
      </button>
      <div className={styles.titleWrap}>
        <h2 className={styles.title}>{monthLabel}</h2>
        <button
          type="button"
          className={`${styles.todayButton} calendar-ui-chrome`}
          onClick={onToday}
          aria-label="Jump to current month"
        >
          Today
        </button>
      </div>
      <button
        type="button"
        className={`${styles.navButton} calendar-ui-chrome`}
        onClick={onNext}
        aria-label="Go to next month"
      >
        ›
      </button>
    </header>
  )
}

export default MonthHeader
