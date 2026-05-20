'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '@/lib/constants'
import HUDCorners from '@/components/ui/HUDCorners'
import CircuitBackground from '@/components/ui/CircuitBackground'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const MODULE_NAMES = ['BRAND.WEBSITES', 'AI.DASHBOARDS', 'AUTOMATION.PIPES']

// ── Browser frame wrapper ──────────────────────────────────
function BrowserFrame({
  src, alt, url, style, className = '',
}: {
  src: string; alt: string; url: string; style?: React.CSSProperties; className?: string
}) {
  return (
    <HUDCorners size={6}>
      <div style={{ overflow: 'hidden', border: '1px solid #2a2a2a', ...style }} className={className}>
        {/* Chrome bar */}
        <div style={{ height: 30, background: '#151515', borderBottom: '1px solid #2a2a2a', display: 'flex', alignItems: 'center', padding: '0 10px', gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
          <span style={{ width: 7, height: 7, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
          <div style={{ flex: 1, height: 16, background: '#0d0d0d', borderRadius: 3, margin: '0 8px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 9, color: '#444' }}>{url}</span>
          </div>
        </div>
        {/* Screenshot */}
        <div style={{ position: 'relative', aspectRatio: '16/10', overflow: 'hidden' }}>
          <Image src={src} alt={alt} fill className="object-cover object-top" sizes="60vw" />
        </div>
      </div>
    </HUDCorners>
  )
}

// ── Panel 1 — Brand Websites ───────────────────────────────
function BrandPanel({ active }: { active: boolean }) {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', padding: 32, display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: 14, right: 18, fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#444' }}>LAYOUT.DRAFT</span>

      {/* Frame 1 — Ron Ashton (larger, behind) */}
      <motion.div
        initial={{ x: 60, opacity: 0 }}
        animate={active ? { x: 0, opacity: 1 } : { x: 60, opacity: 0 }}
        transition={{ duration: 0.5, ease: 'easeOut' }}
        style={{ width: '88%', zIndex: 1, position: 'relative' }}
      >
        <BrowserFrame
          src="/images/ron-pereira.png"
          alt="Ron Ashton Music"
          url="ron-pereira.vercel.app"
        />
      </motion.div>

      {/* Frame 2 — JAAN (smaller, overlapping) */}
      <motion.div
        initial={{ x: 80, opacity: 0 }}
        animate={active ? { x: 0, opacity: 1 } : { x: 80, opacity: 0 }}
        transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        style={{ width: '55%', position: 'absolute', bottom: 32, right: 24, zIndex: 2, transform: 'rotate(-2deg)' }}
      >
        <BrowserFrame
          src="/images/jaan-hero.png"
          alt="JAAN Perfumes"
          url="jaan-pied.vercel.app"
        />
      </motion.div>
    </div>
  )
}

// ── Panel 2 — AI Dashboards ────────────────────────────────
function DashPanel({ active }: { active: boolean }) {
  const annotations = [
    { text: '← LIVE AUM TRACKING',          top: '18%', left: '4%',  delay: 0.0 },
    { text: '← GPT-4o PORTFOLIO ANALYSIS',  top: '42%', left: '4%',  delay: 0.3 },
    { text: '← REAL-TIME TRADE MONITORING', top: '70%', left: '4%',  delay: 0.6 },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', padding: 32, display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      <span style={{ position: 'absolute', top: 14, right: 18, fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#444' }}>PORTFOLIO.INTEL</span>

      <motion.div
        initial={{ x: 40, opacity: 0 }}
        animate={active ? { x: 0, opacity: 1 } : { x: 40, opacity: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: '75%', position: 'relative', zIndex: 1 }}
      >
        <BrowserFrame
          src="/images/ares-dashboard.png"
          alt="Portfolio Intelligence Dashboard"
          url="portfolio.intelligence.dashboard"
        />
      </motion.div>

      {/* Annotation pills */}
      {annotations.map((ann, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, x: -10 }}
          animate={active ? { opacity: 1, x: 0 } : { opacity: 0, x: -10 }}
          transition={{ delay: 0.4 + ann.delay, duration: 0.3 }}
          style={{ position: 'absolute', top: ann.top, left: ann.left, zIndex: 3 }}
        >
          <div style={{
            background: 'rgba(0,0,0,0.85)',
            border: '1px solid #D4F044',
            padding: '4px 10px',
            fontFamily: 'var(--font-dm-mono)',
            fontSize: 9,
            color: '#D4F044',
            whiteSpace: 'nowrap',
          }}>
            {ann.text}
          </div>
        </motion.div>
      ))}
    </div>
  )
}

// ── Panel 3 — Automation Pipeline ─────────────────────────
function PipelinePanel({ active }: { active: boolean }) {
  const [scanPos, setScanPos] = useState(0)

  useEffect(() => {
    if (!active) return
    const id = setInterval(() => setScanPos(p => (p + 1) % 5), 800)
    return () => clearInterval(id)
  }, [active])

  const nodes = [
    { label: 'DOCUMENTS',     sub: ['PAN Card', 'Bank Stmt', 'ITR Filing'], icon: '📄' },
    { label: 'OCR ENGINE',    sub: ['EXTRACTING...'],                         icon: '⌖' },
    { label: 'DATA EXTRACT',  sub: ['NAME ████', 'DOB  ████', 'PAN  ████'],  icon: '≡' },
    { label: 'RISK SCORING',  sub: ['SCORE: LOW RISK'],                       icon: '◎' },
    { label: 'REPORT',        sub: ['✓ VERIFIED', 'Gen: 4.2s'],               icon: '✓' },
  ]

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 24 }}>
      <span style={{ position: 'absolute', top: 14, right: 18, fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#444' }}>PIPELINE.ACTIVE</span>

      <div style={{ display: 'flex', alignItems: 'center', gap: 0, width: '100%', justifyContent: 'center' }}>
        {nodes.map((node, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center' }}>
            {/* Node */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: i * 0.18, duration: 0.4 }}
            >
              <HUDCorners size={5}>
                <div style={{
                  width: 80,
                  minHeight: 90,
                  background: '#0e0e0e',
                  border: `1px solid ${scanPos === i ? '#D4F044' : '#222'}`,
                  padding: '10px 8px',
                  textAlign: 'center',
                  transition: 'border-color 0.3s',
                }}>
                  <div style={{ fontSize: 18, marginBottom: 4 }}>{node.icon}</div>
                  <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 8, color: '#D4F044', marginBottom: 6, letterSpacing: '0.05em' }}>{node.label}</div>
                  {node.sub.map(s => (
                    <div key={s} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 7, color: '#888480', lineHeight: 1.6 }}>{s}</div>
                  ))}
                  {/* Status dot */}
                  <div style={{ width: 5, height: 5, borderRadius: '50%', background: '#D4F044', margin: '6px auto 0', animation: 'pulseDot 1.2s ease-in-out infinite', animationDelay: `${i * 0.2}s` }} />
                </div>
              </HUDCorners>
            </motion.div>

            {/* Arrow */}
            {i < nodes.length - 1 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={active ? { opacity: 1 } : { opacity: 0 }}
                transition={{ delay: i * 0.18 + 0.3, duration: 0.3 }}
                style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2, width: 32 }}
              >
                <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 7, color: '#444' }}>
                  {['UPLOAD','PROCESS','VERIFY','GENERATE'][i]}
                </div>
                <svg width="32" height="10" viewBox="0 0 32 10">
                  <line x1="0" y1="5" x2="26" y2="5" stroke="#D4F044" strokeWidth="1" strokeDasharray="4 3">
                    <animate attributeName="stroke-dashoffset" values="14;0" dur="0.7s" repeatCount="indefinite" />
                  </line>
                  <polygon points="24,2 32,5 24,8" fill="#D4F044" />
                </svg>
              </motion.div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

const PANELS = [BrandPanel, DashPanel, PipelinePanel]

// ── Main ─────────────────────────────────────────────────────
export default function Services() {
  const sectionRef = useRef<HTMLElement>(null)
  const [active,   setActive]   = useState(0)
  const [scanning, setScanning] = useState(false)

  useEffect(() => {
    const section = sectionRef.current
    if (!section) return

    const st = ScrollTrigger.create({
      trigger: section,
      start: 'top top',
      end: '+=300%',
      pin: true,
      onUpdate: self => {
        const next = self.progress < 0.33 ? 0 : self.progress < 0.66 ? 1 : 2
        setActive(prev => {
          if (next !== prev) { setScanning(true); setTimeout(() => setScanning(false), 360) }
          return next
        })
      },
    })
    return () => st.kill()
  }, [])

  const Panel   = PANELS[active]
  const service = SERVICES[active]

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ height: '100vh', backgroundColor: '#080808', display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}
    >
      {/* LEFT — 40% */}
      <div style={{ width: '40%', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px', position: 'relative', overflow: 'hidden' }}>
        <CircuitBackground opacity={0.05} animated={true} />

        <HUDCorners>
          <div style={{ padding: '28px 0', position: 'relative', zIndex: 1 }}>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#D4F044', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 28 }}>
              WHAT WE DO
            </p>

            {SERVICES.map((s, i) => {
              const on = i === active
              return (
                <div key={s.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '13px 0', borderBottom: '1px solid #141414' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#444' }}>{String(i + 1).padStart(2, '0')}</span>
                    <span style={{ fontFamily: 'var(--font-syne)', fontSize: 16, fontWeight: 700, color: on ? '#F0EDE6' : '#2A2A2A', transition: 'color 0.3s' }}>{MODULE_NAMES[i]}</span>
                  </div>
                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: on ? '#D4F044' : '#2A2A2A', transition: 'color 0.3s' }}>{on ? '● ACTIVE' : '○ STANDBY'}</span>
                </div>
              )
            })}

            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }} style={{ marginTop: 24 }}>
                <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 13, color: '#888480', lineHeight: 1.7, marginBottom: 14 }}>{service.body}</p>
                <div style={{ borderTop: '1px solid #141414', paddingTop: 14 }}>
                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#555', letterSpacing: '0.1em' }}>TARGET: </span>
                  <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#3A3A3A' }}>{service.forList.join(' · ')}</span>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </HUDCorners>
      </div>

      {/* RIGHT — 60% */}
      <div style={{ width: '60%', position: 'relative', overflow: 'hidden', backgroundColor: '#050505' }}>
        {/* Scan sweep on module change */}
        <AnimatePresence>
          {scanning && (
            <motion.div key="scan" initial={{ top: -1 }} animate={{ top: '100%' }} transition={{ duration: 0.3, ease: 'linear' }}
              style={{ position: 'absolute', left: 0, width: '100%', height: 1, background: '#D4F044', boxShadow: '0 0 8px #D4F044', zIndex: 10, pointerEvents: 'none' }}
            />
          )}
        </AnimatePresence>

        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.3 }} />

        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0.15 }} style={{ position: 'absolute', inset: 0 }}>
            <Panel active={true} />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
