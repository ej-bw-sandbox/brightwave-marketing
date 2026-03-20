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
        className="group block rounded-lg border border-bw-gray-200 bg-white overflow-hidden card-hover md:grid md:grid-cols-2 md:gap-0"
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
          <div className="flex items-center gap-3 text-xs text-bw-gray-500 mb-3">
            {postType && (
              <span className="rounded-full bg-bw-yellow-200 px-2.5 py-0.5 font-medium text-bw-yellow-700 uppercase tracking-wide">
                {postType}
              </span>
            )}
            {formattedDate && <time>{formattedDate}</time>}
          </div>
          <h3 className="text-2xl font-bold text-bw-gray-800 group-hover:text-bw-yellow-600 transition-colors leading-tight">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-3 text-bw-gray-500 line-clamp-3">{excerpt}</p>
          )}
        </div>
      </Link>
    )
  }

  if (variant === 'compact') {
    return (
      <Link
        href={href}
        className="group flex gap-4 items-start py-4 border-b border-bw-gray-200 last:border-0"
      >
        <div className="flex-1 min-w-0">
          <h4 className="font-medium text-bw-gray-800 group-hover:text-bw-yellow-600 transition-colors line-clamp-2">
            {title}
          </h4>
          <div className="mt-1 flex items-center gap-2 text-xs text-bw-gray-500">
            {formattedDate && <time>{formattedDate}</time>}
            {author && <span>by {author.name}</span>}
          </div>
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className="group flex flex-col gap-2.5 w-full"
    >
      {featuredImage?.asset && (
        <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
          <Image
            src={urlFor(featuredImage).width(600).height(450).quality(80).url()}
            alt={title}
            width={600}
            height={450}
            className="absolute inset-0 w-full h-full object-cover transition-all duration-500 group-hover:scale-105"
          />
        </div>
      )}
      <div className="flex flex-col gap-3">
        <h3 className="c-title-5 text-bw-gray-800 group-hover:text-bw-yellow-600 transition-colors line-clamp-2">
          {title}
        </h3>
        {excerpt && (
          <p className="c-text-5 text-bw-gray-500 line-clamp-2">{excerpt}</p>
        )}
      </div>
    </Link>
  )
}
