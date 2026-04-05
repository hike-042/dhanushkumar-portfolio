'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import TextScramble from './ui/text-scramble'
import AnimatedCTA from './ui/animated-cta'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const ROLES = [
  'Talent Acquisition Specialist',
  'Campus Recruiter',
  'Problem Solver',
  'Tech + HR Bridge Builder',
]

// Magnetic button - pulls slightly toward cursor
function MagneticButton({ children, style, href }: { children: React.ReactNode; style?: React.CSSProperties; href: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })
  const y = useSpring(useMotionValue(0), { stiffness: 200, damping: 15 })

  function onMove(e: React.MouseEvent<HTMLAnchorElement>) {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    x.set((e.clientX - left - width  / 2) * 0.35)
    y.set((e.clientY - top  - height / 2) * 0.35)
  }

  function onLeave() { x.set(0); y.set(0) }

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ ...style, x, y, display: 'inline-block', textDecoration: 'none' }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.a>
  )
}

const page = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.05 } },
}

const block = {
  hidden: { opacity: 0, y: 22 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
}

const imgVariant = {
  hidden: { clipPath: 'circle(0% at 50% 50%)', scale: 1.08 },
  show:   { clipPath: 'circle(150% at 50% 50%)', scale: 1, transition: { duration: 0.95, ease } },
}

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const [roleIdx, setRoleIdx] = useState(0)

  useEffect(() => {
    const t = setInterval(() => setRoleIdx(i => (i + 1) % ROLES.length), 2800)
    return () => clearInterval(t)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  const imgY    = useSpring(useTransform(scrollYProgress, [0, 1], [0,  80]), { stiffness: 80, damping: 25 })
  const textY   = useSpring(useTransform(scrollYProgress, [0, 1], [0, -40]), { stiffness: 80, damping: 25 })
  const opacity = useTransform(scrollYProgress, [0.35, 0.85], [1, 0])

  const blob1Y = useTransform(scrollYProgress, [0, 1], [0, -130])
  const blob2Y = useTransform(scrollYProgress, [0, 1], [0,  -70])
  const blob3Y = useTransform(scrollYProgress, [0, 1], [0, -180])

  // ── Mouse-position parallax ──────────────────────────────────
  const rawMX = useMotionValue(0.5)
  const rawMY = useMotionValue(0.5)
  const mX = useSpring(rawMX, { stiffness: 40, damping: 18 })
  const mY = useSpring(rawMY, { stiffness: 40, damping: 18 })

  const b1mx = useTransform(mX, [0, 1], [ 22, -22])
  const b1my = useTransform(mY, [0, 1], [ 14, -14])
  const b2mx = useTransform(mX, [0, 1], [-28,  28])
  const b2my = useTransform(mY, [0, 1], [-18,  18])
  const b3mx = useTransform(mX, [0, 1], [-14,  14])
  const b3my = useTransform(mY, [0, 1], [-10,  10])

  // Combine scroll Y + mouse Y for each blob
  const blob1CY = useTransform([blob1Y, b1my] as any, ([sy, my]: number[]) => sy + my)
  const blob2CY = useTransform([blob2Y, b2my] as any, ([sy, my]: number[]) => sy + my)
  const blob3CY = useTransform([blob3Y, b3my] as any, ([sy, my]: number[]) => sy + my)

  function onMouseMove(e: React.MouseEvent<HTMLElement>) {
    const el = sectionRef.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    rawMX.set((e.clientX - left) / width)
    rawMY.set((e.clientY - top)  / height)
  }
  function onMouseLeave() { rawMX.set(0.5); rawMY.set(0.5) }

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        padding: 'clamp(88px, 14vh, 140px) clamp(20px, 5vw, 72px) clamp(60px, 8vh, 96px)',
        background: 'var(--bg)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* ── PARALLAX BLOBS (scroll + mouse) ── */}
      <motion.div style={{ position: 'absolute', top: '-10%', right: '-8%', width: 560, height: 560, borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.22) 0%, transparent 70%)', filter: 'blur(72px)', pointerEvents: 'none', zIndex: 0, x: b2mx, y: blob2CY, willChange: 'transform' }} />
      <motion.div style={{ position: 'absolute', bottom: '0%', left: '-12%', width: 420, height: 420, borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.16) 0%, transparent 65%)', filter: 'blur(90px)', pointerEvents: 'none', zIndex: 0, x: b1mx, y: blob1CY, willChange: 'transform' }} />
      <motion.div style={{ position: 'absolute', top: '35%', left: '40%', width: 260, height: 260, borderRadius: '50%', background: 'radial-gradient(circle, rgba(var(--accent-rgb), 0.12) 0%, transparent 60%)', filter: 'blur(60px)', pointerEvents: 'none', zIndex: 0, x: b3mx, y: blob3CY, willChange: 'transform' }} />

      <motion.div
        variants={page}
        initial="hidden"
        animate="show"
        className="hero-inner"
        style={{
          maxWidth: 1200, margin: '0 auto', width: '100%',
          display: 'flex', alignItems: 'center', gap: 64, flexWrap: 'wrap',
          opacity,
          position: 'relative', zIndex: 1,
        }}
      >

        {/* ── PROFILE IMAGE ── */}
        <motion.div variants={imgVariant} className="hero-img-wrap" style={{ flexShrink: 0, y: imgY, willChange: 'transform' }}>
          <div className="profile-ring-wrap">
            <div style={{
              width: 'clamp(150px, 20vw, 220px)',
              height: 'clamp(150px, 20vw, 220px)',
              borderRadius: '50%', overflow: 'hidden',
              boxShadow: '0 8px 40px rgba(0,0,0,0.22)',
            }}>
              <Image
                src="/profile-full.jpg"
                alt="Dhanush Kumar R"
                width={220} height={220}
                style={{ objectFit: 'cover', width: '100%', height: '100%' }}
                priority
              />
            </div>
          </div>
        </motion.div>

        {/* ── TEXT COLUMN ── */}
        <motion.div style={{ flex: 1, minWidth: 280, y: textY, willChange: 'transform' }}>

          {/* Badge */}
          <motion.div variants={block} style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            padding: '7px 16px',
            background: 'rgba(var(--accent-rgb), 0.12)',
            border: '1px solid rgba(var(--accent-rgb), 0.28)',
            borderRadius: 20, marginBottom: 30,
          }}>
            <span style={{ width: 7, height: 7, borderRadius: '50%', background: 'var(--accent)', display: 'inline-block', flexShrink: 0 }} />
            <span style={{ fontSize: '.82rem', color: 'var(--accent)', fontWeight: 500, letterSpacing: '.05em', textTransform: 'uppercase' }}>
              Talent Acquisition &amp; HR · Open to Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={block}
            className="font-fraunces"
            style={{ fontSize: 'clamp(2.8rem, 7vw, 5.5rem)', fontWeight: 400, lineHeight: .96, letterSpacing: '-.03em', marginBottom: 12 }}
          >
            <TextScramble text="Dhanush" delay={300} duration={1000} /><br />
            <TextScramble text="Kumar R" delay={600} duration={1000} className="gradient-text" style={{ fontStyle: 'italic' }} />
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={block}
            className="font-fraunces"
            style={{ fontSize: 'clamp(1rem, 2vw, 1.15rem)', fontWeight: 300, color: 'var(--text-2)', fontStyle: 'italic', marginBottom: 16 }}
          >
            aka Arco · PES University Bengaluru · MBA HR '26
          </motion.p>

          {/* ── CYCLING ROLE TEXT ── */}
          <motion.div
            variants={block}
            style={{ height: 28, overflow: 'hidden', marginBottom: 28, position: 'relative' }}
          >
            <AnimatePresence mode="wait">
              <motion.span
                key={roleIdx}
                initial={{ y: 22, opacity: 0 }}
                animate={{ y: 0,  opacity: 1 }}
                exit={{   y: -22, opacity: 0 }}
                transition={{ duration: 0.38, ease }}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                  fontSize: '.92rem',
                  fontWeight: 500,
                  color: 'var(--accent)',
                  letterSpacing: '.02em',
                  position: 'absolute',
                  whiteSpace: 'nowrap',
                }}
              >
                <motion.span
                  animate={{ x: [0, 4, 0] }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  style={{ fontSize: '.8rem', opacity: 0.7 }}
                >
                  →
                </motion.span>
                {ROLES[roleIdx]}
                <span className="typewriter-cursor" />
              </motion.span>
            </AnimatePresence>
          </motion.div>

          {/* Statement */}
          <motion.div variants={block} style={{ maxWidth: 540, marginBottom: 36 }}>
            <p style={{ fontSize: '1.1rem', fontWeight: 500, color: 'var(--text)', lineHeight: 1.5, marginBottom: 10 }}>
              A technical mind with a passion for people.
            </p>
            <p style={{ fontSize: '1rem', fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.8 }}>
              I combine a Computer Science degree with an MBA in HR to recruit
              smarter, understanding both what an engineering manager needs
              and what makes a candidate exceptional. That's a rare combination
              in Talent Acquisition, and I use it every day.
            </p>
          </motion.div>

          {/* Quote */}
          <motion.blockquote
            variants={block}
            style={{
              fontSize: '1rem', fontWeight: 300, color: 'var(--text-3)',
              lineHeight: 1.7, borderLeft: '2px solid var(--accent)',
              paddingLeft: 16, marginBottom: 40, fontStyle: 'italic', maxWidth: 460,
            }}
          >
            "Everyone is exceptional in their own way. They just need the right opportunity to write their story."
          </motion.blockquote>

          {/* CTAs */}
          <motion.div variants={block} className="hero-cta-row" style={{ display: 'flex', gap: 12, flexWrap: 'wrap', marginBottom: 52 }}>
            <MagneticButton
              href="#experience"
              style={{
                padding: '15px 34px', background: 'var(--accent)', color: '#fff',
                borderRadius: 8, fontSize: '.95rem', fontWeight: 500, letterSpacing: '.02em',
              }}
            >
              View My Work
            </MagneticButton>
            <AnimatedCTA href="#contact">Get in Touch</AnimatedCTA>
          </motion.div>

          {/* Social Icons */}
          <motion.div variants={block} style={{ marginBottom: 36 }}>
            <ul className="social-icons">
              {/* LinkedIn */}
              <li className="icon-content">
                <a href="https://www.linkedin.com/in/dhanush-kumar-97a6b5182/" data-social="linkedin" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
                  <span className="filled" />
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                  </svg>
                </a>
                <span className="tooltip">LinkedIn</span>
              </li>
              {/* GitHub */}
              <li className="icon-content">
                <a href="https://github.com/hike-042" data-social="github" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
                  <span className="filled" />
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                  </svg>
                </a>
                <span className="tooltip">GitHub</span>
              </li>
              {/* Gmail */}
              <li className="icon-content">
                <a href="mailto:official.dhanushkumar.r@gmail.com" data-social="gmail" aria-label="Email">
                  <span className="filled" />
                  <svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M24 5.457v13.909c0 .904-.732 1.636-1.636 1.636h-3.819V11.73L12 16.64l-6.545-4.91v9.273H1.636A1.636 1.636 0 0 1 0 19.366V5.457c0-2.023 2.309-3.178 3.927-1.964L5.455 4.64 12 9.548l6.545-4.91 1.528-1.145C21.69 2.28 24 3.434 24 5.457z"/>
                  </svg>
                </a>
                <span className="tooltip">Email</span>
              </li>
            </ul>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={block}
            style={{ display: 'flex', gap: 0, flexWrap: 'wrap', borderTop: '1px solid var(--line)', paddingTop: 28 }}
          >
            {[
              { num: 'MBA',       label: 'HR Specialization' },
              { num: 'BE CSE',    label: 'Tech Foundation'   },
              { num: 'Bengaluru', label: 'Location'          },
              { num: '2026',      label: 'Available From'    },
            ].map((stat, i) => (
              <div
                key={stat.label}
                style={{ paddingRight: 28, marginRight: 28, borderRight: i < 3 ? '1px solid var(--line)' : 'none', marginBottom: 8 }}
              >
                <div className="font-fraunces" style={{ fontSize: '1.25rem', fontWeight: 400, color: 'var(--text)', letterSpacing: '-.02em' }}>
                  {stat.num}
                </div>
                <div style={{ fontSize: '.78rem', color: 'var(--text-3)', fontWeight: 400, letterSpacing: '.06em', textTransform: 'uppercase' }}>
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>

        </motion.div>
      </motion.div>

      {/* ── SCROLL DOWN INDICATOR ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.2, duration: 0.8 }}
        className="scroll-hint"
        style={{
          position: 'absolute',
          bottom: 28,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 8,
          zIndex: 1,
          pointerEvents: 'none',
        }}
      >
        <span style={{
          fontSize: '.6rem',
          color: 'var(--text-3)',
          letterSpacing: '.14em',
          textTransform: 'uppercase',
          fontWeight: 400,
        }}>
          scroll
        </span>
        <motion.div
          animate={{ y: [0, 7, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{
            width: 1.5,
            height: 32,
            background: 'linear-gradient(to bottom, var(--accent), transparent)',
            borderRadius: 2,
          }}
        />
      </motion.div>
    </section>
  )
}
