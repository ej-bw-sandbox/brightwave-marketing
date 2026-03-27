'use client'

import { useEffect, useRef, useState } from 'react'

interface LogoItem {
  src: string
  alt: string
  width: number
}

interface LogoMarqueeProps {
  logos: LogoItem[]
  /** Scroll speed in pixels per second. Defaults to 40. */
  speed?: number
  /** Direction of scroll. Defaults to 'left'. */
  direction?: 'left' | 'right'
  /** Whether to pause on hover. Defaults to true. */
  pauseOnHover?: boolean
  className?: string
}

/**
 * Infinite horizontal marquee for logo galleries.
 * Uses pure CSS animations with duplicated content for seamless looping.
 * Respects prefers-reduced-motion by pausing the animation.
 */
export function LogoMarquee({
  logos,
  speed = 40,
  direction = 'left',
  pauseOnHover = true,
  className = '',
}: LogoMarqueeProps) {
  const trackRef = useRef<HTMLDivElement>(null)
  const [duration, setDuration] = useState(30)

  useEffect(() => {
    if (!trackRef.current) return
    // Measure the width of one set of logos to calculate animation duration
    const children = trackRef.current.children
    if (children.length === 0) return
    // Each set of logos is half the total children (we duplicate once)
    let totalWidth = 0
    const halfCount = children.length / 2
    for (let i = 0; i < halfCount; i++) {
      totalWidth += (children[i] as HTMLElement).offsetWidth
    }
    // Account for gaps (0.625rem = ~10px per gap)
    totalWidth += (halfCount - 1) * 10
    const calculatedDuration = totalWidth / speed
    setDuration(Math.max(calculatedDuration, 5))
  }, [logos, speed])

  if (logos.length === 0) return null

  function renderLogos(prefix: string) {
    return logos.map((logo, i) => (
      <img
        key={`${prefix}-${i}`}
        src={logo.src}
        alt={logo.alt}
        width={logo.width}
        loading="eager"
        className="logo_item"
        style={{ flex: 'none' }}
      />
    ))
  }

  return (
    <div
      className={`logo-marquee ${className}`}
      style={{
        position: 'relative',
        overflow: 'hidden',
        width: '100%',
      }}
    >
      {/* Left fade edge */}
      <div
        className="logo-marquee__fade-left"
        aria-hidden="true"
      />
      {/* Right fade edge */}
      <div
        className="logo-marquee__fade-right"
        aria-hidden="true"
      />
      <div
        ref={trackRef}
        className="logo-marquee__track"
        style={{
          display: 'flex',
          gap: '0.625rem',
          width: 'max-content',
          animationName: direction === 'left' ? 'marquee-scroll-left' : 'marquee-scroll-right',
          animationDuration: `${duration}s`,
          animationTimingFunction: 'linear',
          animationIterationCount: 'infinite',
          willChange: 'transform',
        }}
        data-pause-on-hover={pauseOnHover ? '' : undefined}
      >
        {renderLogos('a')}
        {/* Duplicate for seamless loop */}
        {renderLogos('b')}
      </div>
    </div>
  )
}
