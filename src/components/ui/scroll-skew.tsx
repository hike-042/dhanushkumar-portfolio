'use client'

import { useScroll, useVelocity, useTransform, useSpring, motion } from 'framer-motion'

/**
 * Wraps content in a subtle scroll-velocity skew.
 * Fast scroll → slight skewY tilt, snaps back instantly on stop.
 * Signature move of Locomotive Scroll / Awwwards agency sites.
 */
export default function ScrollSkew({ children }: { children: React.ReactNode }) {
  const { scrollY }  = useScroll()
  const velocity     = useVelocity(scrollY)
  const smoothV      = useSpring(velocity, { stiffness: 400, damping: 60, restDelta: 0.001 })
  const skewY        = useTransform(smoothV, [-2200, 2200], [1.6, -1.6])

  return (
    <motion.div className="scroll-skew-shell" style={{ skewY, willChange: 'transform' }}>
      {children}
    </motion.div>
  )
}
