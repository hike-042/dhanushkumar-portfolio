'use client'

import { MotionConfig } from 'framer-motion'

/**
 * Wraps the app in Framer Motion's MotionConfig with reducedMotion="user".
 * When the OS "reduce motion" preference is on, all Framer Motion animations
 * are automatically disabled - no per-component code needed.
 */
export default function MotionProvider({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      {children}
    </MotionConfig>
  )
}
