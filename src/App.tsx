import { useState, useEffect, lazy, Suspense } from "react"
import type { View } from "./types"

import NavBar from "./components/NavBar"
import Home from "./components/Home"
import BrickLoader from "./components/BrickLoader"

const TeamSection = lazy(() => import("./components/TeamSection"))
const PMPortfolio = lazy(() => import("./components/PMPortfolio"))
const FrontendPortfolio = lazy(() => import("./components/FrontendPortfolio"))
const UXUIPortfolio = lazy(() => import("./components/UXUIPortfolio"))

function ViewFallback() {
  return (
    <div
      className="flex min-h-screen items-center justify-center"
      style={{ background: "var(--background)" }}
      aria-hidden="true"
    >
      <div
        className="h-8 w-8 animate-spin rounded-full border-2"
        style={{
          borderColor: "var(--border)",
          borderTopColor: "var(--primary)",
        }}
      />
    </div>
  )
}

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
      {view !== "portfolio-frontend" && (
        <NavBar view={view} setView={setView} />
      )}

      {showLoader && view === "home" && <BrickLoader />}

      <Suspense fallback={<ViewFallback />}>
        {view === "home" && <Home setView={setView} />}

        {view === "team" && <TeamSection setView={setView} />}

        {view === "portfolio-pm" && <PMPortfolio setView={setView} />}

        {view === "portfolio-frontend" && (
          <FrontendPortfolio setView={setView} />
        )}

        {view === "portfolio-uxui" && <UXUIPortfolio setView={setView} />}
      </Suspense>
    </div>
  )
}
