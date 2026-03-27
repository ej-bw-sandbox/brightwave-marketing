'use client'

import { useEffect, useState, useCallback } from 'react'
import Link from 'next/link'

interface Feature {
  _id?: string
  title: string
  slug: { current: string }
  heroH1?: string
  menuCategory?: string
  heroImage?: {
    asset?: {
      url?: string
    }
  }
}

const CATEGORIES = ['Analyze', 'Create', 'Collaborate', 'Productivity'] as const

function getHashCategory(): string {
  if (typeof window === 'undefined') return ''
  const hash = window.location.hash.replace('#', '').toLowerCase()
  const match = CATEGORIES.find((c) => c.toLowerCase() === hash)
  return match || ''
}

export function FeaturesGrid({ features }: { features: Feature[] }) {
  const [activeFilter, setActiveFilter] = useState<string>('')

  const syncFromHash = useCallback(() => {
    setActiveFilter(getHashCategory())
  }, [])

  useEffect(() => {
    syncFromHash()
    window.addEventListener('hashchange', syncFromHash)
    return () => window.removeEventListener('hashchange', syncFromHash)
  }, [syncFromHash])

  const filtered = activeFilter
    ? features.filter((f) => f.menuCategory === activeFilter)
    : features

  function handleFilter(category: string) {
    if (category === activeFilter) {
      // Toggle off
      window.history.pushState(null, '', window.location.pathname)
      setActiveFilter('')
    } else {
      window.location.hash = category.toLowerCase()
      setActiveFilter(category)
    }
  }

  return (
    <>
      {/* Filter bar */}
      <div className="c-cs-main-list_filter-wrapper">
        <div className="c-cs-main-list_filter-tag">
          <div className="c-cs-card_tag-square"></div>
          <div className="c-title-5">
            {activeFilter ? `${activeFilter} Features` : 'All Features'}
          </div>
        </div>
        <div className="c-filter-form">
          <div className="c-filter-form-wrapper">
            <div className="c-filter-form-list">
              <button
                type="button"
                onClick={() => {
                  window.history.pushState(null, '', window.location.pathname)
                  setActiveFilter('')
                }}
                className="c-filter-form-checkbox-wrapper"
                aria-pressed={activeFilter === ''}
              >
                <span
                  className={`c-filter-form-checkbox-trigger${activeFilter === '' ? ' w--redirected-checked' : ''}`}
                />
                <span
                  className={`c-filter-form-checkbox-label${activeFilter === '' ? ' cc-active' : ''}`}
                >
                  All
                </span>
              </button>
              {CATEGORIES.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => handleFilter(cat)}
                  className="c-filter-form-checkbox-wrapper"
                  aria-pressed={activeFilter === cat}
                >
                  <span
                    className={`c-filter-form-checkbox-trigger${activeFilter === cat ? ' w--redirected-checked' : ''}`}
                  />
                  <span
                    className={`c-filter-form-checkbox-label${activeFilter === cat ? ' cc-active' : ''}`}
                  >
                    {cat}
                  </span>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Feature cards grid */}
      <div className="c-cs-main-list_wrapper w-dyn-list">
        {filtered.length > 0 ? (
          <div role="list" className="c-cs-main-list_list w-dyn-items">
            {filtered.map((feature) => (
              <div
                key={feature._id || feature.slug?.current}
                role="listitem"
                className="c-cs-main-list-item w-dyn-item"
              >
                <div className="c-cs-card_main-wrapper">
                  <Link
                    href={`/features/${feature.slug?.current || ''}`}
                    className="c-link-helper w-inline-block"
                  />
                  {feature.heroImage?.asset?.url ? (
                    <img
                      loading="lazy"
                      src={feature.heroImage.asset.url}
                      alt={feature.title || ''}
                      className="c-cs-card_image-wrapper"
                    />
                  ) : (
                    <img
                      loading="lazy"
                      src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg"
                      alt=""
                      className="c-cs-card_image-wrapper"
                    />
                  )}
                  <div className="c-cs-card_text-stack">
                    <div className="c-cs-card_title-wrapper">
                      <div className="c-cs-card_tag-wrapper">
                        <div className="c-cs-card_tag-square"></div>
                        <div className="c-text-5 cc-weight-500">
                          {feature.menuCategory || 'Feature'}
                        </div>
                      </div>
                      <h2 className="c-title-5">{feature.title}</h2>
                    </div>
                    <div className="c-cs-card_text-wrapper">
                      <p className="c-text-4-no-anim">
                        {feature.heroH1 || ''}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-dyn-empty">
            <div>No features found.</div>
          </div>
        )}
      </div>
    </>
  )
}
