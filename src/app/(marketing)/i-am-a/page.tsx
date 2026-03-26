import { client } from '@/lib/sanity/client'
import { StepCtaSection } from '@/components/sections/StepCtaSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Roles | Brightwave',
  description: 'Brightwave is built for financial professionals across every role.',
}

const icpQuery = `*[_type == "icpPage"] | order(title asc) {
  _id, title, "slug": slug.current, tagline, heroTagline, h1
}`

export default async function RolesPage() {
  let data: any[] = []
  try {
    data = await client.fetch(icpQuery, {}, { next: { tags: ['icpPage'] } }) ?? []
  } catch {
    data = []
  }

  return (
    <>
      <section className="c-section cc-template">
        <div className="c-container">
          <div className="bp40-underline">
            <h1 className="c-title-1">Built for your role</h1>
          </div>
          <div className="hero_text cc-top">
            <p className="c-text-3 u-balance">
              Brightwave is designed for financial professionals across every role and level.
            </p>
          </div>
          <div className="collection">
            <div className="collection_list-wrap">
              <div className="collection_list">
                <div role="list" className="grid cc-collection w-dyn-items">
                  {data.map((item: any) => (
                    <div key={item._id} role="listitem" className="collection_card w-dyn-item">
                      <Link href={`/i-am-a/${item.slug || ''}`} className="card w-inline-block">
                        <div className="card_flex">
                          <div className="c-title-5">{item.title}</div>
                          {(item.tagline || item.heroTagline) && (
                            <div className="c-text-6">{item.tagline || item.heroTagline}</div>
                          )}
                        </div>
                      </Link>
                    </div>
                  ))}
                </div>
                {data.length === 0 && (
                  <div className="w-dyn-empty">
                    <div>No roles found.</div>
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
