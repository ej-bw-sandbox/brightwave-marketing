import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { thank_you_contactQuery } from '@/lib/sanity/queries/thank-you-contact'
import { buildMetadata } from '@/lib/metadata'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

export async function generateMetadata(): Promise<Metadata> {
  try {
    const doc = await client.fetch(thank_you_contactQuery, {}, { next: { tags: ['thankYouContactPage'], revalidate: 60 } })
    if (!doc) return { title: 'Thank You Contact | Brightwave' }
    return buildMetadata({
      title: doc.heroHeading,
      description: doc.heroBody,
      seo: doc.seo,
      path: '/thank-you-contact',
    })
  } catch {
    return { title: 'Thank You Contact | Brightwave' }
  }
}

export default async function Page() {
  let doc: any = null
  try {
    doc = await client.fetch(thank_you_contactQuery, {}, { next: { tags: ['thankYouContactPage'], revalidate: 60 } })
  } catch {
    doc = null
  }

  if (!doc) return null

  return (
    <>
      <div className="main">
            <section className="c-section cc-thank-you_hero">
              <div className="c-container">
                <div className="c-thank-you_hero_main-wrapper">
                  <div className="c-thank-you_hero_content-wrapper">
                    <div className="c-thank-you_hero_content-text-stack">
                      <h1 className="c-title-2">{doc.heroHeading}</h1>
                      <div className="c-thank-you_hero_content-divider"></div>
                      <p className="c-text-3">{doc.heroBody}</p>
                    </div>
                    <div className="c-thank-you_hero_button-wrapper">
                      <a stagger-cta="" href={doc.ctaUrl} className="cta-p-sm w-inline-block">
                        <div>
                          <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{doc.ctaText}</div>
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
                  <div className="c-thank-you_hero_image-wrapper"><img src={doc.heroImageUrl} loading="lazy" alt={doc.heroImageAlt} className="c-thank-you_hero_image" /></div>
                </div>
              </div>
            </section>
      </div>
    </>
  )
}
