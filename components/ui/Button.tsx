'use client'
import { motion } from 'framer-motion'
import React from 'react'

interface ButtonProps {
  variant?: 'filled' | 'ghost'
  children: React.ReactNode
  onClick?: () => void
  href?: string
  className?: string
  type?: 'button' | 'submit'
  disabled?: boolean
}

export default function Button({
  variant = 'filled',
  children,
  onClick,
  href,
  className = '',
  type = 'button',
  disabled = false,
}: ButtonProps) {
  const baseClasses = `inline-flex items-center gap-2 px-6 py-3 font-medium text-sm transition-all duration-200 rounded-sm cursor-pointer ${className}`

  const variantClasses =
    variant === 'filled'
      ? 'bg-[#D4F044] text-[#080808] hover:bg-[#9DB030]'
      : 'bg-transparent border border-[#444] text-[#F0EDE6] hover:border-[#D4F044] hover:text-[#D4F044]'

  const motionProps = {
    whileHover: { scale: 1.02 },
    whileTap: { scale: 0.98 },
    transition: { duration: 0.15 },
  }

  if (href) {
    return (
      <motion.a
        href={href}
        className={`${baseClasses} ${variantClasses}`}
        {...motionProps}
      >
        {children}
      </motion.a>
    )
  }

  return (
    <motion.button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variantClasses} disabled:opacity-50 disabled:cursor-not-allowed`}
      {...motionProps}
    >
      {children}
    </motion.button>
  )
}
