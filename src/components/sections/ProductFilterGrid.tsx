'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'

const PRODUCT_OPTIONS = [
  { label: 'All', value: '' },
  { label: 'Private Markets', value: 'private-markets' },
]

interface GridItem {
  _id: string
  title: string
  slug: { current: string } | string
  product?: string
  excerpt?: string
  tag?: string
  heroImage?: { asset?: { url?: string } }
}

interface ProductFilterGridProps {
  items: GridItem[]
  basePath: string
  pageTitle: string
  pageDescription: string
  emptyLabel?: string
}

export function ProductFilterGrid({
  items,
  basePath,
  pageTitle,
  pageDescription,
  emptyLabel = 'items',
}: ProductFilterGridProps) {
  const [activeFilter, setActiveFilter] = useState('')

  useEffect(() => {
    const readHash = () => {
      const hash = window.location.hash.replace('#', '')
      setActiveFilter(hash)
    }
    readHash()
    window.addEventListener('hashchange', readHash)
    return () => window.removeEventListener('hashchange', readHash)
  }, [])

  const filtered = activeFilter
    ? items.filter((item) => item.product === activeFilter)
    : items

  const getSlug = (item: GridItem) =>
    typeof item.slug === 'string' ? item.slug : item.slug?.current || ''

  const placeholderImg =
    'https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg'

  return (
    <>
      {/* Hero */}
      <section className="c-section cc-cs-overview-hero">
        <div className="c-container">
          <div className="c-cs-overview-hero_main-wrapper">
            <div className="c-cs-overview-hero_title-wrapper">
              <h1 className="c-title-1">{pageTitle}</h1>
            </div>
            <p className="c-text-3 u-balance" style={{ marginTop: 16 }}>
              {pageDescription}
            </p>
          </div>
        </div>
      </section>

      {/* Filters + Grid */}
      <section className="c-section c-cs-main-list">
        <div className="c-container">
          <div className="c-cs-main-list_main-wrapper">
            {/* Filter Tabs */}
            <div className="c-cs-main-list_filter-wrapper" style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
              {PRODUCT_OPTIONS.map((opt) => {
                const isActive = activeFilter === opt.value
                return (
                  <a
                    key={opt.value}
                    href={opt.value ? `#${opt.value}` : '#'}
                    onClick={(e) => {
                      e.preventDefault()
                      if (opt.value) {
                        window.location.hash = opt.value
                      } else {
                        // Clear hash without scrolling
                        history.pushState(null, '', window.location.pathname)
                        setActiveFilter('')
                      }
                    }}
                    className="c-cs-main-list_filter-tag"
                    style={{
                      cursor: 'pointer',
                      opacity: isActive ? 1 : 0.5,
                      transition: 'opacity 0.2s',
                    }}
                  >
                    <div className="c-cs-card_tag-square"></div>
                    <div className="c-title-5">{opt.label}</div>
                  </a>
                )
              })}
            </div>

            {/* Card Grid */}
            <div className="c-cs-main-list_wrapper w-dyn-list">
              <div
                role="list"
                className="c-cs-main-list_list w-dyn-items"
              >
                {filtered.map((item) => (
                  <div
                    key={item._id}
                    role="listitem"
                    className="w-dyn-item"
                  >
                    <div className="c-cs-card_main-wrapper">
                      <Link
                        href={`${basePath}/${getSlug(item)}`}
                        className="c-link-helper w-inline-block"
                      ></Link>
                      <img
                        loading="lazy"
                        src={item.heroImage?.asset?.url || placeholderImg}
                        alt={item.title || ''}
                        className="c-cs-card_image-wrapper"
                      />
                      <div className="c-cs-card_text-stack">
                        <div className="c-cs-card_title-wrapper">
                          <div className="c-cs-card_tag-wrapper">
                            <div className="c-cs-card_tag-square"></div>
                            <div className="c-text-5 cc-weight-500">
                              {item.tag || ''}
                            </div>
                          </div>
                          <h2 className="c-title-5">{item.title}</h2>
                        </div>
                        <div className="c-cs-card_text-wrapper">
                          <p className="c-text-4-no-anim">
                            {item.excerpt || ''}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              {filtered.length === 0 && (
                <div className="c-cs-main-list_item w-dyn-empty">
                  <div>No {emptyLabel} found.</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
