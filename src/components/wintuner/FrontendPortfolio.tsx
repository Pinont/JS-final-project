import {
  useState,
  useEffect,
  useRef,
  useMemo,
  useCallback,
  type ReactNode,
} from "react"
import {
  education,
  professionalExperience,
  selfDevelopment,
  leadership,
  experiences,
  copy,
  wipItems,
  fallbackProjects,
} from "./cvData"
import type { CVCategory } from "./cvData"
import type { BlogPost } from "./blogData"
import { blogPosts } from "./blogData"
import type { View, FrontendView } from "../../types"
import { Header } from "./Header"
import { Footer } from "./Footer"
import { HomeView } from "./HomeView"
import { TerminalConsole } from "./TerminalConsole"

interface MobileNavItem {
  id: FrontendView
  label: string
}

const MOBILE_NAV_ITEMS: Array<MobileNavItem> = [
  { id: "home", label: "Home" },
  { id: "resume", label: "Resume" },
  { id: "projects", label: "Projects" },
  { id: "workbench", label: "Workbench" },
  { id: "blog", label: "Blog" },
  { id: "terminal", label: "CLI" },
]

export default function FrontendPortfolio({
  setView,
}: {
  setView: (v: View) => void
}) {
  // Main views routing
  const [subView, setSubView] = useState<FrontendView>("home")
  const [cvLang, setCvLang] = useState<"en" | "th">("en")
  const [activeProjectTab, setActiveProjectTab] =
    useState<CVCategory>("production")

  // Blog states
  const [selectedPost, setSelectedPost] = useState<BlogPost | null>(null)

  // Projects states
  const [projectSearch, setProjectSearch] = useState("")
  const [projectFilter, setProjectFilter] = useState("all")
  const [selectedProjectTags, setSelectedProjectTags] = useState<string[]>([])

  // Mouse coordinates glow ref & logic
  const glowRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const glow = glowRef.current
    const dot = dotRef.current
    if (!glow || !dot) return

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      glow.style.display = "none"
      dot.style.display = "none"
      return
    }

    let x = -400
    let y = -400
    let visible = false
    let hovering = false
    let frame = 0

    const apply = () => {
      frame = 0
      const translate = `translate(${x}px, ${y}px) translate(-50%, -50%)`
      glow.style.transform = translate
      dot.style.transform = translate
      glow.style.opacity = visible ? "1" : "0"
      dot.style.opacity = visible ? "0.15" : "0"
      glow.style.width = hovering ? "500px" : "400px"
      glow.style.height = hovering ? "500px" : "400px"
    }

    const onMouseMove = (e: MouseEvent) => {
      x = e.clientX
      y = e.clientY
      if (!frame) frame = requestAnimationFrame(apply)
      if (!visible) {
        visible = true
        if (frame) cancelAnimationFrame(frame)
        frame = requestAnimationFrame(apply)
      }
    }

    const onMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      hovering = !!target.closest(
        'a, button, [role="button"], input, textarea, select',
      )
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(apply)
    }

    const onMouseLeave = () => {
      visible = false
      if (frame) cancelAnimationFrame(frame)
      frame = requestAnimationFrame(apply)
    }

    window.addEventListener("mousemove", onMouseMove, { passive: true })
    document.addEventListener("mouseover", onMouseOver, { passive: true })
    document.body.addEventListener("mouseleave", onMouseLeave)

    return () => {
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener("mousemove", onMouseMove)
      document.removeEventListener("mouseover", onMouseOver)
      document.body.removeEventListener("mouseleave", onMouseLeave)
    }
  }, [])

  // Pre-calculate project tags for filtering
  const allProjectTags = useMemo(() => {
    return Array.from(new Set(fallbackProjects.flatMap((p) => p.tags)))
  }, [])

  // Memoized markdown parser to avoid re-parsing on every render
  const renderBlogContent = useCallback((content: string) => {
    const lines = content.split("\n")
    const rendered: ReactNode[] = []
    let isCodeBlock = false
    let codeContent: string[] = []

    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]
      if (line.startsWith("```")) {
        if (isCodeBlock) {
          isCodeBlock = false
          rendered.push(
            <pre
              key={i}
              className="bg-[#05070a] border border-[#1e2230] p-4 rounded-lg font-mono text-xs overflow-x-auto my-4 text-[#a8ff3e]"
            >
              <code>{codeContent.join("\n")}</code>
            </pre>,
          )
          codeContent = []
        } else {
          isCodeBlock = true
        }
      } else if (isCodeBlock) {
        codeContent.push(line)
      } else if (line.startsWith("## ")) {
        rendered.push(
          <h2
            key={i}
            className="text-xl font-bold text-white mt-6 mb-3 border-b border-[#1e2230] pb-1"
          >
            {line.substring(3)}
          </h2>,
        )
      } else if (line.startsWith("### ")) {
        rendered.push(
          <h3 key={i} className="text-lg font-bold text-white mt-4 mb-2">
            {line.substring(4)}
          </h3>,
        )
      } else if (line.startsWith("- ")) {
        rendered.push(
          <li key={i} className="text-sm text-[#9ca3af] list-disc ml-5 mb-1">
            {line.substring(2)}
          </li>,
        )
      } else if (line.trim().match(/^\d+\.\s/)) {
        rendered.push(
          <li key={i} className="text-sm text-[#9ca3af] list-decimal ml-5 mb-1">
            {line.replace(/^\d+\.\s/, "")}
          </li>,
        )
      } else if (line.trim() !== "") {
        rendered.push(
          <p key={i} className="text-sm text-[#9ca3af] leading-relaxed mb-3">
            {line}
          </p>,
        )
      }
    }
    return rendered
  }, [])

  // Memoized markdown link parser used in resume experience bullets
  const parseMarkdownLinks = useCallback((text: string) => {
    const regex = /\[([^\]]+)\]\(([^)]+)\)/g
    const parts: ReactNode[] = []
    let lastIndex = 0
    let match: RegExpExecArray | null

    while ((match = regex.exec(text)) !== null) {
      if (match.index > lastIndex) {
        parts.push(text.substring(lastIndex, match.index))
      }
      parts.push(
        <a
          key={match.index}
          href={match[2]}
          target="_blank"
          rel="noreferrer"
          className="text-[#a8ff3e] hover:underline"
        >
          {match[1]}
        </a>,
      )
      lastIndex = regex.lastIndex
    }

    if (lastIndex < text.length) {
      parts.push(text.substring(lastIndex))
    }

    return parts.length > 0 ? parts : text
  }, [])

  // Memoized project filtering so typing in the search box only re-renders the grid
  const filteredProjects = useMemo(() => {
    const query = projectSearch.toLowerCase()
    return fallbackProjects.filter((p) => {
      const matchSearch =
        p.title.toLowerCase().includes(query) ||
        p.description.toLowerCase().includes(query)
      const matchFilter = projectFilter === "all" || p.status === projectFilter
      const matchTags =
        selectedProjectTags.length === 0 ||
        selectedProjectTags.some((tag) => p.tags.includes(tag))
      return matchSearch && matchFilter && matchTags
    })
  }, [projectSearch, projectFilter, selectedProjectTags])

  return (
    <section className="relative min-h-screen pb-16 overflow-hidden bg-[#09090e] scanlines font-sans selection:bg-[#a8ff3e]/30 selection:text-white">
      {/* CRT screen sweep & cursor ambient glow */}
      <div className="crt-sweep" />
      <div ref={glowRef} className="cursor-glow hidden lg:block" />
      <div
        ref={dotRef}
        className="cursor-glow-dot hidden lg:block pointer-events-none fixed w-8 h-8 rounded-full mix-blend-screen"
      />

      {/* Decorative auroras blobs */}
      <div className="absolute -z-10 top-[-10%] left-[-10%] w-[50%] h-[50%] rounded-full bg-[#a8ff3e]/5 blur-3xl animate-aurora pointer-events-none" />
      <div className="absolute -z-10 bottom-[-10%] right-[-10%] w-[50%] h-[50%] rounded-full bg-[#a8ff3e]/5 blur-3xl animate-aurora-delayed pointer-events-none" />

      {/* Header component */}
      <Header
        cvLang={cvLang}
        setCvLang={setCvLang}
        subView={subView}
        setSubView={setSubView}
        setSelectedPost={setSelectedPost}
        setView={setView}
      />

      {/* Mobile navigation header */}
      <div className="md:hidden flex justify-center py-2 bg-[#05070a]/90 border-b border-[#1e2230]/40 overflow-x-auto gap-3">
        {MOBILE_NAV_ITEMS.map((item) => (
          <button
            key={item.id}
            onClick={() => {
              setSubView(item.id)
              setSelectedPost(null)
            }}
            className={`font-mono text-[10px] font-bold py-1 px-2 rounded cursor-pointer ${
              subView === item.id
                ? "text-[#a8ff3e] bg-[#a8ff3e]/10 border border-[#a8ff3e]/20"
                : "text-[#6b7280]"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>

      {/* Main Pages Render */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 py-12">
        {/* Home page view */}
        {subView === "home" && (
          <HomeView
            cvLang={cvLang}
            onNavigate={(v) => {
              setSubView(v)
              setSelectedPost(null)
            }}
          />
        )}

        {/* Resume/CV page view */}
        {subView === "resume" && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 animate-fade-in-up">
            {/* Left column */}
            <div className="space-y-8">
              {/* Education */}
              <div className="rounded-xl p-6 bg-[#0f1117] border border-[#1e2230]">
                <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2 border-b border-[#1e2230] pb-2">
                  <span className="text-[#a8ff3e]">🎓</span>{" "}
                  {copy[cvLang].sectionEd}
                </h3>
                <div className="space-y-6">
                  {education[cvLang].map((ed, i) => (
                    <div key={i} className="flex gap-4">
                      {ed.image && (
                        <div className="w-12 h-12 rounded bg-white/5 p-1 flex-shrink-0 flex items-center justify-center border border-[#1e2230]">
                          <img
                            src={ed.image}
                            alt={ed.school}
                            loading="lazy"
                            decoding="async"
                            className="max-w-full max-h-full object-contain"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="text-sm font-semibold text-white leading-tight">
                          {ed.school}
                        </h4>
                        <div className="text-xs text-[#a8ff3e] font-mono mt-1">
                          {ed.period}
                        </div>
                        <div className="text-xs text-[#9ca3af] mt-1">
                          {ed.detail}
                        </div>
                        <div className="inline-block mt-2 font-mono text-[10px] px-2 py-0.5 rounded bg-[#a8ff3e]/10 text-[#a8ff3e] border border-[#a8ff3e]/20">
                          {copy[cvLang].gpaLabel}: {ed.gpa}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Self Development */}
              <div className="rounded-xl p-6 bg-[#0f1117] border border-[#1e2230]">
                <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2 border-b border-[#1e2230] pb-2">
                  <span className="text-[#a8ff3e]">💡</span>{" "}
                  {copy[cvLang].sectionSelf}
                </h3>
                <div className="mb-6">
                  <div className="font-mono text-xs text-[#6b7280] mb-3 uppercase tracking-wider">
                    {copy[cvLang].certLabel}
                  </div>
                  <div className="space-y-4">
                    {selfDevelopment[cvLang].certifications.map((cert, i) => (
                      <div key={i} className="flex gap-3 items-center">
                        {cert.image ? (
                          <div className="w-10 h-10 rounded bg-white/5 p-1 flex-shrink-0 flex items-center justify-center border border-[#1e2230]">
                            <img
                              src={cert.image}
                              alt={cert.name}
                              loading="lazy"
                              decoding="async"
                              className="max-w-full max-h-full object-contain"
                            />
                          </div>
                        ) : (
                          <div className="w-10 h-10 rounded bg-[#a8ff3e]/5 flex-shrink-0 flex items-center justify-center border border-[#a8ff3e]/10 text-xs text-[#a8ff3e]">
                            📜
                          </div>
                        )}
                        <div>
                          <div className="text-xs font-semibold text-white">
                            {cert.name}
                          </div>
                          <div className="text-[10px] text-[#6b7280]">
                            {cert.institution}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <div className="font-mono text-xs text-[#6b7280] mb-3 uppercase tracking-wider">
                    {copy[cvLang].workshopLabel}
                  </div>
                  <div className="space-y-3">
                    {selfDevelopment[cvLang].workshops.map((w, i) => (
                      <div
                        key={i}
                        className="border-l-2 border-[#1e2230] pl-3 py-0.5"
                      >
                        <div className="text-xs font-semibold text-white">
                          {w.name}
                        </div>
                        <div className="text-[10px] text-[#6b7280] mt-0.5">
                          {w.institution}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Leadership */}
              <div className="rounded-xl p-6 bg-[#0f1117] border border-[#1e2230]">
                <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2 border-b border-[#1e2230] pb-2">
                  <span className="text-[#a8ff3e]">🤝</span>{" "}
                  {copy[cvLang].sectionLead}
                </h3>
                <div className="space-y-6">
                  {leadership[cvLang].map((lead, i) => (
                    <div key={i} className="space-y-3">
                      {lead.image && (
                        <div className="rounded overflow-hidden border border-[#1e2230] relative max-h-[140px] flex items-center justify-center bg-black/20">
                          <img
                            src={lead.image}
                            alt={lead.title}
                            loading="lazy"
                            decoding="async"
                            className="w-full object-cover"
                          />
                        </div>
                      )}
                      <div>
                        <h4 className="text-xs font-bold text-white leading-snug">
                          {lead.title}
                        </h4>
                        <div className="font-mono text-[10px] text-[#a8ff3e] mt-1">
                          {lead.role} | {lead.period}
                        </div>
                        <p className="text-xs text-[#9ca3af] mt-2 leading-relaxed">
                          {lead.description}
                        </p>
                        <div className="mt-3">
                          <div className="flex flex-wrap gap-1.5">
                            {lead.softSkills.map((s, idx) => (
                              <span
                                key={idx}
                                className="px-2 py-0.5 rounded bg-[#a8ff3e]/5 text-[#a8ff3e] border border-[#a8ff3e]/15 text-[10px]"
                              >
                                {s}
                              </span>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Work history */}
              <div className="rounded-xl p-6 bg-[#0f1117] border border-[#1e2230]">
                <h3 className="font-display font-bold text-lg text-white mb-6 flex items-center gap-2 border-b border-[#1e2230] pb-2">
                  <span className="text-[#a8ff3e]">👔</span> Work History /
                  Experiences
                </h3>
                <div className="relative border-l-2 border-[#1e2230] ml-3 pl-6 space-y-8 py-2">
                  {experiences[cvLang].map((exp, i) => (
                    <div key={i} className="relative">
                      <div className="absolute -left-[31px] top-1.5 w-3.5 h-3.5 rounded-full bg-[#09090e] border-2 border-[#a8ff3e]" />
                      <div>
                        <h4 className="text-sm sm:text-base font-bold text-white">
                          {exp.title}
                        </h4>
                        <div className="font-mono text-xs text-[#a8ff3e] mt-1">
                          {exp.period}
                        </div>
                        <ul className="mt-4 space-y-2.5">
                          {exp.points.map((pt, idx) => (
                            <li
                              key={idx}
                              className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed flex gap-2"
                            >
                              <span className="text-[#a8ff3e] select-none">
                                •
                              </span>
                              <span>{parseMarkdownLinks(pt)}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Projects categories */}
              <div className="rounded-xl p-6 bg-[#0f1117] border border-[#1e2230]">
                <h3 className="font-display font-bold text-lg text-white mb-4 flex items-center gap-2 border-b border-[#1e2230] pb-2">
                  <span className="text-[#a8ff3e]">💻</span>{" "}
                  {copy[cvLang].sectionProf}
                </h3>
                <div className="flex flex-wrap gap-2 mb-6">
                  {(Object.keys(copy[cvLang].categories) as CVCategory[]).map(
                    (cat) => (
                      <button
                        key={cat}
                        onClick={() => setActiveProjectTab(cat)}
                        className={`px-3 py-1.5 rounded-lg font-mono text-xs font-semibold transition-all cursor-pointer ${
                          activeProjectTab === cat
                            ? "bg-[#a8ff3e] text-[#09090e]"
                            : "bg-[#09090e] text-[#6b7280] hover:text-white border border-[#1e2230]"
                        }`}
                      >
                        {copy[cvLang].categories[cat]}
                      </button>
                    ),
                  )}
                </div>
                <div className="space-y-6">
                  {professionalExperience[cvLang][activeProjectTab].map(
                    (proj, i) => (
                      <div
                        key={i}
                        className="p-5 rounded-lg bg-[#09090e] border border-[#1e2230]"
                      >
                        <div className="flex justify-between items-start gap-4">
                          <div>
                            <h4 className="text-sm sm:text-base font-bold text-white">
                              {proj.name}
                            </h4>
                            <div className="inline-block mt-1.5 font-mono text-[10px] px-2 py-0.5 rounded bg-[#a8ff3e]/10 text-[#a8ff3e]">
                              Role: {proj.role}
                            </div>
                          </div>
                          {proj.url && (
                            <a
                              href={proj.url}
                              target="_blank"
                              rel="noreferrer"
                              className="px-2.5 py-1 rounded bg-[#a8ff3e]/10 text-[#a8ff3e] border border-[#a8ff3e]/25 text-[10px]"
                            >
                              Link ↗
                            </a>
                          )}
                        </div>
                        <p className="text-xs sm:text-sm text-[#9ca3af] mt-4 leading-relaxed">
                          {proj.description}
                        </p>
                      </div>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Projects View */}
        {subView === "projects" && (
          <div className="space-y-8 animate-fade-in-up">
            <div className="bg-[#0f1117] border border-[#1e2230] rounded-xl p-6">
              <h3 className="font-display font-bold text-xl text-white mb-2">
                {cvLang === "en" ? "Open Source Projects" : "โปรเจกต์โอเพนซอร์ส"}
              </h3>
              <p className="text-xs text-[#9ca3af] mb-6">
                {cvLang === "en"
                  ? "Explore repositories and tools developed with passion and maintained with care."
                  : "รวมผลงานและเครื่องมือสาธารณะต่าง ๆ บน GitHub"}
              </p>

              <div className="flex flex-col gap-4">
                <div className="flex flex-col sm:flex-row gap-4">
                  <input
                    type="text"
                    placeholder={
                      cvLang === "en" ? "Search projects..." : "ค้นหาโปรเจกต์..."
                    }
                    value={projectSearch}
                    onChange={(e) => setProjectSearch(e.target.value)}
                    className="bg-[#05070a] border border-[#1e2230] rounded-lg px-4 py-2 text-xs font-mono text-white focus:outline-none focus:border-[#a8ff3e] flex-1"
                  />
                  <div className="flex flex-wrap gap-1.5">
                    {["all", "shipped", "in-progress", "archived"].map(
                      (status) => (
                        <button
                          key={status}
                          onClick={() => setProjectFilter(status)}
                          className={`px-3 py-1.5 rounded-lg font-mono text-[10px] uppercase font-bold transition-colors cursor-pointer ${
                            projectFilter === status
                              ? "bg-[#a8ff3e] text-[#09090e]"
                              : "bg-[#09090e] border border-[#1e2230] text-[#6b7280] hover:text-white"
                          }`}
                        >
                          {status === "all"
                            ? cvLang === "en"
                              ? "all"
                              : "ทั้งหมด"
                            : status}
                        </button>
                      ),
                    )}
                  </div>
                </div>

                {/* Tech tag filters */}
                <div className="flex flex-wrap items-center gap-1.5 border-t border-[#1e2230]/40 pt-3">
                  <span className="font-mono text-[10px] text-[#6b7280] mr-1">
                    Tags:
                  </span>
                  {allProjectTags.map((tag) => {
                    const isSelected = selectedProjectTags.includes(tag)
                    return (
                      <button
                        key={tag}
                        onClick={() => {
                          setSelectedProjectTags((prev) =>
                            prev.includes(tag)
                              ? prev.filter((t) => t !== tag)
                              : [...prev, tag],
                          )
                        }}
                        className={`px-2 py-0.5 rounded text-[10px] font-mono transition-colors cursor-pointer border ${
                          isSelected
                            ? "bg-[#a8ff3e]/10 text-[#a8ff3e] border-[#a8ff3e]/30"
                            : "bg-[#05070a] border-[#1e2230] text-[#6b7280] hover:text-white"
                        }`}
                      >
                        {tag}
                      </button>
                    )
                  })}
                  {selectedProjectTags.length > 0 && (
                    <button
                      onClick={() => setSelectedProjectTags([])}
                      className="px-2 py-0.5 rounded text-[10px] font-mono text-red-400 hover:text-white transition-colors cursor-pointer"
                    >
                      [clear filter]
                    </button>
                  )}
                </div>
              </div>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredProjects.map((p) => (
                <article
                  key={p.id}
                  className="group relative rounded-xl border border-[#1e2230] bg-[#0f1117] p-6 hover:border-[#a8ff3e]/40 transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between items-start gap-4 mb-3">
                      <span className="font-mono text-[10px] text-[#6b7280]">
                        {p.year}
                      </span>
                      <div className="flex items-center gap-1.5">
                        <span
                          className={`h-2 w-2 rounded-full ${
                            p.status === "shipped"
                              ? "bg-[#a8ff3e]"
                              : p.status === "in-progress"
                                ? "bg-yellow-500 animate-pulse"
                                : "bg-gray-500"
                          }`}
                        />
                        <span className="font-mono text-[9px] text-[#6b7280]">
                          {p.status}
                        </span>
                      </div>
                    </div>
                    <h4 className="font-display font-bold text-base text-white mb-2 group-hover:text-[#a8ff3e] transition-colors">
                      {p.title}
                    </h4>
                    <p className="text-xs text-[#9ca3af] leading-relaxed line-clamp-3 mb-4">
                      {p.description}
                    </p>
                  </div>
                  <div>
                    <div className="flex flex-wrap gap-1 mb-4">
                      {p.tags.map((tag) => (
                        <span
                          key={tag}
                          className="text-[9px] font-mono px-2 py-0.5 rounded bg-white/5 border border-[#1e2230] text-[#9ca3af]"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="flex items-center gap-3 pt-3 border-t border-[#1e2230]/40">
                      <a
                        href={p.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-mono text-[#6b7280] hover:text-[#a8ff3e] transition-colors"
                      >
                        GitHub ↗
                      </a>
                      {p.homepage && (
                        <a
                          href={p.homepage}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[10px] font-mono text-[#a8ff3e] hover:text-white transition-colors"
                        >
                          Live ↗
                        </a>
                      )}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}

        {/* Workbench page view */}
        {subView === "workbench" && (
          <div className="rounded-xl p-6 bg-[#0f1117] border border-[#1e2230] animate-fade-in-up">
            <h3 className="font-display font-bold text-lg text-white mb-2 flex items-center gap-2">
              <span className="text-[#a8ff3e]">🔨</span>{" "}
              {cvLang === "en" ? "Workbench" : "เวิร์กเบนช์"}
            </h3>
            <p className="text-xs text-[#6b7280] mb-6">
              {cvLang === "en"
                ? "Active development and prototype scripts local to the workspace."
                : "งานทดลองและโปรเจกต์ต้นแบบที่อยู่ระหว่างดำเนินการ"}
            </p>
            <div className="rounded-xl border border-[#1e2230] bg-[#05070a] overflow-hidden">
              <div className="flex items-center gap-2 border-b border-[#1e2230]/50 bg-[#0f1117] px-4 py-2.5">
                <div className="flex gap-1.5">
                  <div className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
                  <div className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
                </div>
                <span className="ml-3 font-mono text-[10px] text-[#6b7280]">
                  ~/WinTuner/active-workspace
                </span>
              </div>
              <div className="divide-y divide-[#1e2230]/40">
                {wipItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 hover:bg-white/[0.01] transition-colors"
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[#a8ff3e] font-mono text-xs font-bold">
                          ❯
                        </span>
                        <h4 className="font-mono text-xs font-bold text-white">
                          {item.name}
                        </h4>
                        <span className="font-mono text-[9px] text-[#6b7280]">
                          ({item.branch})
                        </span>
                      </div>
                      <p className="text-[11px] text-[#9ca3af] pl-4">
                        {item.description}
                      </p>
                    </div>
                    <div className="flex items-center justify-between gap-4 pl-4 sm:pl-0">
                      <div className="flex items-center gap-2">
                        <div className="w-20 bg-[#1e2230] h-1.5 rounded-full overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[#a8ff3e]"
                            style={{ width: `${item.progress}%` }}
                          />
                        </div>
                        <span className="font-mono text-[10px] text-[#a8ff3e] font-bold w-8">
                          {item.progress}%
                        </span>
                      </div>
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noreferrer"
                        className="text-[10px] font-mono text-[#6b7280] hover:text-white border border-[#1e2230] px-2 py-0.5 rounded bg-[#0f1117] transition-colors"
                      >
                        GitHub ↗
                      </a>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-[#0f1117]/30 px-4 py-2 border-t border-[#1e2230]/40 font-mono text-[10px] text-[#6b7280] flex items-center gap-1.5">
                <span className="text-[#a8ff3e]">❯</span>
                <span>git status --all</span>
                <span className="ml-auto text-[#a8ff3e]/40">
                  {cvLang === "en" ? "press enter to run" : "กด enter เพื่อเปิดดู"}
                </span>
              </div>
            </div>
          </div>
        )}

        {/* Blog page view */}
        {subView === "blog" && (
          <div className="space-y-8 animate-fade-in-up">
            {!selectedPost ? (
              <>
                <div className="bg-[#0f1117] border border-[#1e2230] rounded-xl p-6">
                  <h3 className="font-display font-bold text-xl text-white mb-2">
                    {cvLang === "en"
                      ? "Insights & Engineering Articles"
                      : "บทความด้านวิศวกรรมไอที"}
                  </h3>
                  <p className="text-xs text-[#9ca3af]">
                    {cvLang === "en"
                      ? "Thoughts, write-ups and deep dives into AI integrations, context protocols, and modern frontend tooling."
                      : "บันทึกข้อมูลทางเทคนิค คลังความรู้ และมุมมองเทคโนโลยีต่าง ๆ"}
                  </p>
                </div>
                <div className="grid gap-6 md:grid-cols-2">
                  {blogPosts.map((post) => (
                    <article
                      key={post.id}
                      onClick={() => setSelectedPost(post)}
                      className="group cursor-pointer rounded-xl border border-[#1e2230] bg-[#0f1117] p-6 hover:border-[#a8ff3e]/40 transition-colors flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-3 font-mono text-[10px] text-[#6b7280]">
                          <span>{post.date}</span>
                          <span className="px-2 py-0.5 rounded bg-[#a8ff3e]/10 text-[#a8ff3e] font-bold uppercase">
                            {post.category}
                          </span>
                        </div>
                        <h4 className="font-display font-bold text-base text-white mb-2 group-hover:text-[#a8ff3e] transition-colors">
                          {post.title}
                        </h4>
                        <p className="text-xs text-[#9ca3af] leading-relaxed line-clamp-3 mb-4">
                          {post.excerpt}
                        </p>
                      </div>
                      <div className="flex justify-between items-center pt-3 border-t border-[#1e2230]/40 font-mono text-[10px] text-[#6b7280]">
                        <span>{post.readTime}</span>
                        <span className="text-[#a8ff3e] group-hover:translate-x-1 transition-transform">
                          Read Article →
                        </span>
                      </div>
                    </article>
                  ))}
                </div>
              </>
            ) : (
              <article className="rounded-xl border border-[#1e2230] bg-[#0f1117] p-6 sm:p-8 space-y-6">
                <button
                  onClick={() => setSelectedPost(null)}
                  className="px-3 py-1.5 rounded border border-[#1e2230] font-mono text-xs text-[#9ca3af] hover:text-white hover:border-[#a8ff3e]/40 cursor-pointer transition-colors"
                >
                  ← {cvLang === "en" ? "Back to Articles" : "กลับไปหน้าสารบัญ"}
                </button>
                <div className="space-y-3">
                  <div className="flex items-center gap-3 font-mono text-xs">
                    <span className="text-[#6b7280]">{selectedPost.date}</span>
                    <span className="text-[#6b7280]">•</span>
                    <span className="text-[#6b7280]">
                      {selectedPost.readTime}
                    </span>
                    <span className="text-[#6b7280]">•</span>
                    <span className="px-2 py-0.5 rounded bg-[#a8ff3e]/10 text-[#a8ff3e] font-bold uppercase text-[9px]">
                      {selectedPost.category}
                    </span>
                  </div>
                  <h2 className="font-display font-bold text-2xl sm:text-3xl text-white">
                    {selectedPost.title}
                  </h2>
                  <div className="flex items-center gap-3 pt-2">
                    <span className="font-mono text-xs text-[#9ca3af]">
                      By {selectedPost.author.name} ({selectedPost.author.role})
                    </span>
                  </div>
                </div>
                <div className="pt-6 border-t border-[#1e2230] prose prose-invert max-w-none">
                  {renderBlogContent(selectedPost.content)}
                </div>
              </article>
            )}
          </div>
        )}

        {/* Interactive CLI Console view */}
        {subView === "terminal" && <TerminalConsole />}
      </main>

      {/* Footer component */}
      <Footer cvLang={cvLang} setView={setView} />
    </section>
  )
}
