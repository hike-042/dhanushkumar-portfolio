'use client'

import { motion } from 'framer-motion'
import { ReactNode } from 'react'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function TextReveal({
  children,
  delay = 0,
  className = '',
  style,
}: {
  children: ReactNode
  delay?: number
  className?: string
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: false, margin: '-40px' }}
      transition={{ duration: 0.65, ease, delay }}
    >
      {children}
    </motion.div>
  )
}
