import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { private_markets_platformQuery } from '@/lib/sanity/queries/private-markets-platform'
import { buildMetadata } from '@/lib/metadata'

interface PrivateMarketsPlatformPage {
  heroHeadline: string
  heroDescription: string
  heroPrimaryCtaLabel: string
  heroPrimaryCtaUrl: string
  heroSecondaryCtaLabel: string
  heroSecondaryCtaUrl: string
  personas: { eyebrow: string; body: string }[]
  benefitsEyebrow: string
  benefitsStickyTitle: string
  benefitsCtaLabel: string
  benefitsCtaUrl: string
  benefits: { title: string; description: string }[]
  useCasesEyebrow: string
  superchargeCtaLabel: string
  superchargeCtaUrl: string
  superchargeEyebrow: string
  superchargeBody: string
  testimonialsLabel: string
  faqsTitle: string
  faqs: { question: string; answer: string }[]
  footerCtaDescription: string
  footerCtaWords: { text: string; style: string; row: number }[]
  footerCtaLabel: string
  footerCtaUrl: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    ogImage?: unknown
    noIndex?: boolean
  }
}

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch<PrivateMarketsPlatformPage | null>(private_markets_platformQuery, {}, { next: { tags: ['privateMarketsPlatformPage'], revalidate: 3600 } })
  if (!doc) return {}
  return buildMetadata({
    title: doc.heroHeadline,
    description: doc.heroDescription,
    seo: doc.seo,
    path: '/private-markets-platform',
  })
}

export default async function Page() {
  let doc: PrivateMarketsPlatformPage | null = null
  try {
    doc = await client.fetch<PrivateMarketsPlatformPage | null>(private_markets_platformQuery, {}, { next: { tags: ['privateMarketsPlatformPage'], revalidate: 3600 } })
  } catch {
    doc = null
  }

  if (!doc) return null

  const footerRows = ((doc.footerCtaWords ?? []) as any[]).reduce<Record<number, typeof doc.footerCtaWords>>((acc, word) => {
    if (!acc[word.row]) acc[word.row] = []
    acc[word.row].push(word)
    return acc
  }, {})

  return (
    <>
      <div className="main">
            <section className="c-section cc-center">
              <div className="c-container">
                <div id="w-node-_42f5fb7b-9ec6-e09c-4293-6df6e413aab3-60f5ff71" className="w-layout-layout private-markets-hero-cell wf-layout-layout">
                  <div id="w-node-_42f5fb7b-9ec6-e09c-4293-6df6e413aab5-60f5ff71" className="w-layout-cell pm-hero-heading-cell">
                    <h1 className="c-title-2">{doc.heroHeadline}</h1>
                  </div>
                  <div id="w-node-_42f5fb7b-9ec6-e09c-4293-6df6e413aab4-60f5ff71" className="w-layout-cell pm-hero-image-cell"><img src="/webflow-images/mock.png" loading="lazy" width="Auto" height="Auto" alt="" srcSet="/webflow-images/mock-p-500.png 500w, images/mock-p-800.png 800w, images/mock-p-1080.png 1080w, images/mock-p-1600.png 1600w, images/mock-p-2000.png 2000w, images/mock.png 2427w" sizes="(max-width: 2427px) 100vw, 2427px" className="image-2" /></div>
                  <div className="w-layout-cell cell-9">
                    <div className="text-cta">
                      <div className="_428">
                        <div className="c-text-4">{doc.heroDescription}</div>
                      </div>
                      <div className="h-20">
                        <a stagger-cta="" href={doc.heroPrimaryCtaUrl} className="cta-p-sm w-inline-block">
                          <div>
                            <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{doc.heroPrimaryCtaLabel}</div>
                          </div>
                          <div className="flip-small">
                            <div className="flip-bg"></div>
                          </div>
                          <div className="flip-big">
                            <div className="svg cta-sm-arrow w-embed"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_774_4073)">
                                  <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                  <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_774_4073">
                                    <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                                  </clipPath>
                                </defs>
                              </svg></div>
                          </div>
                        </a>
                        <a stagger-cta="" href={doc.heroSecondaryCtaUrl} className="cta-p-sm cc-stroke w-inline-block">
                          <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{doc.heroSecondaryCtaLabel}</div>
                          <div className="flip-small">
                            <div className="flip-bg"></div>
                          </div>
                          <div className="flip-big">
                            <div className="svg cta-sm-arrow w-embed"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_774_4073)">
                                  <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                  <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_774_4073">
                                    <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                                  </clipPath>
                                </defs>
                              </svg></div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bp80-underline u-text-center"></div>
                <div lottie-bg="" className="lottie-crop cc-market">
                  <div className="lottie_cropped-desktop cc-market" data-w-id="285cfcf1-51c6-d2fa-a2d6-ede8fa2381fb" data-animation-type="lottie" data-src="/webflow-documents/Generative-Loop-Final-25.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0" data-duration="10"></div>
                  <div slice="" className="lottie_cropped-mobile" data-w-id="285cfcf1-51c6-d2fa-a2d6-ede8fa2381fc" data-animation-type="lottie" data-src="/webflow-documents/Generative-Loop-Final.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0" data-duration="0"></div>
                </div>
              </div>
            </section>
            <section className="c-section cc-tp-50">
              <div className="c-container">
                <div className="founders">
                  <div className="grid_2-col cc-20">
                    {(doc.personas ?? []).map((persona, i) => (
                      <div key={i} className="founder cc-40">
                        <div className="founder_top">
                          <div slider-a-3="" className="eyebrow-flex">
                            <div className="block"></div>
                            <div className="c-title-5">{persona.eyebrow}</div>
                          </div>
                        </div>
                        <div className="c-text-3">{persona.body}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="c-section cc-tp-50-bp-100">
              <div className="c-container">
                <div className="eyebrow">
                  <div className="block"></div>
                  <div className="c-title-5">{doc.benefitsEyebrow}</div>
                </div>
                <div className="grid cc-top-40">
                  <div id="w-node-f693ffbd-8859-8a84-2b5b-607e0f3954f3-60f5ff71">
                    <div className="sticky_left">
                      <h2 className="c-title-2">{doc.benefitsStickyTitle}</h2>
                      <div className="grid cc-3">
                        <div inject-tablet="sticky" id="w-node-b6281430-4b38-0296-dcda-0fe561b06f68-60f5ff71" className="cta-200">
                          <a stagger-text-btn="" data-wf--cta-secondary-fill--variant="base" href={doc.benefitsCtaUrl} className="cta-sec cc-fill w-inline-block">
                            <div stagger-link-text="light" className="c-text-link cc-stagger">{doc.benefitsCtaLabel}</div>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div id="w-node-c807bb2c-6a38-4986-26ef-a2ebd2a17ceb-60f5ff71" className="sticky_right cc-market">
                    {(doc.benefits ?? []).map((benefit, i) => (
                      <div key={i} className="v-24">
                        <div className="v-20">
                          <div className="c-title-4">{benefit.title}</div>
                          <div className="c-text-3 u-balance">{benefit.description}</div>
                        </div>
                        <div className="c-line"></div>
                      </div>
                    ))}
                    <div inject-tablet-target="sticky" className="inject-tablet cc-market"></div>
                  </div>
                </div>
              </div>
            </section>
            <section className="c-section cc-no-overflow">
              <div className="c-container">
                <div className="v-100">
                  <div slider-accordion-wrap="" className="grid cc-top-40">
                    <div id="w-node-a71ae0db-a4d1-27dd-8e6d-2da61e1dfa03-60f5ff71" className="case-study-slider_right">
                      <div className="case-study-slider w-dyn-list">
                        <div role="list" className="w-dyn-items">
                          <div slider-accordion="" accordion="" role="listitem" className="use-case-slider_left_item w-dyn-item">
                            <div className="ui-slider_left_item-flex">
                              <div className="h-flex">
                                <div slider-text="" use-case-num="" className="c-text-link">0</div>
                                <div slider-text="" use-case-num="" className="c-text-link w-dyn-bind-empty"></div>
                                <div slider-text="" use-case-num="" className="c-text-link">.</div>
                              </div>
                              <div slider-text="" className="c-text-link w-dyn-bind-empty"></div>
                            </div>
                          </div>
                        </div>
                        <div className="w-dyn-empty">
                          <div>No items found.</div>
                        </div>
                      </div>
                      <div className="eyebrow cc-aboslute">
                        <div className="block"></div>
                        <div className="c-title-5">{doc.useCasesEyebrow}</div>
                      </div>
                    </div>
                    <div feature-slider-wrap="" id="w-node-dbccb191-09eb-2511-a637-658b370be829-60f5ff71" className="slider-ui_right">
                      <div className="slider-ui_right_numbers cc-tablet">
                        <div className="num-slider w-dyn-list">
                          <div role="list" className="num-slider_list w-dyn-items">
                            <div role="listitem" className="num-slider_item w-dyn-item">
                              <div num-slider="" className="c-text-5">X</div>
                            </div>
                          </div>
                          <div className="w-dyn-empty">
                            <div>No items found.</div>
                          </div>
                        </div>
                        <div className="num-slider_flex_right">
                          <div className="c-text-5">/</div>
                          <div num-slider-total="" className="c-text-5">0X</div>
                        </div>
                      </div>
                      <div className="slider-use-case_right_wrap">
                        <div className="slider-ui_right_coll w-dyn-list">
                          <div feature-slider="" role="list" className="slider-use-case_right_list w-dyn-items">
                            <div role="listitem" className="slider-use-case_right_item w-dyn-item">
                              <div className="show-tablet">
                                <div slider-accordion="" className="use-case-slider_left_item cc-active">
                                  <div className="ui-slider_left_item-flex">
                                    <div className="h-flex">
                                      <div slider-text="" use-case-num="" className="c-text-link">0</div>
                                      <div slider-text="" use-case-num="" className="c-text-link w-dyn-bind-empty"></div>
                                      <div slider-text="" use-case-num="" className="c-text-link">.</div>
                                    </div>
                                    <div slider-text="" className="c-text-link w-dyn-bind-empty"></div>
                                  </div>
                                </div>
                              </div><img src="/webflow-images/illustration_04.svg" loading="lazy" width="70" alt="" className="slider-use-case_right_img w-dyn-bind-empty" />
                              <div className="slider-use-case_flex">
                                <div className="c-text-3 w-dyn-bind-empty w-richtext"></div>
                                <div className="c-line"></div>
                                <div className="v-20">
                                  <div className="c-text-link w-dyn-bind-empty"></div>
                                  <div className="c-text-4 w-dyn-bind-empty w-richtext"></div>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="w-dyn-empty">
                            <div>No items found.</div>
                          </div>
                        </div>
                      </div>
                      <div className="slider_arrows cc-use-cases">
                        <div id="arrow-left" className="slider_arrow cc-prev">
                          <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M54 5.59996L48.75 -3.8147e-05H6L0.375 5.99996L0 5.59996V45.4L0.375 45L6 51H48.75L54 45.4V5.59996Z" fill="var(--lightmode--surface-1)"></path>
                            </svg></div>
                          <div className="arrow-wrap cc-2">
                            <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_575_3505)">
                                  <path d="M13.1074 24.8372L1.73026 13.46L13.0351 2.15519" stroke="var(--lightmode--onsurface)" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                  <path d="M1.73274 13.4614L26.6312 13.5408" stroke="var(--lightmode--onsurface)" strokeWidth="2" strokeLinejoin="bevel"></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_575_3505">
                                    <rect width="19.1528" height="19.031" fill="white" transform="translate(14.043 27) rotate(-135)"></rect>
                                  </clipPath>
                                </defs>
                              </svg></div>
                          </div>
                          <div className="arrow-wrap">
                            <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_575_3505)">
                                  <path d="M13.1074 24.8372L1.73026 13.46L13.0351 2.15519" stroke="var(--lightmode--onsurface)" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                  <path d="M1.73274 13.4614L26.6312 13.5408" stroke="var(--lightmode--onsurface)" strokeWidth="2" strokeLinejoin="bevel"></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_575_3505">
                                    <rect width="19.1528" height="19.031" fill="white" transform="translate(14.043 27) rotate(-135)"></rect>
                                  </clipPath>
                                </defs>
                              </svg></div>
                          </div>
                        </div>
                        <div id="arrow-right" className="slider_arrow">
                          <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path fillRule="evenodd" clipRule="evenodd" d="M54 5.59996L48.75 -3.8147e-05H6L0.375 5.99996L0 5.59996V45.4L0.375 45L6 51H48.75L54 45.4V5.59996Z" fill="var(--lightmode--surface-1)"></path>
                            </svg></div>
                          <div className="arrow-wrap cc-2">
                            <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_782_8055)">
                                  <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="var(--lightmode--onsurface)" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                  <path d="M26.2663 13.4614L1.36784 13.5408" stroke="var(--lightmode--onsurface)" strokeWidth="2" strokeLinejoin="bevel"></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_782_8055">
                                    <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                  </clipPath>
                                </defs>
                              </svg></div>
                          </div>
                          <div className="arrow-wrap">
                            <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_782_8055)">
                                  <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="var(--lightmode--onsurface)" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                                  <path d="M26.2663 13.4614L1.36784 13.5408" stroke="var(--lightmode--onsurface)" strokeWidth="2" strokeLinejoin="bevel"></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_782_8055">
                                    <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                                  </clipPath>
                                </defs>
                              </svg></div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="grid">
                    <div id="w-node-abe3aba9-3fc6-a67d-759c-b9e94bd06759-60f5ff71">
                      <div inject-tablet="supercharge" className="cta-182">
                        <a stagger-cta="" href={doc.superchargeCtaUrl} className="cta-p-sm w-inline-block">
                          <div>
                            <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{doc.superchargeCtaLabel}</div>
                          </div>
                          <div className="flip-small">
                            <div className="flip-bg"></div>
                          </div>
                          <div className="flip-big">
                            <div className="svg cta-sm-arrow w-embed"><svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_774_4073)">
                                  <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                  <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_774_4073">
                                    <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                                  </clipPath>
                                </defs>
                              </svg></div>
                          </div>
                        </a>
                      </div>
                    </div>
                    <div id="w-node-_44679dc0-eae3-5136-7579-5f1ae304faad-60f5ff71" className="v-40">
                      <div className="eyebrow cc-no-bp">
                        <div className="block"></div>
                        <div className="c-title-5">{doc.superchargeEyebrow}</div>
                      </div>
                      <div className="c-text-1">{doc.superchargeBody}</div>
                      <div inject-tablet-target="supercharge" className="inject-tablet cc-market"></div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <section no-fade="" className="c-section">
              <div className="c-container">
                <div className="slider-wrap">
                  <div className="slider_lottie" data-w-id="8f980da0-ddc4-ceaf-1ed0-830cc78e90ad" data-animation-type="lottie" data-src="/webflow-documents/Testimonial-BG-25.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0" data-duration="20"></div>
                  <div className="slider w-dyn-list">
                    <div slider="" role="list" className="slider_list w-dyn-items">
                      <div role="listitem" className="slider_cms-item w-dyn-item">
                        <div className="slider_item">
                          <div slider-a-1="" className="slider_flex">
                            <div slider-a-3="" className="eyebrow-flex">
                              <div className="block cc-primary"></div>
                              <div className="c-title-5 cc-primary w-dyn-bind-empty"></div>
                            </div>
                            <div className="c-title-2 w-dyn-bind-empty"></div>
                            <div slider-a-2="" className="c-text-3 w-dyn-bind-empty"></div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="w-dyn-empty">
                      <div>No items found.</div>
                    </div>
                  </div>
                  <div className="slider_arrows">
                    <div id="arrow-left" className="slider_arrow cc-prev">
                      <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M54 5.59996L48.75 -3.8147e-05H6L0.375 5.99996L0 5.59996V45.4L0.375 45L6 51H48.75L54 45.4V5.59996Z" fill="white"></path>
                        </svg></div>
                      <div className="arrow-wrap cc-2">
                        <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_575_3505)">
                              <path d="M13.1074 24.8372L1.73026 13.46L13.0351 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                              <path d="M1.73274 13.4614L26.6312 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_575_3505">
                                <rect width="19.1528" height="19.031" fill="white" transform="translate(14.043 27) rotate(-135)"></rect>
                              </clipPath>
                            </defs>
                          </svg></div>
                      </div>
                      <div className="arrow-wrap">
                        <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_575_3505)">
                              <path d="M13.1074 24.8372L1.73026 13.46L13.0351 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                              <path d="M1.73274 13.4614L26.6312 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_575_3505">
                                <rect width="19.1528" height="19.031" fill="white" transform="translate(14.043 27) rotate(-135)"></rect>
                              </clipPath>
                            </defs>
                          </svg></div>
                      </div>
                    </div>
                    <div id="arrow-right" className="slider_arrow">
                      <div className="svg cc-nav-arrow-bg w-embed"><svg width="54" height="51" viewBox="0 0 54 51" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M54 5.59996L48.75 -3.8147e-05H6L0.375 5.99996L0 5.59996V45.4L0.375 45L6 51H48.75L54 45.4V5.59996Z" fill="white"></path>
                        </svg></div>
                      <div className="arrow-wrap cc-2">
                        <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_782_8055)">
                              <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                              <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_782_8055">
                                <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                              </clipPath>
                            </defs>
                          </svg></div>
                      </div>
                      <div className="arrow-wrap">
                        <div className="nav_arrow-svg cc-slider w-embed"><svg width="28" height="27" viewBox="0 0 28 27" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_782_8055)">
                              <path d="M14.8926 24.8372L26.2697 13.46L14.9649 2.15519" stroke="#0F0F0F" strokeWidth="1.4453" strokeLinejoin="bevel"></path>
                              <path d="M26.2663 13.4614L1.36784 13.5408" stroke="#0F0F0F" strokeWidth="2" strokeLinejoin="bevel"></path>
                            </g>
                            <defs>
                              <clipPath id="clip0_782_8055">
                                <rect width="19.1528" height="19.031" fill="white" transform="matrix(0.707107 -0.707107 -0.707107 -0.707107 13.957 27)"></rect>
                              </clipPath>
                            </defs>
                          </svg></div>
                      </div>
                    </div>
                  </div>
                  <div className="slider_test">
                    <div className="c-title-5"><span className="hide-tablet">{doc.testimonialsLabel.split(' ')[0]} </span>{doc.testimonialsLabel.split(' ').slice(1).join(' ')}</div>
                  </div><img src="/webflow-images/testimonial.svg" loading="lazy" width="294.5" alt="" className="slider_img" />
                </div>
              </div>
            </section>
            <section className="c-section">
              <div className="c-container">
                <div className="v-40">
                  <h2 className="c-title-2">{doc.faqsTitle}</h2>
                  <div className="grid cc-no-gap">
                    <div id="w-node-a9e72dae-69b5-76b1-679b-ded80e5892ad-60f5ff71" className="c-line"></div>
                    {(doc.faqs ?? []).map((faq, i) => (
                      <div key={i} id={`w-node-faq-${i}`}>
                        <div accordion="" id={`w-node-accordion-${i}`} className="accordion">
                          <div className="accordion_toggle">
                            <div className="c-text-2 cc-balance">{faq.question}</div>
                            <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                                <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                              </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                          </div>
                          <div accordion="element" className="accordion_dropdown">
                            <div mask-height="element">
                              <div className="accordion_content">
                                <div className="c-text-4 w-richtext">
                                  <p>{faq.answer}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="c-line"></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="c-section">
              <div className="c-container">
                <div className="titles">
                  {[1, 2, 3, 4].map((row) => {
                    const words = footerRows[row] || []
                    return (
                      <div key={row} className={`title_flex${row === 4 ? ' cc-stetch' : ''}`}>
                        {row === 2 && (
                          <>
                            <div className="c-text-link cc-market">{doc.footerCtaDescription}</div>
                            <div className="spacer"></div>
                          </>
                        )}
                        {row === 3 && words.length > 1 && (
                          <>
                            <div grey="" className={`c-title-cta${words[0].style === 'grey' ? ' cc-grey' : ''}`}>{words[0].text}</div>
                            <div className="spacer"></div>
                            <div grey="" className={`c-title-cta${words[1].style === 'grey' ? ' cc-grey' : ''}`}>{words[1].text}</div>
                          </>
                        )}
                        {row === 3 ? null : words.map((word, wi) => (
                          <div key={wi} {...(word.style === 'grey' ? { grey: '' } : {})} className={`c-title-cta${word.style === 'grey' ? ' cc-grey' : ''}`}>{word.text}</div>
                        ))}
                      </div>
                    )
                  })}
                  <div className="cta-step cc-market">
                    <a stagger-cta-big="" data-w-id="f984e0fd-5317-bfcf-7b12-0d02f1476f56" href={doc.footerCtaUrl} className="cta-p-big w-inline-block">
                      <div a-dm="" className="cta-p-big_top">
                        <div stagger-cta-text-big="" className="c-text-link cc-stagger-cta">{doc.footerCtaLabel}</div>
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
                      <div data-is-ix2-target="1" className="cta-p-big_arrows cc-lotti" data-w-id="1cfa6afb-a27b-299d-3baa-19d0ad081838" data-animation-type="lottie" data-src="https://uploads-ssl.webflow.com/6537758130c3d278e4b6eecc/6576e8acfcf807e5bebe727c_Arrow-Lottie.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="2" data-duration="0"></div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 74 20" fill="none" className="cta-p-big_chop">
                        <path d="M36.7933 20L74 19.9508L74 5.72205e-06L1.74845e-06 4.97481e-06L36.7933 20Z" fill="currentColor" className="path"></path>
                      </svg>
                    </a>
                  </div>
                </div>
                <div lottie-bg="" className="lottie-step">
                  <div lottie-bg="" className="lottie-crop">
                    <div className="lottie_cropped-desktop" data-w-id="ee46ba2d-714e-5fb7-2641-bfc6f471f78a" data-animation-type="lottie" data-src="/webflow-documents/CTA-Lottie-25.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0" data-duration="20"></div>
                    <div slice="" className="lottie_cropped-mobile" data-w-id="806ac869-7326-a178-3a49-0a83ab847ac2" data-animation-type="lottie" data-src="/webflow-documents/Generative-Loop-Final-25.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0" data-duration="10"></div>
                  </div>
                </div>
              </div>
            </section>
      </div>
    </>
  )
}
