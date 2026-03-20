import { client } from '@/lib/sanity/client'
import { PortableTextRenderer } from '@/components/sections/PortableTextRenderer'
import type { Metadata } from 'next'

const privacyQuery = `*[_type == "legalPage" && slug.current == "privacy-policy"][0]{
  title, effectiveDate, body, seo
}`

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(privacyQuery, {}, { next: { tags: ['legalPage'] } })
  return {
    title: doc?.seo?.metaTitle || doc?.title || 'Privacy Policy | Brightwave',
    description: doc?.seo?.metaDescription || 'Read the Brightwave privacy policy.',
  }
}

export default async function PrivacyPolicyPage() {
  let doc: any = null
  try {
    doc = await client.fetch(privacyQuery, {}, { next: { tags: ['legalPage'] } })
  } catch {
    doc = null
  }

  return (
    <article className="py-24 max-w-4xl mx-auto px-4">
      <h1 className="c-title-3 text-bw-gray-800 mb-4">
        {doc?.title || 'Privacy Policy'}
      </h1>
      {doc?.effectiveDate && (
        <p className="text-sm text-bw-gray-500 mb-8">
          Effective: {new Date(doc.effectiveDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
        </p>
      )}
      {doc?.body ? (
        <div className="prose-brand">
          <PortableTextRenderer value={doc.body} />
        </div>
      ) : (
        <div className="text-bw-gray-500 space-y-4">
          <p>
            Our privacy policy content is being finalized. Please check back soon for full details on how Brightwave collects, uses, and protects your personal information.
          </p>
          <p>
            For questions about privacy, contact us at{' '}
            <a href="mailto:privacy@brightwave.io" className="text-bw-yellow-600 hover:underline">
              privacy@brightwave.io
            </a>.
          </p>
        </div>
      )}
    </article>
  )
}
