import { client } from '@/lib/sanity/client'
import { featureQuery, featureSlugsQuery } from '@/lib/sanity/queries/features'
import { PortableText } from '@portabletext/react'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(featureSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(featureQuery, { slug }, { next: { tags: ['platformFeature'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.tagline || '',
    seo: doc.seo,
    path: '/features/' + slug,
  })
}

export default async function FeaturesDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(featureQuery, { slug }, { next: { tags: ['platformFeature'] } })

  if (!doc) notFound()

  const relatedFeatures = doc.relatedFeatures ?? []
  const relatedUseCases = doc.relatedUseCases ?? []

  return (
    <>
      <article className="py-24 max-w-4xl mx-auto px-4">
        <Link
          href="/features"
          className="text-sm text-bw-yellow-600 hover:text-bw-yellow-700 transition-colors mb-4 inline-block"
        >
          &larr; All Features
        </Link>

        <h1 className="c-title-3 text-bw-gray-800 mt-4">{doc.title}</h1>

        {doc.tagline && (
          <p className="mt-4 c-text-3 text-bw-gray-500">{doc.tagline}</p>
        )}

        {doc.body && (
          <div className="mt-10 prose-brand">
            <PortableText value={doc.body} />
          </div>
        )}
      </article>

      {(relatedFeatures.length > 0 || relatedUseCases.length > 0) && (
        <section className="pb-24 max-w-site mx-auto px-4">
          {relatedFeatures.length > 0 && (
            <div className="mb-12">
              <h2 className="text-xl font-bold text-bw-gray-800 mb-6">Related Features</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedFeatures.map((f: any) => (
                  <Link
                    key={f.slug?.current}
                    href={`/features/${f.slug?.current}`}
                    className="group rounded-lg border border-bw-gray-200 p-5 transition-all hover:border-bw-gray-800 hover:bg-bw-gray-700"
                  >
                    <h3 className="font-semibold text-bw-gray-800 group-hover:text-white transition-colors">{f.title}</h3>
                    {f.tagline && <p className="mt-1 text-sm text-bw-gray-500 group-hover:text-bw-gray-600 transition-colors">{f.tagline}</p>}
                  </Link>
                ))}
              </div>
            </div>
          )}

          {relatedUseCases.length > 0 && (
            <div>
              <h2 className="text-xl font-bold text-bw-gray-800 mb-6">Related Use Cases</h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {relatedUseCases.map((u: any) => (
                  <Link
                    key={u.slug?.current}
                    href={`/use-cases/${u.slug?.current}`}
                    className="group rounded-lg border border-bw-gray-200 p-5 transition-all hover:border-bw-gray-800 hover:bg-bw-gray-700"
                  >
                    <h3 className="font-semibold text-bw-gray-800 group-hover:text-white transition-colors">{u.title}</h3>
                    {u.excerpt && <p className="mt-1 text-sm text-bw-gray-500 group-hover:text-bw-gray-600 transition-colors">{u.excerpt}</p>}
                  </Link>
                ))}
              </div>
            </div>
          )}
        </section>
      )}
    </>
  )
}
