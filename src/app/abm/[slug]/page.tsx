import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { LottiePlayer } from '@/components/ui/LottiePlayer'

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */

interface Challenge {
  _key?: string
  title: string
  description: string
  solution: string
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
  finalCtaHeadline,
  finalCtaSubheadline,
  competitorNames,
  seo
}`

const abmSlugsQuery = `*[_type == "abmPage" && defined(slug.current)]{ "slug": slug.current }`

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
          <div stagger-cta-text="dark" className="c-text-link cc-stagger-cta">{secondaryText}</div>
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
                      src="/images/substack-frame.png"
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
                    src="/images/brightwave_tile.png"
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
    { src: '/images/fortune.avif', width: 105.5, alt: 'Fortune' },
    { src: '/images/axios.avif', width: 93.5, alt: 'Axios' },
    { src: '/images/american-banker.avif', width: 214, alt: 'American Banker' },
    { src: '/images/wjs-pro.avif', width: 126.5, alt: 'WSJ Pro' },
    { src: '/images/tech-crunch.avif', width: 126.5, alt: 'TechCrunch' },
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
  const page = await client.fetch<AbmPage | null>(
    abmPageQuery,
    { slug },
    { next: { tags: ['abmPage'] } }
  )

  if (!page) notFound()

  return (
    <>
      <HeroSection page={page} />
      <LottieDivider />
      <MarqueeBanner />
      <ChallengesSection page={page} />
      <FinalCtaSection page={page} />
    </>
  )
}
