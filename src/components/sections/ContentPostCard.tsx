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

  const imgSrc = coverImage?.asset
    ? urlFor(coverImage).width(600).height(450).quality(80).url()
    : 'https://d3e54v103j8qbb.cloudfront.net/plugins/Basic/assets/placeholder.60f9b1840c.svg'

  if (variant === 'featured') {
    return (
      <div role="listitem" className="card_item w-dyn-item">
        <Link href={href} className="grid cc-featured w-inline-block">
          <div className="inject-landscape"></div>
          <div className="aspect-16-9 u-overflow-hidden">
            <img
              src={imgSrc}
              loading="lazy"
              alt={title || ''}
              className="img-cover"
            />
          </div>
          <div className="featured_right">
            <div className="featured_top">
              <div className="c-title-4">{title}</div>
            </div>
            <div className="c-text-4">{excerpt || ''}</div>
          </div>
        </Link>
      </div>
    )
  }

  return (
    <Link href={href} className="card w-inline-block">
      <div className="aspect-4-3">
        <img
          src={imgSrc}
          loading="lazy"
          alt={title || ''}
          className="img-cover"
        />
      </div>
      <div className="card_flex">
        <div className="c-title-5">{title}</div>
        {author && <div className="author-hide">{author.name}</div>}
        {formattedDate && <div className="c-text-6">{formattedDate}</div>}
      </div>
    </Link>
  )
}
