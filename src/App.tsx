import { useState, useEffect, useRef } from "react"

import TeamSection from "./components/TeamSection"
import PMPortfolio from "./components/PMPortfolio"
import FrontendPortfolio from "./components/FrontendPortfolio"
import UXUIPortfolio from "./components/UXUIPortfolio"
import ClientTestimonials from "./components/ClientTestimonials"
import Achievements from "./components/Achievements"
import DesignSystem from "./DesignSystem"

// ─── Data ────────────────────────────────────────────────────────────────────

const NAV_LINKS = [
  {
    label: "Products",
    sub: ["Secrets Management", "Certificate Management", "PAM", "Agent Proxy"],
  },
  {
    label: "Solutions",
    sub: ["DevOps", "Enterprise", "Compliance", "AI Agents"],
  },
  { label: "Docs", sub: [] },
  { label: "Pricing", sub: [] },
  { label: "Blog", sub: [] },
]

const TRUST_LOGOS = [
  "Cloudflare",
  "Vercel",
  "Stripe",
  "HashiCorp",
  "Databricks",
  "Notion",
  "Linear",
  "Figma",
  "PlanetScale",
  "Resend",
  "Cloudflare",
  "Vercel",
  "Stripe",
  "HashiCorp",
  "Databricks",
  "Notion",
  "Linear",
  "Figma",
  "PlanetScale",
  "Resend",
]

const STATS = [
  { value: "10B+", label: "secrets secured daily", color: "#a8ff3e" },
  { value: "27K+", label: "GitHub stars", color: "#a8ff3e" },
  { value: "100K+", label: "developers", color: "#a8ff3e" },
  { value: "99.99%", label: "uptime SLA", color: "#a8ff3e" },
]

const FEATURES = [
  {
    tag: "SECRETS MANAGEMENT",
    title: "One vault for every secret, every environment.",
    body: "Store, rotate, and sync secrets across dev, staging, and production. Fine-grained RBAC, audit trails, and automated rotation keep credentials safe without slowing down delivery.",
    color: "#a8ff3e",
    bullets: [
      "Dynamic secrets with auto-rotation",
      "Environment-scoped access policies",
      "Native sync to AWS, GCP, Azure, Vercel",
      "Secret versioning and rollback",
    ],
    terminal: `$ brick secrets get DB_PASSWORD
╔══════════════╦══════════════════════════════╗
║ Key          ║ Value                        ║
╠══════════════╬══════════════════════════════╣
║ DB_PASSWORD  ║ •••••••••••••••••••          ║
║ API_KEY      ║ •••••••••••••••••••          ║
║ JWT_SECRET   ║ •••••••••••••••••••          ║
╚══════════════╩══════════════════════════════╝
✓ 3 secrets fetched from production/backend`,
  },
  {
    tag: "CERTIFICATE MANAGEMENT",
    title: "PKI without the pain. Auto-renew, auto-deploy.",
    body: "Issue, renew, and revoke TLS certificates across your entire fleet. Discover expiring certs before they cause outages, and sync them directly to your load balancers and CDNs.",
    color: "#00d4ff",
    bullets: [
      "Automated certificate lifecycle",
      "ACME protocol support",
      "Multi-cloud PKI discovery",
      "CRL and OCSP stapling",
    ],
    terminal: `$ brick pki list --expiring-soon
  DOMAIN                  DAYS   STATUS
  api.acme.com             12   ⚠ EXPIRING
  dashboard.acme.com       45   ✓ VALID
  cdn.acme.com              8   ⚠ EXPIRING
  auth.acme.com            89   ✓ VALID

→ Auto-renewing 2 certificates...
✓ Renewed api.acme.com via ACME`,
  },
  {
    tag: "PRIVILEGED ACCESS",
    title: "Just-in-time sessions. Zero standing privilege.",
    body: "Grant engineers time-limited, audited access to production infrastructure. Every session is recorded, every command logged. Access expires automatically — no cleanup required.",
    color: "#b94fff",
    bullets: [
      "JIT access with approval workflows",
      "Session recording and replay",
      "Command-level audit logs",
      "Break-glass emergency access",
    ],
    terminal: `$ brick access request prod-db-1
  Requesting JIT access to prod-db-1
  Reason: Investigate slow query #4821
  Duration: 1 hour
  Approver: sarah@acme.com

✓ Access granted (expires 15:42 UTC)
✓ Session recording started
╰─ psql postgresql://prod-db-1:5432/app`,
  },
  {
    tag: "AGENT PROXY",
    title: "Your AI agents never touch real credentials.",
    body: "Route all agent secret access through an ephemeral proxy. Agents get scoped tokens that expire with their session — no credentials in prompts, no leaked secrets in logs.",
    color: "#ff6b35",
    bullets: [
      "Ephemeral sandbox credentials",
      "Per-session token scoping",
      "Prompt injection protection",
      "Full agent audit trail",
    ],
    terminal: `// Agent requests a secret via proxy
const secret = await brick.agent.get({
  key: "OPENAI_API_KEY",
  session: agentSession.id,
  scope: "inference-only",
})

// Token auto-expires when session ends
// No credential in prompt context ✓
// Full audit log entry created ✓`,
  },
]

const INTEGRATIONS = [
  { name: "AWS", icon: "☁️" },
  { name: "GCP", icon: "🔵" },
  { name: "Azure", icon: "🟦" },
  { name: "GitHub", icon: "⚫" },
  { name: "GitLab", icon: "🟠" },
  { name: "Kubernetes", icon: "🔷" },
  { name: "Terraform", icon: "🟣" },
  { name: "Ansible", icon: "🔴" },
  { name: "Docker", icon: "🐋" },
  { name: "Vercel", icon: "▲" },
  { name: "Netlify", icon: "🟢" },
  { name: "Railway", icon: "⚡" },
  { name: "Heroku", icon: "💜" },
  { name: "Fly.io", icon: "✈️" },
  { name: "Render", icon: "🟩" },
  { name: "Datadog", icon: "🐕" },
  { name: "Vault", icon: "🔒" },
  { name: "Okta", icon: "🔵" },
]

const TESTIMONIALS = [
  {
    quote:
      "Brick replaced a patchwork of .env files, SSM parameters, and a legacy Vault cluster. Setup took one afternoon. Our engineers actually love the CLI.",
    author: "Marcus Chen",
    role: "Staff Engineer",
    company: "Cloudflare",
    avatar: "MC",
  },
  {
    quote:
      "The agent proxy feature is what we were missing. Our LLM pipeline now has zero raw credentials in the context window. Compliance loves us again.",
    author: "Priya Nair",
    role: "Head of Platform",
    company: "Databricks",
    avatar: "PN",
  },
  {
    quote:
      "Certificate expiry used to be a quarterly fire drill. Brick's PKI automation removed that entirely. We haven't had a cert-related incident in 8 months.",
    author: "Lars Eriksson",
    role: "DevOps Lead",
    company: "Linear",
    avatar: "LE",
  },
  {
    quote:
      "JIT access for production databases changed how we handle incidents. Approvals happen in Slack, sessions auto-terminate, and we have full replay for every command run.",
    author: "Sofia Martinez",
    role: "Security Engineer",
    company: "Stripe",
    avatar: "SM",
  },
]

const COMPLIANCE = [
  { name: "SOC 2 Type II", icon: "🛡️" },
  { name: "ISO 27001", icon: "📋" },
  { name: "HIPAA Ready", icon: "🏥" },
  { name: "GDPR", icon: "🇪🇺" },
  { name: "FedRAMP Ready", icon: "🏛️" },
  { name: "PCI DSS", icon: "💳" },
]

// ─── Components ──────────────────────────────────────────────────────────────

function NavBar({ view, setView }: { view: string setView: (v: any) => void }) {
  const [scrolled, setScrolled] = useState(false)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20)
    window.addEventListener("scroll", handler)
    return () => window.removeEventListener("scroll", handler)
  }, [])

  const handleNavClick = (targetId: string) => {
    setMobileMenuOpen(false)
    if (view !== "home") {
      setView("home")
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      }, 100)
    } else {
      const el = document.getElementById(targetId)
      if (el) el.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleLogoClick = () => {
    setView("home")
    setMobileMenuOpen(false)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  return (
    <nav
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
      style={{
        background:
          scrolled || mobileMenuOpen ? "rgba(9, 9, 14, 0.95)" : "transparent",
        backdropFilter: scrolled || mobileMenuOpen ? "blur(12px)" : "none",
        borderBottom:
          scrolled || mobileMenuOpen
            ? "1px solid rgba(30,34,48,0.8)"
            : "1px solid transparent",
      }}
    >
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo */}
        <div
          className="flex items-center gap-3 cursor-pointer"
          onClick={handleLogoClick}
        >
          <div
            className="w-8 h-8 rounded flex items-center justify-center font-mono font-bold text-sm"
            style={{ background: "#a8ff3e", color: "#09090e" }}
          >
            BR
          </div>
          <span className="font-display font-semibold text-white text-lg tracking-tight">
            brick
          </span>
        </div>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          <button
            onClick={() => handleNavClick("features")}
            className="px-4 py-2 text-sm font-medium cursor-pointer transition-colors rounded"
            style={{ color: view === "home" ? "#9ca3af" : "#6b7280" }}
            onMouseEnter={(e) => {
              if (view === "home")
                (e.currentTarget as HTMLElement).style.color = "#a8ff3e"
            }}
            onMouseLeave={(e) => {
              if (view === "home")
                (e.currentTarget as HTMLElement).style.color = "#9ca3af"
            }}
          >
            Products
          </button>
          <button
            onClick={() => handleNavClick("agent-proxy")}
            className="px-4 py-2 text-sm font-medium cursor-pointer transition-colors rounded"
            style={{ color: view === "home" ? "#9ca3af" : "#6b7280" }}
            onMouseEnter={(e) => {
              if (view === "home")
                (e.currentTarget as HTMLElement).style.color = "#a8ff3e"
            }}
            onMouseLeave={(e) => {
              if (view === "home")
                (e.currentTarget as HTMLElement).style.color = "#9ca3af"
            }}
          >
            Agent Proxy
          </button>
          <button
            onClick={() => handleNavClick("integrations")}
            className="px-4 py-2 text-sm font-medium cursor-pointer transition-colors rounded"
            style={{ color: view === "home" ? "#9ca3af" : "#6b7280" }}
            onMouseEnter={(e) => {
              if (view === "home")
                (e.currentTarget as HTMLElement).style.color = "#a8ff3e"
            }}
            onMouseLeave={(e) => {
              if (view === "home")
                (e.currentTarget as HTMLElement).style.color = "#9ca3af"
            }}
          >
            Integrations
          </button>
          <button
            onClick={() => setView("team")}
            className="px-4 py-2 text-sm font-medium cursor-pointer transition-colors rounded"
            style={{
              color:
                view === "team" || view.startsWith("portfolio")
                  ? "#a8ff3e"
                  : "#9ca3af",
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.color = "#a8ff3e")
            }
            onMouseLeave={(e) => {
              if (view !== "team" && !view.startsWith("portfolio"))
                (e.currentTarget as HTMLElement).style.color = "#9ca3af"
            }}
          >
            Our Team (ทีมผู้พัฒนา)
          </button>
        </div>

        {/* Desktop CTAs */}
        <div className="hidden md:flex items-center gap-3">
          <a
            href="https://github.com"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-2 px-3 py-1.5 rounded text-sm font-mono transition-colors"
            style={{ color: "#9ca3af", border: "1px solid #1e2230" }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#a8ff3e"
              ;(e.currentTarget as HTMLElement).style.color = "#a8ff3e"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
              ;(e.currentTarget as HTMLElement).style.color = "#9ca3af"
            }}
          >
            <svg width="14" height="14" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
            27.4k
          </a>
          <button
            onClick={() => setView("team")}
            className="px-4 py-2 rounded text-sm font-semibold cursor-pointer transition-all"
            style={{ background: "#a8ff3e", color: "#09090e" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#bfff5c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#a8ff3e")}
          >
            View Team Profiles
          </button>
        </div>

        {/* Mobile Hamburger Button */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="text-[#9ca3af] focus:outline-none p-2 cursor-pointer"
          >
            <svg
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              {mobileMenuOpen ? (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              ) : (
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div
          className="md:hidden px-6 py-4 flex flex-col gap-4 border-t border-[#1e2230]"
          style={{ background: "#09090e" }}
        >
          <button
            onClick={() => {
              setView("home")
              setMobileMenuOpen(false)
            }}
            className="text-left text-sm font-medium text-[#9ca3af] hover:text-[#a8ff3e] py-1.5 cursor-pointer"
          >
            Home
          </button>
          <button
            onClick={() => handleNavClick("features")}
            className="text-left text-sm font-medium text-[#9ca3af] hover:text-[#a8ff3e] py-1.5 cursor-pointer"
          >
            Products
          </button>
          <button
            onClick={() => handleNavClick("agent-proxy")}
            className="text-left text-sm font-medium text-[#9ca3af] hover:text-[#a8ff3e] py-1.5 cursor-pointer"
          >
            Agent Proxy
          </button>
          <button
            onClick={() => handleNavClick("integrations")}
            className="text-left text-sm font-medium text-[#9ca3af] hover:text-[#a8ff3e] py-1.5 cursor-pointer"
          >
            Integrations
          </button>
          <button
            onClick={() => {
              setView("team")
              setMobileMenuOpen(false)
            }}
            className="text-left text-sm font-medium py-1.5 cursor-pointer"
            style={{
              color:
                view === "team" || view.startsWith("portfolio")
                  ? "#a8ff3e"
                  : "#9ca3af",
            }}
          >
            Our Team (ทีมผู้พัฒนา)
          </button>
          <div className="flex flex-col gap-2 pt-2 border-t border-[#1e2230]">
            <button
              onClick={() => {
                setView("team")
                setMobileMenuOpen(false)
              }}
              className="w-full text-center px-4 py-2.5 rounded text-sm font-semibold cursor-pointer transition-all"
              style={{ background: "#a8ff3e", color: "#09090e" }}
            >
              View Team Profiles
            </button>
          </div>
        </div>
      )}
    </nav>
  )
}

const HERO_LINES = [
  "$ brick run -- node server.js",
  "✓ Injecting 12 secrets into environment",
  "✓ Agent proxy session initialized",
  "✓ Audit log entry created",
  "Server running on :3000",
]

function HeroSection() {
  const [typedLines, setTypedLines] = useState<string[]>([])

  useEffect(() => {
    let i = 0
    const interval = setInterval(() => {
      if (i < HERO_LINES.length) {
        const line = HERO_LINES[i]
        if (line !== undefined) setTypedLines((prev) => [...prev, line])
        i++
      } else {
        clearInterval(interval)
      }
    }, 700)
    return () => clearInterval(interval)
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center pt-24 pb-16 overflow-hidden grid-bg">
      {/* Radial glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 50% at 50% 0%, rgba(168,255,62,0.07) 0%, transparent 70%)",
        }}
      />
      {/* Orange accent glow */}
      <div
        className="absolute pointer-events-none"
        style={{
          width: "600px",
          height: "400px",
          right: "-100px",
          top: "20%",
          background:
            "radial-gradient(ellipse, rgba(255,107,53,0.05) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="flex flex-col lg:flex-row items-center gap-16">
          {/* Left — copy */}
          <div className="flex-1 text-center lg:text-left">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-8 font-mono text-xs"
              style={{
                background: "rgba(168,255,62,0.08)",
                border: "1px solid rgba(168,255,62,0.2)",
                color: "#a8ff3e",
              }}
            >
              <span className="w-1.5 h-1.5 rounded-full bg-current animate-pulse" />
              10 billion secrets secured daily
            </div>

            <h1
              className="font-display font-bold leading-none mb-6"
              style={{
                fontSize: "clamp(2.8rem, 6vw, 5rem)",
                letterSpacing: "-0.03em",
              }}
            >
              <span style={{ color: "#f0f2f5" }}>Security</span>
              <br />
              <span style={{ color: "#f0f2f5" }}>Infrastructure</span>
              <br />
              <span className="iridescent">for Developers</span>
              <br />
              <span style={{ color: "#a8ff3e" }}>and Agents.</span>
            </h1>

            <p
              className="text-lg mb-10 max-w-lg leading-relaxed"
              style={{ color: "#6b7280" }}
            >
              Manage secrets, certificates, and privileged access — without
              handing credentials to humans <em>or</em> AI agents. Open-source,
              SOC2 certified, and loved by 100,000+ engineers.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
              <button
                className="px-6 py-3 rounded font-semibold text-sm transition-all animate-pulse-glow"
                style={{ background: "#a8ff3e", color: "#09090e" }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.background = "#bfff5c")
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.background = "#a8ff3e")
                }
              >
                Start for free →
              </button>
              <button
                className="px-6 py-3 rounded font-semibold text-sm transition-all flex items-center gap-2"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  color: "#f0f2f5",
                  border: "1px solid #1e2230",
                }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    "#a8ff3e40"
                  ;(e.currentTarget as HTMLElement).style.background =
                    "rgba(168,255,62,0.05)"
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    "#1e2230"
                  ;(e.currentTarget as HTMLElement).style.background =
                    "rgba(255,255,255,0.05)"
                }}
              >
                <svg
                  width="16"
                  height="16"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                >
                  <polygon points="5,3 19,12 5,21" />
                </svg>
                Watch demo
              </button>
            </div>

            <div className="mt-8 flex items-center gap-6 justify-center lg:justify-start">
              {["No credit card", "SOC2 certified", "Self-hostable"].map(
                (t) => (
                  <span
                    key={t}
                    className="flex items-center gap-1.5 text-xs font-mono"
                    style={{ color: "#4b5563" }}
                  >
                    <svg
                      width="12"
                      height="12"
                      fill="none"
                      stroke="#a8ff3e"
                      strokeWidth="2.5"
                      viewBox="0 0 24 24"
                    >
                      <polyline points="20,6 9,17 4,12" />
                    </svg>
                    {t}
                  </span>
                ),
              )}
            </div>
          </div>

          {/* Right — terminal */}
          <div className="flex-1 w-full max-w-lg animate-float">
            <div
              className="rounded-xl overflow-hidden shadow-2xl"
              style={{ border: "1px solid #1e2230", background: "#0a0c12" }}
            >
              {/* Terminal chrome */}
              <div
                className="flex items-center gap-2 px-4 py-3"
                style={{
                  background: "#0f1117",
                  borderBottom: "1px solid #1e2230",
                }}
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#ff5f57" }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#febc2e" }}
                />
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ background: "#28c840" }}
                />
                <span
                  className="ml-3 font-mono text-xs"
                  style={{ color: "#4b5563" }}
                >
                  brick — production
                </span>
              </div>
              <div className="p-5 font-mono text-sm min-h-[220px]">
                {typedLines.map((line, i) => (
                  <div
                    key={i}
                    className="mb-1 leading-relaxed"
                    style={{
                      color: line.startsWith("$")
                        ? "#a8ff3e"
                        : line.startsWith("✓")
                          ? "#4ade80"
                          : line.startsWith("Server")
                            ? "#f0f2f5"
                            : "#6b7280",
                    }}
                  >
                    {line}
                  </div>
                ))}
                {typedLines.length < HERO_LINES.length && (
                  <span
                    className="inline-block w-2 h-4 animate-blink"
                    style={{ background: "#a8ff3e" }}
                  />
                )}
              </div>

              {/* Mini stats row */}
              <div
                className="grid grid-cols-3 divide-x"
                style={{
                  borderTop: "1px solid #1e2230",
                  divideColor: "#1e2230",
                }}
              >
                {[
                  { k: "Secrets", v: "1,247" },
                  { k: "Environments", v: "4" },
                  { k: "Last sync", v: "2s ago" },
                ].map(({ k, v }) => (
                  <div
                    key={k}
                    className="px-4 py-3 text-center"
                    style={{ borderRight: "1px solid #1e2230" }}
                  >
                    <div
                      className="font-mono text-xs mb-0.5"
                      style={{ color: "#a8ff3e" }}
                    >
                      {v}
                    </div>
                    <div
                      className="font-mono text-xs"
                      style={{ color: "#4b5563" }}
                    >
                      {k}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function StatsSection() {
  return (
    <section
      style={{
        borderTop: "1px solid #1e2230",
        borderBottom: "1px solid #1e2230",
        background: "#0a0c12",
      }}
    >
      {/* Stats */}
      <div className="max-w-7xl mx-auto px-6 py-12 grid grid-cols-2 md:grid-cols-4 gap-8">
        {STATS.map(({ value, label }) => (
          <div key={label} className="text-center">
            <div
              className="font-display font-bold text-4xl mb-1 glow-green"
              style={{ color: "#a8ff3e" }}
            >
              {value}
            </div>
            <div className="text-sm font-mono" style={{ color: "#4b5563" }}>
              {label}
            </div>
          </div>
        ))}
      </div>

      {/* Logo marquee */}
      <div
        style={{
          borderTop: "1px solid #1e2230",
          overflow: "hidden",
          padding: "20px 0",
        }}
      >
        <div
          className="flex animate-marquee"
          style={{ width: "max-content", gap: "48px" }}
        >
          {TRUST_LOGOS.map((logo, i) => (
            <span
              key={i}
              className="font-display font-semibold text-sm whitespace-nowrap"
              style={{ color: "#374151" }}
            >
              {logo}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}

function FeaturesSection() {
  const [active, setActive] = useState(0)
  const feature = FEATURES[active]

  return (
    <section className="py-28 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="font-mono text-xs mb-3" style={{ color: "#a8ff3e" }}>
          PLATFORM CAPABILITIES
        </div>
        <h2
          className="font-display font-bold text-4xl md:text-5xl mb-4"
          style={{ color: "#f0f2f5", letterSpacing: "-0.02em" }}
        >
          Everything security. One platform.
        </h2>
        <p className="text-lg max-w-2xl mx-auto" style={{ color: "#4b5563" }}>
          From developer secrets to agent credentials to PKI — Brick gives
          every team a unified, auditable control plane.
        </p>
      </div>

      {/* Tab nav */}
      <div className="flex flex-wrap gap-2 mb-10 justify-center">
        {FEATURES.map((f, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className="px-4 py-2 rounded font-mono text-xs font-medium transition-all"
            style={{
              background: active === i ? `${f.color}15` : "#0f1117",
              color: active === i ? f.color : "#4b5563",
              border: `1px solid ${active === i ? `${f.color}40` : "#1e2230"}`,
            }}
          >
            {f.tag}
          </button>
        ))}
      </div>

      {/* Feature panel */}
      <div
        className="rounded-2xl overflow-hidden grid md:grid-cols-2"
        style={{ border: "1px solid #1e2230", background: "#0a0c12" }}
      >
        {/* Left — content */}
        <div className="p-10 flex flex-col justify-center">
          <div
            className="inline-block font-mono text-xs px-2 py-1 rounded mb-6"
            style={{
              background: `${feature.color}15`,
              color: feature.color,
              border: `1px solid ${feature.color}30`,
            }}
          >
            {feature.tag}
          </div>
          <h3
            className="font-display font-bold text-2xl md:text-3xl mb-4"
            style={{ color: "#f0f2f5", letterSpacing: "-0.02em" }}
          >
            {feature.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-8"
            style={{ color: "#6b7280" }}
          >
            {feature.body}
          </p>
          <ul className="space-y-3">
            {feature.bullets.map((b) => (
              <li
                key={b}
                className="flex items-center gap-3 text-sm"
                style={{ color: "#9ca3af" }}
              >
                <svg
                  width="14"
                  height="14"
                  fill="none"
                  stroke={feature.color}
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <polyline points="20,6 9,17 4,12" />
                </svg>
                {b}
              </li>
            ))}
          </ul>
        </div>

        {/* Right — terminal */}
        <div
          className="flex flex-col justify-center"
          style={{ background: "#080a0f", borderLeft: "1px solid #1e2230" }}
        >
          <div
            className="flex items-center gap-2 px-5 py-3"
            style={{ borderBottom: "1px solid #1e2230" }}
          >
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#ff5f57" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#febc2e" }}
            />
            <div
              className="w-2.5 h-2.5 rounded-full"
              style={{ background: "#28c840" }}
            />
            <span
              className="ml-2 font-mono text-xs"
              style={{ color: "#374151" }}
            >
              terminal
            </span>
          </div>
          <pre
            className="p-6 font-mono text-xs leading-relaxed overflow-auto"
            style={{ color: "#6b7280", whiteSpace: "pre-wrap" }}
          >
            {feature.terminal.split("\n").map((line, i) => {
              const isCmd = line.startsWith("$") || line.startsWith("//")
              const isSuccess = line.includes("✓") || line.includes("✓")
              const isTable =
                line.includes("║") || line.includes("╔") || line.includes("╚")
              return (
                <span
                  key={i}
                  style={{
                    display: "block",
                    color: isCmd
                      ? feature.color
                      : isSuccess
                        ? "#4ade80"
                        : isTable
                          ? "#9ca3af"
                          : "#6b7280",
                  }}
                >
                  {line}
                </span>
              )
            })}
          </pre>
        </div>
      </div>
    </section>
  )
}

function AgentProxySection() {
  const steps = [
    { label: "Agent requests secret", icon: "🤖", color: "#ff6b35" },
    { label: "Proxy validates scope", icon: "🛡️", color: "#a8ff3e" },
    { label: "Ephemeral token issued", icon: "🔑", color: "#00d4ff" },
    { label: "Secret consumed", icon: "⚡", color: "#b94fff" },
    { label: "Token auto-expires", icon: "🗑️", color: "#a8ff3e" },
  ]

  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: "#080a0f" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 60% at 50% 50%, rgba(255,107,53,0.04) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-7xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          <div>
            <div
              className="font-mono text-xs mb-3"
              style={{ color: "#ff6b35" }}
            >
              AGENT PROXY
            </div>
            <h2
              className="font-display font-bold text-4xl mb-6"
              style={{ color: "#f0f2f5", letterSpacing: "-0.02em" }}
            >
              AI agents get access.
              <br />
              <span style={{ color: "#ff6b35" }}>Not credentials.</span>
            </h2>
            <p
              className="text-base leading-relaxed mb-8"
              style={{ color: "#6b7280" }}
            >
              Traditional secret injection breaks in agentic workflows —
              credentials leak into prompts, logs, and model context.
              Brick's agent proxy routes every access request through an
              ephemeral token that expires with the session.
            </p>
            <div className="space-y-2">
              {[
                "Zero credentials in model context windows",
                "Per-agent, per-session token scoping",
                "Full audit trail for every access event",
                "Compatible with OpenAI, Anthropic, and any framework",
              ].map((t) => (
                <div
                  key={t}
                  className="flex items-center gap-3 text-sm"
                  style={{ color: "#9ca3af" }}
                >
                  <svg
                    width="14"
                    height="14"
                    fill="none"
                    stroke="#ff6b35"
                    strokeWidth="2.5"
                    viewBox="0 0 24 24"
                  >
                    <polyline points="20,6 9,17 4,12" />
                  </svg>
                  {t}
                </div>
              ))}
            </div>
          </div>

          {/* Flow diagram */}
          <div className="flex flex-col gap-3">
            {steps.map((step, i) => (
              <div key={i} className="flex items-center gap-4">
                <div
                  className="w-10 h-10 rounded-lg flex items-center justify-center text-lg flex-shrink-0"
                  style={{
                    background: `${step.color}15`,
                    border: `1px solid ${step.color}30`,
                  }}
                >
                  {step.icon}
                </div>
                <div
                  className="flex-1 px-4 py-3 rounded-lg text-sm font-mono"
                  style={{
                    background: "#0f1117",
                    border: "1px solid #1e2230",
                    color: "#9ca3af",
                  }}
                >
                  {step.label}
                </div>
                {i < steps.length - 1 && (
                  <div
                    className="absolute ml-4 mt-14"
                    style={{ color: "#374151", fontSize: "10px" }}
                  />
                )}
              </div>
            ))}
            <div
              className="mt-4 p-4 rounded-lg font-mono text-xs"
              style={{
                background: "rgba(255,107,53,0.06)",
                border: "1px solid rgba(255,107,53,0.2)",
                color: "#ff6b35",
              }}
            >
              ✓ No raw secret ever reaches the model context
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function IntegrationsSection() {
  return (
    <section className="py-28 max-w-7xl mx-auto px-6">
      <div className="text-center mb-16">
        <div className="font-mono text-xs mb-3" style={{ color: "#a8ff3e" }}>
          INTEGRATIONS
        </div>
        <h2
          className="font-display font-bold text-3xl md:text-4xl mb-4"
          style={{ color: "#f0f2f5", letterSpacing: "-0.02em" }}
        >
          Syncs with your entire stack
        </h2>
        <p style={{ color: "#4b5563" }}>
          Native integrations with every cloud, platform, and workflow tool you
          use.
        </p>
      </div>

      <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
        {INTEGRATIONS.map(({ name, icon }) => (
          <div
            key={name}
            className="flex flex-col items-center gap-2 p-4 rounded-xl cursor-pointer transition-all group"
            style={{ background: "#0f1117", border: "1px solid #1e2230" }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#a8ff3e30"
              ;(e.currentTarget as HTMLElement).style.background = "#111620"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
              ;(e.currentTarget as HTMLElement).style.background = "#0f1117"
            }}
          >
            <span className="text-2xl">{icon}</span>
            <span className="font-mono text-xs" style={{ color: "#4b5563" }}>
              {name}
            </span>
          </div>
        ))}
      </div>

      <p
        className="text-center mt-6 font-mono text-xs"
        style={{ color: "#374151" }}
      >
        + 200 more integrations via REST API and Terraform provider
      </p>
    </section>
  )
}

function TestimonialsSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const t = setInterval(
      () => setActive((a) => (a + 1) % TESTIMONIALS.length),
      4000,
    )
    return () => clearInterval(t)
  }, [])

  return (
    <section
      id="testimonials"
      className="py-28 relative overflow-hidden"
      style={{ background: "#080a0f" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(168,255,62,0.03) 0%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center">
        <div className="font-mono text-xs mb-12" style={{ color: "#a8ff3e" }}>
          WHAT ENGINEERS SAY
        </div>

        <div className="relative h-56">
          {TESTIMONIALS.map((t, i) => (
            <div
              key={i}
              className="absolute inset-0 transition-all duration-500"
              style={{
                opacity: active === i ? 1 : 0,
                transform: active === i ? "translateY(0)" : "translateY(12px)",
              }}
            >
              <blockquote
                className="text-xl md:text-2xl font-display font-light mb-8 leading-relaxed"
                style={{ color: "#e8eaf0", letterSpacing: "-0.01em" }}
              >
                "{t.quote}"
              </blockquote>
              <div className="flex items-center justify-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center font-mono text-xs font-bold"
                  style={{ background: "#a8ff3e", color: "#09090e" }}
                >
                  {t.avatar}
                </div>
                <div className="text-left">
                  <div
                    className="text-sm font-semibold"
                    style={{ color: "#f0f2f5" }}
                  >
                    {t.author}
                  </div>
                  <div
                    className="text-xs font-mono"
                    style={{ color: "#4b5563" }}
                  >
                    {t.role} · {t.company}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="flex justify-center gap-2 mt-8">
          {TESTIMONIALS.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className="w-6 h-1 rounded-full transition-all"
              style={{ background: active === i ? "#a8ff3e" : "#1e2230" }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

function ComplianceSection() {
  return (
    <section className="py-16 max-w-7xl mx-auto px-6">
      <div className="text-center mb-10">
        <div className="font-mono text-xs mb-3" style={{ color: "#a8ff3e" }}>
          COMPLIANCE & SECURITY
        </div>
        <h2
          className="font-display font-bold text-2xl md:text-3xl"
          style={{ color: "#f0f2f5", letterSpacing: "-0.02em" }}
        >
          Enterprise-grade. Auditor-approved.
        </h2>
      </div>
      <div className="flex flex-wrap justify-center gap-4">
        {COMPLIANCE.map(({ name, icon }) => (
          <div
            key={name}
            className="flex items-center gap-2 px-5 py-3 rounded-xl"
            style={{ background: "#0f1117", border: "1px solid #1e2230" }}
          >
            <span>{icon}</span>
            <span className="font-mono text-sm" style={{ color: "#9ca3af" }}>
              {name}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

function CTASection() {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{ background: "#080a0f" }}
    >
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(168,255,62,0.07) 0%, rgba(185,79,255,0.04) 50%, transparent 70%)",
        }}
      />
      <div className="relative z-10 max-w-5xl mx-auto px-6">
        <div className="grid lg:grid-cols-[1.1fr_0.9fr] gap-10 items-center">
          <div className="text-center lg:text-left">
            <h2
              className="font-display font-bold mb-6"
              style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', color: '#f0f2f5', letterSpacing: '-0.03em' }}
            >
              Ship with confidence.<br />
              <span style={{ color: '#a8ff3e' }}>Secure by default.</span>
            </h2>
            <p className="text-lg mb-10" style={{ color: '#4b5563' }}>
              Join 100,000+ engineers who manage their secrets, certificates, and access with brick. Free to start. Built to scale.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <a
                href="#contact-links"
                className="px-8 py-4 rounded-lg font-semibold text-base transition-all"
                style={{ background: '#a8ff3e', color: '#09090e' }}
                onMouseEnter={(e) => (e.currentTarget.style.background = '#bfff5c')}
                onMouseLeave={(e) => (e.currentTarget.style.background = '#a8ff3e')}
              >
                Get started — it's free
              </a>
            </div>
          </div>

          <div id="contact-links" className="rounded-2xl p-6 sm:p-8" style={{ background: '#0f1117', border: '1px solid #1e2230' }}>
            <div className="font-mono text-xs mb-3" style={{ color: '#a8ff3e' }}>CONTACT</div>
            <h3 className="font-display font-semibold text-2xl mb-3" style={{ color: '#f0f2f5', letterSpacing: '-0.02em' }}>
              Talk to the right team.
            </h3>
            <p className="text-sm leading-relaxed mb-6" style={{ color: '#6b7280' }}>
              Reach sales for a demo, support for technical questions, or the team for partnership and enterprise requests.
            </p>
            <div className="space-y-3">
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=sales@brick.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-lg transition-all"
                style={{ background: '#080a0f', border: '1px solid #1e2230', color: '#e8eaf0' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#a8ff3e40'; (e.currentTarget as HTMLElement).style.background = '#0b0d14' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#1e2230'; (e.currentTarget as HTMLElement).style.background = '#080a0f' }}
              >
                <span>
                  <span className="font-mono text-xs block" style={{ color: '#9ca3af' }}>Sales</span>
                  <span className="text-sm">sales@brick.com</span>
                </span>
                <span className="font-mono text-xs" style={{ color: '#a8ff3e' }}>↗</span>
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=support@brick.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-lg transition-all"
                style={{ background: '#080a0f', border: '1px solid #1e2230', color: '#e8eaf0' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#a8ff3e40'; (e.currentTarget as HTMLElement).style.background = '#0b0d14' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#1e2230'; (e.currentTarget as HTMLElement).style.background = '#080a0f' }}
              >
                <span>
                  <span className="font-mono text-xs block" style={{ color: '#9ca3af' }}>Support</span>
                  <span className="text-sm">support@brick.com</span>
                </span>
                <span className="font-mono text-xs" style={{ color: '#a8ff3e' }}>↗</span>
              </a>
              <a
                href="https://mail.google.com/mail/?view=cm&fs=1&to=hello@brick.com"
                target="_blank"
                rel="noreferrer"
                className="flex items-center justify-between px-4 py-3 rounded-lg transition-all"
                style={{ background: '#080a0f', border: '1px solid #1e2230', color: '#e8eaf0' }}
                onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#a8ff3e40'; (e.currentTarget as HTMLElement).style.background = '#0b0d14' }}
                onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = '#1e2230'; (e.currentTarget as HTMLElement).style.background = '#080a0f' }}
              >
                <span>
                  <span className="font-mono text-xs block" style={{ color: '#9ca3af' }}>General</span>
                  <span className="text-sm">hello@brick.com</span>
                </span>
                <span className="font-mono text-xs" style={{ color: '#a8ff3e' }}>↗</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

function Footer({ view, setView }: { view: string; setView: (v: any) => void }) {
  const cols = [
    {
      title: "Product",
      links: [
        "Platform Capabilities",
        "Integrations",
        "What engineers say",
        "Compliance & Security",
      ],
    },
    {
      title: "Our Team",
      links: [
        "About Us",
      ],
    },
  ]

  const handleLinkClick = (e: React.MouseEvent, link: string) => {
    e.preventDefault()

    if (link === "About Us") {
      setView("team")
      return
    }

    const targetId =
      link === "Platform Capabilities"
        ? "features"
        : link === "Integrations"
          ? "integrations"
          : link === "What engineers say"
            ? "testimonials"
            : link === "Compliance & Security"
              ? "compliance"
              : null

    if (!targetId) return

    if (view !== "home") {
      setView("home")
      setTimeout(() => {
        const el = document.getElementById(targetId)
        if (el) el.scrollIntoView({ behavior: "smooth" })
      }, 100)
      return
    }

    const el = document.getElementById(targetId)
    if (el) el.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer style={{ borderTop: "1px solid #1e2230", background: "#09090e" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded flex items-center justify-center font-mono font-bold text-xs"
                style={{ background: "#a8ff3e", color: "#09090e" }}
              >
                BR
              </div>
              <span className="font-display font-semibold text-white">
                brick
              </span>
            </div>
            <p
              className="text-xs leading-relaxed mb-4"
              style={{ color: "#374151" }}
            >
              Clean, focused product experiences for modern development teams.
            </p>
          </div>

          {/* Link columns */}
          {cols.map(({ title, links }) => (
            <div key={title}>
              <div
                className="font-mono text-xs font-semibold mb-4"
                style={{ color: "#4b5563" }}
              >
                {title}
              </div>
              <ul className="space-y-2.5">
                {links.map((l) => (
                  <li key={l}>
                    <a
                      href="#"
                      onClick={(e) => handleLinkClick(e, l)}
                      className="text-xs transition-colors cursor-pointer"
                      style={{ color: "#374151" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.color = "#9ca3af")
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.color = "#374151")
                      }
                    >
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div
          className="flex flex-col md:flex-row items-center justify-between pt-8"
          style={{ borderTop: "1px solid #1e2230" }}
        >
          <p className="font-mono text-xs" style={{ color: "#374151" }}>
            © 2024 Brick, Inc. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            {["Terms", "Privacy", "Security", "Cookies"].map((t) => (
              <a
                key={t}
                href="#"
                className="font-mono text-xs transition-colors"
                style={{ color: "#374151" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#9ca3af")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#374151")}
              >
                {t}
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] =
    useState<"home" | "team" | "portfolio-pm" | "portfolio-frontend" | "portfolio-uxui" | "design-system">(
      "home",
    )

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" })
  }, [view])

  return (
    <div style={{ background: "#09090e", minHeight: "100vh" }}>
      <NavBar view={view} setView={setView} />

      {view === "home" && (
        <>
          <div id="home">
            <HeroSection />
          </div>
          <StatsSection />
          <Achievements />
          <div id="features">
            <FeaturesSection />
          </div>
          <div id="agent-proxy">
            <AgentProxySection />
          </div>
          <div id="integrations">
            <IntegrationsSection />
          </div>
          <TestimonialsSection />
          <ClientTestimonials />
          <div id="compliance">
            <ComplianceSection />
          </div>
          <div id="cta">
            <CTASection />
          </div>
        </>
      )}

      {view === "team" && <TeamSection setView={setView} />}

      {view === "portfolio-pm" && <PMPortfolio setView={setView} />}

      {view === "portfolio-frontend" && <FrontendPortfolio setView={setView} />}

      {view === "portfolio-uxui" && <UXUIPortfolio setView={setView} />}

      {view === "design-system" && <DesignSystem setView={setView} />}

      <Footer view={view} setView={setView} />

      {/* Floating View Switcher Pill */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setView(view === "design-system" ? "home" : "design-system")}
          className="flex items-center gap-2 px-4 py-2.5 rounded-full font-semibold text-xs transition-all shadow-lg hover:scale-105 cursor-pointer backdrop-blur-md"
          style={{
            background: view === "design-system" ? "rgba(168,255,62,0.15)" : "rgba(15,17,23,0.8)",
            color: view === "design-system" ? "#a8ff3e" : "#f0f2f5",
            border: view === "design-system" ? "1px solid rgba(168,255,62,0.3)" : "1px solid #1e2230",
          }}
          onMouseEnter={(e) => {
            if (view !== "design-system") {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#a8ff3e40"
              ;(e.currentTarget as HTMLElement).style.color = "#a8ff3e"
            }
          }}
          onMouseLeave={(e) => {
            if (view !== "design-system") {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
              ;(e.currentTarget as HTMLElement).style.color = "#f0f2f5"
            }
          }}
        >
          {view === "design-system" ? (
            <>
              <span>🚀 Landing Page</span>
            </>
          ) : (
            <>
              <span>📐 Design System</span>
            </>
          )}
        </button>
      </div>
    </div>
  )
}
