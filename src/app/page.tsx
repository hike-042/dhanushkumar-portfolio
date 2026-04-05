// page.tsx — PERFORMANCE-FIXED
// Removed: zoom-parallax, cursor-glow
// All sections load cleanly with no layout shift or black voids

import Navbar     from '@/components/Navbar'
import Hero       from '@/components/Hero'
import Marquee    from '@/components/ui/marquee'
import About      from '@/components/About'
import Experience from '@/components/Experience'
import Projects   from '@/components/Projects'
import Contact    from '@/components/Contact'
import Persona    from '@/components/Persona'
import Gallery    from '@/components/Gallery'
import ScrollSkew from '@/components/ui/scroll-skew'

const Divider = () => (
  <div style={{ height: 1, background: 'var(--line)', margin: 0 }} />
)

export default function Home() {
  return (
    <main style={{ background: 'var(--bg)', minHeight: '100vh' }}>
      <Navbar />
      <ScrollSkew>
        <Hero />
        <Marquee />
        <About />
        <Divider />
        <Experience />
        <Divider />
        <Projects />
        <Divider />
        <Persona />
        <Divider />
        <Gallery />
        <Divider />
        <Contact />
      </ScrollSkew>

      {/* ── FOOTER ── */}
      <footer style={{ borderTop: '1px solid var(--line)', padding: '28px 24px' }}>
        <div
          className="footer-inner"
          style={{
            maxWidth: 1200,
            margin: '0 auto',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: 12,
          }}
        >
          <p style={{ fontSize: '.78rem', color: 'var(--text-3)', fontWeight: 300 }}>
            © 2026 Dhanush Kumar R · Bengaluru, India
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 7 }}>
            <span className="status-dot" />
            <span style={{ fontSize: '.75rem', color: 'var(--text-3)', fontWeight: 300 }}>
              Open to TA &amp; HR opportunities
            </span>
          </div>
        </div>
      </footer>
    </main>
  )
}
