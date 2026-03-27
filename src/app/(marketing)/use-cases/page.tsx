import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { useCaseIndexQuery } from '@/lib/sanity/queries/use-cases'
import { ProductFilterGrid } from '@/components/sections/ProductFilterGrid'
import { StepCtaSection } from '@/components/sections/StepCtaSection'

export const metadata: Metadata = {
  title: 'Use Cases | Brightwave',
  description: 'Discover how Brightwave accelerates research workflows across investment activities.',
}

export default async function UseCasesPage() {
  let data: any[] = []
  try {
    data = await client.fetch(useCaseIndexQuery, {}, { next: { tags: ['useCase'], revalidate: 3600 } }) ?? []
  } catch {
    data = []
  }

  const items = data.map((item: any) => ({
    _id: item._id,
    title: item.title,
    slug: item.slug,
    product: item.product,
    excerpt: item.excerpt || '',
    tag: item.eyebrow || (item.product === 'private-markets' ? 'Private Markets' : ''),
    heroImage: item.heroImage,
  }))

  return (
    <>
      <ProductFilterGrid
        items={items}
        basePath="/use-cases"
        pageTitle="Use Cases"
        pageDescription="Discover how Brightwave accelerates research workflows across investment activities and market segments."
        emptyLabel="use cases"
      />
      <StepCtaSection />
    </>
  )
}
