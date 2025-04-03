"use client"

import { useEffect, useState } from "react"
import styles from "./ClosingPage.module.css"

export default function ClosingPage() {
  const [visible, setVisible] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showSignature, setShowSignature] = useState(false)

  useEffect(() => {
    // Sequence the animations
    const visibleTimer = setTimeout(() => setVisible(true), 500)
    const messageTimer = setTimeout(() => setShowMessage(true), 1500)
    const signatureTimer = setTimeout(() => setShowSignature(true), 2500)

    // Create star animation
    const createStars = () => {
      const container = document.querySelector(`.${styles.starsContainer}`)
      if (!container) return;

      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div")
        star.className = styles.star

        // Random position
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`

        // Random size
        const size = 1 + Math.random() * 3
        star.style.width = `${size}px`
        star.style.height = `${size}px`

        // Random animation delay
        star.style.animationDelay = `${Math.random() * 5}s`

        container.appendChild(star)
      }
    }

    // Create heart animation
    const createHeartAnimation = () => {
      const container = document.querySelector(`.${styles.starsContainer}`)
      if (!container) return;

      // Create heart outline with stars
      const heartPoints = []
      for (let i = 0; i < 360; i += 5) {
        const angle = (i * Math.PI) / 180

        // Heart curve formula
        const x = 16 * Math.pow(Math.sin(angle), 3)
        const y = 13 * Math.cos(angle) - 5 * Math.cos(2 * angle) - 2 * Math.cos(3 * angle) - Math.cos(4 * angle)

        // Scale and center
        const scaledX = 50 + x * 1.5
        const scaledY = 50 - y * 1.5

        heartPoints.push({ x: scaledX, y: scaledY })
      }

      // Create stars for heart outline
      const heartStarTimers = [];
      heartPoints.forEach((point, index) => {
        const timer = setTimeout(() => {
          const heartStar = document.createElement("div")
          heartStar.className = `${styles.star} ${styles.heartStar}`
          heartStar.style.left = `${point.x}%`
          heartStar.style.top = `${point.y}%`

          // Larger size for heart stars
          heartStar.style.width = "4px"
          heartStar.style.height = "4px"
          heartStar.style.backgroundColor = "var(--deep-pink)"; // Add color explicitly

          container.appendChild(heartStar)
        }, index * 20)
        heartStarTimers.push(timer);
      })

      return heartStarTimers;
    }

    // Create fireworks
    const createFireworks = () => {
      const fireworkInterval = setInterval(() => {
        const container = document.querySelector(`.${styles.starsContainer}`)
        if (!container) return;

        // Create firework
        const firework = document.createElement("div")
        firework.className = styles.firework

        // Random position
        firework.style.left = `${Math.random() * 100}%`
        firework.style.top = `${Math.random() * 100}%`

        // Random color
        const colors = ["#FF1493", "#FFD700", "#1E90FF", "#8A2BE2", "#00FF7F"]
        const color = colors[Math.floor(Math.random() * colors.length)]
        firework.style.backgroundColor = color;

        container.appendChild(firework)

        // Create particles
        const particleTimers = [];
        for (let i = 0; i < 20; i++) {
          const particle = document.createElement("div")
          particle.className = styles.particle
          particle.style.backgroundColor = color
          particle.style.left = firework.style.left
          particle.style.top = firework.style.top

          // Random direction
          const angle = Math.random() * Math.PI * 2
          const distance = 50 + Math.random() * 50

          particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`

          container.appendChild(particle)

          const timer = setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle)
            }
          }, 1000)
          particleTimers.push(timer);
        }

        const fireworkTimer = setTimeout(() => {
          if (firework.parentNode) {
            firework.parentNode.removeChild(firework)
          }
        }, 1000)

        return { fireworkTimer, particleTimers };
      }, 2000)

      return fireworkInterval;
    }

    // Execute all animations
    createStars();
    const heartTimer = setTimeout(createHeartAnimation, 3000);
    const fireworksInterval = createFireworks();

    // Cleanup function
    return () => {
      clearTimeout(visibleTimer);
      clearTimeout(messageTimer);
      clearTimeout(signatureTimer);
      clearTimeout(heartTimer);
      clearInterval(fireworksInterval);
    };
  }, [])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.starsContainer}></div>

      <div className={`${styles.content} ${visible ? styles.visible : ""}`}>
        <h2 className={styles.title}>Forever Yours</h2>

        <div className={`${styles.message} ${showMessage ? styles.visible : ""}`}>
          <p className="marathi-text">श्रुती, तुझं प्रेम माझ्यासाठी अमूल्य आहे.</p>
          <p>Shruti, your love is precious to me. We can spend a beautiful life together.</p>
          <p>
            Every moment with you is a blessing. Your smile, your dance, your presence - everything about you makes my
            life complete.
          </p>
          <p>
            I promise to cherish and honor your love, to be there for you in joy and sorrow, and to make every day
            special.
          </p>
        </div>

        <div className={styles.heartContainer}>
          <div className={styles.heart}></div>
        </div>

        {showSignature && (
          <div className={`${styles.signature} ${showSignature ? styles.visible : ""}`}>
            <p>With All My Love</p>
          </div>
        )}
      </div>
    </div>
  )
}

