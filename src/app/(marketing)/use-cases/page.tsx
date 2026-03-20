import { client } from '@/lib/sanity/client'
import { CtaSection } from '@/components/sections/CtaSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Use Cases | Brightwave',
  description: 'Discover how Brightwave accelerates research workflows across investment activities.',
}

const useCasesQuery = `*[_type == "useCase"] | order(title asc) {
  _id, title, "slug": slug.current, tagline, eyebrow, excerpt
}`

export default async function UseCasesPage() {
  let data: any[] = []
  try {
    data = await client.fetch(useCasesQuery, {}, { next: { tags: ['useCase'] } }) ?? []
  } catch {
    data = []
  }

  return (
    <>
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
            <h1 className="c-title-3 text-bw-gray-800">Use Cases</h1>
          </div>
          <p className="c-text-3 text-bw-gray-500 mt-10">
            Discover how Brightwave accelerates research workflows across investment activities and market segments.
          </p>
        </div>
      </section>

      <section className="px-5 pb-20">
        <div className="mx-auto max-w-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(data ?? []).map((item: any) => (
              <Link
                key={item._id}
                href={`/use-cases/${item.slug || ''}`}
                className="group flex flex-col rounded-lg border border-bw-gray-200 bg-white p-6 transition-all hover:border-bw-gray-800 hover:bg-bw-gray-700"
              >
                <h3 className="text-lg font-semibold text-bw-gray-800 group-hover:text-white transition-colors">
                  {item.title}
                </h3>
                {(item.tagline || item.excerpt) && (
                  <p className="mt-2 text-sm text-bw-gray-500 line-clamp-2 group-hover:text-bw-gray-600 transition-colors">
                    {item.tagline || item.excerpt}
                  </p>
                )}
                <span className="mt-4 text-xs font-medium text-bw-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity group-hover:text-bw-yellow-500">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
          {(data ?? []).length === 0 && (
            <p className="text-bw-gray-500 text-center py-12">No use cases found.</p>
          )}
        </div>
      </section>

      <CtaSection
        headline="Ready to get started?"
        subheadline="See how Brightwave can transform your research workflow."
        ctas={[{ label: 'Schedule a Demo', url: '/contact', style: 'primary' }]}
        variant="brand"
      />
    </>
  )
}
