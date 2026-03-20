import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

interface StatItem {
  value: string
  label: string
  context?: string
}

interface FeatureCardProps {
  title: string
  slug: string
  tagline?: string
  heroH1?: string
  heroImage?: any
  stats?: StatItem[] | null
  tags?: string[] | null
}

function FeatureCard({ title, slug, tagline, heroH1, heroImage, stats, tags }: FeatureCardProps) {
  const safeTags = tags ?? []
  const safeStats = stats ?? []

  return (
    <Link
      href={`/features/${slug}`}
      className="group block rounded-xl border border-border bg-surface-card p-6 card-hover"
    >
      {heroImage?.asset && (
        <div className="mb-4 overflow-hidden rounded-lg">
          <Image
            src={urlFor(heroImage).width(600).height(340).quality(80).url()}
            alt={title}
            width={600}
            height={340}
            className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      {safeTags.length > 0 && (
        <div className="mb-3 flex flex-wrap gap-2">
          {safeTags.map((tag) => (
            <span
              key={tag}
              className="inline-block rounded-full bg-brand-400/10 px-3 py-1 text-xs font-medium text-brand-400"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
      <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand-400 transition-colors">
        {heroH1 || title}
      </h3>
      {tagline && (
        <p className="mt-2 text-sm text-text-secondary line-clamp-2">{tagline}</p>
      )}
      {safeStats.length > 0 && (
        <div className="mt-4 flex gap-6">
          {safeStats.slice(0, 3).map((stat, i) => (
            <div key={i}>
              <div className="text-lg font-bold text-brand-400">{stat.value}</div>
              <div className="text-xs text-text-muted">{stat.label}</div>
            </div>
          ))}
        </div>
      )}
    </Link>
  )
}

interface FeatureBlockProps {
  headline?: string
  subheadline?: string
  features: FeatureCardProps[]
  columns?: 2 | 3 | 4
}

export function FeatureBlock({
  headline,
  subheadline,
  features,
  columns = 3,
}: FeatureBlockProps) {
  const safeFeatures = features ?? []
  const gridCols: Record<number, string> = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-2 lg:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  }

  return (
    <section className="py-section">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {(headline || subheadline) && (
          <div className="mb-12 text-center">
            {headline && (
              <h2 className="text-3xl font-bold text-text-primary sm:text-4xl">{headline}</h2>
            )}
            {subheadline && (
              <p className="mt-4 text-lg text-text-secondary max-w-2xl mx-auto">{subheadline}</p>
            )}
          </div>
        )}
        <div className={`grid grid-cols-1 gap-6 ${gridCols[columns]}`}>
          {safeFeatures.map((feature) => (
            <FeatureCard key={feature.slug} {...feature} />
          ))}
        </div>
      </div>
    </section>
  )
}
