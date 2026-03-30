'use client'

import { useState } from 'react'

interface UseCase {
  number: string
  title: string
  description: string
  whyBrightwave: string
  image?: {
    asset?: {
      url: string
      metadata?: { lqip?: string; dimensions?: { width: number; height: number } }
    }
  }
}

export function PrivateMarketsUseCases({ eyebrow, useCases }: { eyebrow?: string; useCases: UseCase[] }) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!useCases || useCases.length === 0) return null

  const active = useCases[activeIndex]

  return (
    <section className="c-section">
      <div className="c-container">
        {eyebrow && (
          <div className="eyebrow" style={{ marginBottom: '2.5rem' }}>
            <div className="block"></div>
            <div className="c-title-5">{eyebrow}</div>
          </div>
        )}
        <div style={{ display: 'grid', gridTemplateColumns: '280px 1fr 1fr', gap: '2rem', alignItems: 'start' }}>
          {/* Left sidebar - numbered list */}
          <div>
            {useCases.map((uc, i) => (
              <button
                key={i}
                type="button"
                onClick={() => setActiveIndex(i)}
                style={{
                  display: 'flex',
                  gap: '0.75rem',
                  alignItems: 'baseline',
                  width: '100%',
                  background: i === activeIndex ? '#0f0f0f' : 'none',
                  color: i === activeIndex ? '#ffffff' : 'inherit',
                  border: 'none',
                  borderBottom: '1px solid var(--lightmode--onsurface-border)',
                  padding: '1rem 0.75rem',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 0.3s ease',
                }}
              >
                <span className="c-text-link" style={{ flexShrink: 0 }}>{uc.number}.</span>
                <span className="c-text-link">{uc.title}</span>
              </button>
            ))}
          </div>

          {/* Center - image */}
          <div style={{ position: 'relative', width: '100%', aspectRatio: '3/4', overflow: 'hidden', borderRadius: '0.5rem', background: 'var(--lightmode--surface-2)' }}>
            {active.image?.asset?.url ? (
              <img
                src={active.image.asset.url}
                alt={active.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
            ) : (
              <img
                src={`/webflow-images/illustration_01${activeIndex > 0 ? `-${activeIndex}` : ''}.avif`}
                alt={active.title}
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                onError={(e) => { (e.target as HTMLImageElement).src = 'https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg'; (e.target as HTMLImageElement).style.objectFit = 'contain'; (e.target as HTMLImageElement).style.padding = '4rem'; (e.target as HTMLImageElement).style.opacity = '0.3'; }}
              />
            )}
          </div>

          {/* Right - description */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
            <div className="c-text-2">{active.description}</div>
            <div style={{ width: '100%', height: 1, background: 'var(--lightmode--onsurface-border)' }} />
            <div>
              <div className="c-text-link" style={{ marginBottom: '0.75rem', fontWeight: 700 }}>Why Brightwave works:</div>
              <div className="c-text-4">{active.whyBrightwave}</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
