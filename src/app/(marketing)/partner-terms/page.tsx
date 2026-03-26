import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { partner_termsQuery } from '@/lib/sanity/queries/partner-terms'
import { buildMetadata } from '@/lib/metadata'
import { PortableTextRenderer } from '@/components/sections/PortableTextRenderer'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(partner_termsQuery, {}, { next: { tags: ['partnerTermsPage'], revalidate: 3600 } })
  if (!doc) return {}
  return buildMetadata({
    title: doc.title,
    description: doc.seo?.metaDescription || '',
    seo: doc.seo,
    path: '/partner-terms',
  })
}

export default async function Page() {
  let doc: any = null
  try {
    doc = await client.fetch(partner_termsQuery, {}, { next: { tags: ['partnerTermsPage'], revalidate: 3600 } })
  } catch {
    doc = null
  }

  if (!doc) return null

  return (
    <>
      <div className="main">
        <section className="c-section cc-legal">
          <div className="c-container">
            <div className="grid cc-8">
              <div id="w-node-b7d89e17-45e9-fcac-1fde-18aac1a9272e-1e775268" className="legal_flex">
                <div className="legal_titles">
                  <div className="legal_title">
                    <div className="c-title-2">
                      {doc.headerLine1.split('\n').map((line: string, i: number) => (
                        <span key={i}>
                          {i > 0 && <br />}
                          {line}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="legal_title cc-right">
                    <div className="c-title-2">{doc.headerLine2}</div>
                  </div>
                  <div className="legal_date">
                    <div className="block"></div>
                    <div className="c-title-5">{doc.effectiveDate}</div>
                  </div>
                </div>
                <PortableTextRenderer value={doc.body} className="legal-rt w-richtext" />
              </div>
            </div>
          </div>
        </section>
      </div>
    </>
  )
}
