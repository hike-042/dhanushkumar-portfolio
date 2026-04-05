'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const CURTAIN = [0.76, 0, 0.24, 1] as const

export default function PageIntro() {
  const [show, setShow] = useState<boolean | null>(null)

  useEffect(() => {
    const seen = sessionStorage.getItem('arco-intro-seen')
    if (seen) {
      requestAnimationFrame(() => setShow(false))
      return
    }

    requestAnimationFrame(() => setShow(true))
    const t = setTimeout(() => {
      setShow(false)
      sessionStorage.setItem('arco-intro-seen', '1')
    }, 2000)

    return () => clearTimeout(t)
  }, [])

  return (
    <AnimatePresence>
      {(show === null || show) && (
        <motion.div
          key="page-intro"
          initial={{ y: 0 }}
          exit={{ y: '-100%' }}
          transition={{ duration: 0.78, ease: CURTAIN, delay: 0.08 }}
          style={{
            position: 'fixed',
            inset: 0,
            background: '#0a0a0a',
            zIndex: 99999,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 20,
            pointerEvents: 'none',
            overflow: 'hidden',
          }}
        >
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.12 }}
            className="font-fraunces"
            style={{
              fontSize: 'clamp(3rem, 9vw, 5.5rem)',
              fontWeight: 400,
              color: '#f0efec',
              letterSpacing: '-.03em',
              lineHeight: 1,
            }}
          >
            Dhanush<span style={{ color: '#3dba7e', fontStyle: 'italic' }}>.</span>
          </motion.div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5, delay: 0.46 }}
            style={{
              fontSize: '.78rem',
              fontWeight: 300,
              color: '#555',
              letterSpacing: '.16em',
              textTransform: 'uppercase',
            }}
          >
            Kumar R · Portfolio
          </motion.p>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            exit={{ scaleX: 0 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.32 }}
            style={{
              position: 'absolute',
              bottom: '38%',
              width: 48,
              height: 1.5,
              background: '#3dba7e',
              transformOrigin: 'left',
            }}
          />

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 1.72, ease: 'linear', delay: 0.1 }}
            style={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              right: 0,
              height: 2,
              background: '#3dba7e',
              transformOrigin: 'left',
              opacity: 0.7,
            }}
          />

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            style={{
              position: 'absolute',
              top: 28,
              left: 28,
              width: 18,
              height: 18,
              borderTop: '1.5px solid #3dba7e',
              borderLeft: '1.5px solid #3dba7e',
              opacity: 0.5,
            }}
          />
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4, delay: 0.25 }}
            style={{
              position: 'absolute',
              bottom: 28,
              right: 28,
              width: 18,
              height: 18,
              borderBottom: '1.5px solid #3dba7e',
              borderRight: '1.5px solid #3dba7e',
              opacity: 0.5,
            }}
          />
        </motion.div>
      )}
    </AnimatePresence>
  )
}
