import { client } from '@/lib/sanity/client'
import { StepCtaSection } from '@/components/sections/StepCtaSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Firm Types | Brightwave',
  description: 'AI-powered research solutions built for your firm type.',
}

const firmTypesQuery = `*[_type == "firmType"] | order(title asc) {
  _id, title, "slug": slug.current, tagline, eyebrow, h1
}`

export default async function FirmTypesPage() {
  let data: any[] = []
  try {
    data = await client.fetch(firmTypesQuery, {}, { next: { tags: ['firmType'] } }) ?? []
  } catch {
    data = []
  }

  return (
    <>
      <section className="c-section cc-template">
        <div className="c-container">
          <div className="bp40-underline">
            <h1 className="c-title-1">Firm Types</h1>
          </div>
          <div className="hero_text cc-top">
            <p className="c-text-3 u-balance">
              AI-powered research solutions tailored to how your firm operates.
            </p>
          </div>
          <div className="collection">
            <div className="collection_list-wrap">
              <div className="collection_list">
                <div role="list" className="grid cc-collection w-dyn-items">
                  {data.map((item: any) => (
                    <div key={item._id} role="listitem" className="collection_card w-dyn-item">
                      <Link href={`/firm-types/${item.slug || ''}`} className="card w-inline-block">
                        <div className="card_flex">
                          <div className="c-title-5">{item.title}</div>
                          {(item.tagline || item.eyebrow) && (
                            <div className="c-text-6">{item.tagline || item.eyebrow}</div>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {data.length === 0 && (
                  <div className="w-dyn-empty">
                    <div>No firm types found.</div>
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
