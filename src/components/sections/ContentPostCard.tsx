import Image from 'next/image'
import Link from 'next/link'
import { urlFor } from '@/lib/sanity/image'

interface ContentPostCardProps {
  title: string
  slug: string
  excerpt?: string
  coverImage?: any
  publishedAt?: string
  author?: {
    name: string
    image?: any
  }
  basePath: string
  variant?: 'default' | 'featured'
}

export function ContentPostCard({
  title,
  slug,
  excerpt,
  coverImage,
  publishedAt,
  author,
  basePath,
  variant = 'default',
}: ContentPostCardProps) {
  const href = `${basePath}/${slug}`

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
        {coverImage?.asset && (
          <div className="overflow-hidden">
            <Image
              src={urlFor(coverImage).width(800).height(450).quality(85).url()}
              alt={title}
              width={800}
              height={450}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          </div>
        )}
        <div className="p-8 flex flex-col justify-center">
          {formattedDate && (
            <div className="text-xs text-bw-gray-500 mb-3">
              <time>{formattedDate}</time>
            </div>
          )}
          <h3 className="text-2xl font-bold text-bw-gray-800 group-hover:text-bw-yellow-600 transition-colors leading-tight">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-3 text-bw-gray-500 line-clamp-3">{excerpt}</p>
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
              <span className="text-sm text-bw-gray-500">{author.name}</span>
            </div>
          )}
        </div>
      </Link>
    )
  }

  return (
    <Link
      href={href}
      className="group flex flex-col gap-2.5 w-full"
    >
      {coverImage?.asset && (
        <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
          <Image
            src={urlFor(coverImage).width(600).height(450).quality(80).url()}
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
        <div className="flex items-center gap-3 text-xs text-bw-gray-500">
          {formattedDate && <time>{formattedDate}</time>}
          {author && <span>by {author.name}</span>}
        </div>
      </div>
    </Link>
  )
}
