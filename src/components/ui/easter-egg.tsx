'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const KONAMI = [
  'ArrowUp','ArrowUp','ArrowDown','ArrowDown',
  'ArrowLeft','ArrowRight','ArrowLeft','ArrowRight',
  'b','a',
]

const PROFILE = [
  { key: 'name',        value: '"Dhanush Kumar R  (aka Arco)"'          },
  { key: 'type',        value: '"Rare hybrid - CSE brain, HR heart"'    },
  { key: 'superpower',  value: '"Understands both JD and JVM"'           },
  { key: 'weakness',    value: '"Will redesign your entire hiring funnel"' },
  { key: 'available',   value: '"2026 - and worth the wait"'             },
  { key: 'secret',      value: '"Reads resumes faster than grep"'        },
  { key: 'warning',     value: '"May ask better questions than you"'     },
]

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

export default function EasterEgg() {
  const [open,  setOpen]  = useState(false)
  const [lines, setLines] = useState(0)

  // Konami code listener
  useEffect(() => {
    let seq: string[] = []

    function onKey(e: KeyboardEvent) {
      seq = [...seq, e.key].slice(-KONAMI.length)
      if (seq.join(',') === KONAMI.join(',')) {
        setOpen(true)
        setLines(0)
        seq = []
      }
    }

    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  // Stagger JSON lines when modal opens
  useEffect(() => {
    if (!open) return
    setLines(0)
    const total = PROFILE.length + 2   // 2 = '{' line + '}' line
    const timer = setInterval(() => {
      setLines(l => {
        if (l >= total) { clearInterval(timer); return l }
        return l + 1
      })
    }, 110)
    return () => clearInterval(timer)
  }, [open])

  function close() { setOpen(false) }

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="egg-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={close}
            style={{
              position: 'fixed', inset: 0,
              background: 'rgba(0,0,0,0.65)',
              backdropFilter: 'blur(5px)',
              WebkitBackdropFilter: 'blur(5px)',
              zIndex: 99990,
            }}
          />

          {/* Terminal window */}
          <motion.div
            key="egg-modal"
            initial={{ opacity: 0, scale: 0.9, y: 24 }}
            animate={{ opacity: 1, scale: 1,   y: 0  }}
            exit={{   opacity: 0, scale: 0.9, y: 24  }}
            transition={{ type: 'spring', stiffness: 280, damping: 26 }}
            style={{
              position: 'fixed',
              top: '50%', left: '50%',
              transform: 'translate(-50%, -50%)',
              width: 'min(540px, 92vw)',
              background: '#0d1117',
              border: '1px solid #30363d',
              borderRadius: 12,
              zIndex: 99999,
              fontFamily: '"JetBrains Mono", "Fira Code", "Courier New", monospace',
              overflow: 'hidden',
              boxShadow: '0 32px 100px rgba(0,0,0,0.7)',
            }}
          >
            {/* Title bar */}
            <div style={{
              display: 'flex', alignItems: 'center', gap: 8,
              padding: '11px 16px',
              background: '#161b22',
              borderBottom: '1px solid #30363d',
            }}>
              <button
                onClick={close}
                style={{
                  width: 12, height: 12, borderRadius: '50%',
                  background: '#ff5f57', border: 'none', cursor: 'pointer', padding: 0,
                }}
              />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#febc2e' }} />
              <div style={{ width: 12, height: 12, borderRadius: '50%', background: '#28c840' }} />
              <span style={{ marginLeft: 10, fontSize: '.72rem', color: '#8b949e', userSelect: 'none' }}>
                candidate_profile.json - arco-secret
              </span>
            </div>

            {/* Body */}
            <div style={{ padding: '20px 24px 24px', minHeight: 240 }}>

              {/* Command line */}
              {lines >= 1 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ fontSize: '.8rem', color: '#8b949e', marginBottom: 14, userSelect: 'none' }}
                >
                  <span style={{ color: '#58a6ff' }}>arco@portfolio</span>
                  <span style={{ color: '#8b949e' }}>:</span>
                  <span style={{ color: '#3fb950' }}>~</span>
                  <span style={{ color: '#8b949e' }}>$ </span>
                  cat candidate_profile.json
                </motion.div>
              )}

              {/* JSON output */}
              {lines >= 2 && (
                <div style={{ fontSize: '.82rem', lineHeight: 2, color: '#e6edf3' }}>
                  <div><span style={{ color: '#f85149' }}>{'{'}</span></div>

                  {PROFILE.slice(0, Math.max(0, lines - 2)).map(({ key, value }, i) => (
                    <motion.div
                      key={key}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.2 }}
                      style={{ paddingLeft: 20 }}
                    >
                      <span style={{ color: '#79c0ff' }}>"{key}"</span>
                      <span style={{ color: '#8b949e' }}>: </span>
                      <span style={{ color: '#a5d6ff' }}>{value}</span>
                      {i < PROFILE.length - 1 && (
                        <span style={{ color: '#8b949e' }}>,</span>
                      )}
                    </motion.div>
                  ))}

                  {lines >= PROFILE.length + 2 && (
                    <div><span style={{ color: '#f85149' }}>{'}'}</span></div>
                  )}
                </div>
              )}

              {/* Sign-off */}
              {lines >= PROFILE.length + 2 && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.25, ease }}
                  style={{
                    marginTop: 18, paddingTop: 16,
                    borderTop: '1px solid #30363d',
                    display: 'flex', alignItems: 'center', gap: 10,
                  }}
                >
                  <span style={{ fontSize: '.75rem', color: '#3fb950' }}>
                    ✓
                  </span>
                  <span style={{ fontSize: '.75rem', color: '#8b949e' }}>
                    Easter egg found. Arco approves of your curiosity.
                  </span>
                </motion.div>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  )
}
