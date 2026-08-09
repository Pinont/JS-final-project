import {
  useRef,
  type ReactNode,
  type CSSProperties,
  type MouseEvent,
} from "react"

interface Props {
  children: ReactNode
  onClick?: (e: MouseEvent<HTMLButtonElement | HTMLAnchorElement>) => void
  href?: string
  variant?: "primary" | "outline"
  style?: CSSProperties
  external?: boolean
}

export default function GlowButton({
  children,
  onClick,
  href,
  variant = "primary",
  style,
  external,
}: Props) {
  const ref = useRef<HTMLAnchorElement & HTMLButtonElement>(null)

  const handleMouseMove = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    el.style.setProperty("--gx", `${x}px`)
    el.style.setProperty("--gy", `${y}px`)
    el.style.setProperty("--glow-opacity", "1")
  }

  const handleMouseLeave = () => {
    ref.current?.style.setProperty("--glow-opacity", "0")
  }

  const base: CSSProperties = {
    position: "relative",
    display: "inline-flex",
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: 12,
    letterSpacing: "0.2em",
    textTransform: "uppercase",
    fontWeight: 700,
    padding: "12px 28px",
    borderRadius: 2,
    textDecoration: "none",
    cursor: "pointer",
    overflow: "hidden",
    transition: "transform 0.15s, box-shadow 0.2s",
    // glow layer via pseudo — done inline with a ::before-like overlay div
    ...style,
  }

  const primaryStyle: CSSProperties = {
    ...base,
    background: "var(--primary)",
    color: "var(--primary-foreground)",
    border: "none",
    boxShadow: "0 0 0 0 var(--primary)",
  }

  const outlineStyle: CSSProperties = {
    ...base,
    background: "transparent",
    color: "var(--foreground)",
    border: "1px solid var(--border)",
  }

  const glowOverlay: CSSProperties = {
    position: "absolute",
    inset: 0,
    background:
      variant === "primary"
        ? "radial-gradient(circle 60px at var(--gx, 50%) var(--gy, 50%), rgba(255,255,255,0.28) 0%, transparent 70%)"
        : "radial-gradient(circle 60px at var(--gx, 50%) var(--gy, 50%), rgba(96,165,250,0.22) 0%, transparent 70%)",
    opacity: "var(--glow-opacity, 0)" as any,
    transition: "opacity 0.2s",
    pointerEvents: "none",
    borderRadius: "inherit",
  }

  const handleMouseEnter = (e: MouseEvent<HTMLElement>) => {
    const el = ref.current
    if (!el) return
    if (variant === "primary") {
      el.style.boxShadow =
        "0 0 22px 2px color-mix(in srgb, var(--primary) 45%, transparent)"
      el.style.transform = "translateY(-1px)"
    } else {
      el.style.borderColor = "var(--primary)"
      el.style.color = "var(--primary)"
      el.style.transform = "translateY(-1px)"
    }
  }

  const handleMouseLeaveAll = (e: MouseEvent<HTMLElement>) => {
    handleMouseLeave()
    const el = ref.current
    if (!el) return
    el.style.boxShadow = ""
    el.style.transform = ""
    if (variant === "outline") {
      el.style.borderColor = ""
      el.style.color = ""
    }
  }

  const props = {
    ref,
    style: variant === "primary" ? primaryStyle : outlineStyle,
    onMouseMove: handleMouseMove,
    onMouseEnter: handleMouseEnter,
    onMouseLeave: handleMouseLeaveAll,
    onClick,
  }

  const inner = (
    <>
      <div style={glowOverlay} />
      {children}
    </>
  )

  if (href) {
    const isExternal = external || href.startsWith("http")
    return (
      <a
        {...props}
        href={href}
        target={isExternal ? "_blank" : undefined}
        rel={isExternal ? "noopener noreferrer" : undefined}
      >
        {inner}
      </a>
    )
  }
  return <button {...props}>{inner}</button>
}
