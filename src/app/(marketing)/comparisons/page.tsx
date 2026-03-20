import { client } from '@/lib/sanity/client'
import { comparisonIndexQuery } from '@/lib/sanity/queries/comparisons'
import { CtaSection } from '@/components/sections/CtaSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Comparisons | Brightwave',
  description: 'See how Brightwave compares to other platforms for financial research.',
}

export default async function ComparisonsPage() {
  let data: any[] = []
  try {
    data = await client.fetch(comparisonIndexQuery, {}, { next: { tags: ['comparison'] } }) ?? []
  } catch {
    data = []
  }

  return (
    <>
      {/* Hero */}
      <section className="px-5 pt-24 pb-16">
        <div className="c-container">
          <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
            <h1 className="c-title-3 text-bw-gray-800">Comparisons</h1>
          </div>
          <p className="c-text-3 text-bw-gray-500 mt-10">
            See how Brightwave stacks up against other tools for investment research.
          </p>
        </div>
      </section>

      {/* Card grid */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-site">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(data ?? []).map((item: any) => (
              <Link
                key={item.slug?.current || item.title}
                href={`/comparisons/${item.slug?.current || ''}`}
                className="group flex flex-col rounded-lg border border-bw-gray-200 bg-white p-6 transition-all hover:border-bw-gray-800 hover:bg-bw-gray-700"
              >
                <h3 className="text-lg font-semibold text-bw-gray-800 group-hover:text-white transition-colors">
                  {item.competitorName ? `Brightwave vs ${item.competitorName}` : item.title}
                </h3>
                {item.heroDescription && (
                  <p className="mt-2 text-sm text-bw-gray-500 line-clamp-2 group-hover:text-bw-gray-600 transition-colors">
                    {item.heroDescription}
                  </p>
                )}
                <span className="mt-4 text-xs font-medium text-bw-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity group-hover:text-bw-yellow-500">
                  Compare &rarr;
                </span>
              </Link>
            ))}
          </div>
          {(data ?? []).length === 0 && (
            <p className="text-bw-gray-500 text-center py-12">No comparisons available yet. Check back soon.</p>
          )}
        </div>
      </section>

      <CtaSection
        headline="See the difference for yourself"
        subheadline="Try Brightwave and experience the next generation of investment research."
        ctas={[
          { label: 'Start Free Trial', url: '/contact', style: 'primary' },
        ]}
        variant="brand"
      />
    </>
  )
}
