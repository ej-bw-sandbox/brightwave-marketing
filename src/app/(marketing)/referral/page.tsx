import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { referralQuery } from '@/lib/sanity/queries/referral'
import { buildMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(referralQuery, {}, { next: { tags: ['referralPage'], revalidate: 60 } })
  if (!doc) return {}
  return buildMetadata({
    title: doc.headline,
    description: doc.supportingText,
    seo: doc.seo,
    path: '/referral',
  })
}

export default async function Page() {
  let doc: any = null
  try {
    doc = await client.fetch(referralQuery, {}, { next: { tags: ['referralPage'], revalidate: 60 } })
  } catch { doc = null }

  if (!doc) return null

  return (
    <>
      <div className="main">
            <section className="c-section cc-contact">
              <div className="c-container">
                <div className="bp40-underline">
                  <h1 className="c-title-1">{doc.headline}</h1>
                </div>
                <div className="grid cc-contact">
                  <div id="w-node-ac00784f-25b5-ad00-d07d-09a4707899eb-846a10af" className="contact-flex">
                    <div className="v-20">
                      <div className="c-text-2">{doc.supportingText}</div>
                      <div className="c-text-4"></div>
                    </div>
                    <div className="h-16">
                      <div className="cta-182">
                        <a stagger-cta="" href={doc.linkedinUrl} className="cta-p-sm w-inline-block">
                          <div>
                            <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">LinkedIn</div>
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
                      <div className="cta-182">
                        <a stagger-cta="" href={doc.twitterUrl} className="cta-p-sm w-inline-block">
                          <div className="x-logo-wrap"><img src="/webflow-images/X_logos-world_2.svg" loading="lazy" alt="" className="x-logo" /><img src="/webflow-images/X_logos-world_2.svg" loading="lazy" alt="" className="x-logo cc-absolute" /></div>
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
                  <div id="w-node-bd5556b5-87c1-cfbe-5a84-873f47e0ef7f-846a10af" className="v-40">
                    <div className="eyebrow-flex">
                      <div className="block"></div>
                      <div className="c-title-5">{doc.formSectionTitle}</div>
                    </div>
                    <div className="form-hidden-classes">
                      <div className="hs-flex">
                        <div id="hubspot-form" hubspot-form="" className="cta-hubspot-form w-embed w-script">


                        </div>
                        <div id="calendly-form" enable-calendly="true" className="cta-calendly-form w-embed w-script">{/*   Calendly inline widget begin   */}
                          <div className="calendly-inline-widget" data-url={doc.calendlyUrl} style={{minWidth: '100%', height: '700px'}}></div>

                          {/*   Calendly inline widget end   */}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
            <div className="no-tp">
              <section className="c-section">
                <div className="c-container">
                  <div className="founders">
                    <div className="founders-flex">
                      <h2 className="c-title-2">{doc.recentBlogsSectionTitle}</h2>
                    </div>
                    <div className="w-dyn-list">
                      <div role="list" className="grid cc-cards w-dyn-items">
                        <div id="w-node-_3ba5256d-cde4-520a-cb39-b4efa734a9ee-a734a9e6" role="listitem" className="card_item w-dyn-item">
                          <a href="#" className="card w-inline-block">
                            <div className="aspect-4-3"><img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="img-cover w-dyn-bind-empty" />
                              <div className="press_logo"><img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="press_img" /></div>
                            </div>
                            <div className="card_flex">
                              <div className="c-title-5 w-dyn-bind-empty"></div>
                              <div className="c-text-6 w-dyn-bind-empty"></div>
                            </div>
                          </a>
                          <a href="#" className="card_link-abso w-inline-block"></a>
                        </div>
                      </div>
                      <div className="w-dyn-empty">
                        <div>No items found.</div>
                      </div>
                    </div>
                    <div inject-tablet="founders" className="cta-founders">
                      <a stagger-cta="" href="/blog" className="cta-p-sm cc-stroke w-inline-block">
                        <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{doc.readMoreLabel}</div>
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
              </section>
            </div>
            <div className="u-dark-mode">
              <section className="c-section">
                <div className="c-container">
                  <div className="founders">
                    <div className="founders-flex">
                      <h2 className="c-title-2">{doc.latestPostsSectionTitle}</h2>
                    </div>
                    <div className="w-dyn-list">
                      <div role="list" className="grid cc-cards w-dyn-items">
                        <div id="w-node-_6965b60c-6396-7473-13a2-d4b646dd2e68-f1f62b25" role="listitem" className="card_item w-dyn-item">
                          <a href="#" className="card w-inline-block">
                            <div className="aspect-4-3"><img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="img-cover w-dyn-bind-empty" /></div>
                            <div className="card_flex">
                              <div className="c-title-5 w-dyn-bind-empty"></div>
                              <div className="c-text-6 w-dyn-bind-empty"></div>
                            </div>
                          </a>
                        </div>
                      </div>
                      <div className="w-dyn-empty">
                        <div>No items found.</div>
                      </div>
                    </div>
                    <div inject-tablet="founders" className="cta-founders">
                      <a stagger-cta="" href="/blog" className="cta-p-sm cc-stroke w-inline-block">
                        <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{doc.readMoreLabel}</div>
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
              </section>
      </div></div>
    </>
  )
}
