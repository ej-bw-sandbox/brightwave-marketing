import { client } from '@/lib/sanity/client'
import { StepCtaSection } from '@/components/sections/StepCtaSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Solutions | Brightwave',
  description: 'AI-powered research solutions tailored for your firm type.',
}

const query = `*[_type == "firmType"] | order(title asc) { _id, title, slug, tagline }`

export default async function SolutionsIndexPage() {
  let data: any[] = []
  try {
    data = await client.fetch(query, {}, { next: { tags: ['firmType'] } }) ?? []
  } catch {
    data = []
  }

  return (
    <>
      <section className="c-section cc-template">
        <div className="c-container">
          <div className="bp40-underline">
            <h1 className="c-title-1">Solutions</h1>
          </div>
          <div className="hero_text cc-top">
            <p className="c-text-3 u-balance">
              AI-powered research solutions tailored for your firm type.
            </p>
          </div>
          <div className="collection">
            <div className="collection_list-wrap">
              <div className="collection_list">
                <div role="list" className="grid cc-collection w-dyn-items">
                  {data.map((item: any) => (
                    <div key={item._id} role="listitem" className="collection_card w-dyn-item">
                      <Link href={`/solutions/${item.slug?.current || ''}`} className="card w-inline-block">
                        <div className="card_flex">
                          <div className="c-title-5">{item.title}</div>
                          {item.tagline && (
                            <div className="c-text-6">{item.tagline}</div>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {data.length === 0 && (
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
