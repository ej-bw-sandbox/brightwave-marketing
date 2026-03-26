import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { engineering_citationsQuery } from '@/lib/sanity/queries/engineering-citations'
import { buildMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(engineering_citationsQuery, {}, { next: { tags: ['engineeringCitationsPage'], revalidate: 3600 } })
  if (!doc) return { title: 'Brightwave' }
  return buildMetadata({
    title: doc.title,
    description: doc.description,
    seo: doc.seo,
    path: '/engineering/citations',
  })
}

export default async function Page() {
  let doc: Record<string, any> | null = null
  try {
    doc = await client.fetch(engineering_citationsQuery, {}, { next: { tags: ['engineeringCitationsPage'], revalidate: 3600 } })
  } catch {
    doc = null
  }

  if (!doc) return null

  return (
    <>
      <div className="main">
            <section data-w-id="265060e8-979b-f8ed-1a75-1cf4eb835149" className="c-section cc-template">
              <div className="c-container">
                <div className="content">
                  <div className="grid cc-template">
                    <div id="w-node-_265060e8-979b-f8ed-1a75-1cf4eb83514d-87f78ffd" className="template">
                      <div className="template_mobile">
                        <a href="#" className="eyebrow-flex cc-mobile w-inline-block">
                          <div className="block-4"></div>
                          <div className="c-title-5">{doc.goBackLabel}</div>
                        </a>
                        <h1 className="c-title-3 cc-template w-dyn-bind-empty"></h1>
                      </div>
                      <div className="template_flex">
                        <div className="eyebrow-flex">
                          <div className="block-4"></div>
                          <div className="c-title-5 w-dyn-bind-empty"></div>
                        </div>
                        <div className="text-flex-3">
                          <div className="c-text-4">{doc.byLabel}</div>
                          <div data-w-id="265060e8-979b-f8ed-1a75-1cf4eb83515d" className="author-wrap">
                            <div className="c-text-4 w-dyn-bind-empty"></div>
                          </div>
                        </div>
                      </div>
                      <div inject-tablet-target="template" className="inject-tablet"></div>
                    </div>
                    <div id="w-node-_265060e8-979b-f8ed-1a75-1cf4eb835161-87f78ffd" className="u-overflow-hidden">
                      <div className="aspect-16-9 cc-relative"><img width="Auto" height="Auto" alt="" src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" className="img-cover cc-abso w-dyn-bind-empty" /></div>
                    </div>
                  </div>
                  <div className="grid">
                    <div id="w-node-_265060e8-979b-f8ed-1a75-1cf4eb835165-87f78ffd">
                      <div inject-tablet="template" className="template_sticky">
                        <div className="c-text-4">{doc.shareOnLabel}</div>
                        <div className="text-flex cc-socials">
                          <a r-share-linkedin="" href="#" className="social w-inline-block">
                            <div className="c-text-link">{doc.linkedinLabel}</div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 9 8" fill="none" className="linkedin-svg">
                              <g clipPath="url(#clip0_884_647)">
                                <path d="M8.1123 7.08496L8.1123 0.364378L1.43446 0.364378" stroke="currentColor" strokeWidth="0.725064" strokeLinejoin="bevel"></path>
                                <path d="M8.1123 0.365358L0.781907 7.74268" stroke="currentColor" strokeWidth="0.725064" strokeLinejoin="bevel"></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_884_647">
                                  <rect width="8" height="7.94912" fill="currentColor" transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 8.47461 8)"></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                          <a r-share-twitter="" href="#" className="social w-inline-block">
                            <div className="c-text-link">{doc.xLabel}</div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 9 8" fill="none" className="linkedin-svg">
                              <g clipPath="url(#clip0_884_647)">
                                <path d="M8.1123 7.08496L8.1123 0.364378L1.43446 0.364378" stroke="currentColor" strokeWidth="0.725064" strokeLinejoin="bevel"></path>
                                <path d="M8.1123 0.365358L0.781907 7.74268" stroke="currentColor" strokeWidth="0.725064" strokeLinejoin="bevel"></path>
                              </g>
                              <defs>
                                <clipPath id="clip0_884_647">
                                  <rect width="8" height="7.94912" fill="currentColor" transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 8.47461 8)"></rect>
                                </clipPath>
                              </defs>
                            </svg>
                          </a>
                        </div>
                      </div>
                    </div>
                    <div id="w-node-_265060e8-979b-f8ed-1a75-1cf4eb83517e-87f78ffd" className="rich-text w-dyn-bind-empty w-richtext"></div>
                  </div>
                </div>
              </div>
            </section>
            <div data-w-id="265060e8-979b-f8ed-1a75-1cf4eb8351b0">
              <section className="c-section-5">
                <div className="c-container">
                  <div className="titles">
                    <div className="title_flex">
                      <div className="c-title-cta">{doc.ctaTitleLine1.word1}</div>
                      <div grey="" className="c-title-cta cc-grey">{doc.ctaTitleLine1.word2}</div>
                    </div>
                    <div className="title_flex">
                      <div grey="" className="c-title-cta cc-grey">{doc.ctaTitleLine2.word1}</div>
                      <div className="spacer"></div>
                      <div className="c-title-cta">{doc.ctaTitleLine2.word2}</div>
                      <div grey="" className="c-title-cta cc-grey">{doc.ctaTitleLine2.word3}</div>
                    </div>
                    <div className="title_flex cc-financial">
                      <div className="spacer cc-financial"></div>
                      <div>
                        <div className="c-title-cta">{doc.ctaTitleLine3.word1}</div>
                      </div>
                    </div>
                    <div className="title_flex cc-stetch">
                      <div className="c-title-cta">{doc.ctaTitleLine4.word1}</div>
                    </div>
                    <div className="cta-step">
                      <a href={doc.ctaButtonUrl} stagger-cta-big="" className="cta-p-big-5 w-inline-block">
                        <div a-dm="" className="cta-p-big_top-3">
                          <div stagger-cta-text-big="" className="c-text-link cc-stagger-cta">{doc.ctaButtonLabel}</div>
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
                        <div data-is-ix2-target="1" className="cta-p-big_arrows cc-lotti" data-w-id="265060e8-979b-f8ed-1a75-1cf4eb8351d6" data-animation-type="lottie" data-src="https://uploads-ssl.webflow.com/6537758130c3d278e4b6eecc/6576e8acfcf807e5bebe727c_Arrow-Lottie.json" data-loop="0" data-direction="1" data-autoplay="0" data-renderer="svg" data-default-duration="2" data-duration="0"></div><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 74 20" fill="none" className="cta-p-big_chop">
                          <path d="M36.7933 20L74 19.9508L74 5.72205e-06L1.74845e-06 4.97481e-06L36.7933 20Z" fill="currentColor" className="path-3"></path>
                        </svg>
                      </a>
                    </div>
                  </div>
                  <div lottie-bg="" className="lottie-step-3">
                    <div lottie-bg="" className="lottie-crop-5">
                      <div className="lottie_cropped-desktop" data-w-id="265060e8-979b-f8ed-1a75-1cf4eb8351db" data-animation-type="lottie" data-src="/webflow-documents/CTA-Lottie-25.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0" data-duration="20"></div>
                      <div slice="" className="lottie_cropped-mobile" data-w-id="265060e8-979b-f8ed-1a75-1cf4eb8351dc" data-animation-type="lottie" data-src="/webflow-documents/Generative-Loop-Final-25.json" data-loop="1" data-direction="1" data-autoplay="1" data-is-ix2-target="0" data-renderer="svg" data-default-duration="0" data-duration="10"></div>
                    </div>
                  </div>
                </div>
              </section>
      </div></div>
    </>
  )
}
