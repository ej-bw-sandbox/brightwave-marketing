import { client } from '@/lib/sanity/client'
import { comparisonQuery, comparisonSlugsQuery } from '@/lib/sanity/queries/comparisons'
import { PortableTextRenderer } from '@/components/sections/PortableTextRenderer'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(comparisonSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(comparisonQuery, { slug }, { next: { tags: ['comparison'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.competitor ? `Brightwave vs ${doc.competitor}` : doc.title || '',
    description: doc.seo?.metaDescription || doc.summary || '',
    seo: doc.seo,
    path: '/comparisons/' + slug,
  })
}

export default async function ComparisonDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(
    comparisonQuery,
    { slug },
    { next: { tags: ['comparison'] } }
  )

  if (!doc) notFound()

  const otherComparisons = doc.otherComparisons ?? []

  return (
    <>
      <section className="c-section cc-comparison-template-hero">
        <div className="c-container">
          <div className="c-comparison-template_hero-wrapper">
            <div className="c-comparison-template_hero-content-wrapper">
              <div className="c-comparison-template_hero-content">
                <div className="c-comparison-template_text-stack">
                  <Link href="/comparisons" className="c-text-6" style={{ textDecoration: 'none' }}>
                    &larr; All Comparisons
                  </Link>
                  <h1 className="c-title-2">
                    {doc.competitor ? `Brightwave vs ${doc.competitor}` : doc.title}
                  </h1>
                  {doc.summary && (
                    <p className="c-text-3">{doc.summary}</p>
                  )}
                </div>
                <div className="c-comparison-template_hero-button-group">
                  <a href="/referral" className="cta-p-sm w-inline-block">
                    <div className="c-text-link cc-stagger-cta">Request a Demo</div>
                    <div className="flip-small"><div className="flip-bg"></div></div>
                  </a>
                </div>
              </div>
              {(doc.competitorLogo?.asset?.url || doc.competitorIcon?.asset?.url) && (
                <div className="c-comparison-template_image-dk">
                  <img
                    src={doc.competitorLogo?.asset?.url || doc.competitorIcon?.asset?.url}
                    alt={doc.competitor || ''}
                    loading="lazy"
                    style={{ maxWidth: '200px', maxHeight: '60px', objectFit: 'contain' }}
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {doc.body && (
        <section className="c-section">
          <div className="c-container">
            <div className="c-comparison-template_rich-list">
              <PortableTextRenderer value={doc.body} />
            </div>
          </div>
        </section>
      )}

      {otherComparisons.length > 0 && (
        <section className="c-section cc-comparison-list">
          <div className="c-container">
            <h2 className="c-title-3" style={{ marginBottom: '2rem' }}>Other Comparisons</h2>
            <div className="c-comparison_main-wrapper w-dyn-list">
              <div role="list" className="c-comparison_main-list w-dyn-items">
                {otherComparisons.map((c: any) => (
                  <div key={c.slug?.current} role="listitem" className="c-comparison_main-item w-dyn-item">
                    <div className="c-comparison-card">
                      <Link href={`/comparisons/${c.slug?.current}`} className="c-link-helper w-inline-block"></Link>
                      <div className="c-comparison-card_image-wrapper">
                        {c.competitorLogo?.asset?.url ? (
                          <img src={c.competitorLogo.asset.url} loading="lazy" alt={c.competitor || ''} className="c-comparison-card_image" />
                        ) : (
                          <img src="https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg" loading="lazy" alt="" className="c-comparison-card_image w-dyn-bind-empty" />
                        )}
                      </div>
                      <div className="c-comparison-card_content-wrapper">
                        <div className="c-comparison-card_tag-wrapper">
                          <div className="c-comparison-card_tag-square"></div>
                          <div className="c-comparison-card-tag">
                            <div className="c-text-6">{c.competitor || ''}</div>
                          </div>
                        </div>
                        <div className="c-comparison-card_title-stack">
                          <h3 className="c-title-5">{c.competitor ? `vs ${c.competitor}` : c.title}</h3>
                          <p className="c-text-5">{c.summary || ''}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
