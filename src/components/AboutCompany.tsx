import { useState } from "react"

// 1.1 About Company

const CORE_VALUES = [
  {
    icon: "🔒",
    title: "Security First",
    body: "Every line we ship is written with defense-in-depth. Security is not an afterthought — it is the foundation.",
    color: "#a8ff3e",
  },
  {
    icon: "⚡",
    title: "Developer Speed",
    body: "We optimize for developer experience. Fast iteration, clean APIs, and tooling that gets out of your way.",
    color: "#00d4ff",
  },
  {
    icon: "🌐",
    title: "Open Ecosystem",
    body: "We build on open standards and contribute back. Vendor lock-in has no place in critical infrastructure.",
    color: "#b94fff",
  },
  {
    icon: "🤝",
    title: "Customer Trust",
    body: "We hold ourselves to SOC 2, ISO 27001, and HIPAA. Our customers trust us with their most sensitive data.",
    color: "#ff6b35",
  },
]

const EXPERTISE = [
  {
    label: "POS System Development",
    desc: "Enterprise-grade point-of-sale systems for retail chains and convenience stores",
    icon: "🏪",
  },
  {
    label: "Web Development",
    desc: "Full-stack web applications built with modern frameworks and best practices",
    icon: "💻",
  },
  {
    label: "Mobile App Development",
    desc: "Native and cross-platform mobile apps for iOS and Android",
    icon: "📱",
  },
  {
    label: "Cyber Security",
    desc: "Penetration testing, secret management, and zero-trust security architecture",
    icon: "🛡️",
  },
]

export default function AboutCompany() {
  return (
    <section id="about" className="py-28 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 50% at 50% 50%, rgba(168,255,62,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 font-mono text-xs"
            style={{
              background: "rgba(168,255,62,0.08)",
              border: "1px solid rgba(168,255,62,0.2)",
              color: "#a8ff3e",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            ABOUT THE COMPANY
          </div>
          <h2
            className="font-display font-bold mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#f0f2f5",
              letterSpacing: "-0.03em",
            }}
          >
            We secure the software
            <br />
            <span className="iridescent">that powers the world.</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#6b7280" }}
          >
            Founded by engineers, for engineers — Brick builds the security
            infrastructure layer that development teams rely on to ship with
            confidence. From POS systems to cloud-native platforms, we handle
            the hard parts so you can focus on your product.
          </p>
        </div>

        {/* Mission + Vision row */}
        <div className="grid md:grid-cols-2 gap-6 mb-16">
          <div
            className="rounded-2xl p-8"
            style={{ background: "#0f1117", border: "1px solid #1e2230" }}
          >
            <div
              className="font-mono text-xs mb-3 font-semibold"
              style={{ color: "#a8ff3e" }}
            >
              OUR MISSION
            </div>
            <h3
              className="font-display font-bold text-2xl mb-4"
              style={{ color: "#f0f2f5", letterSpacing: "-0.02em" }}
            >
              Make secure infrastructure accessible to every team.
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
              We believe security tooling should be as easy to use as your
              favorite IDE plugin. Our mission is to eliminate credentials chaos
              — scattered .env files, forgotten service tokens, and expiring
              certs — with a unified control plane that engineers actually enjoy
              using.
            </p>
          </div>

          <div
            className="rounded-2xl p-8"
            style={{ background: "#0f1117", border: "1px solid #1e2230" }}
          >
            <div
              className="font-mono text-xs mb-3 font-semibold"
              style={{ color: "#00d4ff" }}
            >
              OUR VISION
            </div>
            <h3
              className="font-display font-bold text-2xl mb-4"
              style={{ color: "#f0f2f5", letterSpacing: "-0.02em" }}
            >
              A world where breaches caused by leaked secrets are history.
            </h3>
            <p className="text-sm leading-relaxed" style={{ color: "#6b7280" }}>
              We envision a future where neither humans nor AI agents ever touch
              raw credentials. Ephemeral tokens, just-in-time access, and
              automated certificate lifecycles become the baseline — not a
              luxury reserved for FAANG-scale teams.
            </p>
          </div>
        </div>

        {/* Core Expertise */}
        <div className="mb-16">
          <div
            className="font-mono text-xs mb-8 text-center font-semibold"
            style={{ color: "#a8ff3e" }}
          >
            CORE EXPERTISE
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {EXPERTISE.map(({ label, desc, icon }) => (
              <div
                key={label}
                className="rounded-xl p-6 transition-all duration-200 cursor-default"
                style={{ background: "#0f1117", border: "1px solid #1e2230" }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    "#a8ff3e30"
                  ;(e.currentTarget as HTMLElement).style.background = "#111620"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    "#1e2230"
                  ;(e.currentTarget as HTMLElement).style.background = "#0f1117"
                }}
              >
                <div className="text-2xl mb-3">{icon}</div>
                <div
                  className="font-display font-semibold text-sm mb-2"
                  style={{ color: "#f0f2f5" }}
                >
                  {label}
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
        </div>

        {/* Core Values */}
        <div>
          <div
            className="font-mono text-xs mb-8 text-center font-semibold"
            style={{ color: "#a8ff3e" }}
          >
            WHAT WE STAND FOR
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {CORE_VALUES.map(({ icon, title, body, color }) => (
              <div
                key={title}
                className="rounded-xl p-6 transition-all duration-200 cursor-default"
                style={{ background: "#080a0f", border: "1px solid #1e2230" }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = `${color}40`
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 24px ${color}10`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    "#1e2230"
                  ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                }}
              >
                <div className="text-xl mb-3">{icon}</div>
                <div
                  className="font-display font-semibold text-sm mb-2"
                  style={{ color }}
                >
                  {title}
                </div>
                <p
                  className="font-mono text-xs leading-relaxed"
                  style={{ color: "#4b5563" }}
                >
                  {body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
