"use client"

import { useEffect, useState, useRef } from "react"
import styles from "./LoveLetter.module.css"

export default function LoveLetter({ onNavigate }) {
  const [visible, setVisible] = useState(false)
  const letterRef = useRef(null)

  useEffect(() => {
    setTimeout(() => setVisible(true), 500)

    // Add scroll animation
    const handleScroll = () => {
      const scrollPosition = letterRef.current.scrollTop
      const maxScroll = letterRef.current.scrollHeight - letterRef.current.clientHeight
      const scrollPercentage = scrollPosition / maxScroll

      // Add parallax effect to decorative elements
      const decorations = document.querySelectorAll(`.${styles.decoration}`)
      decorations.forEach((decoration, index) => {
        const speed = 0.1 + index * 0.05
        const yPos = scrollPercentage * speed * 100
        decoration.style.transform = `translateY(${yPos}px)`
      })
    }

    if (letterRef.current) {
      letterRef.current.addEventListener("scroll", handleScroll)
    }

    // Create decorative elements
    const createDecorations = () => {
      const container = document.querySelector(`.${styles.parchment}`)
      const decorations = ["❤️", "💃", "🌸", "✨", "💖", "💕", "💫"]

      for (let i = 0; i < 7; i++) {
        const decoration = document.createElement("div")
        decoration.className = styles.decoration
        decoration.textContent = decorations[i]

        // Position
        decoration.style.top = `${10 + i * 12}%`
        decoration.style.left = i % 2 === 0 ? "5%" : "90%"

        container.appendChild(decoration)
      }
    }

    createDecorations()

    return () => {
      if (letterRef.current) {
        letterRef.current.removeEventListener("scroll", handleScroll)
      }
    }
  }, [])

  return (
    <div className={styles.pageContainer}>
      <div className={`${styles.letterContainer} ${visible ? styles.visible : ""}`}>
        <h2 className={styles.title}>Expressions from the Heart</h2>

        <div className={styles.scrollContainer} ref={letterRef}>
          <div className={styles.parchment}>
            <p className="marathi-text">प्रिय श्रुती,</p>
            <br />
            <p>My dearest Shruti,</p>
            <br />
            <p className="marathi-text">तू माझ्या आयुष्याचं प्रत्येक स्वप्न, तुझ्याशिवाय काहीच नाही माझं जग.</p>
            <br />
            <p>
              You are every dream in my life. Without you, my world is nothing. From the moment I first saw you, I knew
              you would become an essential part of my life.
            </p>
            <br />
            <p>
              Every movement in your dance is the rhythm of my heart. The sound of your footsteps is the music of my
              life. In your eyes, I see the entire world.
            </p>
            <br />
            <p>
              I know I make mistakes sometimes, but my love for you will never diminish. You are the most beautiful part
              of my life, and I want to live every moment with you.
            </p>
            <br />
            <p className="marathi-text">तुझ्या नृत्यातील प्रत्येक मुद्रा, प्रत्येक भाव मला मोहित करतो.</p>
            <br />
            <p>
              Every gesture in your dance, every expression captivates me. Your art is a reflection of your soul, and
              I'm proud of it.
            </p>
            <br />
            <p>The moments we've spent together are treasures of my life. I keep them safe in my heart.</p>
            <br />
            <p>Without your love, my life is incomplete. You give meaning to my life and make me whole.</p>
            <br />
            <p>I get lost in your love, and that's my favorite place to be.</p>
            <br />
            <p>Thank you for your love.</p>
            <br />
            <p>Forever yours,</p>

            <div className={styles.heartSignature}>
              <div className="heart"></div>
            </div>
          </div>
        </div>

        <div className={styles.buttonContainer}>
          <button className="romantic-button" onClick={onNavigate}>
            MAAF KARA NA
          </button>
        </div>
      </div>
    </div>
  )
}

