'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface ScanRevealProps {
  children: React.ReactNode
  delay?: number
  className?: string
}

export default function ScanReveal({ children, delay = 0, className = '' }: ScanRevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [triggered, setTriggered] = useState(false)
  const [showChildren, setShowChildren] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !triggered) {
          setTimeout(() => {
            setTriggered(true)
            // After sweep (300ms) reveal children
            setTimeout(() => setShowChildren(true), 320)
          }, delay * 1000)
        }
      },
      { threshold: 0.2 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [delay, triggered])

  return (
    <div ref={ref} className={`relative overflow-hidden ${className}`}>
      {/* Scan line sweep */}
      <AnimatePresence>
        {triggered && !showChildren && (
          <motion.div
            key="scan"
            initial={{ top: '-2px' }}
            animate={{ top: '100%' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'linear' }}
            style={{
              position: 'absolute',
              left: 0,
              width: '100%',
              height: '1px',
              background: '#D4F044',
              boxShadow: '0 0 8px #D4F044',
              pointerEvents: 'none',
              zIndex: 10,
            }}
          />
        )}
      </AnimatePresence>

      {/* Children reveal */}
      <motion.div
        animate={{ opacity: showChildren ? 1 : 0 }}
        transition={{ duration: 0.2 }}
        initial={{ opacity: 0 }}
      >
        {children}
      </motion.div>
    </div>
  )
}
