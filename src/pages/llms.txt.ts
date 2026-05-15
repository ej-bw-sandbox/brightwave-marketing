import type { APIRoute } from 'astro'
import { client } from '@/lib/sanity/client'
const FALLBACK = `# Brightwave
> AI-powered research agents for investment professionals

## About
Brightwave builds agentic AI research tools that transform massive data rooms, filings, and financial documents into actionable investment deliverables.

## Products
- [Private Markets Platform](https://www.brightwave.io/private-markets-platform)
- [Enterprise Security & Compliance](https://www.brightwave.io/enterprise-security-compliance)

## Use Cases
- [Features](https://www.brightwave.io/features)
- [Use Cases](https://www.brightwave.io/use-cases)
- [Firm Types](https://www.brightwave.io/firm-types)
- [Roles](https://www.brightwave.io/i-am-a)
- [Comparisons](https://www.brightwave.io/comparisons)

## Resources
- [Blog](https://www.brightwave.io/blog)
- [Case Studies](https://www.brightwave.io/case-studies)
- [Release Notes](https://www.brightwave.io/release-notes)
- [News](https://www.brightwave.io/news)
- [Resources](https://www.brightwave.io/resources)

## Company
- [About](https://www.brightwave.io/about)
- [Partners](https://www.brightwave.io/partners)
- [Contact](https://www.brightwave.io/contact)
`
export const GET: APIRoute = async () => {
  let content = FALLBACK
  try { const settings = await client.fetch<{ llmsTxt?: string }>(`*[_type == "siteSettings"][0]{ llmsTxt }`); if (settings?.llmsTxt) content = settings.llmsTxt } catch {}
  return new Response(content, { headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'public, max-age=3600, s-maxage=86400' } })
}
