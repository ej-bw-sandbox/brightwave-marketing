#!/usr/bin/env node
/**
 * Migration script: Populate Sanity platformFeature documents from markdown files.
 *
 * Usage: node scripts/migrate-features.mjs [--dry-run] [--only agentic-workflows]
 */

import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

// ── Config ────────────────────────────────────────────────────────────────
const PROJECT_ID = 'v4tc8ohn'
const DATASET = 'production'
const API_VERSION = '2024-01-01'
const TOKEN = process.env.SANITY_API_TOKEN || 'sk6kj6P22wFB9Jn9pTZfBn50ufaV1rVOICgTzmy2fOsplIMXVJ0XgpOwPptharYAuTNVyhezlahTibNFDre0jWsf1iHNUxgJhQYTdh2WFSD1NBWx7Y1QHWZyxfGrDDON8Xsc7Ku6qQTCxIpUNsDV0cGQWZCoej5MjIal60khaRM8Q1AyfdE6'

const CONTENT_BASE = '/Users/ejwhite/Documents/brightwave/Website/Platform'

const DRY_RUN = process.argv.includes('--dry-run')
const ONLY = process.argv.includes('--only')
  ? process.argv[process.argv.indexOf('--only') + 1]
  : null

// ── File → slug mapping with categories ──────────────────────────────────
const FEATURES = [
  // Analyze
  { file: 'Analyze/Agentic Workflows.md', slug: 'agentic-workflows', title: 'Agentic Workflows', menuLabel: 'Agentic Workflows', menuCategory: 'Analyze' },
  { file: 'Analyze/Data Extraction-Grid.md', slug: 'data-extraction-grid', title: 'Data Extraction & Grid', menuLabel: 'Data Extraction', menuCategory: 'Analyze' },
  { file: 'Analyze/Multi-Model Intelligence.md', slug: 'multi-model-intelligence', title: 'Multi-Model Intelligence', menuLabel: 'Multi-Model Intelligence', menuCategory: 'Analyze' },
  { file: 'Analyze/Processing Volume.md', slug: 'processing-volume', title: 'Processing Volume', menuLabel: 'Processing Volume', menuCategory: 'Analyze' },
  { file: 'Analyze/Public Markets Data.md', slug: 'public-markets-data', title: 'Public Markets Data', menuLabel: 'Public Markets Data', menuCategory: 'Analyze' },
  { file: 'Analyze/Real-Time Search.md', slug: 'real-time-search', title: 'Real-Time Search', menuLabel: 'Real-Time Search', menuCategory: 'Analyze' },
  { file: 'Analyze/Sandbox Agents.md', slug: 'sandbox-agents', title: 'Sandbox Agents', menuLabel: 'Sandbox Agents', menuCategory: 'Analyze' },
  // Collaborate
  { file: 'Collaborate/Integrations.md', slug: 'integrations', title: 'Integrations', menuLabel: 'Integrations', menuCategory: 'Collaborate' },
  { file: 'Collaborate/Public Sharing.md', slug: 'public-sharing', title: 'Public Sharing', menuLabel: 'Public Sharing', menuCategory: 'Collaborate' },
  { file: 'Collaborate/Team Collaboration.md', slug: 'team-collaboration', title: 'Team Collaboration', menuLabel: 'Team Collaboration', menuCategory: 'Collaborate' },
  // Create
  { file: 'Create/Artifacts.md', slug: 'artifacts', title: 'Artifacts', menuLabel: 'Artifacts', menuCategory: 'Create' },
  { file: 'Create/Excel-Spreadsheets.md', slug: 'excel-spreadsheets', title: 'Excel & Spreadsheets', menuLabel: 'Excel & Spreadsheets', menuCategory: 'Create' },
  { file: 'Create/Presentations.md', slug: 'presentations', title: 'Presentations', menuLabel: 'Presentations', menuCategory: 'Create' },
  { file: 'Create/Reports.md', slug: 'reports', title: 'Reports', menuLabel: 'Reports', menuCategory: 'Create' },
  { file: 'Create/Word Documents.md', slug: 'word-documents', title: 'Word Documents', menuLabel: 'Word Documents', menuCategory: 'Create' },
  // Productivity
  { file: 'Productivity/Custom Instructions.md', slug: 'custom-instructions', title: 'Custom Instructions', menuLabel: 'Custom Instructions', menuCategory: 'Productivity' },
  { file: 'Productivity/Quick Prompts.md', slug: 'quick-prompts', title: 'Quick Prompts', menuLabel: 'Quick Prompts', menuCategory: 'Productivity' },
  { file: 'Productivity/Scheduled Tasks.md', slug: 'scheduled-tasks', title: 'Scheduled Tasks', menuLabel: 'Scheduled Tasks', menuCategory: 'Productivity' },
  { file: 'Productivity/Structured Planning.md', slug: 'structured-planning', title: 'Structured Planning', menuLabel: 'Structured Planning', menuCategory: 'Productivity' },
  { file: 'Productivity/Templates.md', slug: 'templates', title: 'Templates', menuLabel: 'Templates', menuCategory: 'Productivity' },
]

// ── Portable Text Helpers ────────────────────────────────────────────────
function genKey() {
  return randomUUID().replace(/-/g, '').slice(0, 12)
}

/** Parse inline markdown (bold, italic, links) into Sanity spans */
function parseInlineMarkdown(text) {
  const spans = []
  const markDefs = []
  const parts = []

  const inlineRegex = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\))/g
  let lastIndex = 0
  let match

  while ((match = inlineRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      parts.push({ text: text.slice(lastIndex, match.index), marks: [] })
    }
    if (match[2]) {
      parts.push({ text: match[2], marks: ['strong', 'em'] })
    } else if (match[3]) {
      parts.push({ text: match[3], marks: ['strong'] })
    } else if (match[4]) {
      parts.push({ text: match[4], marks: ['em'] })
    } else if (match[5] && match[6]) {
      const linkKey = genKey()
      markDefs.push({ _key: linkKey, _type: 'link', href: match[6], openInNewTab: true })
      parts.push({ text: match[5], marks: [linkKey] })
    }
    lastIndex = match.index + match[0].length
  }

  if (lastIndex < text.length) {
    parts.push({ text: text.slice(lastIndex), marks: [] })
  }

  if (parts.length === 0) {
    parts.push({ text: text, marks: [] })
  }

  const resultSpans = parts.map(p => ({
    _type: 'span',
    _key: genKey(),
    text: p.text,
    marks: p.marks,
  }))

  return { spans: resultSpans, markDefs }
}

function textBlock(text, style = 'normal', listItem = null, level = 1) {
  const { spans, markDefs } = parseInlineMarkdown(text)
  const block = {
    _type: 'block',
    _key: genKey(),
    style,
    markDefs,
    children: spans,
  }
  if (listItem) {
    block.listItem = listItem
    block.level = level
  }
  return block
}

function toBlockContent(text) {
  if (!text || !text.trim()) return []
  return [textBlock(text.trim())]
}

function bulletsToBlockContent(bullets) {
  return bullets.map(b => textBlock(b.trim(), 'normal', 'bullet', 1))
}

/** Convert multiple paragraphs and bullets into blockContent array */
function linesToBlockContent(lines) {
  const blocks = []
  let currentPara = []

  for (const line of lines) {
    const trimmed = line.trim()
    if (trimmed === '' || trimmed === '---') {
      if (currentPara.length > 0) {
        blocks.push(textBlock(currentPara.join(' ')))
        currentPara = []
      }
      continue
    }
    if (trimmed.startsWith('- ')) {
      if (currentPara.length > 0) {
        blocks.push(textBlock(currentPara.join(' ')))
        currentPara = []
      }
      blocks.push(textBlock(trimmed.replace(/^- /, ''), 'normal', 'bullet', 1))
    } else if (/^\d+\.\s/.test(trimmed)) {
      if (currentPara.length > 0) {
        blocks.push(textBlock(currentPara.join(' ')))
        currentPara = []
      }
      blocks.push(textBlock(trimmed.replace(/^\d+\.\s+/, ''), 'normal', 'number', 1))
    } else {
      currentPara.push(trimmed)
    }
  }
  if (currentPara.length > 0) {
    blocks.push(textBlock(currentPara.join(' ')))
  }
  return blocks
}

// ── Markdown Parser ──────────────────────────────────────────────────────

function parseMarkdown(content) {
  const lines = content.split('\n')
  const sections = []
  let currentSection = null

  for (const line of lines) {
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      currentSection = { type: 'h1', title: line.replace(/^# /, ''), lines: [] }
      sections.push(currentSection)
    } else if (line.startsWith('## ') && !line.startsWith('### ')) {
      currentSection = { type: 'h2', title: line.replace(/^## /, ''), lines: [] }
      sections.push(currentSection)
    } else if (line.trim() === '---') {
      // skip
    } else if (currentSection) {
      currentSection.lines.push(line)
    }
  }
  return sections
}

function extractBullets(lines) {
  return lines
    .filter(l => l.trim().startsWith('- '))
    .map(l => l.trim().replace(/^- /, ''))
}

function extractParagraphs(lines) {
  const paras = []
  let current = []
  for (const line of lines) {
    if (line.trim() === '') {
      if (current.length > 0) {
        paras.push(current.join(' '))
        current = []
      }
    } else if (!line.trim().startsWith('- ') && !line.trim().startsWith('|') &&
               !/^\d+\.\s/.test(line.trim()) && !line.trim().startsWith('[')) {
      current.push(line.trim())
    }
  }
  if (current.length > 0) paras.push(current.join(' '))
  return paras
}

function getSectionByKeyword(sections, ...keywords) {
  for (const kw of keywords) {
    const found = sections.find(s => s.type === 'h2' && s.title.toLowerCase().includes(kw.toLowerCase()))
    if (found) return found
  }
  return null
}

/** Parse bold-titled subsections within a section's lines
 *  Returns [{title, lines}] for patterns like:
 *  **Title**\n description...\n
 */
function parseBoldSubsections(lines) {
  const subsections = []
  let current = null

  for (const line of lines) {
    const trimmed = line.trim()
    // Match standalone bold headings: **Title** or **Title:**
    // But not bullet items that start with bold
    const boldMatch = trimmed.match(/^\*\*([^*]+?)\*\*:?$/)
    // Also match emoji-prefixed bold headings: **emoji Title**
    const emojiBoldMatch = !boldMatch ? trimmed.match(/^(?:[^\w\s]+ )?\*\*([^*]+?)\*\*:?$/) : null

    if ((boldMatch || emojiBoldMatch) && !trimmed.startsWith('- ')) {
      if (current) subsections.push(current)
      current = { title: (boldMatch || emojiBoldMatch)[1].replace(/^[^\w\s]+ /, '').trim(), lines: [] }
    } else if (current) {
      current.lines.push(line)
    }
  }
  if (current) subsections.push(current)
  return subsections
}

/** Parse numbered steps from lines like:
 *  1. **Title**: Description text
 */
function parseNumberedSteps(lines) {
  const steps = []
  for (const line of lines) {
    const match = line.trim().match(/^(\d+)\.\s+\*\*(.+?)\*\*:?\s*(.*)$/)
    if (match) {
      steps.push({
        number: match[1].padStart(2, '0'),
        title: match[2],
        description: match[3] || '',
      })
    }
  }
  return steps
}

// ── Feature Content Mapper ───────────────────────────────────────────────

function buildFeaturePatch(content, meta) {
  const sections = parseMarkdown(content)
  const h1Section = sections.find(s => s.type === 'h1')
  const h2Sections = sections.filter(s => s.type === 'h2')

  // ── Hero ─────────────────────────────────────────────────────────────
  const heroH1 = h1Section?.title || ''

  // The tagline comes from the first bold-pipe-separated line after h1
  let tagline = ''
  const heroParas = []
  let foundTagline = false
  if (h1Section) {
    for (const line of h1Section.lines) {
      const trimmed = line.trim()
      if (!trimmed || trimmed.startsWith('[') || trimmed.startsWith('*Powering') ||
          trimmed.startsWith('*Trusted') || trimmed.startsWith('*Processing') ||
          trimmed.startsWith('*Connecting') || trimmed.startsWith('*Join') ||
          trimmed.startsWith('*Accelerating') || trimmed.startsWith('*Enabling') ||
          (trimmed.startsWith('*') && trimmed.endsWith('*') && !trimmed.startsWith('**'))) {
        continue
      }
      if (trimmed.includes(' | ') && trimmed.startsWith('**')) {
        // Stat badges line like: **Badge1** | **Badge2** | **Badge3**
        tagline = trimmed.replace(/\*\*/g, '').trim()
        foundTagline = true
        continue
      }
      if (!foundTagline) {
        heroParas.push(trimmed)
      }
    }
  }

  const heroBodyText = heroParas.join(' ')

  // ── Capabilities (from "Challenge" section) ──────────────────────────
  // The problem statement section is always the first H2 - it uses various
  // keywords: "Challenge", "Bottleneck", "Trap", "Burden", "Gap", etc.
  const challengeSection = h2Sections[0] || null
  const capabilitiesH2 = challengeSection?.title || ''

  // Extract the first paragraph as subtitle
  const challengeParas = challengeSection ? extractParagraphs(challengeSection.lines) : []
  const capabilitiesSubtitle = challengeParas[0] || ''

  // Extract bullet points as capability pillars
  const challengeBullets = challengeSection ? extractBullets(challengeSection.lines) : []
  const capabilityPillars = challengeBullets.slice(0, 6).map(b => {
    // Try to extract bold title from bullet: **Title**: Description
    const match = b.match(/^\*\*(.+?)\*\*:?\s*(.*)$/)
    return {
      _key: genKey(),
      _type: 'object',
      title: match ? match[1] : b.slice(0, 60),
      description: match ? match[2] : b,
    }
  })

  // ── How It Works ─────────────────────────────────────────────────────
  const howSection = getSectionByKeyword(h2Sections, 'How Brightwave')
  const howItWorksH2 = howSection?.title || ''

  // Parse the numbered steps and bold subsections
  const howSteps = howSection ? parseNumberedSteps(howSection.lines) : []
  // Also parse bold-titled capability descriptions
  const howBoldSubs = howSection ? parseBoldSubsections(howSection.lines) : []

  // Extract bullets following each bold subsection for richer description
  const howItWorksSteps = howSteps.map((step, i) => {
    // Find matching bold subsection for extra bullet content
    const matchingSub = howBoldSubs.find(s =>
      s.title.toLowerCase().includes(step.title.toLowerCase().slice(0, 15))
    )
    const bullets = matchingSub ? extractBullets(matchingSub.lines) : []

    return {
      _key: genKey(),
      _type: 'object',
      number: step.number,
      label: step.title.split(/\s+/).slice(0, 3).join(' '),
      title: step.title,
      description: step.description,
      bullets: bullets.length > 0 ? bulletsToBlockContent(bullets) : toBlockContent(step.description),
    }
  })

  // If no numbered steps found, create from bold subsections under the "capabilities" part
  if (howItWorksSteps.length === 0 && howBoldSubs.length > 0) {
    // Use the first set of bold subsections that look like steps
    const coreSubs = howBoldSubs.filter(s => !s.title.toLowerCase().includes('specification'))
    coreSubs.slice(0, 4).forEach((sub, i) => {
      const paras = extractParagraphs(sub.lines)
      const bullets = extractBullets(sub.lines)
      howItWorksSteps.push({
        _key: genKey(),
        _type: 'object',
        number: String(i + 1).padStart(2, '0'),
        label: sub.title.split(/\s+/).slice(0, 3).join(' '),
        title: sub.title,
        description: paras[0] || '',
        bullets: bullets.length > 0 ? bulletsToBlockContent(bullets) : toBlockContent(paras[0] || ''),
      })
    })
  }

  // ── Deep Dive (from "Platform Capabilities" section) ─────────────────
  const capSection = getSectionByKeyword(h2Sections, 'Platform Capabilities')
  const deepDiveH2 = capSection?.title || 'Platform Capabilities'

  const capBoldSubs = capSection ? parseBoldSubsections(capSection.lines) : []
  // Split into feature rows and tech specs
  const techSpecsIdx = capBoldSubs.findIndex(s =>
    s.title.toLowerCase().includes('technical specification') ||
    s.title.toLowerCase().includes('technical capabilit') ||
    s.title.toLowerCase().includes('professional quality')
  )

  const featureSubs = techSpecsIdx >= 0 ? capBoldSubs.slice(0, techSpecsIdx) : capBoldSubs
  const specsSubs = techSpecsIdx >= 0 ? capBoldSubs.slice(techSpecsIdx) : []

  const deepDiveRows = featureSubs.map(sub => {
    const paras = extractParagraphs(sub.lines)
    const bullets = extractBullets(sub.lines)
    const bodyBlocks = []
    if (paras.length > 0) bodyBlocks.push(...paras.map(p => textBlock(p)))
    if (bullets.length > 0) bodyBlocks.push(...bulletsToBlockContent(bullets))

    return {
      _key: genKey(),
      _type: 'object',
      title: sub.title.replace(/^[^\w\s]+ /, '').trim(), // Remove emoji prefixes
      body: bodyBlocks.length > 0 ? bodyBlocks : toBlockContent(sub.title),
    }
  })

  // ── Tech Specs ───────────────────────────────────────────────────────
  const techSpecsH2 = 'Technical Specifications'
  // Collect all tech specs bullets
  const techSpecLines = []
  for (const sub of specsSubs) {
    techSpecLines.push(...sub.lines)
  }
  // Also check if there are spec bullets directly in the Platform Capabilities section
  if (techSpecLines.length === 0 && capSection) {
    // Look for "Technical Specifications:" line and grab following bullets
    let inSpecs = false
    for (const line of capSection.lines) {
      if (line.trim().match(/^\*\*Technical Specifications?:?\*\*/i)) {
        inSpecs = true
        continue
      }
      if (inSpecs && line.trim().startsWith('- ')) {
        techSpecLines.push(line)
      }
      if (inSpecs && line.trim() === '') {
        // Check if next non-empty is another bold heading
        inSpecs = false
      }
    }
  }
  const techBullets = extractBullets(techSpecLines)
  const technicalCapabilities = techBullets.length > 0
    ? bulletsToBlockContent(techBullets)
    : []

  // ── Use Cases (from "Real-World Applications") ───────────────────────
  const useCaseSection = getSectionByKeyword(h2Sections, 'Real-World Applications', 'Applications')
  const useCasesH2 = useCaseSection?.title || 'Real-World Applications'

  const useCaseBoldSubs = useCaseSection ? parseBoldSubsections(useCaseSection.lines) : []
  const useCaseCards = useCaseBoldSubs.slice(0, 6).map(sub => {
    const paras = extractParagraphs(sub.lines)
    const bullets = extractBullets(sub.lines)
    // Try to find an outcome metric in the description
    let outcome = ''
    const outcomeMatch = (paras[0] || '').match(/(\d+x\s+\w+|\d+%\s+\w+|saving \$[\d,]+|\d+\s+hours?)/i)
    if (outcomeMatch) outcome = outcomeMatch[0]

    return {
      _key: genKey(),
      _type: 'object',
      title: sub.title,
      description: paras[0] || bullets.join('. '),
      outcome: outcome,
      linkUrl: '',
    }
  })

  // Also check for "applications:" bullet lists
  if (useCaseSection) {
    const appBullets = extractBullets(useCaseSection.lines)
    // These are supplementary, not primary use case cards
    for (const bullet of appBullets.slice(0, 4)) {
      const match = bullet.match(/^\*\*(.+?)\*\*:?\s*(.*)$/)
      if (match && useCaseCards.length < 6) {
        // Only add if not already represented
        const exists = useCaseCards.some(c => c.title.toLowerCase().includes(match[1].toLowerCase().slice(0, 10)))
        if (!exists) {
          useCaseCards.push({
            _key: genKey(),
            _type: 'object',
            title: match[1],
            description: match[2],
            outcome: '',
            linkUrl: '',
          })
        }
      }
    }
  }

  // ── Output Showcase (from "Why Choose" / comparison section) ─────────
  const comparisonSection = getSectionByKeyword(h2Sections, 'Why Choose', 'vs', 'Comparison')
  const outputH2 = comparisonSection?.title || ''
  const compParas = comparisonSection ? extractParagraphs(comparisonSection.lines) : []
  const outputSubtitle = compParas[0] || ''

  // ── Social Proof (from "Trusted by" section) ─────────────────────────
  const trustSection = getSectionByKeyword(h2Sections, 'Trusted by')
  let testimonialQuote = ''
  let testimonialAttribution = ''
  if (trustSection) {
    const trustParas = extractParagraphs(trustSection.lines)
    const trustBoldSubs = parseBoldSubsections(trustSection.lines)
    // Use the first case study as a testimonial-like quote
    if (trustBoldSubs.length > 0) {
      const firstCase = trustBoldSubs[0]
      const caseParas = extractParagraphs(firstCase.lines)
      testimonialQuote = caseParas[0] || ''
      testimonialAttribution = firstCase.title
    }

    // Look for measured results
    const measuredSub = trustBoldSubs.find(s =>
      s.title.toLowerCase().includes('measured') ||
      s.title.toLowerCase().includes('result') ||
      s.title.toLowerCase().includes('performance')
    )
    if (measuredSub) {
      const measuredBullets = extractBullets(measuredSub.lines)
      if (measuredBullets.length > 0 && !testimonialQuote) {
        testimonialQuote = measuredBullets.map(b => b.replace(/\*\*/g, '')).join(' | ')
      }
    }
  }

  // ── Transform section (maps to output showcase) ──────────────────────
  const transformSection = getSectionByKeyword(h2Sections, 'Transform')
  // Avoid grabbing the CTA "Transform" if there's a more specific one
  const outputSectionFinal = transformSection && !transformSection.title.toLowerCase().includes('free trial')
    ? transformSection
    : null

  // ── CTA ──────────────────────────────────────────────────────────────
  const ctaSection = getSectionByKeyword(h2Sections, 'Start Your Free Trial')
    || getSectionByKeyword(h2Sections, 'Free Trial')
    || h2Sections[h2Sections.length - 1]

  const ctaH2 = ctaSection?.title || 'Start Your Free Trial Today'
  const ctaParas = ctaSection ? extractParagraphs(ctaSection.lines) : []
  const ctaBody = ctaParas[0] || ''
  const ctaButtonLabel = 'Start Free Trial'

  // ── Build the document patch ─────────────────────────────────────────
  const patch = {
    // Settings
    title: meta.title,
    slug: { _type: 'slug', current: meta.slug },
    menuLabel: meta.menuLabel,
    menuCategory: meta.menuCategory,

    // Hero
    heroH1: heroH1,
    tagline: tagline || '',
    heroBody: toBlockContent(heroBodyText),

    // Capabilities
    capabilitiesH2: capabilitiesH2,
    capabilitiesSubtitle: capabilitiesSubtitle.replace(/\*\*/g, '').slice(0, 500),
    capabilityPillars: capabilityPillars,

    // How It Works
    howItWorksH2: howItWorksH2,
    howItWorksSteps: howItWorksSteps,

    // Deep Dive
    deepDiveH2: deepDiveH2,
    deepDiveRows: deepDiveRows,

    // Tech Specs
    techSpecsH2: techSpecsH2,
    technicalCapabilities: technicalCapabilities,

    // Use Cases
    useCasesH2: useCasesH2,
    useCaseCards: useCaseCards,

    // Output Showcase
    outputH2: outputH2,
    outputSubtitle: outputSubtitle.replace(/\*\*/g, '').slice(0, 500),

    // Social Proof
    testimonialQuote: testimonialQuote.slice(0, 1000),
    testimonialAttribution: testimonialAttribution,

    // CTA
    ctaH2: ctaH2,
    ctaBody: ctaBody.replace(/\*\*/g, '').slice(0, 500),
    ctaButtonLabel: ctaButtonLabel,
  }

  return patch
}

// ── Sanity API ────────────────────────────────────────────────────────────

async function queryDocuments() {
  const query = encodeURIComponent('*[_type == "platformFeature"]{_id, title, "slug": slug.current, menuCategory}')
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/query/${DATASET}?query=${query}`

  const resp = await fetch(url, {
    headers: { Authorization: `Bearer ${TOKEN}` },
  })

  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`Query failed: ${resp.status} ${text}`)
  }

  const data = await resp.json()
  return data.result || []
}

async function mutateDocument(mutations) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

  const resp = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({ mutations }),
  })

  if (!resp.ok) {
    const text = await resp.text()
    throw new Error(`Mutation failed: ${resp.status} ${text}`)
  }

  return resp.json()
}

async function createOrPatchDocument(docId, fields, existingDocs) {
  const existing = existingDocs.find(d => d._id === docId || d._id === `drafts.${docId}`)

  if (existing) {
    // Patch existing document
    const mutations = [
      { patch: { id: existing._id, set: fields } },
    ]
    return mutateDocument(mutations)
  } else {
    // Create new document
    const doc = {
      _id: docId,
      _type: 'platformFeature',
      ...fields,
    }
    return mutateDocument([{ createOrReplace: doc }])
  }
}

async function publishDocument(docId) {
  // Delete draft to publish (document was written to non-draft ID)
  const draftId = `drafts.${docId}`
  try {
    await mutateDocument([{ delete: { id: draftId } }])
  } catch (e) {
    // Draft may not exist, that's fine
  }
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Platform Feature Content Migration ===')
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`)
  console.log('')

  // Query existing documents
  console.log('Querying existing platformFeature documents...')
  const existingDocs = await queryDocuments()
  console.log(`Found ${existingDocs.length} existing documents:`)
  for (const doc of existingDocs) {
    console.log(`  ${doc._id} (${doc.slug}) [${doc.menuCategory || 'no category'}]`)
  }
  console.log('')

  let processed = 0
  let errors = 0

  for (const feature of FEATURES) {
    if (ONLY && !feature.slug.includes(ONLY.toLowerCase())) continue

    const filePath = path.join(CONTENT_BASE, feature.file)

    if (!fs.existsSync(filePath)) {
      console.log(`SKIP: ${feature.file} not found`)
      continue
    }

    const docId = `platformFeature-${feature.slug}`
    console.log(`Processing: ${feature.file} -> ${docId}`)

    const content = fs.readFileSync(filePath, 'utf-8')
    const patch = buildFeaturePatch(content, feature)

    if (DRY_RUN) {
      console.log(`  Would set ${Object.keys(patch).length} fields`)
      console.log(`  heroH1: ${patch.heroH1?.slice(0, 80)}`)
      console.log(`  capabilitiesH2: ${patch.capabilitiesH2?.slice(0, 80)}`)
      console.log(`  howItWorksH2: ${patch.howItWorksH2?.slice(0, 80)}`)
      console.log(`  howItWorksSteps: ${patch.howItWorksSteps?.length} steps`)
      console.log(`  deepDiveRows: ${patch.deepDiveRows?.length} rows`)
      console.log(`  useCaseCards: ${patch.useCaseCards?.length} cards`)
      console.log(`  capabilityPillars: ${patch.capabilityPillars?.length} pillars`)
      console.log(`  technicalCapabilities: ${patch.technicalCapabilities?.length} specs`)
      console.log(`  ctaH2: ${patch.ctaH2?.slice(0, 80)}`)
      console.log('')
      processed++
      continue
    }

    try {
      // Check for existing doc by slug match (existing docs use "feature-" prefix)
      const existingBySlug = existingDocs.find(d => d.slug === feature.slug)
      const targetId = existingBySlug ? existingBySlug._id : `feature-${feature.slug}`

      const result = await createOrPatchDocument(targetId, patch, existingDocs)
      console.log(`  Saved: ${targetId} (${result.results?.length || 0} mutations)`)

      await publishDocument(targetId)
      console.log(`  Published: ${targetId}`)
      processed++
    } catch (err) {
      console.error(`  ERROR: ${err.message}`)
      errors++
    }

    console.log('')
  }

  console.log(`Done! Processed: ${processed}, Errors: ${errors}`)
}

main().catch(console.error)
