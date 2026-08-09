import { useState, useEffect, useMemo } from "react"
import { generateContributions, skillsMatrix } from "./cvData"
import { TerminalWidget } from "./TerminalWidget"
import { HeroPortrait } from "./HeroPortrait"

const heroCopy = {
  en: {
    kicker: "WinTuner - Where Code Meets Curiosity",
    intro:
      "Software engineering student at Chiang Mai University and Co-Founder & CTO of Muanjai. Building Agentic AI systems, full-stack web applications, and DevOps infrastructure.",
    explore: "explore artifacts",
    resume: "resume",
    scroll: "scroll down",
    status: "status: forging",
  },
  th: {
    kicker: "WinTuner - ที่ที่โค้ดเจอกับความอยากรู้อยากเห็น",
    intro:
      "นักศึกษาสายวิศวกรรมซอฟต์แวร์ มหาวิทยาลัยเชียงใหม่ ผู้ร่วมก่อตั้งและ CTO ของ Muanjai มุ่งมั่นพัฒนาระบบ Agentic AI, เว็บแอปพลิเคชันแบบ Full-Stack และโครงสร้างพื้นฐาน DevOps",
    explore: "สำรวจผลงาน",
    resume: "เรซูเม่",
    scroll: "เลื่อนลง",
    status: "สถานะ: กำลังพัฒนา",
  },
} as const

const marqueeCommands = [
  "npm run dev -- --port 3000",
  "git push origin main",
  "systemctl start muanjai.service",
  "docker compose up -d",
  "neofetch --off",
  "cargo run --release",
  "pnpm test --watch",
  "ssh wintuner@archlinux",
  "curl -I https://wintuner.dev",
  "yay -Syu",
]

const CONTRIBUTION_LEVEL_COLORS = [
  "rgba(30, 34, 48, 0.3)",
  "rgba(168, 255, 62, 0.2)",
  "rgba(168, 255, 62, 0.45)",
  "rgba(168, 255, 62, 0.7)",
  "#a8ff3e",
]

const getContributionBgColor = (level: number) =>
  CONTRIBUTION_LEVEL_COLORS[level] ?? CONTRIBUTION_LEVEL_COLORS[0]

const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
]

interface HomeViewProps {
  cvLang: "en" | "th"
  onNavigate: (view: "projects" | "resume") => void
}

export const HomeView: React.FC<HomeViewProps> = ({ cvLang, onNavigate }) => {
  // GitHub contribution calendar seeding (stable across renders)
  const contributions = useMemo(() => generateContributions(), [])

  // Dynamic Typewriter states
  const [displayText, setDisplayText] = useState("")
  const [roleIndex, setRoleIndex] = useState(0)
  const [isDeleting, setIsDeleting] = useState(false)
  const roles = useMemo(
    () => ({
      en: [
        "building interfaces",
        "exploring systems",
        "breaking barriers",
        "forging ideas",
        "crafting code",
      ],
      th: [
        "สร้างอินเทอร์เฟซ",
        "สำรวจระบบ",
        "ทลายข้อจำกัด",
        "หลอมรวมไอเดีย",
        "เขียนโค้ดอย่างประณีต",
      ],
    }),
    [],
  )

  useEffect(() => {
    const targetText = roles[cvLang][roleIndex]
    let timer: ReturnType<typeof setTimeout>

    const tick = () => {
      if (!isDeleting) {
        if (displayText.length < targetText.length) {
          setDisplayText(targetText.slice(0, displayText.length + 1))
          timer = setTimeout(tick, 80)
        } else {
          setDisplayText(targetText)
          timer = setTimeout(() => setIsDeleting(true), 2000)
        }
      } else if (displayText.length > 0) {
        setDisplayText(displayText.slice(0, -1))
        timer = setTimeout(tick, 40)
      } else {
        setIsDeleting(false)
        setRoleIndex((prev) => (prev + 1) % roles[cvLang].length)
      }
    }

    timer = setTimeout(tick, isDeleting ? 40 : 80)
    return () => clearTimeout(timer)
  }, [displayText, isDeleting, roleIndex, cvLang, roles])

  const monthHeaders = useMemo(() => {
    const headers: React.ReactNode[] = []
    let lastMonth = -1
    contributions.weeks.forEach((week) => {
      const middle = week.days[3]
      const month = middle?.date
        ? new Date(middle.date + "T12:00:00").getMonth()
        : -1
      const key = week.days[0]?.date ?? "x"
      if (month >= 0 && month !== lastMonth) {
        lastMonth = month
        headers.push(
          <span
            key={key}
            className="w-[12px] overflow-visible whitespace-nowrap"
          >
            {MONTHS[month]}
          </span>,
        )
      } else {
        headers.push(<span key={key} className="w-[12px]" />)
      }
    })
    return headers
  }, [contributions])

  return (
    <div className="space-y-16 animate-fade-in-up">
      {/* HeroSection */}
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 lg:items-center">
        {/* Text Area */}
        <div className="space-y-8">
          <div className="space-y-3">
            <p className="font-mono text-xs uppercase tracking-[0.25em] text-[#a8ff3e] font-semibold">
              {heroCopy[cvLang].kicker}
            </p>
            <h1 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl xl:text-6xl text-white leading-tight">
              Forging digital
              <br />
              <span className="bg-gradient-to-l from-[#a8ff3e] to-[#febc2e] text-transparent bg-clip-text typing-cursor inline-block min-h-[1.2em]">
                {displayText || "\u00A0"}
              </span>
            </h1>
          </div>

          <p className="max-w-lg text-base text-[#9ca3af] leading-relaxed">
            {heroCopy[cvLang].intro}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <button
              onClick={() => onNavigate("projects")}
              className="group relative inline-flex items-center justify-center gap-3 overflow-hidden rounded-lg border border-[#a8ff3e] bg-[#a8ff3e]/10 px-7 py-3 font-mono text-sm text-[#a8ff3e] transition-all duration-500 hover:bg-[#a8ff3e] hover:text-[#09090e] active:scale-[0.98] cursor-pointer"
            >
              <span className="relative z-10">{heroCopy[cvLang].explore}</span>
              <span className="relative z-10 transition-transform duration-300 group-hover:translate-x-1">
                →
              </span>
            </button>
            <button
              onClick={() => onNavigate("resume")}
              className="group inline-flex items-center justify-center gap-3 rounded-lg border border-[#1e2230] px-7 py-3 font-mono text-sm text-[#9ca3af] transition-all duration-300 hover:border-white hover:text-white hover:bg-white/5 active:scale-[0.98] cursor-pointer"
            >
              <span>{heroCopy[cvLang].resume}</span>
              <span className="opacity-0 -translate-x-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                →
              </span>
            </button>
          </div>

          {/* Minimal Custom Linux Terminal Widget */}
          <TerminalWidget cvLang={cvLang} />
        </div>

        {/* Portrait Component */}
        <HeroPortrait />
      </div>

      {/* Status Ticker Marquee */}
      <div
        aria-hidden="true"
        className="relative select-none overflow-hidden border-y border-[#1e2230] bg-[#0f1117]/30 py-3 backdrop-blur-sm"
      >
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-[#09090e] to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-[#09090e] to-transparent" />
        <div className="flex w-max animate-marquee">
          {[0, 1].map((duplicate) => (
            <div
              key={duplicate}
              className="flex shrink-0 items-center gap-8 pr-8"
            >
              {marqueeCommands.map((cmd) => (
                <span
                  key={cmd}
                  className="flex items-center gap-3 font-mono text-[10px] sm:text-xs text-[#6b7280] whitespace-nowrap"
                >
                  <span className="text-[#a8ff3e]">❯</span>
                  {cmd}
                  <span className="text-[#a8ff3e]/40">✦</span>
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Column skills */}
        <div className="space-y-8">
          <div className="rounded-xl p-6 bg-[#0f1117] border border-[#1e2230]">
            <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2 border-b border-[#1e2230] pb-2">
              <span className="text-[#a8ff3e]">⚡</span>{" "}
              {cvLang === "en" ? "Technical Stack" : "ทักษะทางเทคนิค"}
            </h3>
            <div className="space-y-5">
              {skillsMatrix[cvLang].map((cat, idx) => (
                <div key={idx} className="space-y-2">
                  <div className="font-mono text-xs font-semibold text-[#a8ff3e]">
                    {cat.category}
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {cat.items.map((item, itemIdx) => (
                      <span
                        key={itemIdx}
                        className="px-2 py-0.5 rounded bg-white/5 text-[#9ca3af] border border-[#1e2230] text-[10px] hover:border-[#a8ff3e]/40 hover:text-white transition-colors"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column contributions activity */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-xl p-6 bg-[#0f1117] border border-[#1e2230]">
            <h3 className="font-display font-bold text-lg text-white mb-3 flex items-center gap-2 border-b border-[#1e2230] pb-2">
              <span className="text-[#a8ff3e]">📊</span>{" "}
              {cvLang === "en"
                ? "GitHub Contribution Activity"
                : "กิจกรรมปฏิทินคอมมิต GitHub"}
            </h3>

            <div className="p-4 rounded-lg bg-[#09090e] border border-[#1e2230]">
              <div className="mb-4 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <p className="font-mono text-xs text-[#9ca3af]">
                  <span className="text-xl font-bold text-[#a8ff3e]">
                    {contributions.total.toLocaleString()}
                  </span>{" "}
                  {cvLang === "en"
                    ? "contributions in the last year"
                    : "คอมมิตในรอบปีที่ผ่านมา"}
                </p>
                <div className="flex items-center gap-1.5 font-mono text-[9px] text-[#6b7280]">
                  <span>Less</span>
                  {[0, 1, 2, 3, 4].map((lvl) => (
                    <span
                      key={lvl}
                      className="h-2.5 w-2.5 rounded-[2px]"
                      style={{ background: getContributionBgColor(lvl) }}
                    />
                  ))}
                  <span>More</span>
                </div>
              </div>

              <div className="overflow-x-auto pb-1">
                <div className="inline-block min-w-full">
                  <div className="mb-1 flex gap-[3px] pl-[26px] font-mono text-[9px] text-[#6b7280]">
                    {monthHeaders}
                  </div>

                  <div className="flex">
                    <div className="mr-1 flex w-[22px] flex-col gap-[3px] font-mono text-[9px] text-[#6b7280] pt-[2px]">
                      <span>Mon</span>
                      <span className="h-[9px]" />
                      <span>Wed</span>
                      <span className="h-[9px]" />
                      <span>Fri</span>
                    </div>

                    <div className="flex gap-[3px]">
                      {contributions.weeks.map((week, wIdx) => (
                        <div key={wIdx} className="flex flex-col gap-[3px]">
                          {week.days.map((day, dIdx) => (
                            <span
                              key={dIdx}
                              title={`${day.date}: ${day.count} contributions`}
                              className="h-[9px] w-[12px] rounded-[1.5px] transition-transform duration-100 hover:scale-125"
                              style={{
                                background: getContributionBgColor(day.level),
                              }}
                            />
                          ))}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
