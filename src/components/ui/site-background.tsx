'use client'

// Full-site background animations - fixed to viewport, behind all content
// Pure CSS: no canvas, no WebGL, zero flash risk

const PARTICLES = [
  { x: 7,   b: 8,  s: 2, d: 14, dl: 0    },
  { x: 15,  b: 22, s: 3, d: 18, dl: -4.5 },
  { x: 27,  b: 12, s: 2, d: 11, dl: -8   },
  { x: 36,  b: 55, s: 3, d: 20, dl: -2   },
  { x: 46,  b: 6,  s: 2, d: 16, dl: -12  },
  { x: 54,  b: 38, s: 4, d: 22, dl: -6   },
  { x: 63,  b: 70, s: 2, d: 15, dl: -9   },
  { x: 71,  b: 18, s: 3, d: 19, dl: -3   },
  { x: 80,  b: 45, s: 2, d: 13, dl: -15  },
  { x: 88,  b: 62, s: 3, d: 21, dl: -7   },
  { x: 93,  b: 28, s: 2, d: 17, dl: -11  },
  { x: 11,  b: 80, s: 3, d: 24, dl: -5   },
  { x: 33,  b: 88, s: 2, d: 12, dl: -13  },
  { x: 57,  b: 75, s: 3, d: 23, dl: -1   },
  { x: 76,  b: 92, s: 2, d: 10, dl: -16  },
  { x: 42,  b: 30, s: 2, d: 25, dl: -19  },
  { x: 68,  b: 50, s: 3, d: 14, dl: -10  },
  { x: 22,  b: 42, s: 2, d: 28, dl: -22  },
]

export default function SiteBackground() {
  return (
    <div
      aria-hidden
      style={{
        position: 'fixed',
        inset: 0,
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* ── Morphing ambient blobs ── */}
      <div style={{
        position: 'absolute',
        top: '-15%',
        left: '-10%',
        width: 700,
        height: 700,
        background: `radial-gradient(circle, rgba(var(--accent-rgb), 0.07) 0%, transparent 70%)`,
        filter: 'blur(80px)',
        animation: 'blob-float-1 28s ease-in-out infinite',
        willChange: 'transform',
      }} />
      <div style={{
        position: 'absolute',
        bottom: '-20%',
        right: '-12%',
        width: 620,
        height: 620,
        background: `radial-gradient(circle, rgba(var(--accent-rgb), 0.06) 0%, transparent 70%)`,
        filter: 'blur(90px)',
        animation: 'blob-float-2 35s ease-in-out infinite',
        willChange: 'transform',
      }} />
      <div style={{
        position: 'absolute',
        top: '40%',
        right: '20%',
        width: 400,
        height: 400,
        background: `radial-gradient(circle, rgba(var(--accent-rgb), 0.05) 0%, transparent 70%)`,
        filter: 'blur(70px)',
        animation: 'blob-float-3 22s ease-in-out infinite',
        willChange: 'transform',
      }} />

      {/* ── Drifting dot grid ── */}
      <div className="site-dot-grid" />

      {/* ── Noise / grain texture ── */}
      <div className="noise-overlay" />

      {/* ── Rising particles ── */}
      {PARTICLES.map((p, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            left: `${p.x}%`,
            bottom: `${p.b}%`,
            width: p.s,
            height: p.s,
            borderRadius: '50%',
            background: `rgba(var(--accent-rgb), 0.65)`,
            boxShadow: `0 0 ${p.s * 3}px ${p.s}px rgba(var(--accent-rgb), 0.22)`,
            animation: `rise-particle ${p.d}s linear ${p.dl}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
