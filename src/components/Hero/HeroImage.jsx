import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import styles from './HeroImage.module.css'

const loadImage = (webpPath, jpgPath) => {
  return import(webpPath)
    .then((module) => module.default)
    .catch(() => import(jpgPath).then((module) => module.default))
}

const HERO_IMAGE_LOADERS_BY_MONTH = [
  () => loadImage('../../assets/hero-january.webp', '../../assets/hero-january.jpg'),
  () => loadImage('../../assets/hero-february.webp', '../../assets/hero-february.jpg'),
  () => loadImage('../../assets/hero-march.webp', '../../assets/hero-march.jpg'),
  () => loadImage('../../assets/hero-april.webp', '../../assets/hero-april.jpg'),
  () => loadImage('../../assets/hero-may.webp', '../../assets/hero-may.jpg'),
  () => loadImage('../../assets/hero-june.webp', '../../assets/hero-june.jpg'),
  () => loadImage('../../assets/hero-july.webp', '../../assets/hero-july.jpg'),
  () => loadImage('../../assets/hero-august.webp', '../../assets/hero-august.jpg'),
  () => loadImage('../../assets/hero-september.webp', '../../assets/hero-september.jpg'),
  () => loadImage('../../assets/hero-october.webp', '../../assets/hero-october.jpg'),
  () => loadImage('../../assets/hero-november.webp', '../../assets/hero-november.jpg'),
  () => loadImage('../../assets/hero-december.webp', '../../assets/hero-december.jpg'),
]

function HeroImage({ month }) {
  const [resolvedImageByMonth, setResolvedImageByMonth] = useState({})
  const [failedMonths, setFailedMonths] = useState(() => new Set())
  const monthToken = format(month, 'yyyy-MM')
  const monthName = format(month, 'MMMM').toUpperCase()
  const year = format(month, 'yyyy')

  const monthIndex = month.getMonth()
  const heroImageSrc = resolvedImageByMonth[monthIndex] ?? ''
  const isImageError = failedMonths.has(monthIndex)
  const isImageLoading = !heroImageSrc && !isImageError

  useEffect(() => {
    let isActive = true

    if (heroImageSrc || isImageError) {
      return () => {
        isActive = false
      }
    }

    HERO_IMAGE_LOADERS_BY_MONTH[monthIndex]()
      .then((resolvedSrc) => {
        if (!isActive) return

        setResolvedImageByMonth((previous) => ({
          ...previous,
          [monthIndex]: resolvedSrc,
        }))
      })
      .catch(() => {
        if (!isActive) return

        setFailedMonths((previous) => {
          if (previous.has(monthIndex)) return previous

          const next = new Set(previous)
          next.add(monthIndex)
          return next
        })
      })

    return () => {
      isActive = false
    }
  }, [heroImageSrc, isImageError, monthIndex])

  function markImageAsFailed() {
    setFailedMonths((previous) => {
      if (previous.has(monthIndex)) return previous

      const next = new Set(previous)
      next.add(monthIndex)
      return next
    })
  }

  return (
    <article className={styles.hero}>
      {!isImageError && heroImageSrc ? (
        <img
          key={`${monthToken}-${heroImageSrc}`}
          src={heroImageSrc}
          alt="Wall calendar"
          className={`${styles.image} calendar-flip`}
          loading="eager"
          fetchPriority="high"
          decoding="async"
          onError={markImageAsFailed}
        />
      ) : (
        <div className={styles.fallback}>
          <span className={styles.emoji} aria-hidden>
            🗓️
          </span>
          <p>
            {isImageLoading
              ? 'Loading month image...'
              : 'Check files in `src/assets/hero-january..hero-december.webp`'}
          </p>
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
