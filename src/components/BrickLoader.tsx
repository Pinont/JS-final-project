import { useState, useEffect } from "react"

// ─── Brick Loading Animation ────────────────────────────────────────────────

export default function BrickLoader() {
  const [showContent, setShowContent] = useState(false)
  const [bricks, setBricks] = useState<Array<{
    x: number
    y: number
    delay: number
    glitchDelay: number
  }>>([])

  useEffect(() => {
    // Generate brick grid (8 cols x 6 rows = 48 bricks)
    const newBricks: Array<{
      x: number
      y: number
      delay: number
      glitchDelay: number
    }> = []
    const cols = 8
    const rows = 6

    for (let row = 0; row < rows; row++) {
      for (let col = 0; col < cols; col++) {
        // Staggered stacking delay (bottom to top, left to right)
        const stackDelay = (rows - 1 - row) * 80 + col * 40
        // Glitch delay starts after stacking completes
        const glitchDelay = stackDelay + 800 + Math.random() * 400

        newBricks.push({ x: col, y: row, delay: stackDelay, glitchDelay })
      }
    }

    setBricks(newBricks)

    // Total animation duration: stacking (max ~600ms) + hold (800ms) + glitch cascade (max ~1200ms) + fade
    const totalDuration = 2800
    const timer = setTimeout(() => {
      setShowContent(true)
    }, totalDuration)

    return () => clearTimeout(timer)
  }, [])

  if (showContent) return null

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center"
      style={{ background: "var(--background)" }}
      aria-hidden="true"
    >
      <div className="relative" style={{ width: "320px", height: "240px" }}>
        {bricks.map((brick, i) => (
          <Brick
            key={i}
            x={brick.x}
            y={brick.y}
            stackDelay={brick.delay}
            glitchDelay={brick.glitchDelay}
            cols={8}
            rows={6}
          />
        ))}

        {/* Brick logo in center */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
          <svg
            width="80"
            height="80"
            viewBox="0 0 32 32"
            className="opacity-0"
            style={{
              animation: "fade-in 400ms ease-out 400ms forwards",
            }}
          >
            <rect
              x="2"
              y="2"
              width="28"
              height="28"
              rx="3"
              fill="var(--primary)"
            />
            <line
              x1="2"
              y1="12"
              x2="30"
              y2="12"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="2"
              y1="22"
              x2="30"
              y2="22"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="2"
              x2="12"
              y2="12"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="22"
              y1="2"
              x2="22"
              y2="12"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="7"
              y1="12"
              x2="7"
              y2="22"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="17"
              y1="12"
              x2="17"
              y2="22"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="27"
              y1="12"
              x2="27"
              y2="22"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="12"
              y1="22"
              x2="12"
              y2="30"
              stroke="var(--background)"
              strokeWidth="2"
            />
            <line
              x1="22"
              y1="22"
              x2="22"
              y2="30"
              stroke="var(--background)"
              strokeWidth="2"
            />
          </svg>
        </div>
      </div>
    </div>
  )
}

function Brick({
  x,
  y,
  stackDelay,
  glitchDelay,
  cols,
  rows,
}: {
  x: number
  y: number
  stackDelay: number
  glitchDelay: number
  cols: number
  rows: number
}) {
  const brickWidth = 100 / cols
  const brickHeight = 100 / rows
  const mortar = 1.5 // gap between bricks

  // Staggered offset for more organic feel (running bond pattern)
  const offsetX = (y % 2) * (brickWidth / 2) * 0.3
  const left = `calc(${x * brickWidth}% + ${mortar}px)`
  const top = `calc(${y * brickHeight}% + ${mortar}px)`

  const stackAnimation = `brick-stack 500ms cubic-bezier(0.34, 1.56, 0.64, 1) ${stackDelay}ms forwards`
  const glitchAnimation = `brick-glitch 1000ms ease-in-out ${glitchDelay}ms forwards`

  return (
    <div
      className="absolute"
      style={{
        left,
        top,
        width: `calc(${brickWidth}% - ${mortar * 2}px)`,
        height: `calc(${brickHeight}% - ${mortar * 2}px)`,
        animation: `${stackAnimation}, ${glitchAnimation}`,
        transformOrigin: "center center",
        opacity: 0,
        borderRadius: "2px",
        boxShadow: `
          inset -2px -2px 4px rgba(0,0,0,0.3),
          inset 2px 2px 4px rgba(255,255,255,0.1),
          0 2px 4px rgba(0,0,0,0.2)
        `,
        background:
          "linear-gradient(145deg, var(--card) 0%, var(--muted) 50%, var(--card) 100%)",
        border: "1px solid var(--border)",
        transform: `translateX(${offsetX}%)`,
      }}
    >
      {/* Brick texture lines */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
          repeating-linear-gradient(90deg, transparent, transparent 2px, rgba(0,0,0,0.03) 2px, rgba(0,0,0,0.03) 4px),
          repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(255,255,255,0.02) 3px, rgba(255,255,255,0.02) 6px)
        `,
          pointerEvents: "none",
          borderRadius: "2px",
        }}
      />
    </div>
  )
}
