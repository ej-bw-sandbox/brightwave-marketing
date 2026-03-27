'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

/**
 * A sticky CTA button that appears inside the comparison hero dual-block.
 * On desktop: becomes visible once the user scrolls past the hero area (~500px).
 * On mobile/tablet: the Webflow CSS makes it position:fixed at the bottom of the screen,
 *   so the scroll-based visibility still applies but the positioning is handled by CSS.
 */
export function StickyComparisonCta({ href = '/pricing', label = 'Make the Switch' }: { href?: string; label?: string }) {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const SCROLL_THRESHOLD = 500

    function handleScroll() {
      setVisible(window.scrollY > SCROLL_THRESHOLD)
    }

    // Check initial scroll position (e.g. on page restore)
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div
      className="c-comparison-hero_button-wrapper"
      style={{
        zIndex: visible ? 10 : -1,
        transform: visible ? 'translateY(0)' : 'translateY(1rem)',
        opacity: visible ? 1 : 0,
        transition: 'transform 0.5s ease, opacity 0.4s ease',
      }}
    >
      <Link href={href} className="cta-p-sm w-inline-block">
        <div>
          <div className="c-text-link cc-stagger-cta">{label}</div>
        </div>
        <div className="flip-small">
          <div className="flip-bg"></div>
        </div>
        <div className="flip-big">
          <div className="svg cta-sm-arrow w-embed">
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
              <g clipPath="url(#clip0_sticky_cta)">
                <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
              </g>
              <defs>
                <clipPath id="clip0_sticky_cta">
                  <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)" />
                </clipPath>
              </defs>
            </svg>
          </div>
        </div>
      </Link>
    </div>
  )
}
