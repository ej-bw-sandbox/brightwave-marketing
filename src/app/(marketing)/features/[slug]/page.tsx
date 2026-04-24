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
import { LottiePlayer } from '@/components/ui/LottiePlayer'
import { TestimonialSlider } from '@/components/ui/TestimonialSlider'
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

function stripHtml(str: string): string {
  return str.replace(/<[^>]*>/g, '').trim()
}

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

export default async function FeaturesDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(featureQuery, { slug }, { next: { tags: ['platformFeature'] } })

  if (!doc) notFound()

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
    <div className="main">
      {/* ============================================================ */}
      {/* 1. HERO                                                      */}
      {/* ============================================================ */}
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="feature-hero-grid">
            {/* LEFT: Content */}
            <div className="feature-hero-content">
              {/* Eyebrow */}
              <div className="eyebrow cc-no-bp">
                <div className="block cc-primary" />
                <div className="c-title-5">Platform</div>
              </div>

              {/* Hero headline */}
              <div className="bp40-underline">
                <h1 className="c-title-3">{doc.title}</h1>
              </div>

              {/* Subtitle + CTAs */}
              <div className="text-cta" style={{ marginTop: '2rem' }}>
                {doc.heroH1 && (
                  <div className="c-text-3 u-balance">{stripHtml(doc.heroH1)}</div>
                )}
                <RichText value={doc.heroBody} className="c-text-4" />
                <div className="h-20 cc-hero" style={{ marginTop: '1.5rem' }}>
                  <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
                  <CtaButton label="Get a Demo" href="/contact" variant="outline" />
                </div>
              </div>
            </div>

            {/* RIGHT: Hero image (above the fold) */}
            {doc.heroImage?.asset && (
              <div className="feature-hero-media">
                <div
                  className="aspect-16-9"
                  style={{ borderRadius: '0.75rem', overflow: 'hidden' }}
                >
                  <Image
                    src={urlFor(doc.heroImage).width(1400).quality(85).url()}
                    alt={doc.title || ''}
                    width={1400}
                    height={doc.heroImage.asset.metadata?.dimensions?.height
                      ? Math.round(1400 * doc.heroImage.asset.metadata.dimensions.height / doc.heroImage.asset.metadata.dimensions.width)
                      : 788}
                    style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block', position: 'absolute', top: 0, left: 0 }}
                    priority
                    {...(doc.heroImage.asset.metadata?.lqip ? { placeholder: 'blur', blurDataURL: doc.heroImage.asset.metadata.lqip } : {})}
                  />
                </div>
              </div>
            )}
          </div>

          {/* Stat badges (full-width below split) */}
          {statBadges.length > 0 && (
            <div className="v-20" style={{ marginTop: '3rem' }}>
              <div className="partner-proof_points col-3">
                {statBadges.map((s: any, i: number) => (
                  <div key={i} className="partner-proof_point">
                    <h3 className="c-title-4">{s.value}</h3>
                    <div className="c-text-4">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. CAPABILITIES OVERVIEW - Numbered card grid                */}
      {/* ============================================================ */}
      {capPillars.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="v-40">
              {/* Header */}
              <div className="v-20">
                <div className="eyebrow cc-no-bp blue">
                  <div className="block blue" />
                  <div className="c-title-5">Capabilities</div>
                </div>
                {doc.capabilitiesH2 && (
                  <h2 className="c-title-4">{stripHtml(doc.capabilitiesH2)}</h2>
                )}
                {(doc.capabilitiesSubtitle || doc.overviewSubtitle) && (
                  <p className="c-text-4" style={{ maxWidth: '48rem' }}>
                    {stripHtml(doc.capabilitiesSubtitle || doc.overviewSubtitle)}
                  </p>
                )}
              </div>

              {/* Capability cards with numbered indicators */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 18rem), 1fr))',
                  gap: '1.25rem',
                }}
              >
                {capPillars.map((p: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      background: 'var(--lightmode--surface-1, #0f0f0f)',
                      border: '1px solid var(--lightmode--onsurface-border, rgba(255,255,255,0.08))',
                      borderRadius: '1rem',
                      padding: '2rem',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '1.5rem',
                      transition: 'border-color 0.3s',
                    }}
                  >
                    {/* Numbered header with separator */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: '1.25rem', borderBottom: '1px solid var(--lightmode--onsurface-border, rgba(255,255,255,0.08))' }}>
                      <span style={{ color: '#000', fontFamily: 'monospace', fontWeight: 500, fontSize: '0.875rem', letterSpacing: '0.1em' }}>
                        {String(i + 1).padStart(2, '0')}
                      </span>
                    </div>
                    <div className="v-12">
                      <div className="c-title-5">
                        {typeof p === 'string' ? p : stripHtml(p.title || '')}
                      </div>
                      {p.description && (
                        <div className="c-text-5" style={{ opacity: 0.6 }}>{stripHtml(p.description)}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 3. HOW IT WORKS                                              */}
      {/* ============================================================ */}
      {howSteps.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="v-40">
              <div>
                <div className="eyebrow cc-no-bp">
                  <div className="block cc-primary" />
                  <div className="c-title-5">How It Works</div>
                </div>
              </div>
              {doc.howItWorksH2 && (
                <h2 className="c-title-4">{stripHtml(doc.howItWorksH2)}</h2>
              )}
              <FeatureHowItWorks steps={howSteps} />
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. DEEP DIVE - Sticky sidebar + scrolling feature list       */}
      {/* ============================================================ */}
      {deepDiveRows.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div
              style={{
                display: 'flex',
                flexDirection: 'row',
                gap: '4rem',
                alignItems: 'flex-start',
              }}
              className="deep-dive-layout"
            >
              {/* Sticky left column */}
              <div style={{ width: '35%', flexShrink: 0, position: 'sticky', top: '8rem' }}>
                <div className="v-20">
                  <div className="eyebrow cc-no-bp blue">
                    <div className="block blue" />
                    <div className="c-title-5">Deep Dive</div>
                  </div>
                  {doc.deepDiveH2 && (
                    <h2 className="c-title-4">{stripHtml(doc.deepDiveH2)}</h2>
                  )}
                  <div style={{ marginTop: '1rem' }}>
                    <CtaButton label="See How It Works" href="#" variant="primary" />
                  </div>
                </div>
              </div>

              {/* Scrolling right column - feature list */}
              <div style={{ flex: 1 }}>
                {deepDiveRows.map((row: any, i: number) => (
                  <div
                    key={i}
                    style={{
                      borderTop: i > 0 ? '1px solid var(--lightmode--onsurface-border, rgba(255,255,255,0.12))' : 'none',
                      paddingTop: i > 0 ? '3rem' : '0',
                      paddingBottom: '3rem',
                    }}
                  >
                    {/* Image if available */}
                    {row.image?.asset?.url && (
                      <div style={{ borderRadius: '0.75rem', overflow: 'hidden', marginBottom: '1.5rem' }}>
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
                    {row.title && (
                      <h3 className="c-title-5" style={{ marginBottom: '1rem' }}>
                        {stripHtml(row.title)}
                      </h3>
                    )}
                    <RichText value={row.body} className="c-text-4" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. OUTPUT SHOWCASE                                           */}
      {/* ============================================================ */}
      {outputs.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="v-40">
              <div>
                <div className="eyebrow cc-no-bp">
                  <div className="block cc-primary" />
                  <div className="c-title-5">Sample Outputs</div>
                </div>
              </div>
              {doc.outputH2 && (
                <h2 className="c-title-4">{stripHtml(doc.outputH2)}</h2>
              )}
              {doc.outputSubtitle && (
                <p className="c-text-4" style={{ maxWidth: '40rem' }}>
                  {stripHtml(doc.outputSubtitle)}
                </p>
              )}
              <FeatureOutputShowcase outputs={outputs} />
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. TECHNICAL SPECS - Key-value card layout                   */}
      {/* ============================================================ */}
      {(techCaps || secComp || doc.techSpecsH2) && (
        <section className="c-section">
          <div className="c-container">
            <div className="v-48">
              {doc.techSpecsH2 && (
                <h2 className="c-title-4" style={{ textAlign: 'center' }}>
                  {stripHtml(doc.techSpecsH2)}
                </h2>
              )}

              {/* Two-column spec cards */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
                  gap: '1.5rem',
                }}
              >
                {techCaps && (
                  <div
                    style={{
                      background: 'var(--lightmode--surface-1, #0f0f0f)',
                      border: '1px solid var(--lightmode--onsurface-border, rgba(255,255,255,0.08))',
                      borderRadius: '1rem',
                      padding: '2.5rem',
                    }}
                  >
                    {/* Card header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--lightmode--onsurface-border, rgba(255,255,255,0.08))' }}>
                      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.375rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightmode--primary, #ffff25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
                          <rect x="9" y="9" width="6" height="6" />
                          <line x1="9" y1="1" x2="9" y2="4" /><line x1="15" y1="1" x2="15" y2="4" />
                          <line x1="9" y1="20" x2="9" y2="23" /><line x1="15" y1="20" x2="15" y2="23" />
                          <line x1="20" y1="9" x2="23" y2="9" /><line x1="20" y1="14" x2="23" y2="14" />
                          <line x1="1" y1="9" x2="4" y2="9" /><line x1="1" y1="14" x2="4" y2="14" />
                        </svg>
                      </div>
                      <div className="c-title-5">Technical Capabilities</div>
                    </div>
                    <div className="c-text-4">
                      <RichText value={techCaps} />
                    </div>
                  </div>
                )}
                {secComp && (
                  <div
                    style={{
                      background: 'var(--lightmode--surface-1, #0f0f0f)',
                      border: '1px solid var(--lightmode--onsurface-border, rgba(255,255,255,0.08))',
                      borderRadius: '1rem',
                      padding: '2.5rem',
                    }}
                  >
                    {/* Card header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--lightmode--onsurface-border, rgba(255,255,255,0.08))' }}>
                      <div style={{ width: '2.5rem', height: '2.5rem', borderRadius: '0.375rem', background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="var(--lightmode--primary, #ffff25)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                        </svg>
                      </div>
                      <div className="c-title-5">Security &amp; Compliance</div>
                    </div>
                    <div className="c-text-4">
                      <RichText value={secComp} />
                    </div>
                  </div>
                )}
              </div>

              {/* Trust badges */}
              <div className="c-line" />
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '2rem', justifyContent: 'center' }}>
                {[
                  'SOC 2 Type II',
                  'End-to-End Encryption',
                  'No Training on Your Data',
                  'Full Audit Trail',
                ].map((label, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', opacity: 0.6 }}>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="var(--lightmode--primary, #ffff25)" stroke="none">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                      <path d="M22 4L12 14.01l-3-3.01" stroke="var(--lightmode--surface, #0a0a0a)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    <span style={{ fontSize: '0.8rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase' }}>{label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 7. USE CASES                                                 */}
      {/* ============================================================ */}
      {useCaseCards.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="v-48">
              {doc.useCasesH2 && (
                <div className="ent-price-head">
                  <h2 className="c-title-4">{stripHtml(doc.useCasesH2)}</h2>
                </div>
              )}
              <div className="ent-price-card-grid">
                {useCaseCards.map((uc: any, i: number) => (
                  <div key={i} className="ent-price-dark-card">
                    <div className="ent-price-dark-card_header">
                      <div className="eyebrow-box" />
                      <div className="c-title-5">{stripHtml(uc.title || '')}</div>
                    </div>
                    <div>
                      {uc.description && (
                        <p className="c-text-5">{stripHtml(uc.description)}</p>
                      )}
                    </div>
                    {uc.outcome && (
                      <div style={{
                        background: 'rgba(231,231,13,0.1)',
                        color: 'var(--lightmode--primary)',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '0.25rem 0.75rem',
                        borderRadius: '0.25rem',
                        display: 'inline-block',
                        alignSelf: 'flex-start',
                      }}>
                        {stripHtml(uc.outcome)}
                      </div>
                    )}
                    {uc.linkUrl && (
                      <Link
                        href={uc.linkUrl}
                        className="c-text-link"
                        style={{
                          color: 'var(--lightmode--primary)',
                          fontSize: '0.875rem',
                          fontWeight: 600,
                          textDecoration: 'none',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '0.375rem',
                          alignSelf: 'flex-start',
                        }}
                      >
                        Explore →
                      </Link>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 8. TESTIMONIAL - Uses the existing TestimonialSlider widget  */}
      {/* ============================================================ */}
      {doc.testimonialQuote && (
        <section no-fade="" className="c-section">
          <div className="c-container">
            <div className="slider-wrap">
              <img width="294.5" loading="lazy" alt="" src="/webflow-images/testimonial.svg" className="slider_img" />
              <LottiePlayer src="/webflow-documents/Testimonial-BG-25.json" className="slider_lottie" />
              <TestimonialSlider
                label="Featured Quote"
                testimonials={[{
                  quote: stripHtml(doc.testimonialQuote),
                  eyebrow: doc.testimonialAttribution ? stripHtml(doc.testimonialAttribution) : undefined,
                }]}
              />
              <div className="slider_test">
                <div className="c-title-5"><span className="hide-tablet">Featured </span>Quote</div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Logo bar (separate from testimonial) */}
      {logos.length > 0 && (
        <section className="c-section cc-logos">
          <div className="c-container">
            <div
              style={{
                display: 'flex',
                flexWrap: 'wrap',
                gap: '2.5rem',
                justifyContent: 'center',
                alignItems: 'center',
                opacity: 0.5,
              }}
            >
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
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 9. RELATED CAPABILITIES                                      */}
      {/* ============================================================ */}
      {relatedFeatures.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="v-40">
              <h2 className="c-title-4">Explore the Platform</h2>
              <div className="c-line" />
              <div className="h-flex-20">
                {relatedFeatures.map((f: any) => (
                  <Link
                    key={f.slug?.current}
                    href={`/features/${f.slug?.current}`}
                    style={{ textDecoration: 'none', color: 'inherit', flex: 1 }}
                  >
                    <div className="explore-item" style={{ height: '100%' }}>
                      {f.heroImage?.asset?.url && (
                        <div className="aspect-16-9">
                          <div className="u-relative">
                            <Image
                              src={f.heroImage.asset.url}
                              alt={f.title || ''}
                              width={400}
                              height={225}
                              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, opacity: 0.7 }}
                            />
                          </div>
                        </div>
                      )}
                      <div className="v-64 cc-fill" style={{ padding: '1.5rem' }}>
                        <div className="v-20 cc-explore">
                          <div className="c-text-3 cc-500">{f.title}</div>
                          {(f.heroH1 || f.tagline) && (
                            <div className="c-text-5">
                              {stripHtml(f.heroH1 || f.tagline)}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 10. CTA FOOTER                                               */}
      {/* ============================================================ */}
      <section className="c-section">
        <div className="c-container">
          <div className="v-48" style={{ maxWidth: '42rem', margin: '0 auto', textAlign: 'center', alignItems: 'center' }}>
            <div className="v-12" style={{ alignItems: 'center' }}>
              <h2 className="c-title-4">
                {ctaHeadline ? stripHtml(ctaHeadline) : 'Ready to get started?'}
              </h2>
              {doc.ctaBody && (
                <p className="c-text-4">{stripHtml(doc.ctaBody)}</p>
              )}
            </div>
            <div className="h-20" style={{ justifyContent: 'center', flexWrap: 'wrap' }}>
              <CtaButton
                label={doc.ctaButtonLabel ? stripHtml(doc.ctaButtonLabel) : 'Start Free Trial'}
                href="https://app.brightwave.io/register"
                variant="primary"
              />
              <CtaButton label="Get a Demo" href="/contact" variant="outline" />
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', justifyContent: 'center', opacity: 0.5 }}>
              {['SOC 2 Compliant', 'No Training on Your Data', 'End-to-End Encryption', 'Full Audit Trail'].map((label, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.375rem' }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                    <polyline points="22 4 12 14.01 9 11.01" />
                  </svg>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600 }}>{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Responsive override for deep dive sticky layout + hero split */}
      <style dangerouslySetInnerHTML={{ __html: `
        .feature-hero-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
          gap: 3.5rem;
          align-items: center;
        }
        .feature-hero-content {
          display: flex;
          flex-direction: column;
          gap: 1.5rem;
        }
        .feature-hero-media {
          width: 100%;
        }
        @media (max-width: 991px) {
          .feature-hero-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
          .deep-dive-layout {
            flex-direction: column !important;
          }
          .deep-dive-layout > div:first-child {
            width: 100% !important;
            position: static !important;
          }
        }
      ` }} />
    </div>
  )
}
