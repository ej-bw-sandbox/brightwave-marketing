import { client } from '@/lib/sanity/client'
import { blogIndexQuery } from '@/lib/sanity/queries/blog'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
}

export default async function BlogIndexPage() {
  const data = await client.fetch(blogIndexQuery, { offset: 0, limit: 20 }, { next: { tags: ['blogPost'] } })

  return (
    <section className="py-24 max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-12">Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Content cards will render here */}
      </div>
    </section>
  )
}
