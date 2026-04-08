import { useState } from 'react'
import { format } from 'date-fns'
import heroJanuary from '../../assets/hero-january.jpg'
import heroFebruary from '../../assets/hero-february.jpg'
import heroMarch from '../../assets/hero-march.jpg'
import heroApril from '../../assets/hero-april.jpg'
import heroMay from '../../assets/hero-may.jpg'
import heroJune from '../../assets/hero-june.jpg'
import heroJuly from '../../assets/hero-july.jpg'
import heroAugust from '../../assets/hero-august.jpg'
import heroSeptember from '../../assets/hero-september.jpg'
import heroOctober from '../../assets/hero-october.jpg'
import heroNovember from '../../assets/hero-november.jpg'
import heroDecember from '../../assets/hero-december.jpg'
import styles from './HeroImage.module.css'

const HERO_IMAGES_BY_MONTH = [
  heroJanuary,
  heroFebruary,
  heroMarch,
  heroApril,
  heroMay,
  heroJune,
  heroJuly,
  heroAugust,
  heroSeptember,
  heroOctober,
  heroNovember,
  heroDecember,
]

function HeroImage({ month }) {
  const [failedImages, setFailedImages] = useState(() => new Set())
  const monthToken = format(month, 'yyyy-MM')
  const monthName = format(month, 'MMMM').toUpperCase()
  const year = format(month, 'yyyy')

  const monthIndex = month.getMonth()
  const heroImage = HERO_IMAGES_BY_MONTH[monthIndex]
  const isImageError = failedImages.has(heroImage)

  function markImageAsFailed() {
    setFailedImages((previous) => {
      if (previous.has(heroImage)) {
        return previous
      }

      const next = new Set(previous)
      next.add(heroImage)
      return next
    })
  }

  return (
    <article className={styles.hero}>
      {!isImageError ? (
        <img
          key={`${monthToken}-${heroImage}`}
          src={heroImage}
          alt="Wall calendar"
          className={`${styles.image} calendar-flip`}
          onError={markImageAsFailed}
        />
      ) : (
        <div className={styles.fallback}>
          <span className={styles.emoji} aria-hidden>
            🗓️
          </span>
          <p>Check files in `src/assets/hero-january..hero-december.jpg`</p>
        </div>
      )}

      <div className={styles.banner} aria-hidden>
        <span className={styles.leftWing} />
        <span className={styles.centerCut} />
        <span className={styles.rightWing} />
      </div>

      <div className={styles.monthStamp}>
        <p className={styles.year}>{year}</p>
        <h1 className={styles.title}>{monthName}</h1>
      </div>
    </article>
  )
}

export default HeroImage
