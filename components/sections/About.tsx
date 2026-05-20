'use client'

import { useRef } from 'react'
import { motion } from 'framer-motion'
import { STATS } from '@/lib/constants'
import { useCountUp } from '@/lib/useCountUp'
import HUDCorners from '@/components/ui/HUDCorners'
import DataReadout from '@/components/ui/DataReadout'
import ScanReveal from '@/components/ui/ScanReveal'
import CircuitBackground from '@/components/ui/CircuitBackground'

const CHARS = '01█▓░⌗'

function StatBlock({ stat }: { stat: typeof STATS[0] }) {
  const isPct  = stat.number.includes('%')
  const target = parseInt(stat.number.replace('%', ''), 10)
  const { count, ref } = useCountUp(target)
  const scrambling = count > 0 && count < target

  const display = isPct
    ? `${count}%`
    : String(count).padStart(stat.number.length, '0')

  return (
    <HUDCorners>
      <div ref={ref} style={{ padding: '20px 14px' }}>
        <p style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 'clamp(2.2rem, 4.5vw, 3.5rem)', color: '#D4F044', lineHeight: 1, fontVariantNumeric: 'tabular-nums', margin: 0 }}>
          {display}
          {scrambling && (
            <span style={{ color: 'rgba(212,240,68,0.25)', fontSize: '0.55em', marginLeft: 2 }}>
              {CHARS[Math.floor(Math.random() * CHARS.length)]}
            </span>
          )}
        </p>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 12, color: '#888480', marginTop: 8, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {stat.label}
        </p>
      </div>
    </HUDCorners>
  )
}

export default function About() {
  return (
    <ScanReveal>
      <section id="about" className="px-6 py-28 md:py-32" style={{ backgroundColor: '#080808', position: 'relative', overflow: 'hidden' }}>
        <CircuitBackground opacity={0.04} animated={true} />
        <DataReadout topLeft="WHO.WE.ARE" topRight="EST. 2024" bottomLeft="MUM · IN" bottomRight="RELENTLESSAIS.COM" />

        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-[3fr_2fr] gap-16 items-center">
            {/* Copy */}
            <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ duration: 0.6 }}>
              <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#D4F044', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 16 }}>
                Who We Are
              </p>
              <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 'clamp(1.8rem, 3.5vw, 3rem)', color: '#F0EDE6', lineHeight: 1.2 }}>
                We are Relentless AIS.<br />A digital product studio.
              </h2>
              <div style={{ marginTop: 24, display: 'flex', flexDirection: 'column', gap: 16 }}>
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 18, color: '#888480', lineHeight: 1.8 }}>
                  We work with ambitious founders, financial firms, and creative professionals to build things that look exceptional and actually work.
                </p>
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 18, color: '#888480', lineHeight: 1.8 }}>
                  We combine high-end design with real AI capability — because your business deserves both. Every project we take on gets our full attention, from the first pixel to the last line of code.
                </p>
              </div>
            </motion.div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-5">
              {STATS.map((stat, i) => (
                <motion.div key={stat.label} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: '-100px' }} transition={{ delay: i * 0.1, duration: 0.5 }}>
                  <StatBlock stat={stat} />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </ScanReveal>
  )
}
