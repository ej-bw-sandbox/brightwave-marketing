import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { comparisonIndexQuery } from '@/lib/sanity/queries/comparisons'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

export const metadata: Metadata = {
  title: 'Comparisons | Brightwave',
  description: 'See how Brightwave compares.',
}

export default async function Page() {
  let comparisons: any[] = []
  try {
    comparisons = await client.fetch(
      comparisonIndexQuery,
      {},
      { next: { tags: ['comparison'], revalidate: 3600 } }
    )
  } catch { comparisons = [] }

  return (
    <>
<section className="c-section cc-comp-overview-hero">
        <div className="c-container">
          <div className="c-comp-overview-hero_main-wrapper">
            <h1 className="c-title-1">Comparison</h1>
          </div>
        </div>
      </section>
      <section className="c-section cc-comparison-list">
        <div className="c-container">
          <div className="c-comparison_main-wrapper w-dyn-list">
            <div role="list" className="c-comparison_main-list w-dyn-items">
              {comparisons.map((comp: any) => (
              <div key={comp.slug?.current || comp.title} id="w-node-_7574e28f-3d63-2073-253d-b5c4ec4d9398-2e31f0aa" role="listitem" className="c-comparison_main-item w-dyn-item">
                <div className="c-comparison-card">
                  <Link href={`/comparisons/${comp.slug?.current || ''}`} className="c-link-helper w-inline-block"></Link>
                  <div className="c-comparison-card_image-wrapper">
                    {comp.competitorLogo?.asset?.url ? (
                      <img src={comp.competitorLogo.asset.url} loading="lazy" alt={comp.competitor || ''} className="c-comparison-card_image" />
                    ) : comp.competitorIcon?.asset?.url ? (
                      <img src={comp.competitorIcon.asset.url} loading="lazy" alt={comp.competitor || ''} className="c-comparison-card_image" />
                    ) : (
                      <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="c-comparison-card_image w-dyn-bind-empty" />
                    )}
                  </div>
                  <div className="c-comparison-card_content-wrapper">
                    <div className="c-comparison-card_tag-wrapper">
                      <div className="c-comparison-card_tag-square"></div>
                      <div className="c-comparison-card-tag">
                        <div className="c-text-6">{comp.competitor || ''}</div>
                      </div>
                    </div>
                    <div className="c-comparison-card_title-stack">
                      <h2 className="c-title-5">{comp.title}</h2>
                      <p className="c-text-5">{comp.summary || ''}</p>
                    </div>
                  </div>
                </div>
              </div>
              ))}
            </div>
            {comparisons.length === 0 && (
            <div className="w-dyn-empty">
              <div>No items found.</div>
            </div>
            )}
          </div>
        </div>
      </section>
      <section className="c-section cc-comparison-cta">
        <div className="c-container">
          <div className="titles">
            <div className="title_flex">
              <div className="c-title-cta">Ready</div>
              <div grey="" className="c-title-cta cc-grey">to</div>
            </div>
            <div className="title_flex">
              <div className="c-text-link cc-market">Request a personalized demo and see how Brightwave elevates your private market investments.</div>
              <div className="spacer"></div>
              <div className="c-title-cta">Transform</div>
            </div>
            <div className="title_flex">
              <div grey="" className="c-title-cta cc-grey">Your</div>
              <div className="spacer"></div>
              <div grey="" className="c-title-cta cc-grey">diligence</div>
            </div>
            <div className="title_flex cc-stetch">
              <div className="c-title-cta">process?</div>
            </div>
            <div className="cta-step cc-market">
              <a stagger-cta-big="" data-w-id="f609a408-deee-989a-3ce8-68c2ba249346" href="/referral" className="cta-p-big w-inline-block">
                <div a-dm="" className="cta-p-big_top cc-bigger">
                  <div stagger-cta-text-big="" className="c-text-link cc-stagger-cta">Request a Demo</div>
                </div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 35 33" fill="none" className="cta-p-big_arrows cc-hide">
                  <rect width="4.52527" height="4.49649" transform="matrix(1 8.74228e-08 8.74228e-08 -1 30.0078 32.5312)" fill="currentColor"></rect>
                  <g clipPath="url(#clip0_913_4549)">
                    <path d="M3.34961 20.228L21.2115 20.228L21.2115 2.47975" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel"></path>
                    <path d="M21.2099 20.228L1.60254 0.745389" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel"></path>
                  </g>
                  <defs>
                    <clipPath id="clip0_913_4549">
                      <rect width="21.2623" height="21.1271" fill="currentColor" transform="matrix(1 8.74228e-08 8.74228e-08 -1 0.917969 21.1914)"></rect>
                    </clipPath>
                  </defs>
                </svg>
                <LottiePlayer src="/webflow-documents/Arrow-Lottie.json" className="cta-p-big_arrows cc-lotti" loop={false} autoplay={false} /><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 74 20" fill="none" className="cta-p-big_chop">
                  <path d="M36.7933 20L74 19.9508L74 5.72205e-06L1.74845e-06 4.97481e-06L36.7933 20Z" fill="currentColor" className="path"></path>
                </svg>
              </a>
            </div>
          </div>
          <div lottie-bg="" className="lottie-step">
            <div lottie-bg="" className="lottie-crop">
              <LottiePlayer src="/webflow-documents/CTA-Lottie-25.json" className="lottie_cropped-desktop" />
              <LottiePlayer src="/webflow-documents/Generative-Loop-Final-25.json" className="lottie_cropped-mobile" />
            </div>
          </div>
        </div>
      </section>
      
    
    </>
  )
}
