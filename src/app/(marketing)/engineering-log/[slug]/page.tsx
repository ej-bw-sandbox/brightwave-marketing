import { client } from '@/lib/sanity/client'
import { contentPostDetailQuery, contentPostSlugsQuery } from '@/lib/sanity/queries/content-posts'
import { ContentPostDetail } from '@/components/sections/ContentPostDetail'
import { notFound } from 'next/navigation'
import type { Metadata } from 'next'

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(contentPostSlugsQuery, { category: 'engineering-log' })
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const post = await client.fetch(contentPostDetailQuery, { slug, category: 'engineering-log' })
  if (!post) return {}
  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
  }
}

export default async function EngineeringLogDetailPage({ params }: PageProps) {
  const { slug } = await params
  const post = await client.fetch(
    contentPostDetailQuery,
    { slug, category: 'engineering-log' },
    { next: { tags: ['contentPost'] } }
  )
  if (!post) notFound()
  return <ContentPostDetail post={post} basePath="/engineering-log" />
}
