import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { Hero } from '@/components/sections/Hero'
import { CtaSection } from '@/components/sections/CtaSection'
import Link from 'next/link'
import type { Metadata } from 'next'

const productQuery = `*[_type == "product" && slug.current == $slug][0]{
  title, slug, tagline, description,
  heroImage{ asset->{ url, metadata { lqip, dimensions } } },
  features[]->{title, slug, excerpt, tags},
  roles[]->{title, slug},
  industries[]->{title, slug},
  useCases[]->{title, slug},
  seo
}`

const productSlugsQuery = `*[_type == "product" && defined(slug.current)]{ "slug": slug.current }`

interface PageProps {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const slugs = await client.fetch(productSlugsQuery)
  return (slugs ?? []).map((s: { slug: string }) => ({ slug: s.slug }))
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params
  const product = await client.fetch(productQuery, { slug })
  if (!product) return {}
  return {
    title: product.seo?.metaTitle || product.title,
    description: product.seo?.metaDescription || product.tagline,
  }
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params
  const product = await client.fetch(
    productQuery,
    { slug },
    { next: { tags: ['product'] } }
  )
  if (!product) notFound()

  const features = product.features ?? []
  const roles = product.roles ?? []
  const industries = product.industries ?? []
  const useCases = product.useCases ?? []

  return (
    <>
      <Hero
        headline={product.title}
        subheadline={product.tagline}
        ctas={[
          { label: 'Try for Free', url: '/contact', style: 'primary' as const },
          { label: 'Get a Demo', url: '/contact', style: 'secondary' as const },
        ]}
        size="large"
        image={product.heroImage}
      />

      {/* Description */}
      {product.description && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="prose-brand">
            <PortableText value={product.description} />
          </div>
        </section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <section className="pb-16 max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="eyebrow cc-no-bp mb-8">
            <div className="block cc-primary" />
            <span className="c-title-5">Features</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f: any) => (
              <Link
                key={f.slug?.current}
                href={`/features/${f.slug?.current}`}
                className="group rounded-lg border border-bw-gray-200 bg-white p-6 transition-all hover:border-bw-gray-800 hover:bg-bw-gray-700"
              >
                <h3 className="text-lg font-semibold text-bw-gray-800 group-hover:text-white transition-colors">
                  {f.title}
                </h3>
                {f.excerpt && (
                  <p className="mt-2 text-sm text-bw-gray-500 line-clamp-2 group-hover:text-bw-gray-600 transition-colors">{f.excerpt}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Roles, Industries, Use Cases */}
      {(roles.length > 0 || industries.length > 0 || useCases.length > 0) && (
        <section className="pb-24 max-w-site mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {roles.length > 0 && (
              <div>
                <div className="eyebrow cc-no-bp mb-4">
                  <div className="block cc-primary" />
                  <span className="c-title-5">Roles</span>
                </div>
                <ul className="space-y-2">
                  {roles.map((r: any) => (
                    <li key={r.slug?.current}>
                      <Link
                        href={`/i-am-a/${r.slug?.current}`}
                        className="text-sm text-bw-gray-600 hover:text-bw-yellow-600 transition-colors"
                      >
                        {r.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {industries.length > 0 && (
              <div>
                <div className="eyebrow cc-no-bp mb-4">
                  <div className="block cc-primary" />
                  <span className="c-title-5">Firm Types</span>
                </div>
                <ul className="space-y-2">
                  {industries.map((i: any) => (
                    <li key={i.slug?.current}>
                      <Link
                        href={`/firm-types/${i.slug?.current}`}
                        className="text-sm text-bw-gray-600 hover:text-bw-yellow-600 transition-colors"
                      >
                        {i.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            {useCases.length > 0 && (
              <div>
                <div className="eyebrow cc-no-bp mb-4">
                  <div className="block cc-primary" />
                  <span className="c-title-5">Use Cases</span>
                </div>
                <ul className="space-y-2">
                  {useCases.map((u: any) => (
                    <li key={u.slug?.current}>
                      <Link
                        href={`/use-cases/${u.slug?.current}`}
                        className="text-sm text-bw-gray-600 hover:text-bw-yellow-600 transition-colors"
                      >
                        {u.title}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>
      )}

      <CtaSection
        headline="Ready to accelerate your research?"
        subheadline="See how Brightwave can transform your investment workflow."
        ctas={[
          { label: 'Schedule a Demo', url: '/contact', style: 'primary' },
          { label: 'View Pricing', url: '/pricing', style: 'secondary' },
        ]}
        variant="brand"
      />
    </>
  )
}
