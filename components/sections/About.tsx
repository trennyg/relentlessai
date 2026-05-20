'use client'

import { useReducedMotion, motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { STATS } from '@/lib/constants'

function useCountUp(target: number, duration: number = 1500, active: boolean = false) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let startTime: number | null = null
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3) // ease-out cubic
      setCount(Math.floor(eased * target))
      if (progress < 1) {
        requestAnimationFrame(step)
      }
    }
    requestAnimationFrame(step)
  }, [target, duration, active])

  return count
}

function StatBlock({ stat, active, shouldReduce }: { stat: typeof STATS[0]; active: boolean; shouldReduce: boolean }) {
  // Parse number from stat.number — handle "100%" and "04", "03" etc
  const isPercent = stat.number.includes('%')
  const numericTarget = parseInt(stat.number.replace('%', ''), 10)
  const count = useCountUp(numericTarget, 1500, shouldReduce ? false : active)

  const displayValue = shouldReduce
    ? stat.number
    : (isPercent ? `${active ? count : 0}%` : String(active ? count : 0).padStart(stat.number.length, '0'))

  return (
    <div>
      <p
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          fontSize: 'clamp(3rem, 5vw, 4rem)',
          color: '#D4F044',
          lineHeight: 1,
        }}
      >
        {displayValue}
      </p>
      <p
        className="mt-2 text-sm tracking-wide uppercase"
        style={{
          fontFamily: 'var(--font-dm-mono)',
          color: '#888480',
        }}
      >
        {stat.label}
      </p>
    </div>
  )
}

export default function About() {
  const shouldReduce = useReducedMotion() ?? false
  const statsRef = useRef<HTMLDivElement>(null)
  const statsInView = useInView(statsRef, { once: true, margin: '-100px' })

  return (
    <section
      id="about"
      className="px-6 py-28 md:py-32"
      style={{ backgroundColor: '#080808' }}
    >
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          >
            <p
              className="text-xs tracking-[0.3em] uppercase"
              style={{ fontFamily: 'var(--font-dm-mono)', color: '#D4F044' }}
            >
              Who We Are
            </p>

            <h2
              className="mt-4"
              style={{
                fontFamily: 'var(--font-syne)',
                fontWeight: 700,
                fontSize: 'clamp(1.8rem, 3.5vw, 3rem)',
                color: '#F0EDE6',
                lineHeight: 1.2,
              }}
            >
              We are Relentless AI.<br />A digital product studio.
            </h2>

            <div className="mt-6 space-y-4">
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '18px',
                  color: '#888480',
                  lineHeight: '1.8',
                }}
              >
                We work with ambitious founders, financial firms, and creative professionals to build things that look exceptional and actually work.
              </p>
              <p
                style={{
                  fontFamily: 'var(--font-dm-sans)',
                  fontSize: '18px',
                  color: '#888480',
                  lineHeight: '1.8',
                }}
              >
                We combine high-end design with real AI capability — because your business deserves both. Every project we take on gets our full attention, from the first pixel to the last line of code.
              </p>
            </div>
          </motion.div>

          {/* Right: stats */}
          <div
            ref={statsRef}
            className="grid grid-cols-2 gap-x-8 gap-y-10"
          >
            {STATS.map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-100px' }}
                transition={{ delay: i * 0.1, duration: 0.5 }}
              >
                <StatBlock
                  stat={stat}
                  active={statsInView}
                  shouldReduce={shouldReduce}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
