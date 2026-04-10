'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import useDeviceProfile from './use-device-profile'

/**
 * Premium custom cursor - replaces the native cursor on desktop.
 * - Outer ring: trails behind the mouse (spring lag = "chasing" feel)
 * - Inner dot: snaps to cursor almost instantly
 * - On hover over links/buttons: ring expands and fills, dot hides
 */
export default function CursorGlow() {
  const { isTouch, prefersReducedMotion } = useDeviceProfile()
  const mouseX = useMotionValue(-200)
  const mouseY = useMotionValue(-200)
  const [hovering, setHovering] = useState(false)
  const [clicking, setClicking] = useState(false)
  const [label,    setLabel]    = useState('')

  // Ring - heavy spring lag creates the trailing effect
  const ringX = useSpring(mouseX, { stiffness: 105, damping: 22, mass: 0.6 })
  const ringY = useSpring(mouseY, { stiffness: 105, damping: 22, mass: 0.6 })

  // Dot - near-instant, snaps to cursor
  const dotX = useSpring(mouseX, { stiffness: 650, damping: 32 })
  const dotY = useSpring(mouseY, { stiffness: 650, damping: 32 })

  useEffect(() => {
    if (isTouch || prefersReducedMotion) return

    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }

    const onOver = (e: MouseEvent) => {
      const el = (e.target as Element).closest('[data-cursor], a, button, [role="button"]')
      if (el) {
        setHovering(true)
        setLabel(el.getAttribute('data-cursor') ?? '')
      }
    }

    const onOut = (e: MouseEvent) => {
      const el = (e.target as Element).closest('[data-cursor], a, button, [role="button"]')
      if (el) {
        setHovering(false)
        setLabel('')
      }
    }

    const onDown = () => setClicking(true)
    const onUp   = () => setClicking(false)

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout',  onOut)
    document.addEventListener('mousedown', onDown)
    document.addEventListener('mouseup',   onUp)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout',  onOut)
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('mouseup',   onUp)
    }
  }, [isTouch, mouseX, mouseY, prefersReducedMotion])

  if (isTouch || prefersReducedMotion) return null

  return (
    <div className="cursor-root">

      {/* ── OUTER RING - trails behind cursor ── */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 38, height: 38,
          borderRadius: '50%',
          border: '1.5px solid var(--accent)',
          marginLeft: -19, marginTop: -19,
          x: ringX, y: ringY,
          pointerEvents: 'none',
          zIndex: 99999,
          overflow: 'hidden',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
        animate={{
          scale: clicking ? 0.85 : (hovering && label) ? 2.6 : hovering ? 1.75 : 1,
        }}
        transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        {/* Fill that fades in on hover */}
        <motion.div
          style={{
            position: 'absolute', inset: 0,
            background: 'rgba(var(--accent-rgb), 0.14)',
          }}
          animate={{ opacity: hovering ? 1 : 0 }}
          transition={{ duration: 0.18 }}
        />
        {/* Label morph - appears inside ring when data-cursor is set */}
        <AnimatePresence mode="wait">
          {hovering && label && (
            <motion.span
              key={label}
              initial={{ opacity: 0, scale: 0.6 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{   opacity: 0, scale: 0.6 }}
              transition={{ duration: 0.15 }}
              style={{
                position: 'relative',
                fontSize: '0.34rem',
                fontWeight: 600,
                letterSpacing: '.06em',
                textTransform: 'uppercase',
                color: 'var(--accent)',
                whiteSpace: 'nowrap',
                userSelect: 'none',
              }}
            >
              {label}
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* ── INNER DOT - snaps to cursor precisely ── */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0, left: 0,
          width: 6, height: 6,
          borderRadius: '50%',
          background: 'var(--accent)',
          marginLeft: -3, marginTop: -3,
          x: dotX, y: dotY,
          pointerEvents: 'none',
          zIndex: 99999,
        }}
        animate={{ scale: hovering ? 0 : clicking ? 1.5 : 1 }}
        transition={{ duration: 0.14 }}
      />

    </div>
  )
}
