import { client } from '@/lib/sanity/client'
import { eventsIndexQuery } from '@/lib/sanity/queries/events'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Events',
}

export default async function EventsIndexPage() {
  const data = await client.fetch(eventsIndexQuery, { offset: 0, limit: 20 }, { next: { tags: ['virtualEvent'] } })

  return (
    <section className="py-24 max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-12">Events</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Content cards will render here */}
      </div>
    </section>
  )
}
