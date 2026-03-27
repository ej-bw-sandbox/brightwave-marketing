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
  const href = `/case-studies/${slug}`
  const stats = statsLight?.stats || []

  if (isFeatured) {
    return (
      <Link
        href={href}
        className="group block rounded-lg overflow-hidden card-hover md:grid md:grid-cols-2 md:gap-0"
        style={{ backgroundColor: 'var(--lightmode--surface-1)', border: '1px solid var(--lightmode--onsurface-border)' }}
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
              <span className="text-xs font-medium rounded-full px-3 py-1" style={{ color: 'var(--lightmode--onsurface-weak)', backgroundColor: 'var(--lightmode--surface-2)' }}>
                {industry}
              </span>
            )}
          </div>
          <h3 className="text-2xl font-bold group-hover:text-bw-yellow-600 transition-colors" style={{ color: 'var(--lightmode--onsurface)' }}>
            {title}
          </h3>
          {excerpt && (
            <p className="mt-3 line-clamp-3" style={{ color: 'var(--lightmode--onsurface-weak)' }}>{excerpt}</p>
          )}
          {(stats ?? []).length > 0 && (
            <div className="mt-6 flex gap-8">
              {(stats ?? []).map((stat, i) => (
                <div key={i}>
                  <div className="text-2xl font-bold" style={{ color: 'var(--lightmode--primary)' }}>{stat.value}</div>
                  <div className="text-xs mt-1" style={{ color: 'var(--lightmode--onsurface-weak)' }}>{stat.label}</div>
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
      className="group block rounded-lg overflow-hidden card-hover"
      style={{ backgroundColor: 'var(--lightmode--surface-1)', border: '1px solid var(--lightmode--onsurface-border)' }}
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
            <span className="text-xs" style={{ color: 'var(--lightmode--onsurface-weak)' }}>{industry}</span>
          )}
          {firmSize && (
            <span className="text-xs" style={{ color: 'var(--lightmode--onsurface-weak)' }}>{firmSize}</span>
          )}
        </div>
        <h3 className="font-semibold group-hover:text-bw-yellow-600 transition-colors" style={{ color: 'var(--lightmode--onsurface)' }}>
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm line-clamp-2" style={{ color: 'var(--lightmode--onsurface-weak)' }}>{excerpt}</p>
        )}
        {(stats ?? []).length > 0 && (
          <div className="mt-4 flex gap-6 pt-4" style={{ borderTop: '1px solid var(--lightmode--onsurface-border)' }}>
            {(stats ?? []).map((stat, i) => (
              <div key={i}>
                <div className="text-lg font-bold" style={{ color: 'var(--lightmode--primary)' }}>{stat.value}</div>
                <div className="text-xs" style={{ color: 'var(--lightmode--onsurface-weak)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        )}
      </div>
    </Link>
  )
}
