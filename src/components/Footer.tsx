import { useState, useEffect } from "react"
import type { View } from "../types"
import { Mail } from "lucide-react"

function GithubIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
      <path d="M9 18c-4.51 2-5-2-7-2" />
    </svg>
  )
}

function LinkedinIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function XIcon(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" {...props}>
      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
    </svg>
  )
}

const SOCIAL_LINKS = [
  { name: "GitHub", href: "https://github.com", icon: GithubIcon },
  { name: "LinkedIn", href: "https://linkedin.com", icon: LinkedinIcon },
  { name: "Twitter", href: "https://twitter.com", icon: XIcon },
  { name: "Email", href: "mailto:hello@brick.co.th", icon: Mail },
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
  view: View
  setView: (v: View) => void
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
              {SOCIAL_LINKS.map((s) => {
                const IconComp = s.icon
                return (
                  <a
                    key={s.name}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={s.name}
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
                    <IconComp className="w-4 h-4" />
                  </a>
                )
              })}
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
