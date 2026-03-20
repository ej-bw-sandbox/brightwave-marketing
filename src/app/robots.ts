import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/studio/', '/api/', '/landing/', '/abm/'],
      },
    ],
    sitemap: 'https://www.brightwave.io/sitemap.xml',
  }
}
