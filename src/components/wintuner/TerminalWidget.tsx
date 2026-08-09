import React, { useState, useEffect, useMemo } from "react"

interface TerminalWidgetProps {
  cvLang: "en" | "th"
}

export const TerminalWidget: React.FC<TerminalWidgetProps> = ({ cvLang }) => {
  const [terminalWidgetTab, setTerminalWidgetTab] =
    useState<"status" | "git" | "neofetch" | "cli">("status")
  const [widgetTypedCommand, setWidgetTypedCommand] = useState("")
  const [widgetIsTyping, setWidgetIsTyping] = useState(false)
  const [widgetShowOutput, setWidgetShowOutput] = useState(false)
  const [widgetCliInput, setWidgetCliInput] = useState("")
  const [widgetCliHistory, setWidgetCliHistory] = useState<Array<{
    command: string
    output: React.ReactNode
  }>>([
    {
      command: "init-portfolio-cli.sh",
      output: (
        <div className="space-y-1">
          <p className="text-[#a8ff3e] font-bold text-[10px]">
            --- WIN'S INTERACTIVE PORTFOLIO SHELL v2.0.0 ---
          </p>
          <p className="text-[#6b7280] text-[9px]">
            Type <span className="text-[#a8ff3e] font-bold">help</span> to view
            available commands.
          </p>
        </div>
      ),
    },
  ])

  const widgetCommands = useMemo(
    () => ({
      status: "systemctl status github-monitor.service",
      git: "git log -n 3 --oneline",
      neofetch: "neofetch",
      cli: "init-portfolio-cli.sh",
    }),
    [],
  )

  useEffect(() => {
    const fullCommand = widgetCommands[terminalWidgetTab]
    setWidgetTypedCommand("")
    setWidgetShowOutput(false)
    setWidgetIsTyping(true)

    let i = 0
    const interval = setInterval(() => {
      if (i < fullCommand.length) {
        setWidgetTypedCommand(fullCommand.slice(0, i + 1))
        i++
      } else {
        clearInterval(interval)
        setWidgetIsTyping(false)
        setWidgetShowOutput(true)
      }
    }, 12)

    return () => clearInterval(interval)
  }, [terminalWidgetTab, widgetCommands])

  const runWidgetCliCommand = (
    command: string,
    args: string[],
  ): React.ReactNode => {
    const cyan = "text-sky-400"
    const green = "text-[#a8ff3e]"
    const dim = "text-[#6b7280]"

    switch (command) {
      case "help":
        return (
          <div className="space-y-1 text-[10px]">
            <p className="text-[#a8ff3e] font-bold">Available Commands:</p>
            <p>
              <span className={`${green} font-bold`}>help</span> - Show all
              commands
            </p>
            <p>
              <span className={`${green} font-bold`}>about</span> - Profile bio
              summary
            </p>
            <p>
              <span className={`${green} font-bold`}>skills</span> - List
              primary tech stack
            </p>
            <p>
              <span className={`${green} font-bold`}>projects</span> - Show
              featured projects
            </p>
            <p>
              <span className={`${green} font-bold`}>socials</span> - Social
              links
            </p>
            <p>
              <span className={`${green} font-bold`}>clear</span> - Clear
              terminal logs
            </p>
          </div>
        )
      case "about":
      case "whoami":
        return (
          <div className="space-y-1 text-[10px]">
            <p className="font-bold text-white">Thanatphong Tarin (WinTuner)</p>
            <p className={`${dim} leading-normal`}>
              Software engineering student at Chiang Mai University and
              Co-Founder & CTO of Muanjai. Specializing in Agentic AI,
              full-stack, and DevOps.
            </p>
          </div>
        )
      case "skills":
        return (
          <div className="space-y-0.5 font-mono text-[9px]">
            <p className="text-[#a8ff3e] font-bold mb-1">
              Tech Stack & Proficiency:
            </p>
            <p>Next.js [██████████████░░░░] 75%</p>
            <p>TypeScript [████████████████░░] 80%</p>
            <p>Linux/Bash [██████████████████] 90%</p>
          </div>
        )
      case "projects":
        return (
          <div className="space-y-1 text-[10px]">
            <p className="text-[#a8ff3e] font-bold">Recent Projects:</p>
            <p>• AutoOS - Native WinUI 3 Migrator</p>
            <p>• DotDoctor - Hyprland Config Checker</p>
          </div>
        )
      case "socials":
      case "contact":
        return (
          <div className="space-y-1 text-[10px]">
            <p className="text-[#a8ff3e] font-bold">Socials:</p>
            <p>• GitHub: github.com/WinTuner</p>
            <p>• LinkedIn: /in/thanatphong-tarin</p>
            <p>• Email: Thanatphong2719@gmail.com</p>
          </div>
        )
      case "clear":
        setWidgetCliHistory([])
        return null
      default:
        return (
          <p className="text-red-400 text-[10px]">
            Command not found: "{command}". Type 'help' for instructions.
          </p>
        )
    }
  }

  const handleWidgetCliSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const rawInput = widgetCliInput.trim()
    if (!rawInput) return

    const [command, ...args] = rawInput.toLowerCase().split(/\s+/)
    if (command === "clear") {
      setWidgetCliHistory([])
      setWidgetCliInput("")
      return
    }

    setWidgetCliHistory((prev) => [
      ...prev,
      { command: rawInput, output: runWidgetCliCommand(command, args) },
    ])
    setWidgetCliInput("")
  }

  // Neofetch data states
  const [cpuLoad, setCpuLoad] = useState(24.5)
  const [ramUsed, setRamUsed] = useState(12.44)
  const [localTime, setLocalTime] = useState("")

  useEffect(() => {
    const sysInterval = setInterval(() => {
      setCpuLoad((prev) => {
        const change = (Math.random() - 0.5) * 6
        return parseFloat(Math.min(90, Math.max(5, prev + change)).toFixed(1))
      })
      setRamUsed((prev) => {
        const change = (Math.random() - 0.5) * 0.3
        return parseFloat(
          Math.min(30.2, Math.max(8.4, prev + change)).toFixed(2),
        )
      })
    }, 2500)

    const clockInterval = setInterval(() => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "Asia/Bangkok",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false,
      }
      setLocalTime(
        new Intl.DateTimeFormat("en-US", options).format(new Date()) + " (ICT)",
      )
    }, 1000)

    return () => {
      clearInterval(sysInterval)
      clearInterval(clockInterval)
    }
  }, [])

  return (
    <div className="w-full max-w-lg overflow-hidden rounded-xl border border-[#1e2230] bg-zinc-950/60 backdrop-blur-md shadow-2xl transition-all duration-300">
      {/* Chrome Tabs header */}
      <div className="flex items-center bg-zinc-950/90 border-b border-zinc-900 px-4">
        <div className="flex items-center gap-1.5 mr-6 py-3.5">
          <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
          <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
        </div>

        <div className="flex items-end h-full gap-0.5 font-mono text-[9px] sm:text-[10px]">
          {([
            { id: "status", label: "status.service" },
            { id: "git", label: "git-log.sh" },
            { id: "neofetch", label: "neofetch" },
            { id: "cli", label: "portfolio-cli.sh" },
          ] as const).map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTerminalWidgetTab(tab.id)}
              role="tab"
              aria-selected={terminalWidgetTab === tab.id}
              className={`px-3 py-1.5 transition-colors border-t border-x rounded-t-md font-semibold cursor-pointer ${
                terminalWidgetTab === tab.id
                  ? "bg-zinc-900/80 border-zinc-800 text-[#a8ff3e] border-t-[#a8ff3e]"
                  : "bg-zinc-950/40 border-transparent text-[#6b7280] hover:text-white"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Terminal Tab content output */}
      <div className="p-4 font-mono text-[10px] sm:text-[11px] leading-relaxed text-[#9ca3af] h-[200px] overflow-y-auto bg-black/40">
        {/* Prompt Header */}
        {terminalWidgetTab !== "cli" && (
          <div className="flex items-center gap-1.5 text-[#6b7280] mb-3 border-b border-zinc-900 pb-2">
            <span className="text-sky-400 font-bold">wintuner</span>
            <span>@</span>
            <span className="text-purple-400 font-bold">archlinux</span>
            <span className="text-[#a8ff3e] font-bold">❯</span>
            <span className="text-white font-semibold">
              {widgetTypedCommand}
            </span>
            {widgetIsTyping && (
              <span className="inline-block w-1.5 h-3 bg-[#a8ff3e] animate-pulse" />
            )}
          </div>
        )}

        {/* Status service output tab */}
        {terminalWidgetTab === "status" && widgetShowOutput && (
          <div className="space-y-1.5 animate-fade-in text-[10px]">
            <div className="flex items-center gap-1">
              <span className="text-emerald-500 font-bold animate-pulse">
                ●
              </span>
              <span className="font-bold text-white">
                github-monitor.service
              </span>
              <span className="text-[#6b7280]"> - Live Activity Monitor</span>
            </div>
            <div className="pl-3">
              Loaded: <span className="text-emerald-400">loaded</span>{" "}
              (/etc/systemd/system/github-monitor.service; enabled)
            </div>
            <div className="pl-3">
              Active:{" "}
              <span className="text-emerald-400 font-bold">
                active (running)
              </span>{" "}
              since today
            </div>
            <div className="pl-3">
              Status:{" "}
              <span className="text-sky-300">
                "Synced with GitHub PRNG Heatmap"
              </span>
            </div>

            <div className="border-t border-zinc-900 my-2 pt-2 text-[9px] text-[#6b7280] uppercase tracking-wider font-bold">
              Journal Logs:
            </div>
            <div className="text-white font-mono leading-relaxed space-y-1 pl-3">
              <div>
                [today 10:12:05]{" "}
                <span className="text-emerald-400">⚡ [COMMIT]</span> aim4-mod ❯
                Refactored sim timeline model.
              </div>
              <div>
                [today 09:44:54]{" "}
                <span className="text-emerald-400">⚡ [COMMIT]</span> AutoOS ❯
                Setup native compilation properties.
              </div>
            </div>
          </div>
        )}

        {/* Git commits log tab */}
        {terminalWidgetTab === "git" && widgetShowOutput && (
          <div className="space-y-2 animate-fade-in text-[10px]">
            <div>
              <p className="text-amber-400 font-bold">
                commit 9fa8b12 (HEAD -{">"} main)
              </p>
              <p className="text-[#6b7280]">
                Author: Thanatphong Tarin &lt;thanatphong2719@gmail.com&gt;
              </p>
              <p className="text-white pl-4 mt-0.5">
                Refine TypeScript layout elements
              </p>
            </div>
            <div>
              <p className="text-amber-400">commit c10ab28</p>
              <p className="text-[#6b7280]">
                Author: Thanatphong Tarin &lt;thanatphong2719@gmail.com&gt;
              </p>
              <p className="text-white pl-4 mt-0.5">
                Initial port of all CV databases
              </p>
            </div>
          </div>
        )}

        {/* Neofetch tab */}
        {terminalWidgetTab === "neofetch" && widgetShowOutput && (
          <div className="flex gap-4 animate-fade-in text-[9.5px] sm:text-[10px]">
            <pre className="text-cyan-400 leading-none select-none font-bold">
              {`    /\\
   /  \\
  /\\   \\
 /  __  \\
/___(____)\\_\\`}
            </pre>
            <div className="space-y-0.5 text-[#9ca3af]">
              <div>
                <span className="text-[#a78bfa] font-bold">wintuner</span>@
                <span className="text-cyan-400 font-bold">archlinux</span>
              </div>
              <div className="text-zinc-700">-----------------</div>
              <div>
                <span className="text-sky-400">OS</span>: Arch Linux x86_64
              </div>
              <div>
                <span className="text-sky-400">Kernel</span>: Linux 6.10-cachyos
              </div>
              <div>
                <span className="text-sky-400">Uptime</span>: 99.9%
              </div>
              <div>
                <span className="text-sky-400">Shell</span>: zsh 5.9
              </div>
              <div>
                <span className="text-sky-400">CPU</span>: Intel Core i9{" "}
                <span className="text-emerald-400 font-bold ml-1">
                  {cpuLoad}%
                </span>
              </div>
              <div>
                <span className="text-sky-400">Memory</span>: {ramUsed}GB / 32GB
              </div>
              <div>
                <span className="text-sky-400">Time (ICT)</span>:{" "}
                <span className="text-yellow-400 font-semibold">
                  {localTime}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* interactive prompt within neofetch tab */}
        {terminalWidgetTab === "cli" && widgetShowOutput && (
          <div className="flex flex-col h-full justify-between">
            <div className="space-y-1.5 overflow-y-auto max-h-[140px] pr-1">
              {widgetCliHistory.map((item, idx) => (
                <div key={idx} className="space-y-0.5">
                  <p className="text-[#6b7280]">❯ {item.command}</p>
                  <div className="pl-2">{item.output}</div>
                </div>
              ))}
            </div>
            <form
              onSubmit={handleWidgetCliSubmit}
              className="flex gap-1.5 pt-1.5 border-t border-zinc-900 mt-2"
            >
              <span className="text-[#a8ff3e]">❯</span>
              <input
                type="text"
                value={widgetCliInput}
                onChange={(e) => setWidgetCliInput(e.target.value)}
                placeholder="type 'help'..."
                aria-label="Terminal command input"
                className="bg-transparent border-none focus:outline-none focus:ring-0 text-white font-mono text-[10px] flex-1 p-0"
              />
            </form>
          </div>
        )}
      </div>
    </div>
  )
}
