'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface Burst { x: number; y: number; color: string }

export default function ThemeToggle() {
  const [dark, setDark] = useState(true)
  const [burst, setBurst] = useState<Burst | null>(null)
  const labelRef = useRef<HTMLLabelElement>(null)

  useEffect(() => {
    const saved = localStorage.getItem('arco-theme')
    const isDark = saved !== 'light'
    document.documentElement.classList.toggle('dark', isDark)
    requestAnimationFrame(() => setDark(isDark))
  }, [])

  const handleChange = () => {
    const isDark = !dark
    const oldBg = dark ? '#0a0a0a' : '#f8f7f4'

    if (labelRef.current) {
      const rect = labelRef.current.getBoundingClientRect()
      setBurst({
        x: rect.left + rect.width / 2,
        y: rect.top + rect.height / 2,
        color: oldBg,
      })
    }

    document.documentElement.classList.toggle('dark', isDark)
    document.documentElement.style.backgroundColor = isDark ? '#0a0a0a' : '#f8f7f4'
    document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    setDark(isDark)
    localStorage.setItem('arco-theme', isDark ? 'dark' : 'light')
  }

  return (
    <>
      <div className="day-night-toggle">
        <input
          className="dn-input"
          type="checkbox"
          id="dn-toggle"
          checked={dark}
          onChange={handleChange}
        />
        <label ref={labelRef} className="dn-toggle" htmlFor="dn-toggle">
          <span className="dn-handler">
            <span className="dn-crater dn-crater--1" />
            <span className="dn-crater dn-crater--2" />
            <span className="dn-crater dn-crater--3" />
          </span>
          <span className="dn-star dn-star--1" />
          <span className="dn-star dn-star--2" />
          <span className="dn-star dn-star--3" />
          <span className="dn-star dn-star--4" />
          <span className="dn-star dn-star--5" />
          <span className="dn-star dn-star--6" />
        </label>
      </div>

      <AnimatePresence>
        {burst && (
          <motion.div
            key="theme-burst"
            initial={{ clipPath: `circle(150% at ${burst.x}px ${burst.y}px)` }}
            animate={{ clipPath: `circle(0% at ${burst.x}px ${burst.y}px)` }}
            transition={{ duration: 0.72, ease }}
            onAnimationComplete={() => setBurst(null)}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99985,
              background: burst.color,
              pointerEvents: 'none',
            }}
          />
        )}
      </AnimatePresence>
    </>
  )
}
