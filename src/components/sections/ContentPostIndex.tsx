import { client } from '@/lib/sanity/client'
import { contentPostIndexQuery } from '@/lib/sanity/queries/content-posts'
import { ContentPostCard } from './ContentPostCard'
import { Hero } from './Hero'

interface ContentPostIndexProps {
  category: string
  basePath: string
  headline: string
  subheadline: string
  emptyMessage?: string
}

export async function ContentPostIndex({
  category,
  basePath,
  headline,
  subheadline,
  emptyMessage,
}: ContentPostIndexProps) {
  let data: { posts?: any[]; total?: number } = {}
  try {
    data =
      (await client.fetch(
        contentPostIndexQuery,
        { category, offset: 0, limit: 50 },
        { next: { tags: ['contentPost'] } }
      )) ?? {}
  } catch {
    data = {}
  }

  const posts = data.posts ?? []
  const featured = posts.length > 0 ? posts[0] : null
  const remaining = posts.slice(1)

  return (
    <>
      <Hero headline={headline} subheadline={subheadline} size="default" gradient={false} />

      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {featured && (
          <div className="mb-12">
            <ContentPostCard
              title={featured.title}
              slug={featured.slug?.current || ''}
              excerpt={featured.excerpt}
              coverImage={featured.coverImage}
              publishedAt={featured.publishedAt}
              author={featured.author}
              basePath={basePath}
              variant="featured"
            />
          </div>
        )}

        {remaining.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {remaining.map((post: any) => (
              <ContentPostCard
                key={post.slug?.current}
                title={post.title}
                slug={post.slug?.current || ''}
                excerpt={post.excerpt}
                coverImage={post.coverImage}
                publishedAt={post.publishedAt}
                author={post.author}
                basePath={basePath}
              />
            ))}
          </div>
        )}

        {posts.length === 0 && (
          <p className="text-bw-gray-300 text-center py-12">
            {emptyMessage || 'No posts found.'}
          </p>
        )}
      </section>
    </>
  )
}
