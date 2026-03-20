import { client } from '@/lib/sanity/client'
import { aboutQuery } from '@/lib/sanity/queries/about'
import { buildMetadata } from '@/lib/metadata'
import { CtaSection } from '@/components/sections/CtaSection'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(aboutQuery, {}, { next: { tags: ['aboutPage'] } })
  return buildMetadata({
    title: 'About',
    description: page?.seo?.metaDescription || 'Learn about Brightwave and our mission.',
    seo: page?.seo,
    path: '/about',
  })
}

export default async function AboutPage() {
  const page = await client.fetch(aboutQuery, {}, { next: { tags: ['aboutPage'] } })

  return (
    <>
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
            <h1 className="c-title-1 text-bw-gray-800">
              {page?.headline || 'About Brightwave'}
            </h1>
          </div>
          {page?.story && (
            <div className="mt-10">
              <p className="c-text-3 text-bw-gray-500 max-w-text">{page.story}</p>
            </div>
          )}
          {!page?.story && (
            <div className="mt-10">
              <p className="c-text-3 text-bw-gray-500 max-w-text">
                Brightwave builds AI-powered research tools for investment professionals. We are on a mission to give every financial professional access to world-class research capabilities.
              </p>
            </div>
          )}
        </div>
      </section>

      {page?.mission && (
        <section className="c-section">
          <div className="c-container">
            <div className="eyebrow">
              <div className="block cc-primary" />
              <span className="c-title-5">Our Mission</span>
            </div>
            <p className="c-text-1 text-bw-gray-800 mt-8">{page.mission}</p>
          </div>
        </section>
      )}

      <CtaSection
        headline="Be part of Brightwave"
        subheadline="We are always looking for talented people to join our team."
        ctas={[
          { label: 'View Careers', url: 'https://www.linkedin.com/company/brightwaveio/jobs/', style: 'primary' },
          { label: 'Contact Us', url: '/contact', style: 'secondary' },
        ]}
        variant="brand"
      />
    </>
  )
}
