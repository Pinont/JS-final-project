import { useState, useEffect, useRef, useCallback } from "react"

const PRESET_COMMANDS = [
  "help",
  "skills",
  "projects",
  "secret",
  "cv",
  "contact",
  "clear",
]

const COMMAND_OUTPUTS: Record<string, string[] | (() => void)> = {
  help: [
    "Available Commands in simulated shell:",
    "  help     - Show instructions list",
    "  skills   - List technical profile stack",
    "  projects - Summarize production categories",
    "  secret   - Decrypt environment database credentials",
    "  cv       - Switch view and open detailed Curriculum Vitae",
    "  contact  - Display mail and social channels links",
    "  clear    - Clear console display",
  ],
  skills: [
    "⚡ Technical Stack Matrix:",
    "  Frontend:     TypeScript, Next.js, React 19, Tailwind CSS",
    "  Backend:      Node.js, Express, Java Spring Boot, RESTful APIs",
    "  Databases:    PostgreSQL, MongoDB, Redis, Prisma, H2 DB",
    "  DevOps/OS:    Linux (Arch/Zsh), Docker, Git, CI/CD Actions",
  ],
  projects: [
    "💻 Project Showcases:",
    "  - AutoOS:       WinUI 3 Migrator (Native AOT Windows config tool)",
    "  - DotDoctor:    Hyprland dotfiles doctor dependency scanner",
    "  - aim4-mod:     Java Autonomous Vehicle micro-simulator fork",
    "  - AEGIS-1:      Twine & SugarCube atmospheric psychological game",
  ],
  secret: [
    "🔓 Decrypting environment credentials...",
    "  DATABASE_URL = postgres://thanatphong:••••••••••••@localhost:5432/main_db",
    "  API_KEY      = tf-live_6b820fac9ee1a48c909e74d1a0120b08",
    "  JWT_SECRET   = sec_jwt_99f2a0134bc5ee9712a02b1f83c0",
    "✓ Session verified. Audit logs recorded.",
  ],
  contact: [
    "Contact Channels:",
    "  Email:    thanatphong2719@gmail.com",
    "  GitHub:   github.com/WinTuner",
    "  LinkedIn: linkedin.com/in/thanatphong-tharin",
  ],
}

export const TerminalConsole: React.FC = () => {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to Thanatphong's secure CLI developer portfolio.",
    "Type a command or click a preset below to begin.",
  ])
  const [inputVal, setInputVal] = useState("")
  const terminalBottomRef = useRef<HTMLDivElement>(null)

  // Full Console shell interpreter
  const handleCommand = useCallback((cmdStr: string) => {
    const cmd = cmdStr.trim().toLowerCase()
    if (!cmd) return

    if (cmd === "clear") {
      setTerminalHistory([])
      return
    }

    if (cmd === "cv") {
      setTerminalHistory((prev) => [
        ...prev,
        `$ ${cmd}`,
        "📄 Opening CV / Resume tab in this view...",
        "✓ Switch view triggered successfully.",
      ])
      return
    }

    const output = COMMAND_OUTPUTS[cmd] ?? [
      `Command not found: "${cmd}". Type "help" for a list of commands.`,
    ]
    setTerminalHistory((prev) => [...prev, `$ ${cmd}`, ...output as string[]])
  }, [])

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [terminalHistory])

  return (
    <div className="space-y-8 animate-fade-in-up">
      <div className="bg-[#0f1117] border border-[#1e2230] rounded-xl p-6">
        <h3 className="font-display font-bold text-xl text-white mb-2">
          Developer Console Terminal
        </h3>
        <p className="text-xs text-[#9ca3af]">
          Click the preset command buttons below to interact with the simulated
          shell developer tool.
        </p>
      </div>

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
            <div className="w-3 h-3 rounded-full bg-[#ff5f57]" />
            <div className="w-3 h-3 rounded-full bg-[#febc2e]" />
            <div className="w-3 h-3 rounded-full bg-[#28c840]" />
            <span className="ml-3 font-mono text-xs text-[#6b7280]">
              thanatphong@brick-terminal: ~
            </span>
          </div>
          <span className="font-mono text-[10px] text-[#6b7280]">
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
            <span className="font-mono text-xs text-[#6b7280]">Presets:</span>
            {PRESET_COMMANDS.map((preset) => (
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
              aria-label="Terminal command input"
              className="flex-1 bg-transparent border-none text-[#f0f2f5] font-mono text-xs focus:ring-0 focus:outline-none p-0"
            />
          </form>
        </div>
      </div>
    </div>
  )
}
