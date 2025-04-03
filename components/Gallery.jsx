"use client"

import { useEffect, useState } from "react"
import styles from "./Gallery.module.css"

export default function Gallery({ onNavigate }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [visible, setVisible] = useState(false)

  const memories = [
    {
      title: "Our First Dance Performance Together",
      caption: "आपला पहिला डान्स परफॉरमन्स एकत्र",
      description: "Remember how nervous we both were? But when the music started, everything just flowed perfectly.",
    },
    {
      title: "That Special Moment in Your Dance",
      caption: "तुझ्या नृत्याचा तो विशेष क्षण",
      description: "The entire audience was mesmerized by your grace and talent. I was so proud to be with you.",
    },
    {
      title: "Our First Trip Together",
      caption: "आपला पहिला सहल",
      description:
        "Exploring new places with you makes every journey special. Your excitement makes even simple things extraordinary.",
    },
    {
      title: "When You First Danced for Me",
      caption: "तू जेव्हा पहिल्यांदा माझ्यासाठी नाचलीस",
      description:
        "A private performance that I'll cherish forever. Your eyes spoke volumes as you expressed yourself through dance.",
    },
    {
      title: "Our Special Day",
      caption: "आपला विशेष दिवस",
      description:
        "Every moment spent with you becomes a cherished memory. This day was particularly special for both of us.",
    },
  ]

  useEffect(() => {
    setTimeout(() => setVisible(true), 500)

    // Auto-rotate memories
    const interval = setInterval(() => {
      setActiveIndex((prevIndex) => (prevIndex + 1) % memories.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [memories.length])

  const goToSlide = (index) => {
    setActiveIndex(index)
  }

  return (
    <div className={styles.pageContainer}>
      <div className={`${styles.galleryContainer} ${visible ? styles.visible : ""}`}>
        <h2 className={styles.title}>Cherished Moments</h2>

        <div className={styles.carousel}>
          <div className={styles.carouselInner} style={{ transform: `translateX(-${activeIndex * 100}%)` }}>
            {memories.map((memory, index) => (
              <div key={index} className={styles.slide}>
                <div className={styles.memoryCard}>
                  <div className={styles.memoryVisual}>
                    <div className={styles.cssMemoryVisual}>
                      {/* CSS-based visual representation */}
                      <div
                        className={styles.visualElement}
                        style={{
                          backgroundColor: `hsl(${index * 60}, 80%, 75%)`,
                          backgroundImage: `radial-gradient(circle, hsl(${index * 60}, 80%, 75%) 0%, hsl(${index * 60}, 70%, 60%) 100%)`,
                        }}
                      ></div>

                      {/* Decorative elements */}
                      <div className={styles.decorElement} style={{ top: "10%", left: "10%" }}>
                        ✨
                      </div>
                      <div className={styles.decorElement} style={{ top: "20%", right: "15%" }}>
                        💃
                      </div>
                      <div className={styles.decorElement} style={{ bottom: "15%", left: "20%" }}>
                        💖
                      </div>

                      {/* Memory number */}
                      <div className={styles.memoryNumber}>{index + 1}</div>
                    </div>
                  </div>
                  <div className={styles.memoryContent}>
                    <h3>{memory.title}</h3>
                    <p className={`${styles.caption} marathi-text`}>{memory.caption}</p>
                    <p className={styles.description}>{memory.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className={styles.indicators}>
          {memories.map((_, index) => (
            <button
              key={index}
              className={`${styles.indicator} ${index === activeIndex ? styles.active : ""}`}
              onClick={() => goToSlide(index)}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className={styles.navigation}>
          <button
            className={styles.navButton}
            onClick={() => goToSlide((activeIndex - 1 + memories.length) % memories.length)}
            aria-label="Previous slide"
          >
            ❮
          </button>
          <button
            className={styles.navButton}
            onClick={() => goToSlide((activeIndex + 1) % memories.length)}
            aria-label="Next slide"
          >
            ❯
          </button>
        </div>

        <div className={styles.buttonContainer}>
          <button className="romantic-button" onClick={onNavigate}>
            Final Note
          </button>
        </div>
      </div>
    </div>
  )
}

