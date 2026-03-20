import Link from 'next/link'
import { Button } from '@/components/ui/button'

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

export function CtaSection({
  headline,
  subheadline,
  body,
  ctas = [],
  variant = 'default',
}: CtaSectionProps) {
  const variantStyles = {
    default: 'bg-surface-elevated border-t border-b border-border',
    brand: 'bg-gradient-to-br from-brand-600/20 via-surface-elevated to-surface-elevated border-t border-b border-brand-400/20',
    subtle: 'bg-surface',
  }

  return (
    <section className={`py-section ${variantStyles[variant]}`}>
      <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl font-bold text-text-primary sm:text-4xl tracking-tight">
          {headline}
        </h2>
        {subheadline && (
          <p className="mt-4 text-lg text-text-secondary">{subheadline}</p>
        )}
        {body && (
          <p className="mt-3 text-text-muted max-w-2xl mx-auto">{body}</p>
        )}
        {ctas.length > 0 && (
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            {ctas.map((cta, i) => (
              <Button
                key={i}
                variant={
                  cta.style === 'secondary'
                    ? 'secondary'
                    : cta.style === 'ghost'
                      ? 'ghost'
                      : 'default'
                }
                size="lg"
                asChild
              >
                <Link
                  href={cta.url}
                  {...(cta.openInNewTab ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
                >
                  {cta.label}
                </Link>
              </Button>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
