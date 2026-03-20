import { client } from '@/lib/sanity/client'
import { CtaSection } from '@/components/sections/CtaSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Firm Types | Brightwave',
  description: 'AI-powered research solutions built for your firm type.',
}

const firmTypesQuery = `*[_type == "firmType"] | order(title asc) {
  _id, title, "slug": slug.current, tagline, eyebrow, h1
}`

export default async function FirmTypesPage() {
  let data: any[] = []
  try {
    data = await client.fetch(firmTypesQuery, {}, { next: { tags: ['firmType'] } }) ?? []
  } catch {
    data = []
  }

  return (
    <>
      {/* Hero */}
      <section className="px-5 pt-24 pb-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-title-3 text-bw-gray-50 mb-4">
            Built for your firm type
          </h1>
          <p className="text-body-4 text-bw-gray-300 max-w-2xl mx-auto">
            AI-powered research solutions tailored to how your firm operates.
          </p>
        </div>
      </section>

      {/* Card grid */}
      <section className="px-5 pb-20">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {(data ?? []).map((item: any) => (
              <Link
                key={item._id}
                href={`/firm-types/${item.slug || ''}`}
                className="group flex flex-col rounded-xl border border-bw-gray-600 bg-bw-gray-700/50 p-6 transition-all hover:border-bw-gray-300 hover:bg-bw-gray-700"
              >
                <h3 className="text-lg font-semibold text-bw-gray-50 group-hover:text-bw-yellow-500 transition-colors">
                  {item.title}
                </h3>
                {(item.tagline || item.eyebrow) && (
                  <p className="mt-2 text-sm text-bw-gray-300 line-clamp-2">
                    {item.tagline || item.eyebrow}
                  </p>
                )}
                <span className="mt-4 text-xs font-medium text-bw-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
                  Learn more &rarr;
                </span>
              </Link>
            ))}
          </div>
          {(data ?? []).length === 0 && (
            <p className="text-bw-gray-300 text-center py-12">No firm types found.</p>
          )}
        </div>
      </section>

      <CtaSection
        headline="Ready to get started?"
        subheadline="See how Brightwave can transform your research workflow."
        ctas={[
          { label: 'Schedule a Demo', url: '/contact', style: 'primary' },
        ]}
        variant="brand"
      />
    </>
  )
}
