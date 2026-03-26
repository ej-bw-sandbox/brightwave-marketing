import { client } from '@/lib/sanity/client'
import { StepCtaSection } from '@/components/sections/StepCtaSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Use Cases | Brightwave',
  description: 'Discover how Brightwave accelerates research workflows across investment activities.',
}

const useCasesQuery = `*[_type == "useCase"] | order(title asc) {
  _id, title, "slug": slug.current, tagline, eyebrow, excerpt
}`

export default async function UseCasesPage() {
  let data: any[] = []
  try {
    data = await client.fetch(useCasesQuery, {}, { next: { tags: ['useCase'] } }) ?? []
  } catch {
    data = []
  }

  return (
    <>
      <section className="c-section cc-template">
        <div className="c-container">
          <div className="bp40-underline">
            <h1 className="c-title-1">Use Cases</h1>
          </div>
          <div className="hero_text cc-top">
            <p className="c-text-3 u-balance">
              Discover how Brightwave accelerates research workflows across investment activities and market segments.
            </p>
          </div>
          <div className="collection">
            <div className="collection_list-wrap">
              <div className="collection_list">
                <div role="list" className="grid cc-collection w-dyn-items">
                  {data.map((item: any) => (
                    <div key={item._id} role="listitem" className="collection_card w-dyn-item">
                      <Link href={`/use-cases/${item.slug || ''}`} className="card w-inline-block">
                        <div className="card_flex">
                          <div className="c-title-5">{item.title}</div>
                          {(item.tagline || item.excerpt) && (
                            <div className="c-text-6">{item.tagline || item.excerpt}</div>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {data.length === 0 && (
                  <div className="w-dyn-empty">
                    <div>No use cases found.</div>
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
