'use client'

import { useEffect, useRef, useState } from 'react'

interface LottiePlayerProps {
  src: string
  className?: string
  loop?: boolean
  autoplay?: boolean
  [key: string]: unknown
}

export function LottiePlayer({
  src,
  className,
  loop = true,
  autoplay = true,
  ...rest
}: LottiePlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const animInstanceRef = useRef<ReturnType<typeof import('lottie-web')['default']['loadAnimation']> | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const container = containerRef.current
    if (!container) return

    let cancelled = false

    import('lottie-web').then((lottie) => {
      if (cancelled || !container) return

      const anim = lottie.default.loadAnimation({
        container,
        renderer: 'svg',
        loop,
        autoplay,
        path: src,
      })

      animInstanceRef.current = anim

      anim.addEventListener('DOMLoaded', () => {
        if (!cancelled) setLoaded(true)
      })
    }).catch(() => {})

    return () => {
      cancelled = true
      if (animInstanceRef.current) {
        animInstanceRef.current.destroy()
        animInstanceRef.current = null
      }
    }
  }, [src, loop, autoplay])

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ opacity: loaded ? 1 : 0, transition: 'opacity 0.2s' }}
      {...rest}
    />
  )
}
