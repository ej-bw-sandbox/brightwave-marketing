import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

interface BlogCardProps {
  title: string
  slug: string
  excerpt?: string
  featuredImage?: any
  publishedAt?: string
  postType?: string
  author?: {
    name: string
    slug?: { current: string }
    image?: any
  }
  categories?: Array<{
    title: string
    slug: { current: string }
  }>
  variant?: 'default' | 'featured' | 'compact'
}

export function BlogCard({
  title,
  slug,
  excerpt,
  featuredImage,
  publishedAt,
  postType,
  author,
  categories = [],
  variant = 'default',
}: BlogCardProps) {
  const href = `/blog/${slug}`

  const formattedDate = publishedAt
    ? new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(
        new Date(publishedAt)
      )
    : null

  if (variant === 'featured') {
    return (
      <Link
        href={href}
        className="group block rounded-xl border border-bw-gray-600 bg-bw-gray-700 overflow-hidden card-hover md:grid md:grid-cols-2 md:gap-0"
      >
        {featuredImage?.asset && (
          <div className="overflow-hidden">
            <Image
              src={urlFor(featuredImage).width(800).height(450).quality(85).url()}
              alt={title}
              width={800}
              height={450}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 text-xs text-bw-gray-300 mb-3">
            {postType && (
              <span className="rounded-full bg-bw-yellow-500/10 px-2.5 py-0.5 font-medium text-bw-yellow-500 uppercase tracking-wide">
                {postType}
              </span>
            )}
            {formattedDate && <time>{formattedDate}</time>}
          </div>
          <h3 className="text-2xl font-bold text-bw-gray-50 group-hover:text-bw-yellow-500 transition-colors leading-tight">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-3 text-bw-gray-200 line-clamp-3">{excerpt}</p>
          )}
          {author && (
            <div className="mt-4 flex items-center gap-2">
              {author.image?.asset && (
                <Image
                  src={urlFor(author.image).width(28).height(28).url()}
                  alt={author.name}
                  width={28}
                  height={28}
                  className="rounded-full"
                />
              )}
              <span className="text-sm text-bw-gray-300">{author.name}</span>
            </div>
          )}
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={href}
        className="group flex gap-4 items-start py-4 border-b border-bw-gray-700 last:border-0"
      >
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-bw-gray-50 group-hover:text-bw-yellow-500 transition-colors line-clamp-2">
            {title}
          </h4>
          <div className="mt-1 flex items-center gap-2 text-xs text-bw-gray-300">
            {formattedDate && <time>{formattedDate}</time>}
            {author && <span>by {author.name}</span>}
          </div>
        </div>
        {featuredImage?.asset && (
          <Image
            src={urlFor(featuredImage).width(80).height(56).quality(80).url()}
            alt={title}
            width={80}
            height={56}
            className="rounded-md flex-shrink-0 object-cover"
          />
        )}
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className="group block rounded-xl border border-bw-gray-600 bg-bw-gray-700 overflow-hidden card-hover"
    >
      {featuredImage?.asset && (
        <div className="overflow-hidden aspect-video">
          <Image
            src={urlFor(featuredImage).width(600).height(340).quality(80).url()}
            alt={title}
            width={600}
            height={340}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}
      <div className="p-5">
        <div className="flex items-center gap-3 text-xs text-bw-gray-300 mb-2">
          {(categories ?? []).length > 0 && (
            <span className="rounded-full bg-bw-yellow-500/10 px-2.5 py-0.5 font-medium text-bw-yellow-500">
              {(categories ?? [])[0]?.title}
            </span>
          )}
          {formattedDate && <time>{formattedDate}</time>}
        </div>
        <h3 className="font-semibold text-bw-gray-50 group-hover:text-bw-yellow-500 transition-colors line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="mt-2 text-sm text-bw-gray-200 line-clamp-2">{excerpt}</p>
        )}
        {author && (
          <div className="mt-3 flex items-center gap-2">
            {author.image?.asset && (
              <Image
                src={urlFor(author.image).width(24).height(24).url()}
                alt={author.name}
                width={24}
                height={24}
                className="rounded-full"
              />
            )}
            <span className="text-xs text-bw-gray-300">{author.name}</span>
          </div>
        )}
      </div>
    </Link>
  )
}
