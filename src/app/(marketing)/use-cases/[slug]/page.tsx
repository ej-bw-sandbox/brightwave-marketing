import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { useCaseQuery, useCaseSlugsQuery } from '@/lib/sanity/queries/use-cases'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'
import { CtaButton } from '@/components/sections/CtaButton'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(useCaseSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(useCaseQuery, { slug }, { next: { tags: ['useCase'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.h2Hero || '',
    seo: doc.seo,
    path: '/use-cases/' + slug,
  })
}

/* Safely render a field that might be a string or Portable Text array */
function RenderField({ value, className }: { value: any; className?: string }) {
  if (!value) return null
  if (typeof value === 'string') return <p className={className || 'c-text-3'}>{value}</p>
  if (Array.isArray(value)) return <div className={className || 'prose-brand'}><PortableText components={ptComponents} value={value} /></div>
  return null
}

export default async function UsecasesDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(useCaseQuery, { slug }, { next: { tags: ['useCase'] } })

  if (!doc) notFound()

  const challenges = doc.challenges ?? []
  const solutions = doc.solutions ?? []
  const stats = doc.stats ?? []
  const featureHighlights = doc.featureHighlights ?? []

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
          {doc.heroBody && (
            <div className="hero_text cc-top">
              <RenderField value={doc.heroBody} className="c-text-3" />
            </div>
          )}
          {doc.h2Hero && (
            <div className="hero_text cc-top">
              <p className="c-text-1">{doc.h2Hero}</p>
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

      {/* Challenges */}
      {challenges.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="eyebrow cc-no-bp">
              <div className="block" />
              <span className="c-title-5">{doc.challengeH2 || 'Challenges'}</span>
            </div>
            <div className="grid cc-collection">
              {challenges.map((c: any, i: number) => (
                <div key={c._key || i} className="collection_card">
                  <div className="card_flex">
                    {c.title && <div className="c-title-5">{c.title}</div>}
                    {c.bullets && <div className="prose-brand"><PortableText components={ptComponents} value={c.bullets} /></div>}
                    {c.body && <RenderField value={c.body} className="c-text-4" />}
                    {typeof c === 'string' && <div className="c-text-4">{c}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Solutions */}
      {solutions.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="eyebrow cc-no-bp">
              <div className="block cc-primary" />
              <span className="c-title-5">{doc.solutionH2 || 'Solutions'}</span>
            </div>
            <div className="grid cc-collection">
              {solutions.map((s: any, i: number) => (
                <div key={s._key || i} className="collection_card">
                  <div className="card_flex">
                    {s.title && <div className="c-title-5">{s.title}</div>}
                    {s.bullets && <div className="prose-brand"><PortableText components={ptComponents} value={s.bullets} /></div>}
                    {s.body && Array.isArray(s.body) && <div className="prose-brand"><PortableText components={ptComponents} value={s.body} /></div>}
                    {s.body && typeof s.body === 'string' && <div className="c-text-4">{s.body}</div>}
                    {typeof s === 'string' && <div className="c-text-4">{s}</div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Feature Highlights */}
      {featureHighlights.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            {doc.featuresH2 && (
              <div className="eyebrow cc-no-bp">
                <div className="block cc-primary" />
                <span className="c-title-5">{doc.featuresH2}</span>
              </div>
            )}
            <div className="grid cc-collection">
              {featureHighlights.map((f: any, i: number) => (
                <div key={f._key || i} className="collection_card">
                  <div className="card_flex">
                    {f.title && <div className="c-title-5">{f.title}</div>}
                    {f.bullets && <div className="prose-brand"><PortableText components={ptComponents} value={f.bullets} /></div>}
                    {f.body && Array.isArray(f.body) && <div className="prose-brand"><PortableText components={ptComponents} value={f.body} /></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Before/After Timeline */}
      {(doc.beforeSteps || doc.afterSteps) && (
        <section className="c-section">
          <div className="c-container">
            {doc.timelineH2 && (
              <h2 className="c-title-4">{doc.timelineH2}</h2>
            )}
            <div className="grid_2-col">
              {doc.beforeSteps && Array.isArray(doc.beforeSteps) && (
                <div className="v-12">
                  <div className="u-dark-mode" style={{padding: '1.25rem'}}>
                    <h3 className="c-title-5">Before</h3>
                    {doc.beforeTotal && <p className="c-text-3">{doc.beforeTotal}</p>}
                  </div>
                  <div className="v-12">
                    <div className="prose-brand">
                      <PortableText components={ptComponents} value={doc.beforeSteps} />
                    </div>
                  </div>
                </div>
              )}
              {doc.afterSteps && Array.isArray(doc.afterSteps) && (
                <div className="v-12">
                  <div style={{backgroundColor: '#e7e70d', padding: '1.25rem'}}>
                    <h3 className="c-title-5">After</h3>
                    {doc.afterTotal && <p className="c-text-3">{doc.afterTotal}</p>}
                  </div>
                  <div className="v-12">
                    <div className="prose-brand">
                      <PortableText components={ptComponents} value={doc.afterSteps} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {doc.testimonialQuote && (
        <div className="u-dark-mode">
          <section className="c-section">
            <div className="c-container">
              <div className="v-12">
                <div className="eyebrow-flex">
                  <div className="block cc-primary"></div>
                  {doc.testimonialAttribution && (
                    <div className="c-title-5">{doc.testimonialAttribution}</div>
                  )}
                </div>
                <div className="c-title-4">&ldquo;{doc.testimonialQuote}&rdquo;</div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* CTA */}
      <section className="c-section">
        <div className="c-container">
          <div className="v-48">
            <div className="v-12">
              <h2 className="c-title-3">{doc.ctaHeadline || 'Ready to get started?'}</h2>
              <RenderField value={doc.ctaBody} className="c-text-3" />
            </div>
            <div className="buttons">
              <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
              <CtaButton label="Get a Demo" href="/enterprise" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
