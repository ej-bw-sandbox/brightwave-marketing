import { client } from '@/lib/sanity/client'
import { eventQuery, eventSlugsQuery } from '@/lib/sanity/queries/events'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(eventSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(eventQuery, { slug }, { next: { tags: ['virtualEvent'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.excerpt || '',
    seo: doc.seo,
    path: '/events/' + slug,
  })
}

export default async function EventsDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(eventQuery, { slug }, { next: { tags: ['virtualEvent'] } })

  if (!doc) notFound()

  return (
    <>
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="bp40-underline">
            <h1 className="c-title-1">{doc.title}</h1>
          </div>
          {doc.excerpt && (
            <div className="hero_text cc-top">
              <p className="c-text-3">{doc.excerpt}</p>
            </div>
          )}
        </div>
      </section>

      {doc.body && Array.isArray(doc.body) && (
        <section className="c-section">
          <div className="c-container">
            <div className="prose-brand">
              <PortableText components={ptComponents} value={doc.body} />
            </div>
          </div>
        </section>
      )}
    </>
  )
}
