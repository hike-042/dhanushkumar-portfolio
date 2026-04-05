'use client'

import { useEffect, useRef } from 'react'

interface Props {
  children: React.ReactNode
  style?: React.CSSProperties
}

/**
 * Small uppercase section overline with an accent underline that sweeps in
 * when scrolled into view.
 */
export default function SectionLabel({ children, style }: Props) {
  const ref = useRef<HTMLParagraphElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('visible')
          obs.disconnect()
        }
      },
      { rootMargin: '-20px', threshold: 0.5 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <p
      ref={ref}
      className="section-label"
      style={{
        fontSize: '.72rem',
        fontWeight: 500,
        letterSpacing: '.16em',
        textTransform: 'uppercase',
        color: 'var(--accent)',
        marginBottom: 12,
        ...style,
      }}
    >
      {children}
    </p>
  )
}
