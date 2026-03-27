import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { solutionsIndexQuery } from '@/lib/sanity/queries/solutions'
import { ProductFilterGrid } from '@/components/sections/ProductFilterGrid'
import { StepCtaSection } from '@/components/sections/StepCtaSection'

export const metadata: Metadata = {
  title: 'Firm Types | Brightwave',
  description: 'AI-powered research solutions built for your firm type.',
}

export default async function FirmTypesPage() {
  let data: any[] = []
  try {
    data = await client.fetch(solutionsIndexQuery, {}, { next: { tags: ['firmType'], revalidate: 3600 } }) ?? []
  } catch {
    data = []
  }

  const items = data.map((item: any) => ({
    _id: item._id,
    title: item.title,
    slug: item.slug,
    product: item.product,
    excerpt: item.excerpt || item.eyebrow || '',
    tag: item.product === 'private-markets' ? 'Private Markets' : item.product === 'public-markets' ? 'Public Markets' : '',
    heroImage: item.heroImage,
  }))

  return (
    <>
      <ProductFilterGrid
        items={items}
        basePath="/firm-types"
        pageTitle="Firm Types"
        pageDescription="AI-powered research solutions tailored to how your firm operates."
        emptyLabel="firm types"
      />
      <StepCtaSection />
    </>
  )
}
