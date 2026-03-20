import { client } from '@/lib/sanity/client'
import { homepageQuery } from '@/lib/sanity/queries/homepage'
import { Hero } from '@/components/sections/Hero'
import { CtaSection } from '@/components/sections/CtaSection'
import { StatBar } from '@/components/sections/StatBar'
import { TestimonialGrid } from '@/components/sections/TestimonialGrid'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brightwave - AI Financial Research',
  description: 'AI-powered financial research platform for investment professionals.',
}

export default async function HomePage() {
  let page: any = null
  try {
    page = await client.fetch(homepageQuery, {}, { next: { tags: ['homepage'] } })
  } catch {
    page = null
  }

  return (
    <>
      <Hero
        headline={page?.heroHeadline || 'AI-Powered Financial Research'}
        subheadline={page?.heroSubheadline || 'Purpose-built for investment professionals. Analyze documents, monitor portfolios, and accelerate due diligence with AI.'}
        ctas={page?.heroCtas || [
          { label: 'Get a Demo', url: '/contact', style: 'primary' as const },
          { label: 'Learn More', url: '/features', style: 'secondary' as const },
        ]}
        image={page?.heroImage}
        size="large"
      />

      {page?.metrics && page.metrics.length > 0 && (
        <section className="border-t border-b border-bw-gray-600 py-12">
          <div className="mx-auto max-w-7xl px-4">
            <StatBar stats={page.metrics} />
          </div>
        </section>
      )}

      {page?.testimonials && page.testimonials.length > 0 && (
        <TestimonialGrid
          headline="Trusted by Leading Investment Firms"
          testimonials={page.testimonials}
        />
      )}

      <CtaSection
        headline={page?.bottomCta?.headline || 'Ready to transform your research workflow?'}
        subheadline="See how Brightwave can accelerate your investment research."
        ctas={page?.bottomCta?.ctas || [
          { label: 'Schedule a Demo', url: '/contact', style: 'primary' as const },
          { label: 'View Case Studies', url: '/case-studies', style: 'secondary' as const },
        ]}
        variant="brand"
      />
    </>
  )
}
