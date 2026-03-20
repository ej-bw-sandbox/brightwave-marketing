import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Virtual Events | Brightwave',
  description: 'Webinars, workshops, and virtual events from Brightwave.',
}

export default function VirtualEventsPage() {
  return (
    <section className="c-section cc-hero">
      <div className="c-container">
        <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
          <h1 className="c-title-3 text-bw-gray-800">Virtual Events</h1>
        </div>
        <p className="c-text-3 text-bw-gray-500 mt-10 max-w-text">
          Webinars, workshops, and virtual events. Check back soon for upcoming events.
        </p>
      </div>
    </section>
  )
}
