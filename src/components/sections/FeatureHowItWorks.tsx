'use client'

import { useState } from 'react'
import Image from 'next/image'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'

const DARK_BG = '#1a1a1a'
const YELLOW = '#ffff25'
const CARD_DARK_BG = 'rgba(255,255,255,0.03)'
const CARD_DARK_BORDER = 'rgba(255,255,255,0.08)'

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
    <div>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        gap: '0',
        borderBottom: `1px solid ${CARD_DARK_BORDER}`,
        marginBottom: '48px',
        overflowX: 'auto',
      }}>
        {steps.map((step, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              background: 'none',
              border: 'none',
              borderBottom: i === active ? `3px solid ${YELLOW}` : '3px solid transparent',
              color: i === active ? '#ffffff' : 'rgba(255,255,255,0.5)',
              padding: '16px 24px',
              fontSize: '0.95rem',
              fontWeight: i === active ? 600 : 400,
              cursor: 'pointer',
              whiteSpace: 'nowrap',
              transition: 'color 0.2s, border-color 0.2s',
            }}
          >
            <span style={{ color: YELLOW, marginRight: '8px', fontWeight: 700 }}>
              {step.number || String(i + 1).padStart(2, '0')}
            </span>
            {step.label || step.title || `Step ${i + 1}`}
          </button>
        ))}
      </div>

      {/* Content area */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '48px',
        alignItems: 'center',
      }}>
        {/* Image */}
        {current?.image?.asset?.url && (
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            background: CARD_DARK_BG,
            border: `1px solid ${CARD_DARK_BORDER}`,
          }}>
            <Image
              src={current.image.asset.url}
              alt={current.title || ''}
              width={current.image.asset.metadata?.dimensions?.width || 700}
              height={current.image.asset.metadata?.dimensions?.height || 450}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}

        {/* Text */}
        <div>
          <div style={{
            display: 'inline-block',
            background: YELLOW,
            color: DARK_BG,
            fontSize: '0.75rem',
            fontWeight: 700,
            padding: '4px 10px',
            borderRadius: '4px',
            marginBottom: '16px',
          }}>
            STEP {current?.number || String(active + 1).padStart(2, '0')}
          </div>
          {current?.title && (
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '12px', lineHeight: 1.3 }}>
              {current.title}
            </h3>
          )}
          {current?.description && (
            <p style={{ color: 'rgba(255,255,255,0.75)', fontSize: '1rem', lineHeight: 1.7, marginBottom: '16px' }}>
              {current.description}
            </p>
          )}
          {current?.bullets && Array.isArray(current.bullets) && (
            <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.7 }}>
              <PortableText components={ptComponents} value={current.bullets} />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
