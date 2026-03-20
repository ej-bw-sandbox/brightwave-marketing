import { client } from '@/lib/sanity/client'
import { icpQuery, icpSlugsQuery } from '@/lib/sanity/queries/icps'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { CtaButton } from '@/components/sections/CtaButton'
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
  if (typeof value === 'string') return <p className="c-text-3 text-bw-gray-500 mt-10">{value}</p>
  if (Array.isArray(value)) return <div className="prose-brand mt-10"><PortableText value={value} /></div>
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
          <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
            <h1 className="c-title-1 text-bw-gray-800">{doc.h1 || doc.title}</h1>
          </div>
          {doc.heroBody ? renderTextField(doc.heroBody) : (
            doc.heroTagline && <p className="c-text-3 text-bw-gray-500 mt-10">{doc.heroTagline}</p>
          )}
        </div>
      </section>

      {/* Value pillars */}
      {valuePillars.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            {doc.valueH2 && (
              <div className="eyebrow mb-8">
                <div className="block cc-primary" />
                <span className="c-title-5">{doc.valueH2}</span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {valuePillars.map((p: any, i: number) => (
                <div key={i} className="border border-bw-gray-200 rounded-lg p-6">
                  <h3 className="c-title-5 text-bw-gray-800">{typeof p === 'string' ? p : p.title}</h3>
                  {p.body && typeof p.body === 'string' && <p className="c-text-4 text-bw-gray-500 mt-2">{p.body}</p>}
                  {p.body && Array.isArray(p.body) && <div className="prose-brand mt-2"><PortableText value={p.body} /></div>}
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
              <div className="eyebrow mb-8">
                <div className="block" />
                <span className="c-title-5">{doc.capabilitiesH2}</span>
              </div>
            )}
            {doc.capabilitiesSubtitle && typeof doc.capabilitiesSubtitle === 'string' && (
              <p className="c-text-3 text-bw-gray-500 mb-8">{doc.capabilitiesSubtitle}</p>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {capabilities.map((c: any, i: number) => (
                <div key={i} className="border border-bw-gray-200 rounded-lg p-6">
                  <h3 className="c-title-5 text-bw-gray-800">{typeof c === 'string' ? c : c.title}</h3>
                  {c.body && typeof c.body === 'string' && <p className="c-text-4 text-bw-gray-500 mt-2">{c.body}</p>}
                  {c.body && Array.isArray(c.body) && <div className="prose-brand mt-2"><PortableText value={c.body} /></div>}
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
              <div className="eyebrow mb-8">
                <div className="block cc-primary" />
                <span className="c-title-5">{doc.workflowH2}</span>
              </div>
            )}
            <div className="flex flex-col gap-6">
              {workflows.map((w: any, i: number) => (
                <div key={i} className="border-b border-bw-gray-200 pb-6 last:border-b-0">
                  <h3 className="c-title-5 text-bw-gray-800">{typeof w === 'string' ? w : w.title}</h3>
                  {w.body && typeof w.body === 'string' && <p className="c-text-4 text-bw-gray-500 mt-2">{w.body}</p>}
                  {w.body && Array.isArray(w.body) && <div className="prose-brand mt-2"><PortableText value={w.body} /></div>}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {doc.testimonialQuote && (
        <section className="c-section">
          <div className="c-container">
            <div className="bg-black rounded-2xl p-10 text-[#d9d9d9]">
              <p className="c-title-4">&ldquo;{doc.testimonialQuote}&rdquo;</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="c-section">
        <div className="c-container">
          <div className="flex flex-col gap-5">
            <h2 className="c-title-3 text-bw-gray-800">{doc.ctaH2 || 'Ready to get started?'}</h2>
            {doc.ctaSubheadline && typeof doc.ctaSubheadline === 'string' && (
              <p className="c-text-3 text-bw-gray-500">{doc.ctaSubheadline}</p>
            )}
            {doc.ctaBody && Array.isArray(doc.ctaBody) && (
              <div className="prose-brand"><PortableText value={doc.ctaBody} /></div>
            )}
            <div className="flex flex-wrap gap-2.5 mt-5">
              <CtaButton label={doc.ctaButtonLabel || 'Start Free Trial'} href="https://app.brightwave.io/register" variant="primary" />
              <CtaButton label="Get a Demo" href="/contact" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
