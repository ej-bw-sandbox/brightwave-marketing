import { client } from '@/lib/sanity/client'
import { featureQuery, featureSlugsQuery } from '@/lib/sanity/queries/features'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
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
    description: doc.seo?.metaDescription || doc.excerpt || '',
    seo: doc.seo,
    path: '/features/' + slug,
  })
}

export default async function FeaturesDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(featureQuery, { slug }, { next: { tags: ['platformFeature'] } })

  if (!doc) notFound()

  return (
    <article className="py-24 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold">{doc.title}</h1>
    </article>
  )
}
