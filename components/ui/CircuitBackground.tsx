'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'

interface CircuitBackgroundProps {
  opacity?: number
  animated?: boolean
  className?: string
}

// PCB traces — H/V only, no curves
const TRACES = [
  // Main spine
  'M 0 50 H 15 V 38 H 35 V 50 H 55 V 44 H 65',
  // Left branch up
  'M 15 38 V 20 H 28 V 14 H 42',
  // Left branch down
  'M 35 50 V 62 H 24 V 72 H 42',
  // Right section
  'M 65 44 H 80 V 32 H 96 V 44 H 100',
  // Upper-right branch
  'M 80 32 V 17 H 90 V 10',
  // Lower-right branch
  'M 96 44 V 60 H 85 V 70 H 100',
  // Far left
  'M 28 14 V 7 H 12',
  // Far bottom-left
  'M 24 72 V 82 H 8',
]

// Pulse dots travel along each trace using CSS animation on a hidden SVG path
// We use a simple "translate along path" approximation via keyframe offsets

export default function CircuitBackground({ opacity = 0.06, animated = true, className = '' }: CircuitBackgroundProps) {
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (!animated || typeof window === 'undefined') return
    try {
      gsap.registerPlugin(MotionPathPlugin)
    } catch {
      // MotionPathPlugin may not be available (paid) — fall back gracefully
    }

    // Fallback: animate stroke-dashoffset on each trace for a pulse effect
    const paths = svgRef.current?.querySelectorAll<SVGPathElement>('.circuit-trace')
    if (!paths) return

    paths.forEach((path, i) => {
      const len = path.getTotalLength ? path.getTotalLength() : 100
      gsap.fromTo(
        path,
        { strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          duration: 1.5 + i * 0.3,
          delay: i * 0.4,
          ease: 'none',
          repeat: -1,
          repeatDelay: 2,
        }
      )
    })

    return () => { gsap.killTweensOf(paths) }
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
      {/* Traces */}
      {TRACES.map((d, i) => {
        const len = 200 // approximate
        return (
          <path
            key={i}
            d={d}
            className="circuit-trace"
            stroke="#D4F044"
            strokeWidth="0.4"
            fill="none"
            strokeDasharray={`${len} ${len}`}
            strokeDashoffset={len}
            vectorEffect="non-scaling-stroke"
          />
        )
      })}

      {/* Static visible traces at low opacity */}
      {TRACES.map((d, i) => (
        <path
          key={`static-${i}`}
          d={d}
          stroke="#D4F044"
          strokeWidth="0.3"
          fill="none"
          opacity="0.4"
          vectorEffect="non-scaling-stroke"
        />
      ))}

      {/* Junction nodes */}
      {[
        [15, 38], [35, 50], [65, 44], [80, 32], [96, 44],
        [28, 14], [24, 72], [42, 50], [55, 44], [90, 10],
      ].map(([cx, cy], i) => (
        <circle key={i} cx={cx} cy={cy} r="0.8" fill="#D4F044" opacity="0.7" />
      ))}

      {/* IC-01 component */}
      <rect x="60" y="41" width="10" height="6" stroke="#D4F044" strokeWidth="0.4" fill="#0a0a0a" opacity="0.9" />
      <text x="65" y="45.5" textAnchor="middle" fill="#D4F044" fontSize="2.5" fontFamily="monospace">IC-01</text>

      {/* PWR circle */}
      <circle cx="28" cy="14" r="2" stroke="#D4F044" strokeWidth="0.4" fill="none" opacity="0.8" />
      <text x="28" y="11" textAnchor="middle" fill="#D4F044" fontSize="2" fontFamily="monospace">PWR</text>

      {/* CLK box */}
      <rect x="88" y="29" width="8" height="5" stroke="#D4F044" strokeWidth="0.4" fill="#0a0a0a" opacity="0.9" />
      <text x="92" y="32.8" textAnchor="middle" fill="#D4F044" fontSize="2.5" fontFamily="monospace">CLK</text>

      {/* GND symbol */}
      <line x1="5" y1="80" x2="11" y2="80" stroke="#D4F044" strokeWidth="0.4" opacity="0.8" />
      <line x1="6" y1="82" x2="10" y2="82" stroke="#D4F044" strokeWidth="0.4" opacity="0.6" />
      <line x1="7" y1="84" x2="9"  y2="84" stroke="#D4F044" strokeWidth="0.4" opacity="0.4" />
      <text x="8" y="79" textAnchor="middle" fill="#D4F044" fontSize="2" fontFamily="monospace">GND</text>
    </svg>
  )
}
