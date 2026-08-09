import { useEffect, useRef, useState, useCallback } from "react"

const SCRAMBLE = "!<>-_\\/[]{}—=+*^?#@░▒▓│─┼".split("")

interface Props {
  text: string
  className?: string
  trigger?: boolean
  speed?: number
}

export default function AsciiText({
  text,
  className,
  trigger = true,
  speed = 40,
}: Props) {
  const [display, setDisplay] = useState(() => text.split("").map(() => " "))
  const timeouts = useRef<ReturnType<typeof setTimeout>[]>([])
  const intervals = useRef<ReturnType<typeof setInterval>[]>([])

  const cancel = () => {
    timeouts.current.forEach(clearTimeout)
    intervals.current.forEach(clearInterval)
    timeouts.current = []
    intervals.current = []
  }

  const animate = useCallback(() => {
    cancel()
    const chars = text.split("")
    chars.forEach((char, i) => {
      if (char === " ") {
        setDisplay((prev) => {
          const n = [...prev]
          n[i] = " "
          return n
        })
        return
      }
      let scrambleCount = 0
      const maxScramble = 6 + Math.floor(Math.random() * 6)
      const t = setTimeout(() => {
        const iv = setInterval(() => {
          if (scrambleCount >= maxScramble) {
            clearInterval(iv)
            setDisplay((prev) => {
              const n = [...prev]
              n[i] = char
              return n
            })
            return
          }
          scrambleCount++
          setDisplay((prev) => {
            const n = [...prev]
            n[i] = SCRAMBLE[Math.floor(Math.random() * SCRAMBLE.length)]
            return n
          })
        }, 35)
        intervals.current.push(iv)
      }, i * speed)
      timeouts.current.push(t)
    })
  }, [text, speed])

  // Keep a ref so the effect can always call the latest animate without it being a dep
  const animateRef = useRef(animate)
  animateRef.current = animate

  useEffect(() => {
    // Reset to correct length when text changes (language switch)
    setDisplay(text.split("").map(() => " "))
    if (trigger) animateRef.current()
    return cancel
  }, [text, trigger])

  return (
    <span
      className={className}
      style={{ fontFamily: "'JetBrains Mono', monospace", cursor: "default" }}
      onMouseEnter={animate}
    >
      {display.join("")}
    </span>
  )
}
