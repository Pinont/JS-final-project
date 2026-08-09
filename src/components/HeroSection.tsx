import { useState, useEffect } from "react"

const HERO_LINES = [
  "$ brick run -- node server.js",
  "✓ Injecting 12 secrets into environment",
  "✓ Agent proxy session initialized",
  "✓ Audit log entry created",
  "Server running on :3000",
]

// ─── Section: Hero ───────────────────────────────────────────────────────────

export default function HeroSection() {
  const [typedLines, setTypedLines] = useState<string[]>([])

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < HERO_LINES.length) {
        const line = HERO_LINES[i]
        if (line !== undefined) setTypedLines((prev) => [...prev, line])
        i++
      } else {
        clearInterval(interval)
      }
    }, 800)
    return () => clearInterval(interval)
  }, [])

  return (
    <section
      id="home"
      className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden grid-bg"
    >
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(168,255,62,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Accent glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "400px",
          right: "-100px",
          top: "20%",
          background:
            "radial-gradient(ellipse, rgba(185,79,255,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left — copy */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 font-mono text-xs"
              style={{
                background: "rgba(168,255,62,0.08)",
                border: "1px solid rgba(168,255,62,0.2)",
                color: "var(--primary)",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              Open-source Security Platform — Thailand
            </div>

            <h1
              className="font-display font-bold leading-none mb-6"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              <span style={{ color: "var(--foreground)" }}>Security</span>
              <br />
              <span style={{ color: "var(--foreground)" }}>infrastructure</span>
              <br />
              <span className="iridescent">for developers</span>
              <br />
              <span style={{ color: "var(--primary)" }}>and agents.</span>
            </h1>

            <p
              className="text-lg mb-10 max-w-lg leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              Manage secrets, certificates, and privileged access — without
              handing credentials to humans <em>or</em> AI agents. Open-source,
              SOC2 certified, and loved by 50,000+ engineers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <a
                href="#contact"
                className="px-6 py-3 rounded font-semibold text-sm transition-all animate-pulse-glow"
                style={{
                  background: "var(--primary)",
                  color: "var(--background)",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "var(--primary-hover)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "var(--primary)")
                }
              >
                Start for free →
              </a>
              <a
                href="#achievements"
                className="px-6 py-3 rounded font-semibold text-sm transition-all flex items-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "var(--foreground)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    "rgba(168,255,62,0.25)"
                  ;(e.currentTarget as HTMLElement).style.background =
                    "rgba(168,255,62,0.05)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)"
                  ;(e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.05)"
                }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                View our work
              </a>
            </div>

            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start">
              {["SOC 2 Type II", "ISO 27001", "Self-hostable"].map((t) => (
                <span
                  key={t}
                  className="flex items-center gap-1.5 text-xs font-mono"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  <svg
                    width="12"
                    height="12"
                    fill="none"
                    stroke="var(--primary)"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Right — terminal */}
          <div className="flex-1 w-full max-w-lg animate-float">
            <div
              className="rounded-xl overflow-hidden shadow-2xl"
              style={{
                border: "1px solid var(--border)",
                background: "#0a0c12",
              }}
            >
              {/* Terminal chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                  background: "var(--card)",
                  borderBottom: "1px solid var(--border)",
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#ff5f57" }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#febc2e" }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#28c840" }}
                />
                <span
                  className="ml-3 font-mono text-xs"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  brick — production
                </span>
              </div>
              <div className="p-5 font-mono text-sm min-h-[220px]">
                {typedLines.map((line, i) => (
                  <div
                    key={i}
                    className="mb-1 leading-relaxed"
                    style={{
                      color: line.startsWith("$")
                        ? "var(--primary)"
                        : line.startsWith("✓")
                          ? "#4ade80"
                          : line.startsWith("Server")
                            ? "var(--foreground)"
                            : "var(--muted-foreground)",
                    }}
                  >
                    {line}
                  </div>
                ))}
                {typedLines.length < HERO_LINES.length && (
                  <span
                    className="inline-block w-2 h-4 animate-blink"
                    style={{ background: "var(--primary)" }}
                  />
                )}
              </div>

              {/* Mini stats row */}
              <div
                className="grid grid-cols-3 divide-x divide-[var(--border)]"
                style={{
                  borderTop: "1px solid var(--border)",
                }}
              >
                {[
                  { k: "Secrets stored", v: "10B+" },
                  { k: "Fetched daily", v: "5M+" },
                  { k: "Developers", v: "100K+" },
                ].map(({ k, v }) => (
                  <div
                    key={k}
                    className="px-4 py-3 text-center"
                    style={{ borderRight: "1px solid var(--border)" }}
                  >
                    <div
                      className="font-mono text-xs mb-0.5"
                      style={{ color: "var(--primary)" }}
                    >
                      {v}
                    </div>
                    <div
                      className="font-mono text-xs"
                      style={{ color: "var(--muted-foreground)" }}
                    >
                      {k}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
