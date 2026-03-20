import { client } from '@/lib/sanity/client'
import { CaseStudyCard } from '@/components/sections/CaseStudyCard'
import { Hero } from '@/components/sections/Hero'
import { CtaSection } from '@/components/sections/CtaSection'
import type { Metadata } from 'next'

const caseStudiesQuery = `{
  "featured": *[_type == "caseStudy" && isFeatured == true][0]{
    title, slug, excerpt, thumbnail, companyLogo, industry, firmSize, isFeatured,
    statsLight, category->{ title }
  },
  "studies": *[_type == "caseStudy"] | order(publishedAt desc) {
    title, slug, excerpt, thumbnail, companyLogo, industry, firmSize,
    isFeaturedGrid, statsLight, category->{ title }
  }
}`

export const metadata: Metadata = {
  title: 'Case Studies',
  description: 'See how investment firms use Brightwave to accelerate research and due diligence.',
}

export default async function CaseStudiesPage() {
  let data: { featured?: any; studies?: any[] } = {}
  try {
    data = await client.fetch(caseStudiesQuery, {}, { next: { tags: ['caseStudy'] } }) ?? {}
  } catch {
    data = {}
  }

  const featured = data.featured
  const studies = data.studies ?? []

  return (
    <>
      <Hero
        headline="Case Studies"
        subheadline="See how leading investment firms use Brightwave to transform their research workflows."
        size="default"
        gradient={false}
      />

      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {featured && (
          <div className="mb-12">
            <CaseStudyCard
              title={featured.title}
              slug={featured.slug?.current || ''}
              excerpt={featured.excerpt}
              thumbnail={featured.thumbnail}
              companyLogo={featured.companyLogo}
              industry={featured.industry}
              firmSize={featured.firmSize}
              statsLight={featured.statsLight}
              isFeatured
            />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {studies
            .filter((s: any) => s.slug?.current !== featured?.slug?.current)
            .map((study: any) => (
              <CaseStudyCard
                key={study.slug?.current}
                title={study.title}
                slug={study.slug?.current || ''}
                excerpt={study.excerpt}
                thumbnail={study.thumbnail}
                companyLogo={study.companyLogo}
                industry={study.industry}
                firmSize={study.firmSize}
                statsLight={study.statsLight}
              />
            ))}
        </div>

        {studies.length === 0 && (
          <p className="text-text-muted text-center py-12">No case studies found.</p>
        )}
      </section>

      <CtaSection
        headline="See Brightwave in action"
        subheadline="Schedule a personalized demo to see how Brightwave can work for your firm."
        ctas={[{ label: 'Get a Demo', url: '/contact', style: 'primary' }]}
        variant="brand"
      />
    </>
  )
}
