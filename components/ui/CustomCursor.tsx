'use client'

import { useEffect, useRef } from 'react'

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null)
  const cursorDotRef = useRef<HTMLDivElement>(null)
  const posRef = useRef({ x: 0, y: 0 })
  const actualRef = useRef({ x: 0, y: 0 })
  const hovering = useRef(false)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    // Hide on touch devices
    if (window.matchMedia('(hover: none)').matches) return

    const cursor = cursorRef.current
    const dot = cursorDotRef.current
    if (!cursor || !dot) return

    cursor.style.opacity = '0'
    dot.style.opacity = '0'

    const handleMouseMove = (e: MouseEvent) => {
      posRef.current = { x: e.clientX, y: e.clientY }
      dot.style.left = `${e.clientX}px`
      dot.style.top = `${e.clientY}px`
      cursor.style.opacity = '1'
      dot.style.opacity = '1'
    }

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) {
        hovering.current = true
      }
    }

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [role="button"]')) {
        hovering.current = false
      }
    }

    const lerp = (start: number, end: number, factor: number) =>
      start + (end - start) * factor

    const animate = () => {
      actualRef.current.x = lerp(actualRef.current.x, posRef.current.x, 0.1)
      actualRef.current.y = lerp(actualRef.current.y, posRef.current.y, 0.1)

      if (cursor) {
        cursor.style.left = `${actualRef.current.x}px`
        cursor.style.top = `${actualRef.current.y}px`
        const size = hovering.current ? 40 : 12
        cursor.style.width = `${size}px`
        cursor.style.height = `${size}px`
      }

      rafRef.current = requestAnimationFrame(animate)
    }

    animate()

    window.addEventListener('mousemove', handleMouseMove)
    window.addEventListener('mouseover', handleMouseOver)
    window.addEventListener('mouseout', handleMouseOut)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      window.removeEventListener('mouseover', handleMouseOver)
      window.removeEventListener('mouseout', handleMouseOut)
      cancelAnimationFrame(rafRef.current)
    }
  }, [])

  return (
    <>
      {/* Lagging circle */}
      <div
        ref={cursorRef}
        className="cursor-circle"
        style={{
          position: 'fixed',
          width: '12px',
          height: '12px',
          borderRadius: '50%',
          backgroundColor: '#D4F044',
          pointerEvents: 'none',
          zIndex: 9999,
          transform: 'translate(-50%, -50%)',
          transition: 'width 0.2s ease, height 0.2s ease',
          mixBlendMode: 'difference',
        }}
      />
      {/* Instant dot */}
      <div
        ref={cursorDotRef}
        style={{
          position: 'fixed',
          width: '4px',
          height: '4px',
          borderRadius: '50%',
          backgroundColor: '#D4F044',
          pointerEvents: 'none',
          zIndex: 10000,
          transform: 'translate(-50%, -50%)',
          mixBlendMode: 'difference',
        }}
      />
    </>
  )
}
