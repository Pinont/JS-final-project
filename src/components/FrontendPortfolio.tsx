import { useState, useEffect, useRef } from "react"

export default function FrontendPortfolio({
  setView,
}: {
  setView: (v: any) => void
}) {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to Thanatphong's secure CLI developer portfolio.",
    "Type a command or click a preset below to begin.",
  ])
  const [inputVal, setInputVal] = useState("")
  const terminalBottomRef = useRef<HTMLDivElement>(null)

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase()
    let output: string[] = []

    switch (cleanCmd) {
      case "help":
        output = [
          "Available commands:",
          "  help     - Show list of available commands",
          "  skills   - List technical skills and proficiency",
          "  projects - List developed web projects",
          "  secret   - Decrypt secure environment variables",
          "  contact  - Show direct developer contact channels",
          "  clear    - Clear terminal screen",
        ]
        break
      case "skills":
        output = [
          "┌──────────────────────┬─────────────┐",
          "│ Skill                │ Proficiency │",
          "├──────────────────────┼─────────────┤",
          "│ React 19 & TS        │ Expert      │",
          "│ Tailwind CSS v4      │ Expert      │",
          "│ Vite & Bundling      │ Advanced    │",
          "│ Web Cryptography API │ Advanced    │",
          "│ Node.js & Docker     │ Intermediate│",
          "└──────────────────────┴─────────────┘",
        ]
        break
      case "projects":
        output = [
          "Featured Projects:",
          "  1. Infisical CLI Dashboard - Ephemeral secret manager",
          "  2. Secure PKI Portal - Automatic SSL certificate issuance",
          "  3. Real-time Log Auditor - SOC 2 compliant session replayer",
        ]
        break
      case "secret":
        output = [
          "🔓 Decrypting environment credentials...",
          "  DATABASE_URL = postgres://thanatphong:••••••••••••@localhost:5432/main_db",
          "  API_KEY      = tf-live_6b820fac9ee1a48c909e74d1a0120b08",
          "  JWT_SECRET   = sec_jwt_99f2a0134bc5ee9712a02b1f83c0",
          "✓ Session verified. Audit logs recorded.",
        ]
        break
      case "contact":
        output = [
          "Contact Channels:",
          "  Email:    dev.thanatphong@infisical-team.io",
          "  GitHub:   github.com/thanatphong-dev",
          "  LinkedIn: linkedin.com/in/thanatphong-tharin",
        ]
        break
      case "clear":
        setTerminalHistory([])
        return
      default:
        output = [
          `Command not found: "${cmd}". Type "help" for a list of commands.`,
        ]
    }

    setTerminalHistory((prev) => [...prev, `$ ${cmd}`, ...output])
  }

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [terminalHistory])

  const skillsData = [
    { name: "React 19 & React DOM", rate: 95 },
    { name: "TypeScript & JavaScript", rate: 90 },
    { name: "Tailwind CSS v4 & responsive designs", rate: 92 },
    { name: "Vite Bundler & Build Tooling", rate: 85 },
  ]

  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden grid-bg">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(168,255,62,0.06) 0%, transparent 75%)",
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
              ;(e.currentTarget as HTMLElement).style.borderColor = "#a8ff3e"
              ;(e.currentTarget as HTMLElement).style.color = "#a8ff3e"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
              ;(e.currentTarget as HTMLElement).style.color = "#9ca3af"
            }}
          >
            ← Back to Team (กลับหน้าทีม)
          </button>

          <span className="font-mono text-xs text-[#a8ff3e] font-bold">
            PORTFOLIO // MEMBER 02
          </span>
        </div>

        {/* Member Profile Hero */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 mb-16 items-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div
              className="w-36 h-36 rounded-2xl flex items-center justify-center mb-6"
              style={{
                background: "rgba(168,255,62,0.08)",
                border: "1px solid rgba(168,255,62,0.2)",
              }}
            >
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                className="w-24 h-24 text-[#a8ff3e]"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="6 3"
                />
                <text
                  x="50"
                  y="58"
                  fontWeight="bold"
                  fontFamily="monospace"
                  fontSize="24"
                  fill="currentColor"
                  textAnchor="middle"
                >
                  &lt;/&gt;
                </text>
              </svg>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-1">
              Thanatphong Tharin
            </h1>
            <div className="font-display text-lg text-[#9ca3af] mb-4">
              ธณัฐพงค์ ทะรินทร์
            </div>
            <span
              className="inline-block font-mono text-xs px-3 py-1 rounded-full mb-6 font-semibold"
              style={{
                background: "rgba(168,255,62,0.12)",
                color: "#a8ff3e",
                border: "1px solid rgba(168,255,62,0.25)",
              }}
            >
              Frontend Developer (Frontend)
            </span>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "#0f1117", border: "1px solid #1e2230" }}
          >
            <div className="font-mono text-xs mb-3 text-[#a8ff3e] font-bold">
              BASIC INFO (ประวัติส่วนตัว)
            </div>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  NAME:
                </div>
                <div className="text-white font-semibold font-display">
                  Thanatphong Tharin
                </div>
                <div className="text-[#9ca3af] text-xs font-display">
                  ธณัฐพงค์ ทะรินทร์
                </div>
              </div>
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  ROLE IN COMPANY:
                </div>
                <div className="text-[#a8ff3e] font-semibold">
                  Lead Frontend Developer
                </div>
              </div>
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  OFFICE LOCATION:
                </div>
                <div className="text-white">Bangkok, Thailand</div>
              </div>
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  CONTACT:
                </div>
                <div className="text-white font-mono">
                  dev.thanatphong@infisical-team.io
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Terminal Simulator */}
        <div className="mb-16">
          <div className="font-mono text-xs text-[#a8ff3e] mb-1 font-bold">
            INTERACTIVE EXPERIENCE
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-3">
            Developer Console Terminal
          </h2>
          <p className="text-sm text-[#6b7280] mb-6 max-w-3xl leading-relaxed">
            Click the preset command buttons below to interact with the
            simulated shell developer tool. You can query my skill levels,
            decrypt secrets, or clear terminal outputs.
          </p>

          <div
            className="rounded-xl overflow-hidden shadow-2xl"
            style={{ border: "1px solid #1e2230", background: "#080a0f" }}
          >
            {/* Terminal chrome */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: "#0f1117",
                borderBottom: "1px solid #1e2230",
              }}
            >
              <div className="flex items-center gap-2">
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
                <span className="ml-3 font-mono text-xs text-[#4b5563]">
                  thanatphong@infisical-terminal: ~
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#4b5563]">
                active session
              </span>
            </div>

            {/* Terminal Output history */}
            <div className="p-5 font-mono text-xs leading-relaxed min-h-[250px] max-h-[350px] overflow-y-auto bg-[#05070a]">
              {terminalHistory.map((line, i) => {
                let color = "#6b7280"
                if (line.startsWith("$")) color = "#a8ff3e"
                else if (
                  line.startsWith("🔓") ||
                  line.includes("DATABASE_URL") ||
                  line.includes("API_KEY")
                )
                  color = "#fbbf24"
                else if (line.startsWith("✓")) color = "#4ade80"
                else if (
                  line.startsWith("┌") ||
                  line.startsWith("├") ||
                  line.startsWith("└") ||
                  line.startsWith("│")
                )
                  color = "#38bdf8"
                else if (
                  line.includes("Welcome") ||
                  line.includes("Featured Projects")
                )
                  color = "#f0f2f5"

                return (
                  <div
                    key={i}
                    className="mb-1 whitespace-pre-wrap"
                    style={{ color }}
                  >
                    {line}
                  </div>
                )
              })}
              <div ref={terminalBottomRef} />
            </div>

            {/* Terminal input/presets */}
            <div className="p-4 flex flex-col gap-3 border-t border-[#1e2230] bg-[#0b0e14]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-[#6b7280]">
                  Presets:
                </span>
                {[
                  "help",
                  "skills",
                  "projects",
                  "secret",
                  "contact",
                  "clear",
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleCommand(preset)}
                    className="px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors cursor-pointer border border-[#1e2230] hover:border-[#a8ff3e] hover:text-[#a8ff3e]"
                    style={{ background: "#0f1117", color: "#9ca3af" }}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (inputVal.trim()) {
                    handleCommand(inputVal)
                    setInputVal("")
                  }
                }}
                className="flex gap-2"
              >
                <span className="font-mono text-xs text-[#a8ff3e] flex items-center select-none">
                  $
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type a command (e.g. skills)..."
                  className="flex-1 bg-transparent border-none text-[#f0f2f5] font-mono text-xs focus:ring-0 focus:outline-none p-0"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Tech Stack Skills Meters */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-16"
          style={{ background: "#0f1117", border: "1px solid #1e2230" }}
        >
          <div className="font-mono text-xs mb-3 text-[#a8ff3e] font-bold">
            METRIC ANALYSIS
          </div>
          <h3 className="font-display font-semibold text-xl text-white mb-6">
            Expertise Stack Proficiency
          </h3>
          <div className="space-y-5">
            {skillsData.map((sk) => (
              <div key={sk.name}>
                <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
                  <span className="text-[#e8eaf0]">{sk.name}</span>
                  <span className="text-[#a8ff3e]">{sk.rate}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1e2230]">
                  <div
                    className="h-full rounded-full bg-[#a8ff3e] transition-all duration-1000"
                    style={{ width: `${sk.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Circle Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-[#1e2230]">
          <button
            onClick={() => setView("portfolio-pm")}
            className="text-xs font-mono text-[#6b7280] hover:text-white transition-colors cursor-pointer"
          >
            ← Previous Portfolio (Nonniphat)
          </button>
          <button
            onClick={() => setView("portfolio-uxui")}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all cursor-pointer"
            style={{ background: "#a8ff3e", color: "#09090e" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#bfff5c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#a8ff3e")}
          >
            Next Portfolio (Phuriwat) →
          </button>
        </div>
      </div>
    </section>
  )
}
