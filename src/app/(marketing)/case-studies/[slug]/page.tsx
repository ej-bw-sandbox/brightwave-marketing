import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { caseStudyQuery, caseStudySlugsQuery } from '@/lib/sanity/queries/case-studies'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'
import { StepCtaSection } from '@/components/sections/StepCtaSection'
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

/* ------------------------------------------------------------------ */
/*  Inline style constants (same pattern as /i-am-a/[slug])           */
/* ------------------------------------------------------------------ */

const DARK_BG = '#1a1a1a'
const YELLOW = '#ffff25'
const CARD_DARK_BG = 'rgba(255,255,255,0.03)'
const CARD_DARK_BORDER = 'rgba(255,255,255,0.08)'

const sectionLight: React.CSSProperties = {
  background: '#ffffff',
  color: '#1a1a1a',
  padding: '100px 0',
}

const sectionDark: React.CSSProperties = {
  background: DARK_BG,
  color: '#ffffff',
  padding: '100px 0',
}

const sectionHero: React.CSSProperties = {
  background: '#ffffff',
  color: '#1a1a1a',
  paddingTop: '48px',
  paddingBottom: '32px',
}

const sectionStats: React.CSSProperties = {
  background: '#ffffff',
  color: '#1a1a1a',
  paddingTop: '32px',
  paddingBottom: '60px',
}

const cardOnDark: React.CSSProperties = {
  background: CARD_DARK_BG,
  border: `1px solid ${CARD_DARK_BORDER}`,
  borderRadius: '16px',
  padding: '32px',
}

const grid3: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px',
}

/* ------------------------------------------------------------------ */
/*  Stat Box component                                                 */
/* ------------------------------------------------------------------ */

function StatBox({
  context,
  stats,
  variant,
}: {
  context?: string
  stats: { value?: string; label?: string; context?: string }[]
  variant: 'light' | 'dark'
}) {
  if (!stats || stats.length === 0) return null

  const isDark = variant === 'dark'
  const boxStyle: React.CSSProperties = {
    background: isDark ? DARK_BG : '#ffffff',
    color: isDark ? '#ffffff' : '#1a1a1a',
    border: isDark ? `1px solid ${CARD_DARK_BORDER}` : '1px solid #e5e5e5',
    borderRadius: '16px',
    padding: '32px',
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    gap: '48px',
  }

  const tagColor = isDark ? YELLOW : DARK_BG
  const labelColor = isDark ? 'rgba(255,255,255,0.6)' : '#666'

  return (
    <div style={boxStyle}>
      {context && (
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <div
            style={{
              width: '12px',
              height: '12px',
              backgroundColor: tagColor,
              flexShrink: 0,
            }}
          />
          <span style={{ fontSize: '0.875rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.04em' }}>
            {context}
          </span>
        </div>
      )}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '16px 40px',
          justifyContent: 'space-between',
        }}
      >
        {stats.map((stat, i) => (
          <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: '24px', flex: 1, minWidth: '200px' }}>
            {stat.value && (
              <div style={{ fontSize: '3.5rem', fontWeight: 500, lineHeight: 1.1, letterSpacing: '-0.02em' }}>
                {stat.value}
              </div>
            )}
            {stat.label && (
              <div style={{ fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.35 }}>
                {stat.label}
              </div>
            )}
            {stat.context && (
              <div style={{ fontSize: '0.95rem', color: labelColor, lineHeight: 1.5 }}>
                {stat.context}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function CaseStudyDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(caseStudyQuery, { slug }, { next: { tags: ['caseStudy'] } })

  if (!doc) notFound()

  const statsLightItems = doc.statsLight?.stats ?? []
  const statsDarkItems = doc.statsDark?.stats ?? []
  const hasStats = statsLightItems.length > 0 || statsDarkItems.length > 0
  const pullQuotes = doc.pullQuotes ?? []
  const moreCaseStudies = doc.moreCaseStudies ?? []

  const formattedDate = doc.publishedAt
    ? new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(doc.publishedAt))
    : null

  return (
    <>
      {/* ============================================================ */}
      {/* 1. Hero                                                       */}
      {/* ============================================================ */}
      <section style={sectionHero}>
        <div className="c-container">
          {/* Back link */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '48px' }}>
            <Link
              href="/case-studies"
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '8px',
                textDecoration: 'none',
                color: '#1a1a1a',
              }}
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <polyline points="15 18 9 12 15 6" />
              </svg>
              <span style={{ fontSize: '0.875rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
                Case Studies
              </span>
            </Link>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '80px' }}>
            {/* Title + meta block */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {/* Category tag */}
              {(doc.category?.title || doc.industry) && (
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
                  {doc.category?.title && (
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#666',
                      }}
                    >
                      {doc.category.title}
                    </span>
                  )}
                  {doc.category?.title && doc.industry && (
                    <span style={{ color: '#ccc' }}>/</span>
                  )}
                  {doc.industry && (
                    <span
                      style={{
                        fontSize: '0.8125rem',
                        fontWeight: 600,
                        textTransform: 'uppercase',
                        letterSpacing: '0.06em',
                        color: '#666',
                      }}
                    >
                      {doc.industry}
                    </span>
                  )}
                </div>
              )}

              {/* Company logo */}
              {doc.companyLogo?.asset && (
                <div style={{ marginTop: '8px', marginBottom: '8px' }}>
                  <Image
                    src={urlFor(doc.companyLogo).height(48).quality(90).url()}
                    alt={doc.title || ''}
                    width={140}
                    height={48}
                    style={{ objectFit: 'contain', objectPosition: 'left' }}
                  />
                </div>
              )}

              {/* Title */}
              <h1
                style={{
                  fontSize: '3.5rem',
                  fontWeight: 500,
                  lineHeight: 1.1,
                  letterSpacing: '-0.02em',
                  maxWidth: '62.8125rem',
                  margin: 0,
                }}
              >
                {doc.title}
              </h1>

              {/* Description + meta row */}
              {(doc.heroDescription || formattedDate || doc.firmSize) && (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginTop: '8px' }}>
                  {doc.heroDescription && (
                    <p
                      style={{
                        fontSize: '1.125rem',
                        lineHeight: 1.55,
                        color: '#444',
                        maxWidth: '680px',
                        margin: 0,
                      }}
                    >
                      {doc.heroDescription}
                    </p>
                  )}
                  {(formattedDate || doc.firmSize) && (
                    <div style={{ display: 'flex', gap: '24px', flexWrap: 'wrap', alignItems: 'center' }}>
                      {formattedDate && (
                        <span style={{ fontSize: '0.875rem', color: '#999' }}>{formattedDate}</span>
                      )}
                      {doc.firmSize && (
                        <span style={{ fontSize: '0.875rem', color: '#999' }}>AUM: {doc.firmSize}</span>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Hero image */}
            {doc.heroImage?.asset && (
              <div
                style={{
                  position: 'relative',
                  width: '100%',
                  aspectRatio: '16 / 9',
                  borderRadius: '4px',
                  overflow: 'hidden',
                }}
              >
                <Image
                  src={urlFor(doc.heroImage).width(1400).height(788).quality(85).url()}
                  alt={doc.title || ''}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. Stats Section                                              */}
      {/* ============================================================ */}
      {hasStats && (
        <section style={sectionStats}>
          <div className="c-container">
            <div
              style={{
                display: 'flex',
                gap: '20px',
                flexWrap: 'wrap',
              }}
            >
              {statsLightItems.length > 0 && (
                <StatBox
                  context={doc.statsLight?.context}
                  stats={statsLightItems}
                  variant="light"
                />
              )}
              {statsDarkItems.length > 0 && (
                <StatBox
                  context={doc.statsDark?.context}
                  stats={statsDarkItems}
                  variant="dark"
                />
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 3. Body Content                                               */}
      {/* ============================================================ */}
      {doc.body && (
        <section style={{ ...sectionLight, paddingTop: '80px', paddingBottom: '80px' }}>
          <div className="c-container">
            <div className="c-cs-template_content" style={{ maxWidth: '800px' }}>
              <PortableText components={ptComponents} value={doc.body} />
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. Testimonial / Pull Quotes (dark)                           */}
      {/* ============================================================ */}
      {(pullQuotes.length > 0 || doc.testimonialQuote) && (
        <section style={sectionDark}>
          <div className="c-container">
            {/* Inline testimonial */}
            {doc.testimonialQuote && (
              <div
                style={{
                  maxWidth: '800px',
                  margin: pullQuotes.length > 0 ? '0 auto 64px' : '0 auto',
                }}
              >
                <blockquote
                  style={{
                    fontSize: '1.875rem',
                    fontWeight: 500,
                    lineHeight: 1.3,
                    margin: 0,
                    padding: 0,
                    border: 'none',
                    color: '#ffffff',
                  }}
                >
                  &ldquo;{doc.testimonialQuote}&rdquo;
                </blockquote>
                {doc.testimonialAttribution && (
                  <p style={{ marginTop: '24px', fontSize: '0.95rem', color: 'rgba(255,255,255,0.6)' }}>
                    &mdash; {doc.testimonialAttribution}
                  </p>
                )}
              </div>
            )}

            {/* Referenced pull quotes */}
            {pullQuotes.length > 0 && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '48px' }}>
                {pullQuotes.map((q: any, i: number) => (
                  <div key={i} style={{ ...cardOnDark, maxWidth: '800px', margin: '0 auto', width: '100%' }}>
                    <blockquote
                      style={{
                        fontSize: '1.5rem',
                        fontWeight: 500,
                        lineHeight: 1.35,
                        margin: 0,
                        color: '#ffffff',
                      }}
                    >
                      &ldquo;{q.quote}&rdquo;
                    </blockquote>
                    <div style={{ marginTop: '24px', display: 'flex', alignItems: 'center', gap: '16px' }}>
                      {q.authorImage?.asset && (
                        <Image
                          src={urlFor(q.authorImage).width(48).height(48).quality(85).url()}
                          alt={q.authorName || ''}
                          width={48}
                          height={48}
                          style={{ borderRadius: '50%', objectFit: 'cover' }}
                        />
                      )}
                      <div>
                        {q.authorName && (
                          <div style={{ fontSize: '0.95rem', fontWeight: 600, color: '#ffffff' }}>
                            {q.authorName}
                          </div>
                        )}
                        {(q.authorTitle || q.company || q.attribution) && (
                          <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', marginTop: '2px' }}>
                            {q.authorTitle && q.company
                              ? `${q.authorTitle}, ${q.company}`
                              : q.attribution || q.authorTitle || q.company}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. Related Use Cases / Features (light)                       */}
      {/* ============================================================ */}
      {((doc.relatedUseCases && doc.relatedUseCases.length > 0) ||
        (doc.relatedFeatures && doc.relatedFeatures.length > 0)) && (
        <section style={sectionLight}>
          <div className="c-container">
            {/* Related use cases */}
            {doc.relatedUseCases && doc.relatedUseCases.length > 0 && (
              <div style={{ marginBottom: doc.relatedFeatures?.length > 0 ? '64px' : '0' }}>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '32px' }}>Related Use Cases</h2>
                <div style={grid3}>
                  {doc.relatedUseCases.map((uc: any) => (
                    <Link
                      key={uc.slug}
                      href={`/use-cases/${uc.slug}`}
                      style={{
                        background: '#ffffff',
                        border: '1px solid #e5e5e5',
                        borderRadius: '8px',
                        padding: '32px',
                        textDecoration: 'none',
                        color: '#1a1a1a',
                        display: 'block',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
                      }}
                    >
                      <div style={{ fontSize: '1.125rem', fontWeight: 600, marginBottom: '8px' }}>{uc.title}</div>
                      {uc.excerpt && (
                        <div style={{ fontSize: '0.95rem', color: '#666', lineHeight: 1.5 }}>{uc.excerpt}</div>
                      )}
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Related features */}
            {doc.relatedFeatures && doc.relatedFeatures.length > 0 && (
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '32px' }}>Related Features</h2>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                  {doc.relatedFeatures.map((f: any) => (
                    <Link
                      key={f.slug}
                      href={`/features/${f.slug}`}
                      style={{
                        background: '#f5f5f5',
                        borderRadius: '8px',
                        padding: '12px 20px',
                        textDecoration: 'none',
                        color: '#1a1a1a',
                        fontSize: '0.95rem',
                        fontWeight: 500,
                      }}
                    >
                      {f.title}
                    </Link>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. More Case Studies (dark)                                   */}
      {/* ============================================================ */}
      {moreCaseStudies.length > 0 && (
        <div className="u-dark-mode">
          <section style={{ ...sectionDark, paddingTop: '80px', paddingBottom: '80px' }}>
            <div className="c-container">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '48px' }}>
                <h2 style={{ fontSize: '2rem', fontWeight: 500, margin: 0 }}>More Case Studies</h2>
                <Link
                  href="/case-studies"
                  className="cta-p-sm cc-stroke w-inline-block"
                >
                  <div>
                    <div className="c-text-link cc-stagger-cta">View All</div>
                  </div>
                  <div className="flip-small">
                    <div className="flip-bg" />
                  </div>
                  <div className="flip-big">
                    <div className="svg cta-sm-arrow w-embed">
                      <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <g clipPath="url(#clip0_cs_more)">
                          <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                          <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                        </g>
                        <defs>
                          <clipPath id="clip0_cs_more">
                            <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)" />
                          </clipPath>
                        </defs>
                      </svg>
                    </div>
                  </div>
                </Link>
              </div>
              <div style={grid3}>
                {moreCaseStudies.map((cs: any) => (
                  <Link
                    key={cs.slug}
                    href={`/case-studies/${cs.slug}`}
                    style={{
                      textDecoration: 'none',
                      color: '#ffffff',
                      display: 'block',
                      borderRadius: '8px',
                      overflow: 'hidden',
                      border: `1px solid ${CARD_DARK_BORDER}`,
                      background: CARD_DARK_BG,
                    }}
                  >
                    {cs.thumbnail?.asset && (
                      <div
                        style={{
                          position: 'relative',
                          width: '100%',
                          aspectRatio: '4 / 3',
                          overflow: 'hidden',
                        }}
                      >
                        <Image
                          src={urlFor(cs.thumbnail).width(600).height(450).quality(80).url()}
                          alt={cs.title || ''}
                          fill
                          style={{ objectFit: 'cover' }}
                        />
                      </div>
                    )}
                    <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {cs.category?.title && (
                        <span
                          style={{
                            fontSize: '0.75rem',
                            fontWeight: 600,
                            textTransform: 'uppercase',
                            letterSpacing: '0.06em',
                            color: 'rgba(255,255,255,0.5)',
                          }}
                        >
                          {cs.category.title}
                        </span>
                      )}
                      <div style={{ fontSize: '1.125rem', fontWeight: 500, lineHeight: 1.3 }}>{cs.title}</div>
                      {cs.excerpt && (
                        <div style={{ fontSize: '0.875rem', color: 'rgba(255,255,255,0.6)', lineHeight: 1.5 }}>
                          {cs.excerpt}
                        </div>
                      )}
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ============================================================ */}
      {/* 7. CTA Section                                                */}
      {/* ============================================================ */}
      <StepCtaSection />
    </>
  )
}
