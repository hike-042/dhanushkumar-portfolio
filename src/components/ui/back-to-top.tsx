'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)
  const { scrollYProgress } = useScroll()

  // conic-gradient fill % driven by scroll position
  const [fill, setFill] = useState(0)

  useEffect(() => {
    const unsub = scrollYProgress.on('change', v => {
      setFill(Math.round(v * 100))
      setVisible(v > 0.35)
    })
    return unsub
  }, [scrollYProgress])

  function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const circumference = 2 * Math.PI * 20   // r=20
  const dashOffset    = circumference * (1 - fill / 100)

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="back-to-top"
          data-cursor="Top"
          onClick={scrollToTop}
          initial={{ opacity: 0, scale: 0.7, y: 12 }}
          animate={{ opacity: 1, scale: 1,   y: 0  }}
          exit={{    opacity: 0, scale: 0.7, y: 12  }}
          transition={{ type: 'spring', stiffness: 300, damping: 24 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.93 }}
          aria-label="Back to top"
          style={{
            position: 'fixed',
            bottom: 84,       // sits above the ⌘K trigger
            right: 28,
            width: 48,
            height: 48,
            borderRadius: '50%',
            background: 'var(--bg-card)',
            border: '1px solid var(--line)',
            boxShadow: '0 4px 20px rgba(0,0,0,0.14)',
            cursor: 'pointer',
            zIndex: 1000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 0,
            fontFamily: 'inherit',
          }}
        >
          {/* Scroll-fill ring */}
          <svg
            width="48" height="48"
            viewBox="0 0 48 48"
            style={{ position: 'absolute', inset: 0, transform: 'rotate(-90deg)' }}
          >
            {/* Track */}
            <circle
              cx="24" cy="24" r="20"
              fill="none"
              stroke="var(--line)"
              strokeWidth="2"
            />
            {/* Fill */}
            <circle
              cx="24" cy="24" r="20"
              fill="none"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={circumference}
              strokeDashoffset={dashOffset}
              style={{ transition: 'stroke-dashoffset 0.15s ease' }}
            />
          </svg>

          {/* Arrow icon */}
          <svg
            width="14" height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="var(--accent)"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{ position: 'relative', zIndex: 1 }}
          >
            <path d="M12 19V5M5 12l7-7 7 7" />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  )
}
