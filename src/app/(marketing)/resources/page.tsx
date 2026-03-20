import { client } from '@/lib/sanity/client'
import { Hero } from '@/components/sections/Hero'
import { CtaSection } from '@/components/sections/CtaSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Guides, whitepapers, and resources for financial research teams.',
}

const query = `*[_type == "resourceItem"] | order(title asc) { _id, title, slug, subtitle, resourceType }`

export default async function ResourcesIndexPage() {
  let data: any[] = []
  try {
    data = await client.fetch(query, {}, { next: { tags: ['resourceItem'] } }) ?? []
  } catch {
    data = []
  }

  return (
    <>
      <Hero
        headline="Resources"
        subheadline="Guides, whitepapers, and resources for financial research teams."
        size="default"
        gradient={false}
      />

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {(data ?? []).map((item: any) => (
            <a key={item._id} href={`/resources/${item.slug?.current || ''}`} className="group block rounded-xl border border-border bg-surface-card p-6 card-hover">
              {item.resourceType && (
                <span className="inline-block rounded-full bg-brand-400/10 px-3 py-1 text-xs font-medium text-brand-400 mb-3">
                  {item.resourceType}
                </span>
              )}
              <h3 className="text-lg font-semibold text-text-primary group-hover:text-brand-400 transition-colors">{item.title}</h3>
              {item.subtitle && <p className="mt-2 text-sm text-text-secondary line-clamp-2">{item.subtitle}</p>}
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
          { label: 'Schedule a Demo', url: '/contact', style: 'primary' as const },
        ]}
        variant="brand"
      />
    </>
  )
}
