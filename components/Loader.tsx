'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

function scramble(el: HTMLElement, final: string, ms: number, cb?: () => void) {
  const chars = '01█▓░⌗⌀'
  const fps = 30
  const total = Math.floor((ms / 1000) * fps)
  let frame = 0
  const id = setInterval(() => {
    frame++
    const pct = frame / total
    const revealed = Math.floor(pct * final.length)
    el.textContent = final.split('').map((ch, i) => {
      if (ch === ' ') return ' '
      if (i < revealed) return ch
      return chars[Math.floor(Math.random() * chars.length)]
    }).join('')
    if (frame >= total) { clearInterval(id); el.textContent = final; cb?.() }
  }, 1000 / fps)
  return () => clearInterval(id)
}

// CPU centered at (720, 450), 120×120
// Traces start at chip pin positions and radiate outward
const DRAW_PATHS: Array<{ id: string; d: string; start: number; dur: number; color?: string }> = [
  // NORTH — from chip top edge (y=390)
  { id: 'N1', d: 'M 680 390 V 300 H 600 V 200 H 400 V 100 H 200 V 0',       start: 0,    dur: 0.70 },
  { id: 'N2', d: 'M 720 390 V 250 H 800 V 150 H 1000 V 50 H 1200 V 0',      start: 0.05, dur: 0.72 },
  { id: 'N3', d: 'M 760 390 V 320 H 900 V 180 H 1100 V 80 H 1440',          start: 0.10, dur: 0.68 },
  { id: 'N4', d: 'M 700 390 V 280 H 500 V 160 H 300 V 60 H 0',              start: 0.08, dur: 0.65 },
  // SOUTH — from chip bottom edge (y=510)
  { id: 'S1', d: 'M 680 510 V 600 H 500 V 680 H 300 V 780 H 100 V 900',     start: 0.02, dur: 0.70 },
  { id: 'S2', d: 'M 720 510 V 620 H 900 V 720 H 1100 V 820 H 1300 V 900',   start: 0.06, dur: 0.72 },
  { id: 'S3', d: 'M 760 510 V 580 H 600 V 700 H 400 V 800 H 200 V 900',     start: 0.12, dur: 0.68 },
  { id: 'S4', d: 'M 700 510 V 650 H 1000 V 750 H 1200 V 850 H 1440',        start: 0.09, dur: 0.65 },
  // EAST — from chip right edge (x=780)
  { id: 'E1', d: 'M 780 430 H 900 V 350 H 1050 V 280 H 1200 V 200 H 1440',  start: 0.04, dur: 0.65 },
  { id: 'E2', d: 'M 780 450 H 1000 V 400 H 1150 V 500 H 1300 V 450 H 1440', start: 0.08, dur: 0.68 },
  { id: 'E3', d: 'M 780 470 H 950 V 550 H 1100 V 620 H 1300 V 700 H 1440',  start: 0.13, dur: 0.62 },
  { id: 'E4', d: 'M 780 440 H 850 V 300 H 1050 V 180 H 1440',               start: 0.06, dur: 0.60 },
  // WEST — from chip left edge (x=660)
  { id: 'W1', d: 'M 660 430 H 500 V 350 H 350 V 250 H 200 V 150 H 0',       start: 0.03, dur: 0.65 },
  { id: 'W2', d: 'M 660 450 H 450 V 500 H 300 V 400 H 150 V 450 H 0',       start: 0.07, dur: 0.68 },
  { id: 'W3', d: 'M 660 470 H 400 V 580 H 250 V 650 H 100 V 700 H 0',       start: 0.11, dur: 0.62 },
  { id: 'W4', d: 'M 660 440 H 520 V 300 H 380 V 200 H 0',                   start: 0.05, dur: 0.60 },
  // CROSS CONNECTIONS
  { id: 'C1', d: 'M 200 200 H 400',                               start: 0.50, dur: 0.20, color: '#88CC11' },
  { id: 'C2', d: 'M 800 150 H 1000',                              start: 0.55, dur: 0.20, color: '#88CC11' },
  { id: 'C3', d: 'M 300 650 H 600',                               start: 0.52, dur: 0.20, color: '#88CC11' },
  { id: 'C4', d: 'M 1000 400 H 1200',                             start: 0.58, dur: 0.18, color: '#88CC11' },
  { id: 'C5', d: 'M 150 400 H 300',                               start: 0.54, dur: 0.18, color: '#88CC11' },
  { id: 'C6', d: 'M 500 700 H 800 V 750 H 1100',                  start: 0.60, dur: 0.25, color: '#88CC11' },
  // FINE TRACES
  { id: 'F1', d: 'M 600 200 V 150 H 700 V 80',   start: 0.65, dur: 0.18, color: '#AADD22' },
  { id: 'F2', d: 'M 1000 300 H 1100 V 200 H 1200 V 120', start: 0.68, dur: 0.20, color: '#AADD22' },
  { id: 'F3', d: 'M 400 580 H 300 V 650',         start: 0.63, dur: 0.15, color: '#AADD22' },
  { id: 'F4', d: 'M 900 620 H 1000 V 700 H 1100', start: 0.70, dur: 0.18, color: '#AADD22' },
  { id: 'F5', d: 'M 250 300 H 150 V 400',         start: 0.62, dur: 0.15, color: '#AADD22' },
  { id: 'F6', d: 'M 450 750 H 600 V 800',         start: 0.72, dur: 0.15, color: '#AADD22' },
]

// Main traces get pulse dots (native SVG animateMotion, no GSAP plugin needed)
const PULSE_TRACES = ['N1','N2','S1','S2','E1','E2','W1','W2']
const PULSE_DURS   = [1.8, 2.1, 1.6, 2.3, 1.9, 2.0, 1.7, 2.2]
const PULSE_DELAYS = [0.0, 0.4, 0.8, 1.2, 0.3, 0.9, 0.6, 1.5]

// All junction nodes
const NODES: [number,number][] = [
  [680,300],[600,200],[400,100],[200,100],
  [720,250],[800,150],[1000,50],[1200,50],
  [760,320],[900,180],[1100,80],
  [700,280],[500,160],[300,60],
  [680,600],[500,680],[300,780],
  [720,620],[900,720],[1100,820],
  [760,580],[600,700],[400,800],
  [700,650],[1000,750],[1200,850],
  [900,350],[1050,280],[1200,200],
  [1000,400],[1150,500],[1300,450],
  [950,550],[1100,620],[1300,700],
  [850,300],[1050,180],
  [500,350],[350,250],[200,150],
  [450,500],[300,400],[150,450],
  [400,580],[250,650],[100,700],
  [520,300],[380,200],
]

// CPU chip pin positions
const topPins    = [669,684,699,714,729,744,759,774].map(x => ({ x1:x, y1:390, x2:x, y2:376 }))
const bottomPins = [669,684,699,714,729,744,759,774].map(x => ({ x1:x, y1:510, x2:x, y2:524 }))
const leftPins   = [399,414,429,444,459,474,489,504].map(y => ({ x1:660, y1:y, x2:646, y2:y }))
const rightPins  = [399,414,429,444,459,474,489,504].map(y => ({ x1:780, y1:y, x2:794, y2:y }))
const allPins    = [...topPins, ...bottomPins, ...leftPins, ...rightPins]

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef = useRef<HTMLDivElement>(null)
  const svgRef     = useRef<SVGSVGElement>(null)
  const logoRef    = useRef<HTMLDivElement>(null)
  const statusRef  = useRef<HTMLDivElement>(null)
  const textRef    = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const svg = svgRef.current
    if (!svg) return

    // Set strokeDasharray on animated draw paths
    DRAW_PATHS.forEach(({ id }) => {
      const glowEl = svg.querySelector<SVGPathElement>(`#${id}-glow`)
      const coreEl = svg.querySelector<SVGPathElement>(`#${id}-core`)
      if (!glowEl || !coreEl) return
      const len = coreEl.getTotalLength()
      for (const el of [glowEl, coreEl]) {
        el.style.strokeDasharray  = `${len}`
        el.style.strokeDashoffset = `${len}`
      }
    })

    const tl = gsap.timeline()

    // PHASE 1 — draw traces (glow layer 0.1s ahead of core)
    DRAW_PATHS.forEach(({ id, start, dur }) => {
      const glowEl = svg.querySelector(`#${id}-glow`)
      const coreEl = svg.querySelector(`#${id}-core`)
      if (!glowEl || !coreEl) return
      tl.to(glowEl, { strokeDashoffset: 0, duration: dur + 0.1, ease: 'none' }, start)
      tl.to(coreEl, { strokeDashoffset: 0, duration: dur,       ease: 'none' }, start + 0.1)
    })

    // PHASE 2 — node pulse at 1.6s
    tl.to('.ld-node-outer', { scale: 1.8, transformOrigin: 'center center', opacity: 0.5, duration: 0.1, stagger: 0.02 }, 1.6)
    tl.to('.ld-node-inner', { scale: 1.5, transformOrigin: 'center center', fill: 'white', duration: 0.1, stagger: 0.02 }, 1.6)
    tl.to('.ld-node-outer', { scale: 1, opacity: 0.2, duration: 0.25, stagger: 0.02 }, 1.8)
    tl.to('.ld-node-inner', { scale: 1, fill: '#D4F044', duration: 0.25, stagger: 0.02 }, 1.8)

    // PHASE 3 — dim circuit at 2.1s
    tl.to('.ld-trace-glow', { opacity: 0.04, duration: 0.3 }, 2.1)
    tl.to('.ld-trace-core', { opacity: 0.12, duration: 0.3 }, 2.1)

    // CPU ambient pulse
    tl.to('#cpu-outer', { opacity: 0.5, duration: 0.6, yoyo: true, repeat: -1, ease: 'sine.inOut' }, 2.4)

    // PHASE 4 — logo at 2.5s
    tl.to(logoRef.current, { opacity: 1, duration: 0.15 }, 2.5)
    tl.add(() => { if (textRef.current) scramble(textRef.current, 'RELENTLESS AIS', 700) }, 2.5)
    tl.to(statusRef.current, { opacity: 1, duration: 0.2 }, 3.1)

    // PHASE 5 — fade out at 3.5s
    tl.to(overlayRef.current, { opacity: 0, duration: 0.45 }, 3.5)
    tl.add(() => { document.body.classList.add('loader-complete'); onComplete() }, 3.95)

    return () => { tl.kill() }
  }, [onComplete])

  return (
    <div ref={overlayRef} style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#080808', overflow: 'hidden' }}>

      {/* ── Main SVG ─────────────────────────────────────────── */}
      <svg
        ref={svgRef}
        style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
        viewBox="0 0 1440 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="2" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="strongGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="nodeGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="3" result="blur" />
            <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <radialGradient id="cpuGlow" cx="50%" cy="50%" r="50%">
            <stop offset="0%"  stopColor="rgba(212,240,68,0.18)" />
            <stop offset="100%" stopColor="rgba(212,240,68,0)" />
          </radialGradient>
        </defs>

        {/* ── Traces: glow layer (wide, soft) ─────────────────── */}
        {DRAW_PATHS.map(({ id, d, color }) => (
          <path
            key={`${id}-glow`}
            id={`${id}-glow`}
            className="ld-trace-glow"
            d={d}
            stroke={color ?? '#D4F044'}
            strokeWidth="3"
            fill="none"
            opacity="0.15"
            filter="url(#glow)"
          />
        ))}

        {/* ── Traces: core layer (sharp, bright) ──────────────── */}
        {DRAW_PATHS.map(({ id, d, color }) => (
          <path
            key={`${id}-core`}
            id={`${id}-core`}
            className="ld-trace-core"
            d={d}
            stroke={color ?? '#D4F044'}
            strokeWidth="1"
            fill="none"
            opacity="0.9"
          />
        ))}

        {/* ── Travelling pulse dots (native SVG animateMotion) ── */}
        {PULSE_TRACES.map((pid, i) => (
          <circle key={`pulse-${pid}`} r="4" fill="white" opacity="0.85" filter="url(#nodeGlow)">
            <animateMotion
              dur={`${PULSE_DURS[i]}s`}
              repeatCount="indefinite"
              begin={`${PULSE_DELAYS[i]}s`}
            >
              <mpath href={`#${pid}-core`} />
            </animateMotion>
          </circle>
        ))}

        {/* ── Junction nodes (double layer) ───────────────────── */}
        {NODES.map(([cx, cy], i) => (
          <g key={i}>
            <circle className="ld-node-outer" cx={cx} cy={cy} r="6" fill="#D4F044" opacity="0.15" filter="url(#nodeGlow)" />
            <circle className="ld-node-inner" cx={cx} cy={cy} r="2.5" fill="#D4F044" opacity="0.95" />
          </g>
        ))}

        {/* ── CPU chip (center 720, 450) ───────────────────────── */}
        {/* Soft glow background */}
        <rect x="640" y="370" width="160" height="160" fill="url(#cpuGlow)" />

        {/* Outer body */}
        <rect id="cpu-outer" x="660" y="390" width="120" height="120" stroke="#D4F044" strokeWidth="1.5" fill="#0d0d0d" filter="url(#strongGlow)" opacity="0.9" />

        {/* Inner die */}
        <rect x="680" y="410" width="80" height="80" stroke="#D4F044" strokeWidth="0.5" fill="#080808" />

        {/* CPU pins */}
        {allPins.map((p, i) => (
          <line key={i} x1={p.x1} y1={p.y1} x2={p.x2} y2={p.y2} stroke="#D4F044" strokeWidth="1" opacity="0.7" />
        ))}

        {/* Pin tip dots — white hot contacts */}
        {topPins.map((p, i) => <circle key={`tp${i}`} cx={p.x1} cy={p.y2} r="1.5" fill="white" opacity="0.8" />)}
        {bottomPins.map((p, i) => <circle key={`bp${i}`} cx={p.x1} cy={p.y2} r="1.5" fill="white" opacity="0.8" />)}
        {leftPins.map((p, i) => <circle key={`lp${i}`} cx={p.x2} cy={p.y1} r="1.5" fill="white" opacity="0.8" />)}
        {rightPins.map((p, i) => <circle key={`rp${i}`} cx={p.x2} cy={p.y1} r="1.5" fill="white" opacity="0.8" />)}

        {/* CPU label (behind logo) */}
        <text x="720" y="460" textAnchor="middle" fill="#D4F044" fontSize="7" fontFamily="monospace" letterSpacing="1" opacity="0.6">CPU-01</text>

        {/* ── Component symbols ──────────────────────────────── */}
        {/* RAM modules */}
        {[[580,175],[820,175],[580,710],[820,710]].map(([x,y],i) => (
          <g key={`ram${i}`}>
            <rect x={x} y={y} width="40" height="14" stroke="#D4F044" strokeWidth="0.8" fill="#0a0a0a" />
            <text x={x+20} y={y+10} textAnchor="middle" fill="#D4F044" fontSize="6" fontFamily="monospace">RAM-0{i+1}</text>
          </g>
        ))}

        {/* Capacitors */}
        {[[200,345],[1200,345],[350,595],[1050,595],[500,245],[900,715]].map(([x,y],i) => (
          <g key={`cap${i}`}>
            <line x1={x-5} y1={y}   x2={x+5} y2={y}   stroke="#D4F044" strokeWidth="1.2" />
            <line x1={x-5} y1={y+4} x2={x+5} y2={y+4} stroke="#D4F044" strokeWidth="1.2" />
          </g>
        ))}

        {/* Small IC chips */}
        {[
          { x:285,  y:263, label:'IC-02' },
          { x:1080, y:263, label:'IC-03' },
          { x:285,  y:573, label:'IC-04' },
          { x:1080, y:573, label:'IC-05' },
        ].map(({ x, y, label }) => (
          <g key={label}>
            <rect x={x} y={y} width="50" height="28" stroke="#D4F044" strokeWidth="0.8" fill="#0a0a0a" />
            <text x={x+25} y={y+17} textAnchor="middle" fill="#D4F044" fontSize="6.5" fontFamily="monospace">{label}</text>
          </g>
        ))}

        {/* Resistors */}
        {[[200,95],[600,75],[1100,145],[1300,245],[150,545],[450,775],[1100,745],[1350,645]].map(([x,y],i) => (
          <rect key={`res${i}`} x={x-10} y={y-4} width="20" height="8" stroke="#D4F044" strokeWidth="0.7" fill="#0a0a0a" />
        ))}

        {/* CLK chip */}
        <rect x="1050" y="365" width="50" height="24" stroke="#D4F044" strokeWidth="0.8" fill="#0a0a0a" />
        <text x="1075" y="381" textAnchor="middle" fill="#D4F044" fontSize="7" fontFamily="monospace">CLK</text>

        {/* PWR symbol */}
        <circle cx="500" cy="155" r="7" stroke="#D4F044" strokeWidth="0.9" fill="none" />
        <text x="500" y="140" textAnchor="middle" fill="#D4F044" fontSize="6" fontFamily="monospace">PWR</text>

        {/* GND symbol */}
        <line x1="95" y1="780" x2="125" y2="780" stroke="#D4F044" strokeWidth="1.3" />
        <line x1="100" y1="786" x2="120" y2="786" stroke="#D4F044" strokeWidth="1.0" />
        <line x1="105" y1="792" x2="115" y2="792" stroke="#D4F044" strokeWidth="0.7" />
        <text x="110" y="773" textAnchor="middle" fill="#D4F044" fontSize="6.5" fontFamily="monospace">GND</text>
      </svg>

      {/* ── Logo overlay (renders on top of CPU chip) ──────────── */}
      <div
        ref={logoRef}
        style={{
          position: 'absolute', top: '50%', left: '50%',
          transform: 'translate(-50%, -50%)',
          textAlign: 'center', opacity: 0, zIndex: 10,
          background: 'radial-gradient(ellipse 120px 60px at center, rgba(8,8,8,0.95) 60%, transparent 100%)',
          padding: '12px 24px',
        }}
      >
        <div style={{
          fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 28,
          letterSpacing: '0.05em', whiteSpace: 'nowrap',
          textShadow: '0 0 24px rgba(212,240,68,0.4)',
        }}>
          <span ref={textRef} style={{ color: '#F0EDE6' }}>░░░░░░░░░░░░░░</span>
        </div>
        <div ref={statusRef} style={{
          fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#D4F044',
          letterSpacing: '0.35em', marginTop: 12, opacity: 0,
        }}>
          SYSTEM ONLINE
        </div>
      </div>

      {/* ── HUD corners ──────────────────────────────────────── */}
      {[
        { top: 24, left: 24 }, { top: 24, right: 24 },
        { bottom: 24, left: 24 }, { bottom: 24, right: 24 },
      ].map((pos, i) => {
        const isRight  = 'right'  in pos
        const isBottom = 'bottom' in pos
        return (
          <div key={i} style={{ position: 'absolute', ...(pos as React.CSSProperties) }}>
            <div style={{ position: 'absolute', [isBottom ? 'bottom' : 'top']: 0, [isRight ? 'right' : 'left']: 0, width: 24, height: 2, background: '#D4F044' }} />
            <div style={{ position: 'absolute', [isBottom ? 'bottom' : 'top']: 0, [isRight ? 'right' : 'left']: 0, width: 2, height: 24, background: '#D4F044' }} />
          </div>
        )
      })}

      {/* ── Data readouts ─────────────────────────────────────── */}
      {[
        { pos: { top: 28, left: 56 },    text: 'SYS: INITIALIZING' },
        { pos: { top: 28, right: 56 },   text: 'v2.1.0 // 2025' },
        { pos: { bottom: 28, left: 56 }, text: 'LAT: 18.9752° N · LON: 72.8258° E' },
        { pos: { bottom: 28, right: 56 },text: 'STATUS: LOADING...' },
      ].map(({ pos, text }) => (
        <div key={text} style={{
          position: 'absolute', fontFamily: 'var(--font-dm-mono)',
          fontSize: 10, color: '#888480', letterSpacing: '0.1em',
          ...(pos as React.CSSProperties),
        }}>
          {text}
        </div>
      ))}
    </div>
  )
}
