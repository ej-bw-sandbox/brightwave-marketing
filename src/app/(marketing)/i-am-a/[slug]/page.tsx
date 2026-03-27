import { client } from '@/lib/sanity/client'
import { icpQuery, icpSlugsQuery } from '@/lib/sanity/queries/icps'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'
import { CtaButton } from '@/components/sections/CtaButton'
import { StepCtaSection } from '@/components/sections/StepCtaSection'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(icpSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(icpQuery, { slug }, { next: { tags: ['icpPage'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.heroTagline || '',
    seo: doc.seo,
    path: '/i-am-a/' + slug,
  })
}

function renderTextField(value: any) {
  if (!value) return null
  if (typeof value === 'string') return <p className="c-text-3">{value}</p>
  if (Array.isArray(value)) return <div className="prose-brand"><PortableText components={ptComponents} value={value} /></div>
  return null
}

export default async function RoleDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(icpQuery, { slug }, { next: { tags: ['icpPage'] } })

  if (!doc) notFound()

  const capabilities = doc.capabilities ?? []
  const workflows = doc.workflows ?? []
  const valuePillars = doc.valuePillars ?? []

  return (
    <>
      {/* Hero */}
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="bp40-underline">
            <h1 className="c-title-1">{doc.h1 || doc.title}</h1>
          </div>
          {doc.heroBody ? (
            <div className="hero_text cc-top">
              {renderTextField(doc.heroBody)}
            </div>
          ) : (
            doc.heroTagline && (
              <div className="hero_text cc-top">
                <p className="c-text-3">{doc.heroTagline}</p>
              </div>
            )
          )}
        </div>
      </section>

      {/* Value pillars */}
      {valuePillars.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            {doc.valueH2 && (
              <div className="eyebrow cc-no-bp">
                <div className="block cc-primary" />
                <span className="c-title-5">{doc.valueH2}</span>
              </div>
            )}
            <div className="grid cc-collection">
              {valuePillars.map((p: any, i: number) => (
                <div key={i} className="collection_card">
                  <div className="card_flex">
                    <div className="c-title-5">{typeof p === 'string' ? p : p.title}</div>
                    {p.body && typeof p.body === 'string' && <div className="c-text-6">{p.body}</div>}
                    {p.body && Array.isArray(p.body) && <div className="prose-brand"><PortableText components={ptComponents} value={p.body} /></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Capabilities */}
      {capabilities.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            {doc.capabilitiesH2 && (
              <div className="eyebrow cc-no-bp">
                <div className="block" />
                <span className="c-title-5">{doc.capabilitiesH2}</span>
              </div>
            )}
            {doc.capabilitiesSubtitle && typeof doc.capabilitiesSubtitle === 'string' && (
              <div className="hero_text cc-top">
                <p className="c-text-3">{doc.capabilitiesSubtitle}</p>
              </div>
            )}
            <div className="grid cc-collection">
              {capabilities.map((c: any, i: number) => (
                <div key={i} className="collection_card">
                  <div className="card_flex">
                    <div className="c-title-5">{typeof c === 'string' ? c : c.title}</div>
                    {c.body && typeof c.body === 'string' && <div className="c-text-6">{c.body}</div>}
                    {c.body && Array.isArray(c.body) && <div className="prose-brand"><PortableText components={ptComponents} value={c.body} /></div>}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Workflows */}
      {workflows.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            {doc.workflowH2 && (
              <div className="eyebrow cc-no-bp">
                <div className="block cc-primary" />
                <span className="c-title-5">{doc.workflowH2}</span>
              </div>
            )}
            <div className="v-48">
              {workflows.map((w: any, i: number) => (
                <div key={i} className="v-12">
                  <div className="c-title-5">{typeof w === 'string' ? w : w.title}</div>
                  {w.body && typeof w.body === 'string' && <div className="c-text-4">{w.body}</div>}
                  {w.body && Array.isArray(w.body) && <div className="prose-brand"><PortableText components={ptComponents} value={w.body} /></div>}
                </div>
              ))}
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
              <h2 className="c-title-3">{doc.ctaH2 || 'Ready to get started?'}</h2>
              {doc.ctaSubheadline && typeof doc.ctaSubheadline === 'string' && (
                <p className="c-text-3">{doc.ctaSubheadline}</p>
              )}
              {doc.ctaBody && Array.isArray(doc.ctaBody) && (
                <div className="prose-brand"><PortableText components={ptComponents} value={doc.ctaBody} /></div>
              )}
            </div>
            <div className="buttons">
              <CtaButton label={doc.ctaButtonLabel || 'Start Free Trial'} href="https://app.brightwave.io/register" variant="primary" />
              <CtaButton label="Get a Demo" href="/contact" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
