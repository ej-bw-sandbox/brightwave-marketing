import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

interface StatItem {
  value: string
  label: string
}

interface CaseStudyCardProps {
  title: string
  slug: string
  excerpt?: string
  thumbnail?: any
  companyLogo?: any
  industry?: string
  firmSize?: string
  category?: { title: string }
  isFeatured?: boolean
  statsLight?: {
    context?: string
    stats?: StatItem[]
  }
}

export function CaseStudyCard({
  title,
  slug,
  excerpt,
  thumbnail,
  companyLogo,
  industry,
  firmSize,
  category,
  isFeatured,
  statsLight,
}: CaseStudyCardProps) {
  const href = `/case-studies/${typeof slug === 'string' ? slug : slug?.current || ''}`
  const stats = statsLight?.stats || []

  if (isFeatured) {
    return (
      <Link
        href={href}
        className="group block rounded-xl border border-border bg-surface-card overflow-hidden card-hover md:grid md:grid-cols-2 md:gap-0"
      >
        {thumbnail?.asset && (
          <div className="overflow-hidden">
            <Image
              src={urlFor(thumbnail).width(800).height(500).quality(85).url()}
              alt={title}
              width={800}
              height={500}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            {companyLogo?.asset && (
              <Image
                src={urlFor(companyLogo).height(32).url()}
                alt={title}
                width={80}
                height={32}
                className="h-8 w-auto opacity-80"
              />
            )}
            {industry && (
              <span className="text-xs font-medium text-text-muted bg-surface-overlay rounded-full px-3 py-1">
                {industry}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold text-text-primary group-hover:text-brand-400 transition-colors">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-3 text-text-secondary line-clamp-3">{excerpt}</p>
          )}
          {stats.length > 0 && (
            <div className="mt-6 flex gap-8">
              {stats.map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold text-brand-400">{stat.value}</div>
                  <div className="text-xs text-text-muted mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className="group block rounded-xl border border-border bg-surface-card overflow-hidden card-hover"
    >
      {thumbnail?.asset && (
        <div className="overflow-hidden aspect-video">
          <Image
            src={urlFor(thumbnail).width(600).height(340).quality(80).url()}
            alt={title}
            width={600}
            height={340}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 mb-3">
          {companyLogo?.asset && (
            <Image
              src={urlFor(companyLogo).height(20).url()}
              alt=""
              width={48}
              height={20}
              className="h-5 w-auto opacity-70"
            />
          )}
          {industry && (
            <span className="text-xs text-text-muted">{industry}</span>
          )}
          {firmSize && (
            <span className="text-xs text-text-muted">{firmSize}</span>
          )}
        </div>
        <h3 className="font-semibold text-text-primary group-hover:text-brand-400 transition-colors">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-text-secondary line-clamp-2">{excerpt}</p>
        )}
        {stats.length > 0 && (
          <div className="mt-4 flex gap-6 border-t border-border-subtle pt-4">
            {stats.map((stat, i) => (
              <div key={i}>
                <div className="text-lg font-bold text-brand-400">{stat.value}</div>
                <div className="text-xs text-text-muted">{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
