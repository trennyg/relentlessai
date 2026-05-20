'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface CircuitBackgroundProps {
  opacity?: number
  animated?: boolean
  className?: string
}

// 12 H/V traces in a 0-100 viewBox
// These radiate from a notional CPU near center (50, 50)
const TRACES = [
  // North
  { id: 'cb0', d: 'M 46 34 V 22 H 35 V 12 H 20 V 0' },
  { id: 'cb1', d: 'M 54 34 V 18 H 65 V 8 H 82 V 0' },
  // South
  { id: 'cb2', d: 'M 46 66 V 78 H 30 V 88 H 15 V 100' },
  { id: 'cb3', d: 'M 54 66 V 80 H 70 V 90 H 88 V 100' },
  // East
  { id: 'cb4', d: 'M 66 46 H 78 V 36 H 90 V 26 H 100' },
  { id: 'cb5', d: 'M 66 54 H 80 V 62 H 92 V 72 H 100' },
  // West
  { id: 'cb6', d: 'M 34 46 H 20 V 36 H 10 V 24 H 0' },
  { id: 'cb7', d: 'M 34 54 H 18 V 64 H 8 V 76 H 0' },
  // Cross connections
  { id: 'cb8',  d: 'M 20 22 H 35', },
  { id: 'cb9',  d: 'M 65 18 H 82', },
  { id: 'cb10', d: 'M 15 78 H 30', },
  { id: 'cb11', d: 'M 70 80 H 88', },
]

// Pulses on main 8 traces
const PULSE_CONF = [
  { id: 'cb0', dur: 3.2, begin: 0.0 },
  { id: 'cb1', dur: 2.8, begin: 0.7 },
  { id: 'cb2', dur: 3.6, begin: 1.4 },
  { id: 'cb3', dur: 2.6, begin: 0.4 },
  { id: 'cb4', dur: 3.0, begin: 1.1 },
  { id: 'cb5', dur: 4.0, begin: 2.0 },
  { id: 'cb6', dur: 3.4, begin: 0.9 },
  { id: 'cb7', dur: 2.9, begin: 1.7 },
]

const NODES: [number, number][] = [
  [35, 22], [20, 12], [65, 18], [82, 8],
  [30, 78], [15, 88], [70, 80], [88, 90],
  [78, 36], [90, 26], [80, 62], [92, 72],
  [20, 36], [10, 24], [18, 64], [8, 76],
]

export default function CircuitBackground({ opacity = 0.06, animated = true, className = '' }: CircuitBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!animated || typeof window === 'undefined') return
    const svg = svgRef.current
    if (!svg) return

    // Use strokeDashoffset on the animated glow traces for a draw-and-repeat pulse
    const glowPaths = svg.querySelectorAll<SVGPathElement>('.cb-glow')
    glowPaths.forEach((path, i) => {
      const len = path.getTotalLength ? path.getTotalLength() : 120
      gsap.fromTo(
        path,
        { strokeDashoffset: len, strokeDasharray: `${len} ${len}` },
        {
          strokeDashoffset: 0,
          duration: 3 + i * 0.4,
          delay: i * 0.5,
          ease: 'none',
          repeat: -1,
          repeatDelay: 1.5,
        }
      )
    })

    return () => { gsap.killTweensOf(glowPaths) }
  }, [animated])

  return (
    <svg
      ref={svgRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      viewBox="0 0 100 100"
      preserveAspectRatio="xMidYMid slice"
      style={{ opacity }}
      aria-hidden="true"
    >
      <defs>
        <filter id="cb-glow-f" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.5" result="blur" />
          <feMerge><feMergeNode in="blur" /><feMergeNode in="SourceGraphic" /></feMerge>
        </filter>
      </defs>

      {/* Static ambient traces (always visible, low opacity) */}
      {TRACES.map(({ id, d }) => (
        <path
          key={`static-${id}`}
          d={d}
          stroke="#D4F044"
          strokeWidth="0.25"
          fill="none"
          opacity="0.45"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* Glow layer — wide soft trace, animated when animated=true */}
      {TRACES.map(({ id, d }) => (
        <path
          key={`glow-${id}`}
          id={`${id}-glow`}
          className="cb-glow"
          d={d}
          stroke="#D4F044"
          strokeWidth="1.5"
          fill="none"
          opacity="0.18"
          vectorEffect="non-scaling-stroke"
          filter="url(#cb-glow-f)"
        />
      ))}

      {/* Travelling pulse dots using native SVG animateMotion — no GSAP plugin needed */}
      {animated && PULSE_CONF.map(({ id, dur, begin }) => (
        <circle key={`pulse-${id}`} r="1.2" fill="#D4F044" opacity="0.9" filter="url(#cb-glow-f)">
          <animateMotion
            dur={`${dur}s`}
            repeatCount="indefinite"
            begin={`${begin}s`}
          >
            <mpath href={`#${id}-glow`} />
          </animateMotion>
        </circle>
      ))}

      {/* Junction nodes */}
      {NODES.map(([cx, cy], i) => (
        <g key={i}>
          <circle cx={cx} cy={cy} r="1.5" fill="#D4F044" opacity="0.15" />
          <circle cx={cx} cy={cy} r="0.7" fill="#D4F044" opacity="0.8" />
        </g>
      ))}

      {/* Mini CPU at center */}
      <rect x="40" y="40" width="20" height="20" stroke="#D4F044" strokeWidth="0.35" fill="#0a0a0a" opacity="0.7" />
      <rect x="43" y="43" width="14" height="14" stroke="#D4F044" strokeWidth="0.2" fill="#080808" opacity="0.7" />
      <text x="50" y="51.5" textAnchor="middle" fill="#D4F044" fontSize="2.8" fontFamily="monospace" opacity="0.6">CPU</text>

      {/* Small component symbols */}
      <rect x="17" y="9" width="6" height="4" stroke="#D4F044" strokeWidth="0.3" fill="#0a0a0a" opacity="0.6" />
      <text x="20" y="12.5" textAnchor="middle" fill="#D4F044" fontSize="2" fontFamily="monospace" opacity="0.5">IC</text>

      <rect x="79" y="5" width="6" height="4" stroke="#D4F044" strokeWidth="0.3" fill="#0a0a0a" opacity="0.6" />
      <text x="82" y="8.5" textAnchor="middle" fill="#D4F044" fontSize="2" fontFamily="monospace" opacity="0.5">CLK</text>

      {/* Capacitor symbols */}
      <line x1="8" y1="47" x2="15" y2="47" stroke="#D4F044" strokeWidth="0.4" opacity="0.6" />
      <line x1="8" y1="50" x2="15" y2="50" stroke="#D4F044" strokeWidth="0.4" opacity="0.6" />
      <line x1="83" y1="47" x2="90" y2="47" stroke="#D4F044" strokeWidth="0.4" opacity="0.6" />
      <line x1="83" y1="50" x2="90" y2="50" stroke="#D4F044" strokeWidth="0.4" opacity="0.6" />
    </svg>
  )
}
