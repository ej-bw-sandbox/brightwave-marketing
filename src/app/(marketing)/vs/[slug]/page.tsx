import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { comparisonQuery, comparisonSlugsQuery } from '@/lib/sanity/queries/comparisons'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { CtaButton } from '@/components/sections/CtaButton'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(comparisonSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(comparisonQuery, { slug }, { next: { tags: ['comparison'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.heroDescription || '',
    seo: doc.seo,
    path: '/vs/' + slug,
  })
}

export default async function VsDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(comparisonQuery, { slug }, { next: { tags: ['comparison'] } })

  if (!doc) notFound()

  const otherComparisons = doc.otherComparisons ?? []

  return (
    <>
      {/* Hero */}
      <section className="c-section cc-hero">
        <div className="c-container">
          <Link
            href="/vs"
            className="text-sm text-bw-yellow-600 hover:text-bw-yellow-700 transition-colors mb-4 inline-block"
          >
            &larr; All Comparisons
          </Link>
          <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
            <h1 className="c-title-1 text-bw-gray-800">{doc.title}</h1>
          </div>
          {doc.heroDescription && (
            <p className="c-text-3 text-bw-gray-500 mt-10">{doc.heroDescription}</p>
          )}
          {doc.competitorLogo?.asset && (
            <div className="mt-8">
              <Image
                src={urlFor(doc.competitorLogo).width(200).url()}
                alt={doc.competitor || ''}
                width={200}
                height={60}
                className="object-contain"
              />
            </div>
          )}
        </div>
      </section>

      {/* Body */}
      {doc.body && Array.isArray(doc.body) && (
        <section className="pb-24 max-w-4xl mx-auto px-5">
          <div className="prose-brand">
            <PortableText value={doc.body} />
          </div>
        </section>
      )}

      {/* Other Comparisons */}
      {otherComparisons.length > 0 && (
        <section className="pb-24 max-w-site mx-auto px-5">
          <h2 className="c-title-5 text-bw-gray-800 mb-6">Other Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {otherComparisons.map((c: any) => (
              <Link
                key={c.slug?.current}
                href={`/vs/${c.slug?.current}`}
                className="group rounded-lg border border-bw-gray-200 p-5 transition-all hover:border-bw-gray-300"
              >
                <h3 className="font-semibold text-bw-gray-800 group-hover:text-bw-yellow-600 transition-colors">
                  {c.title}
                </h3>
                {c.summary && <p className="mt-1 text-sm text-bw-gray-500 line-clamp-2">{c.summary}</p>}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="c-section">
        <div className="c-container">
          <div className="flex flex-col gap-5">
            <h2 className="c-title-3 text-bw-gray-800">See the difference for yourself</h2>
            <p className="c-text-3 text-bw-gray-500">
              Try Brightwave and see how it compares to {doc.competitor || 'the competition'}.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-5">
              <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
              <CtaButton label="Get a Demo" href="/contact" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
