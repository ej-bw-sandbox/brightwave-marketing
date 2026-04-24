import Image from 'next/image'
import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { useCaseQuery, useCaseSlugsQuery } from '@/lib/sanity/queries/use-cases'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'
import { CtaButton } from '@/components/sections/CtaButton'
import { LogoMarquee } from '@/components/ui/LogoMarquee'
import { TestimonialSlider } from '@/components/ui/TestimonialSlider'
import { LottiePlayer } from '@/components/ui/LottiePlayer'
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
/*  Icons (matching preview SVGs exactly)                              */
/* ------------------------------------------------------------------ */

function IconWarning() {
  return (
    <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
      <path strokeLinecap="square" d="M12 4L4 20h16L12 4z" />
      <path d="M12 10v4" /><circle cx="12" cy="17" r="1" fill="currentColor" stroke="none" />
    </svg>
  )
}

function IconShield() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  )
}

function IconLock() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none">
      <rect x="3" y="11" width="18" height="11" rx="2" ry="2" /><path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  )
}

function IconClock() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none">
      <circle cx="12" cy="12" r="10" /><polyline points="12 6 12 12 16 14" />
    </svg>
  )
}

function IconFile() {
  return (
    <svg viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="1.5" fill="none">
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" /><line x1="16" y1="13" x2="8" y2="13" /><line x1="16" y1="17" x2="8" y2="17" />
    </svg>
  )
}

const trustBadges = [
  { icon: <IconShield />, label: 'SOC 2 Type II' },
  { icon: <IconClock />, label: 'No Training Required' },
  { icon: <IconLock />, label: 'AES-256 Encryption' },
  { icon: <IconFile />, label: 'Full Audit Trail' },
]

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

/** Themed mock UI — cycles through surfaces matched to common solution narratives */
function SolutionMockUI({ index, title }: { index: number; title?: string }) {
  const variants = [
    // 0 — Ingestion / data room
    {
      label: 'Ingestion_Pipeline.sys',
      render: () => (
        <div style={{ flex: 1, display: 'flex', gap: '1rem' }}>
          <div style={{ width: '38%', borderRight: '1px solid #e5e7eb', paddingRight: '1rem', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['Data Room', '10K_Filing.pdf', 'Board_Deck.pptx', 'Model_Q3.xlsx'].map((t, i) => (
              <div key={i} style={{
                height: '1.5rem', padding: '0 0.5rem',
                display: 'flex', alignItems: 'center', fontSize: '0.625rem',
                color: i === 0 ? '#111' : '#6b7280', fontWeight: i === 0 ? 600 : 400,
                background: i === 2 ? 'rgba(231,231,13,0.15)' : 'transparent',
                border: i === 2 ? '1px solid rgba(231,231,13,0.35)' : '1px solid transparent',
                borderRadius: '0.25rem',
              }}>
                {i === 2 && <span style={{ color: '#ca8a04', marginRight: '0.25rem' }}>●</span>}
                {t}
              </div>
            ))}
          </div>
          <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
            <div style={{ height: '0.5rem', width: '55%', background: '#111', borderRadius: '2px' }} />
            <div style={{ height: '0.5rem', width: '100%', background: '#e5e7eb', borderRadius: '2px' }} />
            <div style={{ height: '0.5rem', width: '90%', background: '#e5e7eb', borderRadius: '2px' }} />
            <div style={{ marginTop: '0.5rem', padding: '0.5rem', border: '1px solid #e7e70d', background: 'rgba(231,231,13,0.15)' }}>
              <div style={{ height: '0.5rem', width: '70%', background: 'rgba(17,17,17,0.7)', borderRadius: '2px', marginBottom: '0.4rem' }} />
              <div style={{ height: '0.5rem', width: '85%', background: 'rgba(17,17,17,0.7)', borderRadius: '2px' }} />
            </div>
          </div>
        </div>
      ),
    },
    // 1 — Extraction / highlights
    {
      label: 'AI_Extraction.doc',
      render: () => (
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
          {[
            { title: 'EBITDA Adjustment', confidence: '99%', page: '42' },
            { title: 'Revenue Recognition', confidence: '96%', page: '18' },
            { title: 'Customer Concentration', confidence: '94%', page: '73' },
          ].map((row, i) => (
            <div key={i} style={{
              border: '1px solid #e5e7eb', borderLeft: '3px solid #e7e70d',
              background: '#fff', padding: '0.625rem 0.75rem', borderRadius: '0.25rem',
              display: 'flex', justifyContent: 'space-between', alignItems: 'center',
            }}>
              <div>
                <div style={{ fontSize: '0.7rem', fontWeight: 600, color: '#111' }}>{row.title}</div>
                <div style={{ fontSize: '0.55rem', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.1em', marginTop: '0.2rem' }}>
                  p. {row.page} · conf {row.confidence}
                </div>
              </div>
              <div style={{ fontSize: '0.55rem', color: '#ca8a04', fontWeight: 700 }}>{row.confidence}</div>
            </div>
          ))}
        </div>
      ),
    },
    // 2 — Report / output surface
    {
      label: 'Board_Memo.doc',
      render: () => (
        <div style={{ flex: 1, display: 'flex', gap: '0.75rem' }}>
          <div style={{ flex: 1, background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.25rem', padding: '0.875rem' }}>
            <div style={{ height: '0.625rem', width: '60%', background: '#111', borderRadius: '2px', marginBottom: '0.625rem' }} />
            <div style={{ height: '0.4rem', width: '100%', background: '#e5e7eb', borderRadius: '2px', marginBottom: '0.35rem' }} />
            <div style={{ height: '0.4rem', width: '95%', background: '#e5e7eb', borderRadius: '2px', marginBottom: '0.35rem' }} />
            <div style={{ height: '0.4rem', width: '85%', background: '#e5e7eb', borderRadius: '2px', marginBottom: '0.75rem' }} />
            <div style={{ height: '0.5rem', width: '45%', background: '#111', borderRadius: '2px', marginBottom: '0.5rem' }} />
            <div style={{ height: '0.4rem', width: '100%', background: '#e5e7eb', borderRadius: '2px', marginBottom: '0.35rem' }} />
            <div style={{ height: '0.4rem', width: '80%', background: '#e5e7eb', borderRadius: '2px' }} />
          </div>
          <div style={{ width: '42%', display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            <div style={{ padding: '0.625rem', background: 'rgba(231,231,13,0.12)', border: '1px solid rgba(231,231,13,0.35)', borderRadius: '0.25rem' }}>
              <div style={{ fontSize: '0.55rem', fontWeight: 700, color: '#ca8a04', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
                Key Risk
              </div>
              <div style={{ height: '0.375rem', width: '100%', background: 'rgba(17,17,17,0.6)', borderRadius: '2px', marginBottom: '0.25rem' }} />
              <div style={{ height: '0.375rem', width: '72%', background: 'rgba(17,17,17,0.6)', borderRadius: '2px' }} />
            </div>
            <div style={{ padding: '0.625rem', background: '#fff', border: '1px solid #e5e7eb', borderRadius: '0.25rem' }}>
              <div style={{ fontSize: '0.55rem', fontWeight: 700, color: '#111', textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.3rem' }}>
                Source
              </div>
              <div style={{ height: '0.375rem', width: '88%', background: '#e5e7eb', borderRadius: '2px' }} />
            </div>
          </div>
        </div>
      ),
    },
  ]

  const variant = variants[index % variants.length]

  return (
    <div style={{
      background: '#f9fafb', border: '1px solid #e5e7eb', borderRadius: '0.5rem',
      padding: '1.25rem', aspectRatio: '16/9', display: 'flex', flexDirection: 'column',
    }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #e5e7eb', paddingBottom: '0.625rem', marginBottom: '0.875rem' }}>
        <div style={{ display: 'flex', gap: '0.375rem' }}>
          <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#f87171' }} />
          <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#fbbf24' }} />
          <div style={{ width: '0.5rem', height: '0.5rem', borderRadius: '50%', background: '#34d399' }} />
        </div>
        <span style={{ fontSize: '0.6rem', fontFamily: 'monospace', color: '#9ca3af', textTransform: 'uppercase', letterSpacing: '0.05em' }}>
          {title ? `${title.slice(0, 24).replace(/\s+/g, '_')}.doc` : variant.label}
        </span>
      </div>
      {variant.render()}
    </div>
  )
}

/* ------------------------------------------------------------------ */
/*  Page                                                               */
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
  const relatedFeatures = doc.relatedFeatures ?? []
  const relatedCaseStudies = doc.relatedCaseStudies ?? []
  const relatedFirmTypes = doc.relatedFirmTypes ?? []

  return (
    <>
      {/* ============================================================ */}
      {/* 1. HERO — split: content left, image/stats right (above fold)*/}
      {/* ============================================================ */}
      <section className="c-section cc-template">
        <div className="c-container">
          <div className="uc-hero-grid">
            {/* LEFT: content */}
            <div className="uc-hero-content">
              {doc.eyebrow && (
                <div className="eyebrow-flex">
                  <div className="block"></div>
                  <div className="c-title-5">{stripHtml(doc.eyebrow)}</div>
                </div>
              )}

              <div className="bp40-underline">
                <h1 className="c-title-1">{doc.h1 || doc.title}</h1>
              </div>

              {(doc.heroSubtitle || doc.h2Hero) && (
                <p className="c-text-3" style={{ marginTop: '0.5rem' }}>
                  {stripHtml(doc.heroSubtitle || doc.h2Hero)}
                </p>
              )}

              {doc.heroBody && (
                <RichText value={doc.heroBody} className="c-text-4" />
              )}

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
                <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
                <CtaButton label="Get a Demo" href="/contact" variant="outline" />
              </div>
            </div>

            {/* RIGHT: media (above the fold) */}
            <div className="uc-hero-media">
              {doc.heroImage?.asset ? (
                <div style={{ borderRadius: '0.75rem', overflow: 'hidden', aspectRatio: '16/9', position: 'relative', width: '100%' }}>
                  <Image
                    src={urlFor(doc.heroImage).width(1400).quality(85).url()}
                    alt={doc.title || ''} fill style={{ objectFit: 'cover' }} priority
                  />
                </div>
              ) : (
                <div
                  style={{
                    aspectRatio: '16/9',
                    borderRadius: '0.75rem',
                    background: 'linear-gradient(135deg, var(--colorprimitives--gray-75, #f5f5f5) 0%, #ebebeb 100%)',
                    border: '1px solid var(--lightmode--onsurface-border, #e5e5e5)',
                  }}
                />
              )}
            </div>
          </div>

          {/* Stat pills span full width below hero split */}
          {statPills.length > 0 && (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(12rem, 1fr))', gap: '1rem', marginTop: '3rem' }}>
              {statPills.map((pill: any, i: number) => (
                <div key={i} style={{
                  background: 'var(--colorprimitives--gray-75, #f5f5f5)',
                  border: '1px solid var(--lightmode--onsurface-border, #e5e5e5)',
                  borderLeft: i === 0 ? '2px solid var(--lightmode--primary, #e7e70d)' : '1px solid var(--lightmode--onsurface-border, #e5e5e5)',
                  padding: '1.5rem',
                  display: 'flex', flexDirection: 'column', gap: '0.25rem',
                }}>
                  <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', letterSpacing: '0.15em', opacity: 0.5, fontWeight: 600 }}>
                    {pill.label}
                  </span>
                  <span className="c-title-3">{pill.value}</span>
                </div>
              ))}
            </div>
          )}
        </div>

        <style dangerouslySetInnerHTML={{ __html: `
          .uc-hero-grid {
            display: grid;
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 3.5rem;
            align-items: center;
          }
          .uc-hero-content { display: flex; flex-direction: column; gap: 1.25rem; }
          .uc-hero-media { width: 100%; }
          @media (max-width: 991px) {
            .uc-hero-grid { grid-template-columns: 1fr; gap: 2.5rem; }
          }
        ` }} />
      </section>

      {/* ============================================================ */}
      {/* 2. LOGO MARQUEE — full-bleed width                           */}
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
      {/* 3. CHALLENGES (dark — iam-value)                             */}
      {/* ============================================================ */}
      {challenges.length > 0 && (
        <section className="c-section iam-value">
          <div className="c-container" style={{ alignItems: 'center' }}>
            {doc.challengeH2 && (
              <h2 className="c-title-2" style={{ textAlign: 'center', marginBottom: '1rem' }}>
                {stripHtml(doc.challengeH2)}
              </h2>
            )}
            <div style={{ marginBottom: '4rem' }} />

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
              gap: '1.5rem', width: '100%',
            }}>
              {challenges.map((c: any, i: number) => (
                <div key={c._key || i} style={{
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.5rem', padding: '2rem',
                  display: 'flex', flexDirection: 'column',
                  transition: 'border-color 0.2s',
                }}>
                  <div style={{
                    width: '2.5rem', height: '2.5rem', borderRadius: '50%',
                    background: 'rgba(248,113,113,0.1)', border: '1px solid rgba(248,113,113,0.2)',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    marginBottom: '1.5rem', color: '#f87171',
                  }}>
                    <IconWarning />
                  </div>
                  {c.title && (
                    <h3 className="c-title-5" style={{ marginBottom: '1rem' }}>{stripHtml(c.title)}</h3>
                  )}
                  {c.bullets && (
                    <div className="c-text-5" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.7 }}>
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
      {/* 4. SOLUTIONS (light — alternating image/text with mock UIs)  */}
      {/* ============================================================ */}
      {solutions.length > 0 && (
        <section className="c-section">
          <div className="c-container cc-10cols">
            {doc.solutionH2 && (
              <div style={{ textAlign: 'center', marginBottom: '6rem' }}>
                <h2 className="c-title-2">{stripHtml(doc.solutionH2)}</h2>
              </div>
            )}

            <div style={{ display: 'flex', flexDirection: 'column', gap: '6rem' }}>
              {solutions.map((s: any, i: number) => {
                const isEven = i % 2 === 1
                return (
                  <div key={s._key || i} style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 22rem), 1fr))',
                    gap: '4rem', alignItems: 'center',
                  }}>
                    {/* Image or mock UI */}
                    <div style={{ order: isEven ? 2 : 1 }}>
                      {s.image?.asset ? (
                        <div style={{ position: 'relative', width: '100%', aspectRatio: '16/9', borderRadius: '0.5rem', overflow: 'hidden', border: '1px solid var(--lightmode--onsurface-border, #d7d8db)' }}>
                          <Image
                            src={urlFor(s.image).width(800).quality(85).url()}
                            alt={s.title || ''} fill style={{ objectFit: 'cover' }} loading="lazy"
                          />
                        </div>
                      ) : (
                        <SolutionMockUI index={i} title={s.title ? stripHtml(s.title) : undefined} />
                      )}
                    </div>

                    {/* Text */}
                    <div style={{ order: isEven ? 1 : 2, display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
                      <div style={{
                        width: '3rem', height: '3rem',
                        background: 'var(--lightmode--onsurface, #0f0f0f)', color: '#fff',
                        borderRadius: '0.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontFamily: 'monospace', fontWeight: 700,
                      }}>
                        {String(i + 1).padStart(2, '0')}
                      </div>
                      {s.title && <h3 className="c-title-3">{stripHtml(s.title)}</h3>}
                      {s.body && (
                        <div className="c-text-4" style={{ color: 'var(--lightmode--onsurface-weak, #5a5b5c)' }}>
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
      {/* 5. BEFORE / AFTER TIMELINE — rethought: header w/ intro +    */}
      {/*    symmetric card footers (total time centered, same label)  */}
      {/* ============================================================ */}
      {(beforeSteps.length > 0 || afterSteps.length > 0) && (
        <section className="c-section icp-workflow" style={{ borderTop: '1px solid rgba(255,255,255,0.05)' }}>
          <div className="c-container cc-10cols">
            {/* Section header — eyebrow + H2 + intro copy */}
            <div style={{ textAlign: 'center', maxWidth: '48rem', margin: '0 auto 4rem' }}>
              <div
                className="eyebrow cc-no-bp"
                style={{ display: 'inline-flex', justifyContent: 'center', marginBottom: '1rem' }}
              >
                <div className="block cc-primary" />
                <span className="c-title-5">Workflow Comparison</span>
              </div>
              <h2 className="c-title-2" style={{ color: '#fff', marginBottom: '1rem' }}>
                {doc.timelineH2 ? stripHtml(doc.timelineH2) : 'Hours of manual work, compressed into minutes.'}
              </h2>
              <p className="c-text-4" style={{ color: 'rgba(255,255,255,0.7)' }}>
                {doc.timelineIntro
                  ? stripHtml(doc.timelineIntro)
                  : 'Side-by-side comparison of the traditional analyst workflow versus the same work run through Brightwave.'}
              </p>
            </div>

            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
              gap: '2rem',
            }}>
              {/* Before */}
              {beforeSteps.length > 0 && (
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.75rem', overflow: 'hidden',
                  display: 'flex', flexDirection: 'column', position: 'relative',
                }}>
                  <div style={{ height: '3px', background: 'rgba(248,113,113,0.3)', position: 'absolute', top: 0, left: 0, right: 0 }} />
                  <div style={{ padding: '2rem 2rem 0' }}>
                    <h3 className="c-title-5" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                      <span style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#f87171' }} />
                      Status Quo
                    </h3>
                  </div>
                  <div style={{ flex: 1, padding: '0 2rem' }}>
                    {beforeSteps.map((step: any, i: number) => (
                      <div key={step._key || i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '1.25rem 0',
                        borderBottom: i < beforeSteps.length - 1 ? '1px solid rgba(255,255,255,0.05)' : 'none',
                      }}>
                        <span className="c-text-5" style={{ color: 'rgba(255,255,255,0.5)' }}>{step.description}</span>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: '#fff', flexShrink: 0, marginLeft: '1rem' }}>{step.time}</span>
                      </div>
                    ))}
                  </div>
                  {doc.beforeTotal && (
                    <div style={{
                      marginTop: 'auto', padding: '1.5rem 2rem',
                      background: 'rgba(248,113,113,0.05)', borderTop: '1px solid rgba(248,113,113,0.12)',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(248,113,113,0.7)', marginBottom: '0.5rem' }}>
                        Total Time
                      </div>
                      <div className="c-title-3" style={{ color: '#fff' }}>{stripHtml(doc.beforeTotal)}</div>
                    </div>
                  )}
                </div>
              )}

              {/* After */}
              {afterSteps.length > 0 && (
                <div style={{
                  background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(255,255,255,0.08)',
                  borderRadius: '0.75rem', overflow: 'hidden',
                  display: 'flex', flexDirection: 'column', position: 'relative',
                }}>
                  <div style={{ height: '3px', background: 'var(--lightmode--primary, #e7e70d)', position: 'absolute', top: 0, left: 0, right: 0 }} />
                  <div style={{ padding: '2rem 2rem 0' }}>
                    <h3 className="c-title-5" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '2rem' }}>
                      <span style={{ width: '10px', height: '10px', background: 'var(--lightmode--primary, #e7e70d)' }} />
                      With Brightwave
                    </h3>
                  </div>
                  <div style={{ flex: 1, padding: '0 2rem' }}>
                    {afterSteps.map((step: any, i: number) => (
                      <div key={step._key || i} style={{
                        display: 'flex', justifyContent: 'space-between', alignItems: 'center',
                        padding: '1.25rem 0',
                        borderBottom: i < afterSteps.length - 1 ? '1px solid rgba(255,255,255,0.08)' : 'none',
                      }}>
                        <span className="c-text-5" style={{ color: 'rgba(255,255,255,0.8)', fontWeight: 500 }}>{step.description}</span>
                        <span style={{ fontFamily: 'monospace', fontSize: '0.875rem', color: 'var(--lightmode--primary, #e7e70d)', flexShrink: 0, marginLeft: '1rem' }}>{step.time}</span>
                      </div>
                    ))}
                  </div>
                  {doc.afterTotal && (
                    <div style={{
                      marginTop: 'auto', padding: '1.5rem 2rem',
                      background: 'var(--lightmode--primary, #e7e70d)', color: '#000',
                      textAlign: 'center',
                    }}>
                      <div style={{ fontSize: '0.65rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.12em', color: 'rgba(0,0,0,0.7)', marginBottom: '0.5rem' }}>
                        Total Time
                      </div>
                      <div className="c-title-3" style={{ color: '#000', fontWeight: 800 }}>{stripHtml(doc.afterTotal)}</div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 6. KEY FEATURES (light, gray bg)                             */}
      {/* ============================================================ */}
      {featureHighlights.length > 0 && (
        <section className="c-section" style={{ background: 'var(--lightmode--surface-1, #eff1f5)' }}>
          <div className="c-container">
            {doc.featuresH2 && (
              <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
                <h2 className="c-title-3">{stripHtml(doc.featuresH2)}</h2>
              </div>
            )}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 18rem), 1fr))',
              gap: '1.5rem',
            }}>
              {featureHighlights.map((f: any, i: number) => (
                <div key={f._key || i} className="iam-capability-cell shadow-card" style={{ background: '#fff' }}>
                  {f.title && (
                    <h3 className="c-title-5" style={{ marginBottom: '0.75rem' }}>{stripHtml(f.title)}</h3>
                  )}
                  {f.bullets && (
                    <div className="c-text-5" style={{ color: 'var(--lightmode--onsurface-weak, #5a5b5c)', lineHeight: 1.7 }}>
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
      {/* 7. RESULTS + SPECIALIZATIONS (light)                         */}
      {/* ============================================================ */}
      {(resultMetrics.length > 0 || specializations.length > 0) && (
        <section className="c-section">
          <div className="c-container cc-10cols">
            {resultMetrics.length > 0 && (
              <>
                {doc.resultsH2 && (
                  <div style={{ textAlign: 'center', marginBottom: '3rem' }}>
                    <h2 className="c-title-3">{stripHtml(doc.resultsH2)}</h2>
                  </div>
                )}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 14rem), 1fr))',
                  gap: '3rem',
                  borderBottom: specializations.length > 0 ? '1px solid var(--lightmode--onsurface-border, #d7d8db)' : 'none',
                  paddingBottom: specializations.length > 0 ? '4rem' : '0',
                  marginBottom: specializations.length > 0 ? '4rem' : '0',
                }}>
                  {resultMetrics.map((m: any, i: number) => (
                    <div key={m._key || i} style={{ textAlign: 'center' }}>
                      <div style={{ fontSize: 'clamp(3rem, 6vw, 4.5rem)', fontWeight: 700, letterSpacing: '-0.03em', lineHeight: 1, marginBottom: '0.5rem' }}>
                        {m.value}
                      </div>
                      <div style={{ fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.1em', marginBottom: '0.5rem' }}>
                        {m.label}
                      </div>
                      {m.description && (
                        <p className="c-text-5" style={{ color: 'var(--lightmode--onsurface-weak, #5a5b5c)', maxWidth: '14rem', margin: '0 auto' }}>
                          {stripHtml(m.description)}
                        </p>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}

            {specializations.length > 0 && (
              <>
                {doc.specializationH2 && (
                  <div style={{ marginBottom: '2rem' }}>
                    <h2 className="c-title-4">{stripHtml(doc.specializationH2)}</h2>
                  </div>
                )}
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
                  gap: '1.5rem',
                }}>
                  {specializations.map((sp: any, i: number) => (
                    <div key={sp._key || i} className="iam-capability-cell shadow-card" style={{ background: '#fff' }}>
                      {sp.title && <h3 className="c-title-5" style={{ marginBottom: '0.75rem' }}>{stripHtml(sp.title)}</h3>}
                      {sp.bullets && (
                        <div className="c-text-5" style={{ color: 'var(--lightmode--onsurface-weak, #5a5b5c)', lineHeight: 1.6 }}>
                          <RichText value={sp.bullets} />
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 8. TESTIMONIAL + SOCIAL PROOF                                */}
      {/* ============================================================ */}
      {(doc.testimonialQuote || doc.technologyBullets || doc.competitiveEdgeBullets) && (
        <section className="c-section iam-value">
          <div className="c-container cc-10cols">
            {/* Testimonial — standard slider-wrap pattern */}
            {doc.testimonialQuote && (
              <div className="slider-wrap" style={{ marginBottom: (doc.technologyBullets || doc.competitiveEdgeBullets) ? '3rem' : '0' }}>
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
            )}

            {/* Technology + Competitive Edge */}
            {(doc.technologyBullets || doc.competitiveEdgeBullets) && (
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 20rem), 1fr))',
                gap: '1.5rem',
              }}>
                {doc.technologyBullets && (
                  <div style={{
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem', padding: '1.5rem',
                    display: 'flex', alignItems: 'flex-start', gap: '1rem',
                  }}>
                    <div style={{
                      width: '2rem', height: '2rem', borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <IconLock />
                    </div>
                    <div>
                      <h4 className="c-title-5" style={{ marginBottom: '0.5rem' }}>Technology</h4>
                      <div className="c-text-5" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                        <RichText value={doc.technologyBullets} />
                      </div>
                    </div>
                  </div>
                )}
                {doc.competitiveEdgeBullets && (
                  <div style={{
                    background: 'transparent', border: '1px solid rgba(255,255,255,0.1)',
                    borderRadius: '0.5rem', padding: '1.5rem',
                    display: 'flex', alignItems: 'flex-start', gap: '1rem',
                  }}>
                    <div style={{
                      width: '2rem', height: '2rem', borderRadius: '50%',
                      border: '1px solid rgba(255,255,255,0.2)',
                      display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0,
                    }}>
                      <IconShield />
                    </div>
                    <div>
                      <h4 className="c-title-5" style={{ marginBottom: '0.5rem' }}>Competitive Edge</h4>
                      <div className="c-text-5" style={{ color: 'rgba(255,255,255,0.5)', lineHeight: 1.6 }}>
                        <RichText value={doc.competitiveEdgeBullets} />
                      </div>
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 9. RELATED CONTENT (light, surface-1)                        */}
      {/* ============================================================ */}
      {(relatedFeatures.length > 0 || relatedCaseStudies.length > 0 || relatedFirmTypes.length > 0) && (
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
                  <div style={{ color: 'var(--lightmode--primary, #e7e70d)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>Feature</div>
                  <h3 className="c-title-5">{f.title}</h3>
                  {f.tagline && <p className="c-text-5" style={{ marginTop: '0.5rem', color: 'var(--lightmode--onsurface-weak)' }}>{f.tagline}</p>}
                </Link>
              ))}
              {relatedCaseStudies.map((cs: any, i: number) => (
                <Link key={`cs-${i}`} href={`/case-studies/${cs.slug?.current || ''}`} className="iam-capability-cell shadow-card" style={{ textDecoration: 'none', color: 'inherit', background: '#fff', display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                  {cs.thumbnail?.asset && (
                    <Image src={urlFor(cs.thumbnail).width(400).quality(80).url()} alt={cs.title || ''} width={400} height={225} style={{ borderRadius: '0.25rem', width: '100%', height: 'auto' }} />
                  )}
                  <div style={{ color: 'var(--lightmode--primary, #e7e70d)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700 }}>Case Study</div>
                  <h3 className="c-title-5">{cs.title}</h3>
                  {cs.excerpt && <p className="c-text-5" style={{ color: 'var(--lightmode--onsurface-weak)' }}>{cs.excerpt}</p>}
                </Link>
              ))}
              {relatedFirmTypes.map((ft: any, i: number) => (
                <Link key={`ft-${i}`} href={`/solutions/${ft.slug?.current || ''}`} className="iam-capability-cell shadow-card" style={{ textDecoration: 'none', color: 'inherit', background: '#fff' }}>
                  <div style={{ color: 'var(--lightmode--primary, #e7e70d)', fontSize: '0.65rem', letterSpacing: '0.1em', textTransform: 'uppercase', fontWeight: 700, marginBottom: '0.5rem' }}>Firm Type</div>
                  <h3 className="c-title-5">{ft.title}</h3>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ============================================================ */}
      {/* 10. FINAL CTA (light, yellow top border)                     */}
      {/* ============================================================ */}
      <section className="c-section" style={{ borderTop: '4px solid var(--lightmode--primary, #e7e70d)' }}>
        <div className="c-container cc-8cols" style={{ alignItems: 'center', textAlign: 'center' }}>
          <h2 className="c-title-2" style={{ marginBottom: '1rem' }}>
            {doc.ctaH2 ? stripHtml(doc.ctaH2) : 'Ready to get started?'}
          </h2>
          {doc.ctaBody && (
            <p className="c-text-3" style={{ marginBottom: '3rem', color: 'var(--lightmode--onsurface-weak)' }}>
              {stripHtml(doc.ctaBody)}
            </p>
          )}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap', marginBottom: '3rem' }}>
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
              <CtaButton label={stripHtml(doc.ctaTertiaryLabel)} href="/enterprise" variant="outline" />
            )}
          </div>

          {/* Trust badges */}
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
