import { client } from '@/lib/sanity/client'
import { icpQuery, icpSlugsQuery } from '@/lib/sanity/queries/icps'
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
/*  Trust badge SVG icons                                              */
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
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function RoleDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(icpQuery, { slug }, { next: { tags: ['icpPage'] } })

  if (!doc) notFound()

  const capabilities = doc.capabilities ?? []
  const workflows = doc.workflows ?? []
  const valuePillars = doc.valuePillars ?? []

  return (
    <>
      {/* ============================================================ */}
      {/* 1. Hero (light)                                              */}
      {/* ============================================================ */}
      <section style={sectionLight}>
        <div className="c-container">
          <div style={{ maxWidth: '720px' }}>
            <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
              {doc.h1 || doc.title}
            </h1>
            {doc.heroTagline && (
              <p style={{ fontSize: '1.35rem', fontWeight: 600, marginBottom: '16px', color: '#333' }}>
                {stripHtml(doc.heroTagline)}
              </p>
            )}
            <RichText value={doc.heroBody} className="prose-brand" />
            <div style={{ display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
              <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
              <CtaButton label="Get a Demo" href="/contact" variant="outline" />
            </div>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. Value Proposition (dark)                                   */}
      {/* ============================================================ */}
      {valuePillars.length > 0 && (
        <section style={sectionDark}>
          <div className="c-container">
            {doc.valueH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
                {stripHtml(doc.valueH2)}
              </h2>
            )}
            <div style={grid3}>
              {valuePillars.map((p: any, i: number) => (
                <div key={i} style={cardOnDark}>
                  <div style={{ marginBottom: '16px' }}>
                    <ValueIcon />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '12px' }}>
                    {typeof p === 'string' ? p : stripHtml(p.title || '')}
                  </h3>
                  {p.bullets && (
                    <div style={{ color: 'rgba(255,255,255,0.75)', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <RichText value={p.bullets} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 3. Core Capabilities (light)                                  */}
      {/* ============================================================ */}
      {capabilities.length > 0 && (
        <section style={sectionLight}>
          <div className="c-container">
            {doc.capabilitiesH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px', textAlign: 'center' }}>
                {stripHtml(doc.capabilitiesH2)}
              </h2>
            )}
            {doc.capabilitiesSubtitle && (
              <p style={{ textAlign: 'center', color: '#666', marginBottom: '48px', maxWidth: '640px', marginLeft: 'auto', marginRight: 'auto' }}>
                {stripHtml(doc.capabilitiesSubtitle)}
              </p>
            )}
            {!doc.capabilitiesSubtitle && doc.capabilitiesH2 && (
              <div style={{ marginBottom: '48px' }} />
            )}
            <div style={grid3}>
              {capabilities.map((c: any, i: number) => (
                <div key={i} style={cardOnLight}>
                  <div style={{ marginBottom: '16px' }}>
                    <CapabilityIcon />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>
                    {typeof c === 'string' ? c : stripHtml(c.title || '')}
                  </h3>
                  {c.intro && (
                    <p style={{ color: '#666', fontSize: '0.95rem', marginBottom: '12px' }}>
                      {stripHtml(c.intro)}
                    </p>
                  )}
                  {/* Prefer new features field, fall back to legacy content */}
                  {(c.features || c.content) && (
                    <div style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      <RichText value={c.features || c.content} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. Workflow Transformation (dark)                             */}
      {/* ============================================================ */}
      {workflows.length > 0 && (
        <section style={sectionDark}>
          <div className="c-container">
            {doc.workflowH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
                {stripHtml(doc.workflowH2)}
              </h2>
            )}
            <div style={{ display: 'grid', gap: '24px' }}>
              {workflows.map((w: any, i: number) => (
                <div key={i} style={cardOnDark}>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '20px' }}>
                    {typeof w === 'string' ? w : stripHtml(w.title || '')}
                  </h3>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '24px' }}>
                    {/* Before column */}
                    {w.before && (
                      <div>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase' as const,
                          letterSpacing: '0.08em',
                          color: BEFORE_COLOR,
                          marginBottom: '8px',
                        }}>
                          Before
                        </span>
                        <p style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6, fontSize: '0.95rem' }}>
                          {stripHtml(w.before)}
                        </p>
                      </div>
                    )}
                    {/* After column */}
                    {w.after && (
                      <div>
                        <span style={{
                          display: 'inline-block',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          textTransform: 'uppercase' as const,
                          letterSpacing: '0.08em',
                          color: AFTER_COLOR,
                          marginBottom: '8px',
                        }}>
                          After
                        </span>
                        <p style={{ color: '#ffffff', lineHeight: 1.6, fontSize: '0.95rem' }}>
                          {stripHtml(w.after)}
                        </p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. Success Metrics (light)                                    */}
      {/* ============================================================ */}
      {(doc.metricsH2 || doc.metricsContent) && (
        <section style={sectionLight}>
          <div className="c-container">
            {doc.metricsH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
                {stripHtml(doc.metricsH2)}
              </h2>
            )}
            {doc.metricsContent && (
              <div style={{ ...grid2, maxWidth: '960px', margin: '0 auto' }}>
                <div style={{ fontSize: '1rem', lineHeight: 1.7, color: '#333' }}>
                  <RichText value={doc.metricsContent} className="prose-brand" />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. Security & Compliance (dark)                               */}
      {/* ============================================================ */}
      {(doc.securityH2 || doc.securityContent) && (
        <section style={sectionDark}>
          <div className="c-container">
            {doc.securityH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
                {stripHtml(doc.securityH2)}
              </h2>
            )}
            {doc.securityContent && (
              <div style={{ ...grid2, marginBottom: '48px' }}>
                <div style={{ ...cardOnDark, color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
                  <RichText value={doc.securityContent} className="prose-brand" />
                </div>
              </div>
            )}
            {/* Trust badges */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '32px',
              justifyContent: 'center',
              paddingTop: doc.securityContent ? '0' : '0',
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
      {/* 7. Social Proof + Pricing (light)                             */}
      {/* ============================================================ */}
      {(doc.testimonialQuote || doc.socialContent || doc.pricingContent || doc.purposeBuiltContent) && (
        <section style={sectionLight}>
          <div className="c-container">
            {doc.socialH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
                {stripHtml(doc.socialH2)}
              </h2>
            )}

            {/* Testimonial */}
            {doc.testimonialQuote && (
              <div style={{
                maxWidth: '800px',
                margin: '0 auto 48px',
                padding: '40px',
                borderLeft: `4px solid ${YELLOW}`,
                background: '#fafafa',
                borderRadius: '0 8px 8px 0',
              }}>
                <blockquote style={{ fontSize: '1.2rem', lineHeight: 1.6, fontStyle: 'italic', color: '#333', margin: 0 }}>
                  &ldquo;{stripHtml(doc.testimonialQuote)}&rdquo;
                </blockquote>
                {doc.testimonialAttribution && (
                  <p style={{ marginTop: '16px', fontSize: '0.9rem', color: '#666', fontStyle: 'normal' }}>
                    &mdash; {stripHtml(doc.testimonialAttribution)}
                  </p>
                )}
              </div>
            )}

            {doc.socialContent && (
              <div style={{ marginBottom: '32px', color: '#444', lineHeight: 1.7, textAlign: 'center', maxWidth: '720px', marginLeft: 'auto', marginRight: 'auto' }}>
                <RichText value={doc.socialContent} className="prose-brand" />
              </div>
            )}

            {/* Pricing + Purpose-built cards */}
            {(doc.pricingContent || doc.purposeBuiltContent) && (
              <div style={grid2}>
                {doc.pricingContent && (
                  <div style={cardOnLight}>
                    <RichText value={doc.pricingContent} className="prose-brand" />
                  </div>
                )}
                {doc.purposeBuiltContent && (
                  <div style={cardOnLight}>
                    <RichText value={doc.purposeBuiltContent} className="prose-brand" />
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 8. CTA (light, yellow top border)                             */}
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
    </>
  )
}
