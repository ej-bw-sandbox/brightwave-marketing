import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { contentPostIndexQuery } from '@/lib/sanity/queries/content-posts'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

export const metadata: Metadata = {
  title: 'Blog | Brightwave',
  description: 'Insights from the Brightwave team.',
}

export default async function Page() {
  let posts: any[] = []
  try {
    const data = await client.fetch(
      contentPostIndexQuery,
      { category: 'blog', offset: 0, limit: 50 },
      { next: { tags: ['contentPost'], revalidate: 3600 } }
    )
    posts = data?.posts ?? []
  } catch { posts = [] }

  const featured = posts[0]
  const rest = posts.slice(1)

  return (
    <>
      <section className="c-section cc-template">
        <div className="c-container">
          <div className="bp40-underline">
            <h1 className="c-title-1">Knowledge Center</h1>
          </div>
          <div className="w-dyn-list">
            {featured ? (
              <div role="list" className="w-dyn-items">
                <div role="listitem" className="card_item w-dyn-item">
                  <Link data-w-id="50042883-03e0-1a26-5ffd-7d11d5f0e3ba" href={`/blog/${featured.slug?.current || ''}`} className="grid cc-featured w-inline-block">
                    <div id="w-node-_96b7d29b-ca62-a087-9a37-d2ef844438cf-4c4a8e00" className="inject-landscape"></div>
                    <div id="w-node-_8d9fda5a-b3e5-2f57-492c-719e340eb766-4c4a8e00" className="aspect-16-9 u-overflow-hidden">
                      {featured.coverImage?.asset?.url ? (
                        <img src={featured.coverImage.asset.url} loading="lazy" alt={featured.title || ''} className="img-cover" />
                      ) : (
                        <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="img-cover w-dyn-bind-empty" />
                      )}
                      <div className="featured-svg">
                        <div className="svg w-embed">
                          <svg width={74} height={57} viewBox="0 0 74 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.8281 3.24967e-06L74 0.0499327L74 57L0.0693104 57L0.0693072 20.2931L36.8281 3.24967e-06Z" fill="#E7E70D" />
                          </svg>
                        </div>
                        <LottiePlayer src="/webflow-documents/Arrow-Lottie.json" className="cta-lottie" loop={false} autoplay={false} />
                      </div>
                    </div>
                    <div id="w-node-e443da8c-33db-3129-61f5-1e4331df01f6-4c4a8e00" className="featured_right">
                      <div className="featured_top">
                        <div className="eyebrow-flex">
                          <div className="block"></div>
                          <div className="c-title-5">Our Insights</div>
                        </div>
                        <div className="c-title-4">{featured.title}</div>
                      </div>
                      <div className="c-text-4">{featured.excerpt || ''}</div>
                    </div>
                  </Link>
                </div>
              </div>
            ) : (
              <div className="w-dyn-empty">
                <div>No items found.</div>
              </div>
            )}
          </div>
          <div className="collection">
            <div className="collection_list-wrap">
              <div className="collection_list">
                <div role="list" className="grid cc-collection w-dyn-items">
                  {rest.map((post: any) => (
                    <div key={post._id} id="w-node-c5123b81-e463-2eab-695f-359de2f2994d-4c4a8e00" role="listitem" className="collection_card w-dyn-item">
                      <Link href={`/blog/${post.slug?.current || ''}`} className="card w-inline-block">
                        <div className="aspect-4-3">
                          {post.coverImage?.asset?.url ? (
                            <img alt={post.title || ''} loading="lazy" src={post.coverImage.asset.url} className="img-cover" />
                          ) : (
                            <img alt="" loading="lazy" src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" className="img-cover w-dyn-bind-empty" />
                          )}
                        </div>
                        <div className="card_flex">
                          <div className="c-title-5">{post.title}</div>
                          <div className="author-hide">{post.author?.name || ''}</div>
                          <div className="c-text-6">
                            {post.publishedAt
                              ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
                              : ''}
                          </div>
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {rest.length === 0 && (
                  <div className="w-dyn-empty">
                    <div>No items found.</div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

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
              <Link href="/contact" className="cta-p-big w-inline-block">
                <div className="cta-p-big_top">
                  <div className="c-text-link cc-stagger-cta">Schedule a Trial</div>
                </div>
                <svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 35 33" fill="none" className="cta-p-big_arrows cc-hide">
                  <rect width="4.52527" height="4.49649" transform="matrix(1 8.74228e-08 8.74228e-08 -1 30.0078 32.5312)" fill="currentColor" />
                  <g clipPath="url(#clip0_913_4549)">
                    <path d="M3.34961 20.228L21.2115 20.228L21.2115 2.47975" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel" />
                    <path d="M21.2099 20.228L1.60254 0.745389" stroke="currentColor" strokeWidth="1.92707" strokeLinejoin="bevel" />
                  </g>
                  <defs>
                    <clipPath id="clip0_913_4549">
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
    </>
  )
}
