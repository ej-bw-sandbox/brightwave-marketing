import Image from 'next/image'
import Link from 'next/link'
import { PortableText } from '@portabletext/react'
import { urlFor } from '@/lib/sanity/image'
import { ContentPostCard } from './ContentPostCard'

interface ContentPostDetailProps {
  post: any
  basePath: string
}

export function ContentPostDetail({ post, basePath }: ContentPostDetailProps) {
  if (!post) return null

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(post.publishedAt))
    : null

  const relatedPosts = post.relatedPosts ?? []

  return (
    <>
      <article className="pb-16 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        {/* Header */}
        <header className="mb-8">
          <Link
            href={basePath}
            className="text-sm text-bw-yellow-600 hover:text-bw-yellow-700 transition-colors mb-4 inline-block"
          >
            &larr; Back
          </Link>

          <h1 className="text-4xl font-bold text-bw-gray-800 mt-4">{post.title}</h1>

          <div className="flex items-center gap-4 mt-6 text-sm text-bw-gray-500">
            {post.author && (
              <div className="flex items-center gap-2">
                {post.author.image && (
                  <Image
                    src={urlFor(post.author.image).width(32).height(32).url()}
                    alt={post.author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span>{post.author.name}</span>
              </div>
            )}
            {formattedDate && <span>{formattedDate}</span>}
          </div>
        </header>

        {/* Cover image */}
        {post.coverImage && (
          <div className="relative aspect-video overflow-hidden rounded-lg mb-10">
            <Image
              src={urlFor(post.coverImage).width(1200).height(675).url()}
              alt={post.title || ''}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        {/* Body */}
        {post.body && (
          <div className="prose-brand">
            <PortableText value={post.body} />
          </div>
        )}
      </article>

      {/* Related posts */}
      {relatedPosts.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="founders">
              <div className="founders-flex">
                <h2 className="c-title-2">Related Posts</h2>
              </div>
              <div className="w-dyn-list">
                <div role="list" className="grid cc-cards w-dyn-items">
                  {relatedPosts.map((rp: any) => (
                    <div key={rp.slug?.current} role="listitem" className="card_item w-dyn-item">
                      <ContentPostCard
                        title={rp.title}
                        slug={rp.slug?.current || ''}
                        excerpt={rp.excerpt}
                        coverImage={rp.coverImage}
                        publishedAt={rp.publishedAt}
                        author={rp.author}
                        basePath={basePath}
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>
      )}
    </>
  )
}
