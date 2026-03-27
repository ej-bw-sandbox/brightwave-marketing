import { client } from '@/lib/sanity/client'
import { solutionQuery, solutionSlugsQuery } from '@/lib/sanity/queries/solutions'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'
import { CtaButton } from '@/components/sections/CtaButton'
import { StepCtaSection } from '@/components/sections/StepCtaSection'
import Link from 'next/link'
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
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.excerpt || '',
    seo: doc.seo,
    path: '/solutions/' + slug,
  })
}

function renderTextField(value: any) {
  if (!value) return null
  if (typeof value === 'string') return <p className="c-text-3">{value}</p>
  if (Array.isArray(value)) return <div className="prose-brand"><PortableText components={ptComponents} value={value} /></div>
  return null
}

export default async function SolutionsDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(solutionQuery, { slug }, { next: { tags: ['firmType'] } })

  if (!doc) notFound()

  const relatedCaseStudies = doc.relatedCaseStudies ?? []
  const relatedUseCases = doc.relatedUseCases ?? []

  return (
    <>
      {/* Hero */}
      <section className="c-section cc-hero">
        <div className="c-container">
          {doc.eyebrow && (
            <div className="eyebrow cc-no-bp">
              <div className="block cc-primary" />
              <span className="c-title-5">{doc.eyebrow}</span>
            </div>
          )}
          <div className="bp40-underline">
            <h1 className="c-title-1">{doc.h1 || doc.title}</h1>
          </div>
          {doc.heroBody ? (
            <div className="hero_text cc-top">
              {renderTextField(doc.heroBody)}
            </div>
          ) : (
            doc.tagline && (
              <div className="hero_text cc-top">
                <p className="c-text-3">{doc.tagline}</p>
              </div>
            )
          )}
          {doc.heroImage?.asset?.url && (
            <div className="aspect-16-9 u-overflow-hidden">
              <img src={doc.heroImage.asset.url} loading="lazy" alt={doc.title || ''} className="img-cover" />
            </div>
          )}
        </div>
      </section>

      {/* Body content */}
      {doc.body && (
        <section className="c-section">
          <div className="c-container">
            <div className="prose-brand">
              {typeof doc.body === 'string' ? (
                <p className="c-text-3">{doc.body}</p>
              ) : Array.isArray(doc.body) ? (
                <PortableText components={ptComponents} value={doc.body} />
              ) : null}
            </div>
          </div>
        </section>
      )}

      {/* Related Use Cases */}
      {relatedUseCases.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="eyebrow cc-no-bp">
              <div className="block cc-primary" />
              <span className="c-title-5">Related Use Cases</span>
            </div>
            <div className="grid cc-collection">
              {relatedUseCases.map((uc: any, i: number) => (
                <div key={i} className="collection_card">
                  <Link href={`/use-cases/${uc.slug?.current || ''}`} className="card w-inline-block">
                    <div className="card_flex">
                      <div className="c-title-5">{uc.title}</div>
                      {uc.excerpt && <div className="c-text-6">{uc.excerpt}</div>}
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Related Case Studies */}
      {relatedCaseStudies.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="eyebrow cc-no-bp">
              <div className="block cc-primary" />
              <span className="c-title-5">Related Case Studies</span>
            </div>
            <div className="grid cc-collection">
              {relatedCaseStudies.map((cs: any, i: number) => (
                <div key={i} className="collection_card">
                  <Link href={`/case-studies/${cs.slug?.current || ''}`} className="card w-inline-block">
                    {cs.thumbnail?.asset?.url && (
                      <div className="aspect-4-3">
                        <img src={cs.thumbnail.asset.url} loading="lazy" alt={cs.title || ''} className="img-cover" />
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
              <h2 className="c-title-3">{doc.ctaH2 || 'Ready to get started?'}</h2>
              {doc.ctaSubheadline && typeof doc.ctaSubheadline === 'string' && (
                <p className="c-text-3">{doc.ctaSubheadline}</p>
              )}
            </div>
            <div className="buttons">
              <CtaButton label="Schedule a Demo" href="/enterprise" variant="primary" />
              <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
