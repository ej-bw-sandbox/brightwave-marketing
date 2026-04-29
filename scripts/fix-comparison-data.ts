/**
 * One-off cleanup script that aligns existing comparison documents in Sanity
 * with the cleaned-up comparison schema (validation errors → 0).
 *
 *  - Adds `_type: 'comparisonRow'` to every comparisonTable item.
 *  - Adds `_type: 'contentBlock'` to every contentBlocks item.
 *  - Links every comparison to the `Private Markets` category.
 *  - Populates `heroDescriptionList` (string array) from Webflow.
 *  - Populates `seo.metaTitle` and `seo.metaDescription` from Webflow.
 *  - Backfills `stats` on docs that are missing them.
 *
 * Usage: npx tsx scripts/fix-comparison-data.ts
 */

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN
if (!projectId || !dataset || !token) {
  console.error('Missing required env vars.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false, token })

const COMPARISON_CATEGORY_ID = 'comp-cat-private-markets'

const sharedStats = [
  { _key: 'st1', _type: 'stat', value: '25x', label: 'Faster Research Times' },
  { _key: 'st2', _type: 'stat', value: '10,000+', label: 'Page Processing Volume' },
]

/* Hero bullet lists, scraped from brightwave.webflow.io live pages. */
const heroBullets: Record<string, string[]> = {
  'brightwave-vs-alphasense': [
    'Purpose-built for private markets research',
    'Private document processing vs public data search',
    'Complete research deliverables vs data discovery',
  ],
  'brightwave-vs-blueflame-ai': [
    'Autonomous research agents vs workflow automation tools',
    '25x speed processing 2000+ documents vs task optimization',
    'Sentence-level attribution vs workflow efficiency',
  ],
  'brightwave-vs-boosted-ai': [
    'Autonomous research agents vs process automation tools',
    '2000+ document synthesis with 25x speed improvement',
    'Finished investment deliverables vs workflow notifications',
  ],
  'brightwave-vs-chatgpt': [
    'Purpose-built for private markets research',
    'Enterprise security and data confidentiality',
    'Complete research artifacts with citations',
  ],
  'brightwave-vs-claude': [
    'Purpose-built for private markets research',
    'Complete research artifacts with citations',
    'Enterprise security and confidentiality',
  ],
  'brightwave-vs-daloopa-ai': [
    '2000+ document synthesis vs limited financial extraction',
    'Autonomous research agents vs manual data entry assistance',
    'Complete investment narratives vs Excel model updates',
  ],
  'brightwave-vs-hebbia': [
    'Autonomous agents with background processing',
    'Customizable templates vs Matrix queries',
    'Complete research deliverables vs query results',
  ],
  'brightwave-vs-perplexity': [
    'Private document processing vs web search',
    'Comprehensive research creation vs search summaries',
    'Enterprise confidentiality vs public search',
  ],
  'brightwave-vs-rogo-ai': [
    'Purpose-built for private markets research',
    'Complete research artifacts with citations',
    'Autonomous agents with background processing',
  ],
}

/* SEO meta from Webflow live pages. */
const seoData: Record<string, { metaTitle: string; metaDescription: string }> = {
  'brightwave-vs-alphasense': {
    metaTitle: 'Brightwave vs AlphaSense',
    metaDescription: 'Brightwave creates comprehensive research deliverables while AlphaSense focuses on data, search and monitoring.',
  },
  'brightwave-vs-blueflame-ai': {
    metaTitle: 'Brightwave vs Blueflame AI',
    metaDescription: "Brightwave's agentic research platform creates finished investment products while Blueflame AI automates workflows.",
  },
  'brightwave-vs-boosted-ai': {
    metaTitle: 'Brightwave vs Boosted AI',
    metaDescription: "Brightwave's agentic research delivers finished investment products while Boosted AI automates operational workflows.",
  },
  'brightwave-vs-chatgpt': {
    metaTitle: 'Brightwave vs ChatGPT',
    metaDescription: 'Brightwave is purpose-built for private markets research while ChatGPT is a general-purpose assistant.',
  },
  'brightwave-vs-claude': {
    metaTitle: 'Brightwave vs Claude',
    metaDescription: 'Brightwave is purpose-built for private markets research while Claude is a general-purpose assistant.',
  },
  'brightwave-vs-daloopa-ai': {
    metaTitle: 'Brightwave vs Daloopa AI',
    metaDescription: "Brightwave's agentic research creates finished investment products while Daloopa extracts financial data into spreadsheets.",
  },
  'brightwave-vs-hebbia': {
    metaTitle: 'Brightwave vs Hebbia',
    metaDescription: "Brightwave's autonomous agents create complete research deliverables while Hebbia requires manual query oversight.",
  },
  'brightwave-vs-perplexity': {
    metaTitle: 'Brightwave vs Perplexity',
    metaDescription: 'Brightwave creates comprehensive research deliverables while Perplexity focuses on search and discovery.',
  },
  'brightwave-vs-rogo-ai': {
    metaTitle: 'Brightwave vs Rogo AI',
    metaDescription: 'Brightwave creates comprehensive research deliverables while Rogo AI focuses on banking workflow automation.',
  },
}

interface ComparisonDoc {
  _id: string
  _type: string
  slug?: { current?: string }
  comparisonTable?: Array<Record<string, unknown>>
  contentBlocks?: Array<Record<string, unknown>>
  stats?: Array<Record<string, unknown>>
}

async function run() {
  const docs = await client.fetch<ComparisonDoc[]>(
    `*[_type == "comparison"]{ _id, _type, slug, comparisonTable, contentBlocks, stats }`
  )

  let tx = client.transaction()
  let count = 0

  for (const doc of docs) {
    const slug = doc.slug?.current
    if (!slug) continue

    const fields: Record<string, unknown> = {
      comparisonCategory: { _type: 'reference', _ref: COMPARISON_CATEGORY_ID },
    }

    if (Array.isArray(doc.comparisonTable)) {
      fields.comparisonTable = doc.comparisonTable.map((row) => ({ ...row, _type: 'comparisonRow' }))
    }
    if (Array.isArray(doc.contentBlocks)) {
      fields.contentBlocks = doc.contentBlocks.map((b) => ({ ...b, _type: 'contentBlock' }))
    }
    if (heroBullets[slug]) {
      fields.heroDescriptionList = heroBullets[slug]
    }
    if (seoData[slug]) {
      fields.seo = { ...seoData[slug] }
    }
    if (!Array.isArray(doc.stats) || doc.stats.length === 0) {
      fields.stats = sharedStats
    }

    console.log(`Patching ${doc._id}: ${Object.keys(fields).join(', ')}`)
    tx = tx.patch(doc._id, (p) => p.set(fields))
    count++
  }

  console.log(`\nCommitting ${count} patches...`)
  const result = await tx.commit()
  console.log(`Done! Transaction: ${result.transactionId}`)
}

run().catch((err) => {
  console.error('Fix failed:', err)
  process.exit(1)
})
