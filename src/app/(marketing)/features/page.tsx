import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { featureIndexQuery } from '@/lib/sanity/queries/features'
import { LottiePlayer } from '@/components/ui/LottiePlayer'
import { StepCtaSection } from '@/components/sections/StepCtaSection'
import { FeaturesGrid } from '@/components/sections/FeaturesGrid'

export const metadata: Metadata = {
  title: 'Platform Features | Brightwave',
  description: 'Explore the full suite of AI-powered features built for investment research and diligence.',
}

export default async function Page() {
  let features: any[] = []
  try {
    features = await client.fetch(
      featureIndexQuery,
      {},
      { next: { tags: ['platformFeature'], revalidate: 60 } }
    )
  } catch { features = [] }

  return (
    <>
      <section className="c-section cc-cs-overview-hero">
        <div className="c-container">
          <div className="c-cs-overview-hero_main-wrapper">
            <div className="c-cs-overview-hero_title-wrapper">
              <h1 className="c-title-1">Platform Features</h1>
            </div>
            <div className="c-cs-overview-hero_wrapper">
              <div className="c-cs-overview-featured-wrapper w-dyn-list">
                {features.length > 0 ? (
                <div role="list" className="c-cs-overview-featured-list w-dyn-items">
                  <div role="listitem" className="c-cs-overview-featured-item w-dyn-item">
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', position: 'relative' }}>
                      <a href={`/features/${features[0].slug?.current || ''}`} className="c-link-helper w-inline-block"></a>
                      <div id="w-node-feat-hero-img" className="c-cs-overview-featured_image-wrapper">
                        {features[0].heroImage?.asset?.url ? (
                          <img src={features[0].heroImage.asset.url} loading="lazy" alt={features[0].title || ''} className="c-cs-overview-featured_image" />
                        ) : (
                          <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="c-cs-overview-featured_image w-dyn-bind-empty" />
                        )}
                        <div className="c-cs-overview-featured_button-icon">
                          <div className="c-svg-1 w-embed"><svg width="100%" height="100%" viewBox="0 0 74 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M36.7598 3.24967e-06L73.9316 0.0499327L73.9316 57L0.000951028 57L0.000947819 20.2931L36.7598 3.24967e-06Z" fill="#E7E70D"></path>
                              <rect x="62.9395" y="6.46875" width="4.52527" height="4.49649" fill="black"></rect>
                              <g clipPath="url(#clip0_feat_hero)">
                                <path d="M36.2812 18.7721L54.1431 18.7721L54.1431 36.5204" stroke="black" strokeWidth="1.92707" strokeLinejoin="bevel"></path>
                                <path d="M54.1405 18.7721L34.5332 38.2547" stroke="black" strokeWidth="1.92707" strokeLinejoin="bevel"></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_feat_hero">
                                  <rect width="21.2623" height="21.1271" fill="white" transform="translate(33.8496 17.8086)"></rect>
                                </clipPath>
                              </defs>
                            </svg></div>
                        </div>
                      </div>
                      <div id="w-node-feat-hero-content" className="c-cs-overview-feaured_content-wrapper">
                        <div className="c-cs-card_title-wrapper">
                          <div className="c-cs-card_tag-wrapper">
                            <div className="c-cs-card_tag-square"></div>
                            <div className="c-text-5 cc-weight-500">{features[0].menuCategory || 'Feature'}</div>
                          </div>
                          <h2 className="c-title-4">{features[0].title}</h2>
                        </div>
                        <div className="c-cs-card_text-wrapper">
                          <p className="c-text-4-no-anim">{features[0].heroH1 || ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                ) : (
                <div className="w-dyn-empty">
                  <div>No items found.</div>
                </div>
                )}
              </div>
              <div className="c-cs-overview-support-wrapper w-dyn-list">
                <div role="list" className="c-cs-overview-support-list w-dyn-items">
                  {features.slice(1, 3).map((feature: any) => (
                  <div key={feature._id || feature.slug?.current} role="listitem" className="c-cs-overview-support-item w-dyn-item">
                    <div className="c-cs-card_main-wrapper">
                      <a href={`/features/${feature.slug?.current || ''}`} className="c-link-helper w-inline-block"></a>
                      {feature.heroImage?.asset?.url ? (
                        <img loading="lazy" src={feature.heroImage.asset.url} alt={feature.title || ''} className="c-cs-card_image-wrapper" />
                      ) : (
                        <img loading="lazy" src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="" className="c-cs-card_image-wrapper" />
                      )}
                      <div className="c-cs-card_text-stack">
                        <div className="c-cs-card_title-wrapper">
                          <div className="c-cs-card_tag-wrapper">
                            <div className="c-cs-card_tag-square"></div>
                            <div className="c-text-5 cc-weight-500">{feature.menuCategory || 'Feature'}</div>
                          </div>
                          <h2 className="c-title-5">{feature.title}</h2>
                        </div>
                        <div className="c-cs-card_text-wrapper">
                          <p className="c-text-4-no-anim">{feature.heroH1 || ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
                {features.length < 2 && (
                <div className="w-dyn-empty">
                  <div>No items found.</div>
                </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="c-section c-cs-main-list">
        <div className="c-container">
          <div className="c-comparison-template_grid cc-rel">
            <div id="w-node-feat-main-list" className="c-cs-main-list_main-wrapper">
              <FeaturesGrid features={features} />
            </div>
          </div>
        </div>
      </section>

      <StepCtaSection />
    </>
  )
}
