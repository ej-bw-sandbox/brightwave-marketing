import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { LottiePlayer } from '@/components/ui/LottiePlayer'
import { AbmRoiCalculator } from '@/components/sections/AbmRoiCalculator'
import { urlFor } from '@/lib/sanity/image'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Challenge {
  _key?: string
  title: string
  description: string
  solution: string
}

interface TimelineItem {
  _key?: string
  title: string
  description?: string
  beforeLabel?: string
  beforeValue?: string
  afterLabel?: string
  afterValue?: string
  timeSaved?: string
  problems?: string[]
}

interface TimelinePhase {
  _key?: string
  phase: string
  description?: string
  items?: TimelineItem[]
}

interface CaseStudySummary {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  industry?: string
  thumbnail?: { asset?: { url: string; metadata?: { lqip?: string } } }
  companyLogo?: { asset?: { url: string } }
}

interface BlogPostSummary {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  publishedAt?: string
  coverImage?: { asset?: { url: string; metadata?: { lqip?: string } } }
  author?: { name: string }
}

interface AbmPage {
  _id: string
  title: string
  slug: { current: string }
  companyName: string
  companyDomain: string
  companyLogo?: { asset?: { url: string } }
  companyLogoUrl?: string
  primaryBrandColor: string
  secondaryBrandColor?: string
  heroTitle: string
  heroSubtitle: string
  challenges: Challenge[]
  ctaPrimaryText: string
  ctaSecondaryText: string
  demoUrl: string
  contactUrl: string
  socialProofText?: string
  timelineHeadline?: string
  timelineSubheadline?: string
  timelinePhases?: TimelinePhase[]
  competitiveHeadline?: string
  competitiveBody?: string
  finalCtaHeadline: string
  finalCtaSubheadline: string
  competitorNames: string
  seo?: {
    metaTitle?: string
    metaDescription?: string
    noIndex?: boolean
  }
}

/* ------------------------------------------------------------------ */
/*  GROQ queries                                                       */
/* ------------------------------------------------------------------ */

const abmPageQuery = `*[_type == "abmPage" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  companyName,
  companyDomain,
  companyLogo{ asset->{ url } },
  companyLogoUrl,
  primaryBrandColor,
  secondaryBrandColor,
  heroTitle,
  heroSubtitle,
  challenges[]{ _key, title, description, solution },
  ctaPrimaryText,
  ctaSecondaryText,
  demoUrl,
  contactUrl,
  socialProofText,
  timelineHeadline,
  timelineSubheadline,
  timelinePhases[]{ _key, phase, description, items[]{ _key, title, description, beforeLabel, beforeValue, afterLabel, afterValue, timeSaved, problems } },
  competitiveHeadline,
  competitiveBody,
  finalCtaHeadline,
  finalCtaSubheadline,
  competitorNames,
  seo
}`

const abmSlugsQuery = `*[_type == "abmPage" && defined(slug.current)]{ "slug": slug.current }`

const caseStudiesQuery = `*[_type == "caseStudy"] | order(publishedAt desc) [0..3]{
  _id, title, slug, excerpt, industry,
  thumbnail{ asset->{ url, metadata { lqip } } },
  companyLogo{ asset->{ url } }
}`

const blogPostsQuery = `*[_type == "contentPost" && defined(publishedAt)] | order(publishedAt desc) [0..2]{
  _id, title, slug, excerpt, publishedAt,
  coverImage{ asset->{ url, metadata { lqip } } },
  author->{ name }
}`

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function getLogoUrl(page: AbmPage): string | null {
  return page.companyLogo?.asset?.url || page.companyLogoUrl || null
}

/* ------------------------------------------------------------------ */
/*  Static params + metadata                                           */
/* ------------------------------------------------------------------ */

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(abmSlugsQuery)
  return (slugs ?? []).map((s) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const page = await client.fetch<AbmPage | null>(abmPageQuery, { slug })
  if (!page) return {}
  return {
    title: page.seo?.metaTitle || `${page.companyName} + Brightwave`,
    description: page.seo?.metaDescription || page.heroSubtitle,
    robots: page.seo?.noIndex ? 'noindex, nofollow' : undefined,
  }
}

/* ------------------------------------------------------------------ */
/*  Reusable SVG icons                                                 */
/* ------------------------------------------------------------------ */

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <g clipPath="url(#clip0_774_4073)">
        <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
        <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
      </g>
      <defs>
        <clipPath id="clip0_774_4073">
          <rect width="12" height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)" />
        </clipPath>
      </defs>
    </svg>
  )
}

function BrightwaveIcon() {
  return (
    <svg width="100%" height="100%" viewBox="0 0 15 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M11.0631 8.24795V11.6458L10.6197 12.0987L6.84961 8.24795C6.84961 8.05359 6.84961 7.94459 6.84961 7.75024L11.4371 3.06457L11.5085 2.99165C11.6279 2.94114 11.7336 2.89634 11.853 2.84583H14.1303C14.3206 3.04018 14.4278 3.14943 14.6183 3.34378V7.25377C14.4285 7.44763 14.3223 7.55613 14.1325 7.74999H11.5504L11.0631 8.2477V8.24795Z" fill="#0F0F0F" />
      <path d="M0 2.84589L0.434168 2.39895L2.78627 4.80139C3.05525 4.80139 3.20655 4.80139 3.47553 4.80139L6.01817 2.20435L8.17634 0H8.86535L11.0635 2.24516V2.74287L10.9626 2.84589L6.50569 7.39818L6.30396 7.60423L5.95945 7.75006H0.488013C0.29773 7.5557 0.191015 7.4467 0.000731636 7.25235V7.24439" fill="#0F0F0F" />
      <path d="M0 8.75335V13.1518L0.436117 13.5973L2.78627 11.1968C3.05525 11.1968 3.20655 11.1968 3.47553 11.1968L6.49936 14.2854L8.17828 16C8.44751 16 8.59832 16 8.8673 16L11.0635 13.7568V13.2551L10.9626 13.1521L6.50569 8.5998L6.30396 8.39375C6.18457 8.34324 6.07883 8.29844 5.95945 8.24792H0.488013C0.29773 8.44228 0.191015 8.55128 0.000731636 8.74563V8.7536L0 8.75335Z" fill="#0F0F0F" />
      <path d="M12.0376 8.24792H14.1309C14.3212 8.44228 14.4279 8.55128 14.6182 8.74563V12.6541C14.4279 12.8485 14.3212 12.9575 14.1309 13.1518H12.0376L11.5503 12.6541V8.74563L12.0376 8.24792Z" fill="#0F0F0F" />
    </svg>
  )
}

function ShieldIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M12 2L3 7V12C3 17.55 6.84 22.74 12 24C17.16 22.74 21 17.55 21 12V7L12 2ZM10 17L6 13L7.41 11.59L10 14.17L16.59 7.58L18 9L10 17Z" fill="currentColor"/>
    </svg>
  )
}

function LockIcon() {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M18 8H17V6C17 3.24 14.76 1 12 1C9.24 1 7 3.24 7 6V8H6C4.9 8 4 8.9 4 10V20C4 21.1 4.9 22 6 22H18C19.1 22 20 21.1 20 20V10C20 8.9 19.1 8 18 8ZM12 17C10.9 17 10 16.1 10 15C10 13.9 10.9 13 12 13C13.1 13 14 13.9 14 15C14 16.1 13.1 17 12 17ZM15 8H9V6C9 4.34 10.34 3 12 3C13.66 3 15 4.34 15 6V8Z" fill="currentColor"/>
    </svg>
  )
}

/* ------------------------------------------------------------------ */
/*  CTA button pair (used in hero, challenges, final CTA)              */
/* ------------------------------------------------------------------ */

function CtaButtons({
  primaryText,
  secondaryText,
  demoUrl,
  contactUrl,
  variant = 'default',
}: {
  primaryText: string
  secondaryText: string
  demoUrl: string
  contactUrl: string
  variant?: 'default' | 'dark'
}) {
  return (
    <>
      <a stagger-cta="" href={demoUrl} className="cta-p-sm w-inline-block">
        <div>
          <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{primaryText}</div>
        </div>
        <div className="flip-small">
          <div className="flip-bg" />
        </div>
        <div className="flip-big">
          <div className="svg cta-sm-arrow w-embed"><ArrowIcon /></div>
        </div>
      </a>
      {variant === 'dark' ? (
        <div className="u-dark-mode">
          <a stagger-cta="" href={contactUrl} className="cta-p-sm cc-stroke w-inline-block">
            <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{secondaryText}</div>
            <div className="flip-small">
              <div className="flip-bg" />
            </div>
            <div className="flip-big">
              <div className="svg cta-sm-arrow w-embed"><ArrowIcon /></div>
            </div>
          </a>
        </div>
      ) : (
        <a stagger-cta="" href={contactUrl} className="cta-p-sm cc-stroke w-inline-block">
          <div stagger-cta-text="" className="c-text-link cc-stagger-cta" style={{ color: 'var(--lightmode--onsurface)' }}>{secondaryText}</div>
          <div className="flip-small">
            <div className="flip-bg" />
          </div>
          <div className="flip-big">
            <div className="svg cta-sm-arrow w-embed"><ArrowIcon /></div>
          </div>
        </a>
      )}
    </>
  )
}

/* ------------------------------------------------------------------ */
/*  Section: Hero                                                      */
/* ------------------------------------------------------------------ */

function HeroSection({ page }: { page: AbmPage }) {
  const logoUrl = getLogoUrl(page)

  return (
    <section className="c-section cc-abm-template-hero">
      <div className="c-container">
        <div className="c-abm-template_grid cc-rel">
          <div className="c-abm-template_hero-content">
            <div className="c-abm-template_hero_title-wrapper">
              <h1 className="c-title-2 cc-lh-edit">{page.heroTitle}</h1>
            </div>
            <div className="c-abm-template_hero-content-wrapper">
              <div className="c-abm-template_text-stack">
                <div className="c-abm-template_hero_text-wrapper">
                  <p className="c-text-3 cc-small--tweak cc-weight-500">{page.heroSubtitle}</p>
                </div>
              </div>
              <div className="c-abm-template_hero-button-group">
                <CtaButtons
                  primaryText={page.ctaPrimaryText}
                  secondaryText={page.ctaSecondaryText}
                  demoUrl={page.demoUrl}
                  contactUrl={page.contactUrl}
                />
              </div>
              {page.socialProofText && (
                <div className="w-embed">
                  <p className="c-text-4">{page.socialProofText}</p>
                </div>
              )}
            </div>
          </div>
          <div className="c-abm-hero_dual-block">
            <div className="c-box-hero_top-left" />
            <div className="c-box-hero_top-right" />
            <div className="c-box-hero_bottom-left" />
            <div className="c-box-hero_bottom-right" />
            <div className="c-abm-hero_icon-combo">
              <div className="c-abm-hero_icon">
                <div className="c-abm-hero_image-wrapper">
                  {logoUrl ? (
                    <img
                      src={logoUrl}
                      loading="lazy"
                      width={193}
                      alt={`${page.companyName} logo`}
                      className="c-abm-hero_image cc-brand"
                    />
                  ) : (
                    <img
                      src="/webflow-images/substack-frame.png"
                      loading="lazy"
                      width={193}
                      alt=""
                      className="c-abm-hero_image cc-brand"
                    />
                  )}
                </div>
              </div>
              <div className="c-abm-hero_icon-line">
                <div className="c-abm-hero_line" />
              </div>
              <div className="c-abm-hero_icon">
                <div className="c-abm-hero_image-wrapper">
                  <img
                    src="/webflow-images/brightwave_tile.png"
                    loading="lazy"
                    width={193}
                    alt="Brightwave"
                    className="c-abm-hero_image"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section A: Press / Media Marquee                                   */
/* ------------------------------------------------------------------ */

function PressMarquee() {
  const marqueeStyle = `
:root {
  --marquee-gap: 5rem;
  --marquee-duration: 30s;
  --marquee-scroll-start: 0;
  --marquee-scroll-end: calc(-50% - (var(--marquee-gap) / 2));
}
@media (max-width: 767px) {
  :root { --marquee-gap: 2.5rem; }
}
.marquee-press {
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--marquee-gap);
  mask-image: linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0));
}
.marquee-press__group {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--marquee-gap);
  min-width: 100%;
  animation: scroll-press-x var(--marquee-duration) linear infinite;
}
@keyframes scroll-press-x {
  from { transform: translateX(var(--marquee-scroll-start)); }
  to { transform: translateX(var(--marquee-scroll-end)); }
}
`

  const logos = [
    { src: '/webflow-images/fortune.avif', width: 105.5, alt: 'Fortune' },
    { src: '/webflow-images/axios.avif', width: 93.5, alt: 'Axios' },
    { src: '/webflow-images/american-banker.avif', width: 214, alt: 'American Banker' },
    { src: '/webflow-images/wjs-pro.avif', width: 126.5, alt: 'WSJ Pro' },
    { src: '/webflow-images/tech-crunch.avif', width: 126.5, alt: 'TechCrunch' },
    { src: '/webflow-images/fox-business.avif', width: 120, alt: 'Fox Business' },
    { src: '/webflow-images/gdf.avif', width: 100, alt: 'GDF' },
  ]

  return (
    <section className="c-section" style={{ paddingTop: '2rem', paddingBottom: '2rem' }}>
      <div className="c-container">
        <div className="small-marquee_wrapper">
          <div className="small-marquee_header">
            <div className="c-title-5">Featured in renowned publications and trusted by industry leaders.</div>
          </div>
          <div className="marquee-horizontal">
            <div className="w-embed">
              <style dangerouslySetInnerHTML={{ __html: marqueeStyle }} />
            </div>
            <div className="marquee-press">
              {[false, true].map((ariaHidden, gi) => (
                <div key={gi} className="marquee-press__group" {...(ariaHidden ? { 'aria-hidden': 'true' } : {})}>
                  {logos.map((logo, li) => (
                    <div key={li} className="marquee-logo">
                      <img src={logo.src} loading="lazy" width={logo.width} alt={logo.alt} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section B: Trust Badges                                            */
/* ------------------------------------------------------------------ */

function TrustBadges() {
  const badges = [
    { icon: <ShieldIcon />, label: 'SOC 2 Type II', description: 'Certified' },
    { icon: <LockIcon />, label: 'SSO', description: 'Enterprise SSO' },
    { icon: <ShieldIcon />, label: 'Encryption', description: 'AES-256 at rest & in transit' },
    { icon: <LockIcon />, label: 'GDPR / CCPA', description: 'Compliant' },
  ]

  return (
    <section className="c-section" style={{ paddingTop: '1.5rem', paddingBottom: '1.5rem' }}>
      <div className="c-container">
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '3rem',
          flexWrap: 'wrap',
        }}>
          {badges.map((badge, i) => (
            <div
              key={i}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '.75rem',
                opacity: 0.7,
              }}
            >
              <div style={{ width: '1.5rem', height: '1.5rem', color: 'var(--lightmode--onsurface, #0f0f0f)' }}>
                {badge.icon}
              </div>
              <div>
                <div className="c-text-5" style={{ fontWeight: 600 }}>{badge.label}</div>
                <div className="c-text-6" style={{ opacity: 0.7 }}>{badge.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section: Logo Marquee / IRP Banner                                 */
/* ------------------------------------------------------------------ */

function MarqueeBanner() {
  const marqueeStyle = `
:root {
  --gap: 5rem;
  --duration: 30s;
  --scroll-start: 0;
  --scroll-end: calc(-50% - (var(--gap) / 2));
}
@media (max-width: 767px) {
  :root { --gap: 2.5rem; }
}
.marquee {
  display: flex;
  overflow: hidden;
  user-select: none;
  gap: var(--gap);
  mask-image: linear-gradient(to right, hsl(0 0% 0% / 0), hsl(0 0% 0% / 1) 20%, hsl(0 0% 0% / 1) 80%, hsl(0 0% 0% / 0));
}
.marquee__group {
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: space-around;
  gap: var(--gap);
  min-width: 100%;
  animation: scroll-x var(--duration) linear infinite;
}
@keyframes scroll-x {
  from { transform: translateX(var(--scroll-start)); }
  to { transform: translateX(var(--scroll-end)); }
}
`

  const logos = [
    { src: '/webflow-images/fortune.avif', width: 105.5, alt: 'Fortune' },
    { src: '/webflow-images/axios.avif', width: 93.5, alt: 'Axios' },
    { src: '/webflow-images/american-banker.avif', width: 214, alt: 'American Banker' },
    { src: '/webflow-images/wjs-pro.avif', width: 126.5, alt: 'WSJ Pro' },
    { src: '/webflow-images/tech-crunch.avif', width: 126.5, alt: 'TechCrunch' },
  ]

  return (
    <section className="c-section cc-irp-banner">
      <div className="c-container cc-small-marquee">
        <div className="small-marquee_wrapper">
          <div className="small-marquee_header">
            <div className="c-title-5">Featured in renowned publications and trusted by industry leaders.</div>
          </div>
          <div className="marquee-horizontal">
            <div className="marquee-horizontal-alt-css w-embed">
              <style dangerouslySetInnerHTML={{ __html: marqueeStyle }} />
            </div>
            <div className="marquee">
              {[false, true].map((ariaHidden, gi) => (
                <div key={gi} className="marquee__group" {...(ariaHidden ? { 'aria-hidden': 'true' } : {})}>
                  {logos.map((logo, li) => (
                    <div key={li} className="marquee-logo">
                      <img src={logo.src} loading="lazy" width={logo.width} alt={logo.alt} />
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section: Lottie divider                                            */
/* ------------------------------------------------------------------ */

function LottieDivider() {
  return (
    <section className="c-section cc-abm-lottie-thin">
      <div className="c-container">
        <div>
          <div className="lottie-crop">
            <LottiePlayer
              src="/webflow-documents/Generative-Loop-Final-25.json"
              className="lottie_cropped-desktop"
              loop={true}
              autoplay={true}
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section: Challenges & Solutions                                    */
/* ------------------------------------------------------------------ */

function ChallengesSection({ page }: { page: AbmPage }) {
  return (
    <section className="c-section cc-abm-temp-chal">
      <div className="c-container">
        <div className="c-abm-temp_chal_main-wrapper">
          <div className="c-abm-temp-chal_header-wrapper">
            <div className="c-abm-temp-chal_header">
              <div className="c-amb-temp-chal_box" />
              <div className="c-title-5">Challenges and Solutions</div>
            </div>
          </div>
          <div className="c-abm-temp-chal_card-wrapper c-abm-template_grid">
            <div className="c-amb-temp-chal_sticky">
              <div className="c-abm-temp-chal_title-wrapper">
                <h2 className="c-title-3">We Know What Keeps You Up at Night</h2>
              </div>
              <div className="c-abm-temp-chal_button-wrapper">
                <CtaButtons
                  primaryText={page.ctaPrimaryText}
                  secondaryText={page.ctaSecondaryText}
                  demoUrl={page.demoUrl}
                  contactUrl={page.contactUrl}
                />
              </div>
            </div>
            <div className="c-abm-temp-chal_card-list">
              {(page.challenges ?? []).map((challenge, i) => (
                <div key={challenge._key || i}>
                  <div className="c-abm-temp-chal_card">
                    <div className="c-abm-temp-chal_card-content">
                      <div className="c-text-3 cc-500">{challenge.title}</div>
                      <div className="c-text-5">{challenge.description}</div>
                    </div>
                    <div className="c-abm-temp-chal_card-highlight">
                      <div className="c-abm-temp-chal_card-icon-wrapper">
                        <div className="c-abm-temp-chal_icon w-embed"><BrightwaveIcon /></div>
                      </div>
                      <div className="c-abm-temp-chal_card-text-stack">
                        <div className="c-abm-temp-chal_card-title-wrapper">
                          <div className="c-text-4 cc-weight-500">How Brightwave Helps:</div>
                        </div>
                        <div className="c-abm-temp-chal_card-text-wrapper">
                          <p className="c-text-5">{challenge.solution}</p>
                        </div>
                      </div>
                      <div className="c-abm-temp-chal_card-top-box" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section C: Case Studies Grid                                       */
/* ------------------------------------------------------------------ */

function CaseStudiesSection({ studies }: { studies: CaseStudySummary[] }) {
  if (!studies || studies.length === 0) return null

  return (
    <section className="c-section cc-abm-studies" style={{ display: 'block' }}>
      <div className="c-container">
        <div className="c-abm-studies_header-wrapper">
          <h2 className="c-title-3">Real Results from Real Firms</h2>
          <p className="c-text-4" style={{ marginTop: '.75rem' }}>
            See how leading investment firms are transforming their workflows with Brightwave.
          </p>
        </div>
        <div className="c-abm-studies_wrapperr" style={{ marginTop: '2.5rem' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
            gap: '1.25rem',
          }}>
            {studies.map((study) => (
              <a
                key={study._id}
                href={`/case-studies/${study.slug.current}`}
                className="card w-inline-block"
                style={{ textDecoration: 'none' }}
              >
                <div className="aspect-4-3">
                  {study.thumbnail?.asset?.url ? (
                    <img
                      src={study.thumbnail.asset.url}
                      loading="lazy"
                      alt={study.title}
                      className="img-cover"
                    />
                  ) : (
                    <div style={{ width: '100%', height: '100%', background: 'var(--lightmode--surface-1, #f5f5f5)' }} />
                  )}
                </div>
                <div className="card_flex">
                  {study.companyLogo?.asset?.url && (
                    <img
                      src={study.companyLogo.asset.url}
                      loading="lazy"
                      alt=""
                      style={{ height: '1.25rem', width: 'auto', opacity: 0.7, marginBottom: '.5rem' }}
                    />
                  )}
                  <div className="c-title-5">{study.title}</div>
                  {study.industry && (
                    <div className="c-text-6" style={{ marginTop: '.25rem' }}>{study.industry}</div>
                  )}
                  {study.excerpt && (
                    <div className="c-text-5" style={{ marginTop: '.5rem', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {study.excerpt}
                    </div>
                  )}
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section D: Deal Impact Timeline                                    */
/* ------------------------------------------------------------------ */

const DEFAULT_TIMELINE_PHASES: TimelinePhase[] = [
  {
    phase: 'Sourcing',
    description: 'Identify and evaluate potential deals faster.',
    items: [
      {
        title: 'Market Screening',
        description: 'Automated market and sector analysis to surface high-potential targets.',
        beforeLabel: 'Traditional',
        beforeValue: '2-3 weeks',
        afterLabel: 'With Brightwave',
        afterValue: '2-3 days',
        timeSaved: '80% faster',
        problems: ['Manual research across dozens of databases', 'Inconsistent screening criteria'],
      },
      {
        title: 'Target Identification',
        description: 'AI-powered target identification based on your investment thesis.',
        beforeLabel: 'Traditional',
        beforeValue: '1-2 weeks',
        afterLabel: 'With Brightwave',
        afterValue: '1-2 days',
        timeSaved: '75% faster',
        problems: ['Limited coverage of potential targets', 'Reliance on existing networks'],
      },
    ],
  },
  {
    phase: 'Due Diligence',
    description: 'Comprehensive analysis with greater depth and speed.',
    items: [
      {
        title: 'Financial Analysis',
        description: 'Automated financial modeling and benchmarking against industry peers.',
        beforeLabel: 'Traditional',
        beforeValue: '3-4 weeks',
        afterLabel: 'With Brightwave',
        afterValue: '3-5 days',
        timeSaved: '80% faster',
        problems: ['Manual data entry and spreadsheet modeling', 'Limited comparable company analysis'],
      },
      {
        title: 'Risk Assessment',
        description: 'AI-driven risk identification across regulatory, market, and operational dimensions.',
        beforeLabel: 'Traditional',
        beforeValue: '2-3 weeks',
        afterLabel: 'With Brightwave',
        afterValue: '2-3 days',
        timeSaved: '85% faster',
        problems: ['Incomplete risk coverage', 'Delayed identification of red flags'],
      },
    ],
  },
  {
    phase: 'Financing',
    description: 'Accelerate capital structure analysis and lender outreach.',
    items: [
      {
        title: 'Capital Structure Analysis',
        description: 'Optimal financing structure recommendations based on deal specifics.',
        beforeLabel: 'Traditional',
        beforeValue: '1-2 weeks',
        afterLabel: 'With Brightwave',
        afterValue: '1-2 days',
        timeSaved: '75% faster',
        problems: ['Manual comparison of financing alternatives', 'Slow lender feedback loops'],
      },
    ],
  },
  {
    phase: 'Post-Closing',
    description: 'Hit the ground running with day-one insights.',
    items: [
      {
        title: 'Integration Planning',
        description: 'AI-generated integration playbooks based on best practices and deal specifics.',
        beforeLabel: 'Traditional',
        beforeValue: '4-6 weeks',
        afterLabel: 'With Brightwave',
        afterValue: '1 week',
        timeSaved: '75% faster',
        problems: ['Generic integration templates', 'Missed synergy opportunities'],
      },
    ],
  },
  {
    phase: 'Ownership',
    description: 'Ongoing portfolio monitoring and value creation.',
    items: [
      {
        title: 'Portfolio Monitoring',
        description: 'Real-time performance tracking and early warning system for portfolio companies.',
        beforeLabel: 'Traditional',
        beforeValue: 'Monthly reviews',
        afterLabel: 'With Brightwave',
        afterValue: 'Real-time',
        timeSaved: 'Continuous',
        problems: ['Delayed performance visibility', 'Reactive rather than proactive management'],
      },
    ],
  },
]

function TimelineSection({ page }: { page: AbmPage }) {
  const headline = page.timelineHeadline || 'Deal Impact Timeline'
  const subheadline = page.timelineSubheadline || 'See how Brightwave accelerates every phase of the deal lifecycle - from sourcing to ownership.'
  const phases = (page.timelinePhases && page.timelinePhases.length > 0) ? page.timelinePhases : DEFAULT_TIMELINE_PHASES

  return (
    <section className="c-section cc-abm-timeline">
      <div className="c-container">
        <div className="c-abm-temp-tl_main-wrapper">
          {/* Header */}
          <div className="c-abm-temp-tl_header-wrapper">
            <div className="c-abm-temp-tl_header-inner-wrapper c-abm-template_grid">
              <div style={{ gridColumn: 'span 4' }}>
                <div className="c-abm-temp-tl_support-wrapper">
                  <h2 className="c-title-3">{headline}</h2>
                  <div className="c-abm-temp-tl_text-wrapper">
                    <p className="c-text-4">{subheadline}</p>
                  </div>
                </div>
              </div>
              <div style={{ gridColumn: 'span 3' }}>
                <div className="c-abm-temp-tl_impact-wrapper">
                  <div className="c-abm-temp-tl_impact-item">
                    <div className="c-abm-temp-tl_impact-box" />
                    <div className="c-text-5">High time investment</div>
                  </div>
                  <div className="c-abm-temp-tl_impact-item">
                    <div className="c-abm-temp-tl_impact-box cc-dark" />
                    <div className="c-text-5">With Brightwave</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline phases */}
          <div className="c-abm-temp-tl_wrapper">
            {phases.map((phase, pi) => (
              <div key={phase._key || pi} className="c-abm-temp-tl_item-wrapper c-abm-template_grid">
                {/* Left column - phase label */}
                <div className="c-abm-temp-tl_item_left" style={{ gridColumn: 'span 2' }}>
                  <div className="c-abm-temp-tl_item-line">
                    <div className="c-abm-temp-tl_box" />
                    <div className="c-abm-temp-tl_line" />
                  </div>
                  <div className="c-abm-temp-tl_left-header-wrapper">
                    <div className="c-abm-temp-tl_phase-wrapper">
                      <div className="c-abm-temp_phase c-text-6">Phase {pi + 1}</div>
                    </div>
                    <h3 className="c-title-4">{phase.phase}</h3>
                    {phase.description && (
                      <p className="c-text-5" style={{ marginTop: '.5rem' }}>{phase.description}</p>
                    )}
                  </div>
                </div>

                {/* Right column - items */}
                <div className={`c-abm-temp-tl_item-list${pi === phases.length - 1 ? ' cc-no-spacing' : ''}`} style={{ gridColumn: 'span 5' }}>
                  {(phase.items ?? []).map((item, ii) => (
                    <div key={item._key || ii} className="c-abm-temp-tl_item">
                      <div className="c-abm-temp-tl-item_content">
                        <div className="c-abm-temo-tl-item_top">
                          <div className="c-text-3 cc-500">{item.title}</div>
                          {item.description && (
                            <div className="c-abm-temp-tl-item_text-wrapper">
                              <p className="c-text-5">{item.description}</p>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section F: Competitive Positioning                                 */
/* ------------------------------------------------------------------ */

function CompetitiveSection({ page }: { page: AbmPage }) {
  const competitors = page.competitorNames || 'the competition'
  const headline = page.competitiveHeadline || `Ready to beat ${competitors}?`
  const body = page.competitiveBody || `While others rely on outdated tools and manual processes, Brightwave gives your team an unfair advantage. Move faster, dig deeper, and close with more confidence than ${competitors}.`

  return (
    <section className="c-section" style={{ backgroundColor: 'var(--lightmode--onsurface, #0f0f0f)', color: '#fff', paddingTop: '5rem', paddingBottom: '5rem' }}>
      <div className="c-container">
        <div style={{ maxWidth: '48rem', margin: '0 auto', textAlign: 'center' }}>
          <h2 className="c-title-3" style={{ color: '#fff' }}>{headline}</h2>
          <p className="c-text-3" style={{ color: 'rgba(255,255,255,.7)', marginTop: '1.5rem' }}>{body}</p>
          <div style={{ marginTop: '2.5rem', display: 'flex', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <CtaButtons
              primaryText={page.ctaPrimaryText}
              secondaryText={page.ctaSecondaryText}
              demoUrl={page.demoUrl}
              contactUrl={page.contactUrl}
              variant="dark"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section G: Blog Cards                                              */
/* ------------------------------------------------------------------ */

function BlogSection({ posts }: { posts: BlogPostSummary[] }) {
  if (!posts || posts.length === 0) return null

  return (
    <section className="c-section cc-abm-blog">
      <div className="c-container">
        <div className="c-abm-studies_header-wrapper">
          <h2 className="c-title-3">Resources &amp; Insights</h2>
          <p className="c-text-4" style={{ marginTop: '.75rem' }}>
            Stay ahead with the latest research, guides, and analysis from the Brightwave team.
          </p>
        </div>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1.25rem',
          marginTop: '2.5rem',
        }}>
          {posts.map((post) => {
            const imgSrc = post.coverImage?.asset?.url || 'https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg'
            const formattedDate = post.publishedAt
              ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(new Date(post.publishedAt))
              : null

            return (
              <a
                key={post._id}
                href={`/blog/${post.slug.current}`}
                className="card w-inline-block"
                style={{ textDecoration: 'none' }}
              >
                <div className="aspect-4-3">
                  <img
                    src={imgSrc}
                    loading="lazy"
                    alt={post.title}
                    className="img-cover"
                  />
                </div>
                <div className="card_flex">
                  <div className="c-title-5">{post.title}</div>
                  {post.author && <div className="author-hide">{post.author.name}</div>}
                  {formattedDate && <div className="c-text-6">{formattedDate}</div>}
                </div>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Section: Final CTA                                                 */
/* ------------------------------------------------------------------ */

function FinalCtaSection({ page }: { page: AbmPage }) {
  return (
    <section className="c-section cc-amb-slider">
      <div className="c-container">
        <div className="c-abm-temp_cta-block_main-wrapper">
          <div className="c-abm-temp_content-wrapper">
            <div className="c-abm-temp_content">
              <div className="c-abm-temp_cta-block_title-wrapper">
                <div className="c-title-3 w-embed">
                  <h2 className="c-title-3">{page.finalCtaHeadline}</h2>
                </div>
              </div>
              <div className="c-abm-temp_cta-block_text-wrapper">
                <div className="c-text-3">{page.finalCtaSubheadline}</div>
              </div>
            </div>
            <div className="c-abm-temp-chal_button-wrapper">
              <CtaButtons
                primaryText={page.ctaPrimaryText}
                secondaryText={page.ctaSecondaryText}
                demoUrl={page.demoUrl}
                contactUrl={page.contactUrl}
                variant="dark"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

/* ------------------------------------------------------------------ */
/*  Page component                                                     */
/* ------------------------------------------------------------------ */

export default async function AbmSlugPage({ params }: PageProps) {
  const { slug } = await params
  const [page, caseStudies, blogPosts] = await Promise.all([
    client.fetch<AbmPage | null>(abmPageQuery, { slug }, { next: { tags: ['abmPage'] } }),
    client.fetch<CaseStudySummary[]>(caseStudiesQuery, {}, { next: { tags: ['caseStudy'] } }),
    client.fetch<BlogPostSummary[]>(blogPostsQuery, {}, { next: { tags: ['contentPost'] } }),
  ])

  if (!page) notFound()

  return (
    <>
      {/* 1. Hero */}
      <HeroSection page={page} />

      {/* A. Press / Media Marquee */}
      <PressMarquee />

      {/* B. Trust Badges */}
      <TrustBadges />

      {/* Lottie Divider */}
      <LottieDivider />

      {/* 4. Challenges & Solutions */}
      <ChallengesSection page={page} />

      {/* C. Case Studies Grid */}
      <CaseStudiesSection studies={caseStudies ?? []} />

      {/* D. Deal Impact Timeline */}
      <TimelineSection page={page} />

      {/* E. ROI Calculator */}
      <AbmRoiCalculator demoUrl={page.demoUrl} />

      {/* G. Blog / Content Resources */}
      <BlogSection posts={blogPosts ?? []} />

      {/* Final CTA slider */}
      <FinalCtaSection page={page} />
    </>
  )
}
