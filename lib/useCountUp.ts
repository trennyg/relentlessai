'use client'

import { useState, useRef, useEffect } from 'react'

export function useCountUp(target: number, duration = 1500) {
  const [count, setCount]  = useState(0)
  const ref      = useRef<HTMLDivElement>(null)
  const animated = useRef(false)
  const rafRef   = useRef(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !animated.current) {
          animated.current = true
          observer.disconnect()
          const start = performance.now()
          const tick = (now: number) => {
            const elapsed  = now - start
            const progress = Math.min(elapsed / duration, 1)
            const ease     = 1 - Math.pow(1 - progress, 3)
            setCount(Math.floor(ease * target))
            if (progress < 1) rafRef.current = requestAnimationFrame(tick)
            else setCount(target)
          }
          rafRef.current = requestAnimationFrame(tick)
        }
      },
      { threshold: 0.5 }
    )
    observer.observe(el)

    return () => {
      observer.disconnect()
      cancelAnimationFrame(rafRef.current)
    }
  }, [target, duration])

  return { count, ref }
}
