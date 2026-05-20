'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

// Custom scramble — no paid plugin needed
function scramble(el: HTMLElement, final: string, ms: number, cb?: () => void) {
  const chars = '01█▓░⌗⌀'
  const fps   = 30
  const total = Math.floor((ms / 1000) * fps)
  let frame   = 0
  const id    = setInterval(() => {
    frame++
    const pct      = frame / total
    const revealed = Math.floor(pct * final.length)
    el.textContent = final
      .split('')
      .map((ch, i) => {
        if (ch === ' ') return ' '
        if (i < revealed) return ch
        return chars[Math.floor(Math.random() * chars.length)]
      })
      .join('')
    if (frame >= total) {
      clearInterval(id)
      el.textContent = final
      cb?.()
    }
  }, 1000 / fps)
  return () => clearInterval(id)
}

// Circuit paths — H/V only
const PATHS = [
  { id: 'p0', d: 'M 0 450 H 200 V 350 H 400 V 450 H 600 V 400 H 720',  start: 0,   dur: 0.8 },
  { id: 'p1', d: 'M 200 350 V 200 H 350 V 150 H 500',                   start: 0.3, dur: 0.5 },
  { id: 'p2', d: 'M 400 450 V 550 H 300 V 650 H 500 V 700',             start: 0.5, dur: 0.4 },
  { id: 'p3', d: 'M 720 400 H 900 V 300 H 1100 V 400 H 1300 V 450 H 1440', start: 0.8, dur: 0.7 },
  { id: 'p4', d: 'M 900 300 V 150 H 1050 V 100 H 1200',                 start: 1.0, dur: 0.4 },
  { id: 'p5', d: 'M 1100 400 V 550 H 950 V 650 H 1200 V 750 H 1440',   start: 1.2, dur: 0.5 },
  { id: 'p6', d: 'M 350 150 V 80 H 150 V 30',                           start: 0.6, dur: 0.3 },
  { id: 'p7', d: 'M 300 650 V 800 H 100 V 850',                         start: 0.7, dur: 0.4 },
]

const NODES = [
  [200,350],[400,450],[600,400],[720,400],[900,300],[1100,400],
  [350,150],[300,650],[500,150],[1050,100],[950,650],[1200,750],
  [150,30],[100,850],
]

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef  = useRef<HTMLDivElement>(null)
  const svgRef      = useRef<SVGSVGElement>(null)
  const logoRef     = useRef<HTMLDivElement>(null)
  const statusRef   = useRef<HTMLDivElement>(null)
  const textRef     = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Set up strokeDasharray on each path
    const pathEls: SVGPathElement[] = []
    PATHS.forEach(({ id }) => {
      const el = svg.querySelector<SVGPathElement>(`#${id}`)
      if (!el) return
      const len = el.getTotalLength()
      el.style.strokeDasharray  = `${len}`
      el.style.strokeDashoffset = `${len}`
      pathEls.push(el)
    })

    const tl = gsap.timeline()

    // PHASE 1 — draw each trace
    PATHS.forEach(({ id, start, dur }, i) => {
      const el = svg.querySelector(`#${id}`)
      if (!el) return
      tl.to(el, { strokeDashoffset: 0, duration: dur, ease: 'none' }, start)
      // Fade in component symbols near each path
      tl.to(`.comp-${i}`, { opacity: 1, duration: 0.2 }, start + dur - 0.1)
    })

    // PHASE 2 — node pulse at 2.5s
    tl.to('.node-dot', {
      scale: 1.5, transformOrigin: 'center center',
      fill: 'white',
      duration: 0.1,
      stagger: 0.03,
    }, 2.5)
    tl.to('.node-dot', {
      scale: 1,
      fill: '#D4F044',
      duration: 0.2,
      stagger: 0.03,
    }, 2.7)

    // PHASE 3 — circuit dims at 2.8s
    tl.to('.circuit-trace', { opacity: 0.15, duration: 0.2 }, 2.8)

    // PHASE 4 — logo appears at 3.0s
    tl.to(logoRef.current, { opacity: 1, duration: 0.15 }, 3.0)
    tl.add(() => {
      if (textRef.current) scramble(textRef.current, 'RELENTLESS AIS', 700)
    }, 3.0)
    tl.to(statusRef.current, { opacity: 1, duration: 0.2 }, 3.6)

    // PHASE 5 — fade out at 4.0s
    tl.to(overlayRef.current, { opacity: 0, duration: 0.4 }, 4.0)
    tl.add(() => {
      document.body.classList.add('loader-complete')
      onComplete()
    }, 4.4)

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div
      ref={overlayRef}
      style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#080808', overflow: 'hidden' }}
    >
      {/* Circuit SVG */}
      <svg
        ref={svgRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        {/* Traces */}
        {PATHS.map(({ id, d }) => (
          <path
            key={id}
            id={id}
            d={d}
            className="circuit-trace"
            stroke="#D4F044"
            strokeWidth="1"
            fill="none"
            opacity="0.7"
          />
        ))}

        {/* Junction nodes */}
        {NODES.map(([cx, cy], i) => (
          <circle key={i} className="node-dot" cx={cx} cy={cy} r="3.5" fill="#D4F044" />
        ))}

        {/* IC-01 component at center */}
        <g className="comp-0" opacity="0">
          <rect x="680" y="380" width="80" height="40" stroke="#D4F044" strokeWidth="1" fill="#0a0a0a" />
          <text x="720" y="405" textAnchor="middle" fill="#D4F044" fontSize="11" fontFamily="monospace">IC-01</text>
        </g>

        {/* PWR */}
        <g className="comp-1" opacity="0">
          <circle cx="350" cy="150" r="8" stroke="#D4F044" strokeWidth="1" fill="none" />
          <text x="350" y="133" textAnchor="middle" fill="#D4F044" fontSize="9" fontFamily="monospace">PWR</text>
        </g>

        {/* CLK */}
        <g className="comp-3" opacity="0">
          <rect x="950" y="270" width="60" height="28" stroke="#D4F044" strokeWidth="1" fill="#0a0a0a" />
          <text x="980" y="289" textAnchor="middle" fill="#D4F044" fontSize="10" fontFamily="monospace">CLK</text>
        </g>

        {/* GND */}
        <g className="comp-7" opacity="0">
          <line x1="135" y1="800" x2="165" y2="800" stroke="#D4F044" strokeWidth="1.5" />
          <line x1="140" y1="806" x2="160" y2="806" stroke="#D4F044" strokeWidth="1.2" />
          <line x1="145" y1="812" x2="155" y2="812" stroke="#D4F044" strokeWidth="0.9" />
          <text x="150" y="793" textAnchor="middle" fill="#D4F044" fontSize="9" fontFamily="monospace">GND</text>
        </g>
      </svg>

      {/* Logo — centered over IC-01 */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center',
          opacity: 0,
          zIndex: 2,
        }}
      >
        <div style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 800,
          fontSize: 32,
          color: '#F0EDE6',
          letterSpacing: '0.04em',
          whiteSpace: 'nowrap',
          textShadow: '0 0 20px rgba(212,240,68,0.3)',
        }}>
          <span ref={textRef}>░░░░░░░░░░░░░░░</span>
        </div>
        <div
          ref={statusRef}
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: 11,
            color: '#D4F044',
            letterSpacing: '0.3em',
            marginTop: 14,
            opacity: 0,
          }}
        >
          SYSTEM ONLINE
        </div>
      </div>

      {/* Corner HUD brackets */}
      {[
        { top: 24, left: 24 },
        { top: 24, right: 24 },
        { bottom: 24, left: 24 },
        { bottom: 24, right: 24 },
      ].map((pos, i) => {
        const isRight  = 'right'  in pos
        const isBottom = 'bottom' in pos
        return (
          <div key={i} style={{ position: 'absolute', ...pos as React.CSSProperties }}>
            <div style={{ position: 'absolute', [isBottom ? 'bottom' : 'top']: 0, [isRight ? 'right' : 'left']: 0, width: 24, height: 2, background: '#D4F044' }} />
            <div style={{ position: 'absolute', [isBottom ? 'bottom' : 'top']: 0, [isRight ? 'right' : 'left']: 0, width: 2, height: 24, background: '#D4F044' }} />
          </div>
        )
      })}

      {/* Data readouts */}
      {[
        { style: { top: 28, left: 56 },    text: 'SYS: INITIALIZING' },
        { style: { top: 28, right: 56 },   text: 'v2.1.0 // 2025' },
        { style: { bottom: 28, left: 56 }, text: 'LAT: 18.9752° N · LON: 72.8258° E' },
        { style: { bottom: 28, right: 56 },text: 'STATUS: LOADING...' },
      ].map(({ style, text }) => (
        <div key={text} style={{
          position: 'absolute',
          fontFamily: 'var(--font-dm-mono)',
          fontSize: 10,
          color: '#888480',
          letterSpacing: '0.1em',
          ...style as React.CSSProperties,
        }}>
          {text}
        </div>
      ))}
    </div>
  )
}
