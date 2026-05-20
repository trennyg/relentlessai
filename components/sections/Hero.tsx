'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, type Variants, type Transition } from 'framer-motion'

export default function Hero() {
  const shouldReduce = useReducedMotion()
  const [scrolled, setScrolled] = useState(false)
  const indicatorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const headline = ['We', 'build', 'digital', 'products', 'that', 'think.']

  const wordVariants: Variants = {
    hidden: { opacity: 0, y: shouldReduce ? 0 : 40 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.1 + i * 0.08,
        duration: 0.5,
        ease: 'easeOut',
      } as Transition,
    }),
  }

  const fadeUp = (delay: number): Variants => ({
    hidden: { opacity: 0, y: shouldReduce ? 0 : 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { delay, duration: 0.5, ease: 'easeOut' } as Transition,
    },
  })

  return (
    <section
      className="relative min-h-screen flex flex-col items-center justify-center text-center px-6 overflow-hidden"
      style={{ backgroundColor: '#080808' }}
    >
      {/* Radial gradient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: 'radial-gradient(ellipse 60% 50% at 50% 50%, rgba(212,240,68,0.04) 0%, transparent 70%)',
        }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Studio label */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.1)}
          className="text-xs tracking-[0.3em] uppercase mb-8"
          style={{
            fontFamily: 'var(--font-dm-mono)',
            color: '#D4F044',
          }}
        >
          Digital Product Studio
        </motion.p>

        {/* Headline */}
        <h1
          className="leading-none mb-6"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 800,
            fontSize: 'clamp(2.5rem, 7vw, 5rem)',
            letterSpacing: '-0.02em',
          }}
        >
          {/* Line 1 */}
          <span className="block">
            {headline.slice(0, 3).map((word, i) => (
              <motion.span
                key={i}
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
                style={{ color: '#F0EDE6' }}
              >
                {word}
              </motion.span>
            ))}
          </span>
          {/* Line 2 */}
          <span className="block">
            {headline.slice(3, 5).map((word, i) => (
              <motion.span
                key={i + 3}
                custom={i + 3}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
                className="inline-block mr-[0.25em]"
                style={{ color: '#F0EDE6' }}
              >
                {word}
              </motion.span>
            ))}
            {/* "think." in accent color */}
            <motion.span
              custom={5}
              initial="hidden"
              animate="visible"
              variants={wordVariants}
              className="inline-block"
              style={{ color: '#D4F044' }}
            >
              think.
            </motion.span>
          </span>
        </h1>

        {/* Sub-headline */}
        <motion.p
          initial="hidden"
          animate="visible"
          variants={fadeUp(0.75)}
          className="max-w-[560px] mx-auto mt-6 text-lg leading-relaxed"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            color: '#888480',
          }}
        >
          Premium websites, AI dashboards, and automation pipelines for businesses that want to stand out and operate smarter.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeUp(1.0)}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mt-10"
        >
          <a
            href="#work"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#work')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-7 py-3.5 text-sm font-medium rounded-sm transition-all duration-200 hover:opacity-90 hover:scale-[1.02]"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              backgroundColor: '#D4F044',
              color: '#080808',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
          >
            See Our Work →
          </a>
          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              document.querySelector('#contact')?.scrollIntoView({ behavior: 'smooth' })
            }}
            className="px-7 py-3.5 text-sm font-medium rounded-sm transition-all duration-200"
            style={{
              fontFamily: 'var(--font-dm-sans)',
              backgroundColor: 'transparent',
              color: '#F0EDE6',
              border: '1px solid #444',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = '#D4F044'
              e.currentTarget.style.color = '#D4F044'
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = '#444'
              e.currentTarget.style.color = '#F0EDE6'
            }}
          >
            Get In Touch
          </a>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        ref={indicatorRef}
        animate={{ opacity: scrolled ? 0 : 1 }}
        transition={{ duration: 0.4 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ pointerEvents: 'none' }}
      >
        <span
          className="text-[11px] tracking-[0.2em] uppercase"
          style={{ fontFamily: 'var(--font-dm-mono)', color: '#888480' }}
        >
          scroll
        </span>
        <div
          className="w-px h-8 overflow-hidden"
          style={{ backgroundColor: 'rgba(136,132,128,0.3)' }}
        >
          <motion.div
            className="w-full h-full"
            style={{ backgroundColor: '#888480' }}
            animate={{ y: ['-100%', '100%'] }}
            transition={{ duration: 1.5, repeat: Infinity, ease: 'linear' }}
          />
        </div>
      </motion.div>
    </section>
  )
}
