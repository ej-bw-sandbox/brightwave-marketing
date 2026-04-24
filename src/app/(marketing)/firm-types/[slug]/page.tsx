import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { solutionQuery, solutionSlugsQuery } from '@/lib/sanity/queries/solutions'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'
import { CtaButton } from '@/components/sections/CtaButton'
import { TestimonialSlider } from '@/components/ui/TestimonialSlider'
import { LottiePlayer } from '@/components/ui/LottiePlayer'
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

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

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

/* ------------------------------------------------------------------ */
/*  Icons                                                              */
/* ------------------------------------------------------------------ */

function IconShield() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}
function IconLock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}
function IconClock() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}
function IconFile() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}
function IconWarning() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="square" d="M12 4L4 20h16L12 4z" />
      <path d="M12 10v4" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

const trustBadges = [
  { icon: <IconShield />, label: 'SOC 2 Type II' },
  { icon: <IconClock />, label: 'No Training on Your Data' },
  { icon: <IconLock />, label: 'End-to-End Encryption' },
  { icon: <IconFile />, label: 'Full Audit Trail' },
]

/* ------------------------------------------------------------------ */
/*  FAQ accordion                                                      */
/* ------------------------------------------------------------------ */

function FaqItem({ question, answer }: { question: string; answer: any }) {
  return (
    <details style={{
      borderBottom: '1px solid var(--lightmode--onsurface-border, #d7d8db)',
      padding: '1.25rem 0',
    }}>
      <summary style={{
        cursor: 'pointer',
        listStyle: 'none',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        gap: '1rem',
      }}>
        <span className="c-title-5">{question}</span>
        <span style={{ fontSize: '1.5rem', fontWeight: 300, flexShrink: 0, color: 'var(--lightmode--onsurface-weak, #5a5b5c)' }}>+</span>
      </summary>
      <div className="c-text-4" style={{ paddingTop: '0.75rem', color: 'var(--lightmode--onsurface-weak, #5a5b5c)', lineHeight: 1.7 }}>
        <RichText value={answer} />
      </div>
    </details>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
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
      {/* 1. HERO (dark, cc-template) — split: content left, image right*/}
      {/* ============================================================ */}
      <section className="c-section cc-template">
        <div className="c-container">
          <div className="ft-hero-grid">
            {/* LEFT: content */}
            <div className="ft-hero-content">
              {doc.eyebrow && (
                <div className="eyebrow cc-no-bp">
                  <div className="block cc-primary" />
                  <span className="c-title-5">{stripHtml(doc.eyebrow)}</span>
                </div>
              )}

              <div className="bp40-underline">
                <h1 className="c-title-2">{doc.h1 || doc.title}</h1>
              </div>

              {doc.heroH2 && (
                <p className="c-text-3 u-balance">{stripHtml(doc.heroH2)}</p>
              )}

              {doc.heroH3 && (
                <p className="c-text-4" style={{ color: 'var(--lightmode--primary, #e7e70d)', fontWeight: 600 }}>
                  {stripHtml(doc.heroH3)}
                </p>
              )}

              {doc.heroBody && (
                <RichText value={doc.heroBody} className="c-text-4" />
              )}

              <div className="h-20 cc-hero" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
                <CtaButton label="Get a Demo" href="/contact" variant="outline" />
              </div>
            </div>

            {/* RIGHT: media */}
            <div className="ft-hero-media">
              {doc.heroImage?.asset ? (
                <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '0.75rem', overflow: 'hidden' }}>
                  <Image
                    src={urlFor(doc.heroImage).width(1400).quality(85).url()}
                    alt={doc.h1 || doc.title || ''}
                    fill
                    style={{ objectFit: 'cover' }}
                    priority
                  />
                </div>
              ) : (
                <div
                  style={{
                    aspectRatio: '16/9',
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, rgba(255,255,255,0.04) 0%, rgba(255,255,255,0.01) 100%)',
                    border: '1px solid rgba(255,255,255,0.08)',
                  }}
                />
              )}
            </div>
          </div>
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .ft-hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 3.5rem;
            align-items: center;
          }
          .ft-hero-content { display: flex; flex-direction: column; gap: 1.25rem; }
          .ft-hero-media { width: 100%; }
          @media (max-width: 991px) {
            .ft-hero-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          }
        ` }} />
      </section>

      {/* ============================================================ */}
      {/* 2. THE CHALLENGE (dark — iam-value)                          */}
      {/* ============================================================ */}
      {(doc.challengeH2 || doc.operationalPressures || doc.traditionalFailures) && (
        <section className="c-section iam-value">
          <div className="c-container">
            <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem' }}>
              <div
                className="eyebrow cc-no-bp"
                style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1rem' }}
              >
                <div className="block cc-primary" />
                <span className="c-title-5">The Challenge</span>
              </div>
              {doc.challengeH2 && (
                <h2 className="c-title-2 iam-value__h2" style={{ marginBottom: '1rem' }}>
                  {stripHtml(doc.challengeH2)}
                </h2>
              )}
              {doc.challengeH3 && (
                <p className="c-text-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {stripHtml(doc.challengeH3)}
                </p>
              )}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
              gap: '1.5rem',
            }}>
              {doc.operationalPressures && (
                <div className="iam-value-cell" style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.5rem',
                  padding: '2rem',
                }}>
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                    background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem', color: '#f87171',
                  }}>
                    <IconWarning />
                  </div>
                  <h3 className="c-title-5" style={{ marginBottom: '1rem' }}>Operational Pressures</h3>
                  <div className="c-text-5" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                    <RichText value={doc.operationalPressures} />
                  </div>
                </div>
              )}
              {doc.traditionalFailures && (
                <div className="iam-value-cell" style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.5rem',
                  padding: '2rem',
                }}>
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                    background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem', color: '#f87171',
                  }}>
                    <IconWarning />
                  </div>
                  <h3 className="c-title-5" style={{ marginBottom: '1rem' }}>Where Traditional Approaches Fail</h3>
                  <div className="c-text-5" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                    <RichText value={doc.traditionalFailures} />
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 3. THE SOLUTION / CAPABILITIES (light — bento grid)          */}
      {/* ============================================================ */}
      {(doc.solutionH2 || capabilities.length > 0) && (
        <section className="c-section">
          <div className="c-container icp-capabilities">
            <div style={{ textAlign: 'center', marginBottom: '3rem', width: '100%' }}>
              <div
                className="eyebrow cc-no-bp blue"
                style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1rem' }}
              >
                <div className="block blue" />
                <span className="c-title-5">{doc.solutionLabel ? stripHtml(doc.solutionLabel) : 'The Solution'}</span>
              </div>
              {doc.solutionH2 && (
                <h2 className="c-title-4 icp-capabilities-h2" style={{ marginBottom: '1rem' }}>
                  {stripHtml(doc.solutionH2)}
                </h2>
              )}
              {doc.solutionH3 && (
                <p className="c-text-3 u-balance" style={{ maxWidth: '48rem', margin: '0 auto 1rem' }}>
                  {stripHtml(doc.solutionH3)}
                </p>
              )}
              {doc.solutionBody && (
                <div className="c-text-4" style={{ maxWidth: '48rem', margin: '0 auto', color: 'var(--lightmode--onsurface-weak, #5a5b5c)' }}>
                  <RichText value={doc.solutionBody} />
                </div>
              )}
            </div>

            {capabilities.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: capabilities.length >= 3
                  ? 'repeat(12, 1fr)' : 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
                gap: '1.5rem',
                width: '100%',
              }}>
                {capabilities.map((c: any, i: number) => {
                  let gridCol = 'span 12 / span 12'
                  if (capabilities.length >= 3) {
                    if (i === 0) gridCol = 'span 8 / span 8'
                    else if (i === 1) gridCol = 'span 4 / span 4'
                    else gridCol = `span ${12 / Math.max(1, capabilities.length - 2)} / span ${12 / Math.max(1, capabilities.length - 2)}`
                  }
                  return (
                    <div
                      key={i}
                      className="iam-capability-cell shadow-card"
                      style={{
                        gridColumn: capabilities.length >= 3 ? gridCol : undefined,
                      }}
                    >
                      <h3 className="c-text-2 icp-capabilities__h3" style={{ textAlign: 'left', marginBottom: '0.75rem' }}>
                        {typeof c === 'string' ? c : stripHtml(c.title || '')}
                      </h3>
                      {c.bullets && (
                        <div className="c-text-5" style={{ lineHeight: 1.6 }}>
                          <RichText value={c.bullets} />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 4. QUANTIFIED VALUE (light, gray bg) + summary strip         */}
      {/* ============================================================ */}
      {(doc.valueH2 || valueCards.length > 0 || doc.valueSummary) && (
        <section className="c-section" style={{ background: 'var(--lightmode--surface-1, #eff1f5)' }}>
          <div className="c-container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div
                className="eyebrow cc-no-bp"
                style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1rem' }}
              >
                <div className="block cc-primary" />
                <span className="c-title-5">Outcomes</span>
              </div>
              {doc.valueH2 && (
                <h2 className="c-title-3" style={{ marginBottom: '1rem' }}>
                  {stripHtml(doc.valueH2)}
                </h2>
              )}
              {doc.valueH3 && (
                <p className="c-text-4" style={{ color: 'var(--lightmode--onsurface-weak, #5a5b5c)', maxWidth: '48rem', margin: '0 auto' }}>
                  {stripHtml(doc.valueH3)}
                </p>
              )}
            </div>

            {valueCards.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
                gap: '1.5rem',
              }}>
                {valueCards.map((card: any, i: number) => (
                  <div key={i} className="iam-capability-cell shadow-card" style={{ background: '#fff' }}>
                    <div style={{
                      fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
                      color: 'var(--lightmode--onsurface-weak, #5a5b5c)', marginBottom: '0.5rem',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="c-line" style={{ background: 'var(--lightmode--primary, #e7e70d)', height: '2px', width: '2.5rem', marginBottom: '1rem' }} />
                    <h3 className="c-title-5" style={{ marginBottom: '0.75rem' }}>
                      {typeof card === 'string' ? card : stripHtml(card.title || '')}
                    </h3>
                    {card.bullets && (
                      <div className="c-text-5" style={{ color: 'var(--lightmode--onsurface-weak, #5a5b5c)', lineHeight: 1.6 }}>
                        <RichText value={card.bullets} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {doc.valueSummary && (
              <div style={{
                marginTop: '3rem',
                background: 'var(--lightmode--onsurface, #0f0f0f)',
                color: '#fff',
                borderRadius: '0.75rem',
                padding: '2.5rem',
                lineHeight: 1.7,
                maxWidth: '64rem',
                margin: '3rem auto 0',
              }}>
                <div className="c-text-4">
                  <RichText value={doc.valueSummary} />
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 5. SECURITY & COMPLIANCE (dark — iam-value)                  */}
      {/* ============================================================ */}
      {(doc.securityH2 || doc.securityArchitecture || doc.complianceFeatures) && (
        <section className="c-section iam-value">
          <div className="c-container">
            <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 3rem' }}>
              <div
                className="eyebrow cc-no-bp"
                style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1rem' }}
              >
                <div className="block cc-primary" />
                <span className="c-title-5">Security & Compliance</span>
              </div>
              {doc.securityH2 && (
                <h2 className="c-title-3" style={{ color: '#fff', marginBottom: '1rem' }}>
                  {stripHtml(doc.securityH2)}
                </h2>
              )}
              {doc.securityH3 && (
                <p className="c-text-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                  {stripHtml(doc.securityH3)}
                </p>
              )}
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
              gap: '1.5rem',
              marginBottom: '3rem',
            }}>
              {doc.securityArchitecture && (
                <div className="iam-value-cell" style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.5rem',
                  padding: '2rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#fff' }}>
                    <IconShield />
                    <h3 className="c-title-5">Security Architecture</h3>
                  </div>
                  <div className="c-text-5" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                    <RichText value={doc.securityArchitecture} />
                  </div>
                </div>
              )}
              {doc.complianceFeatures && (
                <div className="iam-value-cell" style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.5rem',
                  padding: '2rem',
                }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', color: '#fff' }}>
                    <IconFile />
                    <h3 className="c-title-5">Compliance Features</h3>
                  </div>
                  <div className="c-text-5" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.7 }}>
                    <RichText value={doc.complianceFeatures} />
                  </div>
                </div>
              )}
            </div>

            {/* Trust badges */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))',
              gap: '1rem',
              background: 'rgba(255,255,255,0.02)',
              padding: '1.75rem 2rem',
              borderRadius: '0.5rem',
              border: '1px solid rgba(255,255,255,0.08)',
            }}>
              {trustBadges.map((badge, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'rgba(255,255,255,0.85)' }}>
                  <div style={{ flexShrink: 0 }}>{badge.icon}</div>
                  <span style={{ fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                    {badge.label}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. INTEGRATIONS (light)                                      */}
      {/* ============================================================ */}
      {(doc.integrationH2 || integrations.length > 0) && (
        <section className="c-section">
          <div className="c-container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div
                className="eyebrow cc-no-bp blue"
                style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1rem' }}
              >
                <div className="block blue" />
                <span className="c-title-5">Integrations</span>
              </div>
              {doc.integrationH2 && (
                <h2 className="c-title-3" style={{ marginBottom: '1rem' }}>
                  {stripHtml(doc.integrationH2)}
                </h2>
              )}
              {doc.integrationH3 && (
                <p className="c-text-4" style={{ color: 'var(--lightmode--onsurface-weak, #5a5b5c)', maxWidth: '48rem', margin: '0 auto' }}>
                  {stripHtml(doc.integrationH3)}
                </p>
              )}
            </div>

            {integrations.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
                gap: '1.5rem',
              }}>
                {integrations.map((integ: any, i: number) => (
                  <div key={i} className="iam-capability-cell shadow-card" style={{ background: '#fff' }}>
                    <h3 className="c-title-5" style={{ marginBottom: '0.75rem' }}>
                      {typeof integ === 'string' ? integ : stripHtml(integ.title || '')}
                    </h3>
                    {integ.bullets && (
                      <div className="c-text-5" style={{ color: 'var(--lightmode--onsurface-weak, #5a5b5c)', lineHeight: 1.7 }}>
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
      {/* 7. PROVEN RESULTS — testimonial + performance/ROI cards      */}
      {/* ============================================================ */}
      {(doc.resultsQuote || doc.performanceBullets || doc.roiBullets) && (
        <section className="c-section iam-value">
          <div className="c-container">
            {/* Standard slider-wrap testimonial */}
            {doc.resultsQuote && (
              <div className="slider-wrap" style={{ marginBottom: (doc.performanceBullets || doc.roiBullets) ? '3rem' : '0' }}>
                <img width="294.5" loading="lazy" alt="" src="/webflow-images/testimonial.svg" className="slider_img" />
                <LottiePlayer src="/webflow-documents/Testimonial-BG-25.json" className="slider_lottie" />
                <TestimonialSlider
                  label="Proven Results"
                  testimonials={[{
                    quote: stripHtml(doc.resultsQuote),
                    eyebrow: doc.resultsAttribution ? stripHtml(doc.resultsAttribution) : undefined,
                  }]}
                />
                <div className="slider_test">
                  <div className="c-title-5"><span className="hide-tablet">Proven </span>Results</div>
                </div>
              </div>
            )}

            {/* Performance + ROI */}
            {(doc.performanceBullets || doc.roiBullets) && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
                gap: '1.5rem',
              }}>
                {doc.performanceBullets && (
                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.5rem', padding: '2rem',
                    position: 'relative',
                  }}>
                    <div style={{ height: '3px', background: 'var(--lightmode--primary, #e7e70d)', position: 'absolute', top: 0, left: 0, right: 0 }} />
                    <div style={{
                      fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
                      color: 'var(--lightmode--primary, #e7e70d)', marginBottom: '0.75rem',
                    }}>
                      Performance
                    </div>
                    <div className="c-text-5" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
                      <RichText value={doc.performanceBullets} />
                    </div>
                  </div>
                )}
                {doc.roiBullets && (
                  <div style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.5rem', padding: '2rem',
                    position: 'relative',
                  }}>
                    <div style={{ height: '3px', background: 'var(--lightmode--primary, #e7e70d)', position: 'absolute', top: 0, left: 0, right: 0 }} />
                    <div style={{
                      fontSize: '0.7rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em',
                      color: 'var(--lightmode--primary, #e7e70d)', marginBottom: '0.75rem',
                    }}>
                      ROI
                    </div>
                    <div className="c-text-5" style={{ color: 'rgba(255,255,255,0.85)', lineHeight: 1.7 }}>
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
      {/* 8. IMPLEMENTATION TIMELINE (light)                           */}
      {/* ============================================================ */}
      {(doc.implementationH2 || implementationSteps.length > 0) && (
        <section className="c-section">
          <div className="c-container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <div
                className="eyebrow cc-no-bp"
                style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1rem' }}
              >
                <div className="block cc-primary" />
                <span className="c-title-5">Implementation</span>
              </div>
              {doc.implementationH2 && (
                <h2 className="c-title-3">{stripHtml(doc.implementationH2)}</h2>
              )}
            </div>

            {implementationSteps.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: `repeat(auto-fit, minmax(min(100%, ${implementationSteps.length <= 4 ? '12rem' : '10rem'}), 1fr))`,
                gap: '1.5rem',
                maxWidth: '72rem',
                margin: '0 auto',
              }}>
                {implementationSteps.map((step: any, i: number) => (
                  <div key={i} style={{
                    background: '#fff',
                    border: '1px solid var(--lightmode--onsurface-border, #d7d8db)',
                    borderRadius: '0.5rem',
                    padding: '1.5rem',
                    display: 'flex',
                    flexDirection: 'column',
                    gap: '0.75rem',
                    position: 'relative',
                  }}>
                    <div style={{
                      fontSize: '0.7rem', fontWeight: 700, fontFamily: 'monospace',
                      letterSpacing: '0.1em', color: 'var(--lightmode--onsurface-weak, #5a5b5c)',
                    }}>
                      STEP {String(i + 1).padStart(2, '0')}
                    </div>
                    <div className="c-line" style={{ background: 'var(--lightmode--primary, #e7e70d)', height: '2px', width: '2rem' }} />
                    <h3 className="c-title-5">
                      {typeof step === 'string' ? step : stripHtml(step.title || '')}
                    </h3>
                    {step.description && (
                      <p className="c-text-5" style={{ color: 'var(--lightmode--onsurface-weak, #5a5b5c)', lineHeight: 1.6 }}>
                        {stripHtml(step.description)}
                      </p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 9. DIFFERENTIATION (dark — iam-value)                        */}
      {/* ============================================================ */}
      {(doc.differentiationH2 || differentiators.length > 0) && (
        <section className="c-section iam-value">
          <div className="c-container">
            <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 3rem' }}>
              <div
                className="eyebrow cc-no-bp"
                style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1rem' }}
              >
                <div className="block cc-primary" />
                <span className="c-title-5">What Sets Us Apart</span>
              </div>
              {doc.differentiationH2 && (
                <h2 className="c-title-3" style={{ color: '#fff' }}>
                  {stripHtml(doc.differentiationH2)}
                </h2>
              )}
            </div>

            {differentiators.length > 0 && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
                gap: '1.5rem',
              }}>
                {differentiators.map((d: any, i: number) => (
                  <div key={i} style={{
                    background: 'rgba(255,255,255,0.03)',
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.5rem', padding: '2rem',
                    display: 'flex', flexDirection: 'column', gap: '0.75rem',
                  }}>
                    <div style={{
                      fontSize: '0.7rem', fontWeight: 700, fontFamily: 'monospace',
                      letterSpacing: '0.1em', color: 'var(--lightmode--primary, #e7e70d)',
                    }}>
                      {String(i + 1).padStart(2, '0')}
                    </div>
                    <h3 className="c-title-5">
                      {typeof d === 'string' ? d : stripHtml(d.title || '')}
                    </h3>
                    {d.body && (
                      <div className="c-text-5" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
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
      {/* 10. FINAL CTA (matches /use-cases closing CTA)               */}
      {/* ============================================================ */}
      <section className="c-section" style={{ borderTop: '4px solid var(--lightmode--primary, #e7e70d)' }}>
        <div className="c-container cc-8cols" style={{ alignItems: 'center', textAlign: 'center' }}>
          <h2 className="c-title-2" style={{ marginBottom: '1rem' }}>
            {doc.ctaH2 ? stripHtml(doc.ctaH2) : 'Ready to get started?'}
          </h2>
          {doc.ctaSubheadline && (
            <p className="c-text-3" style={{ marginBottom: '1rem', color: 'var(--lightmode--onsurface-weak)' }}>
              {stripHtml(doc.ctaSubheadline)}
            </p>
          )}
          {doc.ctaBody && (
            <div className="c-text-4" style={{ marginBottom: '2rem', color: 'var(--lightmode--onsurface-weak)' }}>
              <RichText value={doc.ctaBody} />
            </div>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <CtaButton
              label={doc.ctaButtonLabel ? stripHtml(doc.ctaButtonLabel) : 'Start Free Trial'}
              href="https://app.brightwave.io/register"
              variant="primary"
            />
            <CtaButton label="Get a Demo" href="/contact" variant="outline" />
          </div>

          {/* Trust badges strip */}
          <div style={{
            borderTop: '1px solid var(--lightmode--onsurface-border, #d7d8db)',
            paddingTop: '2.5rem',
            display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2.5rem',
          }}>
            {trustBadges.map((badge, i) => (
              <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--lightmode--onsurface-weak, #5a5b5c)' }}>
                {badge.icon}
                <span style={{ fontSize: '0.7rem', fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.1em' }}>
                  {badge.label}
                </span>
              </div>
            ))}
          </div>

          {doc.ctaTagline && (
            <p className="c-text-5" style={{ color: 'var(--lightmode--onsurface-weak)', marginTop: '2rem' }}>
              {stripHtml(doc.ctaTagline)}
            </p>
          )}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 11. FAQ (light)                                              */}
      {/* ============================================================ */}
      {faqs.length > 0 && (
        <section className="c-section" style={{ background: 'var(--lightmode--surface-1, #eff1f5)' }}>
          <div className="c-container">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="c-title-3">
                {doc.faqTitle ? stripHtml(doc.faqTitle) : 'Frequently Asked Questions'}
              </h2>
            </div>
            <div style={{ maxWidth: '48rem', margin: '0 auto', background: '#fff', borderRadius: '0.75rem', padding: '2rem 2.5rem' }}>
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
