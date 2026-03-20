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
  let data: { posts?: any[]; total?: number; categories?: any[] } = {}
  try {
    data = await client.fetch(blogIndexQuery, { offset: 0, limit: 20 }, { next: { tags: ['blogPost'] } }) ?? {}
  } catch {
    data = {}
  }

  const posts = data.posts ?? []
  const featured = posts.length > 0 ? posts[0] : null
  const remaining = posts.slice(1)

  return (
    <>
      <Hero
        headline="Blog"
        subheadline="Insights on AI-powered financial research, due diligence, and investment analysis."
        size="default"
        gradient={false}
      />

      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {featured && (
          <div className="mb-12">
            <BlogCard
              title={featured.title}
              slug={featured.slug?.current || ''}
              excerpt={featured.excerpt}
              featuredImage={featured.featuredImage}
              publishedAt={featured.publishedAt}
              postType={featured.postType}
              author={featured.author}
              categories={featured.categories}
              variant="featured"
            />
          </div>
        )}

        {remaining.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((post: any) => (
              <BlogCard
                key={post.slug?.current}
                title={post.title}
                slug={post.slug?.current || ''}
                excerpt={post.excerpt}
                featuredImage={post.featuredImage}
                publishedAt={post.publishedAt}
                postType={post.postType}
                author={post.author}
                categories={post.categories}
              />
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <p className="text-bw-gray-300 text-center py-12">No blog posts found.</p>
        )}
      </section>
    </>
  )
}
