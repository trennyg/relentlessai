'use client'

import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { PROJECTS } from '@/lib/constants'
import HUDCorners from '@/components/ui/HUDCorners'
import DataReadout from '@/components/ui/DataReadout'

if (typeof window !== 'undefined') gsap.registerPlugin(ScrollTrigger)

function DossierCard({ project, index }: { project: typeof PROJECTS[0]; index: number }) {
  const isProduction = !!project.badge
  const isLive = !!project.link && project.link !== '#'

  return (
    <HUDCorners>
      <DataReadout
        topLeft={`FILE.${String(index + 1).padStart(2, '0')}`}
        topRight={isProduction ? 'IN.PRODUCTION' : 'LIVE'}
        bottomLeft={project.stack[0] ?? ''}
        bottomRight={project.stack[1] ?? ''}
      />
      <div style={{ width: '70vw', maxWidth: 700, backgroundColor: '#111', border: '1px solid #222', overflow: 'hidden', flexShrink: 0, display: 'flex', flexDirection: 'column' }}>
        {/* Image — grayscale → color on viewport entry */}
        <div style={{ position: 'relative', aspectRatio: '16/9', overflow: 'hidden', backgroundColor: '#0A0A0A', flexShrink: 0 }}>
          {/* Status badge top-right */}
          <div style={{ position: 'absolute', top: 10, right: 10, zIndex: 2, fontFamily: 'var(--font-dm-mono)', fontSize: 9, animation: 'pulseDot 1.5s ease-in-out infinite' }}>
            {isProduction
              ? <span style={{ color: '#D4F044' }}>● IN PRODUCTION</span>
              : <span style={{ color: '#4CAF50' }}>● LIVE</span>
            }
          </div>
          <motion.div
            initial={{ filter: 'grayscale(100%)' }}
            whileInView={{ filter: 'grayscale(0%)' }}
            viewport={{ once: true, amount: 0.4 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            style={{ position: 'relative', width: '100%', height: '100%' }}
          >
            <Image src={project.image} alt={project.title} fill className="object-cover" sizes="70vw"
              onError={e => { (e.currentTarget as HTMLImageElement).style.display = 'none' }}
            />
          </motion.div>
          {/* Scan sweep on image entry */}
          <motion.div
            initial={{ top: -1, opacity: 1 }}
            whileInView={{ top: '105%', opacity: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: 'linear' }}
            style={{ position: 'absolute', left: 0, width: '100%', height: 1, background: '#D4F044', boxShadow: '0 0 8px #D4F044', zIndex: 3, pointerEvents: 'none' }}
          />
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 55%, rgba(8,8,8,0.85) 100%)' }} />
        </div>

        {/* Content */}
        <div style={{ padding: 24, flex: 1, display: 'flex', flexDirection: 'column', gap: 12 }}>
          <div>
            <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#888480', border: '1px solid #2A2A2A', padding: '3px 8px', letterSpacing: '0.1em' }}>
              [CLEARANCE: {project.tag}]
            </span>
          </div>
          <h3 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 22, color: '#F0EDE6', margin: 0 }}>
            {project.title}
          </h3>
          <p style={{ fontFamily: 'var(--font-dm-sans)', fontSize: 13, color: '#888480', lineHeight: 1.7, margin: 0 }}>
            {project.description}
          </p>
          <div>
            <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#555', marginBottom: 8, letterSpacing: '0.1em' }}>TOOLS DEPLOYED:</div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {project.stack.map(t => (
                <span key={t} style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 10, color: '#888480', border: '1px solid #2A2A2A', padding: '2px 8px' }}>{t}</span>
              ))}
            </div>
          </div>
          {isProduction ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 'auto' }}>
              <span style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#555' }}>[DETAILS RESTRICTED]</span>
              <span style={{ display: 'inline-block', width: 100, height: 12, backgroundColor: '#0D0D0D', border: '1px solid #1A1A1A' }} />
            </div>
          ) : isLive ? (
            <a href={project.link} target="_blank" rel="noopener noreferrer" style={{ marginTop: 'auto', fontFamily: 'var(--font-dm-mono)', fontSize: 12, color: '#D4F044', textDecoration: 'none' }}
              onMouseEnter={e => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={e => (e.currentTarget.style.textDecoration = 'none')}
            >
              VIEW LIVE ↗
            </a>
          ) : null}
        </div>
      </div>
    </HUDCorners>
  )
}

function InitiateCard() {
  return (
    <HUDCorners>
      <div style={{ width: '70vw', maxWidth: 700, backgroundColor: '#111', border: '1px solid rgba(212,240,68,0.25)', flexShrink: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: 420, gap: 16 }}>
        <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 52, color: '#D4F044' }}>[ + ]</div>
        <div style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 13, color: '#888480', letterSpacing: '0.15em' }}>INITIATE NEW FILE</div>
        <div style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 24, color: '#F0EDE6' }}>YOUR PROJECT</div>
        <a href="#contact" onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
          style={{ marginTop: 8, fontFamily: 'var(--font-dm-sans)', fontSize: 14, backgroundColor: '#D4F044', color: '#080808', padding: '12px 32px', fontWeight: 500, textDecoration: 'none' }}
        >
          Begin Briefing →
        </a>
      </div>
    </HUDCorners>
  )
}

export default function Work() {
  const sectionRef = useRef<HTMLElement>(null)
  const trackRef   = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const section = sectionRef.current
    const track   = trackRef.current
    if (!section || !track) return
    if (window.innerWidth < 768) return

    const dist = track.scrollWidth - window.innerWidth

    const anim = gsap.to(track, {
      x: -dist,
      ease: 'none',
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: () => `+=${dist}`,
        pin: true,
        scrub: 1,
        snap: { snapTo: 1 / PROJECTS.length, duration: { min: 0.2, max: 0.5 }, delay: 0 },
        invalidateOnRefresh: true,
      },
    })

    return () => { anim.scrollTrigger?.kill(); anim.kill() }
  }, [])

  return (
    <section ref={sectionRef} id="work" className="work-section" style={{ backgroundColor: '#080808', overflow: 'hidden' }}>
      {/* Header */}
      <div style={{ padding: '40px 48px 28px', borderBottom: '1px solid #1A1A1A' }}>
        <p style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#555', marginBottom: 10 }}>
          [DATABASE ACCESS GRANTED] · {PROJECTS.length} FILES FOUND · SORTED BY: DATE · CLEARANCE: OPEN
        </p>
        <h2 style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 'clamp(2rem, 4vw, 3rem)', color: '#F0EDE6', lineHeight: 1.15, margin: 0 }}>
          Built. Shipped.<br />Reviewed well.
        </h2>
      </div>

      {/* Desktop horizontal track */}
      <div className="hidden md:block" style={{ height: 'calc(100vh - 136px)', overflow: 'hidden' }}>
        <div ref={trackRef} className="work-track" style={{ display: 'flex', alignItems: 'center', gap: 24, padding: '28px 48px', height: '100%', width: 'max-content' }}>
          {PROJECTS.map((p, i) => (
            <motion.div key={p.title} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.3 }} transition={{ delay: i * 0.08, duration: 0.5 }}>
              <DossierCard project={p} index={i} />
            </motion.div>
          ))}
          <InitiateCard />
        </div>
      </div>

      {/* Mobile vertical stack */}
      <div className="md:hidden flex flex-col gap-6 p-6">
        {PROJECTS.map((p, i) => <DossierCard key={p.title} project={p} index={i} />)}
        <InitiateCard />
      </div>
    </section>
  )
}
