import Link from 'next/link'
import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { icpQuery, icpSlugsQuery } from '@/lib/sanity/queries/icps'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'
import { CtaButton } from '@/components/sections/CtaButton'
import { LogoMarquee } from '@/components/ui/LogoMarquee'
import { TestimonialSlider } from '@/components/ui/TestimonialSlider'
import { LottiePlayer } from '@/components/ui/LottiePlayer'
import { urlFor } from '@/lib/sanity/image'
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
/*  Trust badge icons                                                  */
/* ------------------------------------------------------------------ */

function IconShield() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function IconLock() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function IconCheck() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
      <polyline points="20 6 9 17 4 12" />
    </svg>
  )
}

function IconDatabase() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <ellipse cx="12" cy="5" rx="9" ry="3" /><path d="M21 12c0 1.66-4 3-9 3s-9-1.34-9-3" /><path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5" /><line x1="3" y1="18" x2="21" y2="6" />
    </svg>
  )
}

function IconEye() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" /><circle cx="12" cy="12" r="3" />
    </svg>
  )
}

const trustBadges = [
  { icon: <IconShield />, label: 'SOC 2 Compliant' },
  { icon: <IconDatabase />, label: 'No Training on Your Data' },
  { icon: <IconLock />, label: 'End-to-End Encryption' },
  { icon: <IconEye />, label: 'Full Audit Trail' },
]

/* ------------------------------------------------------------------ */
/*  Product mock UI (hero placeholder when no heroImage)               */
/* ------------------------------------------------------------------ */

function ProductMockUI() {
  return (
    <div style={{
      marginTop: '3rem',
      width: '100%',
      aspectRatio: '16/9',
      border: '1px solid rgba(255,255,255,0.1)',
      borderRadius: '0.75rem',
      background: '#0a0a0a',
      overflow: 'hidden',
      display: 'flex',
      flexDirection: 'column',
    }}>
      {/* Top bar */}
      <div style={{
        height: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)',
        background: 'var(--lightmode--surface, #0f0f0f)',
        display: 'flex', alignItems: 'center', justifyContent: 'space-between',
        padding: '0 1rem', flexShrink: 0,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#fff' }}>
          {/* Mini BW icon blocks */}
          <svg viewBox="0 0 160 24" style={{ height: '1.125rem' }} fill="currentColor">
            <rect x="0" y="4" width="6" height="6" />
            <rect x="8" y="4" width="6" height="6" />
            <rect x="0" y="12" width="6" height="6" />
            <rect x="8" y="12" width="6" height="6" />
            <text x="22" y="17" fontFamily="system-ui, sans-serif" fontWeight="600" fontSize="16" letterSpacing="-0.02em">brightwave</text>
          </svg>
        </div>
        <div style={{ fontSize: '0.75rem', color: 'var(--lightmode--onsurface-weak, #5a5b5c)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <span>Project_Phoenix_VDR</span>
          <span style={{ color: 'var(--lightmode--primary, #e7e70d)' }}>Processing: 98%</span>
        </div>
      </div>

      {/* Main area */}
      <div style={{ flex: 1, display: 'flex', overflow: 'hidden', background: '#0f0f0f' }}>
        {/* Sidebar */}
        <div style={{
          width: '16rem', borderRight: '1px solid rgba(255,255,255,0.08)',
          padding: '1rem', display: 'flex', flexDirection: 'column', gap: '0.75rem',
          fontSize: '0.75rem', color: 'var(--lightmode--onsurface-weak, #5a5b5c)',
        }}>
          <div style={{ color: '#fff', marginBottom: '0.5rem', fontWeight: 500 }}>Data Room</div>
          <div style={{ paddingLeft: '0.5rem' }}>1_Financials_Model.xlsx</div>
          <div style={{ paddingLeft: '0.5rem' }}>2_Management_Pres.pdf</div>
          <div style={{
            paddingLeft: '0.5rem', background: 'rgba(255,255,255,0.05)',
            color: '#fff', padding: '0.25rem 0.5rem',
          }}>
            <span style={{ color: 'var(--lightmode--primary, #e7e70d)' }}>•</span> 3_Confidential_CIM_vFinal.pdf
          </div>
          <div style={{ paddingLeft: '0.5rem' }}>4_Material_Contracts.zip</div>
        </div>

        {/* Document viewer */}
        <div style={{
          flex: 1, borderRight: '1px solid rgba(255,255,255,0.08)',
          padding: '2rem', display: 'flex', justifyContent: 'center',
          background: '#050505', position: 'relative', overflow: 'hidden',
        }}>
          <div style={{
            width: '100%', maxWidth: '32rem', background: '#ddd',
            borderRadius: '0.25rem', padding: '2rem', position: 'relative', overflow: 'hidden',
          }}>
            <div style={{ width: '66%', height: '1rem', background: 'rgba(0,0,0,0.2)', marginBottom: '1.5rem' }} />
            <div style={{ width: '100%', height: '0.5rem', background: 'rgba(0,0,0,0.1)', marginBottom: '0.5rem' }} />
            <div style={{ width: '100%', height: '0.5rem', background: 'rgba(0,0,0,0.1)', marginBottom: '0.5rem' }} />
            <div style={{ width: '83%', height: '0.5rem', background: 'rgba(0,0,0,0.1)', marginBottom: '2rem' }} />
            {/* Highlighted extraction */}
            <div style={{
              border: '2px solid #e7e70d', background: 'rgba(231,231,13,0.3)',
              padding: '0.5rem', position: 'relative',
            }}>
              <div style={{ width: '100%', height: '0.5rem', background: 'rgba(0,0,0,0.4)', marginBottom: '0.5rem' }} />
              <div style={{ width: '80%', height: '0.5rem', background: 'rgba(0,0,0,0.4)', marginBottom: '0.5rem' }} />
              <div style={{ width: '100%', height: '0.5rem', background: 'rgba(0,0,0,0.4)' }} />
            </div>
            <div style={{ width: '100%', height: '0.5rem', background: 'rgba(0,0,0,0.1)', marginTop: '2rem', marginBottom: '0.5rem' }} />
            <div style={{ width: '75%', height: '0.5rem', background: 'rgba(0,0,0,0.1)', marginBottom: '0.5rem' }} />
            <div style={{ width: '100%', height: '0.5rem', background: 'rgba(0,0,0,0.1)' }} />
          </div>
        </div>

        {/* AI extraction panel */}
        <div style={{
          width: '20rem', padding: '1rem', display: 'flex',
          flexDirection: 'column', gap: '1rem', background: '#121212',
        }}>
          <div style={{
            fontSize: '0.75rem', color: '#fff', borderBottom: '1px solid rgba(255,255,255,0.08)',
            paddingBottom: '0.5rem', marginBottom: '0.5rem', fontWeight: 500,
          }}>
            AI Extraction
          </div>
          <div style={{
            border: '1px solid rgba(231,231,13,0.3)',
            background: 'rgba(231,231,13,0.05)',
            padding: '0.75rem', borderRadius: '0.125rem',
          }}>
            <div style={{ fontSize: '0.875rem', fontWeight: 500, color: '#fff' }}>EBITDA Adjustment</div>
            <div style={{ fontSize: '0.625rem', color: '#e7e70d', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Page 42 • Confidence: 99%
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--lightmode--onsurface-weak, #5a5b5c)', lineHeight: 1.4, marginTop: '0.25rem', fontFamily: 'monospace' }}>
              &ldquo;Management added back $4.2M in restructuring costs.&rdquo;
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

const pressLogos = [
  { src: '/webflow-images/Frame-1321316806.avif', alt: 'Fortune', width: 191 },
  { src: '/webflow-images/Frame-1321316797.avif', alt: 'WSJ Pro', width: 191 },
  { src: '/webflow-images/Frame-1321316805.avif', alt: 'Axios', width: 191 },
  { src: '/webflow-images/american-banker.svg', alt: 'American Banker', width: 191 },
  { src: '/webflow-images/Frame-1321316804.avif', alt: 'Fox Business', width: 191 },
  { src: '/webflow-images/latent-space.png', alt: 'Latent Space', width: 191 },
  { src: '/webflow-images/Frame-1321316818.avif', alt: 'Cerebral Valley', width: 191 },
  { src: '/webflow-images/Frame-1321316819.avif', alt: '', width: 191 },
  { src: '/webflow-images/Frame-1321316820.avif', alt: '', width: 191 },
  { src: '/webflow-images/TIme.avif', alt: 'Time', width: 191 },
]

/* ------------------------------------------------------------------ */
/*  Page                                                               */
/* ------------------------------------------------------------------ */

export default async function RoleDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(icpQuery, { slug }, { next: { tags: ['icpPage'] } })

  if (!doc) notFound()

  const capabilities = doc.capabilities ?? []
  const workflows = doc.workflows ?? []
  const valuePillars = doc.valuePillars ?? []
  const relatedUseCases = doc.relatedUseCases ?? []
  const relatedCaseStudies = doc.relatedCaseStudies ?? []
  const relatedFeatures = doc.relatedFeatures ?? []

  return (
    <>
      {/* ============================================================ */}
      {/* 1. HERO (dark — cc-hero) — split: content left, image right  */}
      {/* ============================================================ */}
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="icp-hero-grid">
            {/* LEFT: content */}
            <div className="icp-hero-content">
              <div className="eyebrow cc-no-bp">
                <div className="block cc-primary" />
                <span className="c-title-5">{doc.title}</span>
              </div>

              <div className="bp40-underline">
                <h1 className="c-title-1">{doc.h1 || doc.title}</h1>
              </div>

              {doc.heroTagline && (
                <div className="hero_text cc-top">
                  <p className="c-text-3 u-balance">{stripHtml(doc.heroTagline)}</p>
                </div>
              )}

              {doc.heroBody && (
                <div className="hero_text cc-top">
                  <RichText value={doc.heroBody} className="c-text-4" />
                </div>
              )}

              <div className="h-20 cc-hero" style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem', marginTop: '0.5rem' }}>
                <CtaButton label="Book a Demo" href="/contact" variant="primary" />
                <CtaButton label="Learn More" href="/private-markets-platform" variant="outline" />
              </div>
            </div>

            {/* RIGHT: media (pulled up, above the fold) */}
            <div className="icp-hero-media">
              {doc.heroImage?.asset ? (
                <div
                  className="aspect-16-9 u-overflow-hidden"
                  style={{ borderRadius: '0.75rem' }}
                >
                  <Image
                    src={urlFor(doc.heroImage).width(1400).quality(90).url()}
                    alt={doc.h1 || doc.title || ''}
                    width={1400}
                    height={788}
                    className="img-cover"
                    priority
                  />
                </div>
              ) : (
                <ProductMockUI />
              )}
            </div>
          </div>
        </div>

        {/* Responsive split override */}
        <style dangerouslySetInnerHTML={{ __html: `
          .icp-hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 3.5rem;
            align-items: center;
          }
          .icp-hero-content {
            display: flex;
            flex-direction: column;
            gap: 1.25rem;
          }
          .icp-hero-media { width: 100%; }
          @media (max-width: 991px) {
            .icp-hero-grid {
              grid-template-columns: 1fr;
              gap: 2.5rem;
            }
          }
        ` }} />
      </section>

      {/* ============================================================ */}
      {/* 2. LOGO MARQUEE (light) — full-bleed width                   */}
      {/* ============================================================ */}
      <section className="c-section cc-logos">
        <div style={{ width: '100%' }}>
          <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
            <div className="c-title-5 u-balance">As featured in</div>
          </div>
          <LogoMarquee speed={40} pauseOnHover logos={pressLogos} />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. VALUE PILLARS (dark — iam-value)                          */}
      {/* ============================================================ */}
      {valuePillars.length > 0 && (
        <section className="c-section iam-value">
          <div className="c-container">
            {doc.valueH2 && (
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 className="c-title-2 iam-value__h2">{stripHtml(doc.valueH2)}</h2>
              </div>
            )}

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
              gap: '1.5rem',
            }}>
              {valuePillars.map((p: any, i: number) => (
                <div key={i} className="iam-value-cell" style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.5rem',
                  padding: '2rem',
                }}>
                  <h3 className="c-title-5" style={{ marginBottom: '1rem' }}>
                    {typeof p === 'string' ? p : stripHtml(p.title || '')}
                  </h3>
                  {p.bullets && (
                    <div className="c-text-5" style={{ color: 'rgba(255,255,255,0.7)', lineHeight: 1.6 }}>
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
      {/* 4. CAPABILITIES (light — bento grid)                         */}
      {/* ============================================================ */}
      {capabilities.length > 0 && (
        <section className="c-section">
          <div className="c-container icp-capabilities">
            {doc.capabilitiesH2 && (
              <div style={{ textAlign: 'center', marginBottom: '1rem', width: '100%' }}>
                <h2 className="c-title-4 icp-capabilities-h2">{stripHtml(doc.capabilitiesH2)}</h2>
              </div>
            )}
            {doc.capabilitiesSubtitle && (
              <p className="icp-capabilities-positioning" style={{ marginBottom: '3rem', marginLeft: 'auto', marginRight: 'auto' }}>
                {stripHtml(doc.capabilitiesSubtitle)}
              </p>
            )}
            {!doc.capabilitiesSubtitle && doc.capabilitiesH2 && <div style={{ marginBottom: '3rem' }} />}

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
                      display: 'flex',
                      flexDirection: i === 0 && capabilities.length >= 3 ? 'row' : 'column',
                      gap: i === 0 && capabilities.length >= 3 ? '2rem' : '1rem',
                    }}
                  >
                    <div style={{ flex: 1 }}>
                      <h3 className="c-text-2 icp-capabilities__h3" style={{ textAlign: 'left', marginBottom: '0.75rem' }}>
                        {typeof c === 'string' ? c : stripHtml(c.title || '')}
                      </h3>
                      {c.intro && (
                        <p className="c-text-4 icp-capabilities__body" style={{ marginBottom: '0.75rem' }}>
                          {stripHtml(c.intro)}
                        </p>
                      )}
                      {(c.features || c.content) && (
                        <div className="c-text-5" style={{ lineHeight: 1.6 }}>
                          <RichText value={c.features || c.content} />
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
      {/* 5. WORKFLOW TRANSFORMATION (dark — icp-workflow)              */}
      {/* ============================================================ */}
      {workflows.length > 0 && (
        <section className="c-section icp-workflow">
          <div className="c-container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 2fr)',
              gap: '4rem',
            }}>
              <div style={{ position: 'sticky', top: '8rem', alignSelf: 'start' }}>
                {doc.workflowH2 && (
                  <h2 className="c-title-4 icp-workflow-h2" style={{ marginBottom: '1.5rem' }}>
                    {stripHtml(doc.workflowH2)}
                  </h2>
                )}
                <div style={{
                  display: 'flex', alignItems: 'center', gap: '1.5rem',
                  borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '1.5rem',
                }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: '#ff4c4c' }} />
                    <span className="c-text-5">Status Quo</span>
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                    <span style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--lightmode--primary, #e7e70d)' }} />
                    <span className="c-text-5">Brightwave</span>
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '2.5rem' }}>
                {workflows.map((w: any, i: number) => (
                  <div key={i} style={{
                    border: '1px solid rgba(255,255,255,0.08)',
                    borderRadius: '0.5rem',
                    overflow: 'hidden',
                    background: 'rgba(255,255,255,0.02)',
                  }}>
                    <div style={{
                      padding: '1rem 1.5rem',
                      borderBottom: '1px solid rgba(255,255,255,0.08)',
                      fontWeight: 600,
                    }}>
                      <span className="c-title-5">
                        {i + 1}. {typeof w === 'string' ? w : stripHtml(w.title || '')}
                      </span>
                    </div>
                    <div style={{
                      display: 'grid',
                      gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 16rem), 1fr))',
                    }}>
                      {w.before && (
                        <div style={{
                          padding: '1.5rem',
                          borderRight: '1px solid rgba(255,255,255,0.08)',
                          background: 'rgba(0,0,0,0.3)',
                        }}>
                          <span style={{
                            display: 'block', fontSize: '0.75rem', fontWeight: 600,
                            textTransform: 'uppercase' as const, letterSpacing: '0.08em',
                            color: 'rgba(255,255,255,0.4)', marginBottom: '0.75rem',
                          }}>
                            Status Quo
                          </span>
                          <p className="c-text-5" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                            {stripHtml(w.before)}
                          </p>
                        </div>
                      )}
                      {w.after && (
                        <div style={{ padding: '1.5rem', background: '#151515' }}>
                          <span style={{
                            display: 'block', fontSize: '0.75rem', fontWeight: 600,
                            textTransform: 'uppercase' as const, letterSpacing: '0.08em',
                            color: 'var(--lightmode--primary, #e7e70d)', marginBottom: '0.75rem',
                          }}>
                            Brightwave
                          </span>
                          <p className="c-text-5" style={{ color: '#ffffff', lineHeight: 1.6 }}>
                            {stripHtml(w.after)}
                          </p>
                        </div>
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
      {/* 6. SUCCESS METRICS (light) — card-framed w/ accent rule      */}
      {/* ============================================================ */}
      {(doc.metricsH2 || doc.metricsContent) && (
        <section className="c-section">
          <div className="c-container">
            <div
              style={{
                maxWidth: '64rem',
                margin: '0 auto',
                background: 'var(--lightmode--surface-1, #eff1f5)',
                border: '1px solid var(--lightmode--onsurface-border, #d7d8db)',
                borderRadius: '1rem',
                padding: '3rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              {/* Accent rule */}
              <div
                aria-hidden
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  height: '3px',
                  background: 'var(--lightmode--primary, #e7e70d)',
                }}
              />

              {doc.metricsH2 && (
                <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
                  <div
                    className="eyebrow cc-no-bp"
                    style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1rem' }}
                  >
                    <div className="block cc-primary" />
                    <span className="c-title-5">Outcomes</span>
                  </div>
                  <h2 className="c-title-4">{stripHtml(doc.metricsH2)}</h2>
                </div>
              )}
              {doc.metricsContent && (
                <div
                  className="prose-brand"
                  style={{ maxWidth: '48rem', margin: '0 auto', fontSize: '1.0625rem', lineHeight: 1.75 }}
                >
                  <RichText value={doc.metricsContent} />
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 7. TESTIMONIAL (slider-wrap pattern)                         */}
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

      {/* ============================================================ */}
      {/* 8. SECURITY & COMPLIANCE (dark — iam-value)                  */}
      {/* ============================================================ */}
      {(doc.securityH2 || doc.securityContent) && (
        <section className="c-section iam-value">
          <div className="c-container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
              gap: '4rem',
              alignItems: 'start',
            }}>
              <div>
                {doc.securityH2 && (
                  <h2 className="c-title-4" style={{ color: 'var(--lightmode--onsurface-white)', marginBottom: '1.5rem' }}>
                    {stripHtml(doc.securityH2)}
                  </h2>
                )}
                {doc.securityContent && (
                  <div className="c-text-5" style={{ color: 'rgba(255,255,255,0.8)', lineHeight: 1.7 }}>
                    <RichText value={doc.securityContent} />
                  </div>
                )}
              </div>

              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(2, 1fr)',
                gap: '1.5rem',
                background: 'rgba(255,255,255,0.02)',
                padding: '2rem',
                borderRadius: '0.5rem',
                border: '1px solid rgba(255,255,255,0.08)',
              }}>
                {trustBadges.map((badge, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '1rem' }}>
                    <div style={{ color: 'var(--lightmode--onsurface-white)', flexShrink: 0, marginTop: '0.125rem' }}>
                      {badge.icon}
                    </div>
                    <div>
                      <div className="c-text-5" style={{ fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: '0.25rem' }}>
                        {badge.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 9. SOCIAL PROOF + PRICING (light) — eyebrow + labeled cards  */}
      {/* ============================================================ */}
      {(doc.socialH2 || doc.socialContent || doc.pricingContent || doc.purposeBuiltContent) && (
        <section className="c-section">
          <div className="c-container">
            <div style={{ maxWidth: '68rem', margin: '0 auto' }}>
              {(doc.socialH2 || doc.socialContent) && (
                <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                  <div
                    className="eyebrow cc-no-bp"
                    style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1rem' }}
                  >
                    <div className="block cc-primary" />
                    <span className="c-title-5">Why Brightwave</span>
                  </div>
                  {doc.socialH2 && (
                    <h2 className="c-title-4" style={{ marginBottom: '1rem' }}>
                      {stripHtml(doc.socialH2)}
                    </h2>
                  )}
                  {doc.socialContent && (
                    <div
                      style={{
                        maxWidth: '48rem',
                        marginLeft: 'auto',
                        marginRight: 'auto',
                      }}
                    >
                      <RichText value={doc.socialContent} className="prose-brand c-text-4" />
                    </div>
                  )}
                </div>
              )}

              {(doc.pricingContent || doc.purposeBuiltContent) && (
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
                    gap: '1.5rem',
                  }}
                >
                  {doc.pricingContent && (
                    <div
                      style={{
                        background: '#ffffff',
                        border: '1px solid var(--lightmode--onsurface-border, #d7d8db)',
                        borderRadius: '0.75rem',
                        padding: '2.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        position: 'relative',
                      }}
                    >
                      <div
                        className="c-title-6"
                        style={{
                          color: 'var(--lightmode--onsurface-weak, #5a5b5c)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Pricing
                      </div>
                      <div className="c-line" style={{ background: 'var(--lightmode--primary, #e7e70d)', height: '2px', width: '2.5rem' }} />
                      <RichText value={doc.pricingContent} className="prose-brand" />
                    </div>
                  )}
                  {doc.purposeBuiltContent && (
                    <div
                      style={{
                        background: '#ffffff',
                        border: '1px solid var(--lightmode--onsurface-border, #d7d8db)',
                        borderRadius: '0.75rem',
                        padding: '2.5rem',
                        display: 'flex',
                        flexDirection: 'column',
                        gap: '1rem',
                        position: 'relative',
                      }}
                    >
                      <div
                        className="c-title-6"
                        style={{
                          color: 'var(--lightmode--onsurface-weak, #5a5b5c)',
                          fontSize: '0.75rem',
                          fontWeight: 700,
                          letterSpacing: '0.1em',
                          textTransform: 'uppercase',
                        }}
                      >
                        Purpose-Built
                      </div>
                      <div className="c-line" style={{ background: 'var(--lightmode--primary, #e7e70d)', height: '2px', width: '2.5rem' }} />
                      <RichText value={doc.purposeBuiltContent} className="prose-brand" />
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 10. RELATED CONTENT (light, surface-1 bg)                    */}
      {/* ============================================================ */}
      {(relatedFeatures.length > 0 || relatedUseCases.length > 0 || relatedCaseStudies.length > 0) && (
        <section className="c-section" style={{ background: 'var(--lightmode--surface-1, #eff1f5)' }}>
          <div className="c-container cc-10cols">
            <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
              <h2 className="c-title-4">Explore More</h2>
            </div>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
              gap: '1.5rem',
            }}>
              {relatedFeatures.map((f: any, i: number) => (
                <Link key={`feat-${i}`} href={`/features/${f.slug?.current || ''}`} className="iam-capability-cell shadow-card" style={{ textDecoration: 'none', color: 'inherit', background: '#fff' }}>
                  <div className="c-title-6" style={{ color: 'var(--lightmode--primary, #e7e70d)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Feature</div>
                  <h3 className="c-title-5">{f.title}</h3>
                  {f.tagline && <p className="c-text-5" style={{ marginTop: '0.5rem', color: 'var(--lightmode--onsurface-weak)' }}>{f.tagline}</p>}
                </Link>
              ))}
              {relatedUseCases.map((u: any, i: number) => (
                <Link key={`uc-${i}`} href={`/use-cases/${u.slug?.current || ''}`} className="iam-capability-cell shadow-card" style={{ textDecoration: 'none', color: 'inherit', background: '#fff' }}>
                  <div className="c-title-6" style={{ color: 'var(--lightmode--primary, #e7e70d)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Use Case</div>
                  <h3 className="c-title-5">{u.title}</h3>
                  {u.excerpt && <p className="c-text-5" style={{ marginTop: '0.5rem', color: 'var(--lightmode--onsurface-weak)' }}>{u.excerpt}</p>}
                </Link>
              ))}
              {relatedCaseStudies.map((cs: any, i: number) => (
                <Link key={`cs-${i}`} href={`/case-studies/${cs.slug?.current || ''}`} className="iam-capability-cell shadow-card" style={{ textDecoration: 'none', color: 'inherit', background: '#fff', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cs.thumbnail?.asset && (
                    <Image src={urlFor(cs.thumbnail).width(400).quality(80).url()} alt={cs.title || ''} width={400} height={225} style={{ borderRadius: '0.25rem', width: '100%', height: 'auto' }} />
                  )}
                  <div className="c-title-6" style={{ color: 'var(--lightmode--primary, #e7e70d)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Case Study</div>
                  <h3 className="c-title-5">{cs.title}</h3>
                  {cs.excerpt && <p className="c-text-5" style={{ color: 'var(--lightmode--onsurface-weak)' }}>{cs.excerpt}</p>}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 11. FINAL CTA (matches use-cases page closing CTA pattern)   */}
      {/* ============================================================ */}
      <section className="c-section" style={{ borderTop: '4px solid var(--lightmode--primary, #e7e70d)' }}>
        <div className="c-container cc-8cols" style={{ alignItems: 'center', textAlign: 'center' }}>
          <h2 className="c-title-2" style={{ marginBottom: '1rem' }}>
            {doc.ctaH2 ? stripHtml(doc.ctaH2) : 'Ready to get started?'}
          </h2>
          {(doc.ctaSubheadline || doc.ctaBody) && (
            <p className="c-text-3" style={{ marginBottom: '3rem', color: 'var(--lightmode--onsurface-weak)' }}>
              {doc.ctaSubheadline ? stripHtml(doc.ctaSubheadline) : (typeof doc.ctaBody === 'string' ? stripHtml(doc.ctaBody) : '')}
            </p>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
            <CtaButton
              label={doc.ctaButtonLabel ? stripHtml(doc.ctaButtonLabel) : 'Start Free Trial'}
              href="https://app.brightwave.io/register"
              variant="primary"
            />
            <CtaButton label="Get a Demo" href="/contact" variant="outline" />
          </div>

          {/* Trust badges (matches /use-cases closing CTA) */}
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
        </div>
      </section>
    </>
  )
}
