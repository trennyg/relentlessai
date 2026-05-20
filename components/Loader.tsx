'use client'

import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'

interface LoaderProps {
  onComplete: () => void
}

function scramble(el: HTMLElement, final: string, ms: number) {
  const chars = '01█▓░⌗⌀'
  const fps = 30
  const total = Math.floor((ms / 1000) * fps)
  let frame = 0
  const id = setInterval(() => {
    frame++
    const pct = frame / total
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
    }
  }, 1000 / fps)
  return () => clearInterval(id)
}

export default function Loader({ onComplete }: LoaderProps) {
  const overlayRef  = useRef<HTMLDivElement>(null)
  const scanRef     = useRef<HTMLDivElement>(null)
  const gridRef     = useRef<HTMLDivElement>(null)
  const logoRef     = useRef<HTMLDivElement>(null)
  const statusRef   = useRef<HTMLDivElement>(null)
  const scrambleRef = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    const tl = gsap.timeline()

    // 0s–0.8s: scan line sweeps down, grid activates
    tl.to(scanRef.current,  { top: '100vh', duration: 0.8, ease: 'none' }, 0)
    tl.to(gridRef.current,  { clipPath: 'inset(0 0 0% 0)', duration: 0.8, ease: 'none' }, 0)

    // 0.8s–1.2s: corners + data readouts fade in
    tl.to('.ldr-corner', { opacity: 1, duration: 0.15, stagger: 0.04 }, 0.8)
    tl.to('.ldr-data',   { opacity: 1, duration: 0.2 }, 0.85)

    // 1.2s–1.6s: reticle assembles
    tl.to('#ret-circle',  { strokeDashoffset: 0, duration: 0.3, ease: 'none' }, 1.2)
    tl.to('.ret-tick',    { strokeDashoffset: 0, duration: 0.15, stagger: 0.05, ease: 'none' }, 1.3)
    tl.to('#ret-glow',    { opacity: 1, duration: 0.4 }, 1.2)

    // 1.6s–2.4s: logo scrambles in
    tl.to(logoRef.current, { opacity: 1, duration: 0.1 }, 1.6)
    tl.add(() => {
      if (scrambleRef.current) scramble(scrambleRef.current, 'RELENTLESS AIS', 800)
    }, 1.6)

    // 2.2s: "SYSTEM ONLINE" appears
    tl.to(statusRef.current, { opacity: 1, duration: 0.2 }, 2.2)

    // 2.4s–2.9s: scanner ring rotates then pulses out
    tl.to('#scan-ring', { rotation: 360, transformOrigin: '50% 50%', duration: 0.5, ease: 'none' }, 2.4)
    tl.to('#scan-ring', { scale: 3, opacity: 0, transformOrigin: '50% 50%', duration: 0.2 }, 2.9)

    // 2.9s–3.2s: reticle expands to fill screen
    tl.to('#ret-circle', { scale: 60, opacity: 0, transformOrigin: '50% 50%', duration: 0.3 }, 2.9)
    tl.to('.ldr-corner', { opacity: 0, duration: 0.2 }, 2.9)
    tl.to('.ldr-data',   { opacity: 0, duration: 0.2 }, 2.9)

    // 3.2s–3.7s: overlay fades out
    tl.to(overlayRef.current, { opacity: 0, duration: 0.5 }, 3.2)

    // 3.7s: done
    tl.add(() => {
      document.body.classList.add('loader-complete')
      onComplete()
    }, 3.7)

    return () => { tl.kill() }
  }, [onComplete])

  const arm = (pos: React.CSSProperties) => (
    <div className="ldr-corner" style={{ position: 'absolute', opacity: 0, ...pos }}>
      <div style={{ position: 'absolute', top: pos.bottom !== undefined ? undefined : 0, bottom: pos.bottom !== undefined ? 0 : undefined, left: pos.right !== undefined ? undefined : 0, right: pos.right !== undefined ? 0 : undefined, width: 24, height: 2, background: '#D4F044' }} />
      <div style={{ position: 'absolute', top: pos.bottom !== undefined ? undefined : 0, bottom: pos.bottom !== undefined ? 0 : undefined, left: pos.right !== undefined ? undefined : 0, right: pos.right !== undefined ? 0 : undefined, width: 2, height: 24, background: '#D4F044' }} />
    </div>
  )

  return (
    <div ref={overlayRef} style={{ position: 'fixed', inset: 0, zIndex: 9999, backgroundColor: '#080808', overflow: 'hidden' }}>

      {/* Scan line */}
      <div ref={scanRef} style={{ position: 'absolute', top: -1, left: 0, width: '100%', height: 1, background: '#D4F044', boxShadow: '0 0 12px #D4F044, 0 0 24px rgba(212,240,68,0.4)', zIndex: 2 }} />

      {/* Grid revealed by scan */}
      <div ref={gridRef} style={{ position: 'absolute', inset: 0, clipPath: 'inset(0 0 100% 0)', backgroundImage: 'linear-gradient(rgba(212,240,68,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(212,240,68,0.04) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />

      {/* HUD corners */}
      {arm({ top: 24, left: 24 })}
      {arm({ top: 24, right: 24 })}
      {arm({ bottom: 24, left: 24 })}
      {arm({ bottom: 24, right: 24 })}

      {/* Data readouts */}
      {[
        { style: { top: 28, left: 56 },   text: 'SYS: INITIALIZING' },
        { style: { top: 28, right: 56 },  text: 'v2.1.0 // 2025' },
        { style: { bottom: 28, left: 56 }, text: 'LAT: 18.9752° N · LON: 72.8258° E' },
        { style: { bottom: 28, right: 56 }, text: 'STATUS: LOADING...' },
      ].map(({ style, text }) => (
        <div key={text} className="ldr-data" style={{ position: 'absolute', opacity: 0, fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#888480', letterSpacing: '0.1em', ...style }}>
          {text}
        </div>
      ))}

      {/* Reticle SVG */}
      <svg style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', overflow: 'visible' }} width="200" height="200" viewBox="-100 -100 200 200">
        <defs>
          <radialGradient id="retGlow">
            <stop offset="0%"  stopColor="rgba(212,240,68,0.08)" />
            <stop offset="60%" stopColor="rgba(212,240,68,0)" />
          </radialGradient>
        </defs>
        <circle id="ret-glow"   r="100" fill="url(#retGlow)" style={{ opacity: 0 }} />
        <circle id="ret-circle" r="48"  stroke="#D4F044" strokeWidth="1" fill="none" strokeDasharray="302" strokeDashoffset="302" />
        <line className="ret-tick" x1="0"   y1="-48" x2="0"   y2="-68" stroke="#D4F044" strokeWidth="1" strokeDasharray="20" strokeDashoffset="20" />
        <line className="ret-tick" x1="0"   y1="48"  x2="0"   y2="68"  stroke="#D4F044" strokeWidth="1" strokeDasharray="20" strokeDashoffset="20" />
        <line className="ret-tick" x1="48"  y1="0"   x2="68"  y2="0"   stroke="#D4F044" strokeWidth="1" strokeDasharray="20" strokeDashoffset="20" />
        <line className="ret-tick" x1="-48" y1="0"   x2="-68" y2="0"   stroke="#D4F044" strokeWidth="1" strokeDasharray="20" strokeDashoffset="20" />
        <circle id="scan-ring" r="80" stroke="#D4F044" strokeWidth="0.5" fill="none" strokeDasharray="4 8" opacity="0.6" />
      </svg>

      {/* Logo */}
      <div ref={logoRef} style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', textAlign: 'center', opacity: 0 }}>
        <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 28, color: '#F0EDE6', letterSpacing: '0.05em', whiteSpace: 'nowrap' }}>
          <span ref={scrambleRef}>░░░░░░░░░░░░░░</span>
        </div>
        <div ref={statusRef} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#D4F044', letterSpacing: '0.3em', marginTop: 12, opacity: 0 }}>
          SYSTEM ONLINE
        </div>
      </div>
    </div>
  )
}
