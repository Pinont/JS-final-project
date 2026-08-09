interface AboutSectionProps {
  lang: "EN" | "TH"
}
import { useEffect, useState, useRef } from "react"
import aboutMd from "./content/about.md?raw"
import { parseSocials, parseWork } from "./parseContent"
import { tr, IS_AVAILABLE } from "./translations"

interface Contribution {
  date: string
  count: number
  level: number
}
const LEVELS_DARK = ["#0e1117", "#0f2340", "#1a3d6e", "#2563a8", "#60a5fa"]
const LEVELS_LIGHT = ["#e2eaf5", "#bdd4f0", "#7aaee0", "#2d72c8", "#1d4ed8"]

const socials = parseSocials(aboutMd)
const workEntries = parseWork(aboutMd)

export default function AboutSection(props: AboutSectionProps) {
  const lang = props.lang as "EN" | "TH"
  const theme = "dark"
  const [contributions, setContributions] = useState<Contribution[]>([])
  const [loading, setLoading] = useState(true)
  const [tooltip, setTooltip] = useState<{
    text: string
    x: number
    y: number
  } | null>(null)
  const [animFrame, setAnimFrame] = useState(0)
  const animRef = useRef<number>(0)

  useEffect(() => {
    fetch("https://github-contributions-api.jogruber.de/v4/Pinont?y=last")
      .then((r) => r.json())
      .then((data) => {
        setContributions(data.contributions ?? [])
        setLoading(false)
      })
      .catch(() => {
        const mock: Contribution[] = []
        for (let i = 364; i >= 0; i--) {
          const d = new Date()
          d.setDate(d.getDate() - i)
          const count =
            Math.random() < 0.35 ? 0 : Math.floor(Math.random() * 12)
          mock.push({
            date: d.toISOString().slice(0, 10),
            count,
            level:
              count === 0
                ? 0
                : count < 3
                  ? 1
                  : count < 6
                    ? 2
                    : count < 9
                      ? 3
                      : 4,
          })
        }
        setContributions(mock)
        setLoading(false)
      })
  }, [])

  useEffect(() => {
    let t = 0
    const step = () => {
      t++
      if (t % 8 === 0) setAnimFrame((f) => f + 1)
      animRef.current = requestAnimationFrame(step)
    }
    animRef.current = requestAnimationFrame(step)
    return () => cancelAnimationFrame(animRef.current)
  }, [])

  const CELL = 11
  const GAP = 2
  const LEVELS = theme === "dark" ? LEVELS_DARK : LEVELS_LIGHT
  const weeks: Contribution[][] = []
  if (contributions.length > 0) {
    const firstDay = new Date(contributions[0].date).getDay()
    let week: Contribution[] = Array(firstDay).fill(null)
    for (const c of contributions) {
      week.push(c)
      if (week.length === 7) {
        weeks.push(week)
        week = []
      }
    }
    if (week.length > 0) weeks.push(week)
  }
  const totalCommits = contributions.reduce((s, c) => s + c.count, 0)

  return (
    <section
      id="about"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 10vw, 120px) 24px",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))",
          gap: 64,
          alignItems: "start",
        }}
      >
        {/* Left col */}
        <div>
          <div className="section-label" style={{ marginBottom: 16 }}>
            {tr("about_label", lang)}
          </div>
          <h2
            style={{
              margin: "0 0 24px",
              fontSize: "clamp(28px, 4vw, 44px)",
              fontWeight: 800,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
              color: "var(--foreground)",
              lineHeight: 1.1,
            }}
          >
            {tr("about_title", lang)}
          </h2>
          <p
            style={{
              fontSize: 15,
              lineHeight: 1.8,
              color: "var(--muted-foreground)",
              margin: 0,
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            {tr("about_bio", lang)}
          </p>

          {/* Social links — driven by about.md ---socials section */}
          <div
            style={{
              marginTop: 36,
              display: "flex",
              flexDirection: "column",
              gap: 10,
            }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.url}
                target={s.url.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  color: "var(--muted-foreground)",
                  textDecoration: "none",
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  transition: "color 0.2s",
                  letterSpacing: "0.05em",
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = "var(--primary)")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = "var(--muted-foreground)")
                }
              >
                <span style={{ fontSize: 16, width: 20, textAlign: "center" }}>
                  {s.icon}
                </span>
                <span style={{ color: "var(--foreground)", minWidth: 68 }}>
                  {s.label}
                </span>
                <span>→ {s.handle}</span>
              </a>
            ))}
          </div>
        </div>

        {/* Right col — work experience */}
        <div>
          <div
            style={{
              border: "1px solid var(--border)",
              borderRadius: 2,
              background: "var(--card)",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 10,
                letterSpacing: "0.25em",
                color: "var(--muted-foreground)",
                textTransform: "uppercase",
                padding: "20px 28px 16px",
                borderBottom: "1px solid var(--border)",
              }}
            >
              {tr("about_work", lang)}
            </div>

            {workEntries.map((job, i) => (
              <div
                key={job.company}
                style={{
                  display: "flex",
                  alignItems: "flex-start",
                  gap: 16,
                  padding: "20px 28px",
                  borderBottom:
                    i < workEntries.length - 1
                      ? "1px solid var(--border)"
                      : undefined,
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    border: "1px solid var(--border)",
                    borderRadius: 2,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 10,
                    color: "var(--primary)",
                    flexShrink: 0,
                    background: "var(--muted)",
                    letterSpacing: "-0.05em",
                  }}
                >
                  {job.logo}
                </div>
                <div>
                  <div
                    style={{
                      fontFamily: "'Plus Jakarta Sans', sans-serif",
                      fontWeight: 700,
                      fontSize: 15,
                      color: "var(--foreground)",
                      marginBottom: 4,
                    }}
                  >
                    {job.company}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 12,
                      color: "var(--primary)",
                      marginBottom: 4,
                    }}
                  >
                    {lang === "TH" ? job.roleTH : job.roleEN}
                  </div>
                  <div
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 11,
                      color: "var(--muted-foreground)",
                    }}
                  >
                    {lang === "TH" ? job.periodTH : job.periodEN}
                  </div>
                </div>
              </div>
            ))}

            {/* Availability status */}
            <div
              style={{
                padding: "16px 28px",
                borderTop: "1px solid var(--border)",
                display: "flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "var(--muted-foreground)",
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: "50%",
                  background: IS_AVAILABLE ? "#22c55e" : "#ef4444",
                  display: "inline-block",
                  boxShadow: IS_AVAILABLE
                    ? "0 0 6px #22c55e"
                    : "0 0 6px #ef4444",
                  animation: "pulse 2s infinite",
                  flexShrink: 0,
                }}
              />
              {tr("about_available", lang)}
            </div>
          </div>

          {/* GitHub contribution graph */}
          <div
            style={{
              marginTop: 16,
              border: "1px solid var(--border)",
              borderRadius: 2,
              background: "var(--card)",
              padding: "16px 20px",
              overflow: "hidden",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                marginBottom: 12,
              }}
            >
              <span
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "var(--muted-foreground)",
                  textTransform: "uppercase",
                }}
              >
                GitHub Activity
              </span>
              {!loading && (
                <span
                  style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: 11,
                    color: "var(--primary)",
                  }}
                >
                  {totalCommits} contributions
                </span>
              )}
            </div>
            {loading ? (
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 11,
                  color: "var(--muted-foreground)",
                  letterSpacing: "0.1em",
                  padding: "20px 0",
                  textAlign: "center",
                }}
              >
                LOADING...
              </div>
            ) : (
              <>
                <div style={{ overflowX: "auto" }}>
                  <div
                    style={{
                      display: "flex",
                      gap: GAP,
                      alignItems: "flex-start",
                    }}
                  >
                    {weeks.map((week, wi) => (
                      <div
                        key={wi}
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          gap: GAP,
                        }}
                      >
                        {week.map((day, di) => {
                          if (!day)
                            return (
                              <div
                                key={di}
                                style={{ width: CELL, height: CELL }}
                              />
                            )
                          const twinkle = animFrame % 60 === (wi * 7 + di) % 60
                          return (
                            <div
                              key={di}
                              onMouseEnter={(e) =>
                                setTooltip({
                                  text: `${day.date}: ${day.count}`,
                                  x: e.clientX,
                                  y: e.clientY,
                                })
                              }
                              onMouseLeave={() => setTooltip(null)}
                              style={{
                                width: CELL,
                                height: CELL,
                                borderRadius: 2,
                                background: LEVELS[day.level],
                                boxShadow:
                                  day.level >= 3 && twinkle
                                    ? `0 0 4px ${LEVELS[4]}`
                                    : "none",
                                cursor: "default",
                                transition: "box-shadow 0.3s",
                              }}
                            />
                          )
                        })}
                      </div>
                    ))}
                  </div>
                </div>
                <div
                  style={{
                    marginTop: 10,
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                    justifyContent: "flex-end",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: "var(--muted-foreground)",
                    }}
                  >
                    less
                  </span>
                  {LEVELS.map((color, i) => (
                    <div
                      key={i}
                      style={{
                        width: 9,
                        height: 9,
                        borderRadius: 2,
                        background: color,
                      }}
                    />
                  ))}
                  <span
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 9,
                      color: "var(--muted-foreground)",
                    }}
                  >
                    more
                  </span>
                </div>
              </>
            )}
          </div>
          {tooltip && (
            <div
              style={{
                position: "fixed",
                top: tooltip.y - 36,
                left: tooltip.x,
                transform: "translateX(-50%)",
                background: "var(--card)",
                border: "1px solid var(--border)",
                borderRadius: 2,
                padding: "4px 10px",
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: 11,
                color: "var(--foreground)",
                pointerEvents: "none",
                zIndex: 100,
                whiteSpace: "nowrap",
              }}
            >
              {tooltip.text}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
