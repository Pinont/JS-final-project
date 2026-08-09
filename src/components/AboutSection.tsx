import { useState, useEffect } from "react"

// ─── Data ────────────────────────────────────────────────────────────────────

export const COMPANY_STATS = [
  { value: "10B+", label: "total secrets managed", color: "var(--primary)" },
  { value: "27K+", label: "GitHub stars", color: "var(--primary)" },
  { value: "100K+", label: "registered developers", color: "var(--primary)" },
  { value: "5M+", label: "secrets fetched daily", color: "var(--primary)" },
]

export const EXPERTISE = [
  {
    title: "Secrets Management",
    icon: "🔐",
    desc: "One vault for every secret, every environment. Dynamic secrets, auto-rotation, RBAC, and native sync to AWS, GCP, Azure, and Vercel.",
  },
  {
    title: "Certificate Management (PKI)",
    icon: "📜",
    desc: "PKI without the pain — automated TLS lifecycle, ACME support, multi-cloud discovery, and CRL/OCSP stapling across your fleet.",
  },
  {
    title: "Privileged Access (PAM)",
    icon: "🛡️",
    desc: "Just-in-time access with approval workflows, full session recording, command-level audit logs, and break-glass emergency access.",
  },
  {
    title: "Agent Proxy & AI Security",
    icon: "🤖",
    desc: "Route all agent secret access through an ephemeral proxy. Agents get scoped tokens that expire with the session — no leaked credentials.",
  },
]

export const CORE_VALUES = [
  {
    title: "Zero Standing Privilege",
    desc: "Access expires automatically. No cleanup, no sprawl, no standing credentials in your infra.",
  },
  {
    title: "Open Source First",
    desc: "Self-hostable by design. Audit the code, run it in your VPC, own your security posture.",
  },
  {
    title: "Developer Experience",
    desc: "CLI, SDKs, and integrations that developers actually love — security that gets out of the way.",
  },
  {
    title: "Agent-Ready",
    desc: "Built for the AI era — ephemeral tokens, per-session scoping, and full audit trails for autonomous agents.",
  },
]

// ─── Section: About Company ──────────────────────────────────────────────────

export default function AboutSection() {
  return (
    <section id="about" className="py-24 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div
          className="font-mono text-xs mb-3"
          style={{ color: "var(--primary)" }}
        >
          ABOUT BRICK
        </div>
        <h2
          className="font-display font-bold text-4xl md:text-5xl mb-4"
          style={{ color: "var(--foreground)", letterSpacing: "-0.02em" }}
        >
          The security infrastructure platform for modern teams
        </h2>
        <p
          className="text-lg max-w-3xl mx-auto"
          style={{ color: "var(--muted-foreground)" }}
        >
          Brick is an open-source secrets management, PKI, and privileged access
          platform — built for developers and AI agents alike. One control plane
          for every credential in your stack.
        </p>
      </div>

      {/* Mission */}
      <div
        className="rounded-2xl p-8 mb-12"
        style={{ background: "var(--card)", border: "1px solid var(--border)" }}
      >
        <h3
          className="font-display font-semibold text-2xl mb-3"
          style={{ color: "var(--foreground)" }}
        >
          Our Mission
        </h3>
        <p
          className="text-base leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          To eliminate secret sprawl, certificate outages, and standing
          privileges — by giving every engineering team a unified, auditable
          control plane for secrets, certificates, and access.
        </p>
      </div>

      {/* Expertise */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {EXPERTISE.map((item) => (
          <div
            key={item.title}
            className="rounded-xl p-6"
            style={{
              background: "var(--muted)",
              border: "1px solid var(--border)",
            }}
          >
            <div className="text-3xl mb-3">{item.icon}</div>
            <h4
              className="font-display font-semibold text-lg mb-2"
              style={{ color: "var(--foreground)" }}
            >
              {item.title}
            </h4>
            <p
              className="text-sm leading-relaxed"
              style={{ color: "var(--muted-foreground)" }}
            >
              {item.desc}
            </p>
          </div>
        ))}
      </div>

      {/* Core Values */}
      <div>
        <h3
          className="font-display font-semibold text-xl mb-6 text-center"
          style={{ color: "var(--foreground)" }}
        >
          What we value
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {CORE_VALUES.map((v) => (
            <div
              key={v.title}
              className="rounded-lg p-4 text-center"
              style={{
                background: "var(--card)",
                border: "1px solid var(--border)",
              }}
            >
              <div
                className="font-display font-semibold text-sm mb-2"
                style={{ color: "var(--primary)" }}
              >
                {v.title}
              </div>
              <p
                className="text-xs leading-relaxed"
                style={{ color: "var(--muted-foreground)" }}
              >
                {v.desc}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div
        className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-16 pt-12"
        style={{ borderTop: "1px solid var(--border)" }}
      >
        {COMPANY_STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <div
              className="font-display font-bold text-4xl mb-1"
              style={{ color: "var(--primary)" }}
            >
              {value}
            </div>
            <div
              className="text-sm font-mono"
              style={{ color: "var(--muted-foreground)" }}
            >
              {label}
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
