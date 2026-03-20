import { client } from '@/lib/sanity/client'
import { useCaseQuery, useCaseSlugsQuery } from '@/lib/sanity/queries/use-cases'
import { PortableText } from '@portabletext/react'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(useCaseSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(useCaseQuery, { slug }, { next: { tags: ['useCase'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.excerpt || '',
    seo: doc.seo,
    path: '/use-cases/' + slug,
  })
}

export default async function UsecasesDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(useCaseQuery, { slug }, { next: { tags: ['useCase'] } })

  if (!doc) notFound()

  return (
    <article className="py-24 max-w-4xl mx-auto px-4">
      <Link href="/use-cases" className="text-sm text-bw-yellow-600 hover:text-bw-yellow-700 transition-colors mb-4 inline-block">
        &larr; All Use Cases
      </Link>
      {doc.eyebrow && (
        <div className="eyebrow cc-no-bp mt-4 mb-3">
          <div className="block cc-primary" />
          <span className="c-title-5">{doc.eyebrow}</span>
        </div>
      )}
      <h1 className="c-title-3 text-bw-gray-800 mt-4">{doc.title}</h1>
      {doc.excerpt && (
        <p className="mt-4 c-text-3 text-bw-gray-500">{doc.excerpt}</p>
      )}
      {doc.body && (
        <div className="mt-10 prose-brand">
          <PortableText value={doc.body} />
        </div>
      )}
    </article>
  )
}
