import { useState, useEffect } from "react"

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com", icon: "⌘" },
  { name: "LinkedIn", href: "https://linkedin.com", icon: "in" },
  { name: "Twitter", href: "https://twitter.com", icon: "𝕏" },
  { name: "Email", href: "mailto:hello@brick.co.th", icon: "✉" },
]

const FOOTER_LINKS = [
  {
    title: "Company",
    links: ["About", "Achievements", "Testimonials", "Team"],
  },
  {
    title: "Services",
    links: [
      "POS Development",
      "Web Development",
      "Mobile Apps",
      "Cyber Security",
    ],
  },
  {
    title: "Resources",
    links: ["Blog", "Case Studies", "Documentation", "Careers"],
  },
  {
    title: "Legal",
    links: ["Privacy Policy", "Terms of Service", "Cookie Policy"],
  },
]

// ─── Section: Footer ──────────────────────────────────────────────────────────

interface FooterProps {
  view: "home" | "team" | "portfolio-pm" | "portfolio-frontend" | "portfolio-uxui"
  setView: (
    v: "home" | "team" | "portfolio-pm" | "portfolio-frontend" | "portfolio-uxui",
  ) => void
}

export default function Footer({ view, setView }: FooterProps) {
  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    if (link === "Team") {
      e.preventDefault()
      setView("team")
      return
    }
    const targetId = link.toLowerCase()
    if (
      targetId === "about" ||
      targetId === "achievements" ||
      targetId === "testimonials"
    ) {
      e.preventDefault()
      if (view !== "home") {
        setView("home")
        setTimeout(() => {
          const el = document.getElementById(targetId)
          if (el) el.scrollIntoView({ behavior: "smooth" })
        }, 100)
        return
      }
      const el = document.getElementById(targetId)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <footer
      id="contact"
      style={{
        borderTop: "1px solid var(--border)",
        background: "var(--background)",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <svg
                width="40"
                height="40"
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
              <span className="font-display font-bold text-white text-xl tracking-tight">
                Brick
              </span>
            </div>
            <p
              className="text-sm leading-relaxed mb-6 max-w-sm"
              style={{ color: "var(--muted-foreground)" }}
            >
              Building digital infrastructure for Thailand's businesses. POS
              systems, web & mobile apps, cybersecurity — engineered to scale.
            </p>
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((s) => (
                <a
                  key={s.name}
                  href={s.href}
                  target="_blank"
                  rel="noreferrer"
                  className="w-10 h-10 rounded-lg flex items-center justify-center font-mono text-xs transition-colors"
                  style={{
                    background: "var(--card)",
                    border: "1px solid var(--border)",
                    color: "var(--muted-foreground)",
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor =
                      "var(--primary)"
                    ;(e.currentTarget as HTMLElement).style.color =
                      "var(--primary)"
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor =
                      "var(--border)"
                    ;(e.currentTarget as HTMLElement).style.color =
                      "var(--muted-foreground)"
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* Link columns */}
          {FOOTER_LINKS.map(({ title, links }) => (
            <div key={title}>
              <h4
                className="font-mono text-xs font-semibold mb-4"
                style={{ color: "var(--muted-foreground)" }}
              >
                {title}
              </h4>
              <ul className="space-y-3">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      onClick={(e) => handleLinkClick(e, l)}
                      className="text-sm transition-colors cursor-pointer"
                      style={{ color: "var(--muted-foreground)" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "var(--primary)")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color =
                          "var(--muted-foreground)")
                      }
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between pt-8"
          style={{ borderTop: "1px solid var(--border)" }}
        >
          <p
            className="font-mono text-xs"
            style={{ color: "var(--muted-foreground)" }}
          >
            © 2025 Brick Company Limited. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {["Privacy", "Terms", "Security", "Cookies"].map((t) => (
              <a
                key={t}
                href="#"
                className="font-mono text-xs transition-colors"
                style={{ color: "var(--muted-foreground)" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}
