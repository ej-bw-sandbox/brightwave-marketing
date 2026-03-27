import { client } from '@/lib/sanity/client'
import { legalQuery, legalSlugsQuery } from '@/lib/sanity/queries/legal'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(legalSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(legalQuery, { slug }, { next: { tags: ['legalPage'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || '',
    seo: doc.seo,
    path: '/legal/' + slug,
  })
}

function formatLegalDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
}

export default async function LegalDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(legalQuery, { slug }, { next: { tags: ['legalPage'] } })

  if (!doc) notFound()

  // Split title into words for the stacked legal_titles layout
  const titleWords = (doc.title || '').split(/\s+/)

  return (
    <div className="main">
      <section className="c-section cc-legal">
        <div className="c-container">
          <div className="grid cc-8">
            <div className="legal_flex cc-gap-0">
              <div className="legal_titles">
                {titleWords.map((word: string, i: number) => (
                  <div key={i} className={`legal_title${i > 0 ? ' cc-right' : ''}`}>
                    <div className="c-title-2">{word.toUpperCase()}</div>
                  </div>
                ))}
                {doc.effectiveDate && (
                  <div className="legal_date">
                    <div className="block"></div>
                    <div className="c-title-5">{formatLegalDate(doc.effectiveDate)}</div>
                  </div>
                )}
              </div>
              {doc.body ? (
                <div>
                  <div className="legal-rt w-richtext">
                    <PortableText value={doc.body} />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="legal-rt w-richtext">
                    <p>Content coming soon. Please check back later.</p>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
