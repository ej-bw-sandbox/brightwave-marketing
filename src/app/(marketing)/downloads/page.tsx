import type { Metadata } from 'next'
import { client } from '@/lib/sanity/client'
import { downloadsQuery } from '@/lib/sanity/queries/downloads'
import { buildMetadata } from '@/lib/metadata'
import { StepCtaSection } from '@/components/sections/StepCtaSection'
import { fetchManifest } from '@/lib/downloads/manifest'
import { DownloadSection } from './DownloadSection'

export async function generateMetadata(): Promise<Metadata> {
  const doc = await client.fetch(downloadsQuery, {}, { next: { tags: ['downloadsPage'], revalidate: 60 } })
  if (!doc) return { title: 'Downloads | Brightwave' }
  return buildMetadata({
    title: doc.headline || 'Downloads | Brightwave',
    description: doc.subheadline || 'Download Brightwave for your platform.',
    seo: doc.seo,
    path: '/downloads',
  })
}

export default async function Page() {
  const [doc, manifest] = await Promise.all([
    client.fetch(downloadsQuery, {}, { next: { tags: ['downloadsPage'], revalidate: 60 } }).catch(() => null),
    fetchManifest(),
  ])

  if (!doc) return null

  return (
    <>
      <section className="c-section relative overflow-hidden">
        <div className="c-container relative z-10">
          <div className="flex flex-col items-center text-center py-16 md:py-24">
            {doc.headline && (
              <h1 className="c-title-1">{doc.headline}</h1>
            )}
            {doc.subheadline && (
              <p className="c-text-2 max-w-3xl mt-4 mb-16 text-bw-gray-300">{doc.subheadline}</p>
            )}
            <DownloadSection manifest={manifest} />
          </div>
        </div>
      </section>

      <StepCtaSection />
    </>
  )
}
