import type { FC } from "react"
import type { View } from "../../types"
import { GithubIcon, LinkedinIcon, HeartIcon } from "./Icons"

interface FooterProps {
  cvLang: "en" | "th"
  setView: (v: View) => void
}

export const Footer: FC<FooterProps> = ({ cvLang, setView }) => {
  return (
    <footer id="connect" className="border-t border-[#1e2230]/40 px-4 sm:px-6 pt-16 pb-8 mt-12 bg-black/20">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Left Column */}
          <div className="space-y-6">
            <div className="space-y-2">
              <p className="font-mono text-xs uppercase tracking-wider text-[#a8ff3e]">
                {cvLang === "en" ? "Connect" : "เชื่อมต่อ"}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white">
                {cvLang === "en" ? "Let's build something " : "มาสร้างอะไร "}
                <span className="bg-gradient-to-l from-[#a8ff3e] to-[#febc2e] text-transparent bg-clip-text">
                  {cvLang === "en" ? "together" : "ด้วยกัน"}
                </span>
              </h2>
            </div>
            <p className="max-w-md text-sm text-[#9ca3af] leading-relaxed">
              {cvLang === "en"
                ? "Always interested in collaborations, interesting problems, and conversations about code, design, and everything in between."
                : "สนใจงานร่วมมือ โจทย์ที่น่าสนใจ และบทสนทนาเกี่ยวกับโค้ด ดีไซน์ และทุกอย่างที่อยู่ระหว่างกลางเสมอ"}
            </p>
            <div>
              <a
                href="mailto:Thanatphong2719@gmail.com"
                className="group relative inline-flex items-center justify-center gap-2 rounded-lg border border-[#a8ff3e] bg-[#a8ff3e]/10 px-6 py-3 font-mono text-xs text-[#a8ff3e] hover:bg-[#a8ff3e] hover:text-[#09090e] transition-all"
              >
                <span>{cvLang === "en" ? "send a signal" : "ส่งสัญญาณหาเรา"}</span>
                <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
              </a>
            </div>
          </div>

          {/* Right Column */}
          <div className="space-y-6">
            <p className="font-mono text-xs uppercase tracking-wider text-[#6b7280]">
              {cvLang === "en" ? "Find me elsewhere" : "ตามหาผมได้ที่อื่น"}
            </p>
            <div className="space-y-2">
              {[
                { label: "GitHub", handle: "@WinTuner", href: "https://github.com/WinTuner" },
                { label: "LinkedIn", handle: "/in/thanatphong-tarin", href: "https://www.linkedin.com/in/thanatphong-tarin-1b6619385/" },
                { label: "Email", handle: "Thanatphong2719@gmail.com", href: "mailto:Thanatphong2719@gmail.com" }
              ].map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center justify-between border border-[#1e2230] p-3 rounded-xl hover:bg-white/5 hover:border-[#a8ff3e]/40 transition-all text-white text-xs font-mono"
                >
                  <span>{item.label}</span>
                  <span className="text-[#6b7280]">{item.handle}</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Portfolio Member Switcher */}
        <div className="flex justify-between items-center mt-20 pt-8 border-t border-[#1e2230]/40">
          <button
            onClick={() => setView("portfolio-pm")}
            className="text-xs font-mono text-[#6b7280] hover:text-white transition-colors cursor-pointer"
          >
            ← Previous Portfolio (Nonniphat)
          </button>
          <button
            onClick={() => setView("portfolio-uxui")}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all cursor-pointer bg-[#a8ff3e] text-[#09090e] hover:bg-[#bfff5c]"
          >
            Next Portfolio (Phooriwat) →
          </button>
        </div>

        {/* Bottom metadata */}
        <div className="mt-12 pt-6 border-t border-[#1e2230]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-[#6b7280] font-mono text-[10px]">
          <div className="flex items-center gap-2">
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-[#a8ff3e] opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-[#a8ff3e]" />
            </span>
            <span>{cvLang === "en" ? "Forged with" : "สร้างสรรค์ด้วย"}</span>
            <HeartIcon />
            <span>{cvLang === "en" ? "& code" : "และโค้ด"}</span>
          </div>

          <p>© {new Date().getFullYear()} WinTuner — {cvLang === "en" ? "All experiments reserved" : "สงวนลิขสิทธิ์ผลงานทดลองทั้งหมด"}</p>
        </div>
      </div>
    </footer>
  )
}
