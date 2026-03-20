import { client } from '@/lib/sanity/client'
import { homepageQuery } from '@/lib/sanity/queries/homepage'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Brightwave - AI Financial Research',
  description: 'AI-powered financial research platform for investment professionals.',
}

export default async function HomePage() {
  const page = await client.fetch(homepageQuery, {}, { next: { tags: ['homepage'] } })

  return (
    <>
      <section className="py-24 text-center">
        <h1 className="text-5xl font-bold tracking-tight">{page?.heroHeadline}</h1>
        {page?.heroSubheadline && (
          <p className="mt-6 text-xl text-text-secondary max-w-2xl mx-auto">{page.heroSubheadline}</p>
        )}
      </section>
    </>
  )
}
