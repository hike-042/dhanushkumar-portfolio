'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion'
import WordReveal from './ui/word-reveal'
import SectionLabel from './ui/section-label'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

/* ── Company logo colours ─────────────────────────────────── */
const LOGO_COLORS: Record<string, { bg: string; fg: string }> = {
  '4Good.AI':       { bg: '#1c6344', fg: '#fff' },
  'PES University': { bg: '#1e3a5f', fg: '#fff' },
  'NSS':            { bg: '#7c3d14', fg: '#fff' },
  "Reader's Club":  { bg: '#3d2b5e', fg: '#fff' },
}

function CompanyLogo({ company }: { company: string }) {
  const colors = LOGO_COLORS[company] ?? { bg: '#2a2a2a', fg: '#fff' }
  const initials = company
    .split(/[\s.]+/)
    .filter(Boolean)
    .slice(0, 2)
    .map(w => w[0].toUpperCase())
    .join('')

  return (
    <div style={{
      width: 34, height: 34, borderRadius: 8, flexShrink: 0,
      background: colors.bg,
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      fontSize: '.65rem', fontWeight: 700, color: colors.fg,
      letterSpacing: '.03em',
      boxShadow: '0 1px 4px rgba(0,0,0,0.18)',
    }}>
      {initials}
    </div>
  )
}

const data = [
  {
    role: 'Project Management Intern',
    company: '4Good.AI',
    duration: 'Feb 2026 – Present',
    tag: 'Current',
    details: [
      'Managed internal workflows and coordination',
      'Worked on structured documentation and process clarity',
      'Supported execution of operational tasks',
    ],
  },
  {
    role: 'Corporate Relations Associate',
    company: 'PES University',
    duration: 'Nov 2025 – Feb 2026',
    tag: 'Placement Cell',
    details: [
      'Reached out to companies for placement opportunities',
      'Coordinated communication between recruiters and students',
      'Improved placement outreach efficiency',
    ],
  },
  {
    role: 'Teaching Assistant – Python',
    company: 'PES University',
    duration: 'Aug 2025 – Nov 2025',
    tag: 'Academia',
    details: [
      'Conducted sessions on variables, loops, and conditionals',
      'Mentored students and supported learning',
      'Evaluated code and provided feedback',
    ],
  },
  {
    role: 'CXO Talks – Core Team',
    company: 'PES University',
    duration: 'Oct 2024 – Nov 2025',
    tag: 'Events',
    details: [
      'Managed attendance tracking and coordination',
      'Researched speakers and created intro content',
      'Handled logistics and event execution',
    ],
  },
  {
    role: 'Summit Volunteer - Multi-Domain',
    company: 'PES University',
    duration: '2024 – 2025',
    tag: 'Volunteering',
    details: [
      'Volunteered at HR Summit, Climate Summit, Operations Summit, and Marketing Summit',
      'Worked across domains: logistics, coordination, content support, and attendee management',
      'Gained cross-functional exposure by switching roles across different summit verticals',
    ],
  },
  {
    role: 'Executive Committee Member',
    company: 'NSS',
    institution: 'Mepco Schlenk Engineering College',
    duration: '2023 – 2024',
    tag: 'Community',
    details: [
      'Organized community service initiatives',
      'Coordinated participation and events',
    ],
  },
  {
    role: 'Joint Treasurer',
    company: "Reader's Club",
    institution: 'Mepco Schlenk Engineering College',
    duration: '2023 – 2024',
    tag: 'Leadership',
    details: [
      'Managed finances and event logistics',
      'Organized literary activities',
    ],
  },
]

export default function Experience() {
  const [open, setOpen] = useState<number | null>(null)

  const sectionRef = useRef<HTMLElement>(null)
  const timelineRef = useRef<HTMLDivElement>(null)

  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.85', 'end 0.3'],
  })
  const lineScaleY = useSpring(scrollYProgress, { stiffness: 55, damping: 22 })

  return (
    <section ref={sectionRef} id="experience" className="site-section">

      <SectionLabel>Experience</SectionLabel>

      <h2
        className="font-fraunces"
        style={{
          fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 400,
          lineHeight: 1.1, letterSpacing: '-.02em',
          color: 'var(--text)', marginBottom: 48,
        }}
      >
        <WordReveal text={"Where I've made\nan impact."} delay={0.07} />
      </h2>

      {/* ── TIMELINE ── */}
      <div ref={timelineRef} style={{ position: 'relative' }}>

        {/* Scroll-driven fill line */}
        <div className="timeline-line" style={{
          position: 'absolute',
          left: -16,
          top: 0, bottom: 0,
          width: 1.5,
          background: 'var(--line)',
          overflow: 'hidden',
        }}>
          <motion.div style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: 'var(--accent)',
            scaleY: lineScaleY,
            transformOrigin: 'top',
          }} />
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 0 }}>
          {data.map((item, i) => {
            const isCurrent = item.tag === 'Current'
            const isOpen    = open === i

            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false, margin: '-20px' }}
                transition={{ duration: 0.52, delay: i * 0.07, ease }}
                style={{ position: 'relative' }}
              >
                {/* ── Timeline node dot ── */}
                <motion.div
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  viewport={{ once: false }}
                  transition={{ duration: 0.35, delay: i * 0.07 + 0.2, ease }}
                  className="timeline-dot"
                  style={{
                    position: 'absolute',
                    left: -20,
                    top: 32,
                    width: 9,
                    height: 9,
                    borderRadius: '50%',
                    background: isCurrent ? 'var(--accent)' : 'var(--bg)',
                    border: `2px solid ${isCurrent ? 'var(--accent)' : 'var(--text-3)'}`,
                    zIndex: 2,
                    boxShadow: isCurrent ? '0 0 0 3px rgba(var(--accent-rgb), 0.22)' : 'none',
                  }}
                />

                {/* Divider */}
                <div style={{ height: 1, background: 'var(--line)' }} />

                <div
                  onClick={() => setOpen(isOpen ? null : i)}
                  style={{
                    cursor: 'pointer',
                    padding: '24px 0',
                    borderRadius: 8,
                    /* subtle green tint for current row */
                    background: isCurrent
                      ? 'rgba(var(--accent-rgb), 0.04)'
                      : 'transparent',
                    transition: 'background 0.2s ease',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 16 }}>

                    {/* Left: logo + role info */}
                    <div style={{ display: 'flex', alignItems: 'flex-start', gap: 14, flex: 1 }}>

                      {/* Company logo */}
                      <CompanyLogo company={item.company} />

                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 6, flexWrap: 'wrap' }}>
                          <h3 style={{
                            fontSize: '1rem', fontWeight: 500,
                            color: 'var(--text)', lineHeight: 1.3,
                          }}>
                            {item.role}
                          </h3>

                          {/* Tag chip */}
                          <span style={{
                            fontSize: '.68rem', fontWeight: 500, letterSpacing: '.05em',
                            padding: '2px 8px', borderRadius: 20,
                            background: 'rgba(var(--accent-rgb), 0.12)',
                            color: 'var(--accent)',
                          }}>
                            {item.tag}
                          </span>

                          {/* Currently here pulse */}
                          {isCurrent && (
                            <motion.div
                              animate={{ opacity: [1, 0.4, 1] }}
                              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
                              style={{ display: 'flex', alignItems: 'center', gap: 5 }}
                            >
                              <div style={{
                                width: 6, height: 6, borderRadius: '50%',
                                background: '#22c55e',
                                boxShadow: '0 0 0 2px rgba(34,197,94,.3)',
                              }} />
                              <span style={{
                                fontSize: '.65rem', fontWeight: 500,
                                color: '#22c55e', letterSpacing: '.04em',
                              }}>
                                Currently here
                              </span>
                            </motion.div>
                          )}
                        </div>

                        <p style={{ fontSize: '.85rem', color: 'var(--text-2)', fontWeight: 300 }}>
                          {item.company}
                          {item.institution && (
                            <>
                              <span style={{ margin: '0 8px', color: 'var(--text-3)' }}>·</span>
                              {item.institution}
                            </>
                          )}
                          <span style={{ margin: '0 8px', color: 'var(--text-3)' }}>·</span>
                          {item.duration}
                        </p>
                      </div>
                    </div>

                    {/* Right: toggle */}
                    <motion.div
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.25, ease }}
                      style={{
                        width: 28, height: 28, borderRadius: '50%', flexShrink: 0,
                        border: `1px solid ${isOpen ? 'var(--accent)' : 'var(--line)'}`,
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        color: 'var(--accent)', fontSize: '1.1rem', fontWeight: 300,
                        background: isOpen ? 'rgba(var(--accent-rgb), 0.10)' : 'transparent',
                        transition: 'border-color 0.2s ease, background 0.2s ease',
                      }}
                    >
                      +
                    </motion.div>

                  </div>

                  {/* Expanded details */}
                  <AnimatePresence>
                    {isOpen && (
                      <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        transition={{ duration: 0.28, ease }}
                        style={{ overflow: 'hidden' }}
                      >
                        <div style={{
                          marginTop: 16, paddingTop: 16,
                          borderTop: '1px solid var(--line)',
                          display: 'flex', flexDirection: 'column', gap: 8,
                          paddingLeft: 48,
                        }}>
                          {item.details.map((d, idx) => (
                            <motion.div
                              key={idx}
                              initial={{ opacity: 0, x: -10 }}
                              animate={{ opacity: 1, x: 0 }}
                              transition={{ duration: 0.3, delay: idx * 0.06, ease }}
                              style={{ display: 'flex', gap: 12, alignItems: 'flex-start' }}
                            >
                              <span style={{
                                width: 4, height: 4, borderRadius: '50%', marginTop: 7,
                                background: 'var(--accent)', flexShrink: 0,
                              }} />
                              <p style={{ fontSize: '.88rem', color: 'var(--text-2)', fontWeight: 300, lineHeight: 1.6 }}>
                                {d}
                              </p>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            )
          })}

          <div style={{ height: 1, background: 'var(--line)' }} />
        </div>
      </div>

    </section>
  )
}
