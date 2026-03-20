import { client } from '@/lib/sanity/client'
import { Hero } from '@/components/sections/Hero'
import { CtaSection } from '@/components/sections/CtaSection'
import type { Metadata }  from 'next'

export const metadata: Metadata = {
  title: 'News',
  description: 'The latest announcements and press coverage for Brightwave.',
}

const query = `*[_type == "newsPost"] | order(publishedAt desc) { _id, title, slug, publishedAt, excerpt, source }`

export default async function NewsIndexPage() {
  let data: any[] = []
  try {
    data = await client.fetch(query, {}, { next: { tags: ['newsPost'] } }) ?? []
  } catch {
    data = []
  }

  return (
    <>
      <Hero
        headline="News"
        subheadline="The latest announcements and press coverage for Brightwave."
        size="default"
        gradient={false}
      />

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
        {(data ?? []).map((item: any) => (
          <a key={item._id} href={`/news/${item.slug?.current || ''}`} className="group block rounded-xl border border-bw-gray-600 bg-bw-gray-700 p-6 card-hover">
            <time className="text-xs text-bw-gray-300">{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</time>
            {item.source && <span className="ml-2 text-xs text-bw-yellow-500">{item.source}</span>}
            <h3 className="mt-2 text-lg font-semibold text-bw-gray-50 group-hover:text-bw-yellow-500 transition-colors">{item.title}</h3>
            {item.excerpt && <p className="mt-2 text-sm text-bw-gray-200 line-clamp-2">{item.excerpt}</p>}
          </a>
        ))}
        </div>
        {(data ?? []).length === 0 && (
          <p className="text-bw-gray-300 text-center py-12">No items found.</p>
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
