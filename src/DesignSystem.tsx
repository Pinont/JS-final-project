import { useState, useEffect } from "react"

// ─── Static Data Arrays ──────────────────────────────────────────────────────

const SECTIONS = [
  { id: "intro", title: "1. Introduction" },
  { id: "colors", title: "2. Color Tokens" },
  { id: "typography", title: "3. Typography" },
  { id: "buttons", title: "4. Buttons & CTAs" },
  { id: "cards", title: "5. Cards & Panels" },
  { id: "inputs", title: "6. Inputs & Forms" },
  { id: "badges", title: "7. Badges & Tags" },
  { id: "navigation", title: "8. Navigation" },
  { id: "terminals", title: "9. Terminal & Code" },
  { id: "animations", title: "10. Animations" },
  { id: "gradients", title: "11. Gradients & FX" },
]

const COLOR_TOKENS = [
  { name: "--background", value: "#09090e", role: "Page ground / background base" },
  { name: "--card", value: "#0f1117", role: "Card / panel background surface" },
  { name: "--muted", value: "#13151e", role: "Subdued block background / inner panels" },
  { name: "--primary", value: "#a8ff3e", role: "Brick lime-green — CTA, active, success" },
  { name: "--accent", value: "#ff6b35", role: "Firecrawl orange — secondary CTA, warnings" },
  { name: "--accent-alt", value: "#b94fff", role: "Purple — PAM / privileged access" },
  { name: "--cyan", value: "#00d4ff", role: "Certificate management / PKI" },
  { name: "--foreground", value: "#f0f2f5", role: "Primary body text" },
  { name: "--muted-foreground", value: "#6b7280", role: "Secondary / caption text" },
  { name: "--border", value: "#1e2230", role: "Hairline rules, card borders, dividers" },
]

const TYPOGRAPHY_SAMPLES = [
  {
    family: "Outfit",
    weight: "300 / 400 / 500 / 600 / 700 / 800",
    class: "font-display",
    sample: "Security Infrastructure for Modern Dev Teams",
    desc: "Used for hero headings, display labels, nav brand, and page titles.",
  },
  {
    family: "Inter",
    weight: "300 / 400 / 500 / 600",
    class: "font-sans",
    sample: "Manage secrets, certificates, and privileged access without standing credentials.",
    desc: "Used for body copy, description texts, lists, form labels, and UI strings.",
  },
  {
    family: "JetBrains Mono",
    weight: "400 / 500 / 600",
    class: "font-mono",
    sample: "brick run -- node server.js --env=production",
    desc: "Used for terminal screens, inline commands, environment variables, code snippets.",
  },
]

const BUTTON_CODES = {
  primary: `<button className="px-6 py-3 rounded font-semibold text-sm bg-primary text-background hover:bg-opacity-90 animate-pulse-glow transition-all">
  Start for free →
</button>`,
  secondary: `<button className="px-6 py-3 rounded font-semibold text-sm border border-border bg-white/5 text-foreground hover:border-primary/20 hover:bg-primary/5 transition-all">
  Watch demo
</button>`,
  accent: `<button className="px-5 py-2.5 rounded-lg font-semibold text-sm border border-border bg-white/3 hover:bg-accent hover:text-black hover:border-accent transition-all">
  Configure Proxy
</button>`,
}

const INPUT_CODES = `<div className="flex flex-col gap-2">
  <label className="text-xs font-mono text-muted-foreground font-semibold">DATABASE URL</label>
  <input 
    type="text" 
    placeholder="postgresql://user:password@localhost:5432/db" 
    className="w-full px-4 py-2.5 rounded border border-border bg-card text-foreground font-mono text-xs focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary transition-all"
  />
</div>`

const CARD_CODES = `<div className="rounded-2xl p-6 border border-border bg-card/75 backdrop-blur-md relative overflow-hidden group hover:border-primary/30 transition-all">
  <div className="absolute top-0 right-0 w-24 h-24 rounded-full blur-3xl opacity-10 bg-primary group-hover:opacity-20 transition-opacity" />
  <h3 className="font-display font-semibold text-xl text-white">Card Title</h3>
  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">...</p>
</div>`

// ─── Code Copy Component ────────────────────────────────────────────────────

function CodeBlock({ code }: { code: string }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative group/code rounded-lg overflow-hidden border border-[#1e2230] bg-[#080a0f] mt-4">
      <div className="flex items-center justify-between px-4 py-2 bg-[#0f1117]/80 border-b border-[#1e2230]">
        <span className="text-[10px] font-mono text-[#4b5563]">CODE PREVIEW</span>
        <button
          onClick={handleCopy}
          className="text-xs font-mono text-[#9ca3af] hover:text-[#a8ff3e] transition-colors cursor-pointer"
        >
          {copied ? "Copied! ✓" : "Copy 📋"}
        </button>
      </div>
      <pre className="p-4 overflow-x-auto font-mono text-xs text-[#9ca3af] whitespace-pre">
        <code>{code}</code>
      </pre>
    </div>
  )
}

// ─── Design System Explorer Component ────────────────────────────────────────

export default function DesignSystem({
  setView,
}: {
  setView: (v: any) => void
}) {
  const [activeSection, setActiveSection] = useState("intro")

  // Handle active section scrolling detection (Scroll Spy)
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200

      for (const section of SECTIONS) {
        const el = document.getElementById(section.id)
        if (el) {
          const top = el.offsetTop
          const height = el.offsetHeight
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id)
            break
          }
        }
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const handleSidebarClick = (id: string) => {
    setActiveSection(id)
    const el = document.getElementById(id)
    if (el) {
      el.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="relative min-h-screen bg-[#09090e] text-[#f0f2f5] font-sans pt-24 pb-20 grid-bg noise">
      {/* Glow Backdrops */}
      <div
        className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] opacity-10 pointer-events-none"
        style={{ background: "radial-gradient(circle, #a8ff3e 0%, transparent 80%)" }}
      />
      <div
        className="absolute top-1/2 right-1/4 w-[600px] h-[600px] rounded-full blur-[180px] opacity-5 pointer-events-none"
        style={{ background: "radial-gradient(circle, #ff6b35 0%, transparent 80%)" }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6 mb-16 border-b border-[#1e2230] pb-10">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div
                className="w-8 h-8 rounded flex items-center justify-center font-mono font-bold text-sm"
                style={{ background: "#a8ff3e", color: "#09090e" }}
              >
                DS
              </div>
              <span className="font-display font-semibold text-white text-lg tracking-tight">
                brick
              </span>
            </div>
            <h1 className="font-display font-bold text-3xl md:text-5xl text-white tracking-tight">
              Design System Explorer
            </h1>
            <p className="text-[#6b7280] text-sm md:text-base mt-2">
              Style guides, tokens, micro-animations, and interface components for Brick Suite.
            </p>
          </div>

          <button
            onClick={() => setView("home")}
            className="px-5 py-3 rounded-lg font-semibold text-sm transition-all cursor-pointer flex items-center gap-2"
            style={{
              background: "rgba(255, 255, 255, 0.03)",
              color: "#f0f2f5",
              border: "1px solid #1e2230",
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = "#a8ff3e"
              ;(e.currentTarget as HTMLElement).style.color = "#09090e"
              ;(e.currentTarget as HTMLElement).style.borderColor = "#a8ff3e"
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = "rgba(255, 255, 255, 0.03)"
              ;(e.currentTarget as HTMLElement).style.color = "#f0f2f5"
              ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
            }}
          >
            ← Back to Landing Page
          </button>
        </div>

        {/* Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-[250px_1fr] gap-12">
          {/* Sticky Sidebar Navigation */}
          <aside className="hidden lg:block sticky top-24 self-start max-h-[calc(100vh-140px)] overflow-y-auto">
            <div className="font-mono text-xs font-bold text-[#6b7280] tracking-wider mb-4">
              SECTIONS
            </div>
            <nav className="flex flex-col gap-1.5">
              {SECTIONS.map((sec) => (
                <a
                  key={sec.id}
                  href={`#${sec.id}`}
                  onClick={(e) => {
                    e.preventDefault()
                    handleSidebarClick(sec.id)
                  }}
                  className="px-3 py-2 text-sm rounded font-medium transition-all text-left flex items-center justify-between"
                  style={{
                    background: activeSection === sec.id ? "rgba(168,255,62,0.08)" : "transparent",
                    borderLeft: `2px solid ${activeSection === sec.id ? "#a8ff3e" : "transparent"}`,
                    color: activeSection === sec.id ? "#a8ff3e" : "#9ca3af",
                  }}
                  onMouseEnter={(e) => {
                    if (activeSection !== sec.id) {
                      ;(e.currentTarget as HTMLElement).style.color = "#ffffff"
                      ;(e.currentTarget as HTMLElement).style.paddingLeft = "16px"
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (activeSection !== sec.id) {
                      ;(e.currentTarget as HTMLElement).style.color = "#9ca3af"
                      ;(e.currentTarget as HTMLElement).style.paddingLeft = "12px"
                    }
                  }}
                >
                  <span>{sec.title}</span>
                </a>
              ))}
            </nav>
          </aside>

          {/* Main Content Area */}
          <main className="space-y-24">
            {/* 1. Introduction */}
            <section id="intro" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-border text-[#6b7280]">
                  SECTION 01
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">1. Introduction</h2>
              <div className="prose prose-invert max-w-none text-[#9ca3af] text-sm leading-relaxed space-y-4">
                <p>
                  Welcome to the **Brick Design System Explorer**. This portal documents our core design guidelines, typography tokens, reusable components, and functional utilities used inside the Brick security infrastructure product shell.
                </p>
                <p>
                  Our aesthetic design direction utilizes **dark interfaces**, **vibrant primary status glows**, **fine hairline borders**, and **highly legible monospace inputs** to communicate stability and state-of-the-art security properties.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="p-5 rounded-xl border border-border bg-[#0f1117]/50">
                    <div className="font-mono text-xs text-[#a8ff3e] font-semibold mb-2">DEVELOPMENT CONVENTIONS</div>
                    <ul className="list-disc pl-4 space-y-2 text-xs">
                      <li>Always use semantic design properties (CSS Custom Properties).</li>
                      <li>Use JetBrains Mono for configuration CLI displays and raw tokens.</li>
                      <li>Ensure interactive outlines align with theme states.</li>
                    </ul>
                  </div>
                  <div className="p-5 rounded-xl border border-border bg-[#0f1117]/50">
                    <div className="font-mono text-xs text-[#ff6b35] font-semibold mb-2">INTERFACE PRINCIPLES</div>
                    <ul className="list-disc pl-4 space-y-2 text-xs">
                      <li>Subtle micro-animations indicate background operations.</li>
                      <li>Never allow unstyled default layout controls.</li>
                      <li>Hover feedback is critical on all responsive widgets.</li>
                    </ul>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Color Tokens */}
            <section id="colors" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-border text-[#6b7280]">
                  SECTION 02
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">2. Color Tokens</h2>
              <p className="text-[#6b7280] text-sm mb-8">
                Design tokens are hosted in `:root` inside <code className="font-mono text-xs text-[#e8eaf0] bg-white/5 px-1 py-0.5 rounded">src/index.css</code>. Avoid redefining raw hex codes inside components.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {COLOR_TOKENS.map((token) => (
                  <div
                    key={token.name}
                    className="p-4 rounded-xl border border-[#1e2230] bg-[#0f1117] flex items-center justify-between"
                  >
                    <div className="flex items-center gap-4">
                      <div
                        className="w-10 h-10 rounded-lg border border-white/10 flex-shrink-0"
                        style={{ backgroundColor: token.value }}
                      />
                      <div>
                        <div className="font-mono text-xs font-bold text-white">{token.name}</div>
                        <div className="text-[11px] text-[#6b7280] mt-1">{token.role}</div>
                      </div>
                    </div>
                    <div className="font-mono text-xs text-[#a8ff3e]">{token.value}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Typography */}
            <section id="typography" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-border text-[#6b7280]">
                  SECTION 03
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">3. Typography</h2>
              <p className="text-[#6b7280] text-sm mb-8">
                We import Outfit (Display headings), Inter (General body UI), and JetBrains Mono (Terminal console blocks) via Google Fonts.
              </p>
              <div className="space-y-6">
                {TYPOGRAPHY_SAMPLES.map((sample) => (
                  <div
                    key={sample.family}
                    className="p-6 rounded-xl border border-border bg-[#0f1117]/40 space-y-3"
                  >
                    <div className="flex items-center justify-between border-b border-[#1e2230]/50 pb-3">
                      <span className="font-display font-semibold text-lg text-white">{sample.family}</span>
                      <span className="font-mono text-xs text-[#6b7280]">{sample.weight}</span>
                    </div>
                    <p className={`text-xl text-[#f0f2f5] my-2 leading-relaxed ${sample.class}`}>
                      {sample.sample}
                    </p>
                    <p className="text-xs text-[#6b7280]">
                      <span className="font-semibold text-white">Usage:</span> {sample.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 4. Buttons & CTAs */}
            <section id="buttons" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-border text-[#6b7280]">
                  SECTION 04
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">4. Buttons & CTAs</h2>
              <p className="text-[#6b7280] text-sm mb-8">
                Interactive triggers with customized transition speeds, cursor controls, and dynamic hover overlays.
              </p>
              <div className="space-y-8">
                {/* Button Live Previews */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Primary Lime */}
                  <div className="p-6 rounded-xl border border-border bg-[#0f1117] flex flex-col items-center justify-between min-h-[160px]">
                    <span className="font-mono text-[10px] text-[#6b7280] mb-4">PRIMARY ACTION</span>
                    <button
                      className="px-6 py-3 rounded font-semibold text-sm transition-all animate-pulse-glow"
                      style={{ background: "#a8ff3e", color: "#09090e" }}
                      onMouseEnter={(e) => (e.currentTarget.style.background = "#bfff5c")}
                      onMouseLeave={(e) => (e.currentTarget.style.background = "#a8ff3e")}
                    >
                      Start for free →
                    </button>
                    <span className="text-xs text-[#6b7280] mt-4">Pulse glowing shadows</span>
                  </div>

                  {/* Secondary Outline */}
                  <div className="p-6 rounded-xl border border-border bg-[#0f1117] flex flex-col items-center justify-between min-h-[160px]">
                    <span className="font-mono text-[10px] text-[#6b7280] mb-4">SECONDARY ACTION</span>
                    <button
                      className="px-6 py-3 rounded font-semibold text-sm transition-all flex items-center gap-2"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        color: "#f0f2f5",
                        border: "1px solid #1e2230",
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.borderColor = "#a8ff3e40"
                        ;(e.currentTarget as HTMLElement).style.background = "rgba(168,255,62,0.05)"
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
                        ;(e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"
                      }}
                    >
                      Watch demo
                    </button>
                    <span className="text-xs text-[#6b7280] mt-4">Subtle primary tint on hover</span>
                  </div>

                  {/* Accent Alt Button */}
                  <div className="p-6 rounded-xl border border-border bg-[#0f1117] flex flex-col items-center justify-between min-h-[160px]">
                    <span className="font-mono text-[10px] text-[#6b7280] mb-4">ACCENT PROXIED</span>
                    <button
                      className="px-5 py-2.5 rounded-lg font-semibold text-sm transition-all cursor-pointer"
                      style={{
                        background: "rgba(255,255,255,0.03)",
                        color: "#f0f2f5",
                        border: "1px solid #1e2230",
                      }}
                      onMouseEnter={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = "#ff6b35"
                        ;(e.currentTarget as HTMLElement).style.color = "#09090e"
                        ;(e.currentTarget as HTMLElement).style.borderColor = "#ff6b35"
                      }}
                      onMouseLeave={(e) => {
                        ;(e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.03)"
                        ;(e.currentTarget as HTMLElement).style.color = "#f0f2f5"
                        ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
                      }}
                    >
                      Configure Proxy
                    </button>
                    <span className="text-xs text-[#6b7280] mt-4">Orange solid on hover</span>
                  </div>
                </div>

                <CodeBlock code={BUTTON_CODES.primary} />
              </div>
            </section>

            {/* 5. Cards & Panels */}
            <section id="cards" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-border text-[#6b7280]">
                  SECTION 05
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">5. Cards & Panels</h2>
              <p className="text-[#6b7280] text-sm mb-8">
                Containers utilize transparent backdrops, fine border configurations, and blurred radial accent elements.
              </p>
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Basic Card */}
                  <div
                    className="rounded-2xl p-6 transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: "#0f1117",
                      border: "1px solid #1e2230",
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = "#a8ff3e"
                      ;(e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(168,255,62,0.05)"
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
                      ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                    }}
                  >
                    <div
                      className="absolute pointer-events-none -right-16 -top-16 w-32 h-32 rounded-full blur-3xl opacity-10 transition-opacity"
                      style={{ background: "#a8ff3e" }}
                    />
                    <div className="font-mono text-xs text-[#a8ff3e] mb-2 font-bold">SECURE PANEL</div>
                    <h3 className="font-display font-semibold text-lg text-white mb-2">Secrets Vault</h3>
                    <p className="text-xs text-[#6b7280] leading-relaxed">
                      Encrypted credentials vault utilizing AES-GCM local keys. Automatically syncs with major platforms. Hover to see primary border glow.
                    </p>
                  </div>

                  {/* PAM Card */}
                  <div
                    className="rounded-2xl p-6 transition-all duration-300 relative overflow-hidden"
                    style={{
                      background: "#0f1117",
                      border: "1px solid #1e2230",
                    }}
                    onMouseEnter={(e) => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = "#b94fff"
                      ;(e.currentTarget as HTMLElement).style.boxShadow = "0 0 25px rgba(185,79,255,0.05)"
                    }}
                    onMouseLeave={(e) => {
                      ;(e.currentTarget as HTMLElement).style.borderColor = "#1e2230"
                      ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                    }}
                  >
                    <div
                      className="absolute pointer-events-none -right-16 -top-16 w-32 h-32 rounded-full blur-3xl opacity-10 transition-opacity"
                      style={{ background: "#b94fff" }}
                    />
                    <div className="font-mono text-xs text-[#b94fff] mb-2 font-bold">ACCESS CONTROL</div>
                    <h3 className="font-display font-semibold text-lg text-white mb-2">Just-In-Time sessions</h3>
                    <p className="text-xs text-[#6b7280] leading-relaxed">
                      Secure session credentials with temporary lifetimes. Full command auditing logs generated dynamically on request.
                    </p>
                  </div>
                </div>

                <CodeBlock code={CARD_CODES} />
              </div>
            </section>

            {/* 6. Inputs & Forms */}
            <section id="inputs" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-border text-[#6b7280]">
                  SECTION 06
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">6. Inputs & Forms</h2>
              <p className="text-[#6b7280] text-sm mb-8">
                Form inputs must use clear, monospaced lettering for raw tokens, values, URLs, and secrets to avoid ambiguity.
              </p>
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border bg-[#0f1117]/60 max-w-xl space-y-4">
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono text-[#6b7280] font-bold">DATABASE URL</label>
                    <input
                      type="text"
                      placeholder="postgresql://user:••••••••••••@localhost:5432/main_db"
                      className="w-full px-4 py-2.5 rounded border border-[#1e2230] bg-[#0a0c12] text-[#f0f2f5] font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#a8ff3e] focus:border-[#a8ff3e] transition-all"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label className="text-[10px] font-mono text-[#6b7280] font-bold">ACCESS PRIVILEGE</label>
                    <select
                      className="w-full px-4 py-2.5 rounded border border-[#1e2230] bg-[#0a0c12] text-[#f0f2f5] font-mono text-xs focus:outline-none focus:ring-1 focus:ring-[#a8ff3e] focus:border-[#a8ff3e] transition-all"
                    >
                      <option>Read-Only / ephem-token</option>
                      <option>Write / admin-level</option>
                      <option>Full Owner / root-keys</option>
                    </select>
                  </div>
                </div>

                <CodeBlock code={INPUT_CODES} />
              </div>
            </section>

            {/* 7. Badges & Tags */}
            <section id="badges" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-border text-[#6b7280]">
                  SECTION 07
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">7. Badges & Tags</h2>
              <p className="text-[#6b7280] text-sm mb-8">
                Status indicators representing deployment environments, scopes, warnings, and capabilities.
              </p>
              <div className="p-6 rounded-xl border border-border bg-[#0f1117]/30 flex flex-wrap gap-4 items-center">
                <span
                  className="px-2.5 py-1 rounded text-xs font-mono font-medium border"
                  style={{
                    background: "rgba(168,255,62,0.08)",
                    border: "1px solid rgba(168,255,62,0.2)",
                    color: "#a8ff3e",
                  }}
                >
                  SECRETS MANAGER
                </span>
                <span
                  className="px-2.5 py-1 rounded text-xs font-mono font-medium border"
                  style={{
                    background: "rgba(255,107,53,0.08)",
                    border: "1px solid rgba(255,107,53,0.2)",
                    color: "#ff6b35",
                  }}
                >
                  AGENT PROXY
                </span>
                <span
                  className="px-2.5 py-1 rounded text-xs font-mono font-medium border"
                  style={{
                    background: "rgba(185,79,255,0.08)",
                    border: "1px solid rgba(185,79,255,0.2)",
                    color: "#b94fff",
                  }}
                >
                  PAM ACCESSED
                </span>
                <span
                  className="px-2.5 py-1 rounded text-xs font-mono font-medium border"
                  style={{
                    background: "rgba(0,212,255,0.08)",
                    border: "1px solid rgba(0,212,255,0.2)",
                    color: "#00d4ff",
                  }}
                >
                  PKI AUTORENEW
                </span>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-mono font-medium border bg-[#fbbf24]/10 border-[#fbbf24]/30 text-[#fbbf24]"
                >
                  ⚠ EXPIRING
                </span>
                <span
                  className="px-2.5 py-1 rounded-full text-xs font-mono font-medium border bg-[#f87171]/10 border-[#f87171]/30 text-[#f87171]"
                >
                  ✕ BLOCKED
                </span>
              </div>
            </section>

            {/* 8. Navigation */}
            <section id="navigation" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-border text-[#6b7280]">
                  SECTION 08
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">8. Navigation</h2>
              <p className="text-[#6b7280] text-sm mb-8">
                Header brand, navigation links, and desktop layouts. Links use active markers and hover effects.
              </p>
              <div className="p-2 rounded-xl border border-border bg-[#0f1117] overflow-hidden">
                <div className="px-6 py-4 flex items-center justify-between border-b border-[#1e2230]/50">
                  <div className="flex items-center gap-3">
                    <div
                      className="w-6 h-6 rounded flex items-center justify-center font-mono font-bold text-[11px]"
                      style={{ background: "#a8ff3e", color: "#09090e" }}
                    >
                      BR
                    </div>
                    <span className="font-display font-semibold text-white text-sm">
                      brick
                    </span>
                  </div>
                  <div className="flex items-center gap-4 text-xs text-[#9ca3af]">
                    <span className="text-[#a8ff3e] font-semibold cursor-pointer">Products</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Agent Proxy</span>
                    <span className="hover:text-white transition-colors cursor-pointer">Integrations</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 9. Terminal & Code */}
            <section id="terminals" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-border text-[#6b7280]">
                  SECTION 09
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">9. Terminal & Code</h2>
              <p className="text-[#6b7280] text-sm mb-8">
                A core feature representing CLI operations. Custom ASCII tables and glowing green prompts are recommended.
              </p>
              <div className="rounded-xl overflow-hidden border border-[#1e2230] bg-[#0a0c12]">
                <div className="flex items-center justify-between px-4 py-2.5 bg-[#0f1117] border-b border-[#1e2230]">
                  <span className="font-mono text-xs text-[#6b7280]">terminal — decrypt</span>
                  <div className="flex gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-[#ff5f57]" />
                    <span className="w-2 h-2 rounded-full bg-[#febc2e]" />
                    <span className="w-2 h-2 rounded-full bg-[#28c840]" />
                  </div>
                </div>
                <div className="p-5 font-mono text-xs space-y-2 leading-relaxed text-[#9ca3af]">
                  <div className="text-[#a8ff3e]">$ brick secrets decrypt</div>
                  <div>🔓 Decrypting environment credentials...</div>
                  <div className="text-[#6b7280]">
                    {"┌──────────────────────┬─────────────────────────────────────┐"}<br />
                    {"│ Key                  │ Decrypted Value                     │"}<br />
                    {"├──────────────────────┼─────────────────────────────────────┤"}<br />
                    {"│ DATABASE_URL         │ postgres://localhost:5432/db        │"}<br />
                    {"│ API_TOKEN            │ inf-live_•••••••••••••••••••••      │"}<br />
                    {"└──────────────────────┴─────────────────────────────────────┘"}
                  </div>
                  <div className="text-[#4ade80]">✓ Session verified. Local environmental buffers synced.</div>
                </div>
              </div>
            </section>

            {/* 10. Animations */}
            <section id="animations" className="scroll-mt-24">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-border text-[#6b7280]">
                  SECTION 10
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">10. Animations</h2>
              <p className="text-[#6b7280] text-sm mb-8">
                Interactive previews showing how animations defined in our custom index CSS perform.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Float */}
                <div className="p-6 rounded-xl border border-border bg-[#0f1117]/60 flex flex-col items-center justify-center min-h-[160px]">
                  <span className="font-mono text-[10px] text-[#6b7280] mb-4">FLOAT EFFECT (.animate-float)</span>
                  <div className="w-10 h-10 rounded bg-[#ff6b35] flex items-center justify-center text-lg animate-float">
                    🤖
                  </div>
                  <span className="text-xs text-[#6b7280] mt-4">Gentle vertical bobbing</span>
                </div>

                {/* Pulse Glow */}
                <div className="p-6 rounded-xl border border-border bg-[#0f1117]/60 flex flex-col items-center justify-center min-h-[160px]">
                  <span className="font-mono text-[10px] text-[#6b7280] mb-4">PULSE GLOW (.animate-pulse-glow)</span>
                  <div className="w-24 py-2 rounded text-center text-xs font-bold text-[#09090e] bg-[#a8ff3e] animate-pulse-glow">
                    SECURED
                  </div>
                  <span className="text-xs text-[#6b7280] mt-4">Pulsing lime shadow glow</span>
                </div>

                {/* Blink */}
                <div className="p-6 rounded-xl border border-border bg-[#0f1117]/60 flex flex-col items-center justify-center min-h-[160px]">
                  <span className="font-mono text-[10px] text-[#6b7280] mb-4">CURSOR BLINK (.animate-blink)</span>
                  <div className="flex items-center gap-1.5 font-mono text-sm text-[#4ade80]">
                    <span>waiting for input</span>
                    <span className="w-2 h-4 bg-[#4ade80] animate-blink" />
                  </div>
                  <span className="text-xs text-[#6b7280] mt-4">Blinking cursor indicator</span>
                </div>

                {/* Gradient-X */}
                <div className="p-6 rounded-xl border border-border bg-[#0f1117]/60 flex flex-col items-center justify-center min-h-[160px]">
                  <span className="font-mono text-[10px] text-[#6b7280] mb-4">GRADIENT-X (.animate-gradient-x)</span>
                  <div
                    className="w-32 py-2 rounded text-center text-xs font-mono font-bold text-white animate-gradient-x"
                    style={{
                      background: "linear-gradient(90deg, #b94fff, #ff6b35, #00d4ff, #b94fff)",
                    }}
                  >
                    SYNCING...
                  </div>
                  <span className="text-xs text-[#6b7280] mt-4">Moving gradient background</span>
                </div>
              </div>
            </section>

            {/* 11. Gradients & FX */}
            <section id="gradients" className="scroll-mt-24 border-t border-[#1e2230]/30 pt-16">
              <div className="flex items-center gap-2 mb-4">
                <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-white/5 border border-border text-[#6b7280]">
                  SECTION 11
                </span>
              </div>
              <h2 className="font-display font-bold text-3xl text-white mb-6">11. Gradients & FX</h2>
              <p className="text-[#6b7280] text-sm mb-8">
                Utility helper styling to generate premium text gradients, glow systems, and background details.
              </p>
              <div className="space-y-6">
                <div className="p-6 rounded-xl border border-border bg-[#0f1117] space-y-4">
                  <div>
                    <span className="font-mono text-[10px] text-[#6b7280] block mb-1">IRIDESCENT TEXT (.iridescent)</span>
                    <span className="text-2xl font-display font-bold iridescent">
                      The security control plane for AI agents.
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-[#6b7280] block mb-1">GLOW GREEN TEXT (.glow-green)</span>
                    <span className="text-2xl font-display font-bold text-[#a8ff3e] glow-green">
                      10,000,000,000+
                    </span>
                  </div>

                  <div>
                    <span className="font-mono text-[10px] text-[#6b7280] block mb-1">GRID BACKGROUND (.grid-bg)</span>
                    <div className="w-full h-16 rounded border border-border grid-bg flex items-center justify-center">
                      <span className="text-xs text-[#6b7280] font-mono">40px Grid pattern</span>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </main>
        </div>
      </div>
    </div>
  )
}
