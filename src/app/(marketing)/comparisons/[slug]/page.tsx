import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { comparisonQuery, comparisonSlugsQuery } from '@/lib/sanity/queries/comparisons'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { CtaButton } from '@/components/sections/CtaButton'
import { LottiePlayer } from '@/components/ui/LottiePlayer'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(comparisonSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(comparisonQuery, { slug }, { next: { tags: ['comparison'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.heroDescription || '',
    seo: doc.seo,
    path: '/comparisons/' + slug,
  })
}

export default async function VsDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(comparisonQuery, { slug }, { next: { tags: ['comparison'], revalidate: 3600 } })

  if (!doc) notFound()

  const contentBlocks = doc.contentBlocks ?? []
  const useCaseFitItems = doc.useCaseFitItems ?? []
  const tableRows = doc.comparisonTable ?? []
  const faqs = doc.faqs ?? []
  const statsBlock = doc.statsBlock ?? null
  const quoteBlock = doc.quoteBlock ?? null
  const featuredQuote = doc.featuredQuote ?? null
  const logoWall = doc.logoWall ?? null
  const secondStatsBlock = doc.secondStatsBlock ?? null

  return (
    <>
      {/* ===== HERO WRAPPER (sticky + hero + lottie + content blocks) ===== */}
      <div className="c-comparison-template_hero-wrapper">
        {/* Sticky dual-brand block */}
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
                      <div className="c-comparison-hero_image-wrapper">
                        {doc.competitorIcon?.asset ? (
                          <Image
                            src={urlFor(doc.competitorIcon).width(193).url()}
                            alt={doc.competitorName || ''}
                            width={193}
                            height={193}
                            loading="lazy"
                            className="c-comparison-hero_image"
                          />
                        ) : doc.competitorLogo?.asset ? (
                          <Image
                            src={urlFor(doc.competitorLogo).width(193).url()}
                            alt={doc.competitorName || ''}
                            width={193}
                            height={193}
                            loading="lazy"
                            className="c-comparison-hero_image"
                          />
                        ) : (
                          <img src="/webflow-images/substack-frame.png" loading="lazy" width={193} alt="" className="c-comparison-hero_image" />
                        )}
                      </div>
                      <div className="c-comparison-hero_label">
                        <div className="c-text-5">{doc.competitorName || ''}</div>
                      </div>
                    </div>
                    <div className="c-comparison-hero_icon-line">
                      <div className="c-comparison-hero_line"></div>
                    </div>
                    <div className="c-comparison-hero_icon">
                      <div className="c-comparison-hero_image-wrapper">
                        <img
                          src="/webflow-images/brightwave_tile.png"
                          loading="lazy"
                          sizes="(max-width: 1080px) 100vw, 1080px"
                          srcSet="/webflow-images/brightwave_tile-p-500.png 500w, /webflow-images/brightwave_tile-p-800.png 800w, /webflow-images/brightwave_tile.png 1080w"
                          alt=""
                          className="c-comparison-hero_image"
                        />
                      </div>
                      <div className="c-comparison-hero_label">
                        <div className="c-text-5">Brightwave</div>
                      </div>
                    </div>
                  </div>
                  <div className="c-comparison-hero_button-wrapper">
                    <CtaButton label="Make the Switch" href="/pricing" variant="primary" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Hero content section */}
        <section className="c-section cc-comparison-template-hero">
          <div className="c-container">
            <div className="c-comparison-template_grid cc-rel">
              <div id="w-node-bd64f2a5-879f-44ce-d7e7-9e2a85552da6-43706a8a" className="c-comparison-template_hero-content">
                <div className="c-comparison-template_hero_title-wrapper">
                  <h1 className="c-title-2 cc-lh-edit">{doc.title || ''}</h1>
                </div>
                <div className="c-comparison-template_hero-content-wrapper">
                  <div className="c-comparison-template_text-stack">
                    <div className="c-comparison-template_hero_text-wrapper">
                      <p className="c-text-3 cc-small--tweak">{doc.heroDescription || ''}</p>
                    </div>
                    <div className="c-comparison-template_desc-wrapper">
                      <div className="c-comparison-template_rich-list w-richtext">
                        {doc.heroDescriptionList && Array.isArray(doc.heroDescriptionList) && doc.heroDescriptionList.length > 0 ? (
                          <PortableText value={doc.heroDescriptionList} />
                        ) : null}
                      </div>
                    </div>
                  </div>
                  <div className="c-comparison-template_hero-button-group">
                    <CtaButton label="Get Started " href="/pricing" variant="primary" />
                    <CtaButton label="Schedule a Demo" href="/contact" variant="outline" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Lottie thin banner */}
        <section className="c-section cc-comparison-lottie-thin">
          <div className="c-container">
            <div>
              <div lottie-bg="" className="lottie-crop">
                <LottiePlayer
                  src="/webflow-documents/CTA-Lottie-25.json"
                  className="lottie_cropped-desktop"
                  loop
                  autoplay
                />
                <LottiePlayer
                  src="/webflow-documents/Generative-Loop-Final-25.json"
                  className="lottie_cropped-mobile"
                  loop
                  autoplay
                />
              </div>
            </div>
          </div>
        </section>

        {/* Content blocks */}
        <section scroll-button-trigger="" className="c-section cc-comparison-block-list">
          <div className="c-container">
            <div className="c-comparison-template_grid cc-rel">
              <div id="w-node-af1e9581-2d3a-c742-e00b-8739923f9982-43706a8a" className="c-comparison-content_main-wrapper w-dyn-list">
                {contentBlocks.length > 0 ? (
                  <div role="list" className="c-comparison-content_list w-dyn-items">
                    {contentBlocks.map((block: any, idx: number) => (
                      <div key={block._key || idx} role="listitem" className="c-comparison-content_item w-dyn-item">
                        <div className="c-comparison-content_card-wrapper">
                          <div className="c-comparison-content_image-wrapper">
                            {block.image?.asset ? (
                              <Image
                                src={urlFor(block.image).width(800).url()}
                                alt={block.title || block.headline || ''}
                                width={800}
                                height={450}
                                loading="lazy"
                                className="c-comparison-content_image"
                              />
                            ) : (
                              <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="c-comparison-content_image" />
                            )}
                            <div className="c-box-hero_bottom-right"></div>
                            <div className="c-box-hero_bottom-left"></div>
                            <div className="c-box-hero_top-right"></div>
                            <div className="c-box-hero_top-left"></div>
                            <div className="c-comparison-content_image-overlay">
                              <div className="c-comparison-content_icon-wrapper">
                                {block.icon?.asset ? (
                                  <Image
                                    src={urlFor(block.icon).width(80).url()}
                                    alt=""
                                    width={80}
                                    height={80}
                                    loading="lazy"
                                    className="c-comparison-content_icon"
                                  />
                                ) : (
                                  <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="c-comparison-content_icon" />
                                )}
                                <div className="c-comparison-content_icon-dash"></div>
                              </div>
                              <div className="c-comparison-content_text-wrapper">
                                <div className="c-text-5">{block.iconLabel || ''}</div>
                              </div>
                            </div>
                          </div>
                          <div className="c-comparison-content_card-content-wrapper">
                            <div className="c-comparison-card_title-wrapper">
                              <h2 className="c-text-2">{block.title || block.headline || ''}</h2>
                            </div>
                            <div className="c-comparison-card_text-wrapper">
                              {block.text ? (
                                <p className="c-text-5">{block.text}</p>
                              ) : block.body && Array.isArray(block.body) ? (
                                <div className="c-text-5">
                                  <PortableText value={block.body} />
                                </div>
                              ) : (
                                <p className="c-text-5"></p>
                              )}
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="w-dyn-empty">
                    <div>No items found.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {/* ===== USE CASE FIT ===== */}
      <section className="c-section cc-usecase-fit">
        <div className="c-container">
          <div className="c-usecase-fit_main-wrapper">
            <div className="c-usecase-fit_header-wrapper">
              <div className="c-usecase-fit_header">
                <div className="c-usecase-fit_header-box"></div>
                <h2 className="c-title-5">Use Case Fit</h2>
              </div>
            </div>
            <div className="c-usecase-fit_wrapper">
              <div className="c-comparison-template_grid cc-rel">
                <div id="w-node-e870b15d-d917-5654-0375-b3d0fbdf4882-43706a8a" className="c-usecase-fit_col-wrapper">
                  <div className="c-usecase-fit_title-wrapper">
                    <h2 className="c-title-2">{`With Brightwave, You Can\u2026`}</h2>
                  </div>
                  <div className="c-usecase-fit_button-wrapper">
                    <CtaButton label="Explore the Platform" href="/ai-powered-research-platform" variant="primary" />
                  </div>
                </div>
                <div id="w-node-a2f8f661-e254-66c9-fc5d-75f6d54037a6-43706a8a" className="c-usecase-fit_content-list">
                  {useCaseFitItems.length > 0 ? (
                    useCaseFitItems.map((item: any, idx: number) => (
                      <div key={item._key || idx} className="c-usecase-fit_content-item">
                        <div className="c-usecase-fit_text-stack">
                          <div className="c-title-5">{item.title}</div>
                          {item.description && <div className="c-text-4">{item.description}</div>}
                        </div>
                      </div>
                    ))
                  ) : (
                    <>
                      <div className="c-usecase-fit_content-item">
                        <div className="c-usecase-fit_text-stack">
                          <div className="c-title-5">Accelerate Analysis</div>
                          <div className="c-text-4">Shave hours off every review cycle. Go from buried in data to needle-moving insight in minutes.</div>
                        </div>
                      </div>
                      <div className="c-usecase-fit_content-item">
                        <div className="c-usecase-fit_text-stack">
                          <div className="c-title-5">Increase Conviction</div>
                          <div className="c-text-4">Rest easy knowing every critical detail is surfaced and source-verified, reducing the risk of costly oversights.</div>
                        </div>
                      </div>
                      <div className="c-usecase-fit_content-item">
                        <div className="c-usecase-fit_text-stack">
                          <div className="c-title-5">Elevate your work</div>
                          <div className="c-text-4">Reclaim time for strategy and thesis-building. Spend less energy on tedious grunt work, more on big-picture thinking.</div>
                        </div>
                      </div>
                      <div className="c-usecase-fit_content-item">
                        <div className="c-usecase-fit_text-stack">
                          <div className="c-title-5">Scale with Ease</div>
                          <div className="c-text-4">Say yes to more deals no late nights required. Keep quality high even under tight deadlines.</div>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== COMPARISON TABLE ===== */}
      <section className="c-section cc-comparison-table">
        <div className="c-container">
          <div className="c-comparison-table_main-wrapper">
            <div className="c-comparison-template_grid cc-table">
              <div id="w-node-_6b9e6292-cb28-ddaf-8909-29f834aac229-43706a8a" className="c-comparison-template_header-row">
                <div className="c-comparison-template_brand-header">
                  <div className="c-compared-brand_header-item">
                    {doc.competitorIcon?.asset ? (
                      <div className="c-brightwave-brand_icon-wrapper">
                        <Image
                          src={urlFor(doc.competitorIcon).width(40).url()}
                          alt={doc.competitorName || ''}
                          width={40}
                          height={40}
                          loading="lazy"
                          className="c-brightwave-brand_icon"
                        />
                      </div>
                    ) : (
                      <div className="c-brightwave-brand_icon-wrapper">
                        <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="c-brightwave-brand_icon" />
                      </div>
                    )}
                    <div className="c-title-5">{doc.competitorName || ''}</div>
                  </div>
                  <div className="c-brightwave-brand_header-item">
                    <div className="c-brightwave-brand_icon-wrapper">
                      <div className="c-brightwave-brand_icon w-embed">
                        <svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M13.8294 10.3098V14.5571L13.2751 15.1232L8.5625 10.3098C8.5625 10.0668 8.5625 9.93059 8.5625 9.68764L14.2969 3.83056L14.3861 3.73941C14.5354 3.67627 14.6675 3.62028 14.8168 3.55713H17.6634C17.9012 3.80007 18.0352 3.93663 18.2734 4.17958V9.06707C18.0362 9.30939 17.9034 9.44501 17.6661 9.68733H14.4385L13.8294 10.3095V10.3098Z" fill="currentColor"></path>
                          <path d="M0 3.55737L0.54271 2.99869L3.48284 6.00173C3.81907 6.00173 4.00819 6.00173 4.34442 6.00173L7.52271 2.75543L10.2204 0H11.0817L13.8293 2.80645V3.42858L13.7033 3.55737L8.13211 9.24772L7.87995 9.50529L7.44931 9.68757H0.610016C0.372162 9.44463 0.238769 9.30838 0.000914544 9.06544V9.05548" fill="currentColor"></path>
                          <path d="M0 10.9418V16.44L0.545147 16.9968L3.48284 13.9962C3.81907 13.9962 4.00819 13.9962 4.34442 13.9962L8.1242 17.8569L10.2229 20.0001C10.5594 20.0001 10.7479 20.0001 11.0841 20.0001L13.8293 17.1962V16.569L13.7033 16.4403L8.13211 10.7499L7.87995 10.4923C7.73072 10.4292 7.59854 10.3732 7.44931 10.3101H0.610016C0.372162 10.553 0.238769 10.6892 0.000914544 10.9322V10.9421L0 10.9418Z" fill="currentColor"></path>
                          <path d="M15.0466 10.3101H17.6633C17.9012 10.553 18.0345 10.6892 18.2724 10.9322V15.8178C18.0345 16.0608 17.9012 16.197 17.6633 16.44H15.0466L14.4375 15.8178V10.9322L15.0466 10.3101Z" fill="currentColor"></path>
                        </svg>
                      </div>
                    </div>
                    <div className="c-title-5">Brightwave</div>
                    <div className="c-brightwave-brand_top-right"></div>
                  </div>
                </div>
              </div>
            </div>
            <div className="c-comparison-table_wrapper w-dyn-list">
              {tableRows.length > 0 ? (
                <div role="list" className="c-comparison-table_list w-dyn-items">
                  {tableRows.map((row: any, idx: number) => (
                    <div key={row._key || idx} role="listitem" className="c-comparison-table_item w-dyn-item">
                      <div className="c-comparison-template_grid cc-table">
                        <div id="w-node-_987e53a2-7483-0e99-b499-5c178932e0ed-43706a8a" className="c-comparison-table_item-header_wrapper">
                          <div className="c-text-4 cc-weight-700">{row.feature || ''}</div>
                          {row.tooltip && (
                            <div className="c-comparison-table_item-tooltip">
                              <div className="c-comparison-table-item_icon w-embed">
                                <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" viewBox="0 0 17 17" fill="none">
                                  <path d="M7.59458 12.7442H9.41083V7.66938H7.59458V12.7442ZM8.50271 6.10229C8.76701 6.10229 8.98861 6.01292 9.1675 5.83417C9.34625 5.65528 9.43563 5.43368 9.43563 5.16938C9.43563 4.90507 9.34625 4.68347 9.1675 4.50458C8.98861 4.32583 8.76701 4.23646 8.50271 4.23646C8.2384 4.23646 8.01681 4.32583 7.83792 4.50458C7.65917 4.68347 7.56979 4.90507 7.56979 5.16938C7.56979 5.43368 7.65917 5.65528 7.83792 5.83417C8.01681 6.01292 8.2384 6.10229 8.50271 6.10229ZM8.50271 17.0054C7.3234 17.0054 6.21688 16.7824 5.18313 16.3363C4.14924 15.8901 3.24993 15.2848 2.48521 14.5202C1.72063 13.7555 1.11528 12.8562 0.669167 11.8223C0.223055 10.7885 0 9.68201 0 8.50271C0 7.3234 0.223055 6.21687 0.669167 5.18313C1.11528 4.14924 1.72063 3.24993 2.48521 2.48521C3.24993 1.72062 4.14924 1.11528 5.18313 0.669167C6.21688 0.223055 7.3234 0 8.50271 0C9.68201 0 10.7885 0.223055 11.8223 0.669167C12.8562 1.11528 13.7555 1.72062 14.5202 2.48521C15.2848 3.24993 15.8901 4.14924 16.3363 5.18313C16.7824 6.21687 17.0054 7.3234 17.0054 8.50271C17.0054 9.68201 16.7824 10.7885 16.3363 11.8223C15.8901 12.8562 15.2848 13.7555 14.5202 14.5202C13.7555 15.2848 12.8562 15.8901 11.8223 16.3363C10.7885 16.7824 9.68201 17.0054 8.50271 17.0054ZM8.50271 15.1096C10.3505 15.1096 11.9136 14.4704 13.1921 13.1921C14.4704 11.9136 15.1096 10.3505 15.1096 8.50271C15.1096 6.65493 14.4704 5.09181 13.1921 3.81333C11.9136 2.535 10.3505 1.89583 8.50271 1.89583C6.65493 1.89583 5.09181 2.535 3.81333 3.81333C2.535 5.09181 1.89583 6.65493 1.89583 8.50271C1.89583 10.3505 2.535 11.9136 3.81333 13.1921C5.09181 14.4704 6.65493 15.1096 8.50271 15.1096Z" fill="currentColor"></path>
                                </svg>
                              </div>
                              <div className="c-comparison-table-item_tooltip">
                                <p className="c-text-5">{row.tooltip}</p>
                                <div className="c-tooltip-triad"></div>
                              </div>
                            </div>
                          )}
                          <div className="w-embed">
                            <style dangerouslySetInnerHTML={{ __html: `
.c-comparison-table_item-tooltip:hover .c-comparison-table-item_tooltip {
	opacity: 1;
}
` }} />
                          </div>
                        </div>
                        {/* Competitor cell */}
                        <div id="w-node-_7a3dce5a-ee11-9a34-0a76-ecc739e3921d-43706a8a" className="c-comparison-cell-options">
                          {row.competitorText ? (
                            <div className="c-text-5">{row.competitorText}</div>
                          ) : row.competitorValue === true || row.competitorValue === 'yes' || row.competitorValue === 'superior' ? (
                            <>
                              <div className="c-text-5" style={{ display: 'none' }}></div>
                              <div className="c-text-5" style={{ display: 'none' }}>-</div>
                              <div className="c-comparison-table_item-icon-wrapper">
                                <div className="c-comparison-table_item-icon w-embed">
                                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.90937 10.3446L0 5.43521L1.35187 4.08333L4.90937 7.64083L12.5502 0L13.9021 1.35188L4.90937 10.3446Z" fill="currentColor"></path>
                                  </svg>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="c-text-5" style={{ display: 'none' }}></div>
                              <div className="c-text-5">-</div>
                              <div className="c-comparison-table_item-icon-wrapper" style={{ display: 'none' }}>
                                <div className="c-comparison-table_item-icon w-embed">
                                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.90937 10.3446L0 5.43521L1.35187 4.08333L4.90937 7.64083L12.5502 0L13.9021 1.35188L4.90937 10.3446Z" fill="currentColor"></path>
                                  </svg>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                        {/* Brightwave cell */}
                        <div id="w-node-_018cf748-6786-84cf-1aea-c5557d144e11-43706a8a" className="c-comparison-cell-options">
                          {row.brightwaveText ? (
                            <div className="c-text-5">{row.brightwaveText}</div>
                          ) : row.brightwaveValue === true || row.brightwaveValue === 'yes' || row.brightwaveValue === 'superior' ? (
                            <>
                              <div className="c-text-5" style={{ display: 'none' }}></div>
                              <div className="c-text-5" style={{ display: 'none' }}>-</div>
                              <div className="c-comparison-table_item-icon-wrapper">
                                <div className="c-comparison-table_item-icon w-embed">
                                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.90937 10.3446L0 5.43521L1.35187 4.08333L4.90937 7.64083L12.5502 0L13.9021 1.35188L4.90937 10.3446Z" fill="currentColor"></path>
                                  </svg>
                                </div>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className="c-text-5" style={{ display: 'none' }}></div>
                              <div className="c-text-5">-</div>
                              <div className="c-comparison-table_item-icon-wrapper" style={{ display: 'none' }}>
                                <div className="c-comparison-table_item-icon w-embed">
                                  <svg width="14" height="11" viewBox="0 0 14 11" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M4.90937 10.3446L0 5.43521L1.35187 4.08333L4.90937 7.64083L12.5502 0L13.9021 1.35188L4.90937 10.3446Z" fill="currentColor"></path>
                                  </svg>
                                </div>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="w-dyn-empty">
                  <div>No items found.</div>
                </div>
              )}
            </div>
          </div>
          <div className="c-comparison-table_footer-wrapper">
            <div className="c-comparison-template_hero-button-group">
              <CtaButton label="Make the Switch" href="/pricing" variant="primary" />
              <CtaButton label="Schedule a Demo" href="/contact" variant="outline" />
            </div>
            <div className="c-comparison-table_footer-text-wrapper">
              <p className="c-text-6 cc-lh-tweak"><strong>7-day free-trial &middot; No credit card required &middot; Cancel anytime</strong></p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== STATISTICS BLOCK ===== */}
      <section className="c-section cc-comparison-template_statistic">
        <div className="c-container">
          <div id="w-node-fb0419f6-d0f6-9e8c-bb48-fe12f3bf9be8-43706a8a" className="c-comparison_stats-block_main-wrapper">
            <div id="w-node-_7eb0766a-1a3b-c916-8662-30b96828a333-43706a8a" className="c-comparison-stats_left-block">
              <div className="c-comaprison-stat-box_wrapper">
                <div className="c-comaprison-stat-box_tag-wrapper">
                  <div className="c-comparison-tag_box"></div>
                  <div className="c-title-5 cc-weight-500">{statsBlock?.tagLabel || ''}</div>
                </div>
                <div className="c-comparison-stat-box_flex">
                  <div className="c-comparison-stat-box_stat-wrapper">
                    <div className="c-title-3">{statsBlock?.stat1Value || ''}</div>
                    <div className="c-text-4">{statsBlock?.stat1Label || ''}</div>
                  </div>
                  <div className="c-comparison-stat-box_stat-wrapper">
                    <div className="c-title-3">{statsBlock?.stat2Value || ''}</div>
                    <div className="c-text-4">{statsBlock?.stat2Label || ''}</div>
                  </div>
                </div>
              </div>
              <div className="c-comparison-stat-box_logo-list">
                <div className="c-comparison-stat-box_logo-wrapper"><img src="/webflow-images/Frame-1321317964.png" loading="lazy" alt="" className="c-comparison-stat-box_logo" /></div>
                <div className="c-comparison-stat-box_logo-wrapper"><img src="/webflow-images/Frame-1321317971.png" loading="lazy" alt="" className="c-comparison-stat-box_logo-lottie-list" /></div>
                <div className="cc-mobile-hide"></div>
              </div>
              <div className="c-comparison-stat-box_logo-lottie-list">
                <div id="w-node-_95e2ac0e-65e8-0af8-6078-72f098588613-43706a8a" className="c-comparison-stat-box_logo-wrapper"><img src="/webflow-images/Frame-1321317970.png" loading="lazy" alt="" className="c-comparison-stat-box_logo" /></div>
                <img src="/webflow-images/Frame-1321317973.png" loading="lazy" id="w-node-df45419b-0dd1-c894-9508-53b1358bd8a2-43706a8a" alt="" className="c-comparison-stat-box_image" />
              </div>
              <div className="c-comparison-stat-box_lottie-list">
                <img
                  src="/webflow-images/Frame-1321317985.png"
                  loading="lazy"
                  sizes="(max-width: 1381px) 100vw, 1381px, 100vw"
                  srcSet="/webflow-images/Frame-1321317985-p-500.png 500w, /webflow-images/Frame-1321317985-p-800.png 800w, /webflow-images/Frame-1321317985.png 1381w"
                  alt=""
                  className="c-comparison-stat-box_image"
                />
              </div>
            </div>
            <div id="w-node-_58f67171-6069-204a-74a9-3b081599ab3d-43706a8a" className="c-comparison-stats_right-block">
              <div className="c-comparison-stats_image-block">
                <div id="w-node-fd184261-e0b4-c554-21e4-1b8ce28ae367-43706a8a" className="c-comparison-template_image-dk"><img src="/webflow-images/Frame-1321317981.png" loading="lazy" alt="" className="c-comparison-stat-box_image" /></div>
                <div className="c-comparison-template_image-dk">
                  <img
                    src="/webflow-images/Frame-1321317976.png"
                    loading="lazy"
                    width={386}
                    sizes="(max-width: 479px) 100vw, 386px"
                    alt=""
                    srcSet="/webflow-images/Frame-1321317976-p-500.png 500w, /webflow-images/Frame-1321317976.png 772w"
                    className="c-comparison-stat-box_image cc-mobile-hide"
                  />
                  <div className="c-comparison-stat-box_logo-wrapper">
                    <img
                      src="/webflow-images/Frame-1321317966.png"
                      loading="lazy"
                      sizes="(max-width: 772px) 100vw, 772px"
                      srcSet="/webflow-images/Frame-1321317966-p-500.png 500w, /webflow-images/Frame-1321317966.png 772w"
                      alt=""
                      className="c-comparison-stat-box_logo"
                    />
                  </div>
                </div>
              </div>
              <div className="c-comparison-quote_item">
                <div className="c-comaprison-stat-box_tag-wrapper">
                  <div className="c-comparison-tag_box"></div>
                  <div className="c-title-5 cc-weight-500">{quoteBlock?.tagLabel || ''}</div>
                </div>
                <p className="c-text-2">{quoteBlock?.quote || ''}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FEATURED QUOTE ===== */}
      <section className="c-section cc-comparison-template_quote-only">
        <div className="c-container">
          <div id="w-node-_65a9a1ad-7556-06cc-fc80-c3507ce73c7d-43706a8a" className="c-comparison-quote-only_main-wrapper">
            <div className="c-comparison-quote-only_text-stack">
              <div className="c-title-5">Featured Quote</div>
              <div className="c-comparison-quote-only_text-wrapper">
                <div className="c-comaprison-stat-box_tag-wrapper">
                  <div className="c-comparison-tag_box"></div>
                  <div className="c-title-5 cc-weight-500">{featuredQuote?.attribution || ''}</div>
                </div>
                <p className="c-text-2">{featuredQuote?.quote || ''}</p>
              </div>
            </div>
            <div className="c-comparison-quote-only_image-wrapper">
              <img
                src="/webflow-images/testimonial-graphic.png"
                loading="lazy"
                sizes="100vw"
                srcSet="/webflow-images/testimonial-graphic-p-500.png 500w, /webflow-images/testimonial-graphic-p-800.png 800w, /webflow-images/testimonial-graphic.png 1119w"
                alt=""
                className="c-comparison-quote-only_image"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ===== LOGO WALL ===== */}
      <section className="c-section cc-comparison-template_quote-only">
        <div className="c-container">
          <div id="w-node-_3174487f-977a-b731-0f27-778c912aba11-43706a8a" className="c-comparison-template_logo-wall-main-wrapper">
            <div className="c-comparison-template_logo-wall_header-wrapper">
              <div className="c-title-5">{logoWall?.headline || 'Lorem ipsum dolor sit amet consectetur. Blandit leo porttitor pulvinar hendrerit in.'}</div>
            </div>
            <div className="c-comparison-template_logo-wall-wrapper">
              <div className="c-comparison-template_logo-wall-item"><img src="/webflow-images/fortune.png" loading="lazy" alt="" className="c-comparison-template_logo-item" /></div>
              <div className="c-comparison-template_logo-wall-item"><img src="/webflow-images/wsjpro.png" loading="lazy" alt="" className="c-comparison-template_logo-item" /></div>
              <div className="c-comparison-template_logo-wall-item"><img src="/webflow-images/axios.png" loading="lazy" alt="" className="c-comparison-template_logo-item" /></div>
              <div className="c-comparison-template_logo-wall-item"><img src="/webflow-images/latent-space_1.png" loading="lazy" alt="" className="c-comparison-template_logo-item" /></div>
              <div className="c-comparison-template_logo-wall-item"><img src="/webflow-images/fox-business.png" loading="lazy" alt="" className="c-comparison-template_logo-item" /></div>
              <div className="c-comparison-template_logo-wall-item"><img src="/webflow-images/>df.png" loading="lazy" alt="" className="c-comparison-template_logo-item" /></div>
              <div className="c-comparison-template_logo-wall-item"><img src="/webflow-images/cerebral-valley.png" loading="lazy" alt="" className="c-comparison-template_logo-item" /></div>
              <div className="c-comparison-template_logo-wall-item"><img src="/webflow-images/tech-crunch.png" loading="lazy" alt="" className="c-comparison-template_logo-item" /></div>
              <div className="c-comparison-template_logo-wall-item"><img src="/webflow-images/time.png" loading="lazy" alt="" className="c-comparison-template_logo-item" /></div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== SECOND STATS ROW ===== */}
      <section className="c-section cc-comparison-template_quote-only">
        <div className="c-container">
          <div>
            <div className="c-comaprison-stat-box_wrapper">
              <div className="c-comaprison-stat-box_tag-wrapper">
                <div className="c-comparison-tag_box"></div>
                <div className="c-title-5 cc-weight-500">{secondStatsBlock?.tagLabel || ''}</div>
              </div>
              <div className="c-comparison-stat-box_flex">
                <div className="c-comparison-stat-box_stat-wrapper">
                  <div className="c-title-3">{secondStatsBlock?.stat1Value || ''}</div>
                  <div className="c-text-4">{secondStatsBlock?.stat1Label || ''}</div>
                </div>
                <div className="c-comparison-stat-box_stat-wrapper">
                  <div className="c-title-3">{secondStatsBlock?.stat2Value || ''}</div>
                  <div className="c-text-4">{secondStatsBlock?.stat2Label || ''}</div>
                </div>
                <div className="c-comparison-stat-box_stat-wrapper">
                  <div className="c-title-3">{secondStatsBlock?.stat3Value || ''}</div>
                  <div className="c-text-4">{secondStatsBlock?.stat3Label || ''}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FAQs ===== */}
      <section className="c-section cc-comaprison-faq">
        <div className="c-container">
          <div className="c-comparison-faq_main-wrapper">
            <div className="c-comparison-faq_header-wrapper">
              <div className="c-comparison-faq_title-wrapper">
                <h2 className="c-title-2">FAQs</h2>
              </div>
            </div>
            <div className="c-comparison-faq_wrapper">
              {faqs.length > 0 ? (
                faqs.map((faq: any, idx: number) => (
                  <div key={faq._key || idx} className="c-comparison-faq_item">
                    <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                      <div className="accordion_toggle">
                        <div className="c-text-2 cc-balance">{faq.question}</div>
                        <div chevron-x="" className="c-svg-2 cc-20 w-embed">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </div>
                        <input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                      </div>
                      <div accordion="element" className="accordion_dropdown">
                        <div mask-height="element">
                          <div className="accordion_content">
                            {faq.answer && Array.isArray(faq.answer) ? (
                              <div className="c-text-4 w-richtext">
                                <PortableText value={faq.answer} />
                              </div>
                            ) : typeof faq.answer === 'string' ? (
                              <div className="c-text-4 w-richtext">
                                <p>{faq.answer}</p>
                              </div>
                            ) : null}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <>
                  <div className="c-comparison-faq_item">
                    <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                      <div className="accordion_toggle">
                        <div className="c-text-2 cc-balance">How does Brightwave ensure the accuracy of its insights?</div>
                        <div chevron-x="" className="c-svg-2 cc-20 w-embed">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </div>
                        <input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                      </div>
                      <div accordion="element" className="accordion_dropdown">
                        <div mask-height="element">
                          <div className="accordion_content">
                            <div className="c-text-4 w-richtext">
                              <p>Brightwave uses state-of-the-art entailment models to cross-verify every research finding against the source content, ensuring high accuracy and reliability of insights. The platform provides sentence-level attribution to the underlying primary sources, allowing you to trace the origin of every data point for complete transparency.<br /></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="c-comparison-faq_item">
                    <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                      <div className="accordion_toggle">
                        <div className="c-text-2 cc-balance">Can I customise the data sources for my analysis?</div>
                        <div chevron-x="" className="c-svg-2 cc-20 w-embed">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </div>
                        <input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                      </div>
                      <div accordion="element" className="accordion_dropdown">
                        <div mask-height="element">
                          <div className="accordion_content">
                            <div className="c-text-4 w-richtext">
                              <p>Brightwave uses state-of-the-art entailment models to cross-verify every research finding against the source content, ensuring high accuracy and reliability of insights. The platform provides sentence-level attribution to the underlying primary sources, allowing you to trace the origin of every data point for complete transparency.<br /></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="c-comparison-faq_item">
                    <div accordion="" id="w-node-_0d758a7c-5986-fc72-0a2c-7e16d285f79d-d285f79d" className="accordion">
                      <div className="accordion_toggle">
                        <div className="c-text-2 cc-balance">How secure is my data with Brightwave?</div>
                        <div chevron-x="" className="c-svg-2 cc-20 w-embed">
                          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5V19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                            <path d="M5 12H19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"></path>
                          </svg>
                        </div>
                        <input accordion-checkbox="" type="checkbox" className="accordion_checkbox" />
                      </div>
                      <div accordion="element" className="accordion_dropdown">
                        <div mask-height="element">
                          <div className="accordion_content">
                            <div className="c-text-4 w-richtext">
                              <p>Brightwave uses state-of-the-art entailment models to cross-verify every research finding against the source content, ensuring high accuracy and reliability of insights. The platform provides sentence-level attribution to the underlying primary sources, allowing you to trace the origin of every data point for complete transparency.<br /></p>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ===== BOTTOM CTA BLOCK (Explore the Platform) ===== */}
      <section className="c-section cc-comparison_cta-block">
        <div className="c-container">
          <div className="v-60">
            <div>
              <div className="learning-lottie">
                <div lottie-bg="" className="lottie-crop">
                  <LottiePlayer
                    src="/webflow-documents/CTA-Lottie-25.json"
                    className="lottie_cropped-desktop"
                    loop
                    autoplay
                  />
                  <LottiePlayer
                    src="/webflow-documents/Generative-Loop-Final-25.json"
                    className="lottie_cropped-mobile"
                    loop
                    autoplay
                  />
                </div>
              </div>
            </div>
            <div className="titles">
              <div className="title_flex">
                <div className="c-title-cta">EXPLORE</div>
              </div>
              <div className="title_flex cc-explore">
                <div className="c-title-cta cc-new-grey">THE</div>
                <div className="c-title-cta">Platform</div>
              </div>
            </div>
            <div className="h-flex-20">
              <div className="explore-item">
                <div className="aspect-16-9">
                  <div className="u-relative">
                    <img src="/webflow-images/illustration_Investment-Intelligence-Engine.svg" loading="lazy" width={70} light-asset="" alt="" className="image-abso" />
                    <img src="/webflow-images/illustration_Investment-Intelligence-Engine-1.svg" loading="lazy" width={70} dark-asset="" alt="" className="image-abso" />
                  </div>
                </div>
                <div className="v-64 cc-fill">
                  <div className="v-20 cc-explore">
                    <div className="c-title-3">Research Intelligence Engine</div>
                    <div className="c-text-4">Process entire data rooms and produce high-quality deliveables in minutes. Surface material factors instantly. Never miss a critical detail.</div>
                  </div>
                  <CtaButton label="Learn more" href="/investment-intelligence-engine" variant="primary" />
                </div>
              </div>
              <div className="explore-item">
                <div className="aspect-16-9">
                  <div className="u-relative">
                    <img src="/webflow-images/illustration_Enterprise-Trust--Security.svg" loading="lazy" width={70} light-asset="" alt="" className="image-abso" />
                    <img src="/webflow-images/illustration_Enterprise-Trust--Security-1.svg" loading="lazy" width={70} dark-asset="" alt="" className="image-abso" />
                  </div>
                </div>
                <div className="v-64 cc-fill">
                  <div className="v-20 cc-explore">
                    <div className="c-title-3">SOC 2 Type II Compliant</div>
                    <div className="c-text-4">Exchange-grade security built by financial services veterans with robust data isolation and quality controls.</div>
                  </div>
                  <CtaButton label="Learn More" href="/enterprise-security-compliance" variant="primary" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
