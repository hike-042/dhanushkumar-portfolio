'use client'

// Pure CSS floating particles - no canvas, no WebGL, zero flash risk
// Positions are hardcoded (not Math.random) to avoid SSR/hydration mismatch

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

export default function ParticleField() {
  return (
    <div
      aria-hidden
      style={{
        position: 'absolute',
        inset: 0,
        pointerEvents: 'none',
        overflow: 'hidden',
        zIndex: 0,
      }}
    >
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
            background: `rgba(var(--accent-rgb), 0.7)`,
            boxShadow: `0 0 ${p.s * 3}px ${p.s}px rgba(var(--accent-rgb), 0.25)`,
            animation: `rise-particle ${p.d}s linear ${p.dl}s infinite`,
          }}
        />
      ))}
    </div>
  )
}
