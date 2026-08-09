import React from "react"
import { GithubIcon, LinkedinIcon } from "./Icons"

interface HeaderProps {
  cvLang: "en" | "th"
  setCvLang: (l: "en" | "th") => void
  subView: "home" | "resume" | "projects" | "workbench" | "blog" | "terminal"
  setSubView: (v: "home" | "resume" | "projects" | "workbench" | "blog" | "terminal") => void
  setSelectedPost: (p: any) => void
  setView: (v: any) => void
}

export const Header: React.FC<HeaderProps> = ({
  cvLang,
  setCvLang,
  subView,
  setSubView,
  setSelectedPost,
  setView,
}) => {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-[#1e2230]/60 bg-[#09090e]/85 backdrop-blur-md">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <button
            onClick={() => setView("team")}
            className="group flex items-center gap-1.5 text-[10px] font-mono text-[#6b7280] hover:text-[#a8ff3e] transition-colors cursor-pointer border border-[#1e2230] px-2.5 py-1 rounded bg-[#0f1117]"
          >
            <span>←</span> <span className="font-bold">TEAM</span>
          </button>
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-[#a8ff3e]/40 bg-[#a8ff3e]/10 text-[#a8ff3e]">
              <span>⚡</span>
            </div>
            <span className="font-mono text-sm tracking-tight text-white hidden sm:inline">
              WIN<span className="text-[#a8ff3e] font-semibold">TUNER</span>
            </span>
          </div>
        </div>

        {/* Desktop Nav Items */}
        <nav className="hidden md:flex items-center gap-1 font-mono text-xs">
          {[
            { id: "home", label: cvLang === "en" ? "Home" : "หน้าแรก" },
            { id: "resume", label: cvLang === "en" ? "Resume" : "เรซูเม่" },
            { id: "projects", label: cvLang === "en" ? "Projects" : "โปรเจกต์" },
            { id: "workbench", label: cvLang === "en" ? "Workbench" : "เวิร์กเบนช์" },
            { id: "blog", label: cvLang === "en" ? "Blog" : "บล็อก" },
            { id: "terminal", label: cvLang === "en" ? "Console" : "คอนโซล" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setSubView(item.id as any)
                setSelectedPost(null)
              }}
              className={`relative px-4 py-2 transition-all cursor-pointer ${
                subView === item.id ? "text-[#a8ff3e] font-bold" : "text-[#6b7280] hover:text-white"
              }`}
            >
              {subView === item.id && (
                <span className="absolute left-1 text-[#a8ff3e]">&gt;</span>
              )}
              <span>{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {/* Status indicators */}
          <div className="hidden sm:flex items-center gap-2 font-mono text-[10px] text-[#6b7280] px-2.5 py-1 rounded bg-[#0f1117] border border-[#1e2230]">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a8ff3e] opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-[#a8ff3e]" />
            </span>
            <span>{cvLang === "th" ? "สถานะ: กำลังพัฒนา" : "status: forging"}</span>
          </div>

          {/* Language Selection */}
          <div className="flex gap-0.5 p-0.5 rounded bg-[#0f1117] border border-[#1e2230]">
            <button
              onClick={() => setCvLang("en")}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer ${
                cvLang === "en" ? "bg-[#a8ff3e] text-[#09090e]" : "text-[#6b7280] hover:text-white"
              }`}
            >
              EN
            </button>
            <button
              onClick={() => setCvLang("th")}
              className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold cursor-pointer ${
                cvLang === "th" ? "bg-[#a8ff3e] text-[#09090e]" : "text-[#6b7280] hover:text-white"
              }`}
            >
              TH
            </button>
          </div>

          {/* Social Links */}
          <div className="flex items-center gap-1">
            <a
              href="https://github.com/WinTuner"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 flex items-center justify-center text-[#6b7280] hover:text-[#a8ff3e] transition-colors border border-[#1e2230] rounded bg-[#0f1117]"
            >
              <GithubIcon />
            </a>
            <a
              href="https://www.linkedin.com/in/thanatphong-tarin-1b6619385/"
              target="_blank"
              rel="noreferrer"
              className="w-7 h-7 flex items-center justify-center text-[#6b7280] hover:text-[#a8ff3e] transition-colors border border-[#1e2230] rounded bg-[#0f1117]"
            >
              <LinkedinIcon />
            </a>
          </div>
        </div>
      </div>
    </header>
  )
}
