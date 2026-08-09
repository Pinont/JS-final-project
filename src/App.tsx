import { useState, useEffect } from "react"

import NavBar from "./components/NavBar"
import Home from "./components/Home"
import TeamSection from "./components/TeamSection"
import PMPortfolio from "./components/PMPortfolio"
import FrontendPortfolio from "./components/FrontendPortfolio"
import UXUIPortfolio from "./components/UXUIPortfolio"
import BrickLoader from "./components/BrickLoader"

type View = "home" | "team" | "portfolio-pm" | "portfolio-frontend" | "portfolio-uxui"

export default function App() {
  const [view, setView] = useState<View>("home")
  const [showLoader, setShowLoader] = useState(true)

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [view])

  // Show loader only on initial home view load
  useEffect(() => {
    if (view === "home") {
      setShowLoader(true)
      const timer = setTimeout(() => setShowLoader(false), 2800)
      return () => clearTimeout(timer)
    } else {
      setShowLoader(false)
    }
  }, [view])

  return (
    <div style={{ background: "var(--background)", minHeight: "100vh" }}>
      <NavBar view={view} setView={setView} />

      {showLoader && view === "home" && <BrickLoader />}

      {view === "home" && <Home />}

      {view === "team" && <TeamSection setView={setView} />}

      {view === "portfolio-pm" && <PMPortfolio setView={setView} />}

      {view === "portfolio-frontend" && <FrontendPortfolio setView={setView} />}

      {view === "portfolio-uxui" && <UXUIPortfolio setView={setView} />}
    </div>
  )
}
