'use client'

import { useState, useEffect, useRef, useCallback } from 'react'

const features = [
  {
    title: 'Custom Research on Autopilot',
    description: 'Assign complex, long-running tasks to agents that run in the background so you can keep moving forward.',
    image: '/webflow-images/illustration_01.avif',
  },
  {
    title: 'Reports, Charts, Tables, Grids, Slides & More',
    description: 'From deep research reports and slide decks to grids that extract data from hundreds of documents simultaneously, Brightwave outputs go way beyond chat.',
    image: '/webflow-images/illustration_01-1.avif',
  },
  {
    title: '2000+ Document Data Rooms',
    description: 'Brightwave speaks your language. Work with PDFs, Word, Excel, SEC filings, earnings calls, cloud storage and more.',
    image: '/webflow-images/illustration_01-2.avif',
  },
]

const AUTOPLAY_DURATION = 10000

export default function KeyFeatures() {
  const [activeIndex, setActiveIndex] = useState(0)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const startTimer = useCallback((idx: number) => {
    if (timerRef.current) clearTimeout(timerRef.current)
    timerRef.current = setTimeout(() => {
      setActiveIndex((idx + 1) % features.length)
    }, AUTOPLAY_DURATION)
  }, [])

  useEffect(() => {
    startTimer(activeIndex)
    return () => { if (timerRef.current) clearTimeout(timerRef.current) }
  }, [activeIndex, startTimer])

  const handleClick = (idx: number) => {
    setActiveIndex(idx)
  }

  return (
    <div className="v-20">
      <div className="eyebrow">
        <div className="block"></div>
        <div className="c-title-5">Key Features</div>
      </div>
      <div className="steps">
        <div className="steps_left">
          {features.map((feature, idx) => (
            <div
              key={idx}
              className={`step${idx === activeIndex ? ' cc-active' : ''}`}
              onClick={() => handleClick(idx)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') handleClick(idx) }}
            >
              <div className="step_top">
                <div className="steps_title">
                  <div step-title="" className="c-title-4">{feature.title}</div>
                  <div className="arrow">
                    <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 28 27" fill="none">
                      <g clipPath="url(#clip0_2339_2372)">
                        <path d="M14.8906 24.8369L26.2678 13.4597L14.963 2.15494" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel" />
                        <path d="M26.2624 13.4613L1.36393 13.5407" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel" />
                      </g>
                    </svg>
                  </div>
                </div>
                <div className="steps_line">
                  <div
                    className="steps_line_inner"
                    key={idx === activeIndex ? `active-${idx}` : `inactive-${idx}`}
                  />
                </div>
              </div>
              <div className="step_bottom">
                <div className="c-text-3 w-richtext">
                  <p>{feature.description}</p>
                </div>
                <img src={feature.image} loading="lazy" alt="" className="_64_icon" />
              </div>
            </div>
          ))}
        </div>
        <div>
          <div className="h-line"></div>
        </div>
        <div className="steps_spacer"></div>
      </div>
    </div>
  )
}
