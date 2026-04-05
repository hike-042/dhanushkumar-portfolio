'use client'

import { useEffect, useRef, useState } from 'react'

const CHARS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%'

function scramble(target: string, frame: number, totalFrames: number): string {
  return target
    .split('')
    .map((char, i) => {
      if (char === ' ') return ' '
      // Each character resolves left to right over time
      const resolveAt = Math.floor((i / target.length) * totalFrames)
      if (frame >= resolveAt) return char
      return CHARS[Math.floor(Math.random() * CHARS.length)]
    })
    .join('')
}

interface Props {
  text: string
  className?: string
  style?: React.CSSProperties
  delay?: number      // ms before starting
  duration?: number   // ms total
  triggerOnHover?: boolean
}

export default function TextScramble({ text, className, style, delay = 0, duration = 1200, triggerOnHover = false }: Props) {
  const [display, setDisplay] = useState(text)
  const [trigger, setTrigger] = useState(0)
  const rafRef = useRef<number | null>(null)

  useEffect(() => {
    const totalFrames = 40
    let frame = 0

    const timer = setTimeout(() => {
      const tick = () => {
        setDisplay(scramble(text, frame, totalFrames))
        frame++
        if (frame <= totalFrames) {
          rafRef.current = requestAnimationFrame(tick)
        } else {
          setDisplay(text)
        }
      }
      rafRef.current = requestAnimationFrame(tick)
    }, delay)

    return () => {
      clearTimeout(timer)
      if (rafRef.current) cancelAnimationFrame(rafRef.current)
    }
  }, [text, delay, duration, trigger])

  return (
    <span
      className={className}
      style={{ ...style, fontVariantNumeric: 'tabular-nums', cursor: triggerOnHover ? 'default' : undefined }}
      onMouseEnter={triggerOnHover ? () => setTrigger(t => t + 1) : undefined}
    >
      {display}
    </span>
  )
}
