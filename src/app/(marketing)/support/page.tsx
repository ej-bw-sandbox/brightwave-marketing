import { client } from '@/lib/sanity/client'
import { PortableText } from '@portabletext/react'
import { Hero } from '@/components/sections/Hero'
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
      <Hero
        headline={page?.title || 'Support'}
        subheadline={page?.subtitle || 'Get help when you need it.'}
        size="default"
        gradient={false}
      />

      <section className="pb-24 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {page?.body ? (
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-bw-gray-50 prose-p:text-bw-gray-200 prose-a:text-bw-yellow-500">
            <PortableText value={page.body} />
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-bw-gray-300 mb-6">
              Need help? Our team is ready to assist you.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-xl mx-auto">
              <a
                href="mailto:support@brightwave.io"
                className="rounded-xl border border-bw-gray-600 bg-bw-gray-700/40 p-6 text-center transition-colors hover:border-bw-gray-300"
              >
                <h3 className="text-lg font-semibold text-bw-gray-50">Email Support</h3>
                <p className="mt-2 text-sm text-bw-gray-300">support@brightwave.io</p>
              </a>
              <a
                href="/contact"
                className="rounded-xl border border-bw-gray-600 bg-bw-gray-700/40 p-6 text-center transition-colors hover:border-bw-gray-300"
              >
                <h3 className="text-lg font-semibold text-bw-gray-50">Contact Us</h3>
                <p className="mt-2 text-sm text-bw-gray-300">Get in touch with our team</p>
              </a>
            </div>
          </div>
        )}
      </section>
    </>
  )
}
