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
    slug?: { current: string }
    image?: any
  }
  basePath: string
  variant?: 'default' | 'featured' | 'compact'
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
    ? new Intl.DateTimeFormat('en-US', {
        month: 'short',
        day: 'numeric',
        year: 'numeric',
      }).format(new Date(publishedAt))
    : null

  if (variant === 'featured') {
    return (
      <Link href={href} className="group block">
        <article className="grid md:grid-cols-2 gap-8 rounded-2xl border border-bw-gray-600 bg-bw-gray-700/40 p-6 transition-colors hover:border-bw-gray-300">
          {coverImage && (
            <div className="relative aspect-video overflow-hidden rounded-lg">
              <Image
                src={urlFor(coverImage).width(800).height(450).url()}
                alt={title || ''}
                fill
                className="object-cover"
              />
            </div>
          )}
          <div className="flex flex-col justify-center">
            {formattedDate && (
              <span className="text-sm text-bw-gray-300 mb-2">{formattedDate}</span>
            )}
            <h2 className="text-2xl font-bold text-bw-gray-50 group-hover:text-bw-yellow-500 transition-colors">
              {title}
            </h2>
            {excerpt && (
              <p className="mt-3 text-bw-gray-300 line-clamp-3">{excerpt}</p>
            )}
            {author && (
              <div className="mt-4 flex items-center gap-2">
                {author.image && (
                  <Image
                    src={urlFor(author.image).width(32).height(32).url()}
                    alt={author.name}
                    width={32}
                    height={32}
                    className="rounded-full"
                  />
                )}
                <span className="text-sm text-bw-gray-300">{author.name}</span>
              </div>
            )}
          </div>
        </article>
      </Link>
    )
  }

  return (
    <Link href={href} className="group block">
      <article className="flex flex-col rounded-xl border border-bw-gray-600 bg-bw-gray-700/40 overflow-hidden transition-colors hover:border-bw-gray-300">
        {coverImage && (
          <div className="relative aspect-video overflow-hidden">
            <Image
              src={urlFor(coverImage).width(600).height(340).url()}
              alt={title || ''}
              fill
              className="object-cover"
            />
          </div>
        )}
        <div className="p-5 flex flex-col flex-1">
          {formattedDate && (
            <span className="text-xs text-bw-gray-400 mb-2">{formattedDate}</span>
          )}
          <h3 className="text-lg font-semibold text-bw-gray-50 group-hover:text-bw-yellow-500 transition-colors line-clamp-2">
            {title}
          </h3>
          {excerpt && (
            <p className="mt-2 text-sm text-bw-gray-300 line-clamp-2 flex-1">
              {excerpt}
            </p>
          )}
          {author && (
            <div className="mt-4 flex items-center gap-2">
              {author.image && (
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
      </article>
    </Link>
  )
}
