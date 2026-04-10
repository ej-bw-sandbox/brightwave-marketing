import { client } from '@/lib/sanity/client'
import { contentPostDetailQuery, contentPostSlugsQuery } from '@/lib/sanity/queries/content-posts'
import { PortableTextRenderer } from '@/components/sections/PortableTextRenderer'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(contentPostSlugsQuery, { category: 'engineering-log' })
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(contentPostDetailQuery, { slug, category: 'engineering-log' })
  if (!post) return {}
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
  }
}

export default async function EngineeringLogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = await client.fetch(
    contentPostDetailQuery,
    { slug, category: 'engineering-log' },
    { next: { tags: ['contentPost'] } }
  )
  if (!post) notFound()

  const relatedPosts = post.relatedPosts ?? []
  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat('en-US', { month: 'long', day: 'numeric', year: 'numeric' }).format(new Date(post.publishedAt))
    : null
  const categoryLabel = 'Engineering Log'

  return (
    <>
      <section className="c-section cc-template">
        <div className="c-container">
          <div className="content">
            <div className="grid cc-template">
              <div id="w-node-eng-template-left" className="template">
                <div className="template_mobile">
                  <Link href="/engineering-log" className="eyebrow-flex cc-mobile w-inline-block">
                    <div className="block"></div>
                    <div className="c-title-5">Go back</div>
                  </Link>
                  <h1 className="c-title-3 cc-template">{post.title}</h1>
                </div>
                <div className="template_flex">
                  <div className="eyebrow-flex">
                    <div className="block"></div>
                    <div className="c-title-5">{categoryLabel}</div>
                  </div>
                  <div className="text-flex">
                    <div className="c-text-4">By</div>
                    <div className="author-wrap">
                      <div className="c-text-4">{post.author?.name || ''}</div>
                      <div className="author-pointer"></div>
                      <div className="author-line"></div>
                    </div>
                  </div>
                  {formattedDate && (
                    <div className="c-text-6">{formattedDate}</div>
                  )}
                </div>
                <div className="inject-tablet"></div>
              </div>
              <div id="w-node-eng-template-right" className="u-overflow-hidden">
                <div className="aspect-16-9 cc-relative">
                  {post.coverImage?.asset?.url ? (
                    <img src={post.coverImage.asset.url} alt={post.title || ''} width="auto" height="auto" className="img-cover cc-abso" />
                  ) : (
                    <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="" className="img-cover cc-abso w-dyn-bind-empty" />
                  )}
                </div>
              </div>
            </div>
            <div className="grid">
              <div id="w-node-eng-sidebar">
                <div className="template_sticky">
                  <div className="c-text-4">Share on</div>
                  <div className="text-flex cc-socials">
                    <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(`https://www.brightwave.io/engineering-log/${slug}`)}`} target="_blank" rel="noopener noreferrer" className="social w-inline-block">
                      <div className="c-text-link">LinkedIn</div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 9 8" fill="none" className="linkedin-svg">
                        <g clipPath="url(#clip0_eng_li)">
                          <path d="M8.1123 7.08496L8.1123 0.364378L1.43446 0.364378" stroke="currentColor" strokeWidth="0.725064" strokeLinejoin="bevel" />
                          <path d="M8.1123 0.365358L0.781907 7.74268" stroke="currentColor" strokeWidth="0.725064" strokeLinejoin="bevel" />
                        </g>
                        <defs>
                          <clipPath id="clip0_eng_li">
                            <rect width="8" height="7.94912" fill="currentColor" transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 8.47461 8)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                    <a href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(`https://www.brightwave.io/engineering-log/${slug}`)}&text=${encodeURIComponent(post.title || '')}`} target="_blank" rel="noopener noreferrer" className="social w-inline-block">
                      <div className="c-text-link">X</div>
                      <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 9 8" fill="none" className="linkedin-svg">
                        <g clipPath="url(#clip0_eng_x)">
                          <path d="M8.1123 7.08496L8.1123 0.364378L1.43446 0.364378" stroke="currentColor" strokeWidth="0.725064" strokeLinejoin="bevel" />
                          <path d="M8.1123 0.365358L0.781907 7.74268" stroke="currentColor" strokeWidth="0.725064" strokeLinejoin="bevel" />
                        </g>
                        <defs>
                          <clipPath id="clip0_eng_x">
                            <rect width="8" height="7.94912" fill="currentColor" transform="matrix(-4.37114e-08 -1 -1 4.37114e-08 8.47461 8)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
              <div id="w-node-eng-richtext" className="rich-text w-richtext">
                {post.body && <PortableTextRenderer value={post.body} />}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <div>
        <section className="c-section">
          <div className="c-container">
            <div className="titles">
              <div className="title_flex">
                <div className="c-title-cta">Step</div>
                <div className="c-title-cta cc-grey">Into</div>
              </div>
              <div className="title_flex">
                <div className="c-title-cta cc-grey">THe</div>
                <div className="spacer"></div>
                <div className="c-title-cta">Future</div>
                <div className="c-title-cta cc-grey">OF</div>
              </div>
              <div className="title_flex cc-financial">
                <div className="spacer cc-financial"></div>
                <div>
                  <div className="c-title-cta">FiNANCIAL</div>
                </div>
              </div>
              <div className="title_flex cc-stetch">
                <div className="c-title-cta">Research</div>
              </div>
              <div className="cta-step">
                <Link href="/enterprise" className="cta-p-big w-inline-block">
                  <div className="cta-p-big_top">
                    <div className="c-text-link cc-stagger-cta">Schedule a Trial</div>
                  </div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 35 33" fill="none" className="cta-p-big_arrows cc-hide">
                    <rect width="4.52527" height="4.49649" transform="matrix(1 8.74228e-08 8.74228e-08 -1 30.0078 32.5312)" fill="currentColor" />
                    <g clipPath="url(#clip0_eng_cta)">
                      <path d="M3.34961 20.228L21.2115 20.228L21.2115 2.47975" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel" />
                      <path d="M21.2099 20.228L1.60254 0.745389" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel" />
                    </g>
                    <defs>
                      <clipPath id="clip0_eng_cta">
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
      </div>

      {/* Related Posts */}
      {relatedPosts.length > 0 && (
        <div className="u-dark-mode">
          <section className="c-section">
            <div className="c-container">
              <div className="founders">
                <div className="founders-flex">
                  <h2 className="c-title-2">More from the Engineering Log</h2>
                </div>
                <div className="w-dyn-list">
                  <div role="list" className="grid cc-cards w-dyn-items">
                    {relatedPosts.map((rp: any) => (
                      <div key={rp.slug?.current} role="listitem" className="card_item w-dyn-item">
                        <Link href={`/engineering-log/${rp.slug?.current || ''}`} className="card w-inline-block">
                          <div className="aspect-4-3">
                            {rp.coverImage?.asset?.url ? (
                              <img loading="lazy" src={rp.coverImage.asset.url} alt={rp.title || ''} className="img-cover" />
                            ) : (
                              <img loading="lazy" src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" alt="" className="img-cover w-dyn-bind-empty" />
                            )}
                          </div>
                          <div className="card_flex">
                            <div className="c-title-5">{rp.title}</div>
                            <div className="c-text-6">
                              {rp.publishedAt
                                ? new Date(rp.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                                : ''}
                            </div>
                          </div>
                        </Link>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="cta-founders">
                  <Link href="/engineering-log" className="cta-p-sm cc-stroke w-inline-block">
                    <div className="c-text-link cc-stagger-cta">View All</div>
                    <div className="flip-small">
                      <div className="flip-bg"></div>
                    </div>
                    <div className="flip-big">
                      <div className="svg cta-sm-arrow w-embed">
                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <g clipPath="url(#clip0_eng_viewall)">
                            <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                            <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                          </g>
                          <defs>
                            <clipPath id="clip0_eng_viewall">
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
          </section>
        </div>
      )}
    </>
  )
}
