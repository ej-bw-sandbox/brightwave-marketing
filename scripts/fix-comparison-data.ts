/**
 * Idempotent cleanup script for the `comparison` document type. Aligns Sanity
 * data with the cleaned schema and pulls in the per-page content that was
 * previously left empty.
 *
 *  Per doc this script:
 *    - Adds `_type: 'comparisonRow'` to every comparisonTable item.
 *    - Adds `_type: 'contentBlock'` to every contentBlocks item.
 *    - Coerces boolean comparisonTable values to 'yes'/'no' strings (the
 *      schema only allows the string forms).
 *    - Links the document to the `Private Markets` category.
 *    - Populates `heroDescriptionList` (3 bullets / page) from Webflow.
 *    - Populates `seo.metaTitle` + `seo.metaDescription` from Webflow.
 *    - Sets `stats` to ['25x — Faster Research Times', '2,000+ — Page
 *      Processing Volume'] (matches Webflow exactly).
 *    - References the shared testimonial doc.
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
const SHARED_TESTIMONIAL_ID = '670a2b9c-a5a8-4d4d-937e-d7df4556e354'

const sharedStats = [
  { _key: 'st1', _type: 'stat', value: '25x', label: 'Faster Research Times' },
  { _key: 'st2', _type: 'stat', value: '2,000+', label: 'Page Processing Volume' },
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

/* SEO meta scraped from Webflow live pages. */
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

function normalizeTableRow(row: Record<string, unknown>): Record<string, unknown> {
  const out: Record<string, unknown> = { ...row, _type: 'comparisonRow' }
  for (const field of ['brightwaveValue', 'competitorValue'] as const) {
    const v = out[field]
    if (v === true) out[field] = 'yes'
    else if (v === false) out[field] = 'no'
  }
  return out
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
      testimonial: { _type: 'reference', _ref: SHARED_TESTIMONIAL_ID },
      stats: sharedStats,
    }

    if (Array.isArray(doc.comparisonTable)) {
      fields.comparisonTable = doc.comparisonTable.map(normalizeTableRow)
    }
    if (Array.isArray(doc.contentBlocks)) {
      fields.contentBlocks = doc.contentBlocks.map((b) => ({ ...b, _type: 'contentBlock' }))
    }
    if (heroBullets[slug]) fields.heroDescriptionList = heroBullets[slug]
    if (seoData[slug]) fields.seo = { ...seoData[slug] }

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
