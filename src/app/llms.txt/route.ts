import { NextResponse } from 'next/server'
import { client } from '@/lib/sanity/client'

const FALLBACK = `# Brightwave
> AI-powered research agents for investment professionals

## About
Brightwave builds agentic AI research tools that transform massive data rooms, filings, and financial documents into actionable investment deliverables. The platform serves private markets investors, public markets analysts, and financial professionals who need to process thousands of pages into memos, theses, and insights.

## Products
- [Private Markets Platform](https://www.brightwave.io/private-markets-platform): Process data rooms 25x faster, generate IC-ready memos in hours
- [Public Markets Platform](https://www.brightwave.io/public-markets-platform): Cut through filings, earnings calls, and market commentary
- [Investment Intelligence Engine](https://www.brightwave.io/investment-intelligence-engine): AI-driven insights for faster, smarter deals
- [Enterprise Security & Compliance](https://www.brightwave.io/enterprise-security-compliance): Enterprise-grade encryption, isolated storage, data privacy controls

## Use Cases
- [Features](https://www.brightwave.io/features): Platform capabilities overview
- [Use Cases](https://www.brightwave.io/use-cases): How professionals use Brightwave
- [Firm Types](https://www.brightwave.io/firm-types): Solutions by firm type
- [Roles](https://www.brightwave.io/i-am-a): Solutions by role
- [Comparisons](https://www.brightwave.io/vs): How Brightwave compares to alternatives

## Resources
- [Blog](https://www.brightwave.io/blog): Insights on AI and financial research
- [Engineering Blog](https://www.brightwave.io/engineering): Technical deep dives from the engineering team
- [Case Studies](https://www.brightwave.io/case-studies): Customer success stories
- [Release Notes](https://www.brightwave.io/release-notes): Product updates and new features
- [News](https://www.brightwave.io/news): Company news and press coverage
- [Resources & Tools](https://www.brightwave.io/resources): Downloadable guides and tools
- [Events](https://www.brightwave.io/events): Upcoming and past events

## Company
- [About](https://www.brightwave.io/about): Our mission and team
- [Security](https://www.brightwave.io/security): Security practices and certifications
- [Partners](https://www.brightwave.io/partners): Partner program — earn up to $1,000 per referral
- [Pricing](https://www.brightwave.io/pricing): Plans starting at $200/month
- [Contact](https://www.brightwave.io/contact): Request a demo

## Legal
- [Privacy Policy](https://www.brightwave.io/privacy-policy)
- [Terms of Use](https://www.brightwave.io/terms-of-use)
- [Partner Terms](https://www.brightwave.io/partner-terms)
`

export async function GET() {
  let content = FALLBACK

  try {
    const settings = await client.fetch<{ llmsTxt?: string }>(
      `*[_type == "siteSettings"][0]{ llmsTxt }`,
      {},
      { next: { revalidate: 3600 } },
    )
    if (settings?.llmsTxt) {
      content = settings.llmsTxt
    }
  } catch { /* use fallback */ }

  return new NextResponse(content, {
    headers: {
      'Content-Type': 'text/plain; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    },
  })
}
