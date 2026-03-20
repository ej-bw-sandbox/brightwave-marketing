import { client } from '@/lib/sanity/client'
import { resourceQuery, resourceSlugsQuery } from '@/lib/sanity/queries/resources'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(resourceSlugsQuery)
  return slugs.map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(resourceQuery, { slug }, { next: { tags: ['resourceItem'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.excerpt || '',
    seo: doc.seo,
    path: '/resources/' + slug,
  })
}

export default async function ResourcesDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(resourceQuery, { slug }, { next: { tags: ['resourceItem'] } })

  if (!doc) notFound()

  return (
    <article className="py-24 max-w-4xl mx-auto px-4">
      <h1 className="text-4xl font-bold">{doc.title}</h1>
    </article>
  )
}
