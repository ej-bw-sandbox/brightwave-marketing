import { client } from '@/lib/sanity/client'
import type { Metadata } from 'next'

const query = `*[_type == "enterpriseSalesPage"][0]{ heroHeadline, heroSubheadline, heroCtas, benefits, metrics, testimonials, seo }`

export const metadata: Metadata = {
  title: 'Enterprise',
  description: 'Enterprise-grade AI financial research for large organizations.',
}

export default async function EnterprisePage() {
  const page = await client.fetch(query, {}, { next: { tags: ['enterpriseSalesPage'] } })

  return (
    <section className="py-24 max-w-5xl mx-auto px-4">
      <h1 className="text-4xl font-bold">{page?.heroHeadline || 'Enterprise'}</h1>
    </section>
  )
}
