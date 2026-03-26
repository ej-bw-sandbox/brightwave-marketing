import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { securityQuery } from '@/lib/sanity/queries/security'
import { buildMetadata } from '@/lib/metadata'
import { PortableText } from '@portabletext/react'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(securityQuery, {}, { next: { tags: ['securityPage'], revalidate: 3600 } })
  if (!doc) return { title: 'Security | Brightwave' }
  return buildMetadata({
    title: doc.title,
    description: doc.subheadline,
    seo: doc.seo,
    path: '/security',
  })
}

export default async function Page() {
  let doc: any = null
  try {
    doc = await client.fetch(securityQuery, {}, { next: { tags: ['securityPage'], revalidate: 3600 } })
  } catch {
    doc = null
  }

  if (!doc) return null

  const titleWords = doc.title ? doc.title.split(/\s*&\s*/) : []
  const titleFirst = titleWords[0]?.toUpperCase()
  const titleSecond = titleWords[1]?.toUpperCase()

  return (
    <>
      <section className="c-section cc-legal">
        <div className="c-container">
          <div className="grid cc-8">
            <div id="w-node-_3bbee836-a3f8-06de-9221-e35cf06798d6-529b11d5" className="legal_flex cc-gap-0">
              <div className="legal_titles">
                {titleFirst && (
                  <div className="legal_title">
                    <div className="c-title-2 cc-bm">{titleFirst}</div>
                  </div>
                )}
                {titleSecond && (
                  <>
                    <div className="legal_title cc-right">
                      <div className="c-title-2">&</div>
                    </div>
                    <div className="legal_title cc-right">
                      <div className="c-title-2">{titleSecond}</div>
                    </div>
                  </>
                )}
                {doc.dateLabel && (
                  <div className="legal_date">
                    <div className="block"></div>
                    <div className="c-title-5">{doc.dateLabel}<br /></div>
                  </div>
                )}
              </div>
              <div>
                {doc.headline && (
                  <div className="legal-rt w-richtext">
                    <h2>{doc.headline}</h2>
                  </div>
                )}
                {doc.heroCta && (
                  <div className="c-cta-wrapper">
                    <a stagger-cta-big="" data-w-id="f984e0fd-5317-bfcf-7b12-0d02f1476f56" href={doc.heroCta.url} className="cta-p-big w-inline-block">
                      <div a-dm="" className="cta-p-big_top">
                        <div stagger-cta-text-big="" className="c-text-link cc-stagger-cta">{doc.heroCta.label}</div>
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
                )}
                <div className="legal-rt cc-underline w-richtext">
                  {doc.introText && (
                    <>
                      <p>{doc.introText}</p>
                      <p>&#8205;</p>
                    </>
                  )}
                  {doc.pillars?.map((pillar: any, i: number) => (
                    <div key={pillar._key || i}>
                      <h3>{pillar.title}</h3>
                      <p>{pillar.description}</p>
                      {i < doc.pillars.length - 1 && <p>&#8205;</p>}
                    </div>
                  ))}
                  {doc.faqHeading && <h2>{doc.faqHeading}</h2>}
                </div>
                {doc.faq?.map((faq: any, i: number) => (
                  <div key={faq._key || i}>
                    <div accordion="" className="accordion">
                      <div className="accordion_toggle">
                        <div className="c-text-2 cc-balance">{faq.question}</div>
                        <div chevron-x="" className="c-svg-2 cc-20 w-embed"><svg width={24} height={24} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg></div><input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                      </div>
                      <div accordion="element" className="accordion_dropdown">
                        <div mask-height="element">
                          <div className="accordion_content">
                            <div className="c-text-4 w-richtext">
                              {Array.isArray(faq.answer)
                                ? <PortableText value={faq.answer} />
                                : <p>{faq.answer}</p>
                              }
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {i < doc.faq.length - 1 && <div className="c-line"></div>}
                  </div>
                ))}
                {(doc.privacyHeading || doc.privacyBody) && (
                  <div className="legal-rt w-richtext">
                    {doc.privacyHeading && <h2>{doc.privacyHeading}</h2>}
                    {doc.privacyBody && <PortableText value={doc.privacyBody} />}
                  </div>
                )}
                {doc.bottomCta && (
                  <div className="v-40 cc-tp-40">
                    {doc.bottomCta.heading && <div className="c-title-4">{doc.bottomCta.heading}</div>}
                    {doc.bottomCta.cta && (
                      <div className="c-cta-wrapper">
                        <a stagger-cta-big="" data-w-id="f984e0fd-5317-bfcf-7b12-0d02f1476f56" href={doc.bottomCta.cta.url} className="cta-p-big w-inline-block">
                          <div a-dm="" className="cta-p-big_top">
                            <div stagger-cta-text-big="" className="c-text-link cc-stagger-cta">{doc.bottomCta.cta.label}</div>
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
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
