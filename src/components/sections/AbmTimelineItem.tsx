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
    <div className="c-abm-temp-tl_item">
      {/* Before / After banner bars */}
      {hasBanner && (
        <div style={{ display: 'flex', gap: '.37rem', marginBottom: '.75rem' }}>
          <div className="c-abm-temp-tl_item-banner" style={{ flex: 1 }}>
            <div className="c-text-6">{item.beforeLabel || 'Traditional'}: {item.beforeValue}</div>
          </div>
          <div className="c-abm-temp-tl_item-banner cc-dark" style={{ flex: 1 }}>
            <div className="c-text-6">{item.afterLabel || 'With Brightwave'}: {item.afterValue}</div>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="c-abm-temp-tl-item_content">
        <div className="c-abm-temo-tl-item_top">
          <div className="c-text-3 cc-500">{item.title}</div>
          {item.description && (
            <div className="c-abm-temp-tl-item_text-wrapper">
              <p className="c-text-5">{item.description}</p>
            </div>
          )}
        </div>

        {/* Accordion toggle */}
        {hasDropdown && (
          <div className="c-abm-temp-tl-item_dropdown">
            <div
              className={`c-abm-temp-tl-item_dropdown-toggle${open ? ' w--open' : ''}`}
              onClick={() => setOpen(!open)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => e.key === 'Enter' && setOpen(!open)}
              style={{ cursor: 'pointer' }}
            >
              <div className="c-text-5" style={{ fontWeight: 600 }}>{open ? 'Less' : 'More'}</div>
              <div className="c-abm-temp-tl-item_icon" style={{ transform: open ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.3s ease' }}>
                <svg width="12" height="8" viewBox="0 0 12 8" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M1 1.5L6 6.5L11 1.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            </div>

            {/* Dropdown content */}
            <div
              className={`c-abm-temp-tl-item_problem-list${open ? ' w--open' : ''}`}
              style={{
                overflow: 'hidden',
                maxHeight: open ? '500px' : '0',
                opacity: open ? 1 : 0,
                transition: 'max-height 0.4s ease, opacity 0.3s ease',
              }}
            >
              <div className="c-abm-temp-tl-item_dropdown-flex">
                {/* Stats block */}
                {(item.timeSaved || hasBanner) && (
                  <div className="c-abm-temp-tl-item_dropdown-stats-block">
                    {item.beforeValue && (
                      <div className="c-abm-temp-tl-item_stats-item cc-black">
                        <div className="c-text-6" style={{ opacity: 0.7 }}>{item.beforeLabel || 'Before'}</div>
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

                {/* Pain points */}
                {item.problems && item.problems.length > 0 && (
                  <div className="c-abm-temp-tl-item_problem-block">
                    <div className="c-abm-temp-tl-item_line" />
                    <div className="c-abm-temp-tl-item_bullet c-text-5">
                      <ul>
                        {item.problems.map((problem, pi) => (
                          <li key={pi}>{problem}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
