import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'
import { Button } from '@/components/ui/button'

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

export function Hero({
  headline,
  subheadline,
  body,
  eyebrow,
  ctas = [],
  image,
  videoUrl,
  align = 'center',
  size = 'default',
  gradient = true,
}: HeroProps) {
  const isCenter = align === 'center'
  const isLarge = size === 'large'

  return (
    <section className="relative overflow-hidden">
      {gradient && (
        <div className="absolute inset-0 gradient-radial-glow pointer-events-none" />
      )}
      <div
        className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${
          isLarge ? 'py-24 sm:py-32 lg:py-40' : 'py-16 sm:py-20 lg:py-28'
        } ${isCenter ? 'text-center' : ''}`}
      >
        <div className={isCenter ? 'mx-auto max-w-4xl' : 'grid lg:grid-cols-2 gap-12 items-center'}>
          <div>
            {eyebrow && (
              <span className="inline-block text-sm font-medium tracking-wider uppercase text-brand-400 mb-4">
                {eyebrow}
              </span>
            )}
            <h1
              className={`font-bold tracking-tight text-text-primary ${
                isLarge ? 'text-4xl sm:text-5xl lg:text-6.5xl' : 'text-3xl sm:text-4xl lg:text-5xl'
              }`}
            >
              {headline}
            </h1>
            {subheadline && (
              <p
                className={`mt-6 text-text-secondary leading-relaxed ${
                  isLarge ? 'text-lg sm:text-xl max-w-2xl' : 'text-lg max-w-xl'
                } ${isCenter ? 'mx-auto' : ''}`}
              >
                {subheadline}
              </p>
            )}
            {body && (
              <p
                className={`mt-4 text-text-muted leading-relaxed ${
                  isCenter ? 'mx-auto max-w-2xl' : 'max-w-xl'
                }`}
              >
                {body}
              </p>
            )}
            {ctas.length > 0 && (
              <div className={`mt-8 flex gap-4 ${isCenter ? 'justify-center' : ''}`}>
                {ctas.map((cta, i) => (
                  <Button
                    key={i}
                    variant={cta.style === 'secondary' ? 'secondary' : cta.style === 'ghost' ? 'ghost' : 'default'}
                    size="lg"
                    asChild
                  >
                    <Link href={cta.url}>{cta.label}</Link>
                  </Button>
                ))}
              </div>
            )}
          </div>

          {(image || videoUrl) && !isCenter && (
            <div className="relative">
              {image?.asset && (
                <Image
                  src={urlFor(image).width(800).quality(90).url()}
                  alt=""
                  width={800}
                  height={500}
                  className="rounded-xl border border-border"
                  priority
                />
              )}
            </div>
          )}
        </div>

        {(image || videoUrl) && isCenter && image?.asset && (
          <div className="mt-16 mx-auto max-w-5xl">
            <Image
              src={urlFor(image).width(1200).quality(90).url()}
              alt=""
              width={1200}
              height={675}
              className="rounded-xl border border-border shadow-2xl shadow-black/50"
              priority
            />
          </div>
        )}
      </div>
    </section>
  )
}
