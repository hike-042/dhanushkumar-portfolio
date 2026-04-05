'use client'

import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const COMMANDS = [
  { id: 'hero', label: 'Home', icon: 'HM', action: 'scroll', target: '#hero' },
  { id: 'about', label: 'About Me', icon: 'AB', action: 'scroll', target: '#about' },
  { id: 'experience', label: 'Experience', icon: 'EX', action: 'scroll', target: '#experience' },
  { id: 'projects', label: 'Projects', icon: 'PR', action: 'scroll', target: '#projects' },
  { id: 'persona', label: 'The Person', icon: 'PS', action: 'scroll', target: '#persona' },
  { id: 'contact', label: 'Contact', icon: 'CT', action: 'scroll', target: '#contact' },
  { id: 'email', label: 'Copy Email', icon: 'CP', action: 'copy', target: 'official.dhanushkumar.r@gmail.com' },
  { id: 'linkedin', label: 'Open LinkedIn', icon: 'IN', action: 'link', target: 'https://www.linkedin.com/in/dhanush-kumar-97a6b5182/' },
  { id: 'github', label: 'Open GitHub', icon: 'GH', action: 'link', target: 'https://github.com/hike-042' },
  { id: 'theme', label: 'Toggle Theme', icon: 'TH', action: 'theme', target: '' },
] as const

export default function CommandPalette() {
  const [open, setOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [active, setActive] = useState(0)
  const [toast, setToast] = useState('')
  const inputRef = useRef<HTMLInputElement>(null)

  const filtered = COMMANDS.filter(c => c.label.toLowerCase().includes(query.toLowerCase()))

  function run(cmd: (typeof COMMANDS)[number] | undefined) {
    if (!cmd) return
    setOpen(false)
    setQuery('')

    if (cmd.action === 'scroll') {
      document.querySelector(cmd.target)?.scrollIntoView({ behavior: 'smooth' })
    }
    if (cmd.action === 'copy') {
      navigator.clipboard.writeText(cmd.target)
      setToast('Email copied!')
      setTimeout(() => setToast(''), 2200)
    }
    if (cmd.action === 'link') {
      window.open(cmd.target, '_blank', 'noopener,noreferrer')
    }
    if (cmd.action === 'theme') {
      document.documentElement.classList.toggle('dark')
      const isDark = document.documentElement.classList.contains('dark')
      localStorage.setItem('arco-theme', isDark ? 'dark' : 'light')
      document.documentElement.style.backgroundColor = isDark ? '#0a0a0a' : '#f8f7f4'
      document.documentElement.style.colorScheme = isDark ? 'dark' : 'light'
    }
  }

  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setOpen(o => !o)
        setQuery('')
        setActive(0)
      }
      if (e.key === 'Escape') setOpen(false)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 60)
  }, [open])

  useEffect(() => {
    if (!open) return
    function onKey(e: KeyboardEvent) {
      if (e.key === 'ArrowDown') {
        e.preventDefault()
        setActive(a => Math.min(a + 1, filtered.length - 1))
      }
      if (e.key === 'ArrowUp') {
        e.preventDefault()
        setActive(a => Math.max(a - 1, 0))
      }
      if (e.key === 'Enter') {
        e.preventDefault()
        run(filtered[active])
      }
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, active, filtered])

  return (
    <>
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.18 }}
              onClick={() => setOpen(false)}
              style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.55)', backdropFilter: 'blur(6px)', WebkitBackdropFilter: 'blur(6px)', zIndex: 99990 }}
            />

            <motion.div
              key="palette"
              initial={{ opacity: 0, scale: 0.96, y: -12 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -12 }}
              transition={{ duration: 0.22, ease }}
              style={{ position: 'fixed', top: 'clamp(40px, 18%, 160px)', left: '50%', transform: 'translateX(-50%)', width: 'min(560px, 92vw)', background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: 16, boxShadow: '0 24px 80px rgba(0,0,0,0.4)', zIndex: 99999, overflow: 'hidden' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px', borderBottom: '1px solid var(--line)' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0 }}>
                  <circle cx="11" cy="11" r="8" />
                  <path d="m21 21-4.35-4.35" />
                </svg>
                <input ref={inputRef} value={query} onChange={e => { setQuery(e.target.value); setActive(0) }} placeholder="Search sections, actions..." style={{ flex: 1, background: 'transparent', border: 'none', outline: 'none', fontSize: '.95rem', color: 'var(--text)', fontFamily: 'inherit' }} />
                <kbd style={{ fontSize: '.65rem', padding: '2px 7px', borderRadius: 6, border: '1px solid var(--line)', color: 'var(--text-3)', background: 'var(--bg)', fontFamily: 'inherit', flexShrink: 0 }}>
                  ESC
                </kbd>
              </div>

              <div style={{ maxHeight: 'min(360px, calc(100vh - 220px))', overflowY: 'auto', padding: '8px', overscrollBehavior: 'contain' }} onWheel={e => e.stopPropagation()}>
                {filtered.length === 0 ? (
                  <p style={{ textAlign: 'center', color: 'var(--text-3)', fontSize: '.88rem', padding: '24px 0' }}>No results found</p>
                ) : (
                  filtered.map((cmd, i) => (
                    <motion.button
                      key={cmd.id}
                      onClick={() => run(cmd)}
                      onMouseEnter={() => setActive(i)}
                      animate={{ backgroundColor: active === i ? 'rgba(var(--accent-rgb), 0.09)' : 'transparent' }}
                      transition={{ duration: 0.12 }}
                      style={{ width: '100%', display: 'flex', alignItems: 'center', gap: 12, padding: '10px 12px', borderRadius: 10, border: 'none', cursor: 'pointer', textAlign: 'left', fontFamily: 'inherit' }}
                    >
                      <span style={{ fontSize: '.68rem', width: 24, textAlign: 'center', flexShrink: 0, fontWeight: 700 }}>{cmd.icon}</span>
                      <span style={{ fontSize: '.9rem', color: active === i ? 'var(--accent)' : 'var(--text)', fontWeight: active === i ? 500 : 400, transition: 'color 0.12s ease', flex: 1 }}>{cmd.label}</span>
                      {active === i && (
                        <kbd style={{ fontSize: '.62rem', padding: '2px 7px', borderRadius: 6, border: '1px solid rgba(var(--accent-rgb), 0.3)', color: 'var(--accent)', background: 'rgba(var(--accent-rgb), 0.08)', fontFamily: 'inherit' }}>
                          Enter
                        </kbd>
                      )}
                    </motion.button>
                  ))
                )}
              </div>

              <div style={{ borderTop: '1px solid var(--line)', padding: '8px 18px', display: 'flex', alignItems: 'center', gap: 16 }}>
                {[
                  { keys: ['Up', 'Down'], label: 'navigate' },
                  { keys: ['Enter'], label: 'select' },
                  { keys: ['ESC'], label: 'close' },
                ].map(({ keys, label }) => (
                  <span key={label} style={{ display: 'flex', alignItems: 'center', gap: 5 }}>
                    {keys.map(k => (
                      <kbd key={k} style={{ fontSize: '.6rem', padding: '1px 5px', borderRadius: 4, border: '1px solid var(--line)', color: 'var(--text-3)', background: 'var(--bg)', fontFamily: 'inherit' }}>{k}</kbd>
                    ))}
                    <span style={{ fontSize: '.68rem', color: 'var(--text-3)' }}>{label}</span>
                  </span>
                ))}
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {toast && (
          <motion.div key="toast" initial={{ opacity: 0, y: 16, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 10, scale: 0.95 }} transition={{ type: 'spring', stiffness: 300, damping: 26 }} style={{ position: 'fixed', bottom: 32, left: '50%', transform: 'translateX(-50%)', zIndex: 99999, padding: '10px 20px', background: 'var(--bg-card)', border: '1px solid rgba(var(--accent-rgb), 0.35)', borderRadius: 40, boxShadow: '0 8px 32px rgba(0,0,0,0.18)', fontSize: '.82rem', fontWeight: 500, color: 'var(--accent)', whiteSpace: 'nowrap', pointerEvents: 'none' }}>
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        onClick={() => {
          setOpen(true)
          setQuery('')
          setActive(0)
        }}
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2.5, duration: 0.5, ease }}
        whileHover={{ scale: 1.04 }}
        whileTap={{ scale: 0.96 }}
        style={{ position: 'fixed', bottom: 28, right: 28, zIndex: 1000, display: 'flex', alignItems: 'center', gap: 8, padding: '8px 14px', background: 'var(--bg-card)', border: '1px solid var(--line)', borderRadius: 10, boxShadow: '0 4px 20px rgba(0,0,0,0.14)', cursor: 'pointer', fontFamily: 'inherit' }}
      >
        <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="var(--text-3)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <span style={{ fontSize: '.72rem', color: 'var(--text-3)', fontWeight: 400 }}>Search</span>
        <kbd style={{ fontSize: '.62rem', padding: '1px 6px', borderRadius: 5, border: '1px solid var(--line)', color: 'var(--text-3)', background: 'var(--bg)', fontFamily: 'inherit' }}>
          Ctrl+K
        </kbd>
      </motion.button>
    </>
  )
}
