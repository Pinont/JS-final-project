interface HeroSectionProps {
  lang: "EN" | "TH"
}
import { useState, useEffect } from "react"
import AsciiText from "./AsciiText"
import GlowButton from "./GlowButton"
import { tr, TAGLINES_EN, TAGLINES_TH } from "./translations"

export default function HeroSection(props: HeroSectionProps) {
  const lang = "EN"
  const [taglineIdx, setTaglineIdx] = useState(0)
  const [taglineTrigger, setTaglineTrigger] = useState(true)

  useEffect(() => {
    const iv = setInterval(() => {
      setTaglineTrigger(false)
      setTimeout(() => {
        setTaglineIdx((i) => (i + 1) % TAGLINES_EN.length)
        setTaglineTrigger(true)
      }, 200)
    }, 3200)
    return () => clearInterval(iv)
  }, [])

  const taglines = lang === "EN" ? TAGLINES_EN : TAGLINES_TH

  return (
    <section
      id="hero"
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px 24px 40px",
        position: "relative",
        zIndex: 1,
        textAlign: "center",
      }}
    >
      {/* Top label */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.2em",
          color: "var(--muted-foreground)",
          marginBottom: 32,
          textTransform: "uppercase",
          opacity: 0.75,
        }}
      >
        ┌── PORTFOLIO ──┐
      </div>

      {/* Name */}
      <h1
        style={{
          margin: 0,
          lineHeight: 1.0,
          letterSpacing: "-0.02em",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
          fontWeight: 800,
        }}
      >
        <div
          style={{
            fontSize: "clamp(64px, 14vw, 108px)",
            color: "var(--foreground)",
          }}
        >
          <AsciiText text={tr("name1", lang)} trigger={true} speed={45} />
        </div>
        <div
          style={{
            fontSize: "clamp(36px, 7.5vw, 68px)",
            color: "var(--primary)",
          }}
        >
          <AsciiText text={tr("name2", lang)} trigger={true} speed={28} />
        </div>
      </h1>

      {/* Role */}
      <p
        style={{
          marginTop: 20,
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "clamp(12px, 2vw, 15px)",
          color: "var(--muted-foreground)",
          letterSpacing: "0.18em",
          textTransform: "uppercase",
        }}
      >
        {tr("hero_role", lang)}
      </p>

      {/* Rotating tagline */}
      <div
        style={{
          marginTop: 12,
          height: 28,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          overflow: "hidden",
        }}
      >
        <span
          style={{
            fontFamily: "'JetBrains Mono', monospace",
            fontSize: "clamp(13px, 1.8vw, 16px)",
            color: "var(--accent)",
            opacity: taglineTrigger ? 1 : 0,
            transition: "opacity 0.2s",
          }}
        >
          &gt; {taglines[taglineIdx]}
        </span>
      </div>

      {/* Bio */}
      <p
        style={{
          marginTop: 28,
          maxWidth: 520,
          fontSize: "clamp(14px, 1.6vw, 16px)",
          lineHeight: 1.7,
          color: "var(--muted-foreground)",
          fontFamily: "'Plus Jakarta Sans', sans-serif",
        }}
      >
        {tr("hero_sub", lang)}
      </p>

      {/* CTAs */}
      <div
        style={{
          marginTop: 40,
          display: "flex",
          gap: 12,
          flexWrap: "wrap",
          justifyContent: "center",
        }}
      >
        <GlowButton
          href="#projects"
          variant="primary"
          onClick={(e) => {
            e.preventDefault()
            document
              .getElementById("projects")
              ?.scrollIntoView({ behavior: "smooth" })
          }}
        >
          {tr("hero_cta_projects", lang)}
        </GlowButton>
        <GlowButton
          href="#"
          variant="outline"
          onClick={(e) => {
            e.preventDefault()
            window.dispatchEvent(new Event("open-chat"))
          }}
        >
          {tr("hero_cta_chat", lang)}
        </GlowButton>
      </div>

      {/* Bottom label */}
      <div
        style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: 12,
          letterSpacing: "0.2em",
          color: "var(--primary)",
          marginTop: 40,
          textTransform: "uppercase",
          opacity: 0.75,
        }}
      >
        └── scroll to explore ──┘
      </div>

      {/* Scroll indicator */}
      <div
        style={{
          position: "absolute",
          bottom: 32,
          left: "50%",
          transform: "translateX(-50%)",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          opacity: 0.3,
        }}
      >
        <div
          style={{
            width: 1,
            height: 40,
            background: "var(--primary)",
            animation: "pulse 2s infinite",
          }}
        />
      </div>
    </section>
  )
}
