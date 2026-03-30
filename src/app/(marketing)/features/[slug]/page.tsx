import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { featureQuery, featureSlugsQuery } from '@/lib/sanity/queries/features'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { CtaButton } from '@/components/sections/CtaButton'
import { FeatureHowItWorks } from '@/components/sections/FeatureHowItWorks'
import { FeatureOutputShowcase } from '@/components/sections/FeatureOutputShowcase'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(featureSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(featureQuery, { slug }, { next: { tags: ['platformFeature'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.heroH1 || '',
    seo: doc.seo,
    path: '/features/' + slug,
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

const eyebrowStyle: React.CSSProperties = {
  fontSize: '0.75rem',
  fontWeight: 700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  marginBottom: '12px',
}

/* ------------------------------------------------------------------ */
/*  SVG Icons                                                          */
/* ------------------------------------------------------------------ */

function PillarIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={BLUE} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
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

function UseCaseIcon() {
  return (
    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke={YELLOW} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function ArrowRightIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <line x1="5" y1="12" x2="19" y2="12" />
      <polyline points="12 5 19 12 12 19" />
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  Trust badges                                                       */
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

export default async function FeaturesDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(featureQuery, { slug }, { next: { tags: ['platformFeature'] } })

  if (!doc) notFound()

  // Resolve fields with legacy fallbacks
  const statBadges = doc.statBadges ?? doc.stats ?? []
  const capPillars = doc.capabilityPillars ?? doc.pillars ?? []
  const howSteps = doc.howItWorksSteps ?? doc.steps ?? []
  const deepDiveRows = doc.deepDiveRows ?? []
  const outputs = doc.outputs ?? []
  const techCaps = doc.technicalCapabilities ?? doc.techCapabilities
  const secComp = doc.securityCompliance ?? doc.securityItems
  const useCaseCards = doc.useCaseCards ?? []
  const relatedFeatures = doc.relatedFeatures ?? []
  const logos = doc.socialProofLogos ?? []
  const ctaHeadline = doc.ctaH2 ?? doc.ctaHeadline

  return (
    <>
      {/* ============================================================ */}
      {/* 1. Hero (DARK)                                               */}
      {/* ============================================================ */}
      <section style={sectionDark}>
        <div className="c-container">
          <div style={grid2}>
            {/* Text column */}
            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
              <span style={{ ...eyebrowStyle, color: YELLOW }}>PLATFORM</span>
              <h1 style={{ fontSize: '3rem', fontWeight: 700, lineHeight: 1.1, marginBottom: '16px', letterSpacing: '-0.02em' }}>
                {doc.title}
              </h1>
              {doc.heroH1 && (
                <p style={{ fontSize: '1.25rem', color: 'rgba(255,255,255,0.75)', marginBottom: '16px', lineHeight: 1.5 }}>
                  {stripHtml(doc.heroH1)}
                </p>
              )}
              <RichText value={doc.heroBody} className="prose-brand" />
              <div style={{ display: 'flex', gap: '12px', marginTop: '32px', flexWrap: 'wrap' }}>
                <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
                <CtaButton label="Get a Demo" href="/contact" variant="outline" />
              </div>
            </div>
            {/* Product visual */}
            {doc.heroImage?.asset && (
              <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                <Image
                  src={urlFor(doc.heroImage).width(700).quality(85).url()}
                  alt={doc.title || ''}
                  width={700}
                  height={doc.heroImage.asset.metadata?.dimensions?.height
                    ? Math.round(700 * doc.heroImage.asset.metadata.dimensions.height / doc.heroImage.asset.metadata.dimensions.width)
                    : 450}
                  style={{ width: '100%', height: 'auto', display: 'block' }}
                  priority
                  {...(doc.heroImage.asset.metadata?.lqip ? { placeholder: 'blur', blurDataURL: doc.heroImage.asset.metadata.lqip } : {})}
                />
              </div>
            )}
          </div>

          {/* Stat badges */}
          {statBadges.length > 0 && (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
              gap: '16px',
              marginTop: '60px',
            }}>
              {statBadges.map((s: any, i: number) => (
                <div key={i} style={{
                  ...cardOnDark,
                  textAlign: 'center',
                  padding: '24px 16px',
                }}>
                  <div style={{ fontSize: '2rem', fontWeight: 700, color: YELLOW, lineHeight: 1 }}>
                    {s.value}
                  </div>
                  <div style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.7)', marginTop: '8px' }}>
                    {s.label}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. Capability Overview (light)                               */}
      {/* ============================================================ */}
      {capPillars.length > 0 && (
        <section style={sectionLight}>
          <div className="c-container">
            <span style={{ ...eyebrowStyle, color: BLUE }}>CAPABILITIES</span>
            {doc.capabilitiesH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px' }}>
                {stripHtml(doc.capabilitiesH2)}
              </h2>
            )}
            {(doc.capabilitiesSubtitle || doc.overviewSubtitle) && (
              <p style={{ color: '#666', marginBottom: '48px', maxWidth: '640px', fontSize: '1.05rem', lineHeight: 1.6 }}>
                {stripHtml(doc.capabilitiesSubtitle || doc.overviewSubtitle)}
              </p>
            )}
            {!doc.capabilitiesSubtitle && !doc.overviewSubtitle && doc.capabilitiesH2 && (
              <div style={{ marginBottom: '48px' }} />
            )}
            <div style={grid3}>
              {capPillars.map((p: any, i: number) => (
                <div key={i} style={cardOnLight}>
                  <div style={{ marginBottom: '16px' }}>
                    <PillarIcon />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>
                    {typeof p === 'string' ? p : stripHtml(p.title || '')}
                  </h3>
                  {p.description && (
                    <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: 1.6 }}>
                      {stripHtml(p.description)}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 3. How It Works (dark) - Client component                    */}
      {/* ============================================================ */}
      {howSteps.length > 0 && (
        <section style={sectionDark}>
          <div className="c-container">
            <span style={{ ...eyebrowStyle, color: YELLOW }}>HOW IT WORKS</span>
            {doc.howItWorksH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '40px' }}>
                {stripHtml(doc.howItWorksH2)}
              </h2>
            )}
            {!doc.howItWorksH2 && <div style={{ marginBottom: '40px' }} />}
            <FeatureHowItWorks steps={howSteps} />
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. Deep Dive (light) - alternating rows                      */}
      {/* ============================================================ */}
      {deepDiveRows.length > 0 && (
        <section style={sectionLight}>
          <div className="c-container">
            <span style={{ ...eyebrowStyle, color: BLUE }}>DEEP DIVE</span>
            {doc.deepDiveH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px' }}>
                {stripHtml(doc.deepDiveH2)}
              </h2>
            )}
            <div style={{ display: 'grid', gap: '64px' }}>
              {deepDiveRows.map((row: any, i: number) => {
                const imageFirst = i % 2 === 0
                return (
                  <div key={i} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
                    gap: '48px',
                    alignItems: 'center',
                  }}>
                    {/* Image */}
                    {imageFirst && row.image?.asset?.url && (
                      <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <Image
                          src={row.image.asset.url}
                          alt={row.title || ''}
                          width={600}
                          height={row.image.asset.metadata?.dimensions?.height
                            ? Math.round(600 * row.image.asset.metadata.dimensions.height / row.image.asset.metadata.dimensions.width)
                            : 400}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </div>
                    )}
                    {/* Text */}
                    <div>
                      {row.title && (
                        <h3 style={{ fontSize: '1.5rem', fontWeight: 700, marginBottom: '16px', lineHeight: 1.3 }}>
                          {stripHtml(row.title)}
                        </h3>
                      )}
                      <RichText value={row.body} className="prose-brand" />
                    </div>
                    {/* Image (right side for odd rows) */}
                    {!imageFirst && row.image?.asset?.url && (
                      <div style={{ borderRadius: '12px', overflow: 'hidden' }}>
                        <Image
                          src={row.image.asset.url}
                          alt={row.title || ''}
                          width={600}
                          height={row.image.asset.metadata?.dimensions?.height
                            ? Math.round(600 * row.image.asset.metadata.dimensions.height / row.image.asset.metadata.dimensions.width)
                            : 400}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </div>
                    )}
                  </div>
                )
              })}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. Output Showcase (dark) - Client component                 */}
      {/* ============================================================ */}
      {outputs.length > 0 && (
        <section style={sectionDark}>
          <div className="c-container">
            <span style={{ ...eyebrowStyle, color: YELLOW }}>SAMPLE OUTPUTS</span>
            {doc.outputH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '12px' }}>
                {stripHtml(doc.outputH2)}
              </h2>
            )}
            {doc.outputSubtitle && (
              <p style={{ color: 'rgba(255,255,255,0.7)', marginBottom: '40px', maxWidth: '640px', fontSize: '1.05rem', lineHeight: 1.6 }}>
                {stripHtml(doc.outputSubtitle)}
              </p>
            )}
            {!doc.outputSubtitle && doc.outputH2 && <div style={{ marginBottom: '40px' }} />}
            <FeatureOutputShowcase outputs={outputs} />
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. Technical Specs + Trust (light)                           */}
      {/* ============================================================ */}
      {(techCaps || secComp || doc.techSpecsH2) && (
        <section style={sectionLight}>
          <div className="c-container">
            {doc.techSpecsH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
                {stripHtml(doc.techSpecsH2)}
              </h2>
            )}
            <div style={grid2}>
              {/* Technical Capabilities */}
              {techCaps && (
                <div style={cardOnLight}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', color: BLUE }}>
                    Technical Capabilities
                  </h3>
                  <div style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    <RichText value={techCaps} className="prose-brand" />
                  </div>
                </div>
              )}
              {/* Security & Compliance */}
              {secComp && (
                <div style={cardOnLight}>
                  <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '20px', color: BLUE }}>
                    Security &amp; Compliance
                  </h3>
                  <div style={{ color: '#444', fontSize: '0.95rem', lineHeight: 1.7 }}>
                    <RichText value={secComp} className="prose-brand" />
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
                  <span style={{ fontSize: '0.9rem', fontWeight: 500, color: '#555' }}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 7. Use Case Cards (dark)                                     */}
      {/* ============================================================ */}
      {useCaseCards.length > 0 && (
        <section style={sectionDark}>
          <div className="c-container">
            {doc.useCasesH2 && (
              <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
                {stripHtml(doc.useCasesH2)}
              </h2>
            )}
            <div style={grid3}>
              {useCaseCards.map((uc: any, i: number) => (
                <div key={i} style={cardOnDark}>
                  <div style={{ marginBottom: '16px' }}>
                    <UseCaseIcon />
                  </div>
                  <h3 style={{ fontSize: '1.25rem', fontWeight: 600, marginBottom: '8px' }}>
                    {stripHtml(uc.title || '')}
                  </h3>
                  {uc.description && (
                    <p style={{ color: 'rgba(255,255,255,0.7)', fontSize: '0.95rem', lineHeight: 1.6, marginBottom: '16px' }}>
                      {stripHtml(uc.description)}
                    </p>
                  )}
                  {uc.outcome && (
                    <div style={{
                      display: 'inline-block',
                      background: 'rgba(255,255,37,0.1)',
                      color: YELLOW,
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      padding: '4px 12px',
                      borderRadius: '4px',
                      marginBottom: '16px',
                    }}>
                      {stripHtml(uc.outcome)}
                    </div>
                  )}
                  {uc.linkUrl && (
                    <div style={{ marginTop: '8px' }}>
                      <Link href={uc.linkUrl} style={{ color: YELLOW, fontSize: '0.9rem', fontWeight: 500, textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
                        Explore <ArrowRightIcon />
                      </Link>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 8. Social Proof (light)                                      */}
      {/* ============================================================ */}
      {(doc.testimonialQuote || logos.length > 0) && (
        <section style={sectionLight}>
          <div className="c-container">
            {doc.testimonialQuote && (
              <div style={{
                maxWidth: '800px',
                margin: '0 auto',
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

            {/* Logo bar */}
            {logos.length > 0 && (
              <div style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '40px',
                justifyContent: 'center',
                alignItems: 'center',
                marginTop: doc.testimonialQuote ? '48px' : '0',
                opacity: 0.6,
              }}>
                {logos.map((logo: any, i: number) => (
                  logo.asset?.url && (
                    <Image
                      key={i}
                      src={logo.asset.url}
                      alt=""
                      width={120}
                      height={40}
                      style={{ height: '32px', width: 'auto', objectFit: 'contain' }}
                    />
                  )
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 9. Related Capabilities (dark)                               */}
      {/* ============================================================ */}
      {relatedFeatures.length > 0 && (
        <section style={sectionDark}>
          <div className="c-container">
            <h2 style={{ fontSize: '2rem', fontWeight: 700, marginBottom: '48px', textAlign: 'center' }}>
              Related Capabilities
            </h2>
            <div style={grid3}>
              {relatedFeatures.map((f: any) => (
                <Link
                  key={f.slug?.current}
                  href={`/features/${f.slug?.current}`}
                  style={{ textDecoration: 'none', color: 'inherit' }}
                >
                  <div style={{ ...cardOnDark, height: '100%', transition: 'border-color 0.2s' }}>
                    {f.heroImage?.asset?.url && (
                      <div style={{ borderRadius: '8px', overflow: 'hidden', marginBottom: '16px' }}>
                        <Image
                          src={f.heroImage.asset.url}
                          alt={f.title || ''}
                          width={400}
                          height={225}
                          style={{ width: '100%', height: 'auto', display: 'block' }}
                        />
                      </div>
                    )}
                    <h3 style={{ fontSize: '1.15rem', fontWeight: 600, marginBottom: '8px' }}>
                      {f.title}
                    </h3>
                    {(f.heroH1 || f.tagline) && (
                      <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                        {stripHtml(f.heroH1 || f.tagline)}
                      </p>
                    )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 10. CTA Footer (light, yellow top border)                    */}
      {/* ============================================================ */}
      <section style={{
        ...sectionLight,
        borderTop: `4px solid ${YELLOW}`,
      }}>
        <div className="c-container">
          <div style={{ maxWidth: '680px', margin: '0 auto', textAlign: 'center' }}>
            <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '12px', letterSpacing: '-0.01em' }}>
              {ctaHeadline ? stripHtml(ctaHeadline) : 'Ready to get started?'}
            </h2>
            {doc.ctaBody && (
              <p style={{ fontSize: '1.05rem', color: '#555', lineHeight: 1.6, marginBottom: '32px' }}>
                {stripHtml(doc.ctaBody)}
              </p>
            )}
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
              <CtaButton
                label={doc.ctaButtonLabel ? stripHtml(doc.ctaButtonLabel) : 'Start Free Trial'}
                href="https://app.brightwave.io/register"
                variant="primary"
                size="big"
              />
              <CtaButton label="Get a Demo" href="/contact" variant="outline" />
            </div>
            {/* Trust indicators */}
            <div style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '24px',
              justifyContent: 'center',
            }}>
              {trustBadges.map((badge, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ flexShrink: 0, opacity: 0.6 }}>{badge.icon}</div>
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>
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
