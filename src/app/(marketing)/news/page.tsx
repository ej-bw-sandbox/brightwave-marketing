import { client } from '@/lib/sanity/client'
import { newsIndexQuery } from '@/lib/sanity/queries/news'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News',
}

export default async function NewsIndexPage() {
  const data = await client.fetch(newsIndexQuery, { offset: 0, limit: 20 }, { next: { tags: ['newsPost'] } })

  return (
    <section className="py-24 max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-12">News</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Content cards will render here */}
      </div>
    </section>
  )
}
