import { client } from '@/lib/sanity/client'
import { Hero } from '@/components/sections/Hero'
import { CtaSection } from '@/components/sections/CtaSection'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Resources',
  description: 'Guides, whitepapers, and resources for financial research teams.',
}

const query = `*[_type == "resourceItem"] | order(title asc) { _id, title, slug, subtitle, resourceType }`

/** Safely extract a plain-text string from a value that may be a Portable Text array. */
function toPlainText(value: unknown): string {
  if (!value) return ''
  if (typeof value === 'string') return value
  if (Array.isArray(value)) {
    return value
      .map((block: any) =>
        block?.children?.map((child: any) => child?.text ?? '').join('') ?? ''
      )
      .join(' ')
  }
  return ''
}

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
          {(data ?? []).map((item: any) => {
            const subtitle = toPlainText(item.subtitle)
            return (
              <a key={item._id} href={`/resources/${item.slug?.current || ''}`} className="group block rounded-xl border border-bw-gray-200 bg-bw-gray-700 p-6 card-hover">
                {item.resourceType && (
                  <span className="inline-block rounded-full bg-bw-yellow-500/10 px-3 py-1 text-xs font-medium text-bw-yellow-500 mb-3">
                    {item.resourceType}
                  </span>
                )}
                <h3 className="text-lg font-semibold text-bw-gray-800 group-hover:text-bw-yellow-500 transition-colors">{item.title}</h3>
                {subtitle && <p className="mt-2 text-sm text-bw-gray-600 line-clamp-2">{subtitle}</p>}
              </a>
            )
          })}
        </div>
        {(data ?? []).length === 0 && (
          <p className="text-bw-gray-500 text-center py-12">No items found.</p>
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
