'use client'

import { useEffect, useRef } from 'react'

/**
 * Spawns small accent-coloured dots at the cursor position as it moves.
 * Particles float upward and fade out over 650ms.
 * Only spawns when cursor has moved ≥14px to avoid dense clumping.
 */
export default function CursorTrail() {
  const containerRef = useRef<HTMLDivElement>(null)
  const lastPos = useRef({ x: 0, y: 0 })

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    function onMove(e: MouseEvent) {
      const dx = e.clientX - lastPos.current.x
      const dy = e.clientY - lastPos.current.y
      if (Math.sqrt(dx * dx + dy * dy) < 14) return
      lastPos.current = { x: e.clientX, y: e.clientY }

      const size = 3 + Math.random() * 3   // 3–6 px
      const dot  = document.createElement('div')
      dot.style.cssText = `
        position: fixed;
        left: ${e.clientX}px;
        top: ${e.clientY}px;
        width: ${size}px;
        height: ${size}px;
        border-radius: 50%;
        background: var(--accent);
        transform: translate(-50%, -50%);
        pointer-events: none;
        z-index: 9989;
        animation: particle-fade 0.65s ease-out forwards;
      `
      container.appendChild(dot)
      setTimeout(() => dot.remove(), 700)
    }

    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [])

  return (
    <div
      ref={containerRef}
      style={{ position: 'fixed', inset: 0, pointerEvents: 'none', zIndex: 9989 }}
    />
  )
}
