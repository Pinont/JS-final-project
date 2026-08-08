import { useState } from "react"

export default function UXUIPortfolio({
  setView,
}: {
  setView: (v: any) => void
}) {
  const [theme, setTheme] = useState<"lime" | "purple" | "cyan" | "orange">(
    "cyan",
  )
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md")
  const [glowEnabled, setGlowEnabled] = useState(true)
  const [backdropOpacity, setBackdropOpacity] = useState(85)

  const themeColors = {
    lime: {
      primary: "#a8ff3e",
      text: "Neon Lime",
    },
    purple: {
      primary: "#b94fff",
      text: "Creative Purple",
    },
    cyan: {
      primary: "#00d4ff",
      text: "Electric Cyan",
    },
    orange: {
      primary: "#ff6b35",
      text: "Sunset Orange",
    },
  }

  const activeTheme = themeColors[theme]

  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden grid-bg">
      {/* Background Radial Glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-6xl mx-auto px-6 w-full animate-fade-in-up">
        {/* Navigation & Header */}
        <div className="flex justify-between items-center mb-10">
          <button
            onClick={() => setView("team")}
            className="px-4 py-2 rounded font-mono text-xs font-semibold cursor-pointer transition-colors"
            style={{
              color: "#9ca3af",
              border: "1px solid #1e2230",
              background: "#0f1117",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#00d4ff"
              ;(e.currentTarget as HTMLElement).style.color = "#00d4ff"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
              ;(e.currentTarget as HTMLElement).style.color = "#9ca3af"
            }}
          >
            ← Back to Team
          </button>

          <span className="font-mono text-xs text-[#00d4ff] font-bold">
            PORTFOLIO // MEMBER 03
          </span>
        </div>

        {/* Member Profile Hero (Original 2-Column Grid Layout) */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 mb-16 items-center">
          {/* Left Column Profile Hero */}
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div
              className="w-36 h-36 rounded-2xl flex items-center justify-center mb-6 overflow-hidden relative shadow-lg"
              style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.25)",
              }}
            >
              <img
                src="/ProfilePhooriwat.jpg"
                alt="Phooriwat Suphakkanok"
                className="w-full h-full object-cover transition-transform"
                style={{
                  transform: "scale(1.3)",
                  transformOrigin: "65% 20%",
                }}
              />
            </div>
            <h1 className="font-display font-bold text-3xl md:text-3xl text-white mb-4">
              Phooriwat Suphakkanok
            </h1>
            <span
              className="inline-block font-mono text-xs px-3 py-1 rounded-full mb-4 font-semibold"
              style={{
                background: "rgba(0,212,255,0.12)",
                color: "#00d4ff",
                border: "1px solid rgba(0,212,255,0.25)",
              }}
            >
              UX/UI Designer (UX/UI)
            </span>

            <a
              href="https://phoo3011.me"
              target="_blank"
              rel="noreferrer"
              className="px-4 py-2.5 rounded-lg font-semibold text-xs transition-all cursor-pointer flex items-center gap-2"
              style={{
                background: "rgba(0, 212, 255, 0.1)",
                color: "#00d4ff",
                border: "1px solid rgba(0, 212, 255, 0.2)",
              }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.background = "#00d4ff"
                ;(e.currentTarget as HTMLElement).style.color = "#09090e"
                ;(e.currentTarget as HTMLElement).style.borderColor = "#00d4ff"
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.background =
                  "rgba(0, 212, 255, 0.1)"
                ;(e.currentTarget as HTMLElement).style.color = "#00d4ff"
                ;(e.currentTarget as HTMLElement).style.borderColor =
                  "rgba(0, 212, 255, 0.2)"
              }}
            >
              🌐 Visit Portfolio ↗
            </a>
          </div>

          {/* Right Column Basic Info Box */}
          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "#0f1117", border: "1px solid #1e2230" }}
          >
            <div className="font-mono text-xs mb-3 text-[#00d4ff] font-bold">
              BASIC INFO
            </div>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  NAME:
                </div>
                <div className="text-white font-semibold font-display">
                  Phooriwat Suphakkanok
                </div>
              </div>
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  ROLE IN COMPANY:
                </div>
                <div className="text-[#00d4ff] font-semibold">
                  UX/UI Designer
                </div>
              </div>
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  LOCATION:
                </div>
                <div className="text-white">Bangkok, Thailand</div>
              </div>
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  CONTACT:
                </div>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=phooriwat3011@gmail.com"
                  target="_blank"
                  rel="noreferrer"
                  className="text-white hover:text-[#00d4ff] hover:underline font-mono text-xs block transition-colors mt-0.5"
                >
                  phooriwat3011@gmail.com ↗
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive UI Design System Playground */}
        <div className="mb-16">
          <div className="font-mono text-xs text-[#00d4ff] mb-1 font-bold">
            INTERACTIVE EXPERIENCE
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-3">
            Design Token & UI Component Playground
          </h2>
          <p className="text-sm text-[#6b7280] mb-8 max-w-3xl leading-relaxed">
            Adjust the design tokens in the controller panel below to see how the
            UI component card adapts color palettes, typography scale,
            glassmorphism opacity, and glow shadows in real time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
            {/* Component Preview Card */}
            <div className="rounded-xl flex items-center justify-center p-8 bg-[#06080b] border border-[#1e2230] relative overflow-hidden">
              <div
                className="absolute inset-0 blur-3xl opacity-10 pointer-events-none transition-all duration-500"
                style={{ background: activeTheme.primary }}
              />

              <div
                className="w-full max-w-sm rounded-xl p-6 relative overflow-hidden transition-all duration-300"
                style={{
                  background: `rgba(15, 17, 23, ${backdropOpacity / 100})`,
                  border: `1px solid ${
                    glowEnabled ? activeTheme.primary : "#1e2230"
                  }`,
                  boxShadow: glowEnabled
                    ? `0 0 35px ${activeTheme.primary}20`
                    : "none",
                }}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center font-mono text-[10px] font-bold"
                      style={{
                        background: activeTheme.primary,
                        color: "#09090e",
                      }}
                    >
                      ❖
                    </div>
                    <span className="font-display font-semibold text-white text-xs">
                      Playground
                    </span>
                  </div>
                  <span
                    className="font-mono text-[9px] px-2 py-0.5 rounded border border-[#1e2230]"
                    style={{
                      color: activeTheme.primary,
                      borderColor: `${activeTheme.primary}40`,
                      background: `${activeTheme.primary}08`,
                    }}
                  >
                    {fontSize.toUpperCase()} SCALE
                  </span>
                </div>

                {/* Body Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-mono text-[10px] text-[#6b7280] mb-0.5 uppercase font-bold">
                      PORTFOLIO_URL
                    </h3>
                    <a
                      href="https://phoo3011.me"
                      target="_blank"
                      rel="noreferrer"
                      className="font-mono font-medium rounded border border-[#1e2230] p-2 bg-[#09090e] tracking-wide flex items-center justify-between transition-all hover:border-[#00d4ff]/60 cursor-pointer group block"
                      style={{
                        fontSize:
                          fontSize === "sm"
                            ? "10px"
                            : fontSize === "md"
                              ? "12px"
                              : "14px",
                        color: activeTheme.primary,
                      }}
                    >
                      <span>phoo3011.me</span>
                      <span className="text-[10px] opacity-70 group-hover:opacity-100 group-hover:translate-x-0.5 transition-all">
                        ↗
                      </span>
                    </a>
                  </div>

                  <div>
                    <h3 className="font-mono text-[10px] text-[#6b7280] mb-0.5 uppercase font-bold">
                      DESIGN SPECIFICATION
                    </h3>
                    <p
                      className="text-[#9ca3af] leading-relaxed"
                      style={{
                        fontSize:
                          fontSize === "sm"
                            ? "11px"
                            : fontSize === "md"
                              ? "13px"
                              : "15px",
                      }}
                    >
                      Crafting intuitive design systems, high-fidelity prototypes,
                      and user-centered digital interfaces.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controller Panel */}
            <div
              className="rounded-xl p-6 flex flex-col gap-6"
              style={{ background: "#0f1117", border: "1px solid #1e2230" }}
            >
              <div className="font-mono text-xs text-white border-b border-[#1e2230] pb-2 font-bold">
                CONTROLS
              </div>

              {/* Theme Switch */}
              <div>
                <label className="block font-mono text-[10px] text-[#6b7280] mb-2 uppercase font-bold">
                  Theme Color Token
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(
                    Object.keys(themeColors) as Array<keyof typeof themeColors>
                  ).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`px-3 py-2 rounded text-xs font-mono border cursor-pointer text-left transition-all ${
                        theme === t
                          ? "text-[#0f1117] font-bold"
                          : "border-[#1e2230] text-[#9ca3af] hover:border-[#00d4ff]/40"
                      }`}
                      style={{
                        background:
                          theme === t ? themeColors[t].primary : "#09090e",
                        borderColor:
                          theme === t ? themeColors[t].primary : "#1e2230",
                      }}
                    >
                      {themeColors[t].text.split(" ").pop()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Switch */}
              <div>
                <label className="block font-mono text-[10px] text-[#6b7280] mb-2 uppercase font-bold">
                  Typography Scale
                </label>
                <div className="flex gap-2">
                  {(["sm", "md", "lg"] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSize(sz)}
                      className={`flex-1 py-1.5 rounded font-mono text-xs border cursor-pointer transition-colors ${
                        fontSize === sz
                          ? "border-[#00d4ff] text-[#00d4ff]"
                          : "border-[#1e2230] text-[#6b7280] hover:text-[#9ca3af]"
                      }`}
                      style={{ background: "#09090e" }}
                    >
                      {sz.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Glow */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#6b7280] uppercase font-bold">
                  Box Glow Effect
                </span>
                <button
                  onClick={() => setGlowEnabled(!glowEnabled)}
                  className={`w-12 h-6 rounded-full transition-all cursor-pointer relative p-0.5 ${
                    glowEnabled
                      ? "bg-[#00d4ff]"
                      : "bg-[#1a1d26] border border-[#1e2230]"
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full bg-[#09090e] transition-transform"
                    style={{
                      transform: glowEnabled
                        ? "translateX(24px)"
                        : "translateX(0)",
                    }}
                  />
                </button>
              </div>

              {/* Backdrop Opacity Slider */}
              <div>
                <div className="flex justify-between font-mono text-[10px] text-[#6b7280] mb-2">
                  <span className="font-bold">BACKDROP OPACITY</span>
                  <span className="text-[#00d4ff]">{backdropOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={backdropOpacity}
                  onChange={(e) => setBackdropOpacity(Number(e.target.value))}
                  className="w-full h-1 bg-[#09090e] border border-[#1e2230] rounded-lg appearance-none cursor-pointer accent-[#00d4ff]"
                />
              </div>
            </div>
          </div>
        </div>



        {/* Portfolio Circle Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-[#1e2230]">
          <button
            onClick={() => setView("portfolio-frontend")}
            className="text-xs font-mono text-[#6b7280] hover:text-white transition-colors cursor-pointer"
          >
            ← Previous Portfolio (Thanatphong)
          </button>
          <button
            onClick={() => setView("portfolio-pm")}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all cursor-pointer"
            style={{ background: "#00d4ff", color: "#09090e" }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#80e9ff")
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background = "#00d4ff")
            }
          >
            Next Portfolio (Nonnipat) →
          </button>
        </div>
      </div>
    </section>
  )
}
