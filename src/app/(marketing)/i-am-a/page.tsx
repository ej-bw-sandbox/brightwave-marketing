import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { icpIndexQuery } from '@/lib/sanity/queries/icps'
import { ProductFilterGrid } from '@/components/sections/ProductFilterGrid'
import { StepCtaSection } from '@/components/sections/StepCtaSection'

export const metadata: Metadata = {
  title: 'Roles | Brightwave',
  description: 'Brightwave is built for financial professionals across every role.',
}

export default async function RolesPage() {
  let data: any[] = []
  try {
    data = await client.fetch(icpIndexQuery, {}, { next: { tags: ['icpPage'], revalidate: 3600 } }) ?? []
  } catch {
    data = []
  }

  const items = data.map((item: any) => ({
    _id: item._id,
    title: item.title,
    slug: item.slug,
    product: item.product,
    excerpt: item.excerpt || item.heroTagline || '',
    tag: item.product === 'private-markets' ? 'Private Markets' : item.product === 'public-markets' ? 'Public Markets' : '',
    heroImage: item.heroImage,
  }))

  return (
    <>
      <ProductFilterGrid
        items={items}
        basePath="/i-am-a"
        pageTitle="Built for Your Role"
        pageDescription="Brightwave is designed for financial professionals across every role and level."
        emptyLabel="roles"
      />
      <StepCtaSection />
    </>
  )
}
