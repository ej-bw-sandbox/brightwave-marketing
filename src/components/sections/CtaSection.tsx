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

export function CtaSection({
  headline,
  subheadline,
  body,
  ctas = [],
}: CtaSectionProps) {
  return (
    <section className="c-section">
      <div className="c-container">
        <div className="v-48">
          <div className="v-12">
            <h2 className="c-title-3">
              {headline}
            </h2>
            {subheadline && (
              <p className="c-text-3">{subheadline}</p>
            )}
            {body && (
              <p className="c-text-4">{body}</p>
            )}
          </div>
          {(ctas ?? []).length > 0 && (
            <div className="buttons">
              {(ctas ?? []).map((cta, i) => {
                const isPrimary = cta.style !== 'secondary' && cta.style !== 'ghost'
                return (
                  <Link
                    key={i}
                    href={cta.url}
                    className={isPrimary ? 'cta-p-sm w-inline-block' : 'cta-p-sm cc-stroke w-inline-block'}
                    {...(cta.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
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
          )}
        </div>
      </div>
    </section>
  )
}
