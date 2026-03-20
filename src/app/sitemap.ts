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
    { url: `${baseUrl}/case-studies`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/features`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/use-cases`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/solutions`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/for`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/vs`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/events`, changeFrequency: 'weekly', priority: 0.6 },
    { url: `${baseUrl}/resources`, changeFrequency: 'weekly', priority: 0.7 },
    { url: `${baseUrl}/changelog`, changeFrequency: 'weekly', priority: 0.5 },
  ]

  const dynamicQueries = [
    { type: 'blogPost', prefix: '/blog', priority: 0.7 },
    { type: 'newsPost', prefix: '/news', priority: 0.5 },
    { type: 'caseStudy', prefix: '/case-studies', priority: 0.7 },
    { type: 'comparison', prefix: '/vs', priority: 0.8 },
    { type: 'platformFeature', prefix: '/features', priority: 0.7 },
    { type: 'useCase', prefix: '/use-cases', priority: 0.7 },
    { type: 'firmType', prefix: '/solutions', priority: 0.8 },
    { type: 'icpPage', prefix: '/for', priority: 0.8 },
    { type: 'releaseNote', prefix: '/changelog', priority: 0.4 },
    { type: 'resourceItem', prefix: '/resources', priority: 0.6 },
    { type: 'virtualEvent', prefix: '/events', priority: 0.5 },
  ]

  const dynamicPages: MetadataRoute.Sitemap = []

  for (const { type, prefix, priority } of dynamicQueries) {
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
  }

  return [...staticPages, ...dynamicPages]
}
