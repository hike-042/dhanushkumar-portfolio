'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const SECTIONS = [
  { id: 'hero',       label: 'Home'       },
  { id: 'about',      label: 'About'      },
  { id: 'experience', label: 'Experience' },
  { id: 'projects',   label: 'Projects'   },
  { id: 'persona',    label: 'Persona'    },
  { id: 'contact',    label: 'Contact'    },
]

export default function SideNav() {
  const [active,  setActive]  = useState('hero')
  const [hovered, setHovered] = useState<string | null>(null)

  useEffect(() => {
    const observers: IntersectionObserver[] = []

    SECTIONS.forEach(({ id }) => {
      const el = document.getElementById(id)
      if (!el) return

      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id) },
        { rootMargin: '-35% 0px -35% 0px', threshold: 0 }
      )
      obs.observe(el)
      observers.push(obs)
    })

    return () => observers.forEach(o => o.disconnect())
  }, [])

  return (
    <div
      className="side-nav"
      style={{
        position: 'fixed',
        right: 22,
        top: '50%',
        transform: 'translateY(-50%)',
        zIndex: 1000,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: 18,
      }}
    >
      {SECTIONS.map(({ id, label }) => {
        const isActive  = active  === id
        const isHovered = hovered === id

        return (
          <div
            key={id}
            style={{ position: 'relative', display: 'flex', alignItems: 'center' }}
            onMouseEnter={() => setHovered(id)}
            onMouseLeave={() => setHovered(null)}
          >
            {/* Tooltip label - slides in from right */}
            <AnimatePresence>
              {isHovered && (
                <motion.span
                  initial={{ opacity: 0, x: 8 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 8 }}
                  transition={{ type: 'tween', duration: 0.14 }}
                  style={{
                    position: 'absolute',
                    right: 20,
                    whiteSpace: 'nowrap',
                    fontSize: '.68rem',
                    fontWeight: 500,
                    letterSpacing: '.04em',
                    color: 'var(--text-2)',
                    background: 'var(--bg-card)',
                    border: '1px solid var(--line)',
                    padding: '3px 10px',
                    borderRadius: 20,
                    pointerEvents: 'none',
                    boxShadow: '0 2px 10px rgba(0,0,0,0.12)',
                  }}
                >
                  {label}
                </motion.span>
              )}
            </AnimatePresence>

            {/* Sliding pill indicator - shared layoutId animates between dots */}
            {isActive && (
              <motion.div
                layoutId="sidenav-pill"
                transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                style={{
                  position: 'absolute',
                  right: -6,
                  width: 2,
                  height: 18,
                  borderRadius: 99,
                  background: 'var(--accent)',
                  pointerEvents: 'none',
                }}
              />
            )}

            {/* Dot */}
            <motion.a
              href={`#${id}`}
              aria-label={label}
              animate={{
                scale:   isActive ? 1.4  : isHovered ? 1.2 : 1,
                opacity: isActive ? 1    : isHovered ? 0.65 : 0.3,
              }}
              transition={{ type: 'spring', stiffness: 320, damping: 24 }}
              style={{
                width: 7,
                height: 7,
                borderRadius: '50%',
                background: isActive ? 'var(--accent)' : 'var(--text-3)',
                display: 'block',
                textDecoration: 'none',
                flexShrink: 0,
                willChange: 'transform, opacity',
                transition: 'background 0.2s ease',
              }}
            />
          </div>
        )
      })}
    </div>
  )
}
