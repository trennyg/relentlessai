'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { SERVICES } from '@/lib/constants'
import HUDCorners from '@/components/ui/HUDCorners'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

const MODULE_NAMES = ['BRAND.WEBSITES', 'AI.DASHBOARDS', 'AUTOMATION.PIPES']

// ── Mockups ──────────────────────────────────────────────────

function BrandMockup() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', padding: 32 }}>
      <span style={{ position: 'absolute', top: 14, right: 18, fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#555' }}>LAYOUT.DRAFT</span>
      <svg width="100%" height="100%" viewBox="0 0 400 280" preserveAspectRatio="xMidYMid meet">
        <defs>
          <pattern id="g1" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M20 0L0 0 0 20" fill="none" stroke="rgba(212,240,68,0.05)" strokeWidth="0.5" />
          </pattern>
        </defs>
        <rect width="400" height="280" fill="url(#g1)" />
        {/* Nav */}
        <rect x="8" y="8"   width="384" height="26" rx="1" fill="none" stroke="#2A2A2A" strokeWidth="1" />
        <rect x="16" y="15" width="36"  height="10" rx="1" fill="#D4F044" opacity="0.7" />
        <rect x="310" y="15" width="24" height="10" rx="1" fill="none" stroke="#333" strokeWidth="1" />
        <rect x="342" y="15" width="24" height="10" rx="1" fill="none" stroke="#333" strokeWidth="1" />
        <rect x="374" y="15" width="14" height="10" rx="1" fill="none" stroke="#D4F044" strokeWidth="1" />
        {/* Hero */}
        <rect x="8" y="42" width="384" height="100" rx="1" fill="none" stroke="#2A2A2A" strokeWidth="1" />
        <text x="200" y="95" textAnchor="middle" fill="#2A2A2A" fontFamily="monospace" fontSize="10">HERO</text>
        <rect x="148" y="105" width="52" height="14" rx="1" fill="#D4F044" opacity="0.65" />
        <rect x="208" y="105" width="52" height="14" rx="1" fill="none" stroke="#333" strokeWidth="1" />
        {/* Cols */}
        <rect x="8"   y="150" width="184" height="64" rx="1" fill="none" stroke="#2A2A2A" strokeWidth="1" />
        <rect x="200" y="150" width="192" height="64" rx="1" fill="none" stroke="#2A2A2A" strokeWidth="1" />
        {[162,172,182,192].map(y => <rect key={y} x="18"  y={y} width={60 + (y % 3) * 20} height="3" rx="1" fill="#1E1E1E" />)}
        {[162,172,182,192].map(y => <rect key={`r${y}`} x="210" y={y} width={50 + (y % 4) * 18} height="3" rx="1" fill="#1E1E1E" />)}
        {/* Footer */}
        <rect x="8" y="222" width="384" height="22" rx="1" fill="none" stroke="#1E1E1E" strokeWidth="1" />
      </svg>
    </div>
  )
}

function DashMockup() {
  const [vals, setVals] = useState({ aum: 142.3, pnl: 8.7 })
  useEffect(() => {
    const t = setInterval(() => setVals({ aum: 138 + Math.random() * 10, pnl: 6.5 + Math.random() * 4 }), 2000)
    return () => clearInterval(t)
  }, [])

  const pts = [[0,75],[40,48],[80,60],[120,28],[160,42],[200,18],[240,38],[280,12],[320,32],[360,8]]
  const path = pts.map((p, i) => `${i === 0 ? 'M' : 'L'}${p[0]},${p[1]}`).join(' ')
  const area = `${path} L360,90 L0,90 Z`

  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', padding: 28 }}>
      <span style={{ position: 'absolute', top: 14, right: 18, fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#555' }}>PORTFOLIO.INTEL</span>
      <div style={{ height: '100%', display: 'flex', flexDirection: 'column', gap: 14 }}>
        <div style={{ flex: 1, border: '1px solid #1E1E1E', padding: 12 }}>
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 9, color: '#555', marginBottom: 8 }}>P&L PERFORMANCE</div>
          <svg width="100%" height="80" viewBox="0 0 360 90" preserveAspectRatio="none">
            <defs>
              <linearGradient id="cg" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="rgba(212,240,68,0.25)" />
                <stop offset="100%" stopColor="rgba(212,240,68,0)" />
              </linearGradient>
            </defs>
            <path d={area} fill="url(#cg)" />
            <path d={path} fill="none" stroke="#D4F044" strokeWidth="1.5" />
            {pts.map((p, i) => <circle key={i} cx={p[0]} cy={p[1]} r="2" fill="#D4F044" />)}
          </svg>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
          <div style={{ border: '1px solid #1E1E1E', padding: '10px 12px' }}>
            <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 9, color: '#555' }}>AUM</div>
            <div style={{ fontFamily: 'var(--font-syne)', fontSize: 20, color: '#F0EDE6', fontWeight: 700 }}>${vals.aum.toFixed(1)}M</div>
          </div>
          <div style={{ border: '1px solid #1E1E1E', padding: '10px 12px' }}>
            <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 9, color: '#555' }}>P&L</div>
            <div style={{ fontFamily: 'var(--font-syne)', fontSize: 20, color: '#D4F044', fontWeight: 700 }}>+{vals.pnl.toFixed(1)}%</div>
          </div>
        </div>
        <div style={{ border: '1px solid #1E1E1E', padding: '10px 12px' }}>
          <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 9, color: '#555', marginBottom: 6 }}>AI ANALYSIS</div>
          <div style={{ height: 4, background: '#1A1A1A', borderRadius: 2 }}>
            <div className="shimmer-bar" style={{ height: '100%', width: '82%', borderRadius: 2 }} />
          </div>
        </div>
      </div>
    </div>
  )
}

function PipelineMockup() {
  return (
    <div style={{ position: 'relative', width: '100%', height: '100%', padding: 28, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <span style={{ position: 'absolute', top: 14, right: 18, fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#555' }}>PIPELINE.ACTIVE</span>
      <svg width="100%" height="160" viewBox="0 0 420 160">
        {[
          { x: 20,  label: 'DOCUMENT',   sub: 'INPUT' },
          { x: 160, label: 'OCR.ENGINE', sub: 'PROCESS' },
          { x: 300, label: 'REPORT',     sub: 'OUTPUT' },
        ].map((box, i) => (
          <g key={i}>
            <rect x={box.x} y={45} width={100} height={56} rx="2" fill="#0E0E0E" stroke="#2A2A2A" strokeWidth="1" />
            <text x={box.x + 50} y={73}  textAnchor="middle" fill="#F0EDE6" fontFamily="monospace" fontSize="9" fontWeight="bold">{box.label}</text>
            <text x={box.x + 50} y={87}  textAnchor="middle" fill="#555"    fontFamily="monospace" fontSize="8">{box.sub}</text>
            <circle cx={box.x + 87} cy={52} r="3.5" fill="#D4F044">
              <animate attributeName="opacity" values="1;0.2;1" dur="1.4s" begin={`${i * 0.45}s`} repeatCount="indefinite" />
            </circle>
          </g>
        ))}
        <line x1="120" y1="73" x2="157" y2="73" stroke="#D4F044" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="16;0" dur="0.5s" repeatCount="indefinite" />
        </line>
        <polygon points="154,69 162,73 154,77" fill="#D4F044" />
        <line x1="260" y1="73" x2="297" y2="73" stroke="#D4F044" strokeWidth="1" strokeDasharray="4 4">
          <animate attributeName="stroke-dashoffset" values="16;0" dur="0.5s" repeatCount="indefinite" />
        </line>
        <polygon points="294,69 302,73 294,77" fill="#D4F044" />
      </svg>
    </div>
  )
}

const MOCKUPS = [BrandMockup, DashMockup, PipelineMockup]

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
      end: '+=200%',
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

  const Mockup  = MOCKUPS[active]
  const service = SERVICES[active]

  return (
    <section
      ref={sectionRef}
      id="services"
      style={{ height: '100vh', backgroundColor: '#080808', display: 'flex', alignItems: 'stretch', overflow: 'hidden' }}
    >
      {/* LEFT — 40% */}
      <div style={{ width: '40%', borderRight: '1px solid #222', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '0 40px' }}>
        <HUDCorners>
          <div style={{ padding: '28px 0' }}>
            <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#D4F044', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 28 }}>
              WHAT WE DO
            </p>

            {/* Module list */}
            <div style={{ marginBottom: 32 }}>
              {SERVICES.map((s, i) => {
                const on = i === active
                return (
                  <div key={s.title} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 0', borderBottom: '1px solid #141414' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#444' }}>{String(i + 1).padStart(2, '0')}</span>
                      <span style={{ fontFamily: 'var(--font-syne)', fontSize: 16, fontWeight: 700, color: on ? '#F0EDE6' : '#2A2A2A', transition: 'color 0.3s' }}>{MODULE_NAMES[i]}</span>
                    </div>
                    <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: on ? '#D4F044' : '#2A2A2A', transition: 'color 0.3s' }}>{on ? '● ACTIVE' : '○ STANDBY'}</span>
                  </div>
                )
              })}
            </div>

            {/* Description */}
            <AnimatePresence mode="wait">
              <motion.div key={active} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.25 }}>
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
        <AnimatePresence>
          {scanning && (
            <motion.div key="scan" initial={{ top: -1 }} animate={{ top: '100%' }} transition={{ duration: 0.3, ease: 'linear' }}
              style={{ position: 'absolute', left: 0, width: '100%', height: 1, background: '#D4F044', boxShadow: '0 0 8px #D4F044', zIndex: 10, pointerEvents: 'none' }}
            />
          )}
        </AnimatePresence>
        <div className="grid-bg" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <AnimatePresence mode="wait">
          <motion.div key={active} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2, delay: 0.15 }} style={{ position: 'absolute', inset: 0 }}>
            <Mockup />
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
