'use client'

import { useState } from 'react'
import Image from 'next/image'

const YELLOW = '#ffff25'
const CARD_DARK_BG = 'rgba(255,255,255,0.03)'
const CARD_DARK_BORDER = 'rgba(255,255,255,0.08)'

interface Output {
  tabLabel?: string
  description?: string
  image?: { asset?: { url?: string; metadata?: { lqip?: string; dimensions?: { width?: number; height?: number } } } }
}

export function FeatureOutputShowcase({ outputs }: { outputs: Output[] }) {
  const [active, setActive] = useState(0)

  if (!outputs || outputs.length === 0) return null
  const current = outputs[active]

  return (
    <div>
      {/* Tab bar */}
      <div style={{
        display: 'flex',
        gap: '8px',
        marginBottom: '40px',
        flexWrap: 'wrap',
      }}>
        {outputs.map((output, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            style={{
              background: i === active ? YELLOW : CARD_DARK_BG,
              color: i === active ? '#1a1a1a' : 'rgba(255,255,255,0.7)',
              border: i === active ? 'none' : `1px solid ${CARD_DARK_BORDER}`,
              borderRadius: '6px',
              padding: '10px 20px',
              fontSize: '0.9rem',
              fontWeight: i === active ? 600 : 400,
              cursor: 'pointer',
              transition: 'background 0.2s, color 0.2s',
            }}
          >
            {output.tabLabel || `Output ${i + 1}`}
          </button>
        ))}
      </div>

      {/* Content */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '40px',
        alignItems: 'center',
      }}>
        {current?.image?.asset?.url && (
          <div style={{
            borderRadius: '12px',
            overflow: 'hidden',
            background: CARD_DARK_BG,
            border: `1px solid ${CARD_DARK_BORDER}`,
          }}>
            <Image
              src={current.image.asset.url}
              alt={current.tabLabel || ''}
              width={current.image.asset.metadata?.dimensions?.width || 700}
              height={current.image.asset.metadata?.dimensions?.height || 450}
              style={{ width: '100%', height: 'auto', display: 'block' }}
            />
          </div>
        )}
        {current?.description && (
          <div>
            <p style={{ fontSize: '1.05rem', lineHeight: 1.7, color: 'rgba(255,255,255,0.8)' }}>
              {current.description}
            </p>
          </div>
        )}
      </div>
    </div>
  )
}
