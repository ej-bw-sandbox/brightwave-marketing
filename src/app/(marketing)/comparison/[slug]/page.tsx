import { client } from '@/lib/sanity/client'
import { comparisonQuery } from '@/lib/sanity/queries/comparisons'
import { PortableTextRenderer } from '@/components/sections/PortableTextRenderer'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

const COMPARISON_SLUGS = [
  'brightwave-vs-alphasense',
  'brightwave-vs-blueflame-ai',
  'brightwave-vs-boosted-ai',
  'brightwave-vs-chatgpt',
  'brightwave-vs-claude',
  'brightwave-vs-daloopa-ai',
  'brightwave-vs-hebbia',
  'brightwave-vs-perplexity',
  'brightwave-vs-rogo-ai',
]

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return COMPARISON_SLUGS.map((slug) => ({ slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(comparisonQuery, { slug }, { next: { tags: ['comparison'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.competitor ? `Brightwave vs ${doc.competitor}` : doc.title || '',
    description: doc.seo?.metaDescription || doc.summary || '',
    seo: doc.seo,
    path: '/comparison/' + slug,
  })
}

export default async function ComparisonPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(
    comparisonQuery,
    { slug },
    { next: { tags: ['comparison'] } }
  )

  if (!doc) notFound()

  const otherComparisons = doc.otherComparisons ?? []
  const competitorLogoUrl = doc.competitorLogo?.asset?.url || doc.competitorIcon?.asset?.url

  return (
    <>
      {/* Sticky dual-icons block + hero */}
      <div className="c-comparison-template_hero-wrapper">
        <div className="c-comparison-template_sticky">
          <div className="c-comparison-template_absolute-wrapper">
            <div className="c-container">
              <div className="c-comparison-template_grid cc-rel">
                <div id="w-node-_2723b770-bb55-347f-b724-467676746a85-43706a8a" className="c-comparison-hero_dual-block">
                  <div className="c-box-hero_top-left"></div>
                  <div className="c-box-hero_top-right"></div>
                  <div className="c-box-hero_bottom-left"></div>
                  <div className="c-box-hero_bottom-right"></div>
                  <div className="c-comparison-hero_icon-combo">
                    <div className="c-comparison-hero_icon">
                      <div className="c-comparison-hero_image-wrapper" style={{ backgroundColor: '#fff', width: '12.0625rem', height: '12.0625rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        {competitorLogoUrl ? (
                          <img src={competitorLogoUrl} loading="lazy" alt={doc.competitor || ''} style={{ maxWidth: '100%', maxHeight: '100%', objectFit: 'contain', padding: '1.5rem' }} />
                        ) : (
                          <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="c-comparison-hero_image w-dyn-bind-empty" />
                        )}
                      </div>
                      <div className="c-comparison-hero_label">
                        <div className="c-text-5">{doc.competitor || ''}</div>
                      </div>
                    </div>
                    <div className="c-comparison-hero_icon-line">
                      <div className="c-comparison-hero_line"></div>
                    </div>
                    <div className="c-comparison-hero_icon">
                      <div className="c-comparison-hero_image-wrapper" style={{ backgroundColor: '#fff', width: '12.0625rem', height: '12.0625rem', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <img src="/images/brightwave_tile.png" loading="lazy" alt="Brightwave" className="c-comparison-hero_image" />
                      </div>
                      <div className="c-comparison-hero_label">
                        <div className="c-text-5">Brightwave</div>
                      </div>
                    </div>
                  </div>
                  <div className="c-comparison-hero_button-wrapper">
                    <Link href="/pricing" className="cta-p-sm w-inline-block">
                      <div>
                        <div className="c-text-link cc-stagger-cta">Make the Switch</div>
                      </div>
                      <div className="flip-small">
                        <div className="flip-bg"></div>
                      </div>
                      <div className="flip-big">
                        <div className="svg cta-sm-arrow w-embed">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_774_4073_vs1)">
                              <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                              <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                            </g>
                            <defs>
                              <clipPath id="clip0_774_4073_vs1">
                                <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero content */}
        <section className="c-section cc-comparison-template-hero">
          <div className="c-container">
            <div className="c-comparison-template_grid cc-rel">
              <div id="w-node-bd64f2a5-879f-44ce-d7e7-9e2a85552da6-43706a8a" className="c-comparison-template_hero-content">
                <div className="c-comparison-template_hero_title-wrapper">
                  <h1 className="c-title-2 cc-lh-edit">
                    {doc.competitor ? `Brightwave vs ${doc.competitor}` : doc.title}
                  </h1>
                </div>
                <div className="c-comparison-template_hero-content-wrapper">
                  <div className="c-comparison-template_text-stack">
                    {doc.summary && (
                      <div className="c-comparison-template_hero_text-wrapper">
                        <p className="c-text-3 cc-small--tweak">{doc.summary}</p>
                      </div>
                    )}
                    {doc.heroDescription && (
                      <div className="c-comparison-template_desc-wrapper">
                        <div className="c-comparison-template_rich-list w-richtext">
                          <PortableTextRenderer value={doc.heroDescription} />
                        </div>
                      </div>
                    )}
                  </div>
                  <div className="c-comparison-template_hero-button-group">
                    <Link href="/pricing" className="cta-p-sm w-inline-block">
                      <div>
                        <div className="c-text-link cc-stagger-cta">Get Started</div>
                      </div>
                      <div className="flip-small">
                        <div className="flip-bg"></div>
                      </div>
                      <div className="flip-big">
                        <div className="svg cta-sm-arrow w-embed">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_774_4073_vs2)">
                              <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                              <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                            </g>
                            <defs>
                              <clipPath id="clip0_774_4073_vs2">
                                <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </Link>
                    <Link href="/enterprise" className="cta-p-sm cc-stroke w-inline-block">
                      <div className="c-text-link cc-stagger-cta">Schedule a Demo</div>
                      <div className="flip-small">
                        <div className="flip-bg"></div>
                      </div>
                      <div className="flip-big">
                        <div className="svg cta-sm-arrow w-embed">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <g clipPath="url(#clip0_774_4073_vs3)">
                              <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                              <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                            </g>
                            <defs>
                              <clipPath id="clip0_774_4073_vs3">
                                <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)" />
                              </clipPath>
                            </defs>
                          </svg>
                        </div>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lottie divider */}
        <section className="c-section cc-comparison-lottie-thin">
          <div className="c-container">
            <div>
              <div className="lottie-crop">
                <LottiePlayer src="/webflow-documents/CTA-Lottie-25.json" className="lottie_cropped-desktop" />
                <LottiePlayer src="/webflow-documents/Generative-Loop-Final-25.json" className="lottie_cropped-mobile" />
              </div>
            </div>
          </div>
        </section>

        {/* Body / rich-text content */}
        {doc.body && (
          <section className="c-section cc-comparison-block-list">
            <div className="c-container">
              <div className="c-comparison-template_grid cc-rel">
                <div id="w-node-af1e9581-2d3a-c742-e00b-8739923f9982-43706a8a" className="c-comparison-content_main-wrapper">
                  <div className="c-comparison-template_rich-list w-richtext">
                    <PortableTextRenderer value={doc.body} />
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* CTA Section */}
      <section className="c-section cc-comparison-cta">
        <div className="c-container">
          <div className="titles">
            <div className="title_flex">
              <div className="c-title-cta">Ready</div>
              <div className="c-title-cta cc-grey">to</div>
            </div>
            <div className="title_flex">
              <div className="c-text-link cc-market">Request a personalized demo and see how Brightwave elevates your private market investments.</div>
              <div className="spacer"></div>
              <div className="c-title-cta">Transform</div>
            </div>
            <div className="title_flex">
              <div className="c-title-cta cc-grey">Your</div>
              <div className="spacer"></div>
              <div className="c-title-cta cc-grey">diligence</div>
            </div>
            <div className="title_flex cc-stetch">
              <div className="c-title-cta">process?</div>
            </div>
            <div className="cta-step cc-market">
              <Link href="/referral" className="cta-p-big w-inline-block">
                <div className="cta-p-big_top cc-bigger">
                  <div className="c-text-link cc-stagger-cta">Request a Demo</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 35 33" fill="none" className="cta-p-big_arrows cc-hide">
                  <rect width="4.52527" height="4.49649" transform="matrix(1 8.74228e-08 8.74228e-08 -1 30.0078 32.5312)" fill="currentColor" />
                  <g clipPath="url(#clip0_913_4549_vs)">
                    <path d="M3.34961 20.228L21.2115 20.228L21.2115 2.47975" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel" />
                    <path d="M21.2099 20.228L1.60254 0.745389" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel" />
                  </g>
                  <defs>
                    <clipPath id="clip0_913_4549_vs">
                      <rect width="21.2623" height="21.1271" fill="currentColor" transform="matrix(1 8.74228e-08 8.74228e-08 -1 0.917969 21.1914)" />
                    </clipPath>
                  </defs>
                </svg>
                <LottiePlayer src="/webflow-documents/Arrow-Lottie.json" className="cta-p-big_arrows cc-lotti" loop={false} autoplay={false} />
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 74 20" fill="none" className="cta-p-big_chop">
                  <path d="M36.7933 20L74 19.9508L74 5.72205e-06L1.74845e-06 4.97481e-06L36.7933 20Z" fill="currentColor" className="path" />
                </svg>
              </Link>
            </div>
          </div>
          <div className="lottie-step">
            <div className="lottie-crop">
              <LottiePlayer src="/webflow-documents/CTA-Lottie-25.json" className="lottie_cropped-desktop" />
              <LottiePlayer src="/webflow-documents/Generative-Loop-Final-25.json" className="lottie_cropped-mobile" />
            </div>
          </div>
        </div>
      </section>

      {/* Other Comparisons */}
      {otherComparisons.length > 0 && (
        <section className="c-section cc-comparison-list">
          <div className="c-container">
            <h2 className="c-title-3" style={{ marginBottom: '2rem' }}>Other Comparisons</h2>
            <div className="c-comparison_main-wrapper w-dyn-list">
              <div role="list" className="c-comparison_main-list w-dyn-items">
                {otherComparisons.map((c: any) => (
                  <div key={c.slug?.current} role="listitem" className="c-comparison_main-item w-dyn-item">
                    <div className="c-comparison-card">
                      <Link href={`/comparison/${c.slug?.current}`} className="c-link-helper w-inline-block"></Link>
                      <div className="c-comparison-card_image-wrapper">
                        {c.competitorLogo?.asset?.url ? (
                          <img src={c.competitorLogo.asset.url} loading="lazy" alt={c.competitor || ''} className="c-comparison-card_image" />
                        ) : (
                          <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="c-comparison-card_image w-dyn-bind-empty" />
                        )}
                      </div>
                      <div className="c-comparison-card_content-wrapper">
                        <div className="c-comparison-card_tag-wrapper">
                          <div className="c-comparison-card_tag-square"></div>
                          <div className="c-comparison-card-tag">
                            <div className="c-text-6">{c.competitor || ''}</div>
                          </div>
                        </div>
                        <div className="c-comparison-card_title-stack">
                          <h3 className="c-title-5">{c.competitor ? `vs ${c.competitor}` : c.title}</h3>
                          <p className="c-text-5">{c.summary || ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
