interface NavbarProps {
  lang: "EN" | "TH"
  setLang: (l: "EN" | "TH") => void
  theme: "dark" | "light"
  setTheme: (t: "dark" | "light") => void
  setView: (v: any) => void
}
import { useState, useEffect } from "react"
import { tr, IS_AVAILABLE } from "./translations"

export default function Navbar(props: NavbarProps) {
  const { theme, setTheme, lang, setLang, setView } = props
  const [scrolled, setScrolled] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    setIsMobile(mq.matches)
    return () => mq.removeEventListener("change", handler)
  }, [])

  useEffect(() => {
    const main = document.querySelector("main")
    if (!main) return
    const onScroll = () => setScrolled(main.scrollTop > 40)
    main.addEventListener("scroll", onScroll)
    return () => main.removeEventListener("scroll", onScroll)
  }, [])

  const navLinks = [
    { key: "nav_about", href: "#about" },
    { key: "nav_skills", href: "#skills" },
    { key: "nav_projects", href: "#projects" },
    { key: "nav_github", href: "#github" },
    { key: "nav_contact", href: "#contact" },
  ]

  const scrollTo = (href: string) => {
    const id = href.replace("#", "")
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" })
  }

  const bg = scrolled
    ? theme === "dark"
      ? "rgba(9,9,9,0.95)"
      : "rgba(245,245,240,0.95)"
    : theme === "dark"
      ? "rgba(9,9,9,0.7)"
      : "rgba(245,245,240,0.7)"

  return (
    <nav
      style={{
        width: "100%",
        background: bg,
        backdropFilter: "blur(12px)",
        borderBottom: `1px solid ${scrolled ? "var(--border)" : "transparent"}`,
        transition: "all 0.3s",
      }}
    >
      {/* Main bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 16px",
          height: "clamp(52px, 7vw, 64px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 12,
        }}
      >
        {/* Logo + status pill */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          <button
            onClick={() => setView("team")}
            className="group flex items-center gap-1.5 text-[10px] font-mono text-[#6b7280] hover:text-[#60a5fa] transition-colors cursor-pointer border border-[#1e2d45] px-2.5 py-1 rounded bg-[#0f1117]"
          >
            <span>←</span> <span className="font-bold">TEAM</span>
          </button>
          <a
            href="#hero"
            onClick={(e) => {
              e.preventDefault()
              scrollTo("#hero")
            }}
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: "clamp(12px, 1.5vw, 15px)",
              fontWeight: 700,
              color: "var(--primary)",
              textDecoration: "none",
              letterSpacing: "0.08em",
            }}
          >
            Pinont<span style={{ color: "var(--primary)" }}>_</span>
          </a>
        </div>

        {/* Desktop nav links */}
        {!isMobile && (
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              flex: 1,
              justifyContent: "center",
            }}
          >
            {navLinks.map(({ key, href }) => (
              <a
                key={key}
                href={href}
                onClick={(e) => {
                  e.preventDefault()
                  scrollTo(href)
                }}
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(10px, 1vw, 12px)",
                  letterSpacing: "0.15em",
                  color: "var(--muted-foreground)",
                  textDecoration: "none",
                  padding: "6px 10px",
                  transition: "color 0.2s",
                  textTransform: "uppercase",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                {tr(key, lang)}
              </a>
            ))}
          </div>
        )}

        {/* Controls */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            flexShrink: 0,
          }}
        >
          {/* Lang slider */}
          <button
            onClick={() => setLang(lang === "EN" ? "TH" : "EN")}
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
              width: "clamp(60px, 8vw, 72px)",
              height: "clamp(26px, 3.5vw, 32px)",
              background: theme === "dark" ? "#1a1a1a" : "#e0e0da",
              border: "1px solid var(--border)",
              borderRadius: 4,
              cursor: "pointer",
              padding: 0,
              overflow: "hidden",
              flexShrink: 0,
            }}
          >
            <span
              style={{
                position: "absolute",
                top: 2,
                left: lang === "TH" ? 2 : "50%",
                width: "calc(50% - 4px)",
                height: "calc(100% - 4px)",
                background: "var(--primary)",
                borderRadius: 3,
                transition: "left 0.22s cubic-bezier(0.4,0,0.2,1)",
                zIndex: 0,
              }}
            />
            {(["TH", "EN"] as const).map((l) => (
              <span
                key={l}
                style={{
                  position: "relative",
                  zIndex: 1,
                  width: "50%",
                  textAlign: "center",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "clamp(9px, 1.1vw, 11px)",
                  fontWeight: 700,
                  letterSpacing: "0.06em",
                  color:
                    lang === l
                      ? "var(--primary-foreground)"
                      : "var(--muted-foreground)",
                  transition: "color 0.2s",
                  userSelect: "none",
                }}
              >
                {l}
              </span>
            ))}
          </button>
        </div>
      </div>
    </nav>
  )
}
