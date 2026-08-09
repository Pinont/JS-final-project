import { useEffect, useRef } from "react"

const CHARS = "░▒▓│─┼+.*·:".split("")

export default function AsciiBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const theme = "dark" as "dark" | "light"

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")!
    let raf: number
    let cols = 0,
      rows = 0
    const grid: { char: string alpha: number drift: number speed: number }[] =
      []

    const resize = () => {
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      const cellW = 18,
        cellH = 22
      cols = Math.ceil(canvas.width / cellW) + 1
      rows = Math.ceil(canvas.height / cellH) + 1
      grid.length = 0
      for (let i = 0; i < cols * rows; i++) {
        grid.push({
          char: CHARS[Math.floor(Math.random() * CHARS.length)],
          alpha: Math.random(),
          drift: Math.random() * Math.PI * 2,
          speed: 0.003 + Math.random() * 0.008,
        })
      }
    }

    resize()
    window.addEventListener("resize", resize)

    let t = 0
    const draw = () => {
      t += 1
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      const cellW = 18,
        cellH = 22
      const baseOpacity = theme === "light" ? 0.055 : 0.09
      ctx.font = '11px "JetBrains Mono", monospace'
      ctx.fillStyle = theme === "light" ? "#2d7a00" : "#a8ff78"

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const idx = r * cols + c
          const cell = grid[idx]
          cell.drift += cell.speed
          const alpha = (Math.sin(cell.drift) * 0.5 + 0.5) * baseOpacity
          ctx.globalAlpha = alpha
          if (t % 180 === idx % 180) {
            cell.char = CHARS[Math.floor(Math.random() * CHARS.length)]
          }
          ctx.fillText(cell.char, c * cellW, r * cellH + cellH)
        }
      }
      ctx.globalAlpha = 1
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener("resize", resize)
    }
  }, [theme])

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        display: "block",
      }}
    />
  )
}
