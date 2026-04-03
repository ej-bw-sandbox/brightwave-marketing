'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'

interface Step {
  number?: string
  label?: string
  title?: string
  description?: string
  bullets?: any
  image?: { asset?: { url?: string; metadata?: { lqip?: string; dimensions?: { width?: number; height?: number } } } }
}

export function FeatureHowItWorks({ steps }: { steps: Step[] }) {
  const [active, setActive] = useState(0)

  if (!steps || steps.length === 0) return null
  const current = steps[active]

  return (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
        gap: '3rem',
        alignItems: 'start',
      }}
    >
      {/* Left: Stepped Timeline */}
      <div style={{ borderLeft: '1px solid var(--lightmode--onsurface-border, rgba(255,255,255,0.08))' }}>
        {steps.map((step, i) => {
          const isActive = i === active
          return (
            <div
              key={i}
              onClick={() => setActive(i)}
              style={{
                position: 'relative',
                paddingLeft: '2rem',
                paddingTop: '1.5rem',
                paddingBottom: '1.5rem',
                cursor: 'pointer',
              }}
            >
              {/* Active indicator line */}
              <div
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  bottom: 0,
                  width: '2px',
                  backgroundColor: isActive ? 'var(--lightmode--primary, #ffff25)' : 'transparent',
                  transition: 'background-color 0.3s',
                }}
              />
              {/* Dot */}
              <div
                style={{
                  position: 'absolute',
                  left: '-5px',
                  top: '2rem',
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  border: `2px solid ${isActive ? 'var(--lightmode--primary, #ffff25)' : 'var(--lightmode--onsurface-border, rgba(255,255,255,0.08))'}`,
                  backgroundColor: isActive ? 'var(--lightmode--primary, #ffff25)' : 'var(--lightmode--surface, #0a0a0a)',
                  transition: 'all 0.3s',
                }}
              />

              <div className="c-text-5" style={{ fontFamily: 'monospace', marginBottom: '0.5rem', opacity: isActive ? 1 : 0.5 }}>
                {step.number || String(i + 1).padStart(2, '0')} — {step.label || step.title || `Step ${i + 1}`}
              </div>
              {step.title && (
                <div className="c-text-3 cc-500" style={{ opacity: isActive ? 1 : 0.5, transition: 'opacity 0.3s' }}>
                  {step.title}
                </div>
              )}
              {isActive && step.description && (
                <div className="c-text-4" style={{ marginTop: '0.5rem' }}>
                  {step.description}
                </div>
              )}
              {isActive && step.bullets && Array.isArray(step.bullets) && (
                <div className="c-text-4" style={{ marginTop: '0.5rem' }}>
                  <PortableText components={ptComponents} value={step.bullets} />
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Right: Image Panel */}
      <div
        style={{
          position: 'relative',
          aspectRatio: '4/3',
          borderRadius: '0.75rem',
          overflow: 'hidden',
          border: '1px solid var(--lightmode--onsurface-border, rgba(255,255,255,0.08))',
          background: 'var(--lightmode--surface-1, #0c0c0c)',
        }}
      >
        {steps.map((step, i) => (
          step.image?.asset?.url && (
            <div
              key={i}
              style={{
                position: 'absolute',
                inset: 0,
                opacity: i === active ? 1 : 0,
                transition: 'opacity 0.5s',
              }}
            >
              <Image
                src={step.image.asset.url}
                alt={step.title || ''}
                width={step.image.asset.metadata?.dimensions?.width || 700}
                height={step.image.asset.metadata?.dimensions?.height || 450}
                style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }}
                {...(i === 0 ? { priority: true } : { loading: 'lazy' })}
              />
            </div>
          )
        ))}
        {/* Fallback when no images */}
        {!steps.some(s => s.image?.asset?.url) && (
          <div style={{ position: 'absolute', inset: 0, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
            <div style={{ textAlign: 'center' }}>
              <div className="c-title-5" style={{ color: 'var(--lightmode--primary)', marginBottom: '0.75rem' }}>
                STEP {current?.number || String(active + 1).padStart(2, '0')}
              </div>
              {current?.title && <div className="c-text-3 cc-500" style={{ marginBottom: '0.5rem' }}>{current.title}</div>}
              {current?.description && <div className="c-text-4">{current.description}</div>}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
