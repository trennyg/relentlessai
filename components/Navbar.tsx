'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence, LayoutGroup } from 'framer-motion'
import { gsap } from 'gsap'
import { NAV_LINKS } from '@/lib/constants'

export default function Navbar() {
  const navRef        = useRef<HTMLElement>(null)
  const [scrolled,    setScrolled]    = useState(false)
  const [mobileOpen,  setMobileOpen]  = useState(false)
  const [activeSection, setActiveSection] = useState('')
  const [logoVisible, setLogoVisible] = useState(false)

  // Show logo when loader completes
  useEffect(() => {
    if (document.body.classList.contains('loader-complete')) { setLogoVisible(true); return }
    const fb = setTimeout(() => setLogoVisible(true), 4000)
    const mo = new MutationObserver(() => {
      if (document.body.classList.contains('loader-complete')) { setLogoVisible(true); mo.disconnect() }
    })
    mo.observe(document.body, { attributes: true, attributeFilter: ['class'] })
    return () => { mo.disconnect(); clearTimeout(fb) }
  }, [])

  // Scroll state
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 80)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // GSAP hide/show on scroll direction
  useEffect(() => {
    if (!navRef.current) return
    let lastY = 0
    const onScroll = () => {
      const y = window.scrollY
      if (y < 80) gsap.to(navRef.current, { y: 0, duration: 0.3, ease: 'power2.out' })
      else if (y > lastY) gsap.to(navRef.current, { y: '-100%', duration: 0.3, ease: 'power2.out' })
      else gsap.to(navRef.current, { y: 0, duration: 0.3, ease: 'power2.out' })
      lastY = y
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Active section via IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll('section[id]')
    const io = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) setActiveSection(e.target.id) }),
      { rootMargin: '-50% 0px -50% 0px' }
    )
    sections.forEach(s => io.observe(s))
    return () => io.disconnect()
  }, [])

  const go = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault()
    setMobileOpen(false)
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <>
      <motion.nav
        ref={navRef}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.4, ease: 'easeOut' }}
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(8,8,8,0.85)' : 'transparent',
          backdropFilter:  scrolled ? 'blur(12px)' : 'none',
          borderBottom:    scrolled ? '1px solid #222' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <a href="#" style={{ opacity: logoVisible ? 1 : 0, transition: 'opacity 0.15s ease', display: 'flex', alignItems: 'center' }}>
            <span style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 20, letterSpacing: '-0.01em' }}>
              <span style={{ color: '#F0EDE6' }}>RELENTLESS </span>
              <span style={{ color: '#D4F044' }}>AIS</span>
            </span>
          </a>

          {/* Desktop Nav */}
          <LayoutGroup>
            <div className="hidden md:flex items-center gap-8">
              {NAV_LINKS.map(link => {
                const id = link.href.replace('#', '')
                const active = activeSection === id
                return (
                  <a
                    key={link.href}
                    href={link.href}
                    onClick={e => go(e, link.href)}
                    className="relative text-sm"
                    style={{ fontFamily: 'var(--font-dm-sans)', color: active ? '#D4F044' : '#888480', textDecoration: 'none', transition: 'color 0.2s' }}
                    onMouseEnter={e => (e.currentTarget.style.color = '#F0EDE6')}
                    onMouseLeave={e => (e.currentTarget.style.color = active ? '#D4F044' : '#888480')}
                  >
                    {link.label}
                    {active && (
                      <motion.span
                        layoutId="nav-indicator"
                        style={{ position: 'absolute', bottom: -2, left: 0, right: 0, height: 2, backgroundColor: '#D4F044' }}
                      />
                    )}
                  </a>
                )
              })}

              {/* Terminal cursor */}
              <span className="terminal-cursor" />

              <a
                href="#contact"
                onClick={e => go(e, '#contact')}
                style={{ fontFamily: 'var(--font-dm-sans)', backgroundColor: '#D4F044', color: '#080808', padding: '8px 20px', fontSize: 14, fontWeight: 500, textDecoration: 'none', transition: 'opacity 0.2s' }}
                onMouseEnter={e => (e.currentTarget.style.opacity = '0.85')}
                onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
              >
                Get in Touch →
              </a>
            </div>
          </LayoutGroup>

          {/* Hamburger */}
          <button className="md:hidden flex flex-col gap-1.5 p-2" onClick={() => setMobileOpen(v => !v)} aria-label="Toggle menu">
            {[0, 1, 2].map(i => (
              <span key={i} className="block w-6 h-0.5 transition-all duration-300" style={{
                backgroundColor: '#F0EDE6',
                transform: i === 0 && mobileOpen ? 'rotate(45deg) translateY(8px)' : i === 2 && mobileOpen ? 'rotate(-45deg) translateY(-8px)' : 'none',
                opacity: i === 1 && mobileOpen ? 0 : 1,
              }} />
            ))}
          </button>
        </div>
      </motion.nav>

      {/* Mobile overlay — scan sweep entrance */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ clipPath: 'inset(0 0 100% 0)' }}
            animate={{ clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: 'linear' }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center"
            style={{ backgroundColor: '#080808' }}
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={e => go(e, link.href)}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.08, duration: 0.4 }}
                  style={{ fontFamily: 'var(--font-syne)', fontWeight: 700, fontSize: 48, color: '#F0EDE6', textDecoration: 'none' }}
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={e => go(e, '#contact')}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 + NAV_LINKS.length * 0.08, duration: 0.4 }}
                style={{ marginTop: 16, fontFamily: 'var(--font-syne)', backgroundColor: '#D4F044', color: '#080808', padding: '16px 32px', fontSize: 18, fontWeight: 500, textDecoration: 'none' }}
              >
                Get in Touch →
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
