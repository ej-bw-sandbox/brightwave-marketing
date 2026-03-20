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
          <a key={item._id} href={`/for/${item.slug?.current || ''}`} className="group block rounded-xl border border-border bg-surface-card p-6 card-hover">
            <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand-400 transition-colors">{item.title}</h3>
            {item.tagline && <p className="mt-2 text-sm text-text-secondary line-clamp-2">{item.tagline}</p>}
          </a>
        ))}
        </div>
        {(data ?? []).length === 0 && (
          <p className="text-text-muted text-center py-12">No items found.</p>
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
