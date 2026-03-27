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

export default async function LegalDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(legalQuery, { slug }, { next: { tags: ['legalPage'] } })

  if (!doc) notFound()

  return (
    <section className="c-section cc-legal">
      <div className="c-container">
        <div className="legal_flex">
          <div className="legal_header">
            <h1 className="c-title-2">{doc.title}</h1>
            {doc.effectiveDate && (
              <div className="c-text-4" style={{ marginTop: '1rem', opacity: 0.6 }}>
                Effective: {new Date(doc.effectiveDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
              </div>
            )}
          </div>
          {doc.body && (
            <div className="rich-text w-richtext" style={{ marginTop: '3rem' }}>
              <PortableText value={doc.body} />
            </div>
          )}
          {!doc.body && (
            <div className="c-text-3" style={{ marginTop: '3rem', opacity: 0.5 }}>
              Content coming soon. Please check back later.
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
