import type { APIRoute } from 'astro'
export const GET: APIRoute = () => new Response(`User-agent: *
Allow: /
Disallow: /studio/
Disallow: /api/
Disallow: /abm/
Disallow: /landing/
Disallow: /demo/
Disallow: /sandbox/
Disallow: /401
Disallow: /404
Disallow: /search

Sitemap: https://www.brightwave.io/sitemap.xml
`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })
