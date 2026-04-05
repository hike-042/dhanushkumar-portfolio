'use client'

interface Props {
  href: string
  children: React.ReactNode
}

/**
 * Animated pill button - circle expands on hover with arrow slide effect.
 * Adapted from Uiverse.io (gharsh11032000). Colors use portfolio design tokens.
 */
export default function AnimatedCTA({ href, children }: Props) {
  return (
    <a href={href} className="animated-cta">
      {/* Left arrow - slides in from left on hover */}
      <svg className="arr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>

      {/* Label */}
      <span className="cta-text">{children}</span>

      {/* Circle that expands to fill the button */}
      <span className="cta-circle" />

      {/* Right arrow - slides out on hover */}
      <svg className="arr-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path d="M16.1716 10.9999L10.8076 5.63589L12.2218 4.22168L20 11.9999L12.2218 19.778L10.8076 18.3638L16.1716 12.9999H4V10.9999H16.1716Z" />
      </svg>
    </a>
  )
}
