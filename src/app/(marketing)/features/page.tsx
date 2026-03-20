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

/* ------------------------------------------------------------------ */
/*  Category definitions with hardcoded feature lists                  */
/*  (Sanity tags don't map 1:1 to these nav categories, so we        */
/*  define the grouping explicitly and merge with Sanity data)         */
/* ------------------------------------------------------------------ */

interface FeatureItem {
  slug: string
  title: string
  description: string
  icon: string
  iconBg: string
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
      { slug: 'presentations', title: 'Presentations', description: 'Build investor-grade decks', icon: '\uD83D\uDCCA', iconBg: 'bg-blue-900/40' },
      { slug: 'reports', title: 'Reports', description: 'Generate deep analysis reports', icon: '\uD83D\uDCC4', iconBg: 'bg-purple-900/40' },
      { slug: 'artifacts', title: 'Artifacts', description: 'Charts, tables, and visuals', icon: '\u2705', iconBg: 'bg-green-900/40' },
      { slug: 'excel-spreadsheets', title: 'Excel/Spreadsheets', description: 'Data analysis tools', icon: '\uD83D\uDCDD', iconBg: 'bg-gray-700/60' },
    ],
  },
  {
    id: 'analyze',
    label: 'Analyze',
    items: [
      { slug: 'extraction-grid', title: 'Extraction Grid', description: 'Pull structured data from documents', icon: '\uD83D\uDD0D', iconBg: 'bg-teal-900/40' },
      { slug: 'web-search', title: 'Web Search', description: 'Real-time information retrieval', icon: '\uD83C\uDF10', iconBg: 'bg-cyan-900/40' },
      { slug: 'public-markets-data', title: 'Public Markets Data', description: 'Financial market insights', icon: '\uD83D\uDCC8', iconBg: 'bg-emerald-900/40' },
    ],
  },
  {
    id: 'productivity',
    label: 'Productivity',
    items: [
      { slug: 'quick-prompts', title: 'Quick Prompts', description: 'Save time with saved shortcuts', icon: '\u26A1', iconBg: 'bg-yellow-900/40' },
      { slug: 'templates', title: 'Templates', description: 'Reusable analysis blueprints', icon: '\uD83D\uDCC1', iconBg: 'bg-slate-700/60' },
      { slug: 'custom-instructions', title: 'Custom Instructions', description: 'Personalize AI behavior', icon: '\uD83C\uDFA8', iconBg: 'bg-pink-900/40' },
      { slug: 'skills', title: 'Skills', description: 'Build repeatable AI workflows', icon: '\uD83E\uDDE9', iconBg: 'bg-violet-900/40' },
      { slug: 'connected-apps', title: 'Connected Apps', description: 'Native integrations', icon: '\uD83D\uDD17', iconBg: 'bg-orange-900/40' },
      { slug: 'sandbox-agents', title: 'Sandbox Agents', description: 'Autonomous AI execution', icon: '\uD83E\uDD16', iconBg: 'bg-indigo-900/40' },
    ],
  },
  {
    id: 'collaborate',
    label: 'Collaborate',
    items: [
      { slug: 'team-collaboration', title: 'Team Collaboration', description: 'Work together seamlessly', icon: '\uD83D\uDC65', iconBg: 'bg-indigo-900/40' },
      { slug: 'sharing', title: 'Sharing', description: 'Share work with anyone', icon: '\uD83D\uDD17', iconBg: 'bg-violet-900/40' },
      { slug: 'integrations', title: 'Integrations', description: 'Connect your existing tools', icon: '\uD83D\uDD27', iconBg: 'bg-orange-900/40' },
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

  // Build a lookup by slug for Sanity data enrichment
  const sanityMap = new Map<string, any>()
  for (const f of sanityFeatures) {
    if (f.slug) sanityMap.set(f.slug, f)
  }

  return (
    <>
      {/* Hero */}
      <section className="px-5 pt-24 pb-16 text-center">
        <div className="mx-auto max-w-3xl">
          <h1 className="text-title-3 text-bw-gray-50 mb-4">
            Everything you need to move faster
          </h1>
          <p className="text-body-4 text-bw-gray-300 max-w-2xl mx-auto">
            Purpose-built AI capabilities for investment research, due diligence, and portfolio monitoring.
          </p>
        </div>
      </section>

      {/* Category sections */}
      {categoryDefs.map((cat) => (
        <section key={cat.id} id={cat.id} className="px-5 pb-20">
          <div className="mx-auto max-w-7xl">
            <h2 className="text-xs font-semibold tracking-wider text-bw-yellow-500 uppercase mb-8">
              {cat.label}
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {cat.items.map((item) => {
                const sanityData = sanityMap.get(item.slug)
                const description = sanityData?.tagline || item.description
                return (
                  <Link
                    key={item.slug}
                    href={`/features/${item.slug}`}
                    className="group flex items-start gap-4 rounded-xl border border-bw-gray-600 bg-bw-gray-700/50 p-5 transition-all hover:border-bw-gray-300 hover:bg-bw-gray-700"
                  >
                    <span className={`flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg ${item.iconBg} text-lg`}>
                      {item.icon}
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-semibold text-bw-gray-50 group-hover:text-bw-yellow-500 transition-colors">
                        {sanityData?.title || item.title}
                      </h3>
                      <p className="mt-1 text-xs text-bw-gray-300 leading-relaxed line-clamp-2">
                        {description}
                      </p>
                      <span className="mt-2 inline-block text-xs font-medium text-bw-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity">
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
          { label: 'View Case Studies', url: '/case-studies', style: 'secondary' },
        ]}
        variant="brand"
      />
    </>
  )
}
