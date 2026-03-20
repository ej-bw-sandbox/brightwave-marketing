import { client } from '@/lib/sanity/client'
import { icpQuery, icpSlugsQuery } from '@/lib/sanity/queries/icps'
import { PortableText } from '@portabletext/react'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(icpSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(icpQuery, { slug }, { next: { tags: ['icpPage'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.heroTagline || '',
    seo: doc.seo,
    path: '/i-am-a/' + slug,
  })
}

export default async function RoleDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(icpQuery, { slug }, { next: { tags: ['icpPage'] } })

  if (!doc) notFound()

  return (
    <article className="py-24 max-w-4xl mx-auto px-4">
      <Link href="/i-am-a" className="text-sm text-bw-yellow-600 hover:text-bw-yellow-700 transition-colors mb-4 inline-block">
        &larr; All Roles
      </Link>
      <h1 className="c-title-3 text-bw-gray-800 mt-4">{doc.h1 || doc.title}</h1>
      {doc.heroTagline && (
        <p className="mt-4 c-text-3 text-bw-gray-500">{doc.heroTagline}</p>
      )}
      {doc.body && (
        <div className="mt-10 prose-brand">
          <PortableText value={doc.body} />
        </div>
      )}
    </article>
  )
}
