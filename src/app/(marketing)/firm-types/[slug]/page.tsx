import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { solutionQuery, solutionSlugsQuery } from '@/lib/sanity/queries/solutions'
import { PortableText } from '@portabletext/react'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { CtaButton } from '@/components/sections/CtaButton'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(solutionSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(solutionQuery, { slug }, { next: { tags: ['firmType'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || doc.name || '',
    description: doc.seo?.metaDescription || doc.tagline || '',
    seo: doc.seo,
    path: '/firm-types/' + slug,
  })
}

export default async function FirmTypeDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(solutionQuery, { slug }, { next: { tags: ['firmType'] } })

  if (!doc) notFound()

  return (
    <>
      {/* Hero */}
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="bp40-underline">
            <h1 className="c-title-1">{doc.title || doc.name}</h1>
          </div>
          {doc.tagline && (
            <div className="hero_text cc-top">
              <p className="c-text-3">{doc.tagline}</p>
            </div>
          )}
          {doc.heroImage?.asset && (
            <div className="aspect-16-9 u-overflow-hidden">
              <Image
                src={urlFor(doc.heroImage).width(1400).height(788).quality(85).url()}
                alt={doc.title || doc.name || ''}
                fill
                className="img-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      {doc.body && Array.isArray(doc.body) && (
        <section className="c-section">
          <div className="c-container">
            <div className="prose-brand">
              <PortableText value={doc.body} />
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="c-section">
        <div className="c-container">
          <div className="v-48">
            <div className="v-12">
              <h2 className="c-title-3">See Brightwave in action</h2>
              <p className="c-text-3">
                Discover how Brightwave can transform your research workflow.
              </p>
            </div>
            <div className="buttons">
              <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
              <CtaButton label="Get a Demo" href="/contact" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
