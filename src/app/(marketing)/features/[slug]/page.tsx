import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { featureQuery, featureSlugsQuery } from '@/lib/sanity/queries/features'
import { PortableText } from '@portabletext/react'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { CtaButton } from '@/components/sections/CtaButton'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(featureSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(featureQuery, { slug }, { next: { tags: ['platformFeature'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.heroH1 || '',
    seo: doc.seo,
    path: '/features/' + slug,
  })
}

export default async function FeaturesDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(featureQuery, { slug }, { next: { tags: ['platformFeature'] } })

  if (!doc) notFound()

  const relatedFeatures = doc.relatedFeatures ?? []
  const relatedUseCases = doc.relatedUseCases ?? []

  return (
    <>
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="eyebrow cc-no-bp">
            <div className="block cc-primary" />
            <Link href="/features" className="c-title-5">All Features</Link>
          </div>
          <div className="bp40-underline">
            <h1 className="c-title-1">{doc.title}</h1>
          </div>
          {doc.heroH1 && (
            <div className="hero_text cc-top">
              <p className="c-text-3">{doc.heroH1}</p>
            </div>
          )}
          {doc.heroImage?.asset && (
            <div className="aspect-16-9 u-overflow-hidden">
              <Image
                src={urlFor(doc.heroImage).width(1400).height(788).quality(85).url()}
                alt={doc.title || ''}
                fill
                className="img-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {doc.body && (
        <section className="c-section">
          <div className="c-container">
            <div className="prose-brand">
              <PortableText value={doc.body} />
            </div>
          </div>
        </section>
      )}

      {relatedFeatures.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="eyebrow cc-no-bp">
              <div className="block cc-primary" />
              <span className="c-title-5">Related Features</span>
            </div>
            <div className="grid cc-collection">
              {relatedFeatures.map((f: any) => (
                <div key={f.slug?.current} className="collection_card">
                  <Link href={`/features/${f.slug?.current}`} className="card w-inline-block">
                    <div className="card_flex">
                      <div className="c-title-5">{f.title}</div>
                      {f.heroH1 && <div className="c-text-6">{f.heroH1}</div>}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {relatedUseCases.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="eyebrow cc-no-bp">
              <div className="block cc-primary" />
              <span className="c-title-5">Related Use Cases</span>
            </div>
            <div className="grid cc-collection">
              {relatedUseCases.map((u: any) => (
                <div key={u.slug?.current} className="collection_card">
                  <Link href={`/use-cases/${u.slug?.current}`} className="card w-inline-block">
                    <div className="card_flex">
                      <div className="c-title-5">{u.title}</div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
