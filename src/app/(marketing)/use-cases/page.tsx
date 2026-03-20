import { client } from '@/lib/sanity/client'
import { useCaseIndexQuery } from '@/lib/sanity/queries/use-cases'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Use Cases',
}

export default async function UseCasesIndexPage() {
  const data = await client.fetch(useCaseIndexQuery, { offset: 0, limit: 20 }, { next: { tags: ['useCase'] } })

  return (
    <section className="py-24 max-w-6xl mx-auto px-4">
      <h1 className="text-4xl font-bold mb-12">Use Cases</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {/* Content cards will render here */}
      </div>
    </section>
  )
}
