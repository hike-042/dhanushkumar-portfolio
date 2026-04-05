'use client'

import { useRef, useState, useEffect } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import SectionWrapper from './ui/section-wrapper'
import TextReveal from './ui/text-reveal'
import SectionLabel from './ui/section-label'

const PROJECTS = [
  {
    icon: '🏪',
    title: 'Vilcart Inventory Solution',
    desc: 'A business-focused digital inventory management system designed for rural kirana stores, bridging the gap between informal commerce and modern supply chain tools. Built during HackOps 2025.',
    tags: ['Hackathon', 'Inventory', 'Rural Commerce', '8th Place'],
  },
  {
    icon: '🧠',
    title: 'Suicidal Ideation Detection via ML',
    desc: 'Applied NLP and machine learning on Twitter/Reddit data to detect suicidal ideation. Classified posts into three risk levels to enable early mental health intervention.',
    tags: ['NLP', 'Machine Learning', 'Mental Health', 'Python'],
  },
  {
    icon: '🌍',
    title: 'X-Culture International Certificate',
    desc: 'Collaborated with a team of international students across multiple countries on a market research and product strategy project. Earned the globally recognised X-Culture certificate for cross-cultural teamwork and global business communication.',
    tags: ['International', 'Market Research', 'Cross-Cultural', 'Certificate'],
  },
]

const BLOG_POSTS = [
  {
    title: 'How College Gave Me More Than a Degree',
    date: 'Jun 6, 2025',
    excerpt: 'Hostel life, pandemic memories, and a roommate who became a brother. What no curriculum teaches.',
    tag: 'Life',
    url: 'https://dhanushkumarr.blogspot.com/',
  },
  {
    title: 'Mass on Screen, Humble in Life',
    date: 'Jun 3, 2025',
    excerpt: "Why I'll always watch Ajith. Not for the blockbusters, but because he's proof that humility and mass can coexist.",
    tag: 'Cinema',
    url: 'https://dhanushkumarr.blogspot.com/',
  },
  {
    title: 'From Classroom Desks to MBA',
    date: 'Jun 3, 2025',
    excerpt: "If you knew me in school, you remember 'that guy'. A story of reinvention, failure, and finding your people.",
    tag: 'Journey',
    url: 'https://dhanushkumarr.blogspot.com/',
  },
]

/* ── 3D TILT CARD (existing) ──────────────────────────────── */
function TiltCard({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null)

  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [8, -8]),  { stiffness: 200, damping: 20 })
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-8, 8]), { stiffness: 200, damping: 20 })
  const glowX   = useTransform(rawX, [-0.5, 0.5], [0, 100])
  const glowY   = useTransform(rawY, [-0.5, 0.5], [0, 100])
  const glowBg  = useTransform(
    [glowX, glowY],
    ([x, y]) =>
      `radial-gradient(circle at ${x}% ${y}%, rgba(var(--accent-rgb), 0.14) 0%, transparent 65%)`
  )

  const [hovered, setHovered] = useState(false)

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    rawX.set((e.clientX - left) / width - 0.5)
    rawY.set((e.clientY - top)  / height - 0.5)
  }

  function onMouseLeave() {
    rawX.set(0)
    rawY.set(0)
    setHovered(false)
  }

  return (
    <motion.div
      ref={ref}
      data-cursor="View"
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={onMouseLeave}
      style={{
        rotateX, rotateY,
        transformStyle: 'preserve-3d',
        perspective: 800,
        position: 'relative',
        borderRadius: 12,
        overflow: 'hidden',
        background: 'var(--bg-card)',
        border: '1px solid var(--line)',
        transition: 'border-color 0.25s ease, box-shadow 0.25s ease',
        boxShadow: hovered ? 'var(--shadow-lg)' : 'none',
        borderColor: hovered ? 'rgba(var(--accent-rgb), 0.40)' : 'var(--line)',
      }}
    >
      {/* Moving spotlight glow */}
      <motion.div
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none', borderRadius: 12,
          background: glowBg,
          opacity: hovered ? 1 : 0,
          transition: 'opacity 0.2s ease',
        }}
      />

      {/* Green top-bar on hover */}
      <motion.div
        animate={{ scaleX: hovered ? 1 : 0 }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'var(--accent)', transformOrigin: 'left',
        }}
      />

      <div style={{ padding: 28, transform: 'translateZ(20px)' }}>
        {children}
      </div>
    </motion.div>
  )
}

/* ── DECK POSITION CONSTANTS ──────────────────────────────── */
const STACKED = [
  { x: -7,  rotate: -4,  scale: 0.97, z: 1 },
  { x: 0,   rotate: 0,   scale: 1,    z: 3 },
  { x: 7,   rotate: 4,   scale: 0.97, z: 2 },
]
const FANNED = [
  { x: -210, rotate: -14, scale: 0.95, z: 1 },
  { x: 0,    rotate: 0,   scale: 1,    z: 3 },
  { x: 210,  rotate: 14,  scale: 0.95, z: 2 },
]

/* SVG noise data-URI for grain texture */
const NOISE_URI =
  "data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='300' height='300'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='300' height='300' filter='url(%23n)'/%3E%3C/svg%3E"

/* ── INDIVIDUAL BLOG CARD ─────────────────────────────────── */
interface BlogCardProps {
  post: typeof BLOG_POSTS[0]
  index: number
  deckHovered: boolean
  isActive: boolean
  isDimmed: boolean
  onEnter: () => void
  onLeave: () => void
}

function BlogCard({ post, index, deckHovered, isActive, isDimmed, onEnter, onLeave }: BlogCardProps) {
  const ref  = useRef<HTMLAnchorElement>(null)
  const rawX = useMotionValue(0)
  const rawY = useMotionValue(0)

  /* Per-frame 3D tilt - GPU composited, 165 Hz safe */
  const tiltX = useSpring(useTransform(rawY, [-0.5, 0.5], [7, -7]),  { stiffness: 350, damping: 28 })
  const tiltY = useSpring(useTransform(rawX, [-0.5, 0.5], [-7, 7]), { stiffness: 350, damping: 28 })

  /* Gloss position follows cursor */
  const glossX  = useTransform(rawX, [-0.5, 0.5], [10, 90])
  const glossY  = useTransform(rawY, [-0.5, 0.5], [10, 90])
  const glossBg = useTransform(
    [glossX, glossY] as ReturnType<typeof useMotionValue<number>>[],
    ([x, y]: number[]) =>
      `radial-gradient(ellipse 65% 50% at ${x}% ${y}%, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 45%, transparent 70%)`
  )

  /* Depth shadow - front card crisper, back cards softer */
  const baseShadow   = index === 1
    ? '0 12px 40px rgba(0,0,0,0.38), 0 2px 8px rgba(0,0,0,0.2)'
    : '0 5px 22px rgba(0,0,0,0.26), 0 1px 5px rgba(0,0,0,0.14)'
  const activeShadow = '0 30px 80px rgba(0,0,0,0.55), 0 8px 20px rgba(0,0,0,0.28)'

  const stackPos = STACKED[index]
  const fanPos   = FANNED[index]
  const target   = deckHovered ? fanPos : stackPos

  function onMouseMove(e: React.MouseEvent<HTMLAnchorElement>) {
    if (!isActive) return
    const el = ref.current
    if (!el) return
    const { left, top, width, height } = el.getBoundingClientRect()
    rawX.set((e.clientX - left) / width  - 0.5)
    rawY.set((e.clientY - top)  / height - 0.5)
  }

  function handleLeave() {
    rawX.set(0)
    rawY.set(0)
    onLeave()
  }

  return (
    <motion.a
      ref={ref}
      href={post.url}
      target="_blank"
      rel="noopener noreferrer"
      data-cursor="Read"
      onMouseMove={onMouseMove}
      onHoverStart={onEnter}
      onHoverEnd={handleLeave}
      animate={{
        x:       target.x,
        y:       isActive ? -10 : 0,
        rotate:  target.rotate,
        scale:   isActive ? 1.06 : target.scale,
        opacity: isDimmed ? 0.52 : 1,
      }}
      style={{
        /* tilt driven by live motion values - zero-paint, 165 Hz */
        rotateX: tiltX,
        rotateY: tiltY,
        zIndex:        isActive ? 10 : target.z,
        willChange:    'transform, opacity',
        transformStyle:'preserve-3d',
        /* box-shadow only changes on state, not every frame → CSS transition OK */
        boxShadow:  isActive ? activeShadow : baseShadow,
        transition: 'box-shadow 0.28s ease',
        /* layout */
        position:   'absolute',
        width:      270,
        borderRadius: 14,
        textDecoration: 'none',
        cursor:     'pointer',
      }}
      transition={{
        type:     'spring',
        stiffness: 320,
        damping:   26,
        /* stagger: fan-out left→right, stack-back right→left */
        delay: deckHovered
          ? index * 0.045
          : (BLOG_POSTS.length - 1 - index) * 0.025,
        /* opacity doesn't need spring physics */
        opacity: { type: 'tween', duration: 0.2, delay: 0 },
      }}
    >
      {/* ── Card background ── */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 14,
        background: 'var(--bg-card)',
      }} />

      {/* ── Base border (always visible) ── */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 14, pointerEvents: 'none',
        boxShadow: 'inset 0 0 0 1px var(--line)',
      }} />

      {/* ── Accent border - fades in via opacity, zero paint cost ── */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ type: 'tween', duration: 0.16, delay: 0 }}
        style={{
          position: 'absolute', inset: 0, borderRadius: 14, pointerEvents: 'none',
          boxShadow: 'inset 0 0 0 1px rgba(var(--accent-rgb), 0.55)',
        }}
      />

      {/* ── Moving gloss shimmer (cursor-tracked) ── */}
      <motion.div
        animate={{ opacity: isActive ? 1 : 0 }}
        transition={{ type: 'tween', duration: 0.2, delay: 0 }}
        style={{
          position: 'absolute', inset: 0, borderRadius: 14, pointerEvents: 'none',
          background: glossBg,
        }}
      />

      {/* ── Noise grain texture - Klarna speckle feel ── */}
      <div style={{
        position: 'absolute', inset: 0, borderRadius: 14, pointerEvents: 'none',
        backgroundImage: `url("${NOISE_URI}")`,
        backgroundSize: '180px 180px',
        opacity: 0.045,
        mixBlendMode: 'overlay',
      }} />

      {/* ── Accent top bar sweeps left→right on active ── */}
      <motion.div
        animate={{ scaleX: isActive ? 1 : 0 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
        style={{
          position: 'absolute', top: 0, left: 0, right: 0, height: 2,
          background: 'var(--accent)', transformOrigin: 'left',
          borderRadius: '14px 14px 0 0', zIndex: 1,
        }}
      />

      {/* ── Content - translateZ lifts it above overlays in 3D ── */}
      <div style={{ padding: '20px 20px 18px', position: 'relative', zIndex: 1, transform: 'translateZ(16px)' }}>

        {/* Tag + date */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 11 }}>
          <span style={{
            fontSize: '.6rem', fontWeight: 500, letterSpacing: '.08em', textTransform: 'uppercase',
            color: 'var(--accent)',
            background: 'rgba(var(--accent-rgb), 0.12)',
            padding: '2px 8px', borderRadius: 20,
          }}>
            {post.tag}
          </span>
          <span style={{ fontSize: '.67rem', color: 'var(--text-3)', fontWeight: 300 }}>{post.date}</span>
        </div>

        {/* Title */}
        <div
          className="font-fraunces"
          style={{ fontSize: '.92rem', fontWeight: 400, color: 'var(--text)', lineHeight: 1.35, marginBottom: 8, letterSpacing: '-.01em' }}
        >
          {post.title}
        </div>

        {/* Excerpt */}
        <p style={{
          fontSize: '.78rem', fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.65, marginBottom: 13,
          display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden',
        }}>
          {post.excerpt}
        </p>

        {/* Read arrow */}
        <motion.span
          animate={{ opacity: isActive ? 1 : 0.25, x: isActive ? 4 : 0 }}
          transition={{ type: 'tween', duration: 0.16, delay: 0 }}
          style={{ fontSize: '.74rem', color: 'var(--accent)', fontWeight: 500, display: 'inline-block' }}
        >
          Read post →
        </motion.span>
      </div>
    </motion.a>
  )
}

/* ── MOBILE BLOG LIST ─────────────────────────────────────── */
function BlogList() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: 12, padding: '16px 0 24px' }}>
      {BLOG_POSTS.map(post => (
        <a
          key={post.title}
          href={post.url}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'block',
            padding: '18px 20px',
            background: 'var(--bg-card)',
            border: '1px solid var(--line)',
            borderRadius: 12,
            textDecoration: 'none',
          }}
        >
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 }}>
            <span style={{ fontSize: '.65rem', fontWeight: 500, color: 'var(--accent)', background: 'rgba(var(--accent-rgb), 0.12)', padding: '2px 8px', borderRadius: 20, letterSpacing: '.07em', textTransform: 'uppercase' }}>{post.tag}</span>
            <span style={{ fontSize: '.67rem', color: 'var(--text-3)', fontWeight: 300 }}>{post.date}</span>
          </div>
          <div className="font-fraunces" style={{ fontSize: '.95rem', fontWeight: 400, color: 'var(--text)', marginBottom: 6, lineHeight: 1.35 }}>{post.title}</div>
          <p style={{ fontSize: '.8rem', color: 'var(--text-2)', lineHeight: 1.6, marginBottom: 10 }}>{post.excerpt}</p>
          <span style={{ fontSize: '.74rem', color: 'var(--accent)', fontWeight: 500 }}>Read post →</span>
        </a>
      ))}
    </div>
  )
}

/* ── BLOG DECK CONTAINER ──────────────────────────────────── */
function BlogDeck() {
  const [deckHovered, setDeckHovered] = useState(false)
  const [activeCard,  setActiveCard]  = useState<number | null>(null)
  const [isMobile,    setIsMobile]    = useState(false)

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth <= 680)
    check()
    window.addEventListener('resize', check)
    return () => window.removeEventListener('resize', check)
  }, [])

  if (isMobile) return <BlogList />

  return (
    <div
      onMouseEnter={() => setDeckHovered(true)}
      onMouseLeave={() => { setDeckHovered(false); setActiveCard(null) }}
      style={{
        position: 'relative',
        height: 310,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '16px 0 34px',
        cursor: 'default',
      }}
    >
      {/* ── Ambient accent glow - pulses when deck is open ── */}
      <motion.div
        animate={{
          opacity: deckHovered ? [0.18, 0.32, 0.18] : 0.07,
          scale:   deckHovered ? [1, 1.18, 1]       : 1,
        }}
        transition={{
          duration: 2.8,
          repeat:   deckHovered ? Infinity : 0,
          ease:     'easeInOut',
        }}
        style={{
          position: 'absolute',
          width: 360, height: 110,
          borderRadius: '50%',
          background: 'radial-gradient(ellipse, rgba(var(--accent-rgb), 0.38) 0%, transparent 70%)',
          filter: 'blur(40px)',
          pointerEvents: 'none',
          zIndex: 0,
          willChange: 'transform, opacity',
        }}
      />

      {/* ── "hover to explore" hint ── */}
      <motion.span
        animate={{ opacity: deckHovered ? 0 : 0.36, y: deckHovered ? 8 : 0 }}
        transition={{ type: 'tween', duration: 0.2 }}
        style={{
          position: 'absolute', bottom: 6, left: '50%',
          transform: 'translateX(-50%)',
          fontSize: '.67rem', color: 'var(--text-3)', fontWeight: 300,
          letterSpacing: '.06em', pointerEvents: 'none', whiteSpace: 'nowrap', zIndex: 0,
        }}
      >
        hover to explore
      </motion.span>

      {/* ── Cards ── */}
      {BLOG_POSTS.map((post, i) => (
        <BlogCard
          key={post.title}
          post={post}
          index={i}
          deckHovered={deckHovered}
          isActive={activeCard === i}
          isDimmed={activeCard !== null && activeCard !== i}
          onEnter={() => setActiveCard(i)}
          onLeave={() => setActiveCard(null)}
        />
      ))}
    </div>
  )
}

/* ── STAGGER VARIANTS ─────────────────────────────────────── */
const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

const cardGrid = {
  hidden: {},
  show: { transition: { staggerChildren: 0.14, delayChildren: 0.06 } },
}
const cardItem = {
  hidden: { opacity: 0, y: 44, scale: 0.97 },
  show:   { opacity: 1, y: 0,  scale: 1, transition: { duration: 0.7, ease } },
}

/* ── MAIN SECTION ─────────────────────────────────────────── */
export default function Projects() {
  return (
    <SectionWrapper id="projects">

      {/* ── Section label ── */}
      <SectionLabel style={{ fontSize: '.82rem', marginBottom: 14 }}>Projects</SectionLabel>

      <TextReveal delay={0.07}>
        <h2
          className="font-fraunces"
          style={{ fontSize: 'clamp(1.8rem, 4vw, 2.6rem)', fontWeight: 400, lineHeight: 1.1, letterSpacing: '-.02em', marginBottom: 36 }}
        >
          Work that<br />left a mark.
        </h2>
      </TextReveal>

      {/* ── 3D Tilt project cards - staggered cascade ── */}
      <motion.div
        className="projects-grid-responsive"
        variants={cardGrid}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, margin: '-50px' }}
        style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 18 }}
      >
        {PROJECTS.map(p => (
          <motion.div key={p.title} variants={cardItem}>
            <TiltCard>
              <div style={{ fontSize: '1.7rem', marginBottom: 16 }}>{p.icon}</div>
              <div
                className="font-fraunces"
                style={{ fontSize: '1.1rem', fontWeight: 400, letterSpacing: '-.01em', marginBottom: 10, color: 'var(--text)' }}
              >
                {p.title}
              </div>
              <p style={{ fontSize: '.95rem', fontWeight: 300, color: 'var(--text-2)', lineHeight: 1.75, marginBottom: 18 }}>
                {p.desc}
              </p>
              <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
                {p.tags.map(tag => <span key={tag} className="tag">{tag}</span>)}
              </div>
            </TiltCard>
          </motion.div>
        ))}
      </motion.div>

      {/* ──────────────────────────────────────────────────────
          WRITING SECTION - gradient-border glassmorphism card
          ────────────────────────────────────────────────────── */}
      <SectionLabel style={{ marginTop: 52, marginBottom: 18 }}>Writing</SectionLabel>

      <TextReveal delay={0.14}>
        {/* Gradient border wrapper - 1px gradient "border" via padding trick */}
        <div style={{
          background: 'linear-gradient(135deg, rgba(var(--accent-rgb), 0.40) 0%, var(--line) 45%, rgba(var(--accent-rgb), 0.18) 100%)',
          padding: '1px',
          borderRadius: 14,
        }}>
          {/* Inner card */}
          <div style={{ background: 'var(--bg-card)', borderRadius: 13 }}>

            {/* Card header */}
            <div style={{
              padding: '18px 24px',
              borderBottom: '1px solid var(--line)',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <span style={{ fontSize: '.88rem', fontWeight: 500, color: 'var(--text)' }}>
                  Dhanush on the Map
                </span>
                <span style={{
                  fontSize: '.7rem', color: 'var(--text-3)', fontWeight: 300,
                  background: 'var(--line)', padding: '2px 8px', borderRadius: 20,
                }}>
                  Personal blog
                </span>
              </div>
              <motion.a
                href="https://dhanushkumarr.blogspot.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ x: 3 }}
                transition={{ duration: 0.18 }}
                style={{
                  fontSize: '.78rem', color: 'var(--accent)', fontWeight: 500,
                  textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4,
                }}
              >
                View all →
              </motion.a>
            </div>

            {/* Stacked fan-out deck */}
            <BlogDeck />

          </div>
        </div>
      </TextReveal>

    </SectionWrapper>
  )
}
