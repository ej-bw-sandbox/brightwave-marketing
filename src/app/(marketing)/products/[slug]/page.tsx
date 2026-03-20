import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import { CtaButton } from '@/components/sections/CtaButton'
import Link from 'next/link'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  return [{ slug: 'private-markets' }]
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  if (slug === 'private-markets') {
    return {
      title: 'Private Markets Platform | Brightwave',
      description: 'AI-powered research and due diligence for PE, VC, and alternative investors.',
    }
  }
  return { title: 'Not Found' }
}

const privateMarketsFeatures = [
  { title: 'CIM Analysis', desc: 'Analyze Confidential Information Memorandums in minutes', href: '/use-cases/cim-analysis' },
  { title: 'Data Room Review', desc: 'Process 2000+ documents with AI agents', href: '/use-cases/data-room-review' },
  { title: 'Due Diligence', desc: 'Comprehensive investment diligence workflows', href: '/use-cases/due-diligence' },
  { title: 'Market Research', desc: 'Industry and competitive landscape analysis', href: '/use-cases/market-research' },
  { title: 'Portfolio Monitoring', desc: 'Track portfolio company performance', href: '/use-cases/portfolio-monitoring' },
  { title: 'Extraction Grid', desc: 'Pull structured data from any document set', href: '/features/extraction-grid' },
]

const firmTypes = [
  { title: 'Buyout', href: '/firm-types/buyout' },
  { title: 'Growth Equity', href: '/firm-types/growth' },
  { title: 'Venture Capital', href: '/firm-types/venture-capital' },
  { title: 'Fund of Funds', href: '/firm-types/fund-of-funds' },
  { title: 'Private Credit', href: '/firm-types/private-credit' },
  { title: 'Real Estate', href: '/firm-types/real-estate' },
]

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  if (slug !== 'private-markets') notFound()

  return (
    <>
      {/* Hero */}
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
            <h1 className="c-title-1 text-bw-gray-800">Private Markets</h1>
          </div>
          <p className="c-text-3 text-bw-gray-500 mt-10">
            AI-powered research and due diligence for PE, VC, and alternative investors. From CIM analysis to data room review, Brightwave accelerates every step of the investment lifecycle.
          </p>
          <div className="flex flex-wrap gap-2.5 mt-10">
            <CtaButton label="Try for Free" href="https://app.brightwave.io/register" variant="primary" />
            <CtaButton label="Get a Demo" href="/contact" variant="outline" />
          </div>
        </div>
      </section>

      {/* Use Cases */}
      <section className="c-section">
        <div className="c-container">
          <div className="eyebrow mb-8">
            <div className="block cc-primary" />
            <span className="c-title-5">Use Cases</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {privateMarketsFeatures.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group rounded-lg border border-bw-gray-200 p-6 transition-all hover:border-bw-gray-300"
              >
                <h3 className="c-title-5 text-bw-gray-800 group-hover:text-bw-yellow-600 transition-colors">{f.title}</h3>
                <p className="c-text-5 text-bw-gray-500 mt-2">{f.desc}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Firm Types */}
      <section className="c-section">
        <div className="c-container">
          <div className="eyebrow mb-8">
            <div className="block" />
            <span className="c-title-5">Who We Serve</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {firmTypes.map((f) => (
              <Link
                key={f.href}
                href={f.href}
                className="group rounded-lg border border-bw-gray-200 p-6 transition-all hover:border-bw-gray-300"
              >
                <h3 className="c-title-5 text-bw-gray-800 group-hover:text-bw-yellow-600 transition-colors">{f.title}</h3>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="c-section">
        <div className="c-container">
          <div className="bg-black rounded-2xl p-10 text-[#d9d9d9]">
            <h2 className="c-title-3 text-[#d9d9d9]">Ready to transform your investment process?</h2>
            <p className="c-text-3 text-bw-gray-300 mt-5">See how Brightwave can accelerate your deal flow.</p>
            <div className="flex flex-wrap gap-2.5 mt-8">
              <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
              <CtaButton label="Schedule a Demo" href="/contact" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
