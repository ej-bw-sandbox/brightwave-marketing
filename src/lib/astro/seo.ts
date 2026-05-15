import { imageUrl } from '@/lib/sanity/image'

export interface PageSeo {
  metaTitle?: string
  metaDescription?: string
  ogImage?: any
  noIndex?: boolean
}

export interface SeoProps {
  title?: string
  description?: string
  path?: string
  type?: 'website' | 'article'
  seo?: PageSeo
}

export function buildSeo({ title = 'Brightwave', description = 'AI-powered financial research platform for investment professionals.', path = '/', type = 'website', seo }: SeoProps = {}) {
  const site = 'https://www.brightwave.io'
  const metaTitle = seo?.metaTitle || title
  const metaDescription = seo?.metaDescription || description || ''
  const canonical = new URL(path || '/', site).toString()
  const ogImage = seo?.ogImage ? imageUrl(seo.ogImage, 1200, 630) : `${site}/webflow-images/OpenGraph.png`
  return { title: metaTitle, description: metaDescription, canonical, ogImage, noIndex: seo?.noIndex, type }
}
