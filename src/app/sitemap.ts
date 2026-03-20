import { MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://www.brightwave.io'

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1.0 },
    { url: `${baseUrl}/about`, changeFrequency: 'monthly', priority: 0.8 },
    { url: `${baseUrl}/pricing`, changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/security`, changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/enterprise`, changeFrequency: 'monthly', priority: 0.9 },
    { url: `${baseUrl}/blog`, changeFrequency: 'daily', priority: 0.8 },
    { url: `${baseUrl}/news`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/engineering-log`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/release-notes`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/case-studies`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/features`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/use-cases`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/firm-types`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/i-am-a`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/vs`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/events`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/resources`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/changelog`, changeFrequency: 'weekly', priority: 0.5 },
    { url: `${baseUrl}/support`, changeFrequency: 'monthly', priority: 0.5 },
  ]

  /* Content posts (unified type) */
  const contentPostCategories = [
    { category: 'blog', prefix: '/blog', priority: 0.7 },
    { category: 'news', prefix: '/news', priority: 0.5 },
    { category: 'engineering-log', prefix: '/engineering-log', priority: 0.5 },
    { category: 'release-notes', prefix: '/release-notes', priority: 0.4 },
  ]

  /* Other dynamic types */
  const dynamicQueries = [
    { type: 'caseStudy', prefix: '/case-studies', priority: 0.7 },
    { type: 'comparison', prefix: '/vs', priority: 0.8 },
    { type: 'platformFeature', prefix: '/features', priority: 0.7 },
    { type: 'useCase', prefix: '/use-cases', priority: 0.7 },
    { type: 'firmType', prefix: '/firm-types', priority: 0.8 },
    { type: 'icpPage', prefix: '/i-am-a', priority: 0.8 },
    { type: 'product', prefix: '/products', priority: 0.9 },
    { type: 'resourceItem', prefix: '/resources', priority: 0.6 },
    { type: 'virtualEvent', prefix: '/events', priority: 0.5 },
  ]

  const dynamicPages: MetadataRoute.Sitemap = []

  /* Content posts by category */
  for (const { category, prefix, priority } of contentPostCategories) {
    try {
      const docs = await client.fetch<{ slug: string; updatedAt: string }[]>(
        `*[_type == "contentPost" && category == $category && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`,
        { category }
      )
      for (const doc of docs) {
        dynamicPages.push({
          url: `${baseUrl}${prefix}/${doc.slug}`,
          lastModified: new Date(doc.updatedAt),
          priority,
        })
      }
    } catch { /* continue */ }
  }

  /* Other dynamic types */
  for (const { type, prefix, priority } of dynamicQueries) {
    try {
      const docs = await client.fetch<{ slug: string; updatedAt: string }[]>(
        `*[_type == "${type}" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`
      )
      for (const doc of docs) {
        dynamicPages.push({
          url: `${baseUrl}${prefix}/${doc.slug}`,
          lastModified: new Date(doc.updatedAt),
          priority,
        })
      }
    } catch { /* continue */ }
  }

  return [...staticPages, ...dynamicPages]
}
