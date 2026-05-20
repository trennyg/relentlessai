'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { Project } from '@/lib/constants'

interface ProjectCardProps {
  project: Project
  index: number
  shouldReduce?: boolean
}

export default function ProjectCard({ project, index, shouldReduce }: ProjectCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.1, duration: 0.5, ease: 'easeOut' }}
      className="rounded-sm overflow-hidden"
      style={{
        backgroundColor: '#111111',
        border: '1px solid #222222',
      }}
    >
      {/* Image container */}
      <div
        className="relative overflow-hidden"
        style={{ aspectRatio: '16/9' }}
      >
        {/* IN PRODUCTION badge */}
        {project.badge && (
          <div
            className="absolute top-3 left-3 z-10 flex items-center gap-1 px-2 py-1 text-[10px] font-bold rounded-sm"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              backgroundColor: '#D4F044',
              color: '#080808',
            }}
          >
            {project.badge}
          </div>
        )}

        <motion.div
          className="w-full h-full"
          whileHover={{ scale: 1.02 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          style={{ position: 'relative', width: '100%', height: '100%' }}
        >
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            onError={(e) => {
              // If image fails to load, hide the broken image element
              const target = e.currentTarget as HTMLImageElement
              target.style.display = 'none'
            }}
          />
          {/* Fallback dark bg if image missing */}
          <div
            className="absolute inset-0 -z-10"
            style={{ backgroundColor: '#1A1A1A' }}
          />
        </motion.div>
      </div>

      {/* Content */}
      <div className="p-6">
        {/* Tag row */}
        <div className="flex items-center gap-2 flex-wrap">
          <span
            className="text-[11px] tracking-widest uppercase px-2.5 py-1 rounded-sm"
            style={{
              fontFamily: 'var(--font-dm-mono)',
              color: '#888480',
              border: '1px solid #333',
            }}
          >
            {project.tag}
          </span>
        </div>

        {/* Title */}
        <h3
          className="mt-3 text-lg"
          style={{
            fontFamily: 'var(--font-syne)',
            fontWeight: 700,
            color: '#F0EDE6',
          }}
        >
          {project.title}
        </h3>

        {/* Description */}
        <p
          className="mt-2 text-sm leading-relaxed"
          style={{
            fontFamily: 'var(--font-dm-sans)',
            color: '#888480',
            lineHeight: '1.7',
          }}
        >
          {project.description}
        </p>

        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mt-4">
          {project.stack.map((tech) => (
            <span
              key={tech}
              className="text-[11px] px-2 py-1 rounded-sm"
              style={{
                fontFamily: 'var(--font-dm-mono)',
                color: '#888480',
                border: '1px solid #333',
              }}
            >
              {tech}
            </span>
          ))}
        </div>

        {/* Link — only shown when link exists and is not '#' */}
        {project.link && project.link !== '#' && (
          <div className="mt-4 pt-4" style={{ borderTop: '1px solid #222' }}>
            <a
              href={project.link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[13px] transition-colors duration-200"
              style={{
                fontFamily: 'var(--font-dm-mono)',
                color: '#D4F044',
                textDecoration: 'none',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.textDecoration = 'underline')}
              onMouseLeave={(e) => (e.currentTarget.style.textDecoration = 'none')}
            >
              View Live ↗
            </a>
          </div>
        )}
      </div>
    </motion.div>
  )
}
