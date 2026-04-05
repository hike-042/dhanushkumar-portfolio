'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import ThemeToggle from '@/components/ui/theme-toggle'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > window.innerHeight * 0.65)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      className={scrolled ? 'nav-glass' : ''}
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '20px 32px',
        position: 'fixed',
        width: '100%',
        zIndex: 50,
        transition: 'background 0.3s ease, box-shadow 0.3s ease',
      }}
    >
      {/* Left: name slides in after hero */}
      <div style={{ flex: 1 }}>
        <AnimatePresence>
          {scrolled && (
            <motion.div
              initial={{ opacity: 0, x: -14 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -14 }}
              transition={{ duration: 0.3, ease }}
              style={{ display: 'inline-flex', alignItems: 'center', gap: 6 }}
            >
              <span
                className="font-fraunces"
                style={{
                  fontSize: '.95rem',
                  fontWeight: 400,
                  color: 'var(--text)',
                  letterSpacing: '-.01em',
                }}
              >
                Dhanush
                <span style={{ color: 'var(--accent)', fontStyle: 'italic' }}>.</span>
              </span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Right: theme toggle */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <ThemeToggle />
      </div>
    </div>
  )
}
