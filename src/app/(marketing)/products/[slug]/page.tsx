import { client } from '@/lib/sanity/client'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { Hero } from '@/components/sections/Hero'
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
        size="large"
        gradient
      />

      {/* Description */}
      {product.description && (
        <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <div className="prose prose-invert prose-lg max-w-none prose-headings:text-bw-gray-50 prose-p:text-bw-gray-200 prose-a:text-bw-yellow-500">
            <PortableText value={product.description} />
          </div>
        </section>
      )}

      {/* Features */}
      {features.length > 0 && (
        <section className="pb-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold text-bw-gray-50 mb-8">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((f: any) => (
              <Link
                key={f.slug?.current}
                href={`/features/${f.slug?.current}`}
                className="group rounded-xl border border-bw-gray-600 bg-bw-gray-700/40 p-6 transition-colors hover:border-bw-gray-300"
              >
                <h3 className="text-lg font-semibold text-bw-gray-50 group-hover:text-bw-yellow-500 transition-colors">
                  {f.title}
                </h3>
                {f.excerpt && (
                  <p className="mt-2 text-sm text-bw-gray-300 line-clamp-2">{f.excerpt}</p>
                )}
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Roles, Industries, Use Cases */}
      <section className="pb-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {roles.length > 0 && (
            <div>
              <h3 className="text-xs font-semibold tracking-wider text-bw-yellow-500 uppercase mb-4">
                Roles
              </h3>
              <ul className="space-y-2">
                {roles.map((r: any) => (
                  <li key={r.slug?.current}>
                    <Link
                      href={`/i-am-a/${r.slug?.current}`}
                      className="text-sm text-bw-gray-200 hover:text-bw-yellow-500 transition-colors"
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
              <h3 className="text-xs font-semibold tracking-wider text-bw-yellow-500 uppercase mb-4">
                Industries
              </h3>
              <ul className="space-y-2">
                {industries.map((i: any) => (
                  <li key={i.slug?.current}>
                    <Link
                      href={`/firm-types/${i.slug?.current}`}
                      className="text-sm text-bw-gray-200 hover:text-bw-yellow-500 transition-colors"
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
              <h3 className="text-xs font-semibold tracking-wider text-bw-yellow-500 uppercase mb-4">
                Use Cases
              </h3>
              <ul className="space-y-2">
                {useCases.map((u: any) => (
                  <li key={u.slug?.current}>
                    <Link
                      href={`/use-cases/${u.slug?.current}`}
                      className="text-sm text-bw-gray-200 hover:text-bw-yellow-500 transition-colors"
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
    </>
  )
}
