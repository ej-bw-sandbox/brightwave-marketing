import { client } from '@/lib/sanity/client'
import { PortableTextRenderer } from '@/components/sections/PortableTextRenderer'
import type { Metadata } from 'next'

const termsQuery = `*[_type == "legalPage" && slug.current == "terms-of-use"][0]{
  title, effectiveDate, body, seo
}`

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(termsQuery, {}, { next: { tags: ['legalPage'] } })
  return {
    title: doc?.seo?.metaTitle || doc?.title || 'Terms of Use | Brightwave',
    description: doc?.seo?.metaDescription || 'Read the Brightwave terms of use.',
  }
}

export default async function TermsOfUsePage() {
  let doc: any = null
  try {
    doc = await client.fetch(termsQuery, {}, { next: { tags: ['legalPage'] } })
  } catch {
    doc = null
  }

  return (
    <article className="py-24 max-w-4xl mx-auto px-4">
      <h1 className="text-title-3 font-bold text-bw-gray-50 mb-4">
        {doc?.title || 'Terms of Use'}
      </h1>
      {doc?.effectiveDate && (
        <p className="text-sm text-bw-gray-400 mb-8">
          Effective: {new Date(doc.effectiveDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      )}
      {doc?.body ? (
        <div className="prose prose-invert prose-gray max-w-none">
          <PortableTextRenderer value={doc.body} />
        </div>
      ) : (
        <div className="text-bw-gray-300 space-y-4">
          <p>
            Our terms of use are being finalized. Please check back soon for the complete terms governing your use of Brightwave.
          </p>
          <p>
            For questions, contact us at{' '}
            <a href="mailto:legal@brightwave.io" className="text-bw-yellow-500 hover:underline">
              legal@brightwave.io
            </a>.
          </p>
        </div>
      )}
    </article>
  )
}
