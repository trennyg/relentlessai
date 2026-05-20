'use client'

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import HUDCorners from '@/components/ui/HUDCorners'

export default function Hero() {
  const [scrolled,   setScrolled]   = useState(false)
  const [loaderDone, setLoaderDone] = useState(false)

  useEffect(() => {
    if (document.body.classList.contains('loader-complete')) {
      setLoaderDone(true)
      return
    }
    const mo = new MutationObserver(() => {
      if (document.body.classList.contains('loader-complete')) {
        setLoaderDone(true)
        mo.disconnect()
      }
    })
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    const fb = setTimeout(() => setLoaderDone(true), 4500)
    return () => { mo.disconnect(); clearTimeout(fb) }
  }, [])

  useEffect(() => {
    const onScroll = () => { if (window.scrollY > 50) setScrolled(true) }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden grid-bg grid-mask"
      style={{ backgroundColor: '#080808' }}
    >
      {/* Radial glow */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,240,68,0.04) 0%, transparent 70%)' }} />

      {/* Content */}
      <motion.div
        className="relative z-10 max-w-4xl mx-auto"
        animate={{ opacity: loaderDone ? 1 : 0 }}
        transition={{ duration: 0.4 }}
        initial={{ opacity: 0 }}
      >
        <motion.p
          initial={{ opacity: 0 }}
          animate={loaderDone ? { opacity: 1 } : {}}
          transition={{ delay: 0.05, duration: 0.4 }}
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#D4F044', letterSpacing: '0.3em', textTransform: 'uppercase', marginBottom: 32 }}
        >
          Digital Product Studio
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.1, duration: 0.5 }}
          style={{ fontFamily: 'var(--font-syne)', fontWeight: 800, fontSize: 'clamp(2.5rem, 7vw, 5rem)', letterSpacing: '-0.02em', lineHeight: 1.05, color: '#F0EDE6' }}
        >
          We build digital<br />
          products that{' '}
          <span style={{ color: '#D4F044' }}>think.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.5 }}
          style={{ fontFamily: 'var(--font-dm-sans)', color: '#888480', fontSize: 18, lineHeight: 1.7, maxWidth: 560, margin: '24px auto 0' }}
        >
          Premium websites, AI dashboards, and automation pipelines for businesses that want to stand out and operate smarter.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={loaderDone ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.5 }}
          style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', justifyContent: 'center', gap: 16, marginTop: 40 }}
        >
          <a
            href="#work"
            onClick={e => { e.preventDefault(); document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{ fontFamily: 'var(--font-dm-sans)', backgroundColor: '#D4F044', color: '#080808', padding: '14px 28px', fontSize: 14, fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'opacity 0.2s' }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            See Our Work →
          </a>
          <a
            href="#contact"
            onClick={e => { e.preventDefault(); document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' }) }}
            style={{ fontFamily: 'var(--font-dm-sans)', backgroundColor: 'transparent', color: '#F0EDE6', border: '1px solid #444', padding: '14px 28px', fontSize: 14, fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 8, transition: 'border-color 0.2s, color 0.2s' }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = '#D4F044'; e.currentTarget.style.color = '#D4F044' }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = '#444'; e.currentTarget.style.color = '#F0EDE6' }}
          >
            Get In Touch
          </a>
        </motion.div>
      </motion.div>

      {/* Floating UI fragment — desktop only */}
      <motion.div
        className="absolute bottom-24 right-8 hidden lg:block"
        style={{ width: 220 }}
        animate={loaderDone ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        initial={{ opacity: 0, y: 20 }}
      >
        <motion.div animate={{ y: [0, -6, 0] }} transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}>
          <HUDCorners>
            <div style={{ background: '#111111', border: '1px solid rgba(212,240,68,0.2)', padding: 16, backdropFilter: 'blur(8px)', fontFamily: 'var(--font-dm-mono)', fontSize: 10 }}>
              <div style={{ color: '#888480', marginBottom: 8 }}>▸ PORTFOLIO ANALYSIS</div>
              <div style={{ color: '#D4F044', marginBottom: 8, display: 'flex', alignItems: 'center', gap: 6 }}>
                GPT-4o
                <span className="shimmer-bar" style={{ display: 'inline-block', width: 50, height: 7, verticalAlign: 'middle', borderRadius: 2 }} />
                82%
              </div>
              <div style={{ marginBottom: 8 }}>
                <span style={{ color: '#D4F044' }}>AI SCORE</span>
                <span style={{ color: '#F0EDE6' }}>: 9.4 / 10</span>
              </div>
              <div style={{ color: '#333' }}>SYS: ONLINE · 43ms</div>
            </div>
          </HUDCorners>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        style={{ pointerEvents: 'none' }}
      >
        <motion.span
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          style={{ fontFamily: 'var(--font-dm-mono)', fontSize: 11, color: '#888480', letterSpacing: '0.2em', display: 'block' }}
        >
          SCROLL ↓
        </motion.span>
      </motion.div>
    </section>
  )
}
