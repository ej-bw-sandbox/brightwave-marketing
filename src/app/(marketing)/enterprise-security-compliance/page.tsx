import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { enterprise_security_complianceQuery } from '@/lib/sanity/queries/enterprise-security-compliance'
import { buildMetadata } from '@/lib/metadata'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(enterprise_security_complianceQuery, {}, { next: { tags: ['enterpriseSecurityCompliancePage'], revalidate: 60 } })
  if (!doc) return { title: 'Enterprise Security & Compliance | Protecting Your Most Sensitive Financial Data' }
  return buildMetadata({
    title: doc.title || 'Enterprise Security & Compliance | Protecting Your Most Sensitive Financial Data',
    description: doc.description || 'Discover how Brightwave secures sensitive financial information with advanced enterprise-grade encryption, isolated storage, and rigorous data privacy controls.',
    seo: doc.seo,
    path: '/enterprise-security-compliance',
  })
}

interface Cta {
  label: string
  url: string
  style?: string
  openInNewTab?: boolean
}

interface Usp {
  _key: string
  title: string
  description: string
}

interface Pillar {
  _key: string
  title: string
  description: string
  imageUrl?: string
  imageAlt?: string
}

interface Faq {
  _key: string
  question: string
  answer: string
}

interface Doc {
  title: string
  description: string
  heroHeadline: string
  heroSubtext: string
  heroPrimaryCta: Cta
  heroSecondaryCta: Cta
  heroUsps: Usp[]
  pillarsEyebrow: string
  pillars: Pillar[]
  faqHeading: string
  faqs: Faq[]
  seo?: Record<string, unknown>
}

export default async function Page() {
  let doc: Doc | null = null
  try {
    doc = await client.fetch(enterprise_security_complianceQuery, {}, { next: { tags: ['enterpriseSecurityCompliancePage'], revalidate: 60 } })
  } catch {
    doc = null
  }

  if (!doc) return null

  return (
    <>
      <div className="main">
            <section className="c-section cc-center">
              <div className="c-container">
                <div className="bp40-underline u-text-center">
                  <h1 className="c-title-1 u-balance">{doc.heroHeadline}</h1>
                </div>
                <div className="v-80">
                  <div className="text-cta">
                    <div className="_589">
                      <div className="c-text-3">{doc.heroSubtext}</div>
                    </div>
                    <div className="buttons">
                      <a stagger-cta="" href={doc.heroPrimaryCta?.url} className="cta-p-sm w-inline-block" {...(doc.heroPrimaryCta?.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        <div>
                          <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{doc.heroPrimaryCta?.label}</div>
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
                      <a stagger-cta="" href={doc.heroSecondaryCta?.url} className="cta-p-sm cc-stroke w-inline-block" {...(doc.heroSecondaryCta?.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}>
                        <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{doc.heroSecondaryCta?.label}</div>
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
                  <div className="h-20 cc-strech">
                    {(doc.heroUsps ?? []).map((usp) => (
                      <div key={usp._key} className="home-usp cc-40">
                        <div className="eyebrow cc-no-bp">
                          <div className="block cc-dm-light"></div>
                          <div className="c-title-5">{usp.title}</div>
                        </div>
                        <div className="c-text-4">{usp.description}</div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="c-section">
              <div className="c-container">
                <div className="v-40">
                  <div className="eyebrow cc-no-bp">
                    <div className="block"></div>
                    <div className="c-title-5">{doc.pillarsEyebrow}</div>
                  </div>
                  <div className="v-64 cc-stretch">
                    {(doc.pillars ?? []).map((pillar, index) => (
                      <div key={pillar._key}>
                        <div className="v-line">
                          <div className="c-line"></div>
                        </div>
                        <div className="grid">
                          <div className="v-40 cc-481 wf-span-3">
                            <div className="c-title-3">{pillar.title}</div>
                            <div className="c-text-3">{pillar.description}</div>
                          </div>
                          {pillar.imageUrl && (
                            <img
                              src={pillar.imageUrl}
                              loading="lazy"
                              width={791}
                              alt={pillar.imageAlt || ''}
                              className="aspect-16-9 cc-100 wf-span-4"
                            />
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>
            <section className="c-section">
              <div className="c-container">
                <div className="v-40">
                  <h2 className="c-title-2">{doc.faqHeading}</h2>
                  <div>
                    {(doc.faqs ?? []).map((faq, index) => (
                      <div key={faq._key}>
                        <div className="c-line"></div>
                        <div className="accordion-wrap">
                          <div accordion="" className="accordion">
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
                        </div>
                      </div>
                    ))}
                    <div className="c-line"></div>
                  </div>
                </div>
              </div>
            </section>
      </div>
    </>
  )
}
