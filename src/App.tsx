import { useState, useEffect, useRef } from "react"

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
    terminal: `$ infisical secrets get DB_PASSWORD
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
    terminal: `$ infisical pki list --expiring-soon
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
    terminal: `$ infisical access request prod-db-1
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
const secret = await infisical.agent.get({
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
      "Infisical replaced a patchwork of .env files, SSM parameters, and a legacy Vault cluster. Setup took one afternoon. Our engineers actually love the CLI.",
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
      "Certificate expiry used to be a quarterly fire drill. Infisical's PKI automation removed that entirely. We haven't had a cert-related incident in 8 months.",
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

// ─── Team Data ──────────────────────────────────────────────────────────────

const TEAM_MEMBERS = [
  {
    id: "pm",
    nameTh: "นนท์นิพัทธ์ ตั้งโรจนขจร",
    nameEn: "Nonniphat Tangrojanakhajorn",
    role: "Project Manager (PM)",
    bio: "Steering product vision, orchestrating agile workflows, and ensuring seamless collaboration across engineering teams.",
    email: "pm.nonniphat@infisical-team.io",
    github: "nonniphat-pm",
    linkedin: "nonniphat-tang",
    accentColor: "#b94fff", // Purple
    initials: "NT",
  },
  {
    id: "frontend",
    nameTh: "ธณัฐพงค์ ทะรินทร์",
    nameEn: "Thanatphong Tharin",
    role: "Frontend Developer (Frontend)",
    bio: "Building blazing-fast, secure, and highly responsive user interfaces using React 19, Vite, and Tailwind CSS v4.",
    email: "dev.thanatphong@infisical-team.io",
    github: "thanatphong-dev",
    linkedin: "thanatphong-tharin",
    accentColor: "#a8ff3e", // Lime Green
    initials: "TT",
  },
  {
    id: "uxui",
    nameTh: "ภูริวัชร สุภัคกนก",
    nameEn: "Phuriwat Supakkanok",
    role: "UX/UI Designer (UX/UI)",
    bio: "Crafting intuitive, accessible, and high-fidelity design systems and user experiences for complex security workflows.",
    email: "design.phuriwat@infisical-team.io",
    github: "phuriwat-ux",
    linkedin: "phuriwat-supakkanok",
    accentColor: "#00d4ff", // Cyan
    initials: "PS",
  },
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
            IN
          </div>
          <span className="font-display font-semibold text-white text-lg tracking-tight">
            infisical
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
  "$ infisical run -- node server.js",
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
                  infisical — production
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
          From developer secrets to agent credentials to PKI — Infisical gives
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
              Infisical's agent proxy routes every access request through an
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
      <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
        <h2
          className="font-display font-bold mb-6"
          style={{
            fontSize: "clamp(2rem, 5vw, 3.5rem)",
            color: "#f0f2f5",
            letterSpacing: "-0.03em",
          }}
        >
          Ship with confidence.
          <br />
          <span style={{ color: "#a8ff3e" }}>Secure by default.</span>
        </h2>
        <p className="text-lg mb-10" style={{ color: "#4b5563" }}>
          Join 100,000+ engineers who manage their secrets, certificates, and
          access with Infisical. Free to start. Built to scale.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            className="px-8 py-4 rounded-lg font-semibold text-base transition-all"
            style={{ background: "#a8ff3e", color: "#09090e" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#bfff5c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#a8ff3e")}
          >
            Get started — it's free
          </button>
          <button
            className="px-8 py-4 rounded-lg font-semibold text-base transition-all"
            style={{ color: "#9ca3af", border: "1px solid #1e2230" }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#a8ff3e40"
              ;(e.currentTarget as HTMLElement).style.color = "#f0f2f5"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
              ;(e.currentTarget as HTMLElement).style.color = "#9ca3af"
            }}
          >
            Talk to sales
          </button>
        </div>
        <p className="mt-6 font-mono text-xs" style={{ color: "#374151" }}>
          Self-hostable · SOC2 Type II · No CC required to start
        </p>
      </div>
    </section>
  )
}

function Footer({ setView }: { setView: (v: any) => void }) {
  const cols = [
    {
      title: "Product",
      links: [
        "Secrets Management",
        "Certificate Management",
        "PAM",
        "Agent Proxy",
        "Changelog",
      ],
    },
    {
      title: "Solutions",
      links: [
        "DevOps Teams",
        "Enterprise",
        "AI Agents",
        "Compliance",
        "Startups",
      ],
    },
    {
      title: "Developers",
      links: [
        "Documentation",
        "API Reference",
        "CLI Reference",
        "SDKs",
        "Status",
      ],
    },
    {
      title: "Company",
      links: [
        "About",
        "Blog",
        "Careers",
        "Security",
        "Privacy",
        "Developer Team (ทีมผู้พัฒนา)",
      ],
    },
  ]

  const handleLinkClick = (e: React.MouseEvent, l: string) => {
    if (l.includes("Developer Team")) {
      e.preventDefault()
      setView("team")
    }
  }

  return (
    <footer style={{ borderTop: "1px solid #1e2230", background: "#09090e" }}>
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-7 h-7 rounded flex items-center justify-center font-mono font-bold text-xs"
                style={{ background: "#a8ff3e", color: "#09090e" }}
              >
                IN
              </div>
              <span className="font-display font-semibold text-white">
                infisical
              </span>
            </div>
            <p
              className="text-xs leading-relaxed mb-4"
              style={{ color: "#374151" }}
            >
              Open-source security infrastructure for modern development teams.
            </p>
            <div className="flex gap-3">
              {["GitHub", "Twitter", "Discord", "LinkedIn"].map((s) => (
                <button
                  key={s}
                  className="text-xs font-mono transition-colors"
                  style={{ color: "#374151" }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = "#a8ff3e")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = "#374151")
                  }
                >
                  {s[0]}
                </button>
              ))}
            </div>
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
                    {l.includes("Developer Team") ? (
                      <a
                        href="#"
                        onClick={(e) => handleLinkClick(e, l)}
                        className="text-xs transition-colors cursor-pointer"
                        style={{ color: "#a8ff3e" }}
                        onMouseEnter={(e) =>
                          (e.currentTarget.style.color = "#bfff5c")
                        }
                        onMouseLeave={(e) =>
                          (e.currentTarget.style.color = "#a8ff3e")
                        }
                      >
                        {l}
                      </a>
                    ) : (
                      <a
                        href="#"
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
                    )}
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
            © 2024 Infisical, Inc. All rights reserved.
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

// ─── Team Section (หน้า profile รวม) ──────────────────────────────────────────

function TeamSection({ setView }: { setView: (v: any) => void }) {
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
                <span className="text-white">
                  Infisical Security Landing Suite
                </span>
              </div>
              <div>
                <span className="text-[#6b7280]">Tech Stack:</span>{" "}
                <span className="text-white">
                  React 19, Vite, Tailwind CSS v4, TypeScript
                </span>
              </div>
              <div>
                <span className="text-[#6b7280]">Team Email:</span>{" "}
                <span className="text-white">hello@infisical-team.io</span>
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
                      <svg
                        width="80"
                        height="80"
                        viewBox="0 0 100 100"
                        className="w-20 h-20 transition-transform duration-500 group-hover:scale-110"
                      >
                        <defs>
                          <radialGradient
                            id="ux-glow"
                            cx="50%"
                            cy="50%"
                            r="50%"
                          >
                            <stop
                              offset="0%"
                              stopColor="#00d4ff"
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
                          fill="url(#ux-glow)"
                          stroke="#00d4ff"
                          strokeWidth="1.5"
                        />
                        <rect
                          x="35"
                          y="35"
                          width="30"
                          height="30"
                          rx="3"
                          stroke="#00d4ff"
                          strokeWidth="2"
                          fill="none"
                          opacity="0.8"
                        />
                        <circle
                          cx="50"
                          cy="50"
                          r="18"
                          stroke="#00d4ff"
                          strokeWidth="1.5"
                          fill="none"
                          opacity="0.6"
                          style={{ strokeDasharray: "2 2" }}
                        />
                        <circle cx="50" cy="50" r="3.5" fill="#00d4ff" />
                      </svg>
                    )}
                  </div>

                  {/* Name and Basic Info */}
                  <h3 className="font-display font-bold text-xl text-white mb-0.5 transition-colors">
                    {m.nameEn}
                  </h3>
                  <div className="font-display text-sm text-[#9ca3af] mb-2 font-medium">
                    {m.nameTh}
                  </div>

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
                      href={`mailto:${m.email}`}
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

// ─── PM Portfolio Component ──────────────────────────────────────────────────

function PMPortfolio({ setView }: { setView: (v: any) => void }) {
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
                <div className="text-white font-semibold">
                  Nonniphat Tangrojanakhajorn
                </div>
                <div className="text-[#9ca3af] text-xs">นนท์นิพัทธ์ ตั้งโรจนขจร</div>
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
                <div className="text-white">pm.nonniphat@infisical-team.io</div>
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

// ─── Frontend Portfolio Component ─────────────────────────────────────────────

function FrontendPortfolio({ setView }: { setView: (v: any) => void }) {
  const [terminalHistory, setTerminalHistory] = useState<string[]>([
    "Welcome to Thanatphong's secure CLI developer portfolio.",
    "Type a command or click a preset below to begin.",
  ])
  const [inputVal, setInputVal] = useState("")
  const terminalBottomRef = useRef<HTMLDivElement>(null)

  const handleCommand = (cmd: string) => {
    const cleanCmd = cmd.trim().toLowerCase()
    let output: string[] = []

    switch (cleanCmd) {
      case "help":
        output = [
          "Available commands:",
          "  help     - Show list of available commands",
          "  skills   - List technical skills and proficiency",
          "  projects - List developed web projects",
          "  secret   - Decrypt secure environment variables",
          "  contact  - Show direct developer contact channels",
          "  clear    - Clear terminal screen",
        ]
        break
      case "skills":
        output = [
          "┌──────────────────────┬─────────────┐",
          "│ Skill                │ Proficiency │",
          "├──────────────────────┼─────────────┤",
          "│ React 19 & TS        │ Expert      │",
          "│ Tailwind CSS v4      │ Expert      │",
          "│ Vite & Bundling      │ Advanced    │",
          "│ Web Cryptography API │ Advanced    │",
          "│ Node.js & Docker     │ Intermediate│",
          "└──────────────────────┴─────────────┘",
        ]
        break
      case "projects":
        output = [
          "Featured Projects:",
          "  1. Infisical CLI Dashboard - Ephemeral secret manager",
          "  2. Secure PKI Portal - Automatic SSL certificate issuance",
          "  3. Real-time Log Auditor - SOC 2 compliant session replayer",
        ]
        break
      case "secret":
        output = [
          "🔓 Decrypting environment credentials...",
          "  DATABASE_URL = postgres://thanatphong:••••••••••••@localhost:5432/main_db",
          "  API_KEY      = tf-live_6b820fac9ee1a48c909e74d1a0120b08",
          "  JWT_SECRET   = sec_jwt_99f2a0134bc5ee9712a02b1f83c0",
          "✓ Session verified. Audit logs recorded.",
        ]
        break
      case "contact":
        output = [
          "Contact Channels:",
          "  Email:    dev.thanatphong@infisical-team.io",
          "  GitHub:   github.com/thanatphong-dev",
          "  LinkedIn: linkedin.com/in/thanatphong-tharin",
        ]
        break
      case "clear":
        setTerminalHistory([])
        return
      default:
        output = [
          `Command not found: "${cmd}". Type "help" for a list of commands.`,
        ]
    }

    setTerminalHistory((prev) => [...prev, `$ ${cmd}`, ...output])
  }

  useEffect(() => {
    terminalBottomRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [terminalHistory])

  const skillsData = [
    { name: "React 19 & React DOM", rate: 95 },
    { name: "TypeScript & JavaScript", rate: 90 },
    { name: "Tailwind CSS v4 & responsive designs", rate: 92 },
    { name: "Vite Bundler & Build Tooling", rate: 85 },
  ]

  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden grid-bg">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(168,255,62,0.06) 0%, transparent 75%)",
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
              ;(e.currentTarget as HTMLElement).style.borderColor = "#a8ff3e"
              ;(e.currentTarget as HTMLElement).style.color = "#a8ff3e"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
              ;(e.currentTarget as HTMLElement).style.color = "#9ca3af"
            }}
          >
            ← Back to Team (กลับหน้าทีม)
          </button>

          <span className="font-mono text-xs text-[#a8ff3e] font-bold">
            PORTFOLIO // MEMBER 02
          </span>
        </div>

        {/* Member Profile Hero */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 mb-16 items-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div
              className="w-36 h-36 rounded-2xl flex items-center justify-center mb-6"
              style={{
                background: "rgba(168,255,62,0.08)",
                border: "1px solid rgba(168,255,62,0.2)",
              }}
            >
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                className="w-24 h-24 text-[#a8ff3e]"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeDasharray="6 3"
                />
                <text
                  x="50"
                  y="58"
                  fontWeight="bold"
                  fontFamily="monospace"
                  fontSize="24"
                  fill="currentColor"
                  textAnchor="middle"
                >
                  &lt;/&gt;
                </text>
              </svg>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-1">
              Thanatphong Tharin
            </h1>
            <div className="font-display text-lg text-[#9ca3af] mb-4">
              ธณัฐพงค์ ทะรินทร์
            </div>
            <span
              className="inline-block font-mono text-xs px-3 py-1 rounded-full mb-6 font-semibold"
              style={{
                background: "rgba(168,255,62,0.12)",
                color: "#a8ff3e",
                border: "1px solid rgba(168,255,62,0.25)",
              }}
            >
              Frontend Developer (Frontend)
            </span>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "#0f1117", border: "1px solid #1e2230" }}
          >
            <div className="font-mono text-xs mb-3 text-[#a8ff3e] font-bold">
              BASIC INFO (ประวัติส่วนตัว)
            </div>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  NAME:
                </div>
                <div className="text-white font-semibold">
                  Thanatphong Tharin
                </div>
                <div className="text-[#9ca3af] text-xs">ธณัฐพงค์ ทะรินทร์</div>
              </div>
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  ROLE IN COMPANY:
                </div>
                <div className="text-[#a8ff3e] font-semibold">
                  Lead Frontend Developer
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
                <div className="text-white">
                  dev.thanatphong@infisical-team.io
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Terminal Simulator */}
        <div className="mb-16">
          <div className="font-mono text-xs text-[#a8ff3e] mb-1 font-bold">
            INTERACTIVE EXPERIENCE
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-3">
            Developer Console Terminal
          </h2>
          <p className="text-sm text-[#6b7280] mb-6 max-w-3xl leading-relaxed">
            Click the preset command buttons below to interact with the
            simulated shell developer tool. You can query my skill levels,
            decrypt secrets, or clear terminal outputs.
          </p>

          <div
            className="rounded-xl overflow-hidden shadow-2xl"
            style={{ border: "1px solid #1e2230", background: "#080a0f" }}
          >
            {/* Terminal chrome */}
            <div
              className="flex items-center justify-between px-4 py-3"
              style={{
                background: "#0f1117",
                border_bottom: "1px solid #1e2230",
              }}
            >
              <div className="flex items-center gap-2">
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
                <span className="ml-3 font-mono text-xs text-[#4b5563]">
                  thanatphong@infisical-terminal: ~
                </span>
              </div>
              <span className="font-mono text-[10px] text-[#4b5563]">
                active session
              </span>
            </div>

            {/* Terminal Output history */}
            <div className="p-5 font-mono text-xs leading-relaxed min-h-[250px] max-h-[350px] overflow-y-auto bg-[#05070a]">
              {terminalHistory.map((line, i) => {
                let color = "#6b7280"
                if (line.startsWith("$")) color = "#a8ff3e"
                else if (
                  line.startsWith("🔓") ||
                  line.includes("DATABASE_URL") ||
                  line.includes("API_KEY")
                )
                  color = "#fbbf24"
                else if (line.startsWith("✓")) color = "#4ade80"
                else if (
                  line.startsWith("┌") ||
                  line.startsWith("├") ||
                  line.startsWith("└") ||
                  line.startsWith("│")
                )
                  color = "#38bdf8"
                else if (
                  line.includes("Welcome") ||
                  line.includes("Featured Projects")
                )
                  color = "#f0f2f5"

                return (
                  <div
                    key={i}
                    className="mb-1 whitespace-pre-wrap"
                    style={{ color }}
                  >
                    {line}
                  </div>
                )
              })}
              <div ref={terminalBottomRef} />
            </div>

            {/* Terminal input/presets */}
            <div className="p-4 flex flex-col gap-3 border-t border-[#1e2230] bg-[#0b0e14]">
              <div className="flex flex-wrap items-center gap-2">
                <span className="font-mono text-xs text-[#6b7280]">
                  Presets:
                </span>
                {[
                  "help",
                  "skills",
                  "projects",
                  "secret",
                  "contact",
                  "clear",
                ].map((preset) => (
                  <button
                    key={preset}
                    onClick={() => handleCommand(preset)}
                    className="px-2.5 py-1 rounded text-[11px] font-mono font-medium transition-colors cursor-pointer border border-[#1e2230] hover:border-[#a8ff3e] hover:text-[#a8ff3e]"
                    style={{ background: "#0f1117", color: "#9ca3af" }}
                  >
                    {preset}
                  </button>
                ))}
              </div>

              <form
                onSubmit={(e) => {
                  e.preventDefault()
                  if (inputVal.trim()) {
                    handleCommand(inputVal)
                    setInputVal("")
                  }
                }}
                className="flex gap-2"
              >
                <span className="font-mono text-xs text-[#a8ff3e] flex items-center select-none">
                  $
                </span>
                <input
                  type="text"
                  value={inputVal}
                  onChange={(e) => setInputVal(e.target.value)}
                  placeholder="Type a command (e.g. skills)..."
                  className="flex-1 bg-transparent border-none text-[#f0f2f5] font-mono text-xs focus:ring-0 focus:outline-none p-0"
                />
              </form>
            </div>
          </div>
        </div>

        {/* Tech Stack Skills Meters */}
        <div
          className="rounded-2xl p-6 sm:p-8 mb-16"
          style={{ background: "#0f1117", border: "1px solid #1e2230" }}
        >
          <div className="font-mono text-xs mb-3 text-[#a8ff3e] font-bold">
            METRIC ANALYSIS
          </div>
          <h3 className="font-display font-semibold text-xl text-white mb-6">
            Expertise Stack Proficiency
          </h3>
          <div className="space-y-5">
            {skillsData.map((sk) => (
              <div key={sk.name}>
                <div className="flex justify-between items-center mb-1.5 font-mono text-xs">
                  <span className="text-[#e8eaf0]">{sk.name}</span>
                  <span className="text-[#a8ff3e]">{sk.rate}%</span>
                </div>
                <div className="w-full h-1.5 rounded-full bg-[#1e2230]">
                  <div
                    className="h-full rounded-full bg-[#a8ff3e] transition-all duration-1000"
                    style={{ width: `${sk.rate}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Portfolio Circle Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-[#1e2230]">
          <button
            onClick={() => setView("portfolio-pm")}
            className="text-xs font-mono text-[#6b7280] hover:text-white transition-colors cursor-pointer"
          >
            ← Previous Portfolio (Nonniphat)
          </button>
          <button
            onClick={() => setView("portfolio-uxui")}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all cursor-pointer"
            style={{ background: "#a8ff3e", color: "#09090e" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#bfff5c")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#a8ff3e")}
          >
            Next Portfolio (Phuriwat) →
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── UX/UI Portfolio Component ────────────────────────────────────────────────

function UXUIPortfolio({ setView }: { setView: (v: any) => void }) {
  const [theme, setTheme] = useState<"lime" | "purple" | "cyan" | "orange">(
    "cyan",
  )
  const [fontSize, setFontSize] = useState<"sm" | "md" | "lg">("md")
  const [glowEnabled, setGlowEnabled] = useState(true)
  const [backdropOpacity, setBackdropOpacity] = useState(85)

  const themeColors = {
    lime: {
      primary: "#a8ff3e",
      text: "Infisical Lime",
      glow: "rgba(168,255,62,0.4)",
      bg: "rgba(168,255,62,0.04)",
    },
    purple: {
      primary: "#b94fff",
      text: "Privileged Access Purple",
      glow: "rgba(185,79,255,0.4)",
      bg: "rgba(185,79,255,0.04)",
    },
    cyan: {
      primary: "#00d4ff",
      text: "PKI Certificate Cyan",
      glow: "rgba(0,212,255,0.4)",
      bg: "rgba(0,212,255,0.04)",
    },
    orange: {
      primary: "#ff6b35",
      text: "Agent Proxy Orange",
      glow: "rgba(255,107,53,0.4)",
      bg: "rgba(255,107,53,0.04)",
    },
  }

  const activeTheme = themeColors[theme]

  return (
    <section className="relative min-h-screen pt-28 pb-20 overflow-hidden grid-bg">
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 0%, rgba(0,212,255,0.06) 0%, transparent 75%)",
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
              ;(e.currentTarget as HTMLElement).style.borderColor = "#00d4ff"
              ;(e.currentTarget as HTMLElement).style.color = "#00d4ff"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
              ;(e.currentTarget as HTMLElement).style.color = "#9ca3af"
            }}
          >
            ← Back to Team (กลับหน้าทีม)
          </button>

          <span className="font-mono text-xs text-[#00d4ff] font-bold">
            PORTFOLIO // MEMBER 03
          </span>
        </div>

        {/* Member Profile Hero */}
        <div className="grid md:grid-cols-[1fr_2fr] gap-12 mb-16 items-center">
          <div className="flex flex-col items-center text-center md:items-start md:text-left">
            <div
              className="w-36 h-36 rounded-2xl flex items-center justify-center mb-6"
              style={{
                background: "rgba(0,212,255,0.08)",
                border: "1px solid rgba(0,212,255,0.2)",
              }}
            >
              <svg
                width="100"
                height="100"
                viewBox="0 0 100 100"
                className="w-24 h-24 text-[#00d4ff]"
              >
                <circle
                  cx="50"
                  cy="50"
                  r="45"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                />
                <rect
                  x="35"
                  y="35"
                  width="30"
                  height="30"
                  rx="3"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  fill="none"
                />
                <circle
                  cx="50"
                  cy="50"
                  r="18"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  fill="none"
                  strokeDasharray="3 3"
                />
                <circle cx="50" cy="50" r="4" fill="currentColor" />
              </svg>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-4xl text-white mb-1">
              Phuriwat Supakkanok
            </h1>
            <div className="font-display text-lg text-[#9ca3af] mb-4">
              ภูริวัชร สุภัคกนก
            </div>
            <span
              className="inline-block font-mono text-xs px-3 py-1 rounded-full mb-6 font-semibold"
              style={{
                background: "rgba(0,212,255,0.12)",
                color: "#00d4ff",
                border: "1px solid rgba(0,212,255,0.25)",
              }}
            >
              UX/UI Designer (UX/UI)
            </span>
          </div>

          <div
            className="rounded-2xl p-6 sm:p-8"
            style={{ background: "#0f1117", border: "1px solid #1e2230" }}
          >
            <div className="font-mono text-xs mb-3 text-[#00d4ff] font-bold">
              BASIC INFO (ประวัติส่วนตัว)
            </div>
            <div className="grid sm:grid-cols-2 gap-6 text-sm">
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  NAME:
                </div>
                <div className="text-white font-semibold">
                  Phuriwat Supakkanok
                </div>
                <div className="text-[#9ca3af] text-xs">ภูริวัชร สุภัคกนก</div>
              </div>
              <div>
                <div className="text-[#6b7280] font-mono text-xs font-semibold">
                  ROLE IN COMPANY:
                </div>
                <div className="text-[#00d4ff] font-semibold">
                  Senior UX/UI Designer
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
                <div className="text-white">
                  design.phuriwat@infisical-team.io
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Interactive Theme Builder Sandbox */}
        <div className="mb-16">
          <div className="font-mono text-xs text-[#00d4ff] mb-1 font-bold">
            INTERACTIVE EXPERIENCE
          </div>
          <h2 className="font-display font-bold text-2xl text-white mb-3">
            Design Token & Component Playground
          </h2>
          <p className="text-sm text-[#6b7280] mb-8 max-w-3xl leading-relaxed">
            Adjust the design tokens in the controller panel below. See how the
            UI component card adapts its visual elements, font hierarchy,
            transparency layers, and shadow glows in real time.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-[1.2fr_0.8fr] gap-8 items-stretch">
            {/* Component Preview Card */}
            <div className="rounded-xl flex items-center justify-center p-8 bg-[#06080b] border border-[#1e2230] relative overflow-hidden">
              <div
                className="absolute inset-0 blur-3xl opacity-10 pointer-events-none transition-all duration-500"
                style={{ background: activeTheme.primary }}
              />

              <div
                className="w-full max-w-sm rounded-xl p-6 relative overflow-hidden transition-all duration-300"
                style={{
                  background: `rgba(15, 17, 23, ${backdropOpacity / 100})`,
                  border: `1px solid ${
                    glowEnabled ? activeTheme.primary : "#1e2230"
                  }`,
                  boxShadow: glowEnabled
                    ? `0 0 35px ${activeTheme.primary}20`
                    : "none",
                }}
              >
                {/* Header */}
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2">
                    <div
                      className="w-5 h-5 rounded flex items-center justify-center font-mono text-[9px] font-bold"
                      style={{
                        background: activeTheme.primary,
                        color: "#09090e",
                      }}
                    >
                      🔑
                    </div>
                    <span className="font-display font-semibold text-white text-xs">
                      Key Vault
                    </span>
                  </div>
                  <span
                    className="font-mono text-[9px] px-2 py-0.5 rounded border border-[#1e2230]"
                    style={{
                      color: activeTheme.primary,
                      borderColor: `${activeTheme.primary}40`,
                      background: `${activeTheme.primary}08`,
                    }}
                  >
                    {fontSize.toUpperCase()} SIZE
                  </span>
                </div>

                {/* Body Content */}
                <div className="space-y-4">
                  <div>
                    <h3 className="font-mono text-[10px] text-[#6b7280] mb-0.5">
                      DATABASE_URL
                    </h3>
                    <div
                      className="font-mono font-medium rounded border border-[#1e2230] p-2 bg-[#09090e] tracking-wide"
                      style={{
                        fontSize:
                          fontSize === "sm"
                            ? "10px"
                            : fontSize === "md"
                              ? "12px"
                              : "14px",
                        color: activeTheme.primary,
                      }}
                    >
                      postgres://admin:••••••••••••@10.0.4.1/prod
                    </div>
                  </div>

                  <div>
                    <h3 className="font-mono text-[10px] text-[#6b7280] mb-0.5">
                      METADATA
                    </h3>
                    <p
                      className="text-[#9ca3af] leading-relaxed"
                      style={{
                        fontSize:
                          fontSize === "sm"
                            ? "11px"
                            : fontSize === "md"
                              ? "13px"
                              : "15px",
                      }}
                    >
                      This component represents a cryptographic key container
                      configured with active theme tokens.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Controller Panel */}
            <div
              className="rounded-xl p-6 flex flex-col gap-6"
              style={{ background: "#0f1117", border: "1px solid #1e2230" }}
            >
              <div className="font-mono text-xs text-white border-b border-[#1e2230] pb-2 font-bold">
                CONTROLS
              </div>

              {/* Theme Switch */}
              <div>
                <label className="block font-mono text-[10px] text-[#6b7280] mb-2 uppercase">
                  Theme Color Token
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(
                    themeColors,
                  ) as Array<keyof typeof themeColors>).map((t) => (
                    <button
                      key={t}
                      onClick={() => setTheme(t)}
                      className={`px-3 py-2 rounded text-xs font-mono border cursor-pointer text-left transition-all ${
                        theme === t
                          ? "text-[#0f1117] font-bold"
                          : "border-[#1e2230] text-[#9ca3af] hover:border-[#00d4ff]/40"
                      }`}
                      style={{
                        background:
                          theme === t ? themeColors[t].primary : "#09090e",
                        borderColor:
                          theme === t ? themeColors[t].primary : "#1e2230",
                      }}
                    >
                      {themeColors[t].text.split(" ").pop()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Font Size Switch */}
              <div>
                <label className="block font-mono text-[10px] text-[#6b7280] mb-2 uppercase">
                  Typography Scale
                </label>
                <div className="flex gap-2">
                  {(["sm", "md", "lg"] as const).map((sz) => (
                    <button
                      key={sz}
                      onClick={() => setFontSize(sz)}
                      className={`flex-1 py-1.5 rounded font-mono text-xs border cursor-pointer transition-colors ${
                        fontSize === sz
                          ? "border-[#00d4ff] text-[#00d4ff]"
                          : "border-[#1e2230] text-[#6b7280] hover:text-[#9ca3af]"
                      }`}
                      style={{ background: "#09090e" }}
                    >
                      {sz.toUpperCase()}
                    </button>
                  ))}
                </div>
              </div>

              {/* Toggle Glow */}
              <div className="flex items-center justify-between">
                <span className="font-mono text-[10px] text-[#6b7280] uppercase">
                  Box Glow Effect
                </span>
                <button
                  onClick={() => setGlowEnabled(!glowEnabled)}
                  className={`w-12 h-6 rounded-full transition-all cursor-pointer relative p-0.5 ${
                    glowEnabled
                      ? "bg-[#00d4ff]"
                      : "bg-[#1a1d26] border border-[#1e2230]"
                  }`}
                >
                  <div
                    className="w-5 h-5 rounded-full bg-[#09090e] transition-transform"
                    style={{
                      transform: glowEnabled
                        ? "translateX(24px)"
                        : "translateX(0)",
                    }}
                  />
                </button>
              </div>

              {/* Backdrop Opacity Slider */}
              <div>
                <div className="flex justify-between font-mono text-[10px] text-[#6b7280] mb-2">
                  <span>BACKDROP OPACITY</span>
                  <span className="text-[#00d4ff]">{backdropOpacity}%</span>
                </div>
                <input
                  type="range"
                  min="30"
                  max="100"
                  value={backdropOpacity}
                  onChange={(e) => setBackdropOpacity(Number(e.target.value))}
                  className="w-full h-1 bg-[#09090e] border border-[#1e2230] rounded-lg appearance-none cursor-pointer accent-[#00d4ff]"
                />
              </div>
            </div>
          </div>
        </div>

        {/* UX/UI Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-16">
          {[
            {
              phase: "1. Discovery",
              label: "User Research",
              desc: "Understanding developer friction in configuring certificates & variables.",
            },
            {
              phase: "2. Wireframing",
              label: "Interactive Prototypes",
              desc: "Building dynamic layouts in Figma with structured guidelines.",
            },
            {
              phase: "3. Tokenization",
              label: "Design Systems",
              desc: "Defining color ranges, layouts, spacing grids, and styles.",
            },
            {
              phase: "4. Validation",
              label: "Handoff Specs",
              desc: "Translating Figma variables into code tokens and Tailwind classes.",
            },
          ].map((w, i) => (
            <div
              key={i}
              className="rounded-xl p-5 border border-[#1e2230]"
              style={{ background: "#0f1117" }}
            >
              <div className="font-mono text-[10px] text-[#00d4ff] mb-1">
                {w.phase}
              </div>
              <h4 className="font-display font-semibold text-sm text-white mb-2">
                {w.label}
              </h4>
              <p className="text-xs text-[#6b7280] leading-relaxed">{w.desc}</p>
            </div>
          ))}
        </div>

        {/* Portfolio Circle Navigation */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-[#1e2230]">
          <button
            onClick={() => setView("portfolio-frontend")}
            className="text-xs font-mono text-[#6b7280] hover:text-white transition-colors cursor-pointer"
          >
            ← Previous Portfolio (Thanatphong)
          </button>
          <button
            onClick={() => setView("portfolio-pm")}
            className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all cursor-pointer"
            style={{ background: "#00d4ff", color: "#09090e" }}
            onMouseEnter={(e) => (e.currentTarget.style.background = "#80e9ff")}
            onMouseLeave={(e) => (e.currentTarget.style.background = "#00d4ff")}
          >
            Next Portfolio (Nonniphat) →
          </button>
        </div>
      </div>
    </section>
  )
}

// ─── App ─────────────────────────────────────────────────────────────────────

export default function App() {
  const [view, setView] =
    useState<"home" | "team" | "portfolio-pm" | "portfolio-frontend" | "portfolio-uxui">(
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

      <Footer setView={setView} />
    </div>
  )
}
