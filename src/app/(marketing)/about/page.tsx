import { client } from '@/lib/sanity/client'
import { aboutQuery } from '@/lib/sanity/queries/about'
import { buildMetadata } from '@/lib/metadata'
import type { Metadata } from 'next'

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(aboutQuery, {}, { next: { tags: ['aboutPage'] } })
  return buildMetadata({
    title: 'About',
    description: page?.seo?.metaDescription || '',
    seo: page?.seo,
    path: '/about',
  })
}

export default async function AboutPage() {
  const page = await client.fetch(aboutQuery, {}, { next: { tags: ['aboutPage'] } })

  return (
    <section className="py-24 max-w-5xl mx-auto px-4">
      <h1 className="text-4xl font-bold">{page?.headline || 'About'}</h1>
    </section>
  )
}
