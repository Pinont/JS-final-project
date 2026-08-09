import { Star } from "lucide-react"

// 1.3 Client Testimonials

const TESTIMONIALS = [
  {
    quote:
      "Brick delivered our store POS migration without a single minute of downtime. The offline-first sync handled our worst-case network drops like it was nothing. We trust them with every new location we open.",
    author: "Somchai Phanich",
    role: "IT Director",
    company: "Retail Chain Co.",
    avatar: "SP",
    rating: 5,
    color: "#a8ff3e",
  },
  {
    quote:
      "Their security review caught three credential-leak vectors our previous vendor missed entirely. The agent-proxy design means our LLM pipelines never see raw secrets. Compliance signed off in record time.",
    author: "Jessica Lim",
    role: "Head of Platform",
    company: "FinTech Startup",
    avatar: "JL",
    rating: 5,
    color: "#ff6b35",
  },
  {
    quote:
      "We handed them a half-finished mobile app and a hard deadline. Eight weeks later we shipped to 200,000 users with a 4.8 store rating. Communication was clear, deliveries were on time, quality was excellent.",
    author: "Anon Srisai",
    role: "Product Lead",
    company: "Logistics App",
    avatar: "AS",
    rating: 5,
    color: "#00d4ff",
  },
  {
    quote:
      "The web portal they built became the backbone of our daily operations. It survived a 10x traffic spike during our launch event without breaking a sweat. Exactly the kind of partner you want for critical systems.",
    author: "Warunya Chai",
    role: "Operations Manager",
    company: "Enterprise SaaS",
    avatar: "WC",
    rating: 5,
    color: "#b94fff",
  },
]

function Stars({ count, color }: { count: number color: string }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {Array.from({ length: count }).map((_, i) => (
        <svg key={i} width="14" height="14" viewBox="0 0 24 24" fill={color}>
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

export default function ClientTestimonials() {
  return (
    <section
      id="client-testimonials"
      className="py-28 relative overflow-hidden"
      style={{ background: "#080a0f" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 50% 50%, rgba(185,79,255,0.04) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* Section Label */}
        <div className="text-center mb-16">
          <div
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full mb-4 font-mono text-xs"
            style={{
              background: "rgba(185,79,255,0.08)",
              border: "1px solid rgba(185,79,255,0.2)",
              color: "#b94fff",
            }}
          >
            <span className="w-1.5 h-1.5 rounded-full bg-current" />
            CLIENT TESTIMONIALS
          </div>
          <h2
            className="font-display font-bold mb-5"
            style={{
              fontSize: "clamp(2rem, 5vw, 3.5rem)",
              color: "#f0f2f5",
              letterSpacing: "-0.03em",
            }}
          >
            Trusted by teams who
            <br />
            <span className="iridescent">can't afford to fail.</span>
          </h2>
          <p
            className="text-lg max-w-2xl mx-auto leading-relaxed"
            style={{ color: "#6b7280" }}
          >
            Real feedback from the engineering and operations leaders who rely
            on our systems in production every single day.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 gap-5">
          {TESTIMONIALS.map(
            ({ quote, author, role, company, avatar, rating, color }) => (
              <div
                key={author}
                className="rounded-2xl p-7 flex flex-col transition-all duration-200"
                style={{ background: "#0f1117", border: "1px solid #1e2230" }}
                onMouseEnter={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor = `${color}40`
                  ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${color}12`
                }}
                onMouseLeave={(e) => {
                  ;(e.currentTarget as HTMLElement).style.borderColor =
                    "#1e2230"
                  ;(e.currentTarget as HTMLElement).style.boxShadow = "none"
                }}
              >
                <Stars count={rating} color={color} />

                <blockquote
                  className="font-display text-base leading-relaxed mb-6 flex-1"
                  style={{ color: "#e8eaf0", letterSpacing: "-0.01em" }}
                >
                  "{quote}"
                </blockquote>

                <div
                  className="flex items-center gap-3 pt-5"
                  style={{ borderTop: "1px solid #1e2230" }}
                >
                  <div className="w-10 h-10 rounded-full flex items-center justify-center font-mono text-xs font-bold bg-primary text-[var(--primary-foreground)]">
                    {avatar}
                  </div>
                  <div>
                    <div
                      className="text-sm font-semibold"
                      style={{ color: "#f0f2f5" }}
                    >
                      {author}
                    </div>
                    <div
                      className="text-xs font-mono"
                      style={{ color: "#4b5563" }}
                    >
                      {role} · {company}
                    </div>
                  </div>
                </div>
              </div>
            ),
          )}
        </div>

        {/* Trust line */}
        <div className="text-center mt-14">
          <p className="font-mono text-xs flex items-center justify-center gap-1.5" style={{ color: "#374151" }}>
            <Star className="w-3.5 h-3.5 text-[#a8ff3e] fill-[#a8ff3e]" />
            4.9 / 5 average client satisfaction across 200+ delivered projects
          </p>
        </div>
      </div>
    </section>
  )
}
