import { client } from '@/lib/sanity/client'
import { pricingQuery } from '@/lib/sanity/queries/pricing'
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(pricingQuery, {}, { next: { tags: ['pricingPage'] } })
  return buildMetadata({
    title: 'Pricing',
    description: page?.seo?.metaDescription || '',
    seo: page?.seo,
    path: '/pricing',
  })
}

export default async function PricingPage() {
  const page = await client.fetch(pricingQuery, {}, { next: { tags: ['pricingPage'] } })

  return (
    <section className="py-24 max-w-5xl mx-auto px-4">
      <h1 className="text-4xl font-bold">{page?.headline || 'Pricing'}</h1>
    </section>
  )
}
