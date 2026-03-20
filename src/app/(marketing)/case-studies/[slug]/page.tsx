import Image from 'next/image'
import { client } from '@/lib/sanity/client'
import { urlFor } from '@/lib/sanity/image'
import { caseStudyQuery, caseStudySlugsQuery } from '@/lib/sanity/queries/case-studies'
import { buildMetadata } from '@/lib/metadata'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { CtaButton } from '@/components/sections/CtaButton'
import Link from 'next/link'
import type { Metadata } from 'next'

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(caseStudySlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const doc = await client.fetch(caseStudyQuery, { slug }, { next: { tags: ['caseStudy'] } })
  if (!doc) return { title: 'Not Found' }
  return buildMetadata({
    title: doc.title || '',
    description: doc.seo?.metaDescription || doc.excerpt || '',
    seo: doc.seo,
    path: '/case-studies/' + slug,
  })
}

export default async function CasestudiesDetailPage({ params }: Props) {
  const { slug } = await params
  const doc = await client.fetch(caseStudyQuery, { slug }, { next: { tags: ['caseStudy'] } })

  if (!doc) notFound()

  const moreCaseStudies = doc.moreCaseStudies ?? []

  return (
    <>
      {/* Hero */}
      <section className="c-section cc-hero">
        <div className="c-container">
          <Link
            href="/case-studies"
            className="text-sm text-bw-yellow-600 hover:text-bw-yellow-700 transition-colors mb-4 inline-block"
          >
            &larr; All Case Studies
          </Link>
          <div className="flex items-start gap-6 border-b border-bw-gray-200 pb-10">
            {doc.companyLogo?.asset && (
              <Image
                src={urlFor(doc.companyLogo).width(120).url()}
                alt={doc.title || ''}
                width={120}
                height={40}
                className="object-contain flex-shrink-0"
              />
            )}
            <h1 className="c-title-1 text-bw-gray-800">{doc.title}</h1>
          </div>
          {doc.heroDescription && (
            <p className="c-text-3 text-bw-gray-500 mt-10">{doc.heroDescription}</p>
          )}
          {doc.thumbnail?.asset && (
            <div className="relative mt-10 aspect-video overflow-hidden rounded-lg">
              <Image
                src={urlFor(doc.thumbnail).width(1400).height(788).quality(85).url()}
                alt={doc.title || ''}
                fill
                className="object-cover"
                priority
              />
            </div>
          )}
        </div>
      </section>

      {/* Stats */}
      {doc.stats && doc.stats.length > 0 && (
        <section className="c-section">
          <div className="c-container">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {doc.stats.map((stat: any, i: number) => (
                <div key={i} className="flex flex-col gap-2">
                  <span className="c-title-3 text-bw-gray-800">{stat.value}</span>
                  <span className="c-text-4 text-bw-gray-500">{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Body */}
      {doc.body && Array.isArray(doc.body) && (
        <section className="pb-24 max-w-4xl mx-auto px-5">
          <div className="prose-brand">
            <PortableText value={doc.body} />
          </div>
        </section>
      )}

      {/* More Case Studies */}
      {moreCaseStudies.length > 0 && (
        <section className="pb-24 max-w-site mx-auto px-5">
          <h2 className="c-title-5 text-bw-gray-800 mb-6">More Case Studies</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {moreCaseStudies.map((cs: any) => (
              <Link
                key={cs.slug?.current}
                href={`/case-studies/${cs.slug?.current}`}
                className="group rounded-lg border border-bw-gray-200 overflow-hidden transition-all hover:border-bw-gray-300"
              >
                {cs.thumbnail?.asset && (
                  <div className="aspect-video relative overflow-hidden">
                    <Image
                      src={urlFor(cs.thumbnail).width(400).height(225).quality(80).url()}
                      alt={cs.title || ''}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                  </div>
                )}
                <div className="p-5">
                  <h3 className="font-semibold text-bw-gray-800 group-hover:text-bw-yellow-600 transition-colors">
                    {cs.title}
                  </h3>
                  {cs.excerpt && <p className="mt-1 text-sm text-bw-gray-500 line-clamp-2">{cs.excerpt}</p>}
                </div>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="c-section">
        <div className="c-container">
          <div className="flex flex-col gap-5">
            <h2 className="c-title-3 text-bw-gray-800">Ready to get started?</h2>
            <p className="c-text-3 text-bw-gray-500">
              See how Brightwave can transform your research workflow.
            </p>
            <div className="flex flex-wrap gap-2.5 mt-5">
              <CtaButton label="Start Free Trial" href="https://app.brightwave.io/register" variant="primary" />
              <CtaButton label="Get a Demo" href="/contact" variant="outline" />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
