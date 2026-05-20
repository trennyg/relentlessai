'use client'

import { motion, type Variants } from 'framer-motion'
import React from 'react'

interface HUDCornersProps {
  children: React.ReactNode
  active?: boolean
  className?: string
  color?: string
}

const cornerVariants: Variants = {
  hidden: (corner: string) => ({
    x: corner.includes('right') ? 8 : corner.includes('left') ? -8 : 0,
    y: corner.includes('bottom') ? 8 : corner.includes('top') ? -8 : 0,
    opacity: 0,
  }),
  visible: {
    x: 0,
    y: 0,
    opacity: 1,
    transition: { duration: 0.3, ease: 'easeOut' as const },
  },
}

export function HUDCorners({ children, active = true, className = '', color = 'rgba(212,240,68,0.35)' }: HUDCornersProps) {
  const corners = [
    { id: 'top-left',     style: { top: 0, left: 0 },     h: { top: 0, left: 0 },     v: { top: 0, left: 0 } },
    { id: 'top-right',    style: { top: 0, right: 0 },    h: { top: 0, right: 0 },    v: { top: 0, right: 0 } },
    { id: 'bottom-left',  style: { bottom: 0, left: 0 },  h: { bottom: 0, left: 0 },  v: { bottom: 0, left: 0 } },
    { id: 'bottom-right', style: { bottom: 0, right: 0 }, h: { bottom: 0, right: 0 }, v: { bottom: 0, right: 0 } },
  ]

  return (
    <div className={`relative ${className}`}>
      {active && corners.map((corner, i) => (
        <motion.div
          key={corner.id}
          custom={corner.id}
          variants={cornerVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: i * 0.05 }}
          style={{ position: 'absolute', ...corner.style, pointerEvents: 'none', zIndex: 1 }}
        >
          {/* Horizontal arm */}
          <div style={{
            position: 'absolute',
            ...corner.h,
            width: 12,
            height: 1,
            backgroundColor: color,
          }} />
          {/* Vertical arm */}
          <div style={{
            position: 'absolute',
            ...corner.v,
            width: 1,
            height: 12,
            backgroundColor: color,
          }} />
        </motion.div>
      ))}
      {children}
    </div>
  )
}

export default HUDCorners
