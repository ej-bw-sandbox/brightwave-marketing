import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { solutionQuery, solutionSlugsQuery } from '@/lib/sanity/queries/solutions'
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
  const slugs = await client.fetch(solutionSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(solutionQuery, { slug }, { next: { tags: ['firmType'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.h1 || doc.title || '',
    description: doc.seo?.metaDescription || doc.heroH2 || doc.excerpt || '',
    seo: doc.seo,
    path: '/firm-types/' + slug,
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

const grid2x2: React.CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
  gap: '24px',
}

/* ------------------------------------------------------------------ */
/*  SVG icon components                                                */
/* ------------------------------------------------------------------ */

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

function CheckCircleIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
      <polyline points="22 4 12 14.01 9 11.01" />
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

function CapabilityIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}

function ValueIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={YELLOW} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function AlertTriangleIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#e06050" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
      <line x1="12" y1="9" x2="12" y2="13" />
      <line x1="12" y1="17" x2="12.01" y2="17" />
    </svg>
  )
}

function TargetIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <circle cx="12" cy="12" r="6" />
      <circle cx="12" cy="12" r="2" />
    </svg>
  )
}

function LinkIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71" />
      <path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71" />
    </svg>
  )
}

function TrendingUpIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={YELLOW} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="23 6 13.5 15.5 8.5 10.5 1 18" />
      <polyline points="17 6 23 6 23 12" />
    </svg>
  )
}

function ZapIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={YELLOW} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Trust badges data                                                  */
/* ------------------------------------------------------------------ */

const trustBadges = [
  { icon: <ShieldIcon />, label: 'SOC 2 Compliant' },
  { icon: <CheckCircleIcon />, label: 'No Training on Your Data' },
  { icon: <LockIcon />, label: 'End-to-End Encryption' },
  { icon: <FileTextIcon />, label: 'Full Audit Trail' },
]

/* ------------------------------------------------------------------ */
/*  FAQ accordion client component (inline)                            */
/* ------------------------------------------------------------------ */

function FaqItem({ question, answer }: { question: string; answer: any }) {
  return (
    <details style={{
      borderBottom: '1px solid #e5e5e5',
      padding: '20px 0',
    }}>
      <summary style={{
        fontSize: '1.1rem',
        fontWeight: 600,
        cursor: 'pointer',
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
      }}>
        {question}
        <span style={{ fontSize: '1.5rem', fontWeight: 300, marginLeft: '16px', flexShrink: 0 }}>+</span>
      </summary>
      <div style={{ paddingTop: '12px', color: '#555', lineHeight: 1.7 }}>
        <RichText value={answer} />
      </div>
    </details>
  )
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function FirmTypeDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(solutionQuery, { slug }, { next: { tags: ['firmType'] } })

  if (!doc) notFound()

  const capabilities = doc.capabilities ?? []
  const valueCards = doc.valueCards ?? []
  const integrations = doc.integrations ?? []
  const implementationSteps = doc.implementationSteps ?? []
  const differentiators = doc.differentiators ?? []
  const faqs = doc.faqs ?? []

  return (
    <>
      {/* ============================================================ */}
      {/* 1. Hero (DARK)                                               */}
      {/* ============================================================ */}
      <section style={sectionDark}>
        <div className="c-container">
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '48px', alignItems: 'center' }}>
            <div style={{ maxWidth: '620px' }}>
              {doc.eyebrow && (
                <span style={{
                  display: 'inline-block',
                  fontSize: '0.75rem',
                  fontWeight: 700,
                  textTransform: 'uppercase' as const,
                  letterSpacing: '0.1em',
                  color: YELLOW,
                  marginBottom: '16px',
                  border: `1px solid ${YELLOW}`,
                  padding: '4px 12px',
                  borderRadius: '4px',
                }}>
                  {stripHtml(doc.eyebrow)}
                </span>
              )}
              <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
                {doc.h1 || doc.title}
              </h1>
              {doc.heroH2 && (
                <h2 style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '12px', color: 'rgba(255,255,255,0.9)' }}>
                  {stripHtml(doc.heroH2)}
                </h2>
              )}
              {doc.heroH3 && (
                <h3 style={{ fontSize: '1.1rem', fontWeight: 500, marginBottom: '16px', color: YELLOW }}>
                  {stripHtml(doc.heroH3)}
                </h3>
              )}
              <RichText value={doc.heroBody} className="prose-brand" />
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
                <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
                <CtaButton label="Get a Demo" href="/contact" variant="outline" />
              </div>
            </div>
            {doc.heroImage?.asset && (
              <div style={{ position: 'relative', width: '100%', aspectRatio: '16/10', borderRadius: '8px', overflow: 'hidden' }}>
                <Image
                  src={urlFor(doc.heroImage).width(1200).height(750).quality(85).url()}
                  alt={doc.h1 || doc.title || ''}
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
      {/* 2. The Challenge (light)                                     */}
      {/* ============================================================ */}
      {(doc.challengeH2 || doc.operationalPressures || doc.traditionalFailures) && (
        <section style={sectionLight}>
          <div className="c-container">
            {doc.challengeH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                {stripHtml(doc.challengeH2)}
              </h2>
            )}
            {doc.challengeH3 && (
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '48px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto', fontSize: '1.1rem' }}>
                {stripHtml(doc.challengeH3)}
              </p>
            )}
            {!doc.challengeH3 && doc.challengeH2 && <div style={{ marginBottom: '48px' }} />}
            <div style={grid2}>
              {doc.operationalPressures && (
                <div style={cardOnLight}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <AlertTriangleIcon />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Operational Pressures</h3>
                  </div>
                  <div style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    <RichText value={doc.operationalPressures} />
                  </div>
                </div>
              )}
              {doc.traditionalFailures && (
                <div style={cardOnLight}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <AlertTriangleIcon />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Where Traditional Approaches Fail</h3>
                  </div>
                  <div style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    <RichText value={doc.traditionalFailures} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 3. The Solution (dark)                                       */}
      {/* ============================================================ */}
      {(doc.solutionH2 || capabilities.length > 0) && (
        <section style={sectionDark}>
          <div className="c-container">
            {doc.solutionH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                {stripHtml(doc.solutionH2)}
              </h2>
            )}
            {doc.solutionH3 && (
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginBottom: '24px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto', fontSize: '1.1rem' }}>
                {stripHtml(doc.solutionH3)}
              </p>
            )}
            {doc.solutionBody && (
              <div style={{ textAlign: 'center', color: 'rgba(255,255,255,0.8)', marginBottom: '40px', maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto', lineHeight: 1.7 }}>
                <RichText value={doc.solutionBody} />
              </div>
            )}
            {doc.solutionLabel && (
              <p style={{
                fontSize: '0.75rem',
                fontWeight: 700,
                textTransform: 'uppercase' as const,
                letterSpacing: '0.1em',
                color: YELLOW,
                textAlign: 'center',
                marginBottom: '24px',
              }}>
                {stripHtml(doc.solutionLabel)}
              </p>
            )}
            {capabilities.length > 0 && (
              <div style={grid2x2}>
                {capabilities.map((c: any, i: number) => (
                  <div key={i} style={cardOnDark}>
                    <div style={{ marginBottom: '16px' }}>
                      <CapabilityIcon />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>
                      {typeof c === 'string' ? c : stripHtml(c.title || '')}
                    </h3>
                    {c.bullets && (
                      <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        <RichText value={c.bullets} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. Quantified Value (light)                                  */}
      {/* ============================================================ */}
      {(doc.valueH2 || valueCards.length > 0 || doc.valueSummary) && (
        <section style={sectionLight}>
          <div className="c-container">
            {doc.valueH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                {stripHtml(doc.valueH2)}
              </h2>
            )}
            {doc.valueH3 && (
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '48px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto', fontSize: '1.1rem' }}>
                {stripHtml(doc.valueH3)}
              </p>
            )}
            {!doc.valueH3 && doc.valueH2 && <div style={{ marginBottom: '48px' }} />}
            {valueCards.length > 0 && (
              <div style={grid3}>
                {valueCards.map((card: any, i: number) => (
                  <div key={i} style={cardOnLight}>
                    <div style={{ marginBottom: '16px' }}>
                      <ValueIcon />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>
                      {typeof card === 'string' ? card : stripHtml(card.title || '')}
                    </h3>
                    {card.bullets && (
                      <div style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        <RichText value={card.bullets} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
            {/* Value summary strip */}
            {doc.valueSummary && (
              <div style={{
                marginTop: '48px',
                background: DARK_BG,
                color: '#ffffff',
                borderRadius: '8px',
                padding: '32px 40px',
                lineHeight: 1.7,
              }}>
                <RichText value={doc.valueSummary} />
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. Security & Compliance (dark)                              */}
      {/* ============================================================ */}
      {(doc.securityH2 || doc.securityArchitecture || doc.complianceFeatures) && (
        <section style={sectionDark}>
          <div className="c-container">
            {doc.securityH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                {stripHtml(doc.securityH2)}
              </h2>
            )}
            {doc.securityH3 && (
              <p style={{ textAlign: 'center', color: 'rgba(255,255,255,0.7)', marginBottom: '48px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto', fontSize: '1.1rem' }}>
                {stripHtml(doc.securityH3)}
              </p>
            )}
            {!doc.securityH3 && doc.securityH2 && <div style={{ marginBottom: '48px' }} />}
            <div style={grid2}>
              {doc.securityArchitecture && (
                <div style={cardOnDark}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <ShieldIcon />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Security Architecture</h3>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    <RichText value={doc.securityArchitecture} />
                  </div>
                </div>
              )}
              {doc.complianceFeatures && (
                <div style={cardOnDark}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                    <CheckCircleIcon />
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Compliance Features</h3>
                  </div>
                  <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    <RichText value={doc.complianceFeatures} />
                  </div>
                </div>
              )}
            </div>
            {/* Trust badges */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
              justifyContent: 'center',
              marginTop: '48px',
            }}>
              {trustBadges.map((badge, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ flexShrink: 0 }}>{badge.icon}</div>
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: 'rgba(255,255,255,0.8)' }}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. Integration (light)                                       */}
      {/* ============================================================ */}
      {(doc.integrationH2 || integrations.length > 0) && (
        <section style={sectionLight}>
          <div className="c-container">
            {doc.integrationH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                {stripHtml(doc.integrationH2)}
              </h2>
            )}
            {doc.integrationH3 && (
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '48px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto', fontSize: '1.1rem' }}>
                {stripHtml(doc.integrationH3)}
              </p>
            )}
            {!doc.integrationH3 && doc.integrationH2 && <div style={{ marginBottom: '48px' }} />}
            {integrations.length > 0 && (
              <div style={grid2x2}>
                {integrations.map((integ: any, i: number) => (
                  <div key={i} style={cardOnLight}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <LinkIcon />
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>
                        {typeof integ === 'string' ? integ : stripHtml(integ.title || '')}
                      </h3>
                    </div>
                    {integ.bullets && (
                      <div style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.7 }}>
                        <RichText value={integ.bullets} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 7. Proven Results (dark)                                     */}
      {/* ============================================================ */}
      {(doc.resultsQuote || doc.performanceBullets || doc.roiBullets) && (
        <section style={sectionDark}>
          <div className="c-container">
            {/* Testimonial quote */}
            {doc.resultsQuote && (
              <div style={{
                maxWidth: '800px',
                margin: '0 auto 48px',
                padding: '40px',
                borderLeft: `4px solid ${YELLOW}`,
                background: 'rgba(255,255,255,0.03)',
                borderRadius: '0 8px 8px 0',
              }}>
                <blockquote style={{ fontSize: '1.2rem', lineHeight: 1.6, fontStyle: 'italic', color: 'rgba(255,255,255,0.9)', margin: 0 }}>
                  &ldquo;{stripHtml(doc.resultsQuote)}&rdquo;
                </blockquote>
                {doc.resultsAttribution && (
                  <p style={{ marginTop: '16px', fontSize: '0.9rem', color: 'rgba(255,255,255,0.6)', fontStyle: 'normal' }}>
                    &mdash; {stripHtml(doc.resultsAttribution)}
                  </p>
                )}
              </div>
            )}
            {/* Performance + ROI columns */}
            {(doc.performanceBullets || doc.roiBullets) && (
              <div style={grid2}>
                {doc.performanceBullets && (
                  <div style={cardOnDark}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <TrendingUpIcon />
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>Performance</h3>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                      <RichText value={doc.performanceBullets} />
                    </div>
                  </div>
                )}
                {doc.roiBullets && (
                  <div style={cardOnDark}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                      <ZapIcon />
                      <h3 style={{ fontSize: '1.15rem', fontWeight: 600 }}>ROI</h3>
                    </div>
                    <div style={{ color: 'rgba(255,255,255,0.8)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                      <RichText value={doc.roiBullets} />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 8. Implementation Timeline (light)                           */}
      {/* ============================================================ */}
      {(doc.implementationH2 || implementationSteps.length > 0) && (
        <section style={sectionLight}>
          <div className="c-container">
            {doc.implementationH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
                {stripHtml(doc.implementationH2)}
              </h2>
            )}
            {implementationSteps.length > 0 && (
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: '0',
                flexWrap: 'wrap',
                maxWidth: '960px',
                margin: '0 auto',
              }}>
                {implementationSteps.map((step: any, i: number) => (
                  <div key={i} style={{ display: 'contents' }}>
                    {/* Step */}
                    <div style={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                      flex: '1 1 180px',
                      maxWidth: '200px',
                      padding: '0 8px',
                    }}>
                      <div style={{
                        width: '48px',
                        height: '48px',
                        borderRadius: '50%',
                        border: `3px solid ${YELLOW}`,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontSize: '1.1rem',
                        fontWeight: 700,
                        color: DARK_BG,
                        background: '#ffffff',
                        marginBottom: '16px',
                        flexShrink: 0,
                      }}>
                        {i + 1}
                      </div>
                      <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '8px' }}>
                        {typeof step === 'string' ? step : stripHtml(step.title || '')}
                      </h3>
                      {step.description && (
                        <p style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.5 }}>
                          {stripHtml(step.description)}
                        </p>
                      )}
                    </div>
                    {/* Connecting line between steps */}
                    {i < implementationSteps.length - 1 && (
                      <div style={{
                        flex: '0 0 auto',
                        width: '48px',
                        borderTop: `2px dashed #ccc`,
                        marginTop: '24px',
                        alignSelf: 'flex-start',
                      }} />
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 9. Differentiation (dark)                                    */}
      {/* ============================================================ */}
      {(doc.differentiationH2 || differentiators.length > 0) && (
        <section style={sectionDark}>
          <div className="c-container">
            {doc.differentiationH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
                {stripHtml(doc.differentiationH2)}
              </h2>
            )}
            {differentiators.length > 0 && (
              <div style={grid3}>
                {differentiators.map((d: any, i: number) => (
                  <div key={i} style={cardOnDark}>
                    <div style={{ marginBottom: '16px' }}>
                      <TargetIcon />
                    </div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>
                      {typeof d === 'string' ? d : stripHtml(d.title || '')}
                    </h3>
                    {d.body && (
                      <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                        <RichText value={d.body} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 10. CTA (light, yellow top border)                           */}
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
            {doc.ctaSubheadline && (
              <p style={{ fontSize: '1.15rem', color: '#555', marginBottom: '16px' }}>
                {stripHtml(doc.ctaSubheadline)}
              </p>
            )}
            {doc.ctaBody && (
              <div style={{ color: '#555', lineHeight: 1.7, marginBottom: '32px' }}>
                <RichText value={doc.ctaBody} className="prose-brand" />
              </div>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '20px' }}>
              <CtaButton
                label={doc.ctaButtonLabel ? stripHtml(doc.ctaButtonLabel) : 'Start Free Trial'}
                href="https://app.brightwave.io/register"
                variant="primary"
                size="big"
              />
            </div>
            {doc.ctaTagline && (
              <p style={{ fontSize: '0.85rem', color: '#888' }}>
                {stripHtml(doc.ctaTagline)}
              </p>
            )}
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. FAQ (light)                                              */}
      {/* ============================================================ */}
      {faqs.length > 0 && (
        <section style={{ ...sectionLight, borderTop: '1px solid #e5e5e5' }}>
          <div className="c-container">
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
              {doc.faqTitle ? stripHtml(doc.faqTitle) : 'Frequently Asked Questions'}
            </h2>
            <div style={{ maxWidth: '800px', margin: '0 auto' }}>
              {faqs.map((faq: any, i: number) => (
                <FaqItem key={i} question={faq.question || ''} answer={faq.answer} />
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  )
}
