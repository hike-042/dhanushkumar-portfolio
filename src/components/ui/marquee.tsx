'use client'

import { useState } from 'react'

const ITEMS = [
  'Talent Acquisition', 'Technical Recruiting', 'Campus Hiring', 'JD Analysis',
  'Stakeholder Management', 'Employer Branding', 'Process Design', 'Team Leadership',
  'Public Speaking', 'Corporate Relations', 'Team Leadership',
  'Quality Management', 'Python', 'NLP', 'Machine Learning',
]

const SEP = '·'

// Tripled so the loop is seamless at -33.333%
const row1 = [...ITEMS, ...ITEMS, ...ITEMS]
const row2 = [...[...ITEMS].reverse(), ...[...ITEMS].reverse(), ...[...ITEMS].reverse()]

export default function Marquee() {
  const [paused, setPaused] = useState(false)

  return (
    <div
      style={{
        overflow: 'hidden',
        padding: '36px 0',
        borderTop: '1px solid var(--line)',
        borderBottom: '1px solid var(--line)',
        background: 'var(--bg)',
        userSelect: 'none',
      }}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Row 1 - scrolls left continuously */}
      <div
        style={{
          display: 'flex',
          gap: 28,
          width: 'max-content',
          marginBottom: 14,
          animation: 'marquee-left 38s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {row1.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 28, whiteSpace: 'nowrap' }}>
            <span style={{ fontSize: '.9rem', fontWeight: 400, color: 'var(--text-2)', letterSpacing: '.02em' }}>
              {item}
            </span>
            <span style={{ color: 'var(--accent)', fontSize: '.7rem' }}>{SEP}</span>
          </span>
        ))}
      </div>

      {/* Row 2 - scrolls right continuously */}
      <div
        style={{
          display: 'flex',
          gap: 28,
          width: 'max-content',
          animation: 'marquee-right 46s linear infinite',
          animationPlayState: paused ? 'paused' : 'running',
          willChange: 'transform',
        }}
      >
        {row2.map((item, i) => (
          <span key={i} style={{ display: 'flex', alignItems: 'center', gap: 28, whiteSpace: 'nowrap' }}>
            <span style={{
              fontSize: '.9rem',
              fontWeight: i % 4 === 0 ? 500 : 300,
              color: i % 4 === 0 ? 'var(--accent)' : 'var(--text-3)',
              letterSpacing: '.02em',
            }}>
              {item}
            </span>
            <span style={{ color: 'var(--line)', fontSize: '.7rem' }}>{SEP}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
