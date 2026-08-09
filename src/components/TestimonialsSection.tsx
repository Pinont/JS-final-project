import { useState, useEffect } from "react"

// ─── Data ────────────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    quote:
      "Brick migrated our entire secret infrastructure from Vault to Brick in 8 weeks with zero downtime. Their team understands the platform deeply — from PKI automation to agent proxy — and they transferred that knowledge to our engineers. Best vendor engagement we've had.",
    author: "Somsak Ch.",
    role: "VP Engineering",
    company: "Major Thai Commercial Bank",
    avatar: "SC",
    rating: 5,
  },
  {
    quote:
      "The agent proxy implementation was a game-changer for our AI platform. We went from managing hundreds of raw API keys across agent fleets to zero credentials in model context. Brick's team built the proxy layer, set up audit streaming, and got us compliant for our Series B audit in record time.",
    author: "Natthida R.",
    role: "CTO",
    company: "AI Lending Platform (Series B)",
    avatar: "NR",
    rating: 5,
  },
  {
    quote:
      "Certificate management used to be a monthly fire drill — 200+ domains, manual renewals, occasional outages. Brick implemented Brick PKI with ACME automation and multi-cloud sync. Zero expiries in 18 months. Our ops team reclaimed 40 hours/month.",
    author: "Pawat K.",
    role: "Head of Platform",
    company: "Thailand's Largest Marketplace",
    avatar: "PK",
    rating: 5,
  },
  {
    quote:
      "We needed JIT privileged access for production databases with full session recording for SOC 2. Brick deployed Brick PAM with Slack approval workflows and break-glass procedures. Auditor loved the evidence automation. Our engineers actually enjoy the workflow now.",
    author: "Siriporn T.",
    role: "Security Engineering Lead",
    company: "Fintech Unicorn",
    avatar: "ST",
    rating: 5,
  },
]

export const CLIENT_LOGOS = [
  { name: "Major Thai Bank", initials: "BK" },
  { name: "AI Lending Platform", initials: "AI" },
  { name: "National Marketplace", initials: "MP" },
  { name: "Fintech Unicorn", initials: "FU" },
  { name: "E-commerce Platform", initials: "EC" },
  { name: "Healthcare Provider", initials: "HP" },
  { name: "Logistics Conglomerate", initials: "LG" },
  { name: "Government Agency", initials: "GA" },
]

// ─── Section: Client Testimonials ────────────────────────────────────────────

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(
      () => setActive((a) => (a + 1) % TESTIMONIALS.length),
      5000,
    )
    return () => clearInterval(t)
  }, [])

  return (
    <section id="testimonials" className="py-24">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div
            className="font-mono text-xs mb-3"
            style={{ color: "var(--primary)" }}
          >
            CLIENT TESTIMONIALS
          </div>
          <h2
            className="font-display font-bold text-4xl md:text-5xl mb-4"
            style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
          >
            What our clients secured
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            Real feedback from engineering and security leaders who trust us
            with their Brick deployments.
          </p>
        </div>

        {/* Testimonial Cards */}
        <div className="relative h-[480px] md:h-[420px] mb-12">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-all duration-500"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "translateY(0)" : "translateY(20px)",
                pointerEvents: active === i ? "auto" : "none",
              }}
            >
              <div
                className="max-w-4xl mx-auto rounded-2xl p-8 md:p-12 text-center"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(t.rating)].map((_, j) => (
                    <svg
                      key={j}
                      width="20"
                      height="20"
                      fill="var(--primary)"
                      viewBox="0 0 24 24"
                    >
                      <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                    </svg>
                  ))}
                </div>
                <blockquote
                  className="text-xl md:text-2xl font-display font-light mb-8 leading-relaxed"
                  style={{
                    color: "var(--foreground)",
                    letterSpacing: "-0.01em",
                  }}
                >
                  "{t.quote}"
                </blockquote>
                <div className="flex items-center justify-center gap-3">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center font-mono text-sm font-bold"
                    style={{
                      background: "var(--primary)",
                      color: "var(--background)",
                    }}
                  >
                    {t.avatar}
                  </div>
                  <div className="text-left">
                    <div
                      className="text-base font-semibold"
                      style={{ color: "var(--foreground)" }}
                    >
                      {t.author}
                    </div>
                    <div
                      className="text-sm font-mono"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {t.role} · {t.company}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div className="flex justify-center gap-2 mb-16">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="w-2 h-2 rounded-full transition-all"
              style={{
                background: active === i ? "var(--primary)" : "var(--border)",
                width: active === i ? "24px" : "8px",
              }}
            />
          ))}
        </div>

        {/* Client Logos */}
        <div className="pt-8" style={{ borderTop: "1px solid var(--border)" }}>
          <div
            className="font-mono text-xs text-center mb-8"
            style={{ color: "var(--muted-foreground)" }}
          >
            TRUSTED BY SECURITY TEAMS AT
          </div>
          <div
            className="flex flex-wrap justify-center gap-8 items-center"
            style={{ opacity: 0.6 }}
          >
            {CLIENT_LOGOS.map((c) => (
              <div
                key={c.name}
                className="flex items-center gap-2 px-4 py-2 rounded-lg"
                style={{
                  background: "var(--muted)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="font-mono text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {c.initials}
                </span>
                <span
                  className="text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {c.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
