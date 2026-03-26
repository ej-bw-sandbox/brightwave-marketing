import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { caseStudyQuery, caseStudySlugsQuery } from '@/lib/sanity/queries/case-studies'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { CtaButton } from '@/components/sections/CtaButton'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(caseStudySlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(caseStudyQuery, { slug }, { next: { tags: ['caseStudy'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.heroDescription || '',
    seo: doc.seo,
    path: '/case-studies/' + slug,
  })
}

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(caseStudyQuery, { slug }, { next: { tags: ['caseStudy'] } })

  if (!doc) notFound()

  const stats = doc.stats ?? []
  const moreCaseStudies = doc.moreCaseStudies ?? []

  return (
    <>
      {/* Hero */}
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="eyebrow cc-no-bp">
            <div className="block cc-primary" />
            <Link href="/case-studies" className="c-title-5">Case Studies</Link>
          </div>
          {doc.firmLogo?.asset && (
            <div className="v-12">
              <Image
                src={urlFor(doc.firmLogo).height(40).quality(90).url()}
                alt={doc.firmName || ''}
                width={120}
                height={40}
                className="img-contain"
              />
            </div>
          )}
          <div className="bp40-underline">
            <h1 className="c-title-1">{doc.title}</h1>
          </div>
          {doc.heroDescription && (
            <div className="hero_text cc-top">
              <p className="c-text-3">{doc.heroDescription}</p>
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

      {/* Stats */}
      {stats.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="grid cc-collection">
              {stats.map((stat: any, i: number) => (
                <div key={i} className="collection_card">
                  <div className="card_flex">
                    <div className="c-title-3">{stat.value}</div>
                    <div className="c-text-4">{stat.label}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Body */}
      {doc.body && (
        <section className="c-section">
          <div className="c-container">
            <div className="prose-brand">
              <PortableText value={doc.body} />
            </div>
          </div>
        </section>
      )}

      {/* More Case Studies */}
      {moreCaseStudies.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="eyebrow cc-no-bp">
              <div className="block cc-primary" />
              <span className="c-title-5">More Case Studies</span>
            </div>
            <div className="grid cc-collection">
              {moreCaseStudies.map((cs: any) => (
                <div key={cs.slug?.current} className="collection_card">
                  <Link href={`/case-studies/${cs.slug?.current}`} className="card w-inline-block">
                    {cs.thumbnail?.asset && (
                      <div className="aspect-4-3">
                        <Image
                          src={urlFor(cs.thumbnail).width(600).height(450).quality(80).url()}
                          alt={cs.title || ''}
                          fill
                          className="img-cover"
                        />
                      </div>
                    )}
                    <div className="card_flex">
                      <div className="c-title-5">{cs.title}</div>
                      {cs.excerpt && <div className="c-text-6">{cs.excerpt}</div>}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="c-section">
        <div className="c-container">
          <div className="v-48">
            <div className="v-12">
              <h2 className="c-title-3">Ready to get started?</h2>
              <p className="c-text-3">
                Schedule a demo and see how Brightwave transforms your research.
              </p>
            </div>
            <div className="buttons">
              <CtaButton label="Schedule a Demo" href="/contact" variant="primary" />
              <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
