import { client } from '@/lib/sanity/client'
import { Hero } from '@/components/sections/Hero'
import { CtaSection } from '@/components/sections/CtaSection'
import type { Metadata }  from 'next'

export const metadata: Metadata = {
  title: 'Events',
  description: 'Join Brightwave webinars, workshops, and virtual events.',
}

const query = `*[_type == "virtualEvent"] | order(eventDate desc) { _id, title, slug, eventDate, description }`

export default async function EventsIndexPage() {
  let data: any[] = []
  try {
    data = await client.fetch(query, {}, { next: { tags: ['virtualEvent'] } }) ?? []
  } catch {
    data = []
  }

  return (
    <>
      <Hero
        headline="Events"
        subheadline="Join Brightwave webinars, workshops, and virtual events."
        size="default"
        gradient={false}
      />

      <section className="py-12 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
        {(data ?? []).map((item: any) => (
          <a key={item._id} href={`/events/${item.slug?.current || ''}`} className="group block rounded-xl border border-border bg-surface-card p-6 card-hover">
            <time className="text-xs text-text-muted">{item.eventDate ? new Date(item.eventDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }) : ''}</time>
            <h3 className="mt-2 text-lg font-semibold text-text-primary group-hover:text-brand-400 transition-colors">{item.title}</h3>
            {item.description && <p className="mt-2 text-sm text-text-secondary line-clamp-2">{item.description}</p>}
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
