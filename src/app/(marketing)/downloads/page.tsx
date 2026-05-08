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
      <section className="downloads-shell relative isolate overflow-hidden">
        <div className="downloads-grid-bg pointer-events-none absolute inset-0 bg-[size:48px_48px] opacity-80" />
        <div className="dl-border pointer-events-none absolute inset-x-0 top-0 h-px border-t" />
        <div className="c-container relative z-10">
          <div className="mx-auto flex max-w-5xl flex-col items-center px-0 pb-10 pt-20 text-center md:pb-14 md:pt-28">
            <div className="dl-border dl-panel-soft dl-muted mb-5 inline-flex items-center rounded-[8px] border px-3 py-2 text-xs font-medium uppercase tracking-[0.14em]">
              Downloads
            </div>
            {doc.headline && (
              <h1 className="dl-text m-0 text-balance text-5xl font-semibold leading-[0.95] tracking-normal sm:text-6xl md:text-7xl">
                {doc.headline}
              </h1>
            )}
            {doc.subheadline && (
              <p className="dl-muted m-0 mt-6 max-w-3xl text-lg leading-relaxed md:text-xl">
                {doc.subheadline}
              </p>
            )}
          </div>
          <div className="pb-20 md:pb-28">
            <DownloadSection
              manifest={manifest}
              plugins={(doc.platforms ?? []).filter((p: { platform?: string }) => p.platform === 'plugins')}
            />
          </div>
        </div>
      </section>

      <StepCtaSection />
    </>
  )
}
