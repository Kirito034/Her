"use client"

import { useEffect, useState } from "react"
import styles from "./LandingPage.module.css"

export default function LandingPage({ onNavigate }) {
  const [showLotus, setShowLotus] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Sequence the animations
    setTimeout(() => setShowLotus(true), 500)
    setTimeout(() => setShowMessage(true), 1500)
    setTimeout(() => setShowButton(true), 2500)

    // Create flower petals
    const createFlowerPetals = () => {
      const container = document.querySelector(`.${styles.pageContainer}`)
      for (let i = 0; i < 15; i++) {
        const petal = document.createElement("div")
        petal.className = styles.floatingPetal

        // Random color
        const colors = ["var(--light-pink)", "var(--deep-pink)", "var(--primary-pink)"]
        petal.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)]

        // Random position
        petal.style.left = `${Math.random() * 100}%`
        petal.style.top = `${Math.random() * 100}%`

        // Random size
        const size = 10 + Math.random() * 20
        petal.style.width = `${size}px`
        petal.style.height = `${size * 1.5}px`

        // Random rotation
        petal.style.transform = `rotate(${Math.random() * 360}deg)`

        // Random animation delay
        petal.style.animationDelay = `${Math.random() * 5}s`

        container.appendChild(petal)
      }
    }

    createFlowerPetals()
  }, [])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <h1 className={styles.title}>For My Beloved Shruti</h1>

        <div className={`${styles.lotusContainer} ${showLotus ? styles.visible : ""}`}>
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className={styles.lotusWrapper}
              style={{
                animationDelay: `${i * 0.3}s`,
                left: `${20 + i * 25}%`,
              }}
            >
              <div className="css-lotus">
                {[...Array(8)].map((_, j) => (
                  <div key={j} className="petal"></div>
                ))}
                <div className="lotus-center"></div>
              </div>
            </div>
          ))}
        </div>

        <div className={`${styles.message} ${showMessage ? styles.visible : ""}`}>
          <p className="marathi-text">प्रिय श्रुती, तुझ्या प्रेमासाठी ही एक छोटीशी भेट...</p>
          <p>My dearest Shruti, this is a small gift for your love...</p>
          <p>Every moment with you is precious, and I want to make things right.</p>
        </div>

        <div className={styles.decorativeElements}>
          <div className={styles.decorativeHeart}></div>
          <div className={styles.decorativeStar}></div>
          <div className={styles.decorativeCircle}></div>
        </div>

        <div className={`${styles.buttonContainer} ${showButton ? styles.visible : ""}`}>
          <button className="romantic-button" onClick={onNavigate}>
            Begin Our Journey
          </button>
        </div>

        <div className={styles.floatingElements}>
          <div className={styles.floatingElement} style={{ top: "10%", left: "10%" }}>
            💖
          </div>
          <div className={styles.floatingElement} style={{ top: "20%", right: "15%" }}>
            ✨
          </div>
          <div className={styles.floatingElement} style={{ bottom: "15%", left: "20%" }}>
            💫
          </div>
          <div className={styles.floatingElement} style={{ bottom: "25%", right: "10%" }}>
            💝
          </div>
        </div>
      </div>
    </div>
  )
}

