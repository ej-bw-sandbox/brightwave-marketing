'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface TestimonialSlide {
  eyebrow?: string
  quote: string
  attribution?: string
}

interface TestimonialSliderProps {
  testimonials: TestimonialSlide[]
  /** Auto-advance interval in ms. Set to 0 to disable. Defaults to 8000. */
  autoPlayInterval?: number
  label?: string
}

/**
 * Homepage testimonial slider with fade transitions and arrow navigation.
 * Matches the Webflow slider-wrap layout with prev/next arrows.
 */
export function TestimonialSlider({
  testimonials,
  autoPlayInterval = 8000,
  label,
}: TestimonialSliderProps) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [exitingIndex, setExitingIndex] = useState<number | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const total = testimonials.length

  const goTo = useCallback(
    (next: number) => {
      if (next === activeIndex) return
      setExitingIndex(activeIndex)
      setActiveIndex(next)
      // Clear exiting state after animation completes
      setTimeout(() => setExitingIndex(null), 500)
    },
    [activeIndex],
  )

  const goNext = useCallback(() => {
    goTo((activeIndex + 1) % total)
  }, [activeIndex, total, goTo])

  const goPrev = useCallback(() => {
    goTo((activeIndex - 1 + total) % total)
  }, [activeIndex, total, goTo])

  // Auto-advance
  useEffect(() => {
    if (autoPlayInterval <= 0 || total <= 1) return
    timerRef.current = setTimeout(goNext, autoPlayInterval)
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    }
  }, [activeIndex, autoPlayInterval, total, goNext])

  if (total === 0) return null

  return (
    <div
      className="testimonial-slider"
      role="region"
      aria-roledescription="carousel"
      aria-label={label || 'Testimonials'}
      onMouseEnter={() => {
        if (timerRef.current) clearTimeout(timerRef.current)
      }}
      onMouseLeave={() => {
        if (autoPlayInterval > 0 && total > 1) {
          timerRef.current = setTimeout(goNext, autoPlayInterval)
        }
      }}
    >
      <div className="slider w-dyn-list">
        <div role="list" className="slider_list w-dyn-items" style={{ position: 'relative' }}>
          {testimonials.map((t, i) => {
            const isActive = i === activeIndex
            const isExiting = i === exitingIndex

            return (
              <div
                key={i}
                role="listitem"
                className="slider_cms-item w-dyn-item"
                style={{
                  position: i === 0 ? 'relative' : 'absolute',
                  inset: 0,
                  opacity: isActive ? 1 : 0,
                  transition: 'opacity 0.5s ease',
                  pointerEvents: isActive ? 'auto' : 'none',
                  ...(isExiting ? { opacity: 0 } : {}),
                }}
                aria-hidden={!isActive}
              >
                <div className="slider_item">
                  <div className="slider_flex">
                    <div className="c-title-4" style={{ color: '#ffffff' }}>{t.quote}</div>
                    {t.eyebrow && (
                      <div className="eyebrow-flex">
                        <div className="block cc-primary"></div>
                        <div className="c-title-5 cc-primary">{t.eyebrow}</div>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Navigation arrows */}
      {total > 1 && (
        <div className="slider_arrows">
          <button
            type="button"
            id="arrow-left"
            className="slider_arrow cc-prev"
            onClick={goPrev}
            aria-label="Previous testimonial"
          >
            <div className="svg cc-nav-arrow-bg w-embed">
              <svg width={54} height={51} viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M54 5.59996L48.75 -3.8147e-05H6L0.375 5.99996L0 5.59996V45.4L0.375 45L6 51H48.75L54 45.4V5.59996Z" fill="white" />
              </svg>
            </div>
            <div className="arrow-wrap cc-2">
              <div className="nav_arrow-svg cc-slider w-embed">
                <svg width={28} height={27} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_prev_1)">
                    <path d="M13.1074 24.8372L1.73026 13.46L13.0351 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel" />
                    <path d="M1.73274 13.4614L26.6312 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel" />
                  </g>
                  <defs>
                    <clipPath id="clip0_prev_1">
                      <rect width="19.1528" height="19.031" fill="white" transform="translate(14.043 27) rotate(-135)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="arrow-wrap">
              <div className="nav_arrow-svg cc-slider w-embed">
                <svg width={28} height={27} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_prev_2)">
                    <path d="M13.1074 24.8372L1.73026 13.46L13.0351 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel" />
                    <path d="M1.73274 13.4614L26.6312 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel" />
                  </g>
                  <defs>
                    <clipPath id="clip0_prev_2">
                      <rect width="19.1528" height="19.031" fill="white" transform="translate(14.043 27) rotate(-135)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </button>
          <button
            type="button"
            id="arrow-right"
            className="slider_arrow"
            onClick={goNext}
            aria-label="Next testimonial"
          >
            <div className="svg cc-nav-arrow-bg w-embed">
              <svg width={54} height={51} viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M54 5.59996L48.75 -3.8147e-05H6L0.375 5.99996L0 5.59996V45.4L0.375 45L6 51H48.75L54 45.4V5.59996Z" fill="white" />
              </svg>
            </div>
            <div className="arrow-wrap cc-2">
              <div className="nav_arrow-svg cc-slider w-embed">
                <svg width={28} height={27} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_next_1)">
                    <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel" />
                    <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel" />
                  </g>
                  <defs>
                    <clipPath id="clip0_next_1">
                      <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
            <div className="arrow-wrap">
              <div className="nav_arrow-svg cc-slider w-embed">
                <svg width={28} height={27} viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clipPath="url(#clip0_next_2)">
                    <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel" />
                    <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel" />
                  </g>
                  <defs>
                    <clipPath id="clip0_next_2">
                      <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)" />
                    </clipPath>
                  </defs>
                </svg>
              </div>
            </div>
          </button>
        </div>
      )}

      {/* Dot indicators */}
      {total > 1 && (
        <div
          style={{
            display: 'flex',
            gap: '0.5rem',
            justifyContent: 'center',
            position: 'absolute',
            bottom: '1.25rem',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
          role="tablist"
          aria-label="Testimonial slides"
        >
          {testimonials.map((_, i) => (
            <button
              key={i}
              type="button"
              role="tab"
              aria-selected={i === activeIndex}
              aria-label={`Go to slide ${i + 1}`}
              onClick={() => goTo(i)}
              style={{
                width: '0.5rem',
                height: '0.5rem',
                borderRadius: '50%',
                border: 'none',
                cursor: 'pointer',
                backgroundColor: i === activeIndex ? 'var(--lightmode--primary, #ffff25)' : 'rgba(255,255,255,0.3)',
                transition: 'background-color 0.3s ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
