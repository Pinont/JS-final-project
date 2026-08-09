interface SkillsSectionProps {
  lang: "EN" | "TH"
}
import skillsMd from "./content/skills.md?raw"
import { parseSkills } from "./parseContent"
import { tr } from "./translations"

const skillGroups = parseSkills(skillsMd)

export default function SkillsSection(props: SkillsSectionProps) {
  const lang = "EN"

  return (
    <section
      id="skills"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 10vw, 120px) 24px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: 16 }}>
          {tr("skills_label", lang)}
        </div>
        <h2
          style={{
            margin: "0 0 48px",
            fontSize: "clamp(28px, 4vw, 44px)",
            fontWeight: 800,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "var(--foreground)",
            lineHeight: 1.1,
          }}
        >
          {tr("skills_title", lang)}
        </h2>

        <div
          style={{
            border: "1px solid var(--border)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {skillGroups.map((group, i) => (
            <div
              key={group.category}
              style={{
                background: "var(--card)",
                padding: "20px 28px",
                borderBottom:
                  i < skillGroups.length - 1
                    ? "1px solid var(--border)"
                    : "none",
                display: "flex",
                alignItems: "baseline",
                gap: 24,
                flexWrap: "wrap",
              }}
            >
              <div
                style={{
                  fontFamily: "'Plus Jakarta Sans', sans-serif",
                  fontSize: 13,
                  fontWeight: 700,
                  color: "var(--foreground)",
                  flexShrink: 0,
                  width: 160,
                }}
              >
                {group.category}
              </div>
              <div
                style={{ display: "flex", flexWrap: "wrap", gap: 6, flex: 1 }}
              >
                {group.items.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: 10,
                      color: "var(--muted-foreground)",
                      border: "1px solid var(--border)",
                      padding: "3px 8px",
                      borderRadius: 2,
                      letterSpacing: "0.04em",
                      transition: "border-color 0.15s, color 0.15s",
                      cursor: "default",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "var(--primary)"
                      e.currentTarget.style.color = "var(--primary)"
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "var(--border)"
                      e.currentTarget.style.color = "var(--muted-foreground)"
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
