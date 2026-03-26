import { client } from '@/lib/sanity/client'
import { StepCtaSection } from '@/components/sections/StepCtaSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Changelog | Brightwave',
  description: 'Track the latest updates and improvements to the Brightwave platform.',
}

const query = `*[_type == "contentPost" && category == "release-notes"] | order(publishedAt desc) { _id, title, slug, publishedAt, excerpt, "coverImageUrl": coverImage.asset->url }`

export default async function ChangelogIndexPage() {
  let data: any[] = []
  try {
    data = await client.fetch(query, {}, { next: { tags: ['contentPost'] } }) ?? []
  } catch {
    data = []
  }

  const featured = data[0]
  const rest = data.slice(1)

  return (
    <>
      <section className="c-section cc-template">
        <div className="c-container">
          <div className="bp40-underline">
            <h1 className="c-title-1">Changelog</h1>
          </div>
          <div className="w-dyn-list">
            {featured ? (
              <div role="list" className="w-dyn-items">
                <div role="listitem" className="card_item w-dyn-item">
                  <Link href={`/changelog/${featured.slug?.current || ''}`} className="grid cc-featured w-inline-block">
                    <div className="aspect-16-9 u-overflow-hidden">
                      {featured.coverImageUrl ? (
                        <img src={featured.coverImageUrl} loading="lazy" alt={featured.title || ''} className="img-cover" />
                      ) : (
                        <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="img-cover w-dyn-bind-empty" />
                      )}
                      <div className="featured-svg">
                        <div className="svg w-embed"><svg width={74} height={57} viewBox="0 0 74 57" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M36.8281 3.24967e-06L74 0.0499327L74 57L0.0693104 57L0.0693072 20.2931L36.8281 3.24967e-06Z" fill="#E7E70D"></path>
                          </svg></div>
                      </div>
                    </div>
                    <div className="featured_right">
                      <div className="featured_top">
                        <div className="eyebrow-flex">
                          <div className="block"></div>
                          <div className="c-title-5">Changelog</div>
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
                  {rest.map((item: any) => (
                    <div key={item._id} role="listitem" className="collection_card w-dyn-item">
                      <Link href={`/changelog/${item.slug?.current || ''}`} className="card w-inline-block">
                        <div className="aspect-4-3">
                          {item.coverImageUrl ? (
                            <img alt={item.title || ''} loading="lazy" src={item.coverImageUrl} className="img-cover" />
                          ) : (
                            <img alt="" loading="lazy" src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" className="img-cover w-dyn-bind-empty" />
                          )}
                        </div>
                        <div className="card_flex">
                          <div className="c-title-5">{item.title}</div>
                          <div className="c-text-6">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : ''}</div>
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

      <StepCtaSection />
    </>
  )
}
