import { ContentPostIndex } from '@/components/sections/ContentPostIndex'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'News',
  description: 'The latest news and press about Brightwave.',
}

export default function NewsIndexPage() {
  return (
    <ContentPostIndex
      category="news"
      basePath="/news"
      headline="News"
      subheadline="The latest news and press about Brightwave."
      emptyMessage="No news posts found."
    />
  )
}
