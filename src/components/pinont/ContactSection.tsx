interface ContactSectionProps {
  lang: "EN" | "TH"
}
import { useState } from "react"
import contactMd from "./content/contact.md?raw"
import { parseContactLinks, parseTranslations } from "./parseContent"
import GlowButton from "./GlowButton"
import { tr } from "./translations"

const contactT = parseTranslations(contactMd)
const links = parseContactLinks(contactMd)

export default function ContactSection(props: ContactSectionProps) {
  const lang = "EN"
  const [copied, setCopied] = useState(false)

  const emailAddress =
    contactT["contact_email_address"]?.EN ?? "nont.nonipat@gmail.com"
  const footerCopy = contactT["footer_copy"]?.[lang] ?? "© 2025 Pinont The Dev"
  const footerSite = contactT["footer_site"]?.[lang] ?? "PINONT.ME"

  const copyEmail = () => {
    navigator.clipboard.writeText(emailAddress)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section
      id="contact"
      style={{
        position: "relative",
        zIndex: 1,
        padding: "clamp(60px, 10vw, 120px) 24px clamp(80px, 12vw, 140px)",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div className="section-label" style={{ marginBottom: 16 }}>
          {tr("contact_label", lang)}
        </div>
        <h2
          style={{
            margin: "0 0 16px",
            fontSize: "clamp(28px, 5vw, 60px)",
            fontWeight: 800,
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            color: "var(--foreground)",
            lineHeight: 1.05,
          }}
        >
          {tr("contact_title", lang)}
        </h2>
        <p
          style={{
            margin: "0 0 48px",
            fontSize: 15,
            color: "var(--muted-foreground)",
            fontFamily: "'Plus Jakarta Sans', sans-serif",
            lineHeight: 1.7,
            maxWidth: 480,
          }}
        >
          {tr("contact_sub", lang)}
        </p>

        <div
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 48,
          }}
        >
          <GlowButton variant="primary" onClick={copyEmail}>
            {copied ? tr("contact_copied", lang) : tr("contact_email", lang)}
          </GlowButton>
          <GlowButton variant="outline" href={`mailto:${emailAddress}`}>
            {emailAddress}
          </GlowButton>
        </div>

        {/* Social links */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
            gap: 1,
            border: "1px solid var(--border)",
            borderRadius: 2,
            overflow: "hidden",
          }}
        >
          {links.map(({ label, url, prefix, handle }) => (
            <a
              key={label}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "block",
                padding: "20px 24px",
                background: "var(--card)",
                textDecoration: "none",
                transition: "background 0.15s",
              }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.background = "var(--muted)")
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.background = "var(--card)")
              }
            >
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 10,
                  letterSpacing: "0.2em",
                  color: "var(--primary)",
                  marginBottom: 6,
                  textTransform: "uppercase",
                }}
              >
                {label}
              </div>
              <div
                style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: 12,
                  color: "var(--muted-foreground)",
                }}
              >
                {prefix}
                <span style={{ color: "var(--foreground)" }}>{handle}</span>
              </div>
            </a>
          ))}
        </div>

        {/* Footer */}
        <div
          style={{
            marginTop: 60,
            paddingTop: 24,
            borderTop: "1px solid var(--border)",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            flexWrap: "wrap",
            gap: 12,
          }}
        >
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "var(--muted-foreground)",
              letterSpacing: "0.12em",
            }}
          >
            {footerCopy}
          </span>
          <span
            style={{
              fontFamily: "'JetBrains Mono', monospace",
              fontSize: 11,
              color: "var(--muted-foreground)",
              letterSpacing: "0.12em",
            }}
          >
            {footerSite}
          </span>
        </div>
      </div>
    </section>
  )
}
