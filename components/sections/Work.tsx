'use client'

import { useReducedMotion, motion } from 'framer-motion'
import { PROJECTS } from '@/lib/constants'
import ProjectCard from '@/components/ui/ProjectCard'

export default function Work() {
  const shouldReduce = useReducedMotion()

  return (
    <section
      id="work"
      className="px-6 py-28 md:py-32"
      style={{ backgroundColor: '#080808' }}
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
          Our Work
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
          Built. Shipped.<br />Reviewed well.
        </motion.h2>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-16">
          {PROJECTS.map((project, i) => (
            <ProjectCard
              key={project.title}
              project={project}
              index={i}
              shouldReduce={shouldReduce ?? false}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
