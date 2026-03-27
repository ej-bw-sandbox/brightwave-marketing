import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { caseStudyIndexQuery } from '@/lib/sanity/queries/case-studies'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

export const metadata: Metadata = {
  title: 'Case Studies | Brightwave',
  description: 'How leading firms use Brightwave.',
}

export default async function Page() {
  let studies: any[] = []
  let categories: any[] = []
  try {
    const data = await client.fetch(
      caseStudyIndexQuery,
      {},
      { next: { tags: ['caseStudy'], revalidate: 3600 } }
    )
    studies = data?.studies ?? []
    categories = data?.categories ?? []
  } catch { studies = []; categories = [] }

  const featured = studies.find((s: any) => s.isFeatured) || studies[0]
  const support = studies.filter((s: any) => s !== featured && s.isFeaturedGrid).slice(0, 2)
  const rest = studies.filter((s: any) => s !== featured && !support.includes(s))

  return (
    <>
<section className="c-section cc-cs-overview-hero">
        <div className="c-container">
          <div className="c-cs-overview-hero_main-wrapper">
            <div className="c-cs-overview-hero_title-wrapper">
              <h1 className="c-title-1">Case Studies</h1>
            </div>
            <div className="c-cs-overview-hero_wrapper">
              <div className="c-cs-overview-featured-wrapper w-dyn-list">
                {featured ? (
                <div role="list" className="c-cs-overview-featured-list w-dyn-items">
                  <div role="listitem" className="c-cs-overview-featured-item w-dyn-item">
                    <div className="c-comparison-template_grid cc-rel">
                      <Link href={`/case-studies/${featured.slug?.current || ''}`} className="c-link-helper w-inline-block"></Link>
                      <div id="w-node-c65826a6-c561-19ba-3d0e-8c5b67229dad-48c3bc16" className="c-cs-overview-featured_image-wrapper">
                        {featured.thumbnail?.asset?.url ? (
                          <img src={featured.thumbnail.asset.url} loading="lazy" alt={featured.title || ''} className="c-cs-overview-featured_image" />
                        ) : (
                          <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="c-cs-overview-featured_image w-dyn-bind-empty" />
                        )}
                        <div className="c-cs-overview-featured_button-icon">
                          <div className="c-svg-1 w-embed"><svg width="100%" height="100%" viewBox="0 0 74 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M36.7598 3.24967e-06L73.9316 0.0499327L73.9316 57L0.000951028 57L0.000947819 20.2931L36.7598 3.24967e-06Z" fill="#E7E70D"></path>
                              <rect x="62.9395" y="6.46875" width="4.52527" height="4.49649" fill="black"></rect>
                              <g clipPath="url(#clip0_cs_feat)">
                                <path d="M36.2812 18.7721L54.1431 18.7721L54.1431 36.5204" stroke="black" strokeWidth="1.92707" strokeLinejoin="bevel"></path>
                                <path d="M54.1405 18.7721L34.5332 38.2547" stroke="black" strokeWidth="1.92707" strokeLinejoin="bevel"></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_cs_feat">
                                  <rect width="21.2623" height="21.1271" fill="white" transform="translate(33.8496 17.8086)"></rect>
                                </clipPath>
                              </defs>
                            </svg></div>
                        </div>
                      </div>
                      <div id="w-node-_5576a861-f503-e3a0-d987-e66b2ba3b995-48c3bc16" className="c-cs-overview-feaured_content-wrapper">
                        <div className="c-cs-card_title-wrapper">
                          <div className="c-cs-card_tag-wrapper">
                            <div className="c-cs-card_tag-square"></div>
                            <div className="c-text-5 cc-weight-500">{featured.category?.title || featured.industry || ''}</div>
                          </div>
                          <h2 className="c-title-4">{featured.title}</h2>
                        </div>
                        <div className="c-cs-card_text-wrapper">
                          <p className="c-text-4-no-anim">{featured.excerpt || ''}</p>
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
                  {support.map((study: any) => (
                  <div key={study._id || study.slug?.current} role="listitem" className="c-cs-overview-support-item w-dyn-item">
                    <div className="c-cs-card_main-wrapper">
                      <Link href={`/case-studies/${study.slug?.current || ''}`} className="c-link-helper w-inline-block"></Link>
                      {study.thumbnail?.asset?.url ? (
                        <img loading="lazy" src={study.thumbnail.asset.url} alt={study.title || ''} className="c-cs-card_image-wrapper" />
                      ) : (
                        <img loading="lazy" src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="" className="c-cs-card_image-wrapper" />
                      )}
                      <div className="c-cs-card_text-stack">
                        <div className="c-cs-card_title-wrapper">
                          <div className="c-cs-card_tag-wrapper">
                            <div className="c-cs-card_tag-square"></div>
                            <div r-indexed="cat" className="c-text-5 cc-weight-500">{study.category?.title || study.industry || ''}</div>
                          </div>
                          <h2 className="c-title-5">{study.title}</h2>
                        </div>
                        <div className="c-cs-card_text-wrapper">
                          <p className="c-text-4-no-anim">{study.excerpt || ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
                {support.length === 0 && (
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
            <div id="w-node-a924dd56-a927-be17-2ebe-dd5926f65ec9-48c3bc16" className="c-cs-main-list_main-wrapper">
              <div className="c-cs-main-list_filter-wrapper">
                <div className="c-cs-main-list_filter-tag">
                  <div className="c-cs-card_tag-square"></div>
                  <div className="c-title-5">All Case Studies</div>
                </div>
              </div>
              <div className="c-cs-main-list_wrapper w-dyn-list">
                <div r-filter-wrapper="1" role="list" className="c-cs-main-list_list w-dyn-items">
                  {rest.map((study: any) => (
                  <div key={study._id || study.slug?.current} id="w-node-_100a1887-17e6-7599-519d-bcda68ffafdb-48c3bc16" role="listitem" className="c-cs-main-list-item w-dyn-item">
                    <div className="c-cs-card_main-wrapper">
                      <Link href={`/case-studies/${study.slug?.current || ''}`} className="c-link-helper w-inline-block"></Link>
                      {study.thumbnail?.asset?.url ? (
                        <img loading="lazy" src={study.thumbnail.asset.url} alt={study.title || ''} className="c-cs-card_image-wrapper" />
                      ) : (
                        <img loading="lazy" src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="" className="c-cs-card_image-wrapper" />
                      )}
                      <div className="c-cs-card_text-stack">
                        <div className="c-cs-card_title-wrapper">
                          <div className="c-cs-card_tag-wrapper">
                            <div className="c-cs-card_tag-square"></div>
                            <div r-indexed="cat" className="c-text-5 cc-weight-500">{study.category?.title || study.industry || ''}</div>
                          </div>
                          <h2 className="c-title-5">{study.title}</h2>
                        </div>
                        <div className="c-cs-card_text-wrapper">
                          <p className="c-text-4-no-anim">{study.excerpt || ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))}
                </div>
                {rest.length === 0 && (
                <div className="c-cs-main-list_item w-dyn-empty">
                  <div>No items found.</div>
                </div>
                )}
              </div>
            </div>
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
              <a stagger-cta-big="" href="/referral" className="cta-p-big w-inline-block">
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
