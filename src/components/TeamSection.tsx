import type { View } from "../types"
import { TEAM_MEMBERS } from "./teamData"

export default function TeamSection({
  setView,
}: {
  setView: (v: View) => void
}) {
  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden grid-bg">
      {/* Glow effects */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(168,255,62,0.06) 0%, transparent 75%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        {/* Title */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 font-mono text-xs"
            style={{
              background: "rgba(168,255,62,0.08)",
              border: "1px solid rgba(168,255,62,0.2)",
              color: "#a8ff3e",
            }}
          >
            ABOUT US
          </div>
          <h1 className="font-display font-bold text-4xl md:text-6xl mb-4 text-white tracking-tight">
            Developer Team <span className="iridescent">(ทีมผู้พัฒนา)</span>
          </h1>
          <p className="text-[#6b7280] max-w-2xl mx-auto text-sm md:text-base leading-relaxed font-medium">
            Meet the engineers and designers behind the next generation of
            security infrastructure. We build tools that secure secrets,
            certificates, and identities for humans and machines.
          </p>
        </div>

        {/* Basic Info Box (ส่วนประวัติพื้นฐาน) */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-16 max-w-4xl mx-auto backdrop-blur-md"
          style={{
            background: "rgba(15, 17, 23, 0.7)",
            border: "1px solid #1e2230",
          }}
        >
          <div className="font-mono text-xs mb-3 text-[#a8ff3e] font-bold">
            BASIC INFO & TEAM OVERVIEW
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h2 className="font-display font-semibold text-2xl text-white mb-3 leading-snug">
                JavaScript Advanced Final Project
              </h2>
              <p className="text-xs sm:text-sm text-[#9ca3af] leading-relaxed">
                This project represents our final team milestone. We applied
                concepts of modern UI design, state management, components
                reusability, responsive structures, and security considerations
                using Vite, React 19, and Tailwind CSS v4.
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-3 font-mono text-xs text-[#9ca3af] border-t md:border-t-0 md:border-l border-[#1e2230] pt-4 md:pt-0 md:pl-8">
              <div>
                <span className="text-[#6b7280]">Project Name:</span>{" "}
                <span className="text-white">Brick Security Landing Suite</span>
              </div>
              <div>
                <span className="text-[#6b7280]">Tech Stack:</span>{" "}
                <span className="text-white">
                  React 19, Vite, Tailwind CSS v4, TypeScript
                </span>
              </div>
              <div>
                <span className="text-[#6b7280]">Team Email:</span>{" "}
                <span className="text-white">hello@brick-team.io</span>
              </div>
              <div>
                <span className="text-[#6b7280]">Division:</span>{" "}
                <span className="text-white">
                  Computer Science & Identity Management
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Members Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {TEAM_MEMBERS.map((m) => {
            return (
              <div
                key={m.id}
                className="group rounded-2xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 relative overflow-hidden"
                style={{
                  background: "#0f1117",
                  border: "1px solid #1e2230",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    m.accentColor
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 35px ${m.accentColor}15`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    "#1e2230"
                  ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                }}
              >
                {/* Background Accent glow inside card */}
                <div
                  className="absolute pointer-events-none -right-16 -top-16 w-36 h-36 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-40"
                  style={{ background: m.accentColor }}
                />

                <div className="flex flex-col items-center text-center">
                  {/* Profile Avatar Container */}
                  <div
                    className="w-24 h-24 rounded-full flex items-center justify-center mb-6 relative"
                    style={{ background: `${m.accentColor}08` }}
                  >
                    {m.id === "pm" && (
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 100 100"
                        className="w-20 h-20 transition-transform duration-500 group-hover:scale-110"
                      >
                        <defs>
                          <radialGradient
                            id="pm-glow"
                            cx="50%"
                            cy="50%"
                            r="50%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#b94fff"
                              stopOpacity="0.35"
                            />
                            <stop
                              offset="100%"
                              stopColor="#09090e"
                              stopOpacity="0"
                            />
                          </radialGradient>
                        </defs>
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="url(#pm-glow)"
                          stroke="#b94fff"
                          strokeWidth="1.5"
                          strokeDasharray="4 4"
                        />
                        <path
                          d="M35 65 L50 35 L65 65"
                          stroke="#b94fff"
                          strokeWidth="2.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          fill="none"
                          opacity="0.8"
                        />
                        <circle
                          cx="50"
                          cy="35"
                          r="5"
                          fill="#0f1117"
                          stroke="#b94fff"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="35"
                          cy="65"
                          r="5"
                          fill="#0f1117"
                          stroke="#b94fff"
                          strokeWidth="2.5"
                        />
                        <circle
                          cx="65"
                          cy="65"
                          r="5"
                          fill="#0f1117"
                          stroke="#b94fff"
                          strokeWidth="2.5"
                        />
                      </svg>
                    )}
                    {m.id === "frontend" && (
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 100 100"
                        className="w-20 h-20 transition-transform duration-500 group-hover:scale-110"
                      >
                        <defs>
                          <radialGradient
                            id="fe-glow"
                            cx="50%"
                            cy="50%"
                            r="50%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#a8ff3e"
                              stopOpacity="0.35"
                            />
                            <stop
                              offset="100%"
                              stopColor="#09090e"
                              stopOpacity="0"
                            />
                          </radialGradient>
                        </defs>
                        <circle
                          cx="50"
                          cy="50"
                          r="45"
                          fill="url(#fe-glow)"
                          stroke="#a8ff3e"
                          strokeWidth="1.5"
                          strokeDasharray="6 3"
                        />
                        <text
                          x="50"
                          y="58"
                          fontWeight="bold"
                          fontFamily="monospace"
                          fontSize="24"
                          fill="#a8ff3e"
                          textAnchor="middle"
                        >
                          &lt;/&gt;
                        </text>
                      </svg>
                    )}
                    {m.id === "uxui" && (
                      <div className="w-full h-full rounded-full overflow-hidden border border-[#00d4ff]/30 shadow-md">
                        <img
                          src="/ProfilePhooriwat.jpg"
                          alt="Phooriwat Suphakkanok"
                          loading="lazy"
                          decoding="async"
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.45]"
                          style={{
                            transform: "scale(1.3)",
                            transformOrigin: "65% 20%",
                          }}
                        />
                      </div>
                    )}
                  </div>

                  {/* Name and Basic Info */}
                  <h3 className="font-display font-bold text-xl text-white mb-0.5 transition-colors">
                    {m.nameEn}
                  </h3>
                  {m.nameTh && (
                    <div className="font-display text-sm text-[#9ca3af] mb-2 font-medium">
                      {m.nameTh}
                    </div>
                  )}

                  {/* Position Badge */}
                  <div
                    className="inline-block font-mono text-xs px-2.5 py-0.5 rounded-full mb-4 font-semibold"
                    style={{
                      background: `${m.accentColor}12`,
                      color: m.accentColor,
                      border: `1px solid ${m.accentColor}25`,
                    }}
                  >
                    {m.role}
                  </div>

                  {/* Bio */}
                  <p className="text-xs sm:text-sm text-[#6b7280] leading-relaxed mb-6">
                    {m.bio}
                  </p>
                </div>

                {/* Bottom section of card */}
                <div>
                  {/* Contact channels */}
                  <div className="flex justify-center gap-4 mb-6 border-t border-[#1e2230]/50 pt-5">
                    <a
                      href={`https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=${m.email}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#4b5563] hover:text-white transition-colors text-xs font-mono"
                      title={m.email}
                    >
                      ✉ Email
                    </a>
                    <span className="text-[#374151]">·</span>
                    <a
                      href={`https://github.com/${m.github}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#4b5563] hover:text-white transition-colors text-xs font-mono"
                    >
                      🐙 GitHub
                    </a>
                    <span className="text-[#374151]">·</span>
                    <a
                      href={`https://linkedin.com/in/${m.linkedin}`}
                      target="_blank"
                      rel="noreferrer"
                      className="text-[#4b5563] hover:text-white transition-colors text-xs font-mono"
                    >
                      💼 LinkedIn
                    </a>
                    {m.cv && (
                      <>
                        <span className="text-[#374151]">·</span>
                        <a
                          href={m.cv}
                          target="_blank"
                          rel="noreferrer"
                          className="text-[#4b5563] hover:text-white transition-colors text-xs font-mono"
                        >
                          📄 CV
                        </a>
                      </>
                    )}
                  </div>

                  {/* CTA Button */}
                  <button
                    onClick={() => setView(`portfolio-${m.id}`)}
                    className="w-full py-2.5 rounded-lg font-semibold text-sm transition-all cursor-pointer flex items-center justify-center gap-2"
                    style={{
                      background: "rgba(255,255,255,0.03)",
                      color: "#f0f2f5",
                      border: "1px solid #1e2230",
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.background =
                        m.accentColor
                      ;(e.currentTarget as HTMLElement).style.color = "#09090e"
                      ;(e.currentTarget as HTMLElement).style.borderColor =
                        m.accentColor
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.background =
                        "rgba(255,255,255,0.03)"
                      ;(e.currentTarget as HTMLElement).style.color = "#f0f2f5"
                      ;(e.currentTarget as HTMLElement).style.borderColor =
                        "#1e2230"
                    }}
                  >
                    View Portfolio →
                  </button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
