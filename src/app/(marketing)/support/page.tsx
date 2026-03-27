import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import { ptComponents } from '@/lib/sanity/portable-text-components'
import type { Metadata } from 'next'

const supportQuery = `*[_type == "supportPage"][0]{
  title, subtitle, body, seo
}`

export async function generateMetadata(): Promise<Metadata> {
  const page = await client.fetch(supportQuery)
  return {
    title: page?.seo?.metaTitle || page?.title || 'Support',
    description: page?.seo?.metaDescription || page?.subtitle || 'Get help when you need it.',
  }
}

export default async function SupportPage() {
  let page: any = null
  try {
    page = await client.fetch(supportQuery, {}, { next: { tags: ['supportPage'] } })
  } catch {
    page = null
  }

  return (
    <>
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
            <h1 className="c-title-3 text-bw-gray-800">{page?.title || 'Support'}</h1>
          </div>
          <p className="c-text-3 text-bw-gray-500 mt-10">{page?.subtitle || 'Get help when you need it.'}</p>
        </div>
      </section>

      <section className="pb-24 max-w-3xl mx-auto px-5">
        {page?.body ? (
          <div className="prose-brand">
            <PortableText components={ptComponents} value={page.body} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-bw-gray-500 mb-6">
              Need help? Our team is ready to assist you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
              <a
                href="mailto:support@brightwave.io"
                className="group rounded-lg border border-bw-gray-200 bg-white p-6 text-center transition-all hover:border-bw-gray-800 hover:bg-bw-gray-700"
              >
                <h3 className="text-lg font-semibold text-bw-gray-800 group-hover:text-white transition-colors">Email Support</h3>
                <p className="mt-2 text-sm text-bw-gray-500 group-hover:text-bw-gray-600 transition-colors">support@brightwave.io</p>
              </a>
              <a
                href="/contact"
                className="group rounded-lg border border-bw-gray-200 bg-white p-6 text-center transition-all hover:border-bw-gray-800 hover:bg-bw-gray-700"
              >
                <h3 className="text-lg font-semibold text-bw-gray-800 group-hover:text-white transition-colors">Contact Us</h3>
                <p className="mt-2 text-sm text-bw-gray-500 group-hover:text-bw-gray-600 transition-colors">Get in touch with our team</p>
              </a>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
