import type { APIRoute } from 'astro'
import { client } from '@/lib/sanity/client'
const baseUrl = 'https://www.brightwave.io'
function entry(path: string, priority = 0.7, lastmod?: string) {
  return `<url><loc>${baseUrl}${path}</loc>${lastmod ? `<lastmod>${new Date(lastmod).toISOString()}</lastmod>` : ''}<priority>${priority.toFixed(1)}</priority></url>`
}
export const GET: APIRoute = async () => {
  const urls: string[] = []
  const staticPages = ['/', '/about', '/enterprise', '/enterprise-security-compliance', '/private-markets-platform', '/contact', '/partners', '/referral', '/support', '/thank-you-contact', '/features', '/use-cases', '/i-am-a', '/firm-types', '/blog', '/news', '/release-notes', '/case-studies', '/comparisons', '/resources']
  staticPages.forEach((p, i) => urls.push(entry(p === '/' ? '' : p, i === 0 ? 1 : 0.7)))
  const contentCategories = [{ category: 'blog', prefix: '/blog' }, { category: 'news', prefix: '/news' }, { category: 'release-notes', prefix: '/release-notes' }]
  for (const { category, prefix } of contentCategories) {
    try { const docs = await client.fetch<any[]>(`*[_type == "contentPost" && category == $category && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`, { category }); docs.forEach(d => urls.push(entry(`${prefix}/${d.slug}`, 0.6, d.updatedAt))) } catch {}
  }
  const types = [{ type: 'caseStudy', prefix: '/case-studies' }, { type: 'comparison', prefix: '/comparisons' }, { type: 'platformFeature', prefix: '/features' }, { type: 'useCase', prefix: '/use-cases' }, { type: 'firmType', prefix: '/firm-types' }, { type: 'icpPage', prefix: '/i-am-a' }, { type: 'resourceItem', prefix: '/resources' }, { type: 'legalPage', prefix: '/legal' }]
  for (const { type, prefix } of types) {
    try { const docs = await client.fetch<any[]>(`*[_type == "${type}" && defined(slug.current)]{ "slug": slug.current, "updatedAt": _updatedAt }`); docs.forEach(d => urls.push(entry(`${prefix}/${d.slug}`, type === 'legalPage' ? 0.3 : 0.7, d.updatedAt))) } catch {}
  }
  return new Response(`<?xml version="1.0" encoding="UTF-8"?><urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urls.join('')}</urlset>`, { headers: { 'Content-Type': 'application/xml; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } })
}
