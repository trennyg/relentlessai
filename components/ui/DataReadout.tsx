'use client'

import { motion } from 'framer-motion'
import React from 'react'

interface DataReadoutProps {
  topLeft?: string
  topRight?: string
  bottomLeft?: string
  bottomRight?: string
}

const fadeIn = (delay: number) => ({
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  transition: { delay, duration: 0.4 },
})

const readoutStyle: React.CSSProperties = {
  position: 'absolute',
  fontFamily: 'var(--font-dm-mono)',
  fontSize: '10px',
  color: '#888480',
  pointerEvents: 'none',
  zIndex: 2,
  lineHeight: 1,
  letterSpacing: '0.05em',
}

export default function DataReadout({
  topLeft    = 'SYS: ONLINE',
  topRight   = 'v2.1.0',
  bottomLeft = 'LAT: 18.9752° N',
  bottomRight = 'MUM · IN',
}: DataReadoutProps) {
  return (
    <>
      <motion.span {...fadeIn(0.4)} style={{ ...readoutStyle, top: 6, left: 6 }}>
        {topLeft}
      </motion.span>
      <motion.span {...fadeIn(0.5)} style={{ ...readoutStyle, top: 6, right: 6 }}>
        {topRight}
      </motion.span>
      <motion.span {...fadeIn(0.6)} style={{ ...readoutStyle, bottom: 6, left: 6 }}>
        {bottomLeft}
      </motion.span>
      <motion.span {...fadeIn(0.7)} style={{ ...readoutStyle, bottom: 6, right: 6 }}>
        {bottomRight}
      </motion.span>
    </>
  )
}
