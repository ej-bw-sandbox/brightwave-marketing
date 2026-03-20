import { client } from '@/lib/sanity/client'
import type { Metadata } from 'next'

const query = `*[_type == "securityPage" && pageVariant == "overview"][0]{ title, headline, subheadline, pillars, complianceBadges, faq, seo }`

export const metadata: Metadata = {
  title: 'Security',
  description: 'Learn about Brightwave security practices and compliance.',
}

export default async function SecurityPage() {
  const page = await client.fetch(query, {}, { next: { tags: ['securityPage'] } })

  return (
    <section className="py-24 max-w-5xl mx-auto px-4">
      <h1 className="text-4xl font-bold">{page?.headline || 'Security'}</h1>
    </section>
  )
}
