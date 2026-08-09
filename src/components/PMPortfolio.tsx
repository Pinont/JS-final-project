import type { View } from "../types"
import { useState } from "react"
import Navbar from "./pinont/Navbar"
import HeroSection from "./pinont/HeroSection"
import AboutSection from "./pinont/AboutSection"
import SkillsSection from "./pinont/SkillsSection"
import ProjectsSection from "./pinont/ProjectsSection"
import ContactSection from "./pinont/ContactSection"
import AsciiBackground from "./pinont/AsciiBackground"

interface PMPortfolioProps {
  setView: (v: View) => void
}

export default function PMPortfolio({ setView }: PMPortfolioProps) {
  const [lang, setLang] = useState<"EN" | "TH">("EN")
  const [theme, setTheme] = useState<"dark" | "light">("dark")

  // Override CSS custom properties for blue/sky theme (scoped to this section)
  const style = {
    "--background": "#090909",
    "--foreground": "#ffffff",
    "--card": "#0e1117",
    "--primary": "#60a5fa",
    "--primary-foreground": "#090909",
    "--muted": "#161b27",
    "--muted-foreground": "#94afd4",
    "--border": "#1e2d45",
    "--accent": "#38bdf8",
    "--accent-foreground": "#090909",
  } as React.CSSProperties

  return (
    <section
      className="relative min-h-screen pb-16 overflow-hidden"
      style={style}
    >
      <AsciiBackground />

      <div className="flex flex-col min-h-screen">
        <div className="flex-shrink-0 z-40 relative">
          <Navbar
            lang={lang}
            setLang={setLang}
            theme={theme}
            setTheme={setTheme}
            setView={setView}
          />
        </div>
        <main className="flex-1 min-h-0 overflow-y-auto relative z-10">
          <HeroSection lang={lang} />
          <AboutSection lang={lang} />
          <SkillsSection lang={lang} />
          <ProjectsSection lang={lang} />
          <ContactSection lang={lang} />
        </main>
      </div>
    </section>
  )
}
