'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

/*
  ── SETUP ────────────────────────────────────────────────────────
  Place your resume as a JPG/PNG at:  public/resume-preview.jpg
  Export it from Canva / Google Docs / Word as high-res image.

  BLUR_REGIONS: adjust top/height (% of image) to cover your
  phone number and address rows in the resume header.
  ─────────────────────────────────────────────────────────────── */
const REDACT_TOP    = '6.8%'
const REDACT_HEIGHT = '2.8%'

export default function ResumeModal() {
  const [open, setOpen] = useState(false)

  return (
    <>
      {/* ── TRIGGER BUTTON ── */}
      <motion.button
        onClick={() => setOpen(true)}
        whileHover={{ y: -1 }}
        whileTap={{ scale: 0.97 }}
        transition={{ duration: 0.18 }}
        style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: 7,
          padding: '14px 24px',
          border: '1.5px solid var(--line)',
          borderRadius: 8,
          fontSize: '.95rem',
          fontWeight: 400,
          color: 'var(--text-2)',
          background: 'transparent',
          cursor: 'pointer',
          fontFamily: 'inherit',
        }}
      >
        {/* Document icon */}
        <svg width="14" height="16" viewBox="0 0 14 16" fill="none" style={{ flexShrink: 0 }}>
          <rect x="1" y="1" width="10" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.4"/>
          <path d="M3.5 5.5h5M3.5 8h5M3.5 10.5h3" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
        </svg>
        Preview Resume
      </motion.button>

      {/* ── MODAL ── */}
      <AnimatePresence>
        {open && (
          <>
            {/* Backdrop */}
            <motion.div
              key="resume-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setOpen(false)}
              style={{
                position: 'fixed',
                inset: 0,
                background: 'rgba(0,0,0,0.72)',
                zIndex: 10000,
                backdropFilter: 'blur(6px)',
                WebkitBackdropFilter: 'blur(6px)',
              }}
            />

            {/* Panel */}
            <motion.div
              key="resume-panel"
              initial={{ opacity: 0, y: 36, scale: 0.97 }}
              animate={{ opacity: 1, y: 0,  scale: 1    }}
              exit={{   opacity: 0, y: 20,  scale: 0.97 }}
              transition={{ duration: 0.38, ease }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                zIndex: 10001,
                width: 'min(640px, 92vw)',
                maxHeight: '90vh',
                overflowY: 'auto',
                background: 'var(--bg-card)',
                borderRadius: 16,
                border: '1px solid var(--line)',
                boxShadow: '0 32px 90px rgba(0,0,0,0.45)',
                display: 'flex',
                flexDirection: 'column',
              }}
            >

              {/* ── HEADER ── */}
              <div style={{
                padding: '18px 22px',
                borderBottom: '1px solid var(--line)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'flex-start',
                flexShrink: 0,
              }}>
                <div>
                  <p style={{
                    fontSize: '.68rem', fontWeight: 500, letterSpacing: '.14em',
                    textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 4,
                  }}>
                    Resume Preview
                  </p>
                  <p style={{ fontSize: '.8rem', color: 'var(--text-3)', fontWeight: 300, lineHeight: 1.5 }}>
                    Concise overview - full details shared on request.
                  </p>
                </div>

                {/* Close */}
                <motion.button
                  onClick={() => setOpen(false)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  style={{
                    width: 30, height: 30, borderRadius: '50%',
                    border: '1px solid var(--line)',
                    background: 'transparent',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    cursor: 'pointer', color: 'var(--text-2)', fontSize: '1rem',
                    flexShrink: 0, marginLeft: 12,
                    fontFamily: 'inherit',
                  }}
                >
                  ×
                </motion.button>
              </div>

              {/* ── RESUME IMAGE + BLUR OVERLAY ── */}
              <div style={{ padding: '16px', flex: 1 }}>
                <div style={{ position: 'relative', borderRadius: 8, overflow: 'hidden', lineHeight: 0 }}>

                  {/* Disable right-click to prevent easy image saving */}
                  <img
                    src="/resume-preview.jpg"
                    alt="Dhanush Kumar R - Resume Preview"
                    onContextMenu={e => e.preventDefault()}
                    draggable={false}
                    style={{ width: '100%', display: 'block', borderRadius: 8, userSelect: 'none' }}
                  />

                  {/* ── REDACTION BAR over contact line ── */}
                  <div style={{
                    position: 'absolute',
                    left: 0, right: 0,
                    top: REDACT_TOP,
                    height: REDACT_HEIGHT,
                    background: '#1a1a1a',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: 6,
                  }}>
                    <svg width="10" height="12" viewBox="0 0 10 12" fill="none" style={{ flexShrink: 0 }}>
                      <rect x="1" y="5" width="8" height="7" rx="1.2" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2"/>
                      <path d="M3 5V3.5a2 2 0 0 1 4 0V5" stroke="rgba(255,255,255,0.45)" strokeWidth="1.2" strokeLinecap="round"/>
                    </svg>
                    <span style={{ fontSize: '.6rem', color: 'rgba(255,255,255,0.45)', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase' }}>
                      Contact details protected
                    </span>
                  </div>
                </div>
              </div>

              {/* ── FOOTER ── */}
              <div style={{
                padding: '14px 22px',
                borderTop: '1px solid var(--line)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: 12,
                flexShrink: 0,
                flexWrap: 'wrap',
              }}>
                <p style={{ fontSize: '.78rem', color: 'var(--text-3)', fontWeight: 300 }}>
                  official.dhanush***@gmail.com
                </p>
                <motion.a
                  href="mailto:official.dhanushkumar.r@gmail.com?subject=Resume Request - Dhanush Kumar R"
                  whileHover={{ y: -1, opacity: 0.88 }}
                  transition={{ duration: 0.15 }}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 7,
                    padding: '10px 20px',
                    background: 'var(--accent)',
                    color: '#fff',
                    borderRadius: 7,
                    fontSize: '.82rem',
                    fontWeight: 500,
                    textDecoration: 'none',
                    letterSpacing: '.02em',
                  }}
                >
                  Request Full Resume
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path d="M2 6h8M7 3l3 3-3 3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </motion.a>
              </div>

            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
