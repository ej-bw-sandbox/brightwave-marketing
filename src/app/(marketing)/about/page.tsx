import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { aboutQuery } from '@/lib/sanity/queries/about'
import { buildMetadata } from '@/lib/metadata'
import { RenderField } from '@/components/ui/RenderField'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(aboutQuery, {}, { next: { tags: ['aboutPage'], revalidate: 3600 } })
  if (!doc) return { title: 'About Us | Brightwave' }
  return buildMetadata({
    title: doc.headline || 'About Us | Brightwave',
    description: doc.mission || 'Meet the team building the future of financial research.',
    seo: doc.seo,
    path: '/about',
  })
}

export default async function Page() {
  let doc: any = null
  try {
    doc = await client.fetch(aboutQuery, {}, { next: { tags: ['aboutPage'], revalidate: 3600 } })
  } catch { doc = null }

  if (!doc) return null

  const teamMembers = (doc.teamMembers ?? []) as any[]
  const careersUrl = doc.careersCta?.jobBoardUrl
  const investmentCta = doc.investmentCta

  return (
    <>
<section className="c-section cc-about">
        <div className="c-container">
          <div className="about-hero">
            <div className="hero_about">
              <div className="about-mb-ch">
                {doc.headline && <h1 className="c-title-1">{doc.headline}</h1>}
              </div>
            </div>
            <div id="w-node-fb9c007a-cffd-4805-5614-22f256469eee-d5f55c33" className="about-lottie-panel">
              <div inject-tablet="about" className="about-lottie">
                <div lottie-bg="" className="lottie-square">
                  <LottiePlayer src="/webflow-documents/About-Lottie-25.json" className="lottie-stretch" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="c-section">
        <div className="c-container">
          <div className="grid">
            <div id="w-node-_94fdf4d4-e440-34e3-c2b2-74609a8971b5-d5f55c33" className="btn-wrap">
              {careersUrl && (
                <a stagger-cta="" href={careersUrl} target="_blank" className="cta-p-sm w-inline-block">
                  <div>
                    <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{doc.careersCta?.joinLabel}</div>
                  </div>
                  <div className="flip-small">
                    <div className="flip-bg"></div>
                  </div>
                  <div className="flip-big">
                    <div className="svg cta-sm-arrow w-embed"><svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_774_4073)">
                          <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                          <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_774_4073">
                            <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                          </clipPath>
                        </defs>
                      </svg></div>
                  </div>
                </a>
              )}
            </div>
            <div id="w-node-_5a14d7ba-6f62-8653-aee1-f80ff3b07b06-d5f55c33" className="v-64">
              {(doc.storyLabel || doc.story) && (
                <div className="v-12">
                  {doc.storyLabel && (
                    <div className="eyebrow cc-no-bp">
                      <div className="block"></div>
                      <div className="c-title-5">{doc.storyLabel}</div>
                    </div>
                  )}
                  {doc.story && <RenderField value={doc.story} className="c-text-3" />}
                </div>
              )}
              {(doc.missionLabel || doc.mission) && (
                <div className="v-12">
                  {doc.missionLabel && (
                    <div className="eyebrow cc-no-bp">
                      <div className="block"></div>
                      <div className="c-title-5">{doc.missionLabel}</div>
                    </div>
                  )}
                  {doc.mission && <div className="c-text-3">{doc.mission}</div>}
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
      {teamMembers.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="founders">
              <div className="founders-flex">
                {doc.foundersLabel && <h2 className="c-title-2">{doc.foundersLabel}</h2>}
              </div>
              <div className="grid_2-col">
                {teamMembers.map((member: any, i: number) => (
                  <div key={member._key || member.name || i} className="founder">
                    <div className="founder_top">
                      <div slider-a-3="" className="eyebrow-flex">
                        <div className="block"></div>
                        <div className="c-title-5">{member.prefix || member.role || ''}</div>
                      </div>
                      {member.name && <div className="c-title-3">{member.name}</div>}
                    </div>
                    {member.bio && <div className="c-text-4">{member.bio}</div>}
                  </div>
                ))}
              </div>
              {careersUrl && (
                <div inject-tablet="founders" className="cta-founders">
                  <a stagger-cta="" href={careersUrl} target="_blank" className="cta-p-sm cc-stroke w-inline-block">
                    <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Join the team</div>
                    <div className="flip-small">
                      <div className="flip-bg"></div>
                    </div>
                    <div className="flip-big">
                      <div className="svg cta-sm-arrow w-embed"><svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_774_4073)">
                            <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                            <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                          </g>
                          <defs>
                            <clipPath id="clip0_774_4073">
                              <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                            </clipPath>
                          </defs>
                        </svg></div>
                    </div>
                  </a>
                </div>
              )}
            </div>
          </div>
        </section>
      )}
      {(doc.careersCta || investmentCta) && (
        <section className="c-section">
          <div className="c-container">
            <div className="founders">
              <div className="founders-flex">
                {doc.careersCta?.sectionTitle && <h2 className="c-title-2">{doc.careersCta.sectionTitle}</h2>}
              </div>
              <div className="grid">
                <div id="w-node-_7928332a-f2e4-578c-4a00-c73e4ad1d975-d5f55c33" className="career-blocks">
                  {doc.careersCta && (
                    <div className="career cc-active">
                      <div className="v-12">
                        {doc.careersCta.subtitle && (
                          <div className="eyebrow cc-no-bp">
                            <div className="block"></div>
                            <div className="c-title-5">{doc.careersCta.subtitle}</div>
                          </div>
                        )}
                        {doc.careersCta.headline && <div className="c-title-4">{doc.careersCta.headline}</div>}
                      </div>
                      {careersUrl && (
                        <a stagger-cta="" href={careersUrl} target="_blank" className="cta-p-sm w-inline-block">
                          <div>
                            <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{doc.careersCta.ctaLabel}</div>
                          </div>
                          <div className="flip-small">
                            <div className="flip-bg"></div>
                          </div>
                          <div className="flip-big">
                            <div className="svg cta-sm-arrow w-embed"><svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <g clipPath="url(#clip0_774_4073)">
                                  <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                  <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                </g>
                                <defs>
                                  <clipPath id="clip0_774_4073">
                                    <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                                  </clipPath>
                                </defs>
                              </svg></div>
                          </div>
                        </a>
                      )}
                    </div>
                  )}
                  {investmentCta && (
                    <div id="w-node-cebf9e41-e1c1-c29c-0be3-e679abab7ff0-d5f55c33" className="career">
                      <div className="v-12">
                        {investmentCta.subtitle && (
                          <div className="eyebrow cc-no-bp">
                            <div className="block"></div>
                            <div className="c-title-5">{investmentCta.subtitle}</div>
                          </div>
                        )}
                        {investmentCta.headline && <div className="c-title-4">{investmentCta.headline}</div>}
                      </div>
                      <div className="buttons">
                        {investmentCta.primaryCta?.url && (
                          <a stagger-cta="" href={investmentCta.primaryCta.url} className="cta-p-sm w-inline-block" {...(investmentCta.primaryCta.openInNewTab ? { target: '_blank' } : {})}>
                            <div>
                              <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{investmentCta.primaryCta.label}</div>
                            </div>
                            <div className="flip-small">
                              <div className="flip-bg"></div>
                            </div>
                            <div className="flip-big">
                              <div className="svg cta-sm-arrow w-embed"><svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_774_4073)">
                                    <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                    <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_774_4073">
                                      <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                                    </clipPath>
                                  </defs>
                                </svg></div>
                            </div>
                          </a>
                        )}
                        {investmentCta.secondaryCta?.url && (
                          <a stagger-cta="" href={investmentCta.secondaryCta.url} className="cta-p-sm cc-stroke w-inline-block" {...(investmentCta.secondaryCta.openInNewTab ? { target: '_blank' } : {})}>
                            <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{investmentCta.secondaryCta.label}</div>
                            <div className="flip-small">
                              <div className="flip-bg"></div>
                            </div>
                            <div className="flip-big">
                              <div className="svg cta-sm-arrow w-embed"><svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                                  <g clipPath="url(#clip0_774_4073)">
                                    <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                    <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_774_4073">
                                      <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                                    </clipPath>
                                  </defs>
                                </svg></div>
                            </div>
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                <div id="w-node-_9b8ee08d-c6f4-ae74-a662-3b34c7325983-d5f55c33" className="career-lottie">
                  <div inject-tablet="about" className="lottie-absolute">
                    <div lottie-bg="" className="lottie-square">
                      <LottiePlayer src="/webflow-documents/About-Lottie-25.json" className="lottie-stretch" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
      <section className="c-section">
        <div className="c-container">
          <div className="founders">
            <div className="founders-flex">
              <h2 className="c-title-2">Recent Blogs</h2>
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
                <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Read More</div>
                <div className="flip-small">
                  <div className="flip-bg"></div>
                </div>
                <div className="flip-big">
                  <div className="svg cta-sm-arrow w-embed"><svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <g clipPath="url(#clip0_774_4073)">
                        <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                        <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                      </g>
                      <defs>
                        <clipPath id="clip0_774_4073">
                          <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                        </clipPath>
                      </defs>
                    </svg></div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
      <div className="u-dark-mode">
        <section className="c-section">
          <div className="c-container">
            <div className="founders">
              <div className="founders-flex">
                <h2 className="c-title-2">Latest Posts</h2>
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
                  <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">Read More</div>
                  <div className="flip-small">
                    <div className="flip-bg"></div>
                  </div>
                  <div className="flip-big">
                    <div className="svg cta-sm-arrow w-embed"><svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_774_4073)">
                          <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                          <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
                        </g>
                        <defs>
                          <clipPath id="clip0_774_4073">
                            <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
                          </clipPath>
                        </defs>
                      </svg></div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>
        <div>
          </div></div>
    </>
  )
}
