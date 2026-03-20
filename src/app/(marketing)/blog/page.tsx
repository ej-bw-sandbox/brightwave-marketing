import { client } from '@/lib/sanity/client'
import { blogIndexQuery } from '@/lib/sanity/queries/blog'
import { BlogCard } from '@/components/sections/BlogCard'
import { Hero } from '@/components/sections/Hero'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on AI-powered financial research, due diligence, and investment analysis.',
}

export default async function BlogIndexPage() {
  const data = await client.fetch(blogIndexQuery, { offset: 0, limit: 20 }, { next: { tags: ['blogPost'] } })

  const posts = data?.posts || []
  const featured = posts[0]
  const remaining = posts.slice(1)

  return (
    <>
      <Hero
        headline="Blog"
        subheadline="Insights on AI-powered financial research, due diligence, and investment analysis."
        size="default"
        gradient={false}
      />

      <section className="pb-section max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {featured && (
          <div className="mb-12">
            <BlogCard {...featured} slug={featured.slug?.current} variant="featured" />
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {remaining.map((post: any) => (
            <BlogCard
              key={post.slug?.current}
              {...post}
              slug={post.slug?.current}
            />
          ))}
        </div>
      </section>
    </>
  )
}
