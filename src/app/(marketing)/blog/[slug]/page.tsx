import { client } from '@/lib/sanity/client'
import { blogPostQuery, blogSlugsQuery } from '@/lib/sanity/queries/blog'
import { PortableTextRenderer } from '@/components/sections/PortableTextRenderer'
import { BlogCard } from '@/components/sections/BlogCard'
import { buildMetadata } from '@/lib/metadata'
import Image from 'next/image'
import { urlFor } from '@/lib/sanity/image'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(blogSlugsQuery)
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(blogPostQuery, { slug }, { next: { tags: ['blogPost'] } })
  if (!post) return { title: 'Not Found' }
  return buildMetadata({
    title: post.title || '',
    description: post.seo?.metaDescription || post.excerpt || '',
    seo: post.seo,
    path: `/blog/${slug}`,
    type: 'article',
  })
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params
  const post = await client.fetch(blogPostQuery, { slug }, { next: { tags: ['blogPost'] } })

  if (!post) notFound()

  const formattedDate = post.publishedAt
    ? new Intl.DateTimeFormat('en-US', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(post.publishedAt))
    : null

  return (
    <article>
      <header className="py-16 sm:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6">
          <div className="flex items-center gap-3 text-sm text-text-muted mb-6">
            {post.categories?.map((cat: { title: string; slug: { current: string } }) => (
              <span
                key={cat.slug?.current}
                className="rounded-full bg-brand-400/10 px-3 py-1 font-medium text-brand-400"
              >
                {cat.title}
              </span>
            ))}
            {formattedDate && <time>{formattedDate}</time>}
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-text-primary leading-tight">
            {post.title}
          </h1>

          {post.excerpt && (
            <p className="mt-6 text-lg text-text-secondary leading-relaxed">
              {post.excerpt}
            </p>
          )}

          {post.author && (
            <div className="mt-8 flex items-center gap-3">
              {post.author.image?.asset && (
                <Image
                  src={urlFor(post.author.image).width(48).height(48).url()}
                  alt={post.author.name}
                  width={48}
                  height={48}
                  className="rounded-full"
                />
              )}
              <div>
                <div className="font-medium text-text-primary">{post.author.name}</div>
                {post.author.bio && (
                  <div className="text-sm text-text-muted line-clamp-1">
                    {post.author.bio}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </header>

      {post.featuredImage?.asset && (
        <div className="mx-auto max-w-4xl px-4 sm:px-6 mb-12">
          <Image
            src={urlFor(post.featuredImage).width(1200).height(630).quality(90).url()}
            alt={post.title}
            width={1200}
            height={630}
            className="rounded-xl w-full"
            priority
          />
        </div>
      )}

      <div className="mx-auto max-w-3xl px-4 sm:px-6 pb-24">
        <PortableTextRenderer value={post.body} />
      </div>

      {post.relatedPosts?.length > 0 && (
        <section className="border-t border-border py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
            <h2 className="text-2xl font-bold text-text-primary mb-8">
              Related Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {post.relatedPosts.map(
                (related: {
                  title: string
                  slug: { current: string }
                  excerpt?: string
                  featuredImage?: any
                  publishedAt?: string
                  author?: { name: string }
                }) => (
                  <BlogCard
                    key={related.slug?.current}
                    title={related.title}
                    slug={related.slug?.current || ''}
                    excerpt={related.excerpt}
                    featuredImage={related.featuredImage}
                    publishedAt={related.publishedAt}
                    author={related.author}
                  />
                )
              )}
            </div>
          </div>
        </section>
      )}
    </article>
  )
}
