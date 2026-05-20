'use client'

import { motion } from 'framer-motion'

const ITEMS =
  'NEXT.JS · GSAP · FRAMER MOTION · GPT-4o · PYTHON · OCR · TAILWIND CSS · TYPESCRIPT · RECHARTS · EMAILJS · NEXT.JS · GSAP · FRAMER MOTION · GPT-4o · PYTHON · OCR · TAILWIND CSS · TYPESCRIPT · RECHARTS · EMAILJS'

export default function Marquee() {
  return (
    <div
      style={{
        width: '100%',
        borderTop: '1px solid #222',
        borderBottom: '1px solid #222',
        paddingTop: 12,
        paddingBottom: 12,
        overflow: 'hidden',
        backgroundColor: '#080808',
      }}
    >
      <motion.div
        animate={{ x: ['0%', '-50%'] }}
        transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
        style={{
          display: 'flex',
          gap: 48,
          whiteSpace: 'nowrap',
          width: 'max-content',
          fontFamily: 'var(--font-dm-mono)',
          fontSize: 11,
          color: '#444444',
          letterSpacing: '0.15em',
        }}
      >
        <span>{ITEMS}</span>
        <span>{ITEMS}</span>
      </motion.div>
    </div>
  )
}
