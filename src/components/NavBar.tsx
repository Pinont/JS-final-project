import { useState, useEffect } from "react"
import type { View } from "../types"

interface NavBarProps {
  view: View
  setView: (v: View) => void
}

interface NavItem {
  id: string
  label: string
  isTeam?: boolean
}
const NAV_ITEMS: NavItem[] = [
  { id: "about", label: "About" },
  { id: "achievements", label: "Achievements" },
  { id: "testimonials", label: "Testimonials" },
  { id: "team", label: "Our Team", isTeam: true },
]

export default function NavBar({ view, setView }: NavBarProps) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  useEffect(() => {
    setMobileMenuOpen(false)
  }, [view])

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false)
    if (view !== "home") {
      setView("home")
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      const el = document.getElementById(targetId)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLogoClick = () => {
    setView("home")
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  const isTeamActive = view === "team" || view.startsWith("portfolio")

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:
          scrolled || mobileMenuOpen
            ? "rgba(var(--background-rgb), 0.95)"
            : "transparent",
        backdropFilter: scrolled || mobileMenuOpen ? "blur(12px)" : "none",
        borderBottom:
          scrolled || mobileMenuOpen
            ? "1px solid var(--border)"
            : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleLogoClick}
        >
          <svg
            width="32"
            height="32"
            viewBox="0 0 32 32"
            className="flex-shrink-0"
            aria-label="Brick logo"
          >
            <rect
              x="2"
              y="2"
              width="28"
              height="28"
              rx="3"
              fill="var(--primary)"
            />
            <line
              x1="2"
              y1="12"
              x2="30"
              y2="12"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="2"
              y1="22"
              x2="30"
              y2="22"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="2"
              x2="12"
              y2="12"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="22"
              y1="2"
              x2="22"
              y2="12"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="7"
              y1="12"
              x2="7"
              y2="22"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="17"
              y1="12"
              x2="17"
              y2="22"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="27"
              y1="12"
              x2="27"
              y2="22"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="22"
              x2="12"
              y2="30"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="22"
              y1="22"
              x2="22"
              y2="30"
              stroke="var(--background)"
              strokeWidth="2"
            />
          </svg>
          <span className="font-display font-semibold text-white text-lg tracking-tight">
            Brick
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              (item.isTeam && isTeamActive) || (!item.isTeam && view === "home")
            const baseColor = isActive
              ? "var(--primary)"
              : "var(--muted-foreground)"
            return (
              <button
                key={item.id}
                onClick={() =>
                  item.isTeam ? setView("team") : handleNavClick(item.id)
                }
                className="px-4 py-2 text-sm font-medium cursor-pointer transition-colors rounded"
                style={{ color: baseColor }}
                onMouseEnter={(e) => {
                  if (view === "home" || item.isTeam)
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--primary)"
                }}
                onMouseLeave={(e) => {
                  if (
                    (view === "home" && !item.isTeam) ||
                    (item.isTeam && !isTeamActive)
                  )
                    (e.currentTarget as HTMLElement).style.color =
                      "var(--muted-foreground)"
                }}
              >
                {item.label}
              </button>
            )
          })}
        </div>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-3">
          <button
            onClick={() => setView("team")}
            className="px-4 py-2 rounded text-sm font-semibold cursor-pointer transition-all"
            style={{ background: "var(--primary)", color: "var(--background)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.background = "var(--primary-hover)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.background = "var(--primary)")
            }
          >
            Meet the Team
          </button>
        </div>

        {/* Mobile Hamburger */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            className="text-[var(--muted-foreground)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary)] rounded p-2 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-4 border-t"
          style={{
            borderColor: "var(--border)",
            background: "var(--background)",
          }}
        >
          {NAV_ITEMS.map((item) =>
            item.isTeam ? (
              <button
                key={item.id}
                onClick={() => {
                  setView("team")
                  setMobileMenuOpen(false)
                }}
                className="text-left text-sm font-medium py-1.5 cursor-pointer"
                style={{
                  color: isTeamActive
                    ? "var(--primary)"
                    : "var(--muted-foreground)",
                }}
              >
                {item.label}
              </button>
            ) : (
              <button
                key={item.id}
                onClick={() => handleNavClick(item.id)}
                className="text-left text-sm font-medium text-[var(--muted-foreground)] hover:text-[var(--primary)] py-1.5 cursor-pointer"
              >
                {item.label}
              </button>
            ),
          )}
        </div>
      )}
    </nav>
  )
}
