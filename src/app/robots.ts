import { type MetadataRoute } from 'next'
import { client } from '@/lib/sanity/client'

const FALLBACK_RULES: MetadataRoute.Robots = {
  rules: [
    {
      userAgent: '*',
      allow: '/',
      disallow: ['/studio/', '/api/', '/abm/', '/landing/',
        '/pf-stats/', '/pf-content-blocks/', '/pf-use-cases/',
        '/comparison-categories/', '/comparison-content-blocks/', '/comparison-table-items/',
        '/case-studies-categories/', '/feature-slider/', '/use-case-slider/',
        '/testimonials/', '/testimonial-pages/', '/authors/',
        '/401', '/404', '/search'],
    },
  ],
  sitemap: 'https://www.brightwave.io/sitemap.xml',
}

export default async function robots(): Promise<MetadataRoute.Robots | string> {
  try {
    const settings = await client.fetch<{ robotsTxt?: string }>(
      `*[_type == "siteSettings"][0]{ robotsTxt }`,
      {},
      { next: { revalidate: 3600 } },
    )
    if (settings?.robotsTxt) {
      // Return raw string — Next.js serves it as-is for robots.txt
      return settings.robotsTxt as unknown as MetadataRoute.Robots
    }
  } catch { /* fall through */ }

  return FALLBACK_RULES
}
