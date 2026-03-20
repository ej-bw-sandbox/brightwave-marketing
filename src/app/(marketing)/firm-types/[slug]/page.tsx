import { client } from '@/lib/sanity/client'
import { solutionQuery, solutionSlugsQuery } from '@/lib/sanity/queries/solutions'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(solutionSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(solutionQuery, { slug }, { next: { tags: ['firmType'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.tagline || '',
    seo: doc.seo,
    path: '/firm-types/' + slug,
  })
}

export default async function FirmTypeDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(solutionQuery, { slug }, { next: { tags: ['firmType'] } })

  if (!doc) notFound()

  return (
    <article className="py-24 max-w-4xl mx-auto px-4">
      {doc.eyebrow && (
        <p className="text-xs font-semibold tracking-wider text-bw-yellow-500 uppercase mb-3">{doc.eyebrow}</p>
      )}
      <h1 className="text-title-4 font-bold text-bw-gray-50">{doc.h1 || doc.title}</h1>
      {doc.tagline && (
        <p className="mt-4 text-body-4 text-bw-gray-300">{doc.tagline}</p>
      )}
    </article>
  )
}
