'use client'

import Lottie from 'lottie-react'
import { useEffect, useState } from 'react'

interface LottiePlayerProps {
  src: string
  className?: string
  loop?: boolean
  autoplay?: boolean
  /** Extra HTML attributes to forward (e.g. data-w-id, slice, etc.) */
  [key: string]: unknown
}

export function LottiePlayer({
  src,
  className,
  loop = true,
  autoplay = true,
  ...rest
}: LottiePlayerProps) {
  const [animationData, setAnimationData] = useState<object | null>(null)

  useEffect(() => {
    let cancelled = false
    fetch(src)
      .then((r) => r.json())
      .then((data) => {
        if (!cancelled) setAnimationData(data)
      })
      .catch(() => {
        /* silently ignore – the div stays hidden */
      })
    return () => {
      cancelled = true
    }
  }, [src])

  if (!animationData) return <div className={className} />

  return (
    <Lottie
      animationData={animationData}
      loop={loop}
      autoplay={autoplay}
      className={className}
    />
  )
}
