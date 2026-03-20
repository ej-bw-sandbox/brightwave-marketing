import { client } from '@/lib/sanity/client'
import { homepageQuery } from '@/lib/sanity/queries/homepage'
import { Hero } from '@/components/sections/Hero'
import { CtaSection } from '@/components/sections/CtaSection'
import { StatBar } from '@/components/sections/StatBar'
import { TestimonialGrid } from '@/components/sections/TestimonialGrid'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Research Agents for Professionals | Brightwave',
  description: 'Conduct in-depth research, screen thousands of documents, and build investment insights with AI-powered research agents.',
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
        headline={page?.heroHeadline || 'Research agents built for professionals.'}
        subheadline={page?.heroSubheadline || 'Conduct in-depth research, screen thousands of documents, and accelerate due diligence with AI-powered research and collaboration tools built for private markets.'}
        ctas={page?.heroCtas || [
          { label: 'Try for Free', url: '/contact', style: 'primary' as const },
          { label: 'Get a Demo', url: '/contact', style: 'secondary' as const },
        ]}
        image={page?.heroImage}
        size="large"
      />

      {/* Metrics / Social proof bar */}
      {page?.metrics && page.metrics.length > 0 && (
        <section className="border-t border-b border-bw-gray-200 py-12">
          <div className="mx-auto max-w-site px-5">
            <StatBar stats={page.metrics} />
          </div>
        </section>
      )}

      {/* Features section */}
      <section className="c-section">
        <div className="c-container">
          <div className="eyebrow">
            <div className="block cc-primary" />
            <span className="c-title-5">Platform Capabilities</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-8">
            {[
              { title: 'Presentations', desc: 'Build investor-grade decks from your research in minutes.', href: '/features/presentations' },
              { title: 'Extraction Grid', desc: 'Pull structured data from documents at scale.', href: '/features/extraction-grid' },
              { title: 'Web Search', desc: 'Real-time information retrieval integrated into your workflow.', href: '/features/web-search' },
              { title: 'Reports', desc: 'Generate deep analysis reports with AI-powered insights.', href: '/features/reports' },
              { title: 'Templates', desc: 'Reusable analysis blueprints for repeatable workflows.', href: '/features/templates' },
              { title: 'Team Collaboration', desc: 'Work together seamlessly across deal teams.', href: '/features/team-collaboration' },
            ].map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group flex flex-col gap-3 rounded-lg border border-bw-gray-200 bg-white p-6 transition-all hover:border-bw-gray-800 hover:bg-bw-gray-700 hover:text-white"
              >
                <h3 className="c-title-5 text-bw-gray-800 group-hover:text-white transition-colors">{f.title}</h3>
                <p className="c-text-5 text-bw-gray-500 group-hover:text-bw-gray-600 transition-colors">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      {page?.testimonials && page.testimonials.length > 0 ? (
        <TestimonialGrid
          headline="Trusted by Leading Investment Firms"
          testimonials={page.testimonials}
        />
      ) : (
        <section className="c-section">
          <div className="c-container">
            <div className="bg-black rounded-2xl relative overflow-hidden">
              <div className="flex flex-col gap-[6.75rem] text-[#d9d9d9] pt-[9.5rem] px-5 pb-5">
                <div className="flex flex-col gap-[3.75rem] max-w-[42.5rem]">
                  <div className="flex gap-2 items-center">
                    <div className="w-3 h-3 bg-bw-yellow-550" />
                    <span className="c-title-5 text-bw-yellow-550">Portfolio Manager, $4B Hedge Fund</span>
                  </div>
                  <p className="c-title-4 text-[#d9d9d9]">
                    &ldquo;Brightwave has fundamentally changed how our team conducts research. What used to take days now takes hours.&rdquo;
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Bottom CTA */}
      <CtaSection
        headline={page?.bottomCta?.headline || 'Ready to transform your research workflow?'}
        subheadline="See how Brightwave can accelerate your investment research."
        ctas={page?.bottomCta?.ctas || [
          { label: 'Schedule a Demo', url: '/contact', style: 'primary' as const },
          { label: 'Learn More', url: '/features', style: 'secondary' as const },
        ]}
        variant="brand"
      />
    </>
  )
}
