import { useState } from 'react'
import { format } from 'date-fns'
import heroRotation1 from '../../assets/hero-rotation-1.jpg'
import heroRotation2 from '../../assets/hero-rotation-2.jpg'
import heroRotation3 from '../../assets/hero-rotation-3.jpg'
import heroRotation4 from '../../assets/hero-rotation-4.jpg'
import styles from './HeroImage.module.css'

const HERO_IMAGES = [
  heroRotation1,
  heroRotation2,
  heroRotation3,
  heroRotation4,
]

function HeroImage() {
  const today = new Date()
  const [isImageError, setIsImageError] = useState(false)
  const monthName = format(today, 'MMMM').toUpperCase()
  const year = format(today, 'yyyy')

  const totalMonths = today.getFullYear() * 12 + today.getMonth()
  const rotationIndex = Math.floor(totalMonths / 4) % HERO_IMAGES.length
  const heroImage = HERO_IMAGES[rotationIndex]

  return (
    <article className={styles.hero}>
      {!isImageError ? (
        <img
          src={heroImage}
          alt="Wall calendar"
          className={styles.image}
          onError={() => setIsImageError(true)}
        />
      ) : (
        <div className={styles.fallback}>
          <span className={styles.emoji} aria-hidden>
            🗓️
          </span>
          <p>Check files in `src/assets/hero-rotation-1..4.jpg`</p>
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
