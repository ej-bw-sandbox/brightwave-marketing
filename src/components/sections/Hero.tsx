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

function CtaSmArrow() {
  return (
    <div className="svg cta-sm-arrow w-embed">
      <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
        <g clipPath="url(#clip0_774_4073)">
          <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
          <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel"></path>
        </g>
        <defs>
          <clipPath id="clip0_774_4073">
            <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)"></rect>
          </clipPath>
        </defs>
      </svg>
    </div>
  )
}

export function Hero({
  headline,
  subheadline,
  body,
  eyebrow,
  ctas = [],
  image,
  size = 'default',
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
        <div className="bp40-underline">
          <h1 className={isLarge ? 'c-title-1' : 'c-title-3'}>
            {headline}
          </h1>
        </div>

        {/* Subheadline */}
        {subheadline && (
          <div className="hero_text cc-top">
            <p className="c-text-3 u-balance">
              {subheadline}
            </p>
          </div>
        )}
        {body && !subheadline && (
          <div className="hero_text cc-top">
            <p className="c-text-4">{body}</p>
          </div>
        )}

        {(ctas ?? []).length > 0 && (
          <div className="hero_text cc-buttons">
            <div className="h-20 cc-hero">
              {(ctas ?? []).map((cta, i) => {
                const isPrimary = cta.style !== 'secondary' && cta.style !== 'ghost'
                return (
                  <Link
                    key={i}
                    href={cta.url}
                    className={isPrimary ? 'cta-p-sm w-inline-block' : 'cta-p-sm cc-stroke w-inline-block'}
                  >
                    <div>
                      <div className="c-text-link cc-stagger-cta">{cta.label}</div>
                    </div>
                    <div className="flip-small">
                      <div className="flip-bg"></div>
                    </div>
                    <div className="flip-big">
                      <CtaSmArrow />
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        )}

        {/* Image (if provided) */}
        {image?.asset && (
          <div className="aspect-16-9 u-overflow-hidden">
            <Image
              src={urlFor(image).width(1400).quality(90).url()}
              alt=""
              width={1400}
              height={788}
              className="img-cover"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
