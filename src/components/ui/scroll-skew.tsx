'use client'

import { useScroll, useVelocity, useTransform, useSpring, motion } from 'framer-motion'
import useDeviceProfile from './use-device-profile'

/**
 * Wraps content in a subtle scroll-velocity skew.
 * Fast scroll → slight skewY tilt, snaps back instantly on stop.
 * Signature move of Locomotive Scroll / Awwwards agency sites.
 */
export default function ScrollSkew({ children }: { children: React.ReactNode }) {
  const { isMobile, isTouch, prefersReducedMotion } = useDeviceProfile()
  const { scrollY }  = useScroll()
  const velocity     = useVelocity(scrollY)
  const smoothV      = useSpring(velocity, { stiffness: 400, damping: 60, restDelta: 0.001 })
  const skewY        = useTransform(smoothV, [-2200, 2200], [1.6, -1.6])
  const disableSkew = isMobile || isTouch || prefersReducedMotion

  return (
    <motion.div className="scroll-skew-shell" style={{ skewY: disableSkew ? 0 : skewY, willChange: disableSkew ? 'auto' : 'transform' }}>
      {children}
    </motion.div>
  )
}
