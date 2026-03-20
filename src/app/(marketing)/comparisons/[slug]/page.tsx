import { client } from '@/lib/sanity/client'
import { comparisonQuery, comparisonSlugsQuery } from '@/lib/sanity/queries/comparisons'
import { PortableText } from '@portabletext/react'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
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
    title: doc.competitor ? `Brightwave vs ${doc.competitor}` : doc.title || '',
    description: doc.seo?.metaDescription || doc.summary || '',
    seo: doc.seo,
    path: '/comparisons/' + slug,
  })
}

export default async function ComparisonDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(
    comparisonQuery,
    { slug },
    { next: { tags: ['comparison'] } }
  )

  if (!doc) notFound()

  const otherComparisons = doc.otherComparisons ?? []

  return (
    <>
      <article className="py-24 max-w-4xl mx-auto px-4">
        <Link
          href="/comparisons"
          className="text-sm text-bw-yellow-600 hover:text-bw-yellow-700 transition-colors mb-4 inline-block"
        >
          &larr; All Comparisons
        </Link>

        <h1 className="c-title-3 text-bw-gray-800 mt-4">
          {doc.competitor ? `Brightwave vs ${doc.competitor}` : doc.title}
        </h1>

        {doc.summary && (
          <p className="mt-4 c-text-3 text-bw-gray-500">{doc.summary}</p>
        )}

        {doc.body && (
          <div className="mt-10 prose-brand">
            <PortableText value={doc.body} />
          </div>
        )}
      </article>

      {otherComparisons.length > 0 && (
        <section className="pb-24 max-w-site mx-auto px-4">
          <h2 className="text-2xl font-bold text-bw-gray-800 mb-8">Other Comparisons</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {otherComparisons.map((c: any) => (
              <Link
                key={c.slug?.current}
                href={`/comparisons/${c.slug?.current}`}
                className="group rounded-lg border border-bw-gray-200 bg-white p-6 transition-all hover:border-bw-gray-800 hover:bg-bw-gray-700"
              >
                <h3 className="text-lg font-semibold text-bw-gray-800 group-hover:text-white transition-colors">
                  {c.competitor ? `vs ${c.competitor}` : c.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>
      )}
    </>
  )
}
