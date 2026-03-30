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
    description: doc.seo?.metaDescription || doc.heroSubtitle || doc.h2Hero || '',
    seo: doc.seo,
    path: '/use-cases/' + slug,
  })
}

/** Strip HTML tags from strings that may contain raw <p> etc. */
function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}

/** Render a field that could be a string, blockContent array, or null */
function RichText({ value, className }: { value: any; className?: string }) {
  if (!value) return null
  if (typeof value === 'string') {
    const cleaned = stripHtml(value)
    if (!cleaned) return null
    return <p className={className}>{cleaned}</p>
  }
  if (Array.isArray(value)) {
    return (
      <div className={className}>
        <PortableText components={ptComponents} value={value} />
      </div>
    )
  }
  return null
}

/* ------------------------------------------------------------------ */
/*  Inline style constants                                             */
/* ------------------------------------------------------------------ */

const DARK_BG = '#1a1a1a'
const YELLOW = '#ffff25'
const BLUE = '#0E50AA'
const CARD_DARK_BG = 'rgba(255,255,255,0.03)'
const CARD_DARK_BORDER = 'rgba(255,255,255,0.08)'
const BEFORE_COLOR = '#e06050'
const AFTER_COLOR = '#a0d060'

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

const cardOnDark: React.CSSProperties = {
  background: CARD_DARK_BG,
  border: `1px solid ${CARD_DARK_BORDER}`,
  borderRadius: '8px',
  padding: '32px',
}

const cardOnLight: React.CSSProperties = {
  background: '#ffffff',
  border: '1px solid #e5e5e5',
  borderRadius: '8px',
  padding: '32px',
  boxShadow: '0 1px 3px rgba(0,0,0,0.06)',
}

const grid3: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px',
}

const grid2: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
  gap: '24px',
}

/* ------------------------------------------------------------------ */
/*  SVG icons                                                          */
/* ------------------------------------------------------------------ */

function AlertTriangleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={YELLOW} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 001.71 3h16.94a2 2 0 001.71-3L13.71 3.86a2 2 0 00-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function CheckCircleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
    </svg>
  )
}

function ZapIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

function BarChartIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="12" y1="20" x2="12" y2="10" />
      <line x1="18" y1="20" x2="18" y2="4" />
      <line x1="6" y1="20" x2="6" y2="16" />
    </svg>
  )
}

function LayersIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 2 7 12 12 22 7 12 2" />
      <polyline points="2 17 12 22 22 17" />
      <polyline points="2 12 12 17 22 12" />
    </svg>
  )
}

function CpuIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
      <rect x="9" y="9" width="6" height="6" />
      <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
      <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
      <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
      <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function FileTextIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

const trustBadges = [
  { icon: <ShieldIcon />, label: 'SOC 2 Compliant' },
  { icon: <CheckCircleIcon />, label: 'No Training on Your Data' },
  { icon: <LockIcon />, label: 'End-to-End Encryption' },
  { icon: <FileTextIcon />, label: 'Full Audit Trail' },
]

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function UseCaseDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(useCaseQuery, { slug }, { next: { tags: ['useCase'] } })

  if (!doc) notFound()

  const challenges = doc.challenges ?? []
  const solutions = doc.solutions ?? []
  const featureHighlights = doc.featureHighlights ?? []
  const statPills = doc.statPills ?? doc.stats ?? []
  const beforeSteps = doc.beforeSteps ?? []
  const afterSteps = doc.afterSteps ?? []
  const resultMetrics = doc.resultMetrics ?? []
  const specializations = doc.specializations ?? []

  return (
    <>
      {/* ============================================================ */}
      {/* 1. Hero (light)                                              */}
      {/* ============================================================ */}
      <section style={sectionLight}>
        <div className="c-container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '48px' }}>
            <div style={{ maxWidth: '720px' }}>
              {doc.eyebrow && (
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.1em',
                  color: BLUE,
                  marginBottom: '16px',
                  background: 'rgba(14,80,170,0.08)',
                  padding: '6px 14px',
                  borderRadius: '4px',
                }}>
                  {stripHtml(doc.eyebrow)}
                </span>
              )}
              <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
                {doc.h1 || doc.title}
              </h1>
              {(doc.heroSubtitle || doc.h2Hero) && (
                <p style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '16px', color: '#333' }}>
                  {stripHtml(doc.heroSubtitle || doc.h2Hero)}
                </p>
              )}
              <RichText value={doc.heroBody} className="prose-brand" />
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
                <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
                <CtaButton label="Get a Demo" href="/contact" variant="outline" />
              </div>
            </div>

            {doc.heroImage?.asset && (
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '8px', overflow: 'hidden', border: '1px solid #e5e5e5' }}>
                <Image
                  src={urlFor(doc.heroImage).width(1400).height(788).quality(85).url()}
                  alt={doc.title || ''}
                  fill
                  style={{ objectFit: 'cover' }}
                  priority
                />
              </div>
            )}

            {statPills.length > 0 && (
              <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap' }}>
                {statPills.map((pill: any, i: number) => (
                  <div key={i} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '10px',
                    background: '#f5f5f5',
                    border: '1px solid #e5e5e5',
                    borderRadius: '40px',
                    padding: '10px 20px',
                  }}>
                    <span style={{ fontSize: '1.25rem', fontWeight: 700, color: BLUE }}>{pill.value}</span>
                    <span style={{ fontSize: '0.85rem', color: '#666' }}>{pill.label}</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. The Challenge (dark)                                       */}
      {/* ============================================================ */}
      {challenges.length > 0 && (
        <section style={sectionDark}>
          <div className="c-container">
            <span style={{
              display: 'inline-block',
              fontSize: '0.75rem',
              fontWeight: 700,
              textTransform: 'uppercase' as const,
              letterSpacing: '0.1em',
              color: YELLOW,
              marginBottom: '16px',
            }}>
              THE CHALLENGE
            </span>
            {doc.challengeH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px' }}>
                {stripHtml(doc.challengeH2)}
              </h2>
            )}
            {!doc.challengeH2 && <div style={{ marginBottom: '32px' }} />}
            <div style={grid3}>
              {challenges.map((c: any, i: number) => (
                <div key={c._key || i} style={cardOnDark}>
                  <div style={{ marginBottom: '16px' }}>
                    <AlertTriangleIcon />
                  </div>
                  {c.title && (
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>
                      {stripHtml(c.title)}
                    </h3>
                  )}
                  {c.bullets && (
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <RichText value={c.bullets} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 3. The Solution (light) — alternating image/text rows         */}
      {/* ============================================================ */}
      {solutions.length > 0 && (
        <section style={sectionLight}>
          <div className="c-container">
            {doc.solutionH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '64px', textAlign: 'center' }}>
                {stripHtml(doc.solutionH2)}
              </h2>
            )}
            <div style={{ display: 'grid', gap: '72px' }}>
              {solutions.map((s: any, i: number) => {
                const isEven = i % 2 === 1
                return (
                  <div
                    key={s._key || i}
                    style={{
                      display: 'grid',
                      gridTemplateColumns: s.image?.asset ? 'repeat(auto-fit, minmax(340px, 1fr))' : '1fr',
                      gap: '48px',
                      alignItems: 'center',
                    }}
                  >
                    {/* Image — left on odd rows, right on even (order swap) */}
                    {s.image?.asset && (
                      <div style={{
                        position: 'relative',
                        width: '100%',
                        aspectRatio: '4/3',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        border: '1px solid #e5e5e5',
                        order: isEven ? 2 : 1,
                      }}>
                        <Image
                          src={urlFor(s.image).width(800).height(600).quality(85).url()}
                          alt={s.title || ''}
                          fill
                          style={{ objectFit: 'cover' }}
                          loading="lazy"
                        />
                      </div>
                    )}
                    {/* Text */}
                    <div style={{ order: isEven ? 1 : 2 }}>
                      {s.title && (
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 600, marginBottom: '16px' }}>
                          {stripHtml(s.title)}
                        </h3>
                      )}
                      {s.body && (
                        <div style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.7 }}>
                          <RichText value={s.body} className="prose-brand" />
                        </div>
                      )}
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. Before / After Timeline (dark)                             */}
      {/* ============================================================ */}
      {(beforeSteps.length > 0 || afterSteps.length > 0) && (
        <section style={sectionDark}>
          <div className="c-container">
            {doc.timelineH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
                {stripHtml(doc.timelineH2)}
              </h2>
            )}
            <div style={grid2}>
              {/* Before column */}
              {beforeSteps.length > 0 && (
                <div style={{
                  ...cardOnDark,
                  borderColor: 'rgba(224,96,80,0.25)',
                }}>
                  <h3 style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.08em',
                    color: BEFORE_COLOR,
                    marginBottom: '24px',
                  }}>
                    Before
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {beforeSteps.map((step: any, i: number) => (
                      <div key={step._key || i} style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr',
                        gap: '16px',
                        alignItems: 'start',
                        paddingBottom: '16px',
                        borderBottom: i < beforeSteps.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'rgba(255,255,255,0.4)' }}>
                          {step.time}
                        </span>
                        <span style={{ fontSize: '0.95rem', color: 'rgba(255,255,255,0.5)', lineHeight: 1.5 }}>
                          {step.description}
                        </span>
                      </div>
                    ))}
                  </div>
                  {doc.beforeTotal && (
                    <div style={{
                      marginTop: '24px',
                      padding: '16px',
                      background: 'rgba(224,96,80,0.1)',
                      borderRadius: '6px',
                      textAlign: 'center',
                    }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: BEFORE_COLOR }}>
                        {doc.beforeTotal}
                      </span>
                    </div>
                  )}
                </div>
              )}

              {/* After column */}
              {afterSteps.length > 0 && (
                <div style={{
                  ...cardOnDark,
                  borderColor: 'rgba(160,208,96,0.3)',
                  background: 'rgba(160,208,96,0.04)',
                }}>
                  <h3 style={{
                    fontSize: '0.85rem',
                    fontWeight: 700,
                    textTransform: 'uppercase' as const,
                    letterSpacing: '0.08em',
                    color: AFTER_COLOR,
                    marginBottom: '24px',
                  }}>
                    With Brightwave
                  </h3>
                  <div style={{ display: 'grid', gap: '16px' }}>
                    {afterSteps.map((step: any, i: number) => (
                      <div key={step._key || i} style={{
                        display: 'grid',
                        gridTemplateColumns: '80px 1fr',
                        gap: '16px',
                        alignItems: 'start',
                        paddingBottom: '16px',
                        borderBottom: i < afterSteps.length - 1 ? '1px solid rgba(255,255,255,0.06)' : 'none',
                      }}>
                        <span style={{ fontSize: '0.85rem', fontWeight: 600, color: YELLOW }}>
                          {step.time}
                        </span>
                        <span style={{ fontSize: '0.95rem', color: '#ffffff', lineHeight: 1.5 }}>
                          {step.description}
                        </span>
                      </div>
                    ))}
                  </div>
                  {doc.afterTotal && (
                    <div style={{
                      marginTop: '24px',
                      padding: '16px',
                      background: 'rgba(160,208,96,0.12)',
                      borderRadius: '6px',
                      textAlign: 'center',
                    }}>
                      <span style={{ fontSize: '1.1rem', fontWeight: 700, color: AFTER_COLOR }}>
                        {doc.afterTotal}
                      </span>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. Key Features (light)                                       */}
      {/* ============================================================ */}
      {featureHighlights.length > 0 && (
        <section style={sectionLight}>
          <div className="c-container">
            {doc.featuresH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
                {stripHtml(doc.featuresH2)}
              </h2>
            )}
            <div style={grid3}>
              {featureHighlights.map((f: any, i: number) => (
                <div key={f._key || i} style={cardOnLight}>
                  <div style={{ marginBottom: '16px' }}>
                    <ZapIcon />
                  </div>
                  {f.title && (
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>
                      {stripHtml(f.title)}
                    </h3>
                  )}
                  {f.bullets && (
                    <div style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <RichText value={f.bullets} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. Results + Specialization (light)                           */}
      {/* ============================================================ */}
      {(resultMetrics.length > 0 || specializations.length > 0) && (
        <section style={{ ...sectionLight, paddingTop: featureHighlights.length > 0 ? '0' : '100px' }}>
          <div className="c-container">
            {/* Metric counters */}
            {resultMetrics.length > 0 && (
              <>
                {doc.resultsH2 && (
                  <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
                    {stripHtml(doc.resultsH2)}
                  </h2>
                )}
                <div style={grid3}>
                  {resultMetrics.map((m: any, i: number) => (
                    <div key={m._key || i} style={{ textAlign: 'center', padding: '32px' }}>
                      <div style={{ marginBottom: '12px' }}>
                        <BarChartIcon />
                      </div>
                      <div style={{ fontSize: '2.5rem', fontWeight: 700, color: BLUE, lineHeight: 1.1 }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: '1.1rem', fontWeight: 600, marginTop: '8px', color: '#1a1a1a' }}>
                        {m.label}
                      </div>
                      {m.description && (
                        <p style={{ fontSize: '0.9rem', color: '#666', marginTop: '8px' }}>
                          {stripHtml(m.description)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* Industry specializations */}
            {specializations.length > 0 && (
              <div style={{ marginTop: resultMetrics.length > 0 ? '64px' : '0' }}>
                {doc.specializationH2 && (
                  <h2 style={{ fontSize: '1.75rem', fontWeight: 700, marginBottom: '32px', textAlign: 'center' }}>
                    {stripHtml(doc.specializationH2)}
                  </h2>
                )}
                <div style={grid2}>
                  {specializations.map((sp: any, i: number) => (
                    <div key={sp._key || i} style={cardOnLight}>
                      <div style={{ marginBottom: '16px' }}>
                        <LayersIcon />
                      </div>
                      {sp.title && (
                        <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>
                          {stripHtml(sp.title)}
                        </h3>
                      )}
                      {sp.bullets && (
                        <div style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.6 }}>
                          <RichText value={sp.bullets} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 7. Social Proof (dark)                                        */}
      {/* ============================================================ */}
      {(doc.testimonialQuote || doc.technologyBullets || doc.competitiveEdgeBullets) && (
        <section style={sectionDark}>
          <div className="c-container">
            {/* Large testimonial */}
            {doc.testimonialQuote && (
              <div style={{
                maxWidth: '800px',
                margin: '0 auto 48px',
                padding: '40px',
                borderLeft: `4px solid ${YELLOW}`,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '0 8px 8px 0',
              }}>
                <blockquote style={{ fontSize: '1.3rem', lineHeight: 1.6, fontStyle: 'italic', color: '#ffffff', margin: 0 }}>
                  &ldquo;{stripHtml(doc.testimonialQuote)}&rdquo;
                </blockquote>
                {doc.testimonialAttribution && (
                  <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'normal' }}>
                    &mdash; {stripHtml(doc.testimonialAttribution)}
                  </p>
                )}
              </div>
            )}

            {/* Credibility columns */}
            {(doc.technologyBullets || doc.competitiveEdgeBullets) && (
              <div style={grid2}>
                {doc.technologyBullets && (
                  <div style={cardOnDark}>
                    <div style={{ marginBottom: '16px' }}>
                      <CpuIcon />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px' }}>
                      Technology
                    </h3>
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <RichText value={doc.technologyBullets} />
                    </div>
                  </div>
                )}
                {doc.competitiveEdgeBullets && (
                  <div style={cardOnDark}>
                    <div style={{ marginBottom: '16px' }}>
                      <ZapIcon />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '16px' }}>
                      Competitive Edge
                    </h3>
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <RichText value={doc.competitiveEdgeBullets} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 8. CTA Footer (light, yellow top border)                      */}
      {/* ============================================================ */}
      <section style={{
        ...sectionLight,
        borderTop: `4px solid ${YELLOW}`,
      }}>
        <div className="c-container">
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.01em' }}>
              {doc.ctaH2 ? stripHtml(doc.ctaH2) : 'Ready to get started?'}
            </h2>
            {doc.ctaBody && (
              <p style={{ color: '#555', lineHeight: 1.7, marginBottom: '32px' }}>
                {stripHtml(doc.ctaBody)}
              </p>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '20px' }}>
              <CtaButton
                label={doc.ctaPrimaryLabel ? stripHtml(doc.ctaPrimaryLabel) : 'Start Free Trial'}
                href="https://app.brightwave.io/register"
                variant="primary"
              />
              <CtaButton
                label={doc.ctaSecondaryLabel ? stripHtml(doc.ctaSecondaryLabel) : 'Get a Demo'}
                href="/contact"
                variant="outline"
              />
              {doc.ctaTertiaryLabel && (
                <CtaButton
                  label={stripHtml(doc.ctaTertiaryLabel)}
                  href="/enterprise"
                  variant="outline"
                />
              )}
            </div>

            {/* Trust indicators */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              justifyContent: 'center',
              marginTop: '24px',
            }}>
              {trustBadges.map((badge, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <div style={{ flexShrink: 0 }}>{badge.icon}</div>
                  <span style={{ fontSize: '0.85rem', fontWeight: 500, color: '#888' }}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
