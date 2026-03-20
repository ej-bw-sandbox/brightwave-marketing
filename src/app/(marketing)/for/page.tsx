import { client } from '@/lib/sanity/client'
import { Hero } from '@/components/sections/Hero'
import { CtaSection } from '@/components/sections/CtaSection'
import type { Metadata }  from 'next'

export const metadata: Metadata = {
  title: 'Who We Serve',
  description: 'Brightwave is built for financial professionals across every role.',
}

const query = `*[_type == "icpPage"] | order(title asc) { _id, title, slug, tagline }`

export default async function ForIndexPage() {
  let data: any[] = []
  try {
    data = await client.fetch(query, {}, { next: { tags: ['icpPage'] } }) ?? []
  } catch {
    data = []
  }

  return (
    <>
      <Hero
        headline="Who We Serve"
        subheadline="Brightwave is built for financial professionals across every role."
        size="default"
        gradient={false}
      />

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
        {(data ?? []).map((item: any) => (
          <a key={item._id} href={`/for/${item.slug?.current || ''}`} className="group block rounded-xl border border-bw-gray-200 bg-bw-gray-700 p-6 card-hover">
            <h3 className="text-lg font-semibold text-bw-gray-800 group-hover:text-bw-yellow-500 transition-colors">{item.title}</h3>
            {item.tagline && <p className="mt-2 text-sm text-bw-gray-600 line-clamp-2">{item.tagline}</p>}
          </a>
        ))}
        </div>
        {(data ?? []).length === 0 && (
          <p className="text-bw-gray-500 text-center py-12">No items found.</p>
        )}
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
