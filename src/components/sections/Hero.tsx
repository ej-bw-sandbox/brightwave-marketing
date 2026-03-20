import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

interface HeroCta {
  label: string
  url: string
  style?: 'primary' | 'secondary' | 'ghost'
}

interface HeroProps {
  headline: string
  subheadline?: string
  body?: string
  eyebrow?: string
  ctas?: HeroCta[]
  image?: any
  videoUrl?: string
  align?: 'center' | 'left'
  size?: 'default' | 'large'
  gradient?: boolean
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

function CtaButton({ cta }: { cta: HeroCta }) {
  const isPrimary = cta.style !== 'secondary' && cta.style !== 'ghost'

  return (
    <Link
      href={cta.url}
      className={isPrimary ? 'cta-primary' : 'cta-outline'}
    >
      <span className="cta-label">{cta.label}</span>
      <div className="cta-dot">
        <div className="cta-dot-bg" />
      </div>
      <div className="cta-arrow-wrap">
        <span className="cta-arrow">
          <ArrowIcon />
        </span>
      </div>
    </Link>
  )
}

export function Hero({
  headline,
  subheadline,
  body,
  eyebrow,
  ctas = [],
  image,
  videoUrl,
  align = 'left',
  size = 'default',
  gradient = false,
}: HeroProps) {
  const isLarge = size === 'large'

  return (
    <section className="c-section cc-hero">
      <div className="c-container">
        {/* Eyebrow */}
        {eyebrow && (
          <div className="eyebrow cc-no-bp">
            <div className="block cc-primary" />
            <span className="c-title-5">{eyebrow}</span>
          </div>
        )}

        {/* Hero headline with bottom border */}
        <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
          <h1 className={isLarge ? 'c-title-1' : 'c-title-3'}>
            {headline}
          </h1>
        </div>

        {/* Subheadline + CTAs row */}
        <div className="grid grid-cols-1 lg:grid-cols-7 gap-5 mt-10">
          {subheadline && (
            <div className="lg:col-span-4">
              <p className="c-text-3 u-balance text-bw-gray-600">
                {subheadline}
              </p>
            </div>
          )}
          {body && !subheadline && (
            <div className="lg:col-span-4">
              <p className="c-text-4 text-bw-gray-500">{body}</p>
            </div>
          )}
        </div>

        {(ctas ?? []).length > 0 && (
          <div className="flex items-center gap-2.5 mt-6 mb-8 flex-wrap">
            {(ctas ?? []).map((cta, i) => (
              <CtaButton key={i} cta={cta} />
            ))}
          </div>
        )}

        {/* Image (if provided) */}
        {image?.asset && (
          <div className="mt-8 relative overflow-hidden rounded-lg">
            <Image
              src={urlFor(image).width(1400).quality(90).url()}
              alt=""
              width={1400}
              height={788}
              className="w-full h-auto"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
