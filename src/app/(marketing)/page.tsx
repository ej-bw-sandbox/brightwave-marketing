import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { homepageQuery } from '@/lib/sanity/queries/homepage'
import { buildMetadata } from '@/lib/metadata'
import { LottiePlayer } from '@/components/ui/LottiePlayer'
import { LogoMarquee } from '@/components/ui/LogoMarquee'
import { TestimonialSlider } from '@/components/ui/TestimonialSlider'
import HeroPrompt from '@/components/sections/HeroPrompt'
import KeyFeatures from '@/components/sections/KeyFeatures'
import { LatestReleaseNotes, LatestBlogPosts } from '@/components/sections/LatestPosts'
import { HyperscaleAgentsSection } from '@/components/hyperscale-agents'

const fetchOptions = { next: { tags: ['homepage', 'testimonial'], revalidate: 60 } }

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(homepageQuery, {}, fetchOptions)
  if (!doc) return { title: 'Brightwave' }
  return buildMetadata({
    title: doc.heroHeadline || 'Brightwave',
    description: doc.heroSubheadline || '',
    seo: doc.seo,
    path: '/',
  })
}

/* ---------- inline SVGs used across CTAs ---------- */
function CtaArrowSvg() {
  return (
    <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_774_4073)">
        <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
        <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
      </g>
      <defs>
        <clipPath id="clip0_774_4073">
          <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function CtaButton({ label, url, style }: { label: string; url: string; style?: string }) {
  const isPrimary = style !== 'secondary'
  return (
    <>
      <a stagger-cta="" href={url} className={`cta-p-sm${isPrimary ? '' : ' cc-stroke'} w-inline-block`}>
        <div>
          <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{label}</div>
        </div>
        <div className="flip-small">
          <div className="flip-bg"></div>
        </div>
        <div className="flip-big">
          <div className="svg cta-sm-arrow w-embed"><CtaArrowSvg /></div>
        </div>
      </a>
      <link rel="prefetch" href={url} />
    </>
  )
}

export default async function HomePage() {
  let doc: any = null
  try {
    doc = await client.fetch(homepageQuery, {}, fetchOptions)
  } catch {
    doc = null
  }

  if (!doc) return null

  const heroCtas = doc.heroCtas ?? []
  const comparisonSection = doc.comparisonSection
  const leftStats = comparisonSection?.leftStats ?? []
  const rightStats = comparisonSection?.rightStats ?? []
  const beforeAfter = doc.beforeAfter
  const beforeItems = beforeAfter?.beforeItems ?? []
  const afterItems = beforeAfter?.afterItems ?? []
  const exploreTitleLines = doc.exploreSectionTitleLines ?? []
  const explorePlatformCards = doc.explorePlatformCards ?? []

  return (
    <>
      {/* ========== HERO ========== */}
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="hero">
            {doc.heroHeadline && <h1 className="c-title-1">{doc.heroHeadline}</h1>}
          </div>
          <div className="grid">
            <div id="w-node-a3cb6969-1e3a-7786-457c-fdbdb4350bc1-f86f60fa" className="hero_text cc-top">
              {doc.heroSubheadline && (
                <div inject-tablet="hero" className="c-text-3 u-balance">{doc.heroSubheadline}<br /></div>
              )}
            </div>
            <div id="w-node-f2725423-f2dc-ef11-7810-6f4d54fb4c8e-f86f60fa" className="hero_text cc-buttons">
              <div className="h-20 cc-hero">
                {heroCtas.map((cta: any, i: number) => (
                  <CtaButton key={cta._key ?? i} label={cta.label} url={cta.url} style={cta.style} />
                ))}
              </div>
            </div>
          </div>
          <HeroPrompt />
          <div lottie-bg="" className="lottie-reverse">
            <div className="learning-lottie">
              <div lottie-bg="" className="lottie-crop">
                <LottiePlayer src="/webflow-documents/CTA-Lottie-25.json" className="lottie_cropped-desktop" />
                <LottiePlayer src="/webflow-documents/Generative-Loop-Final-25.json" className="lottie_cropped-mobile" />
              </div>
            </div>
          </div>

          {/* ========== COMPARISON STATS ========== */}
          {comparisonSection && (
            <div className="v-20 cc-home">
              <div className="home-usp cc-left">
                {comparisonSection.leftLabel && (
                  <div className="eyebrow cc-no-bp">
                    <div className="block cc-dm-light"></div>
                    <div className="c-title-5">{comparisonSection.leftLabel}</div>
                  </div>
                )}
                <div className="home-usp_inner">
                  {leftStats.map((s: any, i: number) => (
                    <div key={s._key ?? i} className="v-24 cc-12-tablet">
                      {s.value && <div className="c-title-3">{s.value}</div>}
                      {s.description && <div className="c-text-4">{s.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="home-usp cc-right">
                {comparisonSection.rightLabel && (
                  <div className="eyebrow cc-no-bp">
                    <div className="block cc-primary"></div>
                    <div className="c-title-5 cc-primary">{comparisonSection.rightLabel}</div>
                  </div>
                )}
                <div className="home-usp_inner">
                  {rightStats.map((s: any, i: number) => (
                    <div key={s._key ?? i} className="v-24 cc-12-tablet">
                      {s.value && <div className="c-title-3">{s.value}</div>}
                      {s.description && <div className="c-text-4">{s.description}</div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
        </div>
      </section>


      {/* ========== HYPERSCALE AGENTS ========== */}
      <HyperscaleAgentsSection />

      {/* ========== SOCIAL PROOF LOGOS ========== */}
      <section className="c-section cc-logos">
        <div className="c-container">
          <div className="grid">
            {doc.socialProofHeadline && (
              <div id="w-node-_9b9ddfcb-6d2a-87a1-d17c-e9f678accebf-f86f60fa" className="c-title-5 u-balance">{doc.socialProofHeadline}</div>
            )}
            <div id="w-node-_14d87916-2524-3389-bb0c-e4ab4b8cf925-f86f60fa">
              <LogoMarquee
                speed={40}
                pauseOnHover
                logos={[
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
                ]}
              />
            </div>
          </div>
        </div>
      </section>

      {/* ========== KEY FEATURES ========== */}
      <section className="c-section">
        <div className="c-container">
          <KeyFeatures />
        </div>
      </section>

      {/* ========== BEFORE / AFTER TABLE ========== */}
      {beforeAfter && (
        <section className="c-section">
          <div className="c-container">
            <div className="usp-tables">
              <div className="usp-table">
                <div className="usp-table_top">
                  {beforeAfter.beforeTitle && (
                    <div className="c-title-4 cc-white-dynamic">{beforeAfter.beforeTitle}</div>
                  )}
                </div>
                <div className="usp-table_bottom">
                  {beforeItems.map((item: string, i: number) => (
                    <div key={i}>
                      <div className="c-text-3">{item}</div>
                      {i < beforeItems.length - 1 && <div className="c-line"></div>}
                    </div>
                  ))}
                </div>
              </div>
              <div className="usp-table">
                <div className="usp-table_top cc-brigtwave">
                  {beforeAfter.afterTitle && (
                    <div className="c-title-4 cc-dark">{beforeAfter.afterTitle}</div>
                  )}
                </div>
                <div className="usp-table_bottom">
                  {afterItems.map((item: string, i: number) => (
                    <div key={i}>
                      <div className="c-text-3">{item}</div>
                      {i < afterItems.length - 1 && <div className="c-line"></div>}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ========== TESTIMONIALS ========== */}
      <section no-fade="" className="c-section">
        <div className="c-container">
          <div className="slider-wrap">
            <img width="294.5" loading="lazy" alt="" src="/webflow-images/testimonial.svg" className="slider_img" />
            <LottiePlayer src="/webflow-documents/Testimonial-BG-25.json" className="slider_lottie" />
            {(doc.testimonials ?? []).length > 0 ? (
              <TestimonialSlider
                label={doc.testimonialsSectionLabel}
                testimonials={(doc.testimonials ?? []).map((t: any) => ({
                  eyebrow: t.authorTitle && t.company
                    ? `${t.authorTitle}, ${t.company}`
                    : t.attribution || undefined,
                  quote: t.quote,
                  attribution: t.authorName || undefined,
                }))}
              />
            ) : (
              <div className="slider w-dyn-list">
                <div className="w-dyn-empty">
                  <div>No testimonials yet.</div>
                </div>
              </div>
            )}
            <div className="slider_test">
              {doc.testimonialsSectionLabel && (
                <div className="c-title-5"><span className="hide-tablet">Customer </span>{doc.testimonialsSectionLabel}</div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ========== EXPLORE THE PLATFORM ========== */}
      <section className="c-section">
        <div className="c-container">
          <div className="v-60">
            <div>
              <div className="learning-lottie">
                <div lottie-bg="" className="lottie-crop">
                  <LottiePlayer src="/webflow-documents/CTA-Lottie-25.json" className="lottie_cropped-desktop" />
                  <LottiePlayer src="/webflow-documents/Generative-Loop-Final-25.json" className="lottie_cropped-mobile" />
                </div>
              </div>
            </div>
            {exploreTitleLines.length > 0 && (
              <div className="titles">
                {exploreTitleLines.map((line: any, li: number) => (
                  <div key={line._key ?? li} className={`title_flex${li > 0 ? ' cc-explore' : ''}`}>
                    {(line.segments ?? []).map((seg: any, si: number) => (
                      <div key={seg._key ?? si} className={`c-title-cta${seg.style === 'muted' ? ' cc-new-grey' : ''}`}>{seg.text}</div>
                    ))}
                  </div>
                ))}
              </div>
            )}
            <div className="h-flex-20">
              {explorePlatformCards.map((card: any, i: number) => (
                <div key={card._key ?? i} className="explore-item">
                  <div className="aspect-16-9">
                    <div className="u-relative">
                      {card.lightImage && <img src={card.lightImage} loading="lazy" width={70} light-asset="" alt="" className="image-abso" />}
                      {card.darkImage && <img src={card.darkImage} loading="lazy" width={70} dark-asset="" alt="" className="image-abso" />}
                    </div>
                  </div>
                  <div className="v-64 cc-fill">
                    <div className="v-20 cc-explore">
                      {card.title && <div className="c-title-3">{card.title}</div>}
                      {card.description && <div className="c-text-4">{card.description}</div>}
                    </div>
                    {card.ctaUrl && card.ctaLabel && (
                      <a stagger-cta="" href={card.ctaUrl} className="cta-p-sm w-inline-block">
                        <div>
                          <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{card.ctaLabel}</div>
                        </div>
                        <div className="flip-small">
                          <div className="flip-bg"></div>
                        </div>
                        <div className="flip-big">
                          <div className="svg cta-sm-arrow w-embed"><CtaArrowSvg /></div>
                        </div>
                      </a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <LatestReleaseNotes />
      <LatestBlogPosts />
    </>
  )
}
