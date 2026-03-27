'use client'

import { useState } from 'react'

interface TimelineItemData {
  _key?: string
  title: string
  description?: string
  beforeLabel?: string
  beforeValue?: string
  afterLabel?: string
  afterValue?: string
  timeSaved?: string
  problems?: string[]
}

export function AbmTimelineItem({ item }: { item: TimelineItemData }) {
  const [open, setOpen] = useState(false)

  const hasBanner = item.beforeValue && item.afterValue
  const hasDropdown = (item.problems && item.problems.length > 0) || item.timeSaved || hasBanner

  return (
    <div className="c-abm-temp-tl_item" style={{ padding: '.75rem 1rem' }}>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '.25rem', width: '100%' }}>
        <div className="c-text-3 cc-500">{item.title}</div>
        {item.description && (
          <p className="c-text-5" style={{ margin: 0 }}>{item.description}</p>
        )}

        {hasDropdown && (
          <>
            {/* Expanded content */}
            <div
              style={{
                overflow: 'hidden',
                maxHeight: open ? '600px' : '0',
                opacity: open ? 1 : 0,
                transition: 'max-height 0.35s ease, opacity 0.25s ease',
                width: '100%',
              }}
            >
              <div style={{ paddingTop: '.75rem', width: '100%' }}>
                {(item.timeSaved || hasBanner) && (
                  <div className="c-abm-temp-tl-item_dropdown-stats-block" style={{ width: '100%' }}>
                    {item.beforeValue && (
                      <div className="c-abm-temp-tl-item_stats-item cc-black">
                        <div className="c-text-6" style={{ opacity: 0.7 }}>{item.beforeLabel || 'Traditional'}</div>
                        <div className="c-text-4" style={{ fontWeight: 700 }}>{item.beforeValue}</div>
                      </div>
                    )}
                    {item.afterValue && (
                      <div className="c-abm-temp-tl-item_stats-item cc-yellow">
                        <div className="c-text-6">{item.afterLabel || 'With Brightwave'}</div>
                        <div className="c-text-4" style={{ fontWeight: 700 }}>{item.afterValue}</div>
                      </div>
                    )}
                    {item.timeSaved && (
                      <div className="c-abm-temp-tl-item_stats-item cc-white" style={{ gridColumn: 'span 2', border: '1px solid var(--lightmode--onsurface-border)' }}>
                        <div className="c-text-6">Time Saved</div>
                        <div className="c-text-4" style={{ fontWeight: 700 }}>{item.timeSaved}</div>
                      </div>
                    )}
                  </div>
                )}

                {item.problems && item.problems.length > 0 && (
                  <div style={{ marginTop: '.75rem', width: '100%' }}>
                    <div style={{ opacity: 0.1, backgroundColor: '#000', width: '100%', height: 1 }} />
                    <ul style={{ paddingLeft: '1.25rem', margin: '.5rem 0 0' }}>
                      {item.problems.map((problem, pi) => (
                        <li key={pi} className="c-text-5" style={{ marginBottom: '.25rem' }}>{problem}</li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>

            {/* Toggle button */}
            <div
              onClick={() => setOpen(!open)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
              style={{ display: 'flex', alignItems: 'center', gap: '.5rem', cursor: 'pointer', alignSelf: 'flex-end', marginTop: '.25rem' }}
            >
              <div className="c-text-5" style={{ fontWeight: 600 }}>{open ? 'Less' : 'More'}</div>
              <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
          </>
        )}
      </div>
    </div>
  )
}
