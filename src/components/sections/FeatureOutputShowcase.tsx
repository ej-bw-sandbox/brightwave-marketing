'use client'

import { useState } from 'react'
import Image from 'next/image'

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
      {/* Pill Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-10">
        {outputs.map((output, i) => (
          <button
            key={i}
            onClick={() => setActive(i)}
            className={`px-5 py-2.5 rounded-full text-sm font-semibold whitespace-nowrap transition-all border ${
              i === active
                ? 'bg-[var(--lightmode--primary,#ffff25)] text-[var(--darkmode--background,#0a0a0a)] border-[var(--lightmode--primary,#ffff25)]'
                : 'bg-transparent text-[var(--darkmode--onsurface-muted,rgba(255,255,255,0.5))] border-[var(--colorprimitives--gray-700,rgba(255,255,255,0.08))] hover:text-white hover:border-[rgba(255,255,255,0.2)]'
            }`}
          >
            {output.tabLabel || `Output ${i + 1}`}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="grid lg:grid-cols-2 gap-10 items-center">
        {current?.image?.asset?.url && (
          <div className="rounded-xl overflow-hidden border border-[var(--colorprimitives--gray-700,rgba(255,255,255,0.08))]">
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
            <p className="c-text-3">{current.description}</p>
          </div>
        )}
      </div>
    </div>
  )
}
