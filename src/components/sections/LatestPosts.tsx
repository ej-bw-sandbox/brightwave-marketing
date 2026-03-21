import Link from 'next/link'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'

const latestReleaseNotesQuery = `
  *[_type == "contentPost" && category == "release-notes" && defined(publishedAt)] | order(publishedAt desc) [0..2] {
    title, "slug": slug.current, publishedAt, excerpt,
    coverImage{ asset->{ _id, url, metadata { lqip, dimensions } } }
  }
`

const latestBlogPostsQuery = `
  *[_type == "contentPost" && category == "blog" && defined(publishedAt)] | order(publishedAt desc) [0..2] {
    title, "slug": slug.current, publishedAt, excerpt,
    coverImage{ asset->{ _id, url, metadata { lqip, dimensions } } }
  }
`

function formatDate(dateStr: string) {
  return new Date(dateStr).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  })
}

function PostCard({ post, categoryPath }: { post: any; categoryPath: string }) {
  const imgSrc = post.coverImage?.asset?.url
    ? urlFor(post.coverImage).width(600).height(450).url()
    : 'https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg'

  return (
    <div role="listitem" className="card_item w-dyn-item">
      <Link href={`/${categoryPath}/${post.slug}`} className="card w-inline-block">
        <div className="aspect-4-3">
          <img src={imgSrc} loading="lazy" alt={post.title || ''} className="img-cover" />
        </div>
        <div className="card_flex">
          <div className="c-title-5">{post.title}</div>
          <div className="c-text-6">{post.excerpt || ''}</div>
        </div>
      </Link>
    </div>
  )
}

export async function LatestReleaseNotes() {
  let posts: any[] = []
  try {
    posts = await client.fetch(latestReleaseNotesQuery, {}, { next: { tags: ['contentPost'], revalidate: 3600 } })
  } catch { posts = [] }

  return (
    <section className="c-section">
      <div className="c-container">
        <div className="founders">
          <div className="founders-flex">
            <h2 className="c-title-2">Feature Releases</h2>
          </div>
          <div className="w-dyn-list">
            {posts.length > 0 ? (
              <div role="list" className="grid cc-cards w-dyn-items">
                {posts.map((post: any) => (
                  <PostCard key={post.slug} post={post} categoryPath="release-notes" />
                ))}
              </div>
            ) : (
              <div className="w-dyn-empty">
                <div>No items found.</div>
              </div>
            )}
          </div>
          <div inject-tablet="founders" className="cta-founders">
            <Link href="/release-notes" className="cta-p-sm cc-stroke w-inline-block">
              <div className="c-text-link cc-stagger-cta">Read More</div>
              <div className="flip-small"><div className="flip-bg"></div></div>
              <div className="flip-big">
                <div className="svg cta-sm-arrow w-embed">
                  <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_774_4073)">
                      <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                      <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                    </g>
                    <defs>
                      <clipPath id="clip0_774_4073">
                        <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}

export async function LatestBlogPosts() {
  let posts: any[] = []
  try {
    posts = await client.fetch(latestBlogPostsQuery, {}, { next: { tags: ['contentPost'], revalidate: 3600 } })
  } catch { posts = [] }

  return (
    <section className="c-section">
      <div className="c-container">
        <div className="founders">
          <div className="founders-flex">
            <h2 className="c-title-2">Latest Posts</h2>
          </div>
          <div className="w-dyn-list">
            {posts.length > 0 ? (
              <div role="list" className="grid cc-cards w-dyn-items">
                {posts.map((post: any) => (
                  <PostCard key={post.slug} post={post} categoryPath="blog" />
                ))}
              </div>
            ) : (
              <div className="w-dyn-empty">
                <div>No items found.</div>
              </div>
            )}
          </div>
          <div inject-tablet="founders" className="cta-founders">
            <Link href="/blog" className="cta-p-sm cc-stroke w-inline-block">
              <div className="c-text-link cc-stagger-cta">Read More</div>
              <div className="flip-small"><div className="flip-bg"></div></div>
              <div className="flip-big">
                <div className="svg cta-sm-arrow w-embed">
                  <svg width={14} height={14} viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <g clipPath="url(#clip0_774_4073)">
                      <path d="M2.27832 1.625L12.3577 1.44906L12.5325 11.4643" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                      <path d="M12.3563 1.44945L1.48389 12.6365" stroke="white" strokeWidth="1.0876" strokeLinejoin="bevel" />
                    </g>
                    <defs>
                      <clipPath id="clip0_774_4073">
                        <rect width={12} height="11.9237" fill="white" transform="translate(0.896484 1.10547) rotate(-1)" />
                      </clipPath>
                    </defs>
                  </svg>
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
