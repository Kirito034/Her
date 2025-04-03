"use client"

import { useState } from "react"
import LandingPage from "@/components/LandingPage"
import ApologyCard from "@/components/ApologyCard"
import DancingBellsGame from "@/components/DancingBellsGame"
import LoveLetter from "@/components/LoveLetter"
import ClosingPage from "@/components/ClosingPage"
import "@/app/globals.css"

export default function Home() {
  const [currentPage, setCurrentPage] = useState("landing")

  const navigateTo = (page) => {
    setCurrentPage(page)
  }

  return (
    <main className="app-container">
      {currentPage === "landing" && <LandingPage onNavigate={() => navigateTo("apology")} />}
      {currentPage === "apology" && <ApologyCard onNavigate={() => navigateTo("game")} />}
      {currentPage === "game" && <DancingBellsGame onNavigate={() => navigateTo("letter")} />}
      {currentPage === "letter" && <LoveLetter onNavigate={() => navigateTo("closing")} />}
      {currentPage === "closing" && <ClosingPage />}
    </main>
  )
}

