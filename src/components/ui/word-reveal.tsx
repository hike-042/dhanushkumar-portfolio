'use client'

import { motion } from 'framer-motion'

const ease: [number, number, number, number] = [0.22, 1, 0.36, 1]

interface Props {
  text: string          // use \n for line breaks
  delay?: number
  className?: string
  style?: React.CSSProperties
  stagger?: number
}

/**
 * Splits text into words, each word slides up from behind a clip mask.
 * Classic high-end portfolio heading reveal (Locomotive, Awwwards style).
 */
export default function WordReveal({ text, delay = 0, className, style, stagger = 0.07 }: Props) {
  const lines = text.split('\n').filter(l => l.trim().length > 0)

  const container = {
    hidden: {},
    show: { transition: { staggerChildren: stagger, delayChildren: delay } },
  }

  const wordAnim = {
    hidden: { y: '115%', opacity: 0 },
    show:   { y: '0%',   opacity: 1, transition: { duration: 0.68, ease } },
  }

  return (
    <motion.span
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, margin: '-50px' }}
      className={className}
      style={{ display: 'block', ...style }}
    >
      {lines.map((line, li) => (
        <span key={li} style={{ display: 'block' }}>
          {line.split(' ').filter(w => w).map((word, wi) => (
            <span
              key={wi}
              style={{
                display: 'inline-block',
                overflow: 'hidden',
                verticalAlign: 'bottom',
                lineHeight: 'inherit',
              }}
            >
              <motion.span
                variants={wordAnim}
                style={{ display: 'inline-block', paddingRight: '0.26em' }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </span>
      ))}
    </motion.span>
  )
}
