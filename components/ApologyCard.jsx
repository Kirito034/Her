"use client"

import { useEffect, useState } from "react"
import styles from "./ApologyCard.module.css"

export default function ApologyCard({ onNavigate }) {
  const [showPeacock, setShowPeacock] = useState(false)
  const [showNote, setShowNote] = useState(false)
  const [showMessage, setShowMessage] = useState(false)
  const [showButton, setShowButton] = useState(false)

  useEffect(() => {
    // Sequence the animations
    setTimeout(() => setShowPeacock(true), 500)
    setTimeout(() => setShowNote(true), 2000)
    setTimeout(() => setShowMessage(true), 3000)
    setTimeout(() => setShowButton(true), 4000)

    // Create floating elements
    const createFloatingElements = () => {
      const container = document.querySelector(`.${styles.pageContainer}`)
      const symbols = ["❤️", "✨", "💫", "🌟", "💖"]

      for (let i = 0; i < 10; i++) {
        const element = document.createElement("div")
        element.className = styles.floatingSymbol
        element.textContent = symbols[Math.floor(Math.random() * symbols.length)]

        // Random position
        element.style.left = `${Math.random() * 100}%`
        element.style.top = `${Math.random() * 100}%`

        // Random size
        const size = 16 + Math.random() * 16
        element.style.fontSize = `${size}px`

        // Random animation delay
        element.style.animationDelay = `${Math.random() * 5}s`

        container.appendChild(element)
      }
    }

    createFloatingElements()
  }, [])

  return (
    <div className={styles.pageContainer}>
      <div className={styles.content}>
        <h2 className={styles.title}>I'm Sorry, My Love</h2>

        <div className={styles.animationContainer}>
          <div className={`${styles.peacockContainer} ${showPeacock ? styles.visible : ""}`}>
            <div className="css-peacock">
              <div className="peacock-body"></div>
              <div className="peacock-head"></div>
              <div className="peacock-crest"></div>
              {[...Array(5)].map((_, i) => (
                <div key={i} className="peacock-feather"></div>
              ))}
              <div className="peacock-eye"></div>
            </div>
          </div>

          <div className={`${styles.noteContainer} ${showNote ? styles.visible : ""}`}>
            <div className={styles.note}>
              <div className={`${styles.noteInner} ${showMessage ? styles.open : ""}`}>
                <p className="marathi-text">माझ्या प्रिय श्रुती, माझ्या वागण्याने तुला दुखावले, त्याबद्दल मनःपूर्वक क्षमस्व.</p>
                <p>My dearest Shruti, I sincerely apologize for hurting you with my behavior.</p>
                <p>
                  Your smile brightens my day, and I miss seeing it. Every moment without your happiness feels
                  incomplete.
                </p>
                <p>I promise to be more thoughtful and considerate. Your feelings matter to me more than anything.</p>
              </div>
            </div>
          </div>
        </div>

        <div className={styles.decorativeElements}>
          <div className={styles.decorativeLine}></div>
          <div className={styles.decorativeCircle}></div>
          <div className={styles.decorativeSquare}></div>
        </div>

        <div className={`${styles.buttonContainer} ${showButton ? styles.visible : ""}`}>
          <button className="romantic-button" onClick={onNavigate}>
            Forgive Me
          </button>
        </div>

        <div className={styles.additionalText}>
          <p>Every relationship has its challenges, but true love finds a way through them.</p>
          <p>I'm committed to making things right and bringing back the joy we share.</p>
        </div>
      </div>
    </div>
  )
}

