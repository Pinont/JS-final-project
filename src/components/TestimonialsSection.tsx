import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Quote, Star, ChevronLeft, ChevronRight } from "lucide-react"

// ─── Data ────────────────────────────────────────────────────────────────────

export const TESTIMONIALS = [
  {
    quote:
      "Brick migrated our entire secret infrastructure from Vault to Brick in 8 weeks with zero downtime. Their team understands the platform deeply — from PKI automation to agent proxy — and they transferred that knowledge to our engineers. Best vendor engagement we've had.",
    author: "Somsak Ch.",
    role: "VP Engineering",
    company: "Major Thai Commercial Bank",
    avatar: "SC",
    rating: 5,
  },
  {
    quote:
      "The agent proxy implementation was a game-changer for our AI platform. We went from managing hundreds of raw API keys across agent fleets to zero credentials in model context. Brick's team built the proxy layer, set up audit streaming, and got us compliant for our Series B audit in record time.",
    author: "Natthida R.",
    role: "CTO",
    company: "AI Lending Platform (Series B)",
    avatar: "NR",
    rating: 5,
  },
  {
    quote:
      "Certificate management used to be a monthly fire drill — 200+ domains, manual renewals, occasional outages. Brick implemented Brick PKI with ACME automation and multi-cloud sync. Zero expiries in 18 months. Our ops team reclaimed 40 hours/month.",
    author: "Pawat K.",
    role: "Head of Platform",
    company: "Thailand's Largest Marketplace",
    avatar: "PK",
    rating: 5,
  },
  {
    quote:
      "We needed JIT privileged access for production databases with full session recording for SOC 2. Brick deployed Brick PAM with Slack approval workflows and break-glass procedures. Auditor loved the evidence automation. Our engineers actually enjoy the workflow now.",
    author: "Siriporn T.",
    role: "Security Engineering Lead",
    company: "Fintech Unicorn",
    avatar: "ST",
    rating: 5,
  },
]

export const CLIENT_LOGOS = [
  { name: "Major Thai Bank", initials: "BK" },
  { name: "AI Lending Platform", initials: "AI" },
  { name: "National Marketplace", initials: "MP" },
  { name: "Fintech Unicorn", initials: "FU" },
  { name: "E-commerce Platform", initials: "EC" },
  { name: "Healthcare Provider", initials: "HP" },
  { name: "Logistics Conglomerate", initials: "LG" },
  { name: "Government Agency", initials: "GA" },
]

// ─── Section: Client Testimonials & Trusted By ───────────────────────────────

export default function TestimonialsSection() {
  const [active, setActive] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setActive((prev) => (prev + 1) % TESTIMONIALS.length)
    }, 6000)
    return () => clearInterval(timer)
  }, [])

  const nextTestimonial = () => {
    setActive((prev) => (prev + 1) % TESTIMONIALS.length)
  }

  const prevTestimonial = () => {
    setActive((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  return (
    <section id="testimonials" className="py-24 max-w-7xl mx-auto px-6 relative">
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="text-center mb-16"
      >
        <div className="font-mono text-xs mb-3 uppercase tracking-widest text-[var(--primary)] font-semibold">
          CLIENT TESTIMONIALS
        </div>
        <h2
          className="font-display font-bold text-3xl sm:text-4xl md:text-5xl mb-4 text-white text-balance"
          style={{ letterSpacing: "-0.02em" }}
        >
          What our clients secured
        </h2>
        <p
          className="text-base sm:text-lg max-w-2xl mx-auto leading-relaxed"
          style={{ color: "var(--muted-foreground)" }}
        >
          Real feedback from engineering and security leaders who trust us with their Brick deployments.
        </p>
      </motion.div>

      {/* Main Quote Card Container */}
      <div className="max-w-4xl mx-auto mb-16 relative">
        <div className="glass-panel rounded-3xl p-8 sm:p-12 border border-[var(--border)] relative overflow-hidden">
          <div className="absolute top-6 right-8 text-[var(--primary)] opacity-10 pointer-events-none">
            <Quote className="w-24 h-24" />
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -12 }}
              transition={{ duration: 0.4 }}
              className="relative z-10"
            >
              {/* Rating Stars */}
              <div className="flex gap-1 mb-6">
                {[...Array(TESTIMONIALS[active]?.rating || 5)].map((_, i) => (
                  <Star
                    key={i}
                    className="w-4 h-4 text-[var(--primary)] fill-[var(--primary)]"
                  />
                ))}
              </div>

              {/* Quote Body */}
              <blockquote className="font-display text-xl sm:text-2xl text-white font-normal leading-relaxed mb-8">
                "{TESTIMONIALS[active]?.quote}"
              </blockquote>

              {/* Author Info */}
              <div className="flex items-center justify-between border-t border-[var(--border)] pt-6 flex-wrap gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-[rgba(168,255,62,0.1)] border border-[rgba(168,255,62,0.2)] flex items-center justify-center font-mono font-bold text-sm text-[var(--primary)]">
                    {TESTIMONIALS[active]?.avatar}
                  </div>
                  <div>
                    <div className="font-display font-semibold text-white text-base">
                      {TESTIMONIALS[active]?.author}
                    </div>
                    <div className="font-mono text-xs text-[var(--muted-foreground)]">
                      {TESTIMONIALS[active]?.role} · {TESTIMONIALS[active]?.company}
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                <div className="flex items-center gap-2">
                  <button
                    onClick={prevTestimonial}
                    className="p-2 rounded-lg bg-[#13151e] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-white hover:border-[var(--primary)] transition-all cursor-pointer"
                    aria-label="Previous quote"
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button
                    onClick={nextTestimonial}
                    className="p-2 rounded-lg bg-[#13151e] border border-[var(--border)] text-[var(--muted-foreground)] hover:text-white hover:border-[var(--primary)] transition-all cursor-pointer"
                    aria-label="Next quote"
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Carousel Indicator Dots */}
        <div className="flex justify-center gap-2 mt-6">
          {TESTIMONIALS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setActive(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                active === idx ? "w-8 bg-[var(--primary)]" : "w-2 bg-[var(--border)] hover:bg-white/40"
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>


    </section>
  )
}
