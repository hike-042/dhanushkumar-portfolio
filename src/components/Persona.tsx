'use client'

import { motion } from 'framer-motion'
import WordReveal from './ui/word-reveal'
import TextReveal from './ui/text-reveal'
import SectionLabel from './ui/section-label'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const BELIEFS = [
  {
    icon: 'ST',
    title: 'Every hire is a story',
    desc: "Recruitment isn't just filling seats - it's matching the right chapter of someone's career to the right company's journey.",
  },
  {
    icon: 'TL',
    title: 'Tech literacy is an HR superpower',
    desc: 'Understanding what engineers actually build makes me a far better recruiter than someone reading buzzwords off a JD.',
  },
  {
    icon: 'PE',
    title: 'Process + empathy = great hiring',
    desc: 'Structure without care is cold. Care without structure is chaos. The best hiring combines both in equal measure.',
  },
  {
    icon: 'HR',
    title: "Why HR? I genuinely don't know - and that's the point.",
    desc: 'I never chose HR to tick a box. Something about connecting people to opportunity, about seeing someone get a role that changes their life - that just moves me. No logic. Pure pull.',
  },
]

const LEARNING = [
  'HR Analytics & Dashboards',
  'ATS Optimization',
  'Employer Branding Strategy',
  'Behavioral Interviewing Frameworks',
  'Data-Driven Sourcing',
  'LinkedIn Recruiter',
]

const FUN_FACTS = [
  { emoji: 'PY', fact: 'Can debug a Python script before writing a job description for the role.' },
  { emoji: 'SP', fact: 'Comfortable presenting to rooms of 5 or 500 - done both at university events.' },
  { emoji: 'BE', fact: 'Reads about behavioral economics and how cognitive biases show up in hiring decisions.' },
  {
    emoji: 'OP',
    fact: 'One Piece fan. Luffy said it best - "As long as I live, there are infinite chances." That is the recruiter mindset too: every rejection is just the next door.',
  },
  {
    emoji: 'BC',
    fact: 'Black Clover fan. Asta\'s motto is "My magic is never giving up!" - no shortcuts, just relentless effort. Applies to sourcing passive candidates at midnight.',
  },
]

const cardContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.11, delayChildren: 0.08 } },
}

const cardItem = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  show: { opacity: 1, y: 0, scale: 1, transition: { duration: 0.55, ease } },
}

const chipContainer = {
  hidden: {},
  show: { transition: { staggerChildren: 0.07, delayChildren: 0.1 } },
}

const chipItem = {
  hidden: { opacity: 0, scale: 0.85 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.4, ease } },
}

export default function Persona() {
  return (
    <section id="persona" className="site-section">
      <SectionLabel>The Person</SectionLabel>

      <h2
        className="font-fraunces"
        style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.02em', marginBottom: 48 }}
      >
        <WordReveal text={"Beyond the resume."} delay={0.07} />
      </h2>

      <TextReveal delay={0.05}>
        <p style={{ fontSize: '.72rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 16 }}>
          What I Believe
        </p>
      </TextReveal>

      <motion.div
        variants={cardContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-40px' }}
        style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: 14, marginBottom: 52 }}
      >
        {BELIEFS.map(b => (
          <motion.div
            key={b.title}
            variants={cardItem}
            whileHover={{ y: -3, transition: { duration: 0.2 } }}
            style={{
              padding: '22px 22px',
              background: 'var(--bg-card)',
              border: '1px solid var(--line)',
              borderRadius: 12,
              transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
            }}
            className="pillar-card"
          >
            <div style={{ fontSize: '.82rem', marginBottom: 10, fontWeight: 700 }}>{b.icon}</div>
            <div style={{ fontSize: '.88rem', fontWeight: 500, color: 'var(--text)', marginBottom: 8, lineHeight: 1.3 }}>
              {b.title}
            </div>
            <div style={{ fontSize: '.82rem', fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.65 }}>
              {b.desc}
            </div>
          </motion.div>
        ))}
      </motion.div>

      <TextReveal delay={0.05}>
        <p style={{ fontSize: '.72rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 16 }}>
          Currently Learning
        </p>
      </TextReveal>

      <motion.div
        variants={chipContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-30px' }}
        style={{ display: 'flex', flexWrap: 'wrap', gap: 10, marginBottom: 52 }}
      >
        {LEARNING.map((item, i) => (
          <motion.div
            key={item}
            variants={chipItem}
            whileHover={{ scale: 1.05, transition: { duration: 0.15 } }}
            style={{
              padding: '8px 16px',
              borderRadius: 99,
              border: '1px solid var(--line)',
              background: 'var(--bg-card)',
              fontSize: '.82rem',
              fontWeight: 400,
              color: 'var(--text-2)',
              display: 'flex',
              alignItems: 'center',
              gap: 7,
            }}
          >
            <motion.span
              animate={{ rotate: [0, 15, -10, 0] }}
              transition={{ duration: 1.2, delay: i * 0.15, repeat: Infinity, repeatDelay: 4 }}
              style={{ fontSize: '.75rem', fontWeight: 700 }}
            >
              *
            </motion.span>
            {item}
          </motion.div>
        ))}
      </motion.div>

      <TextReveal delay={0.05}>
        <p style={{ fontSize: '.72rem', fontWeight: 500, letterSpacing: '.14em', textTransform: 'uppercase', color: 'var(--text-3)', marginBottom: 16 }}>
          Fun Facts
        </p>
      </TextReveal>

      <motion.div
        variants={cardContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-30px' }}
        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
      >
        {FUN_FACTS.map((f, i) => (
          <motion.div
            key={i}
            variants={cardItem}
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              gap: 16,
              padding: '16px 20px',
              background: 'var(--bg-card)',
              border: '1px solid var(--line)',
              borderRadius: 10,
            }}
          >
            <span style={{ fontSize: '.75rem', fontWeight: 700, flexShrink: 0, lineHeight: 1.8 }}>{f.emoji}</span>
            <p style={{ fontSize: '.88rem', fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.65 }}>
              {f.fact}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </section>
  )
}
