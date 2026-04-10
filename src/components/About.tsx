'use client'

import { motion } from 'framer-motion'
import SectionWrapper from './ui/section-wrapper'
import TextReveal from './ui/text-reveal'
import SectionLabel from './ui/section-label'
import CountUp from './ui/count-up'
import TextScramble from './ui/text-scramble'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const PILLARS = [
  { icon: '🤝', name: 'Relationship Builder', desc: 'Builds genuine trust with candidates and hiring managers alike' },
  { icon: '💻', name: 'Tech-Literate', desc: 'Understands JDs, tech stacks, and what engineering teams actually need' },
  { icon: '🎤', name: 'Communicator', desc: 'Public speaker, confident in rooms from campus to boardroom' },
  { icon: '⚙️', name: 'Process-Driven', desc: 'Brings structure: SOPs, tracking, quality management thinking' },
]

const SKILLS = [
  {
    group: 'Talent & HR',
    items: [
      { name: 'Talent Acquisition', level: 88 },
      { name: 'Campus Recruitment', level: 82 },
      { name: 'JD Analysis', level: 92 },
      { name: 'Boolean Search', level: 78 },
    ],
  },
  {
    group: 'Operations',
    items: [
      { name: 'Quality Management (ISO)', level: 75 },
      { name: 'Stakeholder Management', level: 80 },
      { name: 'Process Design', level: 72 },
    ],
  },
  {
    group: 'Communication',
    items: [
      { name: 'Public Speaking', level: 88 },
      { name: 'Corporate Relations', level: 85 },
      { name: 'Team Leadership', level: 80 },
    ],
  },
]

const pillarContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.1 } },
}

const pillarItem = {
  hidden: { opacity: 0, y: 24, scale: 0.95 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } },
}

const skillContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
}

const skillItem = {
  hidden: { opacity: 0, x: -16 },
  show: { opacity: 1, x: 0, transition: { duration: 0.5, ease } },
}

export default function About() {
  return (
    <SectionWrapper id="about">
      <SectionLabel>About</SectionLabel>

      <h2
        className="font-fraunces"
        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.02em', marginBottom: 28 }}
      >
        <TextScramble text="The recruiter who speaks engineering." triggerOnHover delay={200} duration={1000} />
      </h2>

      <TextReveal delay={0.12}>
        <div
          style={{
            padding: '20px 24px',
            background: 'rgba(var(--accent-rgb), 0.07)',
            border: '1px solid rgba(var(--accent-rgb), 0.20)',
            borderRadius: 10,
            marginBottom: 28,
            maxWidth: 600,
          }}
        >
          <p style={{ fontSize: '.88rem', fontWeight: 400, color: 'var(--text)', lineHeight: 1.75 }}>
            <strong style={{ color: 'var(--accent)' }}>The rare combination:</strong>{' '}
            Most HR professionals can&apos;t read a system design document. Most engineers don&apos;t want to write JDs. I sit in between, with a BE in Computer Science and an MBA in HR, so I understand both worlds deeply. This makes me significantly more effective at sourcing, screening, and closing technical talent.
          </p>
        </div>
      </TextReveal>

      <TextReveal delay={0.16}>
        <p style={{ fontSize: '1rem', fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.8, maxWidth: 560, marginBottom: 40 }}>
          Currently completing a mandatory internship at{' '}
          <a href="https://4gd.ai" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', fontWeight: 500, textDecoration: 'underline', textDecorationColor: 'var(--line)', textUnderlineOffset: '3px' }}>
            4Good.AI
          </a>{' '}
          as Quality &amp; Inventory Coordinator, where I&apos;m building operational systems from scratch. Previously worked in corporate relations and placement at{' '}
          <a href="https://pes.edu" target="_blank" rel="noopener noreferrer" style={{ color: 'var(--text)', fontWeight: 500, textDecoration: 'underline', textDecorationColor: 'var(--line)', textUnderlineOffset: '3px' }}>
            PES University
          </a>
          &apos;s placement cell, managing recruiter relationships end-to-end.
        </p>
      </TextReveal>

      <motion.div
        variants={pillarContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px' }}
        className="pillar-grid-responsive"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))',
          gap: 14,
          marginBottom: 48,
        }}
      >
        {PILLARS.map(p => (
          <motion.div
            key={p.name}
            variants={pillarItem}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            className="pillar-card"
            style={{
              padding: '18px 20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--line)',
              borderRadius: 10,
            }}
          >
            <div style={{ fontSize: '1.1rem', marginBottom: 8, fontWeight: 600 }}>{p.icon}</div>
            <div style={{ fontSize: '.78rem', fontWeight: 500, letterSpacing: '.04em', textTransform: 'uppercase', color: 'var(--text)', marginBottom: 4 }}>
              {p.name}
            </div>
            <div style={{ fontSize: '.8rem', color: 'var(--text-2)', fontWeight: 300, lineHeight: 1.5 }}>
              {p.desc}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <SectionLabel style={{ marginBottom: 16 }}>Core Skills</SectionLabel>

      <motion.div
        variants={skillContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-40px' }}
        className="skills-grid-responsive"
        style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14 }}
      >
        {SKILLS.map(s => (
          <motion.div
            key={s.group}
            variants={skillItem}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--line)',
              borderRadius: 10,
              padding: '20px 22px',
            }}
          >
            <div style={{ fontSize: '.7rem', fontWeight: 500, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--accent)', marginBottom: 14 }}>
              {s.group}
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {s.items.map((item, idx) => (
                <div key={item.name}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 5 }}>
                    <span style={{ fontSize: '.84rem', fontWeight: 300, color: 'var(--text-2)' }}>
                      {item.name}
                    </span>
                    <span style={{ fontSize: '.68rem', fontWeight: 500, color: 'var(--text-3)', fontVariantNumeric: 'tabular-nums' }}>
                      <CountUp target={item.level} duration={900} />%
                    </span>
                  </div>
                  <div style={{ height: 3, borderRadius: 99, background: 'var(--line)', overflow: 'hidden' }}>
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${item.level}%` }}
                      viewport={{ once: false, margin: '-20px' }}
                      transition={{ duration: 0.9, delay: idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        height: '100%',
                        borderRadius: 99,
                        background: `linear-gradient(90deg, var(--accent), var(--accent-2))`,
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <SectionLabel style={{ marginTop: 48, marginBottom: 16 }}>Education</SectionLabel>
      <motion.div
        variants={pillarContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px' }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 48 }}
        className="edu-grid-responsive"
      >
        {[
          {
            degree: 'MBA - Human Resources',
            school: 'PES University, Bengaluru',
            year: '2024 - 2026',
            badge: 'Pursuing',
            icon: 'MBA',
            highlights: ['Talent Acquisition', 'OB & HR Analytics', 'Corporate Relations Cell'],
          },
          {
            degree: 'BE - Computer Science & Engineering',
            school: 'Mepco Schlenk Engineering College',
            year: '2020 - 2024',
            badge: 'Completed',
            icon: 'CSE',
            highlights: ['Data Structures', 'DBMS', 'Software Engineering'],
          },
        ].map(edu => (
          <motion.div
            key={edu.degree}
            variants={pillarItem}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            style={{
              background: 'var(--bg-card)',
              border: '1px solid var(--line)',
              borderRadius: 12,
              padding: '22px 24px',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: 12 }}>
              <span style={{ fontSize: '.95rem', fontWeight: 700 }}>{edu.icon}</span>
              <span
                style={{
                  fontSize: '.65rem',
                  fontWeight: 600,
                  letterSpacing: '.06em',
                  textTransform: 'uppercase',
                  padding: '3px 10px',
                  borderRadius: 20,
                  background: 'rgba(var(--accent-rgb), 0.12)',
                  color: 'var(--accent)',
                  border: '1px solid rgba(var(--accent-rgb), 0.25)',
                }}
              >
                {edu.badge}
              </span>
            </div>
            <div style={{ fontSize: '.95rem', fontWeight: 500, color: 'var(--text)', marginBottom: 4, lineHeight: 1.3 }}>
              {edu.degree}
            </div>
            <div style={{ fontSize: '.8rem', color: 'var(--text-2)', marginBottom: 4 }}>{edu.school}</div>
            <div style={{ fontSize: '.72rem', color: 'var(--text-3)', marginBottom: 14, fontVariantNumeric: 'tabular-nums' }}>{edu.year}</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {edu.highlights.map(h => (
                <span key={h} style={{ fontSize: '.68rem', padding: '2px 9px', borderRadius: 20, background: 'var(--bg)', border: '1px solid var(--line)', color: 'var(--text-3)' }}>
                  {h}
                </span>
              ))}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <SectionLabel style={{ marginBottom: 16 }}>Tools & Platforms</SectionLabel>
      <motion.div
        variants={pillarContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px' }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 48 }}
      >
        {[
          'LinkedIn Recruiter', 'Boolean Search', 'ATS Systems',
          'MS Excel', 'Google Workspace', 'Notion', 'Canva',
          'Applicant Tracking', 'JD Writing', 'Interview Coordination',
        ].map((tool, i) => (
          <motion.span
            key={tool}
            variants={pillarItem}
            whileHover={{ scale: 1.06, transition: { duration: 0.15 } }}
            style={{
              fontSize: '.78rem',
              fontWeight: 400,
              padding: '7px 16px',
              borderRadius: 20,
              background: 'var(--bg-card)',
              border: '1px solid var(--line)',
              color: i < 3 ? 'var(--accent)' : 'var(--text-2)',
              borderColor: i < 3 ? 'rgba(var(--accent-rgb), 0.35)' : 'var(--line)',
              cursor: 'default',
            }}
          >
            {tool}
          </motion.span>
        ))}
      </motion.div>

      <SectionLabel style={{ marginBottom: 16 }}>Fit at a Glance</SectionLabel>
      <motion.div
        variants={pillarContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px' }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14, marginBottom: 48 }}
        className="fit-grid-responsive"
      >
        {[
          {
            title: 'What I bring',
            accent: true,
            items: [
              'Tech fluency - reads JDs like an engineer',
              'Sourcing that goes beyond LinkedIn',
              'Structured hiring ops & documentation',
              'Campus network across PES University',
              'Genuine care for candidate experience',
            ],
          },
          {
            title: "What I'm looking for",
            accent: false,
            items: [
              'A team where HR has a seat at the table',
              'Technical hiring or campus recruitment focus',
              'Space to build, not just execute',
              'Mentorship from seasoned TA professionals',
              'Culture that values people over process',
            ],
          },
        ].map(col => (
          <motion.div
            key={col.title}
            variants={pillarItem}
            style={{
              background: 'var(--bg-card)',
              border: col.accent ? '1px solid rgba(var(--accent-rgb), 0.3)' : '1px solid var(--line)',
              borderRadius: 12,
              padding: '22px 24px',
            }}
          >
            <div style={{ fontSize: '.7rem', fontWeight: 600, letterSpacing: '.1em', textTransform: 'uppercase', marginBottom: 16, color: col.accent ? 'var(--accent)' : 'var(--text-3)' }}>
              {col.title}
            </div>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: 10 }}>
              {col.items.map(item => (
                <li key={item} style={{ display: 'flex', alignItems: 'flex-start', gap: 10, fontSize: '.84rem', color: 'var(--text-2)', lineHeight: 1.5 }}>
                  <span style={{ color: col.accent ? 'var(--accent)' : 'var(--text-3)', marginTop: 2, flexShrink: 0 }}>
                    {col.accent ? 'OK' : '->'}
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </motion.div>
        ))}
      </motion.div>

      <SectionLabel style={{ marginBottom: 16 }}>Working Style</SectionLabel>
      <motion.div
        variants={pillarContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: '0px' }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}
      >
        {[
          { label: 'Fast Learner', icon: 'FL' },
          { label: 'Detail-Oriented', icon: 'DO' },
          { label: 'Collaborative', icon: 'CO' },
          { label: 'Data-Informed', icon: 'DI' },
          { label: 'Empathetic', icon: 'EM' },
          { label: 'Async-Friendly', icon: 'AF' },
          { label: 'Structured Thinker', icon: 'ST' },
          { label: 'Ownership Mindset', icon: 'OM' },
        ].map(tag => (
          <motion.div
            key={tag.label}
            variants={pillarItem}
            whileHover={{ y: -2, scale: 1.04, transition: { duration: 0.15 } }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              padding: '8px 16px',
              borderRadius: 20,
              background: 'var(--bg-card)',
              border: '1px solid var(--line)',
              cursor: 'default',
            }}
          >
            <span style={{ fontSize: '.72rem', fontWeight: 700 }}>{tag.icon}</span>
            <span style={{ fontSize: '.78rem', fontWeight: 400, color: 'var(--text-2)' }}>{tag.label}</span>
          </motion.div>
        ))}
      </motion.div>
    </SectionWrapper>
  )
}
