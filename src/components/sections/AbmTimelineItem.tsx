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
      <div className="c-abm-temp-tl-item_content" style={{ gap: 0 }}>
        <div className="c-abm-temo-tl-item_top" style={{ gap: '.25rem' }}>
          <div className="c-text-3 cc-500">{item.title}</div>
          {item.description && (
            <p className="c-text-5" style={{ margin: 0 }}>{item.description}</p>
          )}
        </div>

        {hasDropdown && (
          <div className="c-abm-temp-tl-item_dropdown" style={{ marginTop: '.5rem' }}>
            <div
              className={`c-abm-temp-tl-item_dropdown-toggle${open ? ' w--open' : ''}`}
              onClick={() => setOpen(!open)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
              style={{ cursor: 'pointer' }}
            >
              <div className="c-text-5" style={{ fontWeight: 600 }}>{open ? 'Less' : 'More'}</div>
              <div style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            <div
              style={{
                overflow: 'hidden',
                maxHeight: open ? '500px' : '0',
                opacity: open ? 1 : 0,
                transition: 'max-height 0.35s ease, opacity 0.25s ease',
                marginTop: open ? '.75rem' : '0',
              }}
            >
              {(item.timeSaved || hasBanner) && (
                <div className="c-abm-temp-tl-item_dropdown-stats-block" style={{ marginBottom: '.75rem' }}>
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
                <>
                  <div style={{ opacity: 0.1, backgroundColor: '#000', width: '100%', height: 1 }} />
                  <div className="c-abm-temp-tl-item_bullet c-text-5" style={{ marginTop: '.5rem' }}>
                    <ul style={{ paddingLeft: '1.25rem', margin: 0 }}>
                      {item.problems.map((problem, pi) => (
                        <li key={pi} style={{ marginBottom: '.25rem' }}>{problem}</li>
                      ))}
                    </ul>
                  </div>
                </>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
