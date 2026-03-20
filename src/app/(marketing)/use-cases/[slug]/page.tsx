import { client } from '@/lib/sanity/client'
import { useCaseQuery, useCaseSlugsQuery } from '@/lib/sanity/queries/use-cases'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
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
  if (typeof value === 'string') return <p className={className || 'c-text-3 text-bw-gray-500'}>{value}</p>
  if (Array.isArray(value)) return <div className={className || 'prose-brand'}><PortableText value={value} /></div>
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
            <div className="eyebrow mb-4">
              <div className="block cc-primary" />
              <span className="c-title-5">{doc.eyebrow}</span>
            </div>
          )}
          <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
            <h1 className="c-title-1 text-bw-gray-800">{doc.h1 || doc.title}</h1>
          </div>
          {doc.heroBody && (
            <div className="mt-10">
              <RenderField value={doc.heroBody} className="c-text-3 text-bw-gray-500" />
            </div>
          )}
          {doc.h2Hero && (
            <p className="c-text-1 text-bw-gray-800 mt-10">{doc.h2Hero}</p>
          )}
        </div>
      </section>

      {/* Stats */}
      {stats.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {stats.map((stat: any, i: number) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="c-title-3 text-bw-gray-800">{stat.value}</span>
                  <span className="c-text-4 text-bw-gray-500">{stat.label}</span>
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
            <div className="eyebrow mb-8">
              <div className="block" />
              <span className="c-title-5">{doc.challengeH2 || 'Challenges'}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {challenges.map((c: any, i: number) => (
                <div key={c._key || i} className="border border-bw-gray-200 rounded-lg p-6">
                  {c.title && <h3 className="c-title-5 text-bw-gray-800 mb-2">{c.title}</h3>}
                  {c.bullets && <div className="prose-brand text-sm"><PortableText value={c.bullets} /></div>}
                  {c.body && <RenderField value={c.body} className="c-text-4 text-bw-gray-500 mt-2" />}
                  {typeof c === 'string' && <p className="c-text-4 text-bw-gray-800">{c}</p>}
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
            <div className="eyebrow mb-8">
              <div className="block cc-primary" />
              <span className="c-title-5">{doc.solutionH2 || 'Solutions'}</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {solutions.map((s: any, i: number) => (
                <div key={s._key || i} className="border border-bw-gray-200 rounded-lg p-6">
                  {s.title && <h3 className="c-title-5 text-bw-gray-800 mb-2">{s.title}</h3>}
                  {s.bullets && <div className="prose-brand text-sm"><PortableText value={s.bullets} /></div>}
                  {s.body && Array.isArray(s.body) && <div className="prose-brand text-sm"><PortableText value={s.body} /></div>}
                  {s.body && typeof s.body === 'string' && <p className="c-text-4 text-bw-gray-500 mt-2">{s.body}</p>}
                  {typeof s === 'string' && <p className="c-text-4 text-bw-gray-800">{s}</p>}
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
              <div className="eyebrow mb-8">
                <div className="block cc-primary" />
                <span className="c-title-5">{doc.featuresH2}</span>
              </div>
            )}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {featureHighlights.map((f: any, i: number) => (
                <div key={f._key || i} className="border border-bw-gray-200 rounded-lg p-6">
                  {f.title && <h3 className="c-title-5 text-bw-gray-800 mb-2">{f.title}</h3>}
                  {f.bullets && <div className="prose-brand text-sm"><PortableText value={f.bullets} /></div>}
                  {f.body && Array.isArray(f.body) && <div className="prose-brand text-sm"><PortableText value={f.body} /></div>}
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
              <h2 className="c-title-4 text-bw-gray-800 mb-8">{doc.timelineH2}</h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {doc.beforeSteps && Array.isArray(doc.beforeSteps) && (
                <div>
                  <div className="bg-bw-gray-800 text-white px-5 py-4 rounded-t-lg">
                    <h3 className="c-title-5">Before</h3>
                    {doc.beforeTotal && <p className="c-text-3 mt-2">{doc.beforeTotal}</p>}
                  </div>
                  <div className="border border-bw-gray-200 rounded-b-lg p-6 prose-brand">
                    <PortableText value={doc.beforeSteps} />
                  </div>
                </div>
              )}
              {doc.afterSteps && Array.isArray(doc.afterSteps) && (
                <div>
                  <div className="bg-[#e7e70d] text-bw-gray-800 px-5 py-4 rounded-t-lg">
                    <h3 className="c-title-5">After</h3>
                    {doc.afterTotal && <p className="c-text-3 mt-2">{doc.afterTotal}</p>}
                  </div>
                  <div className="border border-bw-gray-200 rounded-b-lg p-6 prose-brand">
                    <PortableText value={doc.afterSteps} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* Testimonial */}
      {doc.testimonialQuote && (
        <section className="c-section">
          <div className="c-container">
            <div className="bg-black rounded-2xl p-10 text-[#d9d9d9]">
              <div className="flex items-center gap-2 mb-6">
                <div className="w-3 h-3 bg-[#e7e70d] flex-shrink-0" />
                {doc.testimonialAttribution && (
                  <span className="c-title-5 text-[#e7e70d]">{doc.testimonialAttribution}</span>
                )}
              </div>
              <p className="c-title-4">{doc.testimonialQuote}</p>
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="c-section">
        <div className="c-container">
          <div className="flex flex-col gap-5">
            <h2 className="c-title-3 text-bw-gray-800">{doc.ctaHeadline || 'Ready to get started?'}</h2>
            <RenderField value={doc.ctaBody} className="c-text-3 text-bw-gray-500" />
            <div className="flex flex-wrap gap-2.5 mt-5">
              <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
              <CtaButton label="Get a Demo" href="/contact" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
