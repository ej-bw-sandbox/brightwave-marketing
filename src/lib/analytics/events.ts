'use client'

import posthog from 'posthog-js'

declare global {
  interface Window {
    gtag?: (...args: any[]) => void
  }
}

export function trackConversion(event: string, properties: Record<string, any> = {}) {
  posthog.capture(event, properties)

  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', event, properties)
  }
}
