'use client'

import { useReducedMotion, motion } from 'framer-motion'
import { TESTIMONIALS } from '@/lib/constants'
import ScanReveal from '@/components/ui/ScanReveal'

export default function Testimonials() {
  const shouldReduce = useReducedMotion()

  return (
    <ScanReveal>
    <section
      id="testimonials"
      className="px-6 py-28 md:py-32"
      style={{ backgroundColor: '#111111' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <motion.p
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.5 }}
          className="text-xs tracking-[0.3em] uppercase text-center"
          style={{ fontFamily: 'var(--font-dm-mono)', color: '#D4F044' }}
        >
          What Clients Say
        </motion.p>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="text-center mt-4"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: 'clamp(2rem, 4vw, 3rem)',
            color: '#F0EDE6',
            lineHeight: 1.15,
          }}
        >
          Don&apos;t take<br />our word for it.
        </motion.h2>

        {/* Desktop grid / Mobile scroll */}
        <motion.div
          initial={{ opacity: 0, y: shouldReduce ? 0 : 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="mt-16"
        >
          {/* Mobile: horizontal scroll */}
          <div className="md:hidden flex gap-5 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="snap-start flex-shrink-0 p-8 rounded-sm"
                style={{
                  minWidth: '85vw',
                  backgroundColor: '#1A1A1A',
                  border: '1px solid #222',
                }}
              >
                <TestimonialCardContent testimonial={t} />
              </div>
            ))}
          </div>

          {/* Desktop: 3-column grid */}
          <div className="hidden md:grid md:grid-cols-3 gap-6">
            {TESTIMONIALS.map((t, i) => (
              <div
                key={i}
                className="p-8 rounded-sm"
                style={{
                  backgroundColor: '#1A1A1A',
                  border: '1px solid #222',
                }}
              >
                <TestimonialCardContent testimonial={t} />
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
    </ScanReveal>
  )
}

function TestimonialCardContent({ testimonial }: { testimonial: typeof TESTIMONIALS[0] }) {
  return (
    <>
      {/* Large quote mark */}
      <div
        style={{
          fontFamily: 'var(--font-syne)',
          fontSize: '80px',
          lineHeight: '1',
          color: '#D4F044',
          marginBottom: '-16px',
          fontWeight: 700,
        }}
        aria-hidden="true"
      >
        &ldquo;
      </div>

      {/* Quote */}
      <p
        className="italic leading-relaxed"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          fontSize: '16px',
          color: '#F0EDE6',
          lineHeight: '1.8',
        }}
      >
        {testimonial.quote}
      </p>

      {/* Divider */}
      <div
        className="mt-6 pt-5"
        style={{ borderTop: '1px solid #222' }}
      >
        {/* Name */}
        <p
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            fontSize: '15px',
            color: '#F0EDE6',
          }}
        >
          {testimonial.name}
        </p>

        {/* Role */}
        <p
          className="mt-1"
          style={{
            fontFamily: 'var(--font-dm-mono)',
            fontSize: '12px',
            color: '#888480',
          }}
        >
          {testimonial.role}
        </p>

        {/* Tag */}
        <div className="mt-4">
          <span
            className="inline-block px-2.5 py-1 rounded-sm text-[10px] tracking-wider uppercase"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              color: '#888480',
              border: '1px solid #333',
            }}
          >
            {testimonial.tag}
          </span>
        </div>
      </div>
    </>
  )
}
