import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { comparisonIndexQuery } from '@/lib/sanity/queries/comparisons'
import { LottiePlayer } from '@/components/ui/LottiePlayer'
import { CtaButton } from '@/components/sections/CtaButton'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comparisons',
  description: 'See how Brightwave compares to other research tools and platforms.',
}

export default async function VsIndexPage() {
  let data: any[] = []
  try {
    data = await client.fetch(comparisonIndexQuery, {}, { next: { tags: ['comparison'] } }) ?? []
  } catch {
    data = []
  }

  return (
    <>
      {/* Hero */}
      <section className="c-section cc-comp-overview-hero">
        <div className="c-container">
          <div className="c-comp-overview-hero_main-wrapper">
            <h1 className="c-title-1">Comparison</h1>
          </div>
        </div>
      </section>

      {/* Comparison list */}
      <section className="c-section cc-comparison-list">
        <div className="c-container">
          <div className="c-comparison_main-wrapper w-dyn-list">
            {(data ?? []).length > 0 ? (
              <div role="list" className="c-comparison_main-list w-dyn-items">
                {(data ?? []).map((item: any) => (
                  <div key={item._id} role="listitem" className="c-comparison_main-item w-dyn-item">
                    <div className="c-comparison-card">
                      <Link href={`/comparisons/${item.slug?.current || ''}`} className="c-link-helper w-inline-block" />
                      <div className="c-comparison-card_image-wrapper">
                        {item.competitorIcon?.asset ? (
                          <Image
                            src={urlFor(item.competitorIcon).width(400).url()}
                            alt={item.competitorName || item.title || ''}
                            width={400}
                            height={400}
                            loading="lazy"
                            className="c-comparison-card_image"
                          />
                        ) : item.competitorLogo?.asset ? (
                          <Image
                            src={urlFor(item.competitorLogo).width(400).url()}
                            alt={item.competitorName || item.title || ''}
                            width={400}
                            height={400}
                            loading="lazy"
                            className="c-comparison-card_image"
                          />
                        ) : null}
                      </div>
                      <div className="c-comparison-card_content-wrapper">
                        <div className="c-comparison-card_tag-wrapper">
                          <div className="c-comparison-card_tag-square"></div>
                          <div className="c-comparison-card-tag">
                            <div className="c-text-6">{item.comparisonCategory?.title || ''}</div>
                          </div>
                        </div>
                        <div className="c-comparison-card_title-stack">
                          <h2 className="c-title-5">{item.title || ''}</h2>
                          {item.heroDescription && <p className="c-text-5">{item.heroDescription}</p>}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="w-dyn-empty">
                <div>No items found.</div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="c-section cc-comparison-cta">
        <div className="c-container">
          <div className="titles">
            <div className="title_flex">
              <div className="c-title-cta">Ready</div>
              <div className="c-title-cta cc-grey">to</div>
            </div>
            <div className="title_flex">
              <div className="c-text-link cc-market">Request a personalized demo and see how Brightwave elevates your private market investments.</div>
              <div className="spacer"></div>
              <div className="c-title-cta">Transform</div>
            </div>
            <div className="title_flex">
              <div className="c-title-cta cc-grey">Your</div>
              <div className="spacer"></div>
              <div className="c-title-cta cc-grey">diligence</div>
            </div>
            <div className="title_flex cc-stetch">
              <div className="c-title-cta">process?</div>
            </div>
            <div className="cta-step cc-market">
              <Link href="/contact" className="cta-p-big w-inline-block">
                <div className="cta-p-big_top cc-bigger">
                  <div className="c-text-link cc-stagger-cta">Request a Demo</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 35 33" fill="none" className="cta-p-big_arrows cc-hide">
                  <rect width="4.52527" height="4.49649" transform="matrix(1 8.74228e-08 8.74228e-08 -1 30.0078 32.5312)" fill="currentColor" />
                  <g clipPath="url(#clip0_913_4549_idx)">
                    <path d="M3.34961 20.228L21.2115 20.228L21.2115 2.47975" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel" />
                    <path d="M21.2099 20.228L1.60254 0.745389" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel" />
                  </g>
                  <defs>
                    <clipPath id="clip0_913_4549_idx">
                      <rect width="21.2623" height="21.1271" fill="currentColor" transform="matrix(1 8.74228e-08 8.74228e-08 -1 0.917969 21.1914)" />
                    </clipPath>
                  </defs>
                </svg>
                <LottiePlayer src="/webflow-documents/Arrow-Lottie.json" className="cta-p-big_arrows cc-lotti" />
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 74 20" fill="none" className="cta-p-big_chop">
                  <path d="M36.7933 20L74 19.9508L74 5.72205e-06L1.74845e-06 4.97481e-06L36.7933 20Z" fill="currentColor" className="path" />
                </svg>
              </Link>
            </div>
          </div>
          <div lottie-bg="" className="lottie-step">
            <div lottie-bg="" className="lottie-crop">
              <LottiePlayer
                src="/webflow-documents/CTA-Lottie-25.json"
                className="lottie_cropped-desktop"
                loop
                autoplay
              />
              <LottiePlayer
                src="/webflow-documents/Generative-Loop-Final-25.json"
                className="lottie_cropped-mobile"
                loop
                autoplay
              />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
