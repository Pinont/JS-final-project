import { useState } from "react"

// ─── Data ────────────────────────────────────────────────────────────────────

export const BRICK_IMPLEMENTATIONS = [
  {
    title: "Banking Group — Multi-Region Brick",
    client: "Major Thai commercial bank",
    scope: "3 regions, 12 clusters, 2,000+ engineers",
    tech: ["Brick Cloud", "Kubernetes", "Vault sync", "GitLab CI"],
    highlights: [
      "Migrated from HashiCorp Vault to Brick in 8 weeks",
      "Zero-downtime secret rotation across 500+ services",
      "Unified RBAC across dev/staging/prod with GitOps",
      "Compliance evidence automation via Brick audit logs",
    ],
  },
  {
    title: "Fintech Startup — Agent Proxy for AI Platform",
    client: "AI-powered lending platform (Series B)",
    scope: "50+ LLM agents, 10M+ monthly requests",
    tech: ["Brick Agent Proxy", "OpenAI/Anthropic", "Kubernetes", "Prometheus"],
    highlights: [
      "Eliminated all raw API keys from model context windows",
      "Per-agent ephemeral tokens with 15-min TTL",
      "Full audit trail for regulator compliance",
      "Sub-50ms proxy latency at peak load",
    ],
  },
  {
    title: "E-commerce Platform — PKI Automation",
    client: "Thailand's largest marketplace",
    scope: "1,200+ domains, 99.99% cert renewal success",
    tech: ["Brick PKI", "ACME", "Cloudflare", "AWS ALB", "Terraform"],
    highlights: [
      "Replaced manual cert management (was 40 hrs/month)",
      "Auto-discovery of 200+ expiring certs in first scan",
      "Multi-cloud sync: Cloudflare, AWS, GCP, Azure",
      "CRL/OCSP stapling enabled fleet-wide",
    ],
  },
]

export const PROJECT_HIGHLIGHTS = [
  {
    title: "Brick Self-Hosted HA Deployment",
    category: "Platform Operations",
    desc: "Production-grade self-hosted Brick on Kubernetes with PostgreSQL, Redis, and S3 backend.",
    tech: ["Kubernetes", "PostgreSQL", "Redis", "MinIO", "Helm", "ArgoCD"],
    metrics: "99.99% uptime, <5 min RTO, <1 min RPO",
  },
  {
    title: "Secret Migration: Vault → Brick",
    category: "Migration",
    desc: "Automated migration of 50,000+ secrets with validation and rollback capability.",
    tech: ["Python", "Brick SDK", "HashiCorp Vault API", "GitHub Actions"],
    metrics: "Zero secrets leaked, 100% parity verified",
  },
  {
    title: "Agent Proxy Integration for LLM Platform",
    category: "AI Security",
    desc: "Scoped token proxy for 100+ autonomous agents with real-time audit streaming.",
    tech: ["Brick Agent Proxy", "FastAPI", "OpenTelemetry", "Grafana"],
    metrics: "Zero credential leaks, 99.9% token validity rate",
  },
  {
    title: "PKI Certificate Fleet Management",
    category: "Certificate Automation",
    desc: "Full TLS lifecycle automation for 2,000+ certificates across hybrid cloud.",
    tech: ["Brick PKI", "ACME", "Terraform", "cert-manager", "Slack alerts"],
    metrics: "0 cert expiries in 18 months, 95% ops time saved",
  },
]

export const TECH_STACK = [
  "Brick (Cloud / Self-Hosted)",
  "Kubernetes / Helm / ArgoCD",
  "Terraform / OpenTofu",
  "HashiCorp Vault (migration)",
  "AWS / GCP / Azure / Cloudflare",
  "GitLab CI / GitHub Actions",
  "Prometheus / Grafana / Loki",
  "OpenTelemetry / Jaeger",
  "Python / Go / TypeScript",
  "Compliance & Security Standards",
]

// ─── Section: Achievements ───────────────────────────────────────────────────

export default function AchievementsSection() {
  const [activeTab, setActiveTab] = useState<"impl" | "projects" | "tech">(
    "impl",
  )

  const tabs = [
    { id: "impl", label: "Brick Implementations" },
    { id: "projects", label: "Key Projects" },
    { id: "tech", label: "Tech & Compliance" },
  ] as const

  return (
    <section id="achievements" className="py-24" style={{ background: "var(--background)" }}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="font-mono text-xs mb-3 uppercase tracking-widest text-[var(--primary)] font-semibold">
            ACHIEVEMENTS
          </div>
          <h2
            className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4 text-white"
            style={{ letterSpacing: "-0.02em" }}
          >
            What we've secured
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto"
            style={{ color: "var(--muted-foreground)" }}
          >
            Production Brick deployments across banking, fintech, and
            e-commerce — managing billions of secrets and thousands of
            certificates.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex flex-wrap gap-2 mb-10 justify-center">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className="px-4 py-2 rounded font-mono text-xs font-medium transition-all"
              style={{
                background:
                  activeTab === tab.id ? "var(--primary)" : "var(--card)",
                color:
                  activeTab === tab.id
                    ? "var(--background)"
                    : "var(--muted-foreground)",
                border: "1px solid var(--border)",
              }}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Implementations Tab */}
        {activeTab === "impl" && (
          <div className="space-y-8">
            {BRICK_IMPLEMENTATIONS.map((project, i) => (
              <div
                key={i}
                className="rounded-2xl overflow-hidden"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div className="p-8 md:p-12">
                  <div className="grid md:grid-cols-[1.5fr_2fr] gap-8">
                    <div>
                      <div
                        className="font-mono text-xs mb-2"
                        style={{ color: "var(--primary)" }}
                      >
                        BRICK DEPLOYMENT
                      </div>
                      <h3
                        className="font-display font-bold text-2xl md:text-3xl mb-2"
                        style={{ color: "var(--foreground)" }}
                      >
                        {project.title}
                      </h3>
                      <p
                        className="text-sm mb-4"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        {project.client}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {project.tech.map((t) => (
                          <span
                            key={t}
                            className="px-2 py-1 rounded text-xs font-mono"
                            style={{
                              background: "var(--muted)",
                              color: "var(--primary)",
                              border: "1px solid var(--border)",
                            }}
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                      <div
                        className="text-sm"
                        style={{ color: "var(--muted-foreground)" }}
                      >
                        Scope: {project.scope}
                      </div>
                    </div>
                    <ul className="space-y-3">
                      {project.highlights.map((h) => (
                        <li
                          key={h}
                          className="flex items-start gap-3 text-sm"
                          style={{ color: "var(--foreground)" }}
                        >
                          <svg
                            width="16"
                            height="16"
                            fill="none"
                            stroke="var(--primary)"
                            strokeWidth="2.5"
                            viewBox="0 0 24 24"
                            className="flex-shrink-0 mt-0.5"
                          >
                            <polyline points="20,6 9,17 4,12" />
                          </svg>
                          {h}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Key Projects Tab */}
        {activeTab === "projects" && (
          <div className="grid md:grid-cols-2 gap-6">
            {PROJECT_HIGHLIGHTS.map((p, i) => (
              <div
                key={i}
                className="rounded-xl p-6"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <div
                  className="font-mono text-xs mb-2"
                  style={{ color: "var(--primary)" }}
                >
                  {p.category}
                </div>
                <h4
                  className="font-display font-semibold text-lg mb-2"
                  style={{ color: "var(--foreground)" }}
                >
                  {p.title}
                </h4>
                <p
                  className="text-sm mb-4 leading-relaxed"
                  style={{ color: "var(--muted-foreground)" }}
                >
                  {p.desc}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {p.tech.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-1 rounded text-xs font-mono"
                      style={{
                        background: "var(--muted)",
                        color: "var(--foreground)",
                        border: "1px solid var(--border)",
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                <div
                  className="text-xs font-mono pt-3"
                  style={{
                    borderTop: "1px solid var(--border)",
                    color: "var(--primary)",
                  }}
                >
                  {p.metrics}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Tech & Compliance Tab */}
        {activeTab === "tech" && (
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
            {TECH_STACK.map((t) => (
              <div
                key={t}
                className="rounded-xl p-6"
                style={{
                  background: "var(--card)",
                  border: "1px solid var(--border)",
                }}
              >
                <span
                  className="font-mono text-sm"
                  style={{ color: "var(--foreground)" }}
                >
                  {t}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
