'use client'

import { useEffect, useRef } from 'react'

interface FadeInOnScrollProps {
  children: React.ReactNode
  /** Intersection Observer threshold. Defaults to 0.1. */
  threshold?: number
  /** Root margin for early/late triggering. Defaults to '0px 0px -40px 0px'. */
  rootMargin?: string
  className?: string
}

/**
 * Wraps children with a fade-in-on-scroll animation using Intersection Observer.
 * Adds the `fade-in-on-scroll` class which transitions from opacity 0 + translateY(24px)
 * to full visibility when the element enters the viewport.
 */
export function FadeInOnScroll({
  children,
  threshold = 0.1,
  rootMargin = '0px 0px -40px 0px',
  className = '',
}: FadeInOnScrollProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    // Check for reduced motion preference
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReducedMotion) {
      el.classList.add('fade-in-on-scroll--visible')
      return
    }

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('fade-in-on-scroll--visible')
            observer.unobserve(entry.target)
          }
        }
      },
      { threshold, rootMargin },
    )

    observer.observe(el)

    return () => {
      observer.unobserve(el)
    }
  }, [threshold, rootMargin])

  return (
    <div ref={ref} className={`fade-in-on-scroll ${className}`}>
      {children}
    </div>
  )
}
