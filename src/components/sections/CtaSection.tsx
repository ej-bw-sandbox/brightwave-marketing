import Link from 'next/link'

interface CtaButton {
  label: string
  url: string
  style?: 'primary' | 'secondary' | 'ghost'
  openInNewTab?: boolean
}

interface CtaSectionProps {
  headline: string
  subheadline?: string
  body?: string
  ctas?: CtaButton[]
  variant?: 'default' | 'brand' | 'subtle'
}

function ArrowIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 13L13 1M13 1H3M13 1V11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function CtaSection({
  headline,
  subheadline,
  body,
  ctas = [],
  variant = 'default',
}: CtaSectionProps) {
  const variantStyles = {
    default: 'bg-bw-gray-75 border-t border-b border-bw-gray-200',
    brand: 'bg-bw-gray-75 border-t border-b border-bw-gray-200',
    subtle: 'bg-white',
  }

  return (
    <section className={`c-section ${variantStyles[variant]}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="c-title-3 text-bw-gray-800">
          {headline}
        </h2>
        {subheadline && (
          <p className="mt-4 c-text-4 text-bw-gray-500">{subheadline}</p>
        )}
        {body && (
          <p className="mt-3 text-bw-gray-500 max-w-2xl mx-auto">{body}</p>
        )}
        {(ctas ?? []).length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-2.5">
            {(ctas ?? []).map((cta, i) => {
              const isPrimary = cta.style !== 'secondary' && cta.style !== 'ghost'
              return (
                <Link
                  key={i}
                  href={cta.url}
                  className={isPrimary ? 'cta-primary' : 'cta-outline'}
                  {...(cta.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
            })}
          </div>
        )}
      </div>
    </section>
  )
}
