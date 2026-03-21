import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { contentPostIndexQuery } from '@/lib/sanity/queries/content-posts'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

export const metadata: Metadata = {
  title: 'News | Brightwave',
  description: 'Latest news from the Brightwave team.',
}

export default async function Page() {
  let posts: any[] = []
  try {
    const data = await client.fetch(
      contentPostIndexQuery,
      { category: 'news', offset: 0, limit: 50 },
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
            <h1 className="c-title-1">Industry News</h1>
          </div>
          <div className="w-dyn-list">
            {featured ? (
            <div role="list" className="w-dyn-items">
              <div role="listitem" className="card_item w-dyn-item">
                <Link href={`/news/${featured.slug?.current || ''}`} className="grid cc-featured w-inline-block">
                  <div inject-landscape-target="featured" className="inject-landscape"></div>
                  <div className="aspect-16-9 u-overflow-hidden">
                    {featured.coverImage?.asset?.url ? (
                      <img src={featured.coverImage.asset.url} loading="lazy" alt={featured.title || ''} className="img-cover" />
                    ) : (
                      <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="img-cover w-dyn-bind-empty" />
                    )}
                    <div className="featured-svg">
                      <div className="svg w-embed"><svg width={74} height={57} viewBox="0 0 74 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M36.8281 3.24967e-06L74 0.0499327L74 57L0.0693104 57L0.0693072 20.2931L36.8281 3.24967e-06Z" fill="#E7E70D"></path>
                        </svg></div>
                      <LottiePlayer src="/webflow-documents/Arrow-Lottie.json" className="cta-lottie" loop={false} autoplay={false} />
                    </div>
                  </div>
                  <div className="featured_right">
                    <div inject-landscape="featured" className="featured_top">
                      <div className="eyebrow-flex">
                        <div className="block"></div>
                        <div className="c-title-5">Industry News</div>
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
                <div fs-cmssort-element="list" role="list" className="grid cc-collection w-dyn-items">
                  {rest.map((post: any) => (
                  <div key={post._id} role="listitem" className="collection_card w-dyn-item">
                    <Link href={`/news/${post.slug?.current || ''}`} className="card w-inline-block">
                      <div className="aspect-4-3">
                        {post.coverImage?.asset?.url ? (
                          <img alt={post.title || ''} loading="lazy" src={post.coverImage.asset.url} className="img-cover" />
                        ) : (
                          <img alt="" loading="lazy" src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" className="img-cover w-dyn-bind-empty" />
                        )}
                      </div>
                      <div className="card_flex">
                        <div r-indexed="input" className="c-title-5">{post.title}</div>
                        <div r-indexed="author" className="author-hide">{post.author?.name || ''}</div>
                        <div fs-cmssort-field="update-date" fs-cmssort-type="date" className="c-text-6">{post.publishedAt ? new Date(post.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</div>
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
      
    </>
  )
}
