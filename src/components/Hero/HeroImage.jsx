import { useEffect, useState } from 'react'
import { format } from 'date-fns'
import styles from './HeroImage.module.css'

const HERO_IMAGE_LOADERS_BY_MONTH = [
  () => import('../../assets/hero-january.webp').then((module) => module.default),
  () => import('../../assets/hero-february.webp').then((module) => module.default),
  () => import('../../assets/hero-march.webp').then((module) => module.default),
  () => import('../../assets/hero-april.webp').then((module) => module.default),
  () => import('../../assets/hero-may.webp').then((module) => module.default),
  () => import('../../assets/hero-june.webp').then((module) => module.default),
  () => import('../../assets/hero-july.webp').then((module) => module.default),
  () => import('../../assets/hero-august.webp').then((module) => module.default),
  () => import('../../assets/hero-september.webp').then((module) => module.default),
  () => import('../../assets/hero-october.webp').then((module) => module.default),
  () => import('../../assets/hero-november.webp').then((module) => module.default),
  () => import('../../assets/hero-december.webp').then((module) => module.default),
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

  useEffect(() => {
    const adjacentMonthIndexes = [
      (monthIndex + 11) % 12,
      (monthIndex + 1) % 12,
    ]

    adjacentMonthIndexes.forEach((index) => {
      if (resolvedImageByMonth[index] || failedMonths.has(index)) return

      HERO_IMAGE_LOADERS_BY_MONTH[index]()
        .then((resolvedSrc) => {
          setResolvedImageByMonth((previous) => {
            if (previous[index]) return previous

            return {
              ...previous,
              [index]: resolvedSrc,
            }
          })
        })
        .catch(() => {
          setFailedMonths((previous) => {
            if (previous.has(index)) return previous

            const next = new Set(previous)
            next.add(index)
            return next
          })
        })
    })
  }, [failedMonths, monthIndex, resolvedImageByMonth])

  function markImageAsFailed() {
    setFailedMonths((previous) => {
      if (previous.has(monthIndex)) return previous

      const next = new Set(previous)
      next.add(monthIndex)
      return next
    })
  }

  return (
    <article className={`${styles.hero} calendar-hero calendar-ui-chrome`}>
      {!isImageError && heroImageSrc ? (
        <img
          key={`${monthToken}-${heroImageSrc}`}
          src={heroImageSrc}
          alt={`${monthName} ${year} wall calendar image`}
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
