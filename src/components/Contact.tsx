'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import WordReveal from './ui/word-reveal'
import TextReveal from './ui/text-reveal'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]
const EMAIL = 'official.dhanushkumar.r@gmail.com'

const LINKS = [
  {
    key: 'mail',
    href: `mailto:${EMAIL}`,
    label: EMAIL,
    gif: '/icons/mail.gif',
    png: '/icons/mail.png',
  },
  {
    key: 'github',
    href: 'https://github.com/hike-042',
    label: 'github.com/hike-042',
    gif: '/icons/github.gif',
    png: '/icons/github.png',
  },
  {
    key: 'linkedin',
    href: 'https://www.linkedin.com/in/dhanush-kumar-97a6b5182/',
    label: 'linkedin.com/in/dhanush-kumar-97a6b5182',
    gif: '/icons/linkedin.gif',
    png: '/icons/linkedin.png',
  },
]

const linkContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.1 } },
}

const linkItem = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1,   transition: { duration: 0.55, ease } },
}

/* ── Magnetic contact link ── */
function ContactLink({
  link,
  hovered,
  setHovered,
  onMailClick,
}: {
  link: typeof LINKS[0]
  hovered: string | null
  setHovered: (k: string | null) => void
  onMailClick: (e: React.MouseEvent) => void
}) {
  const ref = useRef<HTMLAnchorElement>(null)
  const mx = useMotionValue(0)
  const my = useMotionValue(0)
  const x  = useSpring(mx, { stiffness: 220, damping: 18 })
  const y  = useSpring(my, { stiffness: 220, damping: 18 })

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    mx.set((e.clientX - rect.left - rect.width  / 2) * 0.22)
    my.set((e.clientY - rect.top  - rect.height / 2) * 0.22)
  }

  function onLeave() {
    mx.set(0); my.set(0)
    setHovered(null)
  }

  return (
    <motion.a
      ref={ref}
      variants={linkItem}
      href={link.href}
      target={link.key !== 'mail' ? '_blank' : undefined}
      rel={link.key !== 'mail' ? 'noopener noreferrer' : undefined}
      onClick={link.key === 'mail' ? onMailClick : undefined}
      onMouseMove={onMove}
      onMouseEnter={() => setHovered(link.key)}
      onMouseLeave={onLeave}
      data-cursor={link.key === 'mail' ? 'Copy' : 'Open'}
      className="contact-link"
      style={{
        x, y,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: 16,
        padding: '16px 24px',
        borderRadius: 12,
        border: '1px solid var(--line)',
        background: 'var(--bg-card)',
        color: 'var(--text)',
        fontSize: '.9rem',
        fontWeight: 400,
        textDecoration: 'none',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, minWidth: 0 }}>
        <motion.img
          src={hovered === link.key ? link.gif : link.png}
          alt={link.key}
          animate={hovered === link.key
            ? { scale: [1, 1.22, 0.95, 1.08, 1], rotate: [0, -8, 6, -3, 0] }
            : { scale: 1, rotate: 0 }
          }
          transition={{ duration: 0.45, ease: 'easeOut' }}
          style={{ width: 28, height: 28, objectFit: 'contain', flexShrink: 0 }}
        />
        <span className="contact-link-label">{link.label}</span>
      </div>

      {/* Copy hint - only on email */}
      {link.key === 'mail' && (
        <motion.span
          animate={{ opacity: hovered === 'mail' ? 1 : 0, x: hovered === 'mail' ? 0 : 4 }}
          transition={{ type: 'tween', duration: 0.15 }}
          style={{
            fontSize: '.7rem',
            color: 'var(--accent)',
            fontWeight: 500,
            letterSpacing: '.04em',
            whiteSpace: 'nowrap',
            flexShrink: 0,
          }}
        >
          click to copy
        </motion.span>
      )}
    </motion.a>
  )
}

export default function Contact() {
  const [hovered, setHovered] = useState<string | null>(null)
  const [toast,   setToast]   = useState(false)

  function handleMailClick(e: React.MouseEvent) {
    e.preventDefault()
    navigator.clipboard.writeText(EMAIL).then(() => {
      setToast(true)
      setTimeout(() => setToast(false), 2400)
    })
  }

  return (
    <section id="contact" className="site-section" style={{ textAlign: 'center' }}>
      <div>

        {/* ── HEADING - word reveal ── */}
        <h2
          className="font-fraunces"
          style={{ fontSize: 'clamp(1.6rem, 3vw, 2.2rem)', fontWeight: 400, marginBottom: 12, color: 'var(--text)' }}
        >
          <WordReveal text="Let's Connect" />
        </h2>

        <TextReveal delay={0.2}>
          <p style={{ color: 'var(--text-2)', marginBottom: 40, fontSize: '.95rem' }}>
            Open to opportunities in Talent Acquisition.
          </p>
        </TextReveal>

        {/* ── LINKS - staggered + magnetic ── */}
        <motion.div
          variants={linkContainer}
          initial="hidden"
          whileInView="show"
          viewport={{ once: false, margin: '-40px' }}
          style={{ maxWidth: 520, margin: '0 auto', display: 'flex', flexDirection: 'column', gap: 14 }}
        >
          {LINKS.map(link => (
            <ContactLink
              key={link.key}
              link={link}
              hovered={hovered}
              setHovered={setHovered}
              onMailClick={handleMailClick}
            />
          ))}
        </motion.div>
      </div>

      {/* ── TOAST ── */}
      <AnimatePresence>
        {toast && (
          <motion.div
            key="toast"
            initial={{ opacity: 0, y: 16, scale: 0.95 }}
            animate={{ opacity: 1, y: 0,  scale: 1    }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 26 }}
            style={{
              position: 'fixed',
              bottom: 32,
              left: '50%',
              transform: 'translateX(-50%)',
              zIndex: 9999,
              display: 'flex',
              alignItems: 'center',
              gap: 10,
              padding: '12px 22px',
              background: 'var(--bg-card)',
              border: '1px solid rgba(var(--accent-rgb), 0.35)',
              borderRadius: 40,
              boxShadow: '0 8px 32px rgba(0,0,0,0.18)',
              fontSize: '.82rem',
              fontWeight: 500,
              color: 'var(--text)',
              whiteSpace: 'nowrap',
              pointerEvents: 'none',
            }}
          >
            {/* Green check */}
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: 'spring', stiffness: 400, damping: 18, delay: 0.08 }}
              style={{
                width: 20, height: 20, borderRadius: '50%',
                background: 'rgba(var(--accent-rgb), 0.18)',
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                flexShrink: 0,
              }}
            >
              <svg width="11" height="9" viewBox="0 0 11 9" fill="none">
                <path d="M1 4L4 7.5L10 1" stroke="var(--accent)" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </motion.div>
            Email copied to clipboard
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  )
}
