import { Metadata } from 'next'
import { urlFor } from '@/lib/sanity/image'

interface PageSeo {
  metaTitle?: string
  metaDescription?: string
  ogImage?: any
  noIndex?: boolean
}

export function buildMetadata({
  title,
  description,
  seo,
  path,
  type = 'website',
}: {
  title: string
  description: string
  seo?: PageSeo
  path: string
  type?: 'website' | 'article'
}): Metadata {
  const metaTitle = seo?.metaTitle || title
  const metaDescription = seo?.metaDescription || description
  const ogImageUrl = seo?.ogImage
    ? urlFor(seo.ogImage).width(1200).height(630).url()
    : `https://www.brightwave.io/api/og?title=${encodeURIComponent(metaTitle)}`

  return {
    title: metaTitle,
    description: metaDescription,
    openGraph: {
      title: metaTitle,
      description: metaDescription,
      url: `https://www.brightwave.io${path}`,
      siteName: 'Brightwave',
      images: [{ url: ogImageUrl, width: 1200, height: 630, alt: metaTitle }],
      type,
    },
    twitter: {
      card: 'summary_large_image',
      title: metaTitle,
      description: metaDescription,
      images: [ogImageUrl],
    },
    alternates: {
      canonical: `https://www.brightwave.io${path}`,
    },
    robots: seo?.noIndex ? { index: false, follow: false } : undefined,
  }
}
