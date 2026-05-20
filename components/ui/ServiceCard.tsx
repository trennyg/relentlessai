'use client'

import { motion } from 'framer-motion'
import { ArrowUpRight, LayoutGrid, RefreshCw } from 'lucide-react'
import { Service } from '@/lib/constants'

const iconMap: Record<string, React.ElementType> = {
  ArrowUpRight,
  LayoutGrid,
  RefreshCw,
}

interface ServiceCardProps {
  service: Service
  index: number
  shouldReduce?: boolean
}

export default function ServiceCard({ service, index, shouldReduce }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || ArrowUpRight

  return (
    <motion.div
      initial={{ opacity: 0, y: shouldReduce ? 0 : 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-100px' }}
      transition={{ delay: index * 0.15, duration: 0.5, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="p-8 rounded-sm transition-colors duration-300 cursor-default"
      style={{
        backgroundColor: '#111111',
        border: '1px solid #222222',
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.borderColor = 'rgba(212,240,68,0.3)'
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.borderColor = '#222222'
      }}
    >
      {/* Icon */}
      <div style={{ color: '#D4F044' }}>
        <Icon size={48} strokeWidth={1.5} />
      </div>

      {/* Title */}
      <h3
        className="mt-6 text-xl"
        style={{
          fontFamily: 'var(--font-syne)',
          fontWeight: 700,
          color: '#F0EDE6',
        }}
      >
        {service.title}
      </h3>

      {/* Body */}
      <p
        className="mt-3 text-sm leading-relaxed"
        style={{
          fontFamily: 'var(--font-dm-sans)',
          color: '#888480',
          lineHeight: '1.7',
        }}
      >
        {service.body}
      </p>

      {/* For: divider row */}
      <div
        className="mt-6 pt-4"
        style={{ borderTop: '1px solid #222222' }}
      >
        <p
          className="text-xs tracking-wide"
          style={{
            fontFamily: 'var(--font-dm-mono)',
            color: '#888480',
          }}
        >
          <span style={{ color: '#555' }}>For: </span>
          {service.forList.join(' · ')}
        </p>
      </div>
    </motion.div>
  )
}
