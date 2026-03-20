import { ContentPostIndex } from '@/components/sections/ContentPostIndex'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Blog',
  description: 'Insights on AI-powered financial research, due diligence, and investment analysis.',
}

export default function BlogIndexPage() {
  return (
    <ContentPostIndex
      category="blog"
      basePath="/blog"
      headline="Blog"
      subheadline="Insights on AI-powered financial research, due diligence, and investment analysis."
      emptyMessage="No blog posts found."
    />
  )
}
