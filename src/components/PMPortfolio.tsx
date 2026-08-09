import { useState } from "react"
import type { View } from "../types"

export default function PMPortfolio({
  setView,
}: {
  setView: (v: View) => void
}) {
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: "Define MVP Scope & Architecture",
      col: "done",
      desc: "Alignment on core security models and tech stack.",
    },
    {
      id: 2,
      title: "UI Figma Wireframes & Prototypes",
      col: "done",
      desc: "Designing dashboard views and layout structures.",
    },
    {
      id: 3,
      title: "Setup Vite + React 19 + Tailwind v4",
      col: "done",
      desc: "Initial repository setup and build pipelines.",
    },
    {
      id: 4,
      title: "Develop Secret Vault & CLI Dashboard",
      col: "progress",
      desc: "Implementing client-side mock decryption terminal.",
    },
    {
      id: 5,
      title: "SOC 2 Compliance Mock Audit",
      col: "todo",
      desc: "Reviewing audit logging and role-based policies.",
    },
  ])
  const [completedCount, setCompletedCount] = useState(3)

  const moveTask = (taskId: number) => {
    setTasks((prev) => {
      const nextTasks = prev.map((t) => {
        if (t.id === taskId) {
          let nextCol = "todo"
          if (t.col === "todo") nextCol = "progress"
          else if (t.col === "progress") nextCol = "done"
          else nextCol = "todo"
          return { ...t, col: nextCol }
        }
        return t
      })
      setCompletedCount(nextTasks.filter((t) => t.col === "done").length)
      return nextTasks
    })
  }

  const columns = [
    {
      id: "todo",
      name: "To Do (ต้องทำ)",
      color: "#6b7280",
      bg: "rgba(107,114,128,0.06)",
    },
    {
      id: "progress",
      name: "In Progress (กำลังทำ)",
      color: "#ff6b35",
      bg: "rgba(255,107,53,0.06)",
    },
    {
      id: "done",
      name: "Done (เสร็จสิ้น)",
      color: "#a8ff3e",
      bg: "rgba(168,255,62,0.06)",
    },
  ]

  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden grid-bg">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(185,79,255,0.06) 0%, transparent 75%)",
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
              ;(e.currentTarget as HTMLElement).style.borderColor = "#b94fff"
              ;(e.currentTarget as HTMLElement).style.color = "#b94fff"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
              ;(e.currentTarget as HTMLElement).style.color = "#9ca3af"
            }}
          >
            ← Back to Team (กลับหน้าทีม)
          </button>

          <span className="font-mono text-xs text-[#b94fff] font-bold">
            PORTFOLIO // MEMBER 01
          </span>
        </div>

        {/* Member Profile Hero */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 mb-16 items-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div
              className="w-36 h-36 rounded-2xl flex items-center justify-center mb-6"
              style={{
                background: "rgba(185,79,255,0.08)",
                border: "1px solid rgba(185,79,255,0.2)",
              }}
            >
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                className="w-24 h-24 text-[#b94fff]"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
                <path
                  d="M30 68 L50 32 L70 68"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="32"
                  r="6"
                  fill="#09090e"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <circle
                  cx="30"
                  cy="68"
                  r="6"
                  fill="#09090e"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <circle
                  cx="70"
                  cy="68"
                  r="6"
                  fill="#09090e"
                  stroke="currentColor"
                  strokeWidth="3"
                />
                <circle cx="50" cy="32" r="2.5" fill="currentColor" />
                <circle cx="30" cy="68" r="2.5" fill="currentColor" />
                <circle cx="70" cy="68" r="2.5" fill="currentColor" />
              </svg>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-1">
              Nonniphat Tangrojanakhajorn
            </h1>
            <div className="font-display text-lg text-[#9ca3af] mb-4">
              นนท์นิพัทธ์ ตั้งโรจนขจร
            </div>
            <span
              className="inline-block font-mono text-xs px-3 py-1 rounded-full mb-6 font-semibold"
              style={{
                background: "rgba(185,79,255,0.12)",
                color: "#b94fff",
                border: "1px solid rgba(185,79,255,0.25)",
              }}
            >
              Project Manager (PM)
            </span>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "#0f1117", border: "1px solid #1e2230" }}
          >
            <div className="font-mono text-xs mb-3 text-[#b94fff] font-bold">
              BASIC INFO (ประวัติส่วนตัว)
            </div>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  NAME:
                </div>
                <div className="text-white font-semibold font-display">
                  Nonniphat Tangrojanakhajorn
                </div>
                <div className="text-[#9ca3af] text-xs font-display">
                  นนท์นิพัทธ์ ตั้งโรจนขจร
                </div>
              </div>
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  ROLE IN COMPANY:
                </div>
                <div className="text-[#b94fff] font-semibold">
                  Lead Project Manager
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
                <div className="text-white">pm.nonniphat@brick-team.io</div>
              </div>
            </div>
          </div>
        </div>

        {/* Agile Scrum Board Interactive Simulator */}
        <div className="mb-16">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 gap-4">
            <div>
              <div className="font-mono text-xs text-[#b94fff] mb-1 font-bold">
                INTERACTIVE EXPERIENCE
              </div>
              <h2 className="font-display font-bold text-2xl text-white">
                Sprint Kanban Board (คลิกเพื่อเลื่อนการทำงาน)
              </h2>
            </div>
            <div
              className="px-4 py-2 rounded-lg font-mono text-xs flex items-center gap-3"
              style={{ background: "#0f1117", border: "1px solid #1e2230" }}
            >
              <span className="text-[#6b7280]">Sprint Velocity:</span>
              <span className="text-[#a8ff3e] font-bold">
                {completedCount}/5 Tasks Completed
              </span>
            </div>
          </div>

          <p className="text-sm text-[#6b7280] mb-8 max-w-3xl leading-relaxed">
            As a Project Manager, maintaining a clean and active backlog is key.
            <strong> Click on any task card below</strong> to transition its
            state between columns and update the sprint completion rate.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {columns.map((col) => (
              <div
                key={col.id}
                className="rounded-xl p-4 flex flex-col gap-4 min-h-[350px]"
                style={{ background: col.bg, border: "1px solid #1e2230" }}
              >
                <div className="flex justify-between items-center pb-2 border-b border-[#1e2230]/50">
                  <span
                    className="font-mono text-xs font-bold"
                    style={{ color: col.color }}
                  >
                    {col.name}
                  </span>
                  <span
                    className="font-mono text-xs px-2 py-0.5 rounded"
                    style={{
                      background: "#0f1117",
                      color: "#6b7280",
                      border: "1px solid #1e2230",
                    }}
                  >
                    {tasks.filter((t) => t.col === col.id).length}
                  </span>
                </div>

                <div className="flex flex-col gap-3">
                  {tasks
                    .filter((t) => t.col === col.id)
                    .map((t) => (
                      <div
                        key={t.id}
                        onClick={() => moveTask(t.id)}
                        className="p-4 rounded-lg cursor-pointer transition-all duration-300 border border-[#1e2230] select-none hover:-translate-y-0.5"
                        style={{ background: "#0f1117" }}
                        onMouseEnter={(e) => {
                          ;(e.currentTarget as HTMLElement).style.borderColor =
                            "#b94fff50"
                          ;(e.currentTarget as HTMLElement).style.boxShadow =
                            "0 4px 20px rgba(185,79,255,0.05)"
                        }}
                        onMouseLeave={(e) => {
                          ;(e.currentTarget as HTMLElement).style.borderColor =
                            "#1e2230"
                          ;(e.currentTarget as HTMLElement).style.boxShadow =
                            "none"
                        }}
                      >
                        <h4 className="font-display font-semibold text-sm text-white mb-1.5">
                          {t.title}
                        </h4>
                        <p className="text-xs text-[#6b7280] leading-relaxed mb-3">
                          {t.desc}
                        </p>
                        <div className="flex justify-between items-center">
                          <span className="text-[10px] font-mono text-[#b94fff]">
                            TASK-0{t.id}
                          </span>
                          <span className="text-[10px] font-mono text-[#6b7280]">
                            Click to move →
                          </span>
                        </div>
                      </div>
                    ))}
                  {tasks.filter((t) => t.col === col.id).length === 0 && (
                    <div className="py-12 text-center text-xs text-[#374151] font-mono border border-dashed border-[#1e2230] rounded-lg">
                      No tasks in this column
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* PM Methodology Timeline */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-16"
          style={{ background: "#0f1117", border: "1px solid #1e2230" }}
        >
          <div className="font-mono text-xs mb-3 text-[#b94fff] font-bold">
            WORKFLOW ROADMAP
          </div>
          <h3 className="font-display font-semibold text-xl text-white mb-6">
            Development Lifecycle & Deliverables
          </h3>
          <div className="space-y-6 relative before:absolute before:left-3 before:top-2 before:bottom-2 before:w-[1px] before:bg-[#1e2230]">
            {[
              {
                phase: "Phase 1: Project Scoping & Chartering",
                desc: "Defining MVP scope, resource allocations, and initial roadmap in Jira.",
              },
              {
                phase: "Phase 2: Sprint Setup & Backlog Creation",
                desc: "Writing user stories, defining acceptance criteria, and prioritizing tech debt.",
              },
              {
                phase: "Phase 3: Cross-functional Syncs & QA",
                desc: "Daily stands, sprint reviews, and aligning designers with developers for smooth handoffs.",
              },
            ].map((p, idx) => (
              <div key={idx} className="relative pl-8">
                <div
                  className="absolute left-[7px] top-[5px] w-2.5 h-2.5 rounded-full"
                  style={{ background: "#b94fff", border: "2px solid #09090e" }}
                />
                <h4 className="font-display font-semibold text-sm text-white mb-1">
                  {p.phase}
                </h4>
                <p className="text-xs sm:text-sm text-[#6b7280] leading-relaxed">
                  {p.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Circle Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-[#1e2230]">
          <button
            onClick={() => setView("home")}
            className="text-xs font-mono text-[#6b7280] hover:text-white transition-colors cursor-pointer"
          >
            ← Back to Home
          </button>
          <button
            onClick={() => setView("portfolio-frontend")}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all cursor-pointer"
            style={{ background: "#b94fff", color: "#09090e" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#d38fff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#b94fff")}
          >
            Next Portfolio (Thanatphong) →
          </button>
        </div>
      </div>
    </section>
  )
}
