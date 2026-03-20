import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Tools & Guides | Brightwave',
  description: 'Practical tools and guides for investment research.',
}

export default function ToolsGuidesPage() {
  return (
    <section className="c-section cc-hero">
      <div className="c-container">
        <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
          <h1 className="c-title-3 text-bw-gray-800">Tools & Guides</h1>
        </div>
        <p className="c-text-3 text-bw-gray-500 mt-10 max-w-text">
          Practical tools and guides for investment professionals. Content coming soon.
        </p>
      </div>
    </section>
  )
}
