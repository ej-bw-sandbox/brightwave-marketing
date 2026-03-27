import { client } from '@/lib/sanity/client'
import { contentPostIndexQuery } from '@/lib/sanity/queries/content-posts'
import { ContentPostCard } from './ContentPostCard'

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
      {/* Hero */}
      <section className="c-section cc-template">
        <div className="c-container">
          <div className="bp40-underline">
            <h1 className="c-title-1">{headline}</h1>
          </div>
        </div>
      </section>

      <section className="c-section">
        <div className="c-container">
          {featured && (
            <div className="w-dyn-list">
              <div role="list" className="w-dyn-items">
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
            </div>
          )}

          {remaining.length > 0 && (
            <div className="collection">
              <div className="collection_list-wrap">
                <div className="collection_list">
                  <div role="list" className="grid cc-collection w-dyn-items">
                    {remaining.map((post: any) => (
                      <div
                        key={post.slug?.current}
                        role="listitem"
                        className="collection_card w-dyn-item"
                      >
                        <ContentPostCard
                          title={post.title}
                          slug={post.slug?.current || ''}
                          excerpt={post.excerpt}
                          coverImage={post.coverImage}
                          publishedAt={post.publishedAt}
                          author={post.author}
                          basePath={basePath}
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {posts.length === 0 && (
            <div className="w-dyn-empty">
              <div>{emptyMessage || 'No items found.'}</div>
            </div>
          )}
        </div>
      </section>
    </>
  )
}
