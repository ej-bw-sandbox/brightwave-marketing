import { type MetadataRoute } from 'next'

const DEFAULT_ROBOTS: MetadataRoute.Robots = {
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

export default function robots(): MetadataRoute.Robots {
  return DEFAULT_ROBOTS
}
