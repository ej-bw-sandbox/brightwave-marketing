'use client'

import { useState } from 'react'
import Image from 'next/image'

interface UseCase {
  number: string
  title: string
  description: string
  whyBrightwave: string
  image?: {
    asset?: {
      _id: string
      url: string
      metadata?: {
        lqip?: string
        dimensions?: { width: number; height: number }
      }
    }
  }
}

interface PrivateMarketsUseCasesProps {
  eyebrow?: string
  useCases: UseCase[]
}

export function PrivateMarketsUseCases({ eyebrow, useCases }: PrivateMarketsUseCasesProps) {
  const [activeIndex, setActiveIndex] = useState(0)

  if (!useCases || useCases.length === 0) return null

  const active = useCases[activeIndex]

  return (
    <section className="c-section cc-no-overflow">
      <div className="c-container">
        <div className="v-100">
          <div className="grid cc-top-40">
            {/* Left sidebar - numbered list */}
            <div id="w-node-use-cases-left" className="case-study-slider_right">
              <div className="case-study-slider">
                <div role="list">
                  {useCases.map((uc, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      className={`use-case-slider_left_item${i === activeIndex ? ' cc-active' : ''}`}
                      style={{
                        display: 'block',
                        width: '100%',
                        background: 'none',
                        border: 'none',
                        padding: 0,
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      <div className="ui-slider_left_item-flex">
                        <div className="h-flex">
                          <div className="c-text-link" style={{ color: i === activeIndex ? 'var(--lightmode--onsurface)' : undefined }}>{uc.number}</div>
                          <div className="c-text-link" style={{ color: i === activeIndex ? 'var(--lightmode--onsurface)' : undefined }}>.</div>
                        </div>
                        <div className="c-text-link" style={{ color: i === activeIndex ? 'var(--lightmode--onsurface)' : undefined }}>{uc.title}</div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
              {eyebrow && (
                <div className="eyebrow cc-aboslute">
                  <div className="block"></div>
                  <div className="c-title-5">{eyebrow}</div>
                </div>
              )}
            </div>

            {/* Right panel - content */}
            <div id="w-node-use-cases-right" className="slider-ui_right">
              <div className="slider-ui_right_numbers cc-tablet">
                <div className="num-slider">
                  <div className="num-slider_list">
                    <div className="num-slider_item">
                      <div className="c-text-5">{active.number}</div>
                    </div>
                  </div>
                </div>
                <div className="num-slider_flex_right">
                  <div className="c-text-5">/</div>
                  <div className="c-text-5">0{useCases.length}</div>
                </div>
              </div>
              <div className="slider-use-case_right_wrap">
                <div className="slider-use-case_right_list">
                  <div className="slider-use-case_right_item">
                    {/* Tablet accordion header */}
                    <div className="show-tablet">
                      <div className="use-case-slider_left_item cc-active">
                        <div className="ui-slider_left_item-flex">
                          <div className="h-flex">
                            <div className="c-text-link">{active.number}</div>
                            <div className="c-text-link">.</div>
                          </div>
                          <div className="c-text-link">{active.title}</div>
                        </div>
                      </div>
                    </div>

                    {/* Image */}
                    {active.image?.asset?.url && (
                      <Image
                        src={active.image.asset.url}
                        alt={active.title}
                        width={active.image.asset.metadata?.dimensions?.width || 700}
                        height={active.image.asset.metadata?.dimensions?.height || 400}
                        className="slider-use-case_right_img"
                        placeholder={active.image.asset.metadata?.lqip ? 'blur' : 'empty'}
                        blurDataURL={active.image.asset.metadata?.lqip || undefined}
                        style={{ width: '100%', height: 'auto' }}
                      />
                    )}
                    {!active.image?.asset?.url && (
                      <img src="/webflow-images/illustration_04.svg" loading="lazy" width="70" alt="" className="slider-use-case_right_img" />
                    )}

                    {/* Description + Why Brightwave */}
                    <div className="slider-use-case_flex">
                      <div className="c-text-3 w-richtext">
                        <p>{active.description}</p>
                      </div>
                      <div className="c-line"></div>
                      <div className="v-20">
                        <div className="c-text-link">Why Brightwave works</div>
                        <div className="c-text-4 w-richtext">
                          <p>{active.whyBrightwave}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Navigation arrows */}
              <div className="slider_arrows cc-use-cases">
                <button
                  type="button"
                  className="slider_arrow cc-prev"
                  onClick={() => setActiveIndex((activeIndex - 1 + useCases.length) % useCases.length)}
                  aria-label="Previous use case"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M54 5.59996L48.75 -3.8147e-05H6L0.375 5.99996L0 5.59996V45.4L0.375 45L6 51H48.75L54 45.4V5.59996Z" fill="var(--lightmode--surface-1)"></path>
                    </svg></div>
                  <div className="arrow-wrap cc-2">
                    <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_uc_prev)">
                          <path d="M13.1074 24.8372L1.73026 13.46L13.0351 2.15519" stroke="var(--lightmode--onsurface)" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                          <path d="M1.73274 13.4614L26.6312 13.5408" stroke="var(--lightmode--onsurface)" strokeWidth="2" strokeLinejoin="bevel"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_uc_prev">
                            <rect width="19.1528" height="19.031" fill="white" transform="translate(14.043 27) rotate(-135)"></rect>
                          </clipPath>
                        </defs>
                      </svg></div>
                  </div>
                  <div className="arrow-wrap">
                    <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_uc_prev2)">
                          <path d="M13.1074 24.8372L1.73026 13.46L13.0351 2.15519" stroke="var(--lightmode--onsurface)" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                          <path d="M1.73274 13.4614L26.6312 13.5408" stroke="var(--lightmode--onsurface)" strokeWidth="2" strokeLinejoin="bevel"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_uc_prev2">
                            <rect width="19.1528" height="19.031" fill="white" transform="translate(14.043 27) rotate(-135)"></rect>
                          </clipPath>
                        </defs>
                      </svg></div>
                  </div>
                </button>
                <button
                  type="button"
                  className="slider_arrow"
                  onClick={() => setActiveIndex((activeIndex + 1) % useCases.length)}
                  aria-label="Next use case"
                  style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                >
                  <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path fillRule="evenodd" clipRule="evenodd" d="M54 5.59996L48.75 -3.8147e-05H6L0.375 5.99996L0 5.59996V45.4L0.375 45L6 51H48.75L54 45.4V5.59996Z" fill="var(--lightmode--surface-1)"></path>
                    </svg></div>
                  <div className="arrow-wrap cc-2">
                    <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_uc_next)">
                          <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="var(--lightmode--onsurface)" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                          <path d="M26.2663 13.4614L1.36784 13.5408" stroke="var(--lightmode--onsurface)" strokeWidth="2" strokeLinejoin="bevel"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_uc_next">
                            <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                          </clipPath>
                        </defs>
                      </svg></div>
                  </div>
                  <div className="arrow-wrap">
                    <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_uc_next2)">
                          <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="var(--lightmode--onsurface)" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                          <path d="M26.2663 13.4614L1.36784 13.5408" stroke="var(--lightmode--onsurface)" strokeWidth="2" strokeLinejoin="bevel"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_uc_next2">
                            <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                          </clipPath>
                        </defs>
                      </svg></div>
                  </div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
