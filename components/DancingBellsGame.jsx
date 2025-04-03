"use client"

import { useEffect, useState, useRef } from "react"
import styles from "./DancingBellsGame.module.css"

export default function DancingBellsGame({ onNavigate }) {
  const [score, setScore] = useState(0)
  const [gameActive, setGameActive] = useState(true)
  const [message, setMessage] = useState("")
  const [showButton, setShowButton] = useState(false)
  const containerRef = useRef(null)
  const bellsRef = useRef([])
  const targetScore = 10

  const compliments = [
    "तुझं नृत्य माझ्या हृदयाला आनंद देतं.",
    "meri bongya chuk jhali maaf kara",
    "Your smile lights up my entire day.",
    "Every moment with you feels magical.",
    "Love you",
    "You're the most beautiful person I know.",
    "aajao na please",
    "I'm so lucky to have you in my life.",
    "Your presence makes everything better.",
    "You're the rhythm of my heartbeat.",
  ]

  useEffect(() => {
    if (!gameActive) return;

    console.log("Game Active:", gameActive);
    console.log("Container Ref:", containerRef.current);

    if (!containerRef.current) return;

    const container = containerRef.current;
    const containerWidth = container.clientWidth;
    const containerHeight = container.clientHeight;

    // Ensure bellsRef is initialized
    if (!bellsRef.current) bellsRef.current = [];

    const createBell = () => {
      if (!gameActive || !containerRef.current) return;

      console.log("Creating a bell...");

      const bell = document.createElement("div");
      bell.className = styles.bell; // Using module CSS

      // Create CSS bell elements
      const bellInner = document.createElement("div");
      bellInner.className = "css-ghungroo";

      const bellBody = document.createElement("div");
      bellBody.className = "bell-body";

      const bellBottom = document.createElement("div");
      bellBottom.className = "bell-bottom";

      const bellClapper = document.createElement("div");
      bellClapper.className = "bell-clapper";

      // Append elements
      bellInner.appendChild(bellBody);
      bellInner.appendChild(bellBottom);
      bellInner.appendChild(bellClapper);
      bell.appendChild(bellInner);

      // Random position
      const leftPos = Math.random() * (containerWidth - 50);
      bell.style.left = `${leftPos}px`;

      // Random fall speed
      const fallDuration = 3 + Math.random() * 4;
      // Set animation explicitly
      bell.style.animation = `${styles.fall} ${fallDuration}s linear forwards`;
      
      // Append to DOM
      container.appendChild(bell);
      bellsRef.current.push(bell);

      console.log("Bell added at:", leftPos, "px");

      // Click handler
      const handleClick = () => {
        if (!gameActive) return;

        console.log("Bell clicked!");

        // Show compliment
        const compliment = compliments[Math.floor(Math.random() * compliments.length)];
        showCompliment(compliment, leftPos);

        // Remove bell
        if (bell.parentNode) {
          bell.parentNode.removeChild(bell);
          bellsRef.current = bellsRef.current.filter((b) => b !== bell);
        }

        // Update score safely
        setScore((prevScore) => {
          const newScore = prevScore + 1;

          if (newScore >= targetScore) {
            setGameActive(false);
            setMessage(
              "तुझ्या प्रेमाची गोडी अशीच कायम राहो. May the sweetness of your love always remain."
            );
            setShowButton(true);

            // Fireworks celebration
            createFireworks();
          }
          return newScore;
        });
      };

      bell.addEventListener("click", handleClick);

      // Remove after animation
      setTimeout(() => {
        if (bell && bell.parentNode) {
          bell.parentNode.removeChild(bell);
          bellsRef.current = bellsRef.current.filter((b) => b !== bell);
        }
        bell.removeEventListener("click", handleClick);
      }, fallDuration * 1000);
    };

    // Interval to create bells
    const bellInterval = setInterval(createBell, 800);

    return () => {
      clearInterval(bellInterval);
      console.log("Cleanup running...");

      // Cleanup remaining bells
      bellsRef.current.forEach((bell) => {
        if (bell.parentNode) {
          bell.parentNode.removeChild(bell);
        }
      });
      bellsRef.current = []; // Reset reference array
    };
  }, [gameActive, compliments]);

  const showCompliment = (text, leftPos) => {
    const container = containerRef.current;
    if (!container) return;

    const complimentEl = document.createElement("div");
    complimentEl.className = styles.compliment;
    complimentEl.textContent = text;
    complimentEl.style.left = `${leftPos}px`;
    complimentEl.style.top = "50%";

    container.appendChild(complimentEl);

    // Increased timeout for longer visibility (4 seconds)
    setTimeout(() => {
      if (complimentEl && complimentEl.parentNode) {
        complimentEl.parentNode.removeChild(complimentEl);
      }
    }, 4000);
  }

  const createFireworks = () => {
    // Get the container where fireworks should be displayed
    const container = containerRef.current.closest(`.${styles.pageContainer}`) || document.body;
    
    // Create fireworks container
    const fireworksContainer = document.createElement("div");
    fireworksContainer.className = "fireworks";
    container.appendChild(fireworksContainer);

    // Create multiple fireworks
    for (let i = 0; i < 20; i++) {
      setTimeout(() => {
        const firework = document.createElement("div");
        firework.className = "firework";

        // Random position
        firework.style.left = `${Math.random() * 100}%`;
        firework.style.top = `${Math.random() * 100}%`;

        // Random color
        const colors = ["#ff69b4", "#ffd700", "#ff6347", "#00bfff", "#9370db"];
        firework.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        // Random size
        const size = 5 + Math.random() * 15;
        firework.style.width = `${size}px`;
        firework.style.height = `${size}px`;

        // Add to DOM
        fireworksContainer.appendChild(firework);

        // Create particles for explosion effect
        for (let j = 0; j < 20; j++) {
          const particle = document.createElement("div");
          particle.className = "firework";
          particle.style.backgroundColor = firework.style.backgroundColor;
          particle.style.width = "3px";
          particle.style.height = "3px";
          particle.style.left = firework.style.left;
          particle.style.top = firework.style.top;

          // Properly set animation
          particle.style.animation = "explode 1s forwards";

          // Random direction for explosion
          const angle = Math.random() * Math.PI * 2;
          const distance = 50 + Math.random() * 50;
          
          // Use transform to position the particle
          particle.style.transform = `translate(${Math.cos(angle) * distance}px, ${Math.sin(angle) * distance}px)`;
          
          fireworksContainer.appendChild(particle);

          // Remove particle after animation
          setTimeout(() => {
            if (particle.parentNode) {
              particle.parentNode.removeChild(particle);
            }
          }, 1000);
        }

        // Remove main firework after animation
        setTimeout(() => {
          if (firework.parentNode) {
            firework.parentNode.removeChild(firework);
          }
        }, 1000);
      }, i * 300);
    }

    // Remove fireworks container after all animations
    setTimeout(() => {
      if (fireworksContainer.parentNode) {
        fireworksContainer.parentNode.removeChild(fireworksContainer);
      }
    }, 20 * 300 + 1000);
  }

  return (
    <div className={styles.pageContainer}>
      <div className={styles.gameContainer}>
        <h2 className={styles.title}>Catch the Dancing Bells</h2>

        <div className={styles.scoreContainer}>
          <p>
            Score: {score}/{targetScore}
          </p>
        </div>

        <div className={styles.gameArea} ref={containerRef}>
          {!gameActive && (
            <div className={styles.gameComplete}>
              <p className="marathi-text">{message}</p>
            </div>
          )}
        </div>

        <div className={styles.instructions}>
          <p>Click on the falling ghungroos (dance bells) to catch them!</p>
          <p>Each bell reveals a special message for you.</p>
        </div>

        <div className={styles.bellDisplay}>
          {[...Array(3)].map((_, i) => (
            <div key={i} className="css-ghungroo">
              <div className="bell-body"></div>
              <div className="bell-bottom"></div>
              <div className="bell-clapper"></div>
            </div>
          ))}
        </div>

        {showButton && (
          <div className={styles.buttonContainer}>
            <button className="romantic-button" onClick={onNavigate}>
              Continue to My Letter
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

