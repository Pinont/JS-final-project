// 1.2 Achievements

const ACHIEVEMENT_STATS = [
  { value: "50+", label: "POS systems deployed", color: "#a8ff3e" },
  { value: "10+", label: "years of delivery", color: "#00d4ff" },
  { value: "200+", label: "projects completed", color: "#b94fff" },
  { value: "99.9%", label: "uptime delivered", color: "#ff6b35" },
]

const FEATURED_PROJECT = {
  client: "7-Eleven Thailand",
  title: "Enterprise POS Platform",
  body: "We architected and delivered a high-availability point-of-sale platform handling millions of daily transactions across thousands of convenience-store locations — with offline-first sync, real-time inventory, and PCI-compliant payment flows.",
  tags: ["POS", "Retail", "High Availability", "Payments"],
}

const OTHER_PROJECTS = [
  {
    title: "NeoBank Mobile App",
    desc: "Cross-platform banking app with biometric auth and instant transfers for 1M+ users.",
    icon: "📱",
    color: "#a8ff3e",
  },
  {
    title: "Cloud Security Console",
    desc: "Zero-trust admin console with JIT access and full session audit replay.",
    icon: "🛡️",
    color: "#ff6b35",
  },
  {
    title: "Logistics Web Portal",
    desc: "Real-time fleet tracking dashboard serving 5,000+ daily dispatchers.",
    icon: "💻",
    color: "#00d4ff",
  },
]

const TECH_STACK = [
  "React 19",
  "TypeScript",
  "Node.js",
  "Vite",
  "Tailwind CSS",
  "PostgreSQL",
  "Docker",
  "AWS",
  "Kubernetes",
  "GraphQL",
]

export default function Achievements() {
  return (
    <section
      id="achievements"
      className="py-28 relative overflow-hidden"
      style={{ background: "#080a0f" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(0,212,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 font-mono text-xs"
            style={{
              background: "rgba(0,212,255,0.08)",
              border: "1px solid rgba(0,212,255,0.2)",
              color: "#00d4ff",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            ACHIEVEMENTS & PROVEN WORK
          </div>
          <h2
            className="font-display font-bold mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#f0f2f5",
              letterSpacing: "-0.03em",
            }}
          >
            Results that speak
            <br />
            <span className="iridescent">for themselves.</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#6b7280" }}
          >
            A decade of shipping production systems for enterprises and startups
            alike — from convenience-store POS networks to secure cloud
            platforms.
          </p>
        </div>

        {/* Stats row */}
        <div
          className="grid grid-cols-2 md:grid-cols-4 gap-px mb-16 rounded-2xl overflow-hidden"
          style={{ background: "#1e2230", border: "1px solid #1e2230" }}
        >
          {ACHIEVEMENT_STATS.map(({ value, label, color }) => (
            <div
              key={label}
              className="text-center py-8"
              style={{ background: "#0f1117" }}
            >
              <div
                className="font-display font-bold text-4xl mb-1 glow-green"
                style={{ color }}
              >
                {value}
              </div>
              <div className="text-xs font-mono" style={{ color: "#4b5563" }}>
                {label}
              </div>
            </div>
          ))}
        </div>

        {/* Featured project */}
        <div
          className="rounded-2xl p-8 sm:p-10 mb-12 relative overflow-hidden"
          style={{ background: "#0f1117", border: "1px solid #1e2230" }}
        >
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                "radial-gradient(ellipse 50% 80% at 85% 10%, rgba(168,255,62,0.06) 0%, transparent 60%)",
            }}
          />
          <div className="relative z-10">
            <div
              className="font-mono text-xs mb-3 font-semibold"
              style={{ color: "#a8ff3e" }}
            >
              FEATURED CASE STUDY
            </div>
            <div className="flex flex-col lg:flex-row lg:items-center gap-2 lg:gap-4 mb-4">
              <h3
                className="font-display font-bold text-2xl sm:text-3xl"
                style={{ color: "#f0f2f5", letterSpacing: "-0.02em" }}
              >
                {FEATURED_PROJECT.title}
              </h3>
              <span
                className="inline-block font-mono text-xs px-2.5 py-1 rounded-full self-start lg:self-auto"
                style={{
                  background: "rgba(168,255,62,0.1)",
                  color: "#a8ff3e",
                  border: "1px solid rgba(168,255,62,0.25)",
                }}
              >
                {FEATURED_PROJECT.client}
              </span>
            </div>
            <p
              className="text-sm leading-relaxed max-w-3xl mb-6"
              style={{ color: "#6b7280" }}
            >
              {FEATURED_PROJECT.body}
            </p>
            <div className="flex flex-wrap gap-2">
              {FEATURED_PROJECT.tags.map((t) => (
                <span
                  key={t}
                  className="font-mono text-xs px-3 py-1.5 rounded-lg"
                  style={{
                    background: "#080a0f",
                    color: "#9ca3af",
                    border: "1px solid #1e2230",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Other projects */}
        <div className="grid sm:grid-cols-3 gap-4 mb-16">
          {OTHER_PROJECTS.map(({ title, desc, icon, color }) => (
            <div
              key={title}
              className="rounded-xl p-6 transition-all duration-200"
              style={{ background: "#0f1117", border: "1px solid #1e2230" }}
              onMouseEnter={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = `${color}40`
                ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${color}10`
              }}
              onMouseLeave={(e) => {
                ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
                ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
              }}
            >
              <div
                className="w-11 h-11 rounded-lg flex items-center justify-center text-xl mb-4"
                style={{
                  background: `${color}12`,
                  border: `1px solid ${color}25`,
                }}
              >
                {icon}
              </div>
              <div
                className="font-display font-semibold text-base mb-2"
                style={{ color: "#f0f2f5" }}
              >
                {title}
              </div>
              <p
                className="font-mono text-xs leading-relaxed"
                style={{ color: "#4b5563" }}
              >
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Tech stack */}
        <div>
          <div
            className="font-mono text-xs mb-6 text-center font-semibold"
            style={{ color: "#00d4ff" }}
          >
            TECHNOLOGY WE BUILD WITH
          </div>
          <div className="flex flex-wrap justify-center gap-2.5">
            {TECH_STACK.map((t) => (
              <span
                key={t}
                className="font-mono text-xs px-4 py-2 rounded-full transition-colors cursor-default"
                style={{
                  background: "#0f1117",
                  color: "#9ca3af",
                  border: "1px solid #1e2230",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = "#a8ff3e"
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    "#a8ff3e40"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.color = "#9ca3af"
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    "#1e2230"
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
