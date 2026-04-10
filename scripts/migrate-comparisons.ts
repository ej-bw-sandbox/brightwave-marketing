/**
 * Migration script to populate all comparison documents in Sanity
 * with content from the live Webflow site.
 *
 * Usage:
 *   npx tsx scripts/migrate-comparisons.ts
 *
 * Requires env vars: SANITY_API_TOKEN, NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 */

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error('Missing required env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN.')
  process.exit(1)
}

const client = createClient({ projectId, dataset, apiVersion: '2024-01-01', useCdn: false, token })

/* ── Shared use-case-fit items (identical across all Webflow pages) ── */
const sharedUseCaseFitItems = [
  { _key: 'ucf1', title: 'Accelerate Analysis', description: 'Shave hours off every review cycle. Go from buried in data to needle-moving insight in minutes.' },
  { _key: 'ucf2', title: 'Increase Conviction', description: 'Rest easy knowing every critical detail is surfaced and source-verified, reducing the risk of costly oversights.' },
  { _key: 'ucf3', title: 'Elevate Your Work', description: 'Reclaim time for strategy and thesis-building. Spend less energy on tedious grunt work, more on big-picture thinking.' },
  { _key: 'ucf4', title: 'Scale with Ease', description: 'Say yes to more deals — no late nights required. Keep quality high even under tight deadlines.' },
]

/* ── Shared FAQs (Webflow has the same Q&A on every comparison page) ── */
const sharedFaqs = [
  {
    _key: 'faq1',
    question: 'How does Brightwave ensure the accuracy of its insights?',
    answer: 'Brightwave uses state-of-the-art entailment models to cross-verify every research finding against source content, ensuring high accuracy and reliability of insights. The platform provides sentence-level attribution to underlying primary sources, allowing you to trace the origin of every data point for complete transparency.',
  },
  {
    _key: 'faq2',
    question: 'Can I customise the data sources for my analysis?',
    answer: 'Yes. Brightwave supports uploading your own proprietary documents, data rooms, and research materials. You can combine these with public data sources for comprehensive analysis tailored to your specific investment thesis.',
  },
  {
    _key: 'faq3',
    question: 'How secure is my data with Brightwave?',
    answer: 'Brightwave is SOC 2 Type II certified with enterprise-grade encryption at rest and in transit. Your data is never used to train models. We offer dedicated tenant architecture for enterprise customers with complete data isolation.',
  },
]

/* ── Shared stats ── */
const sharedStats = [
  { _key: 'st1', value: '25x', label: 'Faster Research Times' },
  { _key: 'st2', value: '10,000+', label: 'Page Processing Volume' },
]

/* ── Per-competitor data ── */

interface ComparisonData {
  competitorName: string
  heroDescription: string
  contentBlocks: { _key: string; title: string; text: string }[]
  comparisonTable: {
    _key: string
    feature: string
    brightwaveValue?: string | boolean
    brightwaveText?: string
    competitorValue?: string | boolean
    competitorText?: string
    note?: string
  }[]
}

const comparisons: Record<string, ComparisonData> = {
  'comparison-brightwave-vs-blueflame-ai': {
    competitorName: 'Blueflame AI',
    heroDescription: "Brightwave's agentic research platform creates finished investment products while Blueflame AI automates workflows.",
    contentBlocks: [
      { _key: 'cb1', title: 'Purpose-Built for Private Markets', text: 'Brightwave processes data rooms to create reports, presentations, and charts for private markets due diligence, portfolio monitoring, and analysis.' },
      { _key: 'cb2', title: 'Autonomous Agents with Background Processing', text: "Brightwave's agents work autonomously in the background, processing thousands of documents while you focus on other tasks with real-time collaboration." },
      { _key: 'cb3', title: 'Research-Driven Artifacts vs Presentation Polish', text: 'Brightwave creates investment memos, due diligence reports, and frameworks by synthesizing insights with granular citations for compliance.' },
      { _key: 'cb4', title: 'Customizable Templates for Repeatable Workflows', text: "Create, save, and reuse analytical frameworks that match your firm's workflows. Templates ensure consistency across deals and preserve knowledge." },
    ],
    comparisonTable: [
      { _key: 'tr1', feature: 'Pricing', brightwaveText: 'Starting from $200/mo', competitorText: 'Contact for pricing', note: 'Based on publicly available sources' },
      { _key: 'tr2', feature: 'Implementation Timeline', brightwaveText: 'Instant access', competitorText: 'Enterprise setup (weeks)', note: 'Based on publicly available information' },
      { _key: 'tr3', feature: 'Generates share-ready reports', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr4', feature: 'Generates PowerPoint presentations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr5', feature: 'Creates high-fidelity charts and artifacts', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr6', feature: '100% customizable and reusable templates', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr7', feature: 'Capable of processing 10,000+ documents', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr8', feature: 'Private/proprietary uploads with no loss of output fidelity', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr9', feature: 'Real-time team collaboration and sharability', brightwaveValue: 'yes', competitorValue: 'no' },
    ],
  },

  'comparison-brightwave-vs-rogo-ai': {
    competitorName: 'Rogo AI',
    heroDescription: 'Brightwave creates comprehensive research deliverables while Rogo AI focuses on banking workflow automation.',
    contentBlocks: [
      { _key: 'cb1', title: 'Private Markets vs. Investment Banking Focus', text: 'Brightwave processes data rooms to create reports, presentations, and charts for private markets due diligence, portfolio monitoring, and analysis.' },
      { _key: 'cb2', title: 'Research-Driven Artifacts vs. Presentation Polish', text: 'Brightwave creates investment memos, due diligence reports, and frameworks by synthesizing insights with granular citations for analysis.' },
      { _key: 'cb3', title: 'Autonomous Agents with Background Processing', text: "Brightwave's agents work autonomously in the background, processing thousands of documents while you focus on other tasks with real-time collaboration." },
      { _key: 'cb4', title: 'Customizable Templates for Repeatable Workflows', text: "Create, save, and reuse analytical frameworks that match your firm's workflows. Templates ensure consistency across deals and preserve knowledge." },
    ],
    comparisonTable: [
      { _key: 'tr1', feature: 'Pricing', brightwaveText: 'Starting from $200/mo', competitorText: 'Contact for pricing', note: 'Based on publicly available sources' },
      { _key: 'tr2', feature: 'Implementation Timeline', brightwaveText: 'Instant access', competitorText: 'Enterprise setup (weeks)', note: 'Based on publicly available information' },
      { _key: 'tr3', feature: 'Generates share-ready reports', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr4', feature: 'Generates PowerPoint presentations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr5', feature: 'Creates high-fidelity charts and artifacts', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr6', feature: '100% customizable and reusable templates', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr7', feature: 'Capable of processing 10,000+ documents', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr8', feature: 'Private/proprietary uploads with no loss of output fidelity', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr9', feature: 'Real-time team collaboration and sharability', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr10', feature: 'Sentence-level citations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr11', feature: 'Sentence-level regeneration, expansion and refinement', brightwaveValue: 'yes', competitorValue: 'no' },
    ],
  },

  'comparison-brightwave-vs-hebbia': {
    competitorName: 'Hebbia',
    heroDescription: "Brightwave's autonomous agents create complete research deliverables while Hebbia requires manual query oversight.",
    contentBlocks: [
      { _key: 'cb1', title: 'Autonomous Agents with Background Processing', text: "Brightwave's agents work autonomously in the background, creating complete reports, presentations, charts, and visualizations while you focus on other tasks." },
      { _key: 'cb2', title: 'Complete Research Deliverables vs. Query Results', text: 'Generate investment memos, due diligence reports, presentations, and charts synthesizing insights with sentence-level citations for client delivery.' },
      { _key: 'cb3', title: 'Customizable Templates vs Matrix Queries', text: "Define, customize, and save analytical frameworks matching your firm's workflows for consistency across deals and institutional knowledge." },
    ],
    comparisonTable: [
      { _key: 'tr1', feature: 'Pricing', brightwaveText: 'Starting from $250/mo', competitorText: 'Starting from $833+/mo', note: 'Based on publicly available sources' },
      { _key: 'tr2', feature: 'Implementation Timeline', brightwaveText: 'Instant access', competitorText: 'Enterprise setup (weeks)', note: 'Based on publicly available information' },
      { _key: 'tr3', feature: 'Generates share-ready reports', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr4', feature: 'Generates PowerPoint presentations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr5', feature: 'Creates high-fidelity charts and artifacts', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr6', feature: '100% customizable and reusable templates', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr7', feature: 'Capable of processing 10,000+ documents', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr8', feature: 'Private/proprietary uploads with no loss of output fidelity', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr9', feature: 'Real-time team collaboration and sharability', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr10', feature: 'Sentence-level citations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr11', feature: 'Sentence-level regeneration, expansion and refinement', brightwaveValue: 'yes', competitorValue: 'no' },
    ],
  },

  'comparison-brightwave-vs-boosted-ai': {
    competitorName: 'Boosted AI',
    heroDescription: "Brightwave's agentic research delivers finished investment products while Boosted AI automates operational workflows.",
    contentBlocks: [
      { _key: 'cb1', title: 'Autonomous Research Agents vs Process Automation Tools', text: "Brightwave's AI agents understand complex private markets problems and deliver finished investment products on-demand with multi-step synthesis across documents." },
      { _key: 'cb2', title: '2000+ Document Synthesis with 25x Speed', text: 'Brightwave processes thousands of documents simultaneously in minutes, delivering exhaustive coverage that reads every page, every time.' },
      { _key: 'cb3', title: 'Finished Investment Deliverables vs Workflow Notifications', text: 'Generate complete IC-ready memos with sentence-level attribution — finished products, not operational alerts or process updates.' },
      { _key: 'cb4', title: 'Agentic Research for Complex Problems', text: 'Brightwave tackles sophisticated private markets analysis using more computing power at inference time for accurate multi-document reasoning.' },
    ],
    comparisonTable: [
      { _key: 'tr1', feature: 'Pricing', brightwaveText: 'Starting from $200/mo', competitorText: 'Contact for pricing', note: 'Based on publicly available sources' },
      { _key: 'tr2', feature: 'Implementation Timeline', brightwaveText: 'Instant access', competitorText: 'Custom setup', note: 'Based on publicly available information' },
      { _key: 'tr3', feature: 'Generates share-ready reports', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr4', feature: 'Generates PowerPoint presentations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr5', feature: 'Creates high-fidelity charts and artifacts', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr6', feature: '100% customizable and reusable templates', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr7', feature: 'Capable of processing 10,000+ documents', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr8', feature: 'Private/proprietary uploads with no loss of output fidelity', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr9', feature: 'Real-time team collaboration and sharability', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr10', feature: 'Sentence-level citations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr11', feature: 'Sentence-level regeneration, expansion and refinement', brightwaveValue: 'yes', competitorValue: 'no' },
    ],
  },

  'comparison-brightwave-vs-daloopa-ai': {
    competitorName: 'Daloopa AI',
    heroDescription: "Brightwave's agentic research creates finished investment products while Daloopa extracts financial data into spreadsheets.",
    contentBlocks: [
      { _key: 'cb1', title: '2000+ Document Synthesis vs Limited Financial Extraction', text: 'Brightwave processes thousands of documents simultaneously with 25x speed improvement, weaving together comprehensive investment narratives from all deal materials.' },
      { _key: 'cb2', title: 'Autonomous Research Agents vs Manual Data Entry Assistance', text: "Brightwave's AI agents understand complex private markets problems and deliver finished products on-demand with multi-step synthesis across documents." },
      { _key: 'cb3', title: 'Complete Investment Narratives vs Excel Model Updates', text: 'Generate IC-ready investment memos with exhaustive coverage and sentence-level attribution — finished deliverables, not just updated spreadsheets.' },
      { _key: 'cb4', title: 'Agentic Research for Complex Problems', text: 'Brightwave tackles sophisticated private markets analysis using more computing power at inference time, ensuring accurate multi-document reasoning.' },
    ],
    comparisonTable: [
      { _key: 'tr1', feature: 'Pricing', brightwaveText: 'Starting from $200/mo', competitorText: 'Contact for pricing', note: 'Based on publicly available sources' },
      { _key: 'tr2', feature: 'Implementation Timeline', brightwaveText: 'Instant access', competitorText: 'Custom setup', note: 'Based on publicly available information' },
      { _key: 'tr3', feature: 'Generates share-ready reports', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr4', feature: 'Generates PowerPoint presentations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr5', feature: 'Creates high-fidelity charts and artifacts', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr6', feature: '100% customizable and reusable templates', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr7', feature: 'Capable of processing 10,000+ documents', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr8', feature: 'Private/proprietary uploads with no loss of output fidelity', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr9', feature: 'Real-time team collaboration and sharability', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr10', feature: 'Sentence-level citations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr11', feature: 'Sentence-level regeneration, expansion and refinement', brightwaveValue: 'yes', competitorValue: 'no' },
    ],
  },

  'comparison-brightwave-vs-perplexity': {
    competitorName: 'Perplexity',
    heroDescription: 'Brightwave creates comprehensive research deliverables while Perplexity focuses on search and discovery.',
    contentBlocks: [
      { _key: 'cb1', title: 'Private Document Processing vs Web Search', text: 'Brightwave processes confidential data rooms and proprietary materials to create investment analysis while maintaining complete confidentiality.' },
      { _key: 'cb2', title: 'Comprehensive Research Creation vs Search Summaries', text: 'Brightwave creates investment memos, due diligence reports, and presentations with sentence-level citations linking insights to source documents.' },
      { _key: 'cb3', title: 'Enterprise Confidentiality vs Public Search', text: 'Brightwave operates in secure environments for sensitive deal information, ensuring documents never leave your controlled environment.' },
      { _key: 'cb4', title: 'Customizable Templates for Repeatable Workflows', text: "Create, save, and reuse analytical frameworks that match your firm's workflows. Templates ensure consistency across deals and preserve knowledge." },
    ],
    comparisonTable: [
      { _key: 'tr1', feature: 'Pricing', brightwaveText: 'Starting from $200/mo', competitorText: '$20-200/mo', note: 'Based on publicly available sources' },
      { _key: 'tr2', feature: 'Implementation Timeline', brightwaveText: 'Instant access', competitorText: 'Instant access', note: 'Based on publicly available information' },
      { _key: 'tr3', feature: 'Generates share-ready reports', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr4', feature: 'Generates PowerPoint presentations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr5', feature: 'Creates high-fidelity charts and artifacts', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr6', feature: '100% customizable and reusable templates', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr7', feature: 'Capable of processing 10,000+ documents', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr8', feature: 'Private/proprietary uploads with no loss of output fidelity', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr9', feature: 'Real-time team collaboration and sharability', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr10', feature: 'Sentence-level citations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr11', feature: 'Sentence-level regeneration, expansion and refinement', brightwaveValue: 'yes', competitorValue: 'no' },
    ],
  },

  'comparison-brightwave-vs-claude': {
    competitorName: 'Claude',
    heroDescription: 'Brightwave is purpose-built for private markets research while Claude is a general-purpose assistant.',
    contentBlocks: [
      { _key: 'cb1', title: 'Purpose-Built for Private Markets Research', text: 'Brightwave processes data rooms to create reports, presentations, and charts for investment professionals in due diligence and research workflows.' },
      { _key: 'cb2', title: 'Complete Research Artifacts with Citations', text: 'Brightwave creates reports, presentations, and charts with granular citations for verification and compliance with investment standards.' },
      { _key: 'cb3', title: 'Enterprise Security and Confidentiality', text: 'Brightwave provides enterprise security with private processing, ensuring deal information stays in your controlled environment.' },
      { _key: 'cb4', title: 'Customizable Templates for Repeatable Workflows', text: "Create, save, and reuse analytical frameworks that match your firm's workflows. Templates ensure consistency across deals and preserve knowledge." },
    ],
    comparisonTable: [
      { _key: 'tr1', feature: 'Pricing', brightwaveText: 'Starting from $200/mo', competitorText: '$20/mo (Pro) - $25/user/mo (Teams)', note: 'Based on publicly available sources' },
      { _key: 'tr2', feature: 'Implementation Timeline', brightwaveText: 'Instant access', competitorText: 'Instant access', note: 'Based on publicly available information' },
      { _key: 'tr3', feature: 'Generates share-ready reports', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr4', feature: 'Generates PowerPoint presentations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr5', feature: 'Creates high-fidelity charts and artifacts', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr6', feature: '100% customizable and reusable templates', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr7', feature: 'Capable of processing 10,000+ documents', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr8', feature: 'Private/proprietary uploads with no loss of output fidelity', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr9', feature: 'Real-time team collaboration and sharability', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr10', feature: 'Sentence-level citations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr11', feature: 'Sentence-level regeneration, expansion and refinement', brightwaveValue: 'yes', competitorValue: 'no' },
    ],
  },

  'comparison-brightwave-vs-chatgpt': {
    competitorName: 'ChatGPT',
    heroDescription: 'Brightwave is purpose-built for private markets research while ChatGPT is a general-purpose assistant.',
    contentBlocks: [
      { _key: 'cb1', title: 'Purpose-Built for Private Markets Research', text: 'Brightwave is designed for investment professionals conducting due diligence, market analysis, and portfolio research with specialized frameworks.' },
      { _key: 'cb2', title: 'Enterprise Security and Data Confidentiality', text: 'Brightwave processes deal documents in a secure environment for confidential data, with no retention or training on your proprietary information.' },
      { _key: 'cb3', title: 'Complete Research Artifacts with Citations', text: 'Brightwave creates reports, presentations, and charts with sentence-level citations linking findings to source documents for compliance.' },
      { _key: 'cb4', title: 'Customizable Templates for Repeatable Workflows', text: "Create, save, and reuse analytical frameworks that match your firm's workflows. Templates ensure consistency across deals and preserve knowledge." },
    ],
    comparisonTable: [
      { _key: 'tr1', feature: 'Pricing', brightwaveText: 'Starting from $200/mo', competitorText: '$20/mo (Plus) - $200/mo (Teams)', note: 'Based on publicly available sources' },
      { _key: 'tr2', feature: 'Implementation Timeline', brightwaveText: 'Instant access', competitorText: 'Instant access', note: 'Based on publicly available information' },
      { _key: 'tr3', feature: 'Generates share-ready reports', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr4', feature: 'Generates PowerPoint presentations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr5', feature: 'Creates high-fidelity charts and artifacts', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr6', feature: '100% customizable and reusable templates', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr7', feature: 'Capable of processing 10,000+ documents', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr8', feature: 'Private/proprietary uploads with no loss of output fidelity', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr9', feature: 'Real-time team collaboration and sharability', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr10', feature: 'Sentence-level citations', brightwaveValue: 'yes', competitorValue: 'no' },
      { _key: 'tr11', feature: 'Sentence-level regeneration, expansion and refinement', brightwaveValue: 'yes', competitorValue: 'no' },
    ],
  },
}

/* ── Run migration ── */

async function migrate() {
  const existingTestimonialId = '670a2b9c-a5a8-4d4d-937e-d7df4556e354' // shared testimonial already in Sanity

  let tx = client.transaction()

  for (const [docId, data] of Object.entries(comparisons)) {
    console.log(`Patching ${docId} (${data.competitorName})...`)

    tx = tx.patch(docId, (p) =>
      p.set({
        competitorName: data.competitorName,
        heroDescription: data.heroDescription,
        contentBlocks: data.contentBlocks,
        comparisonTable: data.comparisonTable,
        useCaseFitItems: sharedUseCaseFitItems,
        faqs: sharedFaqs,
        stats: sharedStats,
        publishedAt: new Date().toISOString(),
      })
    )
  }

  console.log('\nCommitting transaction...')
  const result = await tx.commit()
  console.log(`Done! Transaction ID: ${result.transactionId}`)
  console.log(`Updated ${Object.keys(comparisons).length} comparison documents.`)
}

migrate().catch((err) => {
  console.error('Migration failed:', err)
  process.exit(1)
})
