import { client } from '@/lib/sanity/client'
import { CtaSection } from '@/components/sections/CtaSection'
import Link from 'next/link'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Platform Features | Brightwave',
  description: 'Everything you need to move faster. Explore AI-powered capabilities for investment research.',
}

const featuresQuery = `*[_type == "platformFeature"] | order(title asc) {
  _id, title, "slug": slug.current, tagline, tags
}`

interface FeatureItem {
  slug: string
  title: string
  description: string
}

interface FeatureCategory {
  id: string
  label: string
  items: FeatureItem[]
}

const categoryDefs: FeatureCategory[] = [
  {
    id: 'create',
    label: 'Create',
    items: [
      { slug: 'presentations', title: 'Presentations', description: 'Build investor-grade decks' },
      { slug: 'reports', title: 'Reports', description: 'Generate deep analysis reports' },
      { slug: 'artifacts', title: 'Artifacts', description: 'Charts, tables, and visuals' },
      { slug: 'excel-spreadsheets', title: 'Excel/Spreadsheets', description: 'Data analysis tools' },
    ],
  },
  {
    id: 'analyze',
    label: 'Analyze',
    items: [
      { slug: 'extraction-grid', title: 'Extraction Grid', description: 'Pull structured data from documents' },
      { slug: 'web-search', title: 'Web Search', description: 'Real-time information retrieval' },
      { slug: 'public-markets-data', title: 'Public Markets Data', description: 'Financial market insights' },
    ],
  },
  {
    id: 'productivity',
    label: 'Productivity',
    items: [
      { slug: 'quick-prompts', title: 'Quick Prompts', description: 'Save time with saved shortcuts' },
      { slug: 'templates', title: 'Templates', description: 'Reusable analysis blueprints' },
      { slug: 'custom-instructions', title: 'Custom Instructions', description: 'Personalize AI behavior' },
      { slug: 'skills', title: 'Skills', description: 'Build repeatable AI workflows' },
      { slug: 'connected-apps', title: 'Connected Apps', description: 'Native integrations' },
      { slug: 'sandbox-agents', title: 'Sandbox Agents', description: 'Autonomous AI execution' },
    ],
  },
  {
    id: 'collaborate',
    label: 'Collaborate',
    items: [
      { slug: 'team-collaboration', title: 'Team Collaboration', description: 'Work together seamlessly' },
      { slug: 'sharing', title: 'Sharing', description: 'Share work with anyone' },
      { slug: 'integrations', title: 'Integrations', description: 'Connect your existing tools' },
    ],
  },
]

export default async function FeaturesPage() {
  let sanityFeatures: any[] = []
  try {
    sanityFeatures = await client.fetch(featuresQuery, {}, { next: { tags: ['platformFeature'] } }) ?? []
  } catch {
    sanityFeatures = []
  }

  const sanityMap = new Map<string, any>()
  for (const f of sanityFeatures) {
    if (f.slug) sanityMap.set(f.slug, f)
  }

  return (
    <>
      <section className="c-section cc-hero">
        <div className="c-container">
          <div className="flex justify-between items-end gap-10 border-b border-bw-gray-200 pb-10">
            <h1 className="c-title-3 text-bw-gray-800">
              Everything you need to move faster
            </h1>
          </div>
          <p className="c-text-3 text-bw-gray-500 mt-10">
            Purpose-built AI capabilities for investment research, due diligence, and portfolio monitoring.
          </p>
        </div>
      </section>

      {categoryDefs.map((cat) => (
        <section key={cat.id} id={cat.id} className="px-5 pb-20">
          <div className="mx-auto max-w-site">
            <div className="eyebrow cc-no-bp mb-8">
              <div className="block cc-primary" />
              <span className="c-title-5">{cat.label}</span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.items.map((item) => {
                const sanityData = sanityMap.get(item.slug)
                const description = sanityData?.heroH1 || item.description
                return (
                  <Link
                    key={item.slug}
                    href={`/features/${item.slug}`}
                    className="group flex items-start gap-4 rounded-lg border border-bw-gray-200 bg-white p-5 transition-all hover:border-bw-gray-800 hover:bg-bw-gray-700"
                  >
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-bw-gray-800 group-hover:text-white transition-colors">
                        {sanityData?.title || item.title}
                      </h3>
                      <p className="mt-1 text-xs text-bw-gray-500 leading-relaxed line-clamp-2 group-hover:text-bw-gray-600 transition-colors">
                        {description}
                      </p>
                      <span className="mt-2 inline-block text-xs font-medium text-bw-yellow-600 opacity-0 group-hover:opacity-100 transition-opacity group-hover:text-bw-yellow-500">
                        Learn more &rarr;
                      </span>
                    </div>
                  </Link>
                )
              })}
            </div>
          </div>
        </section>
      ))}

      <CtaSection
        headline="Experience the full platform"
        subheadline="See how these features work together to accelerate your research."
        ctas={[
          { label: 'Schedule a Demo', url: '/contact', style: 'primary' },
          { label: 'View Pricing', url: '/pricing', style: 'secondary' },
        ]}
        variant="brand"
      />
    </>
  )
}
