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

  const imgSrc = featuredImage?.asset
    ? urlFor(featuredImage).width(600).height(450).quality(80).url()
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
              {postType && (
                <div className="eyebrow-flex">
                  <div className="block"></div>
                  <div className="c-title-5">{postType}</div>
                </div>
              )}
              <div className="c-title-4">{title}</div>
            </div>
            <div className="c-text-4">{excerpt || ''}</div>
          </div>
        </Link>
      </div>
    )
  }

  if (variant === 'compact') {
    return (
      <div role="listitem" className="card_item w-dyn-item">
        <Link href={href} className="card w-inline-block">
          <div className="card_flex">
            <div className="c-title-5">{title}</div>
            {formattedDate && <div className="c-text-6">{formattedDate}</div>}
          </div>
        </Link>
      </div>
    )
  }

  return (
    <div role="listitem" className="card_item w-dyn-item">
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
          {formattedDate && <div className="c-text-6">{formattedDate}</div>}
        </div>
      </Link>
    </div>
  )
}
