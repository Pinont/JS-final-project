interface ProjectsSectionProps {
  lang: "EN" | "TH"
}
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { projects } from "./projectData"
import GlowButton from "./GlowButton"
import { tr } from "./translations"

const statusColor: Record<string, string> = {
  Live: "#60a5fa",
  Done: "#888888",
  Maintenance: "#38bdf8",
}

export default function ProjectsSection(props: ProjectsSectionProps) {
  const lang = props.lang as "EN" | "TH"
  const [active, setActive] = useState<string | null>(null)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)")
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches)
    mq.addEventListener("change", handler)
    setIsMobile(mq.matches)
    return () => mq.removeEventListener("change", handler)
  }, [])

  const isExpanded = (id: string) => active === id

  const handleInteraction = (id: string) => {
    if (isMobile) {
      setActive((prev) => (prev === id ? null : id))
    }
  }

  return (
    <section
      id="projects"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 10vw, 120px) 24px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: 16 }}>
          {tr("projects_label", lang)}
        </div>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "baseline",
            marginBottom: 48,
            flexWrap: "wrap",
            gap: 8,
          }}
        >
          <h2
            style={{
              margin: 0,
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "var(--foreground)",
              lineHeight: 1.1,
            }}
          >
            {tr("projects_title", lang)}
          </h2>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "var(--muted-foreground)",
              letterSpacing: "0.12em",
            }}
          >
            {isMobile ? "Tap to explore" : tr("projects_sub", lang)}
          </span>
        </div>

        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              onHoverStart={() => !isMobile && setActive(project.id)}
              onHoverEnd={() => !isMobile && setActive(null)}
              onClick={() => handleInteraction(project.id)}
              animate={{
                height: isExpanded(project.id)
                  ? isMobile
                    ? "auto"
                    : 300
                  : isMobile
                    ? 72
                    : 68,
                opacity: active && !isExpanded(project.id) ? 0.45 : 1,
              }}
              transition={{
                type: "spring",
                stiffness: 280,
                damping: 32,
                mass: 0.9,
              }}
              style={{
                borderBottom:
                  i < projects.length - 1 ? "1px solid var(--border)" : "none",
                overflow: "hidden",
                cursor: "pointer",
                position: "relative",
              }}
            >
              {/* Background image */}
              <motion.div
                animate={{ scale: isExpanded(project.id) ? 1.0 : 1.04 }}
                transition={{ type: "spring", stiffness: 280, damping: 32 }}
                style={{
                  position: "absolute",
                  inset: 0,
                  backgroundImage: `url(${project.image})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center",
                  opacity: isExpanded(project.id) ? 1 : 0,
                  transition: "opacity 0.4s",
                }}
              />
              {/* Blue-tinted overlay — lets bg show through while keeping text legible */}
              {isExpanded(project.id) && (
                <div
                  style={{
                    position: "absolute",
                    inset: 0,
                    background:
                      "linear-gradient(105deg, rgba(4,20,55,0.82) 0%, rgba(6,30,75,0.68) 45%, rgba(10,40,90,0.35) 100%)",
                    backdropFilter: "saturate(1.4)",
                  }}
                />
              )}

              {/* Row header */}
              <div
                style={{
                  position: "relative",
                  zIndex: 1,
                  minHeight: isMobile ? 72 : 68,
                  display: "flex",
                  alignItems: "center",
                  padding: isMobile ? "12px 16px" : "0 24px",
                  gap: isMobile ? 10 : 16,
                  flexWrap: isMobile ? "wrap" : "nowrap",
                }}
              >
                {/* Index */}
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: isExpanded(project.id)
                      ? "var(--primary)"
                      : "var(--muted-foreground)",
                    width: 24,
                    flexShrink: 0,
                    transition: "color 0.2s",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>

                {/* Name + status row on mobile */}
                <div
                  style={{
                    flex: 1,
                    minWidth: 0,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 8,
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: isMobile ? 14 : 15,
                      color: isExpanded(project.id)
                        ? "#ffffff"
                        : "var(--foreground)",
                      textShadow: isExpanded(project.id)
                        ? "0 1px 10px rgba(0,0,0,0.9)"
                        : "none",
                      transition: "color 0.2s, text-shadow 0.2s",
                      whiteSpace: isMobile ? "normal" : "nowrap",
                      overflow: "hidden",
                      textOverflow: isMobile ? "clip" : "ellipsis",
                      lineHeight: 1.3,
                    }}
                  >
                    {lang === "TH" ? project.nameTH : project.name}
                  </span>

                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      letterSpacing: "0.1em",
                      color: statusColor[project.status],
                      padding: "2px 8px",
                      border: `1px solid ${statusColor[project.status]}44`,
                      borderRadius: 2,
                      flexShrink: 0,
                      whiteSpace: "nowrap",
                    }}
                  >
                    {project.status}
                  </span>
                </div>

                {/* Stack pills — desktop only */}
                {!isMobile && (
                  <div
                    style={{
                      display: "flex",
                      gap: 6,
                      flexWrap: "nowrap",
                      overflow: "hidden",
                      flexShrink: 0,
                    }}
                  >
                    {project.stack.slice(0, 3).map((s) => (
                      <span
                        key={s}
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          color: isExpanded(project.id)
                            ? "rgba(255,255,255,0.6)"
                            : "var(--muted-foreground)",
                          border: "1px solid",
                          borderColor: isExpanded(project.id)
                            ? "rgba(255,255,255,0.2)"
                            : "var(--border)",
                          padding: "2px 6px",
                          borderRadius: 2,
                          whiteSpace: "nowrap",
                          transition: "all 0.2s",
                        }}
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                )}

                {/* Mobile expand indicator */}
                {isMobile && (
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: "var(--muted-foreground)",
                      flexShrink: 0,
                      transition: "transform 0.2s",
                      transform: isExpanded(project.id)
                        ? "rotate(180deg)"
                        : "none",
                      display: "inline-block",
                    }}
                  >
                    ▾
                  </span>
                )}
              </div>

              {/* Expanded content */}
              <AnimatePresence>
                {isExpanded(project.id) && (
                  <motion.div
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ delay: 0.08, duration: 0.2 }}
                    style={{
                      position: "relative",
                      zIndex: 1,
                      padding: isMobile
                        ? "12px 16px 20px 16px"
                        : "0 24px 28px 64px",
                      display: "flex",
                      flexDirection: "column",
                      gap: 0,
                    }}
                  >
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "'Plus Jakarta Sans', sans-serif",
                        fontSize: isMobile ? 14 : 15,
                        lineHeight: 1.7,
                        color: "#ffffff",
                        textShadow: "0 1px 8px rgba(0,0,10,0.7)",
                        maxWidth: 520,
                        fontWeight: 500,
                      }}
                    >
                      {lang === "TH" ? project.descTH : project.desc}
                    </p>

                    <div
                      style={{
                        marginTop: 14,
                        display: "flex",
                        gap: 6,
                        flexWrap: "wrap",
                      }}
                    >
                      {project.stack.map((s) => (
                        <span
                          key={s}
                          style={{
                            fontFamily: "'JetBrains Mono', monospace",
                            fontSize: 10,
                            color: "#93c5fd",
                            background: "rgba(96,165,250,0.12)",
                            border: "1px solid rgba(96,165,250,0.35)",
                            padding: "3px 8px",
                            borderRadius: 2,
                            letterSpacing: "0.05em",
                          }}
                        >
                          {s}
                        </span>
                      ))}
                    </div>

                    <div
                      style={{
                        marginTop: 16,
                        display: "flex",
                        alignItems: "center",
                        gap: 16,
                        flexWrap: "wrap",
                      }}
                    >
                      {project.link && (
                        <GlowButton
                          href={project.link}
                          variant="primary"
                          onClick={(e) => {
                            e.stopPropagation()
                          }}
                          style={{ fontSize: 11, padding: "9px 20px" }}
                        >
                          VIEW PROJECT →
                        </GlowButton>
                      )}
                      <span
                        style={{
                          fontFamily: "'JetBrains Mono', monospace",
                          fontSize: 10,
                          color: "rgba(255,255,255,0.4)",
                          letterSpacing: "0.18em",
                          textTransform: "uppercase",
                        }}
                      >
                        {project.type} PROJECT
                      </span>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
