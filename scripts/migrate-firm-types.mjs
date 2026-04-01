#!/usr/bin/env node
/**
 * Migration script: Populate Sanity firm type documents from markdown files.
 *
 * Usage: node scripts/migrate-firm-types.mjs [--dry-run] [--only buyout]
 */

import fs from 'fs'
import path from 'path'
import { randomUUID } from 'crypto'

// ── Config ────────────────────────────────────────────────────────────────
const PROJECT_ID = 'v4tc8ohn'
const DATASET = 'production'
const API_VERSION = '2024-01-01'
const TOKEN = process.env.SANITY_API_TOKEN || 'sk6kj6P22wFB9Jn9pTZfBn50ufaV1rVOICgTzmy2fOsplIMXVJ0XgpOwPptharYAuTNVyhezlahTibNFDre0jWsf1iHNUxgJhQYTdh2WFSD1NBWx7Y1QHWZyxfGrDDON8Xsc7Ku6qQTCxIpUNsDV0cGQWZCoej5MjIal60khaRM8Q1AyfdE6'

const CONTENT_DIR = '/Users/ejwhite/Documents/brightwave/Website/Solutions/Private Markets/Brightwave For.../'

const DRY_RUN = process.argv.includes('--dry-run')
const ONLY = process.argv.includes('--only')
  ? process.argv[process.argv.indexOf('--only') + 1]
  : null

// Map markdown filename (without .md) to Sanity document _id
const FILE_TO_DOC = {
  'Buyout': 'firmtype-buyout',
  'Fund of Funds': 'firmtype-fund-of-funds',
  'Growth': 'firmtype-growth',
  'Infrastructure': 'firmtype-infrastructure',
  'Large Fund': 'firmtype-large-fund',
  'Lower Middle Market': 'firmtype-lower-middle-market',
  'Mega Fund': 'firmtype-mega-fund',
  'Middle Market': 'firmtype-middle-market',
  'Multi-Strategy': 'firmtype-multi-strategy',
  'Private Credit': 'firmtype-private-credit',
}

// ── Portable Text Helpers ────────────────────────────────────────────────
function genKey() {
  return randomUUID().replace(/-/g, '').slice(0, 12)
}

/** Parse inline markdown (bold, italic, links) into Sanity spans */
function parseInlineMarkdown(text) {
  const spans = []
  const markDefs = []
  // Process bold+italic patterns, bold, italic, and links
  let remaining = text
  const parts = []

  // Regex to match **bold**, *italic*, and [text](url)
  const inlineRegex = /(\*\*\*(.+?)\*\*\*|\*\*(.+?)\*\*|\*(.+?)\*|\[(.+?)\]\((.+?)\))/g
  let lastIndex = 0
  let match

  while ((match = inlineRegex.exec(remaining)) !== null) {
    // Text before match
    if (match.index > lastIndex) {
      parts.push({ text: remaining.slice(lastIndex, match.index), marks: [] })
    }

    if (match[2]) {
      // Bold+italic ***text***
      parts.push({ text: match[2], marks: ['strong', 'em'] })
    } else if (match[3]) {
      // Bold **text**
      parts.push({ text: match[3], marks: ['strong'] })
    } else if (match[4]) {
      // Italic *text*
      parts.push({ text: match[4], marks: ['em'] })
    } else if (match[5] && match[6]) {
      // Link [text](url)
      const linkKey = genKey()
      markDefs.push({
        _key: linkKey,
        _type: 'link',
        href: match[6],
        openInNewTab: true,
      })
      parts.push({ text: match[5], marks: [linkKey] })
    }
    lastIndex = match.index + match[0].length
  }

  // Remaining text
  if (lastIndex < remaining.length) {
    parts.push({ text: remaining.slice(lastIndex), marks: [] })
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

/** Create a Portable Text block (paragraph) from a markdown line */
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

/** Convert a string to a blockContent array (single paragraph) */
function toBlockContent(text) {
  if (!text || !text.trim()) return []
  return [textBlock(text.trim())]
}

/** Convert an array of bullet strings to blockContent with list items */
function bulletsToBlockContent(bullets) {
  return bullets.map(b => textBlock(b.trim(), 'normal', 'bullet', 1))
}

// ── Markdown Parser ──────────────────────────────────────────────────────

function parseFirmTypeMarkdown(content) {
  const lines = content.split('\n')
  const sections = []
  let currentSection = null
  let currentSubsection = null

  for (const line of lines) {
    if (line.startsWith('# ') && !line.startsWith('## ')) {
      // H1 - page title
      currentSection = { type: 'h1', title: line.replace(/^# /, ''), lines: [] }
      sections.push(currentSection)
    } else if (line.startsWith('## ') && !line.startsWith('### ')) {
      currentSection = { type: 'h2', title: line.replace(/^## /, ''), lines: [], subsections: [] }
      sections.push(currentSection)
      currentSubsection = null
    } else if (line.startsWith('### ')) {
      if (currentSection) {
        currentSubsection = { type: 'h3', title: line.replace(/^### /, '').replace(/^\*\*/, '').replace(/\*\*$/, ''), lines: [] }
        currentSection.subsections = currentSection.subsections || []
        currentSection.subsections.push(currentSubsection)
      }
    } else if (line.trim() === '---') {
      // Section separator, skip
    } else {
      if (currentSubsection) {
        currentSubsection.lines.push(line)
      } else if (currentSection) {
        currentSection.lines.push(line)
      }
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
    } else if (!line.trim().startsWith('- ') && !line.trim().startsWith('**Q:') && !line.trim().startsWith('A:')) {
      current.push(line.trim())
    }
  }
  if (current.length > 0) paras.push(current.join(' '))
  return paras
}

function parseFAQs(section) {
  const faqs = []
  const allLines = []
  if (section.lines) allLines.push(...section.lines)
  if (section.subsections) {
    for (const sub of section.subsections) {
      allLines.push(...sub.lines)
    }
  }

  let currentQ = null
  let currentA = null

  for (const line of allLines) {
    const qMatch = line.match(/^\*\*Q:\s*(.+?)\*\*$/)
    const aMatch = line.match(/^A:\s*(.+)$/)

    if (qMatch) {
      if (currentQ && currentA) {
        faqs.push({ question: currentQ, answer: currentA })
      }
      currentQ = qMatch[1]
      currentA = null
    } else if (aMatch) {
      currentA = aMatch[1]
    } else if (currentA && line.trim()) {
      currentA += ' ' + line.trim()
    }
  }
  if (currentQ && currentA) {
    faqs.push({ question: currentQ, answer: currentA })
  }
  return faqs
}

function getSectionByKeyword(sections, keyword) {
  return sections.find(s => s.type === 'h2' && s.title.toLowerCase().includes(keyword.toLowerCase()))
}

function buildPatch(content) {
  const sections = parseFirmTypeMarkdown(content)

  // H1 section (title + first H2/H3 are hero)
  const h1Section = sections.find(s => s.type === 'h1')

  // Get section by order after h1
  const h2Sections = sections.filter(s => s.type === 'h2')

  // Hero: H1 is from the h1 section, H2 is first h2 section, H3 is its first subsection
  // The hero body is the paragraph text in the first h2 section (or under h1 before first h2)
  const heroH2Section = h2Sections[0] // "Transform..."
  const heroH3 = heroH2Section?.subsections?.[0]?.title || ''
  const heroParagraphs = []
  // The hero body comes from the h1 section's lines (paragraph after h1 title)
  // In structure: h1 title, then h2, h3, paragraph
  // Actually looking at the markdown, the paragraph comes after the h3 under the first section
  const firstSubLines = heroH2Section?.subsections?.[0]?.lines || heroH2Section?.lines || []
  const heroParas = extractParagraphs(firstSubLines)
  const heroBodyText = heroParas.join(' ')

  // Challenge section
  const challengeSection = getSectionByKeyword(h2Sections, 'Challenge') ||
    getSectionByKeyword(h2Sections, 'challenge')
  const challengeH2 = challengeSection?.title || ''
  const challengeH3 = challengeSection?.subsections?.[0]?.title || ''

  // Parse challenge lines for two bullet lists
  const challengeLines = []
  if (challengeSection?.subsections?.[0]?.lines) {
    challengeLines.push(...challengeSection.subsections[0].lines)
  }
  if (challengeSection?.lines) {
    challengeLines.push(...challengeSection.lines)
  }

  // Split bullets into two groups: operational pressures and traditional failures.
  // The two groups are separated by a bold line (**...**) that is NOT a bullet.
  // Strategy: find all bold non-bullet lines, then use them to delimit bullet groups.
  let opPressures = []
  let tradFailures = []

  // Gather all lines, find bold separators (non-bullet lines matching **...**)
  const boldSeparatorIndices = []
  for (let i = 0; i < challengeLines.length; i++) {
    const trimmed = challengeLines[i].trim()
    if (trimmed.startsWith('**') && trimmed.endsWith('**') && !trimmed.startsWith('- ')) {
      boldSeparatorIndices.push(i)
    }
  }

  if (boldSeparatorIndices.length >= 2) {
    // First bold line starts op pressures, second starts trad failures
    const firstBold = boldSeparatorIndices[0]
    const secondBold = boldSeparatorIndices[1]
    for (let i = firstBold + 1; i < secondBold; i++) {
      if (challengeLines[i].trim().startsWith('- ')) {
        opPressures.push(challengeLines[i].trim().replace(/^- /, ''))
      }
    }
    for (let i = secondBold + 1; i < challengeLines.length; i++) {
      if (challengeLines[i].trim().startsWith('- ')) {
        tradFailures.push(challengeLines[i].trim().replace(/^- /, ''))
      }
    }
  } else if (boldSeparatorIndices.length === 1) {
    // Only one bold line - all bullets are op pressures
    for (const line of challengeLines) {
      if (line.trim().startsWith('- ')) {
        opPressures.push(line.trim().replace(/^- /, ''))
      }
    }
  }

  // Solution section
  const solutionSection = getSectionByKeyword(h2Sections, 'Brightwave for') ||
    getSectionByKeyword(h2Sections, 'Brightwave For')
  const solutionH2 = solutionSection?.title || ''
  const solutionH3 = solutionSection?.subsections?.[0]?.title || ''

  // Solution body is the paragraph before capabilities
  const solutionLines = solutionSection?.subsections?.[0]?.lines || solutionSection?.lines || []
  const solutionParas = extractParagraphs(solutionLines)
  const solutionBodyText = solutionParas[0] || ''

  // Solution label - look for "Core Capabilities" line
  let solutionLabel = ''
  for (const line of solutionLines) {
    if (line.includes('Core Capabilities') || line.includes('core capabilities')) {
      solutionLabel = line.replace(/^\*\*/, '').replace(/\*\*$/, '').replace(/\*\*/g, '').trim()
      break
    }
  }

  // Capabilities - each ### under the solution section (skip the first one which is the subtitle)
  const capabilities = []
  if (solutionSection?.subsections) {
    for (let i = 1; i < solutionSection.subsections.length; i++) {
      const sub = solutionSection.subsections[i]
      const bullets = extractBullets(sub.lines)
      if (bullets.length > 0) {
        capabilities.push({
          _key: genKey(),
          _type: 'object',
          title: sub.title.replace(/^\*\*/, '').replace(/\*\*$/, ''),
          bullets: bulletsToBlockContent(bullets),
        })
      }
    }
  }

  // Value section
  const valueSection = getSectionByKeyword(h2Sections, 'Quantified Value') ||
    getSectionByKeyword(h2Sections, 'Value')
  const valueH2 = valueSection?.title || ''
  const valueH3 = valueSection?.subsections?.[0]?.title || ''

  // Value cards from subsections (skip first which is the subheading)
  const valueCards = []
  if (valueSection?.subsections) {
    for (let i = 1; i < valueSection.subsections.length; i++) {
      const sub = valueSection.subsections[i]
      const bullets = extractBullets(sub.lines)
      if (bullets.length > 0) {
        valueCards.push({
          _key: genKey(),
          _type: 'object',
          title: sub.title.replace(/^\*\*/, '').replace(/\*\*$/, ''),
          bullets: bulletsToBlockContent(bullets),
        })
      }
    }
  }

  // If valueCards is empty, check for bold-line-prefixed groups in the subsection lines
  if (valueCards.length === 0 && valueSection?.subsections?.[0]) {
    const lines = valueSection.subsections[0].lines
    let currentCard = null
    for (const line of lines) {
      const boldMatch = line.match(/^\*\*(.+?):\*\*$/) || line.match(/^\*\*(.+?)\*\*$/)
      if (boldMatch && !line.trim().startsWith('- ')) {
        if (currentCard && currentCard.bullets.length > 0) {
          valueCards.push(currentCard)
        }
        currentCard = {
          _key: genKey(),
          _type: 'object',
          title: boldMatch[1],
          bullets: [],
        }
      } else if (line.trim().startsWith('- ') && currentCard) {
        currentCard.bullets.push(line.trim().replace(/^- /, ''))
      }
    }
    if (currentCard && currentCard.bullets.length > 0) {
      valueCards.push(currentCard)
    }
    // Convert bullets to blockContent
    for (const card of valueCards) {
      card.bullets = bulletsToBlockContent(card.bullets)
    }
  }

  // Security section
  const securitySection = getSectionByKeyword(h2Sections, 'Security') ||
    getSectionByKeyword(h2Sections, 'Enterprise-Grade')
  const securityH2 = securitySection?.title?.replace(/^#+\s*/, '') || 'Enterprise-Grade Security and Compliance'
  const securityH3 = securitySection?.subsections?.[0]?.title || ''

  // Security architecture and compliance bullets
  const securityLines = []
  if (securitySection?.subsections?.[0]?.lines) securityLines.push(...securitySection.subsections[0].lines)
  if (securitySection?.lines) securityLines.push(...securitySection.lines)

  let secArchBullets = []
  let complianceBullets = []
  let secPhase = 'none'

  for (const line of securityLines) {
    if (line.includes('Security Architecture') || line.includes('security architecture')) {
      secPhase = 'arch'
      continue
    }
    if (line.includes('Compliance Features') || line.includes('compliance') || line.includes('Compliance')) {
      if (secPhase === 'arch' && line.toLowerCase().includes('compliance')) {
        secPhase = 'comp'
        continue
      }
    }
    if (line.trim().startsWith('- ')) {
      const bullet = line.trim().replace(/^- /, '')
      if (secPhase === 'arch') secArchBullets.push(bullet)
      else if (secPhase === 'comp') complianceBullets.push(bullet)
    }
  }

  // Integration section
  const integrationSection = getSectionByKeyword(h2Sections, 'Integration') ||
    getSectionByKeyword(h2Sections, 'Seamless')
  const integrationH2 = integrationSection?.title || ''
  const integrationH3 = integrationSection?.subsections?.[0]?.title || ''

  // Integration categories from subsections or bold groups
  const integrations = []
  if (integrationSection?.subsections) {
    for (let i = 1; i < integrationSection.subsections.length; i++) {
      const sub = integrationSection.subsections[i]
      const bullets = extractBullets(sub.lines)
      if (bullets.length > 0) {
        integrations.push({
          _key: genKey(),
          _type: 'object',
          title: sub.title.replace(/^\*\*/, '').replace(/\*\*$/, ''),
          bullets: bulletsToBlockContent(bullets),
        })
      }
    }
  }

  // If no subsection-based integrations, parse bold-grouped bullets
  if (integrations.length === 0) {
    const intLines = integrationSection?.subsections?.[0]?.lines || integrationSection?.lines || []
    let currentCat = null
    for (const line of intLines) {
      const boldMatch = line.match(/^\*\*(.+?):\*\*$/) || line.match(/^\*\*(.+?)\*\*$/)
      if (boldMatch && !line.trim().startsWith('- ')) {
        if (currentCat && currentCat.rawBullets.length > 0) {
          integrations.push({
            _key: genKey(),
            _type: 'object',
            title: currentCat.title,
            bullets: bulletsToBlockContent(currentCat.rawBullets),
          })
        }
        currentCat = { title: boldMatch[1], rawBullets: [] }
      } else if (line.trim().startsWith('- ') && currentCat) {
        currentCat.rawBullets.push(line.trim().replace(/^- /, ''))
      }
    }
    if (currentCat && currentCat.rawBullets.length > 0) {
      integrations.push({
        _key: genKey(),
        _type: 'object',
        title: currentCat.title,
        bullets: bulletsToBlockContent(currentCat.rawBullets),
      })
    }
  }

  // Results section
  const resultsSection = getSectionByKeyword(h2Sections, 'Results') ||
    getSectionByKeyword(h2Sections, 'Implementation')

  // Parse results subsections for performance + ROI bullets
  let performanceBullets = []
  let roiBullets = []

  if (resultsSection?.subsections) {
    // All subsection bullets as performance bullets
    for (let i = 0; i < resultsSection.subsections.length; i++) {
      const sub = resultsSection.subsections[i]
      const bullets = extractBullets(sub.lines)
      if (i < Math.ceil(resultsSection.subsections.length / 2)) {
        performanceBullets.push(...bullets)
      } else {
        roiBullets.push(...bullets)
      }
    }
  }

  // Also check for bold-grouped bullets in the subsection lines
  if (performanceBullets.length === 0 && resultsSection?.subsections?.[0]) {
    const lines = resultsSection.subsections[0].lines
    const allBullets = extractBullets(lines)
    const half = Math.ceil(allBullets.length / 2)
    performanceBullets = allBullets.slice(0, half)
    roiBullets = allBullets.slice(half)
  }

  // Implementation section
  const implSection = getSectionByKeyword(h2Sections, 'Implementation') ||
    getSectionByKeyword(h2Sections, 'Onboarding') ||
    getSectionByKeyword(h2Sections, 'Scaled')
  const implementationH2 = implSection?.title || ''

  const implementationSteps = []
  if (implSection?.subsections) {
    // Skip the first subsection (subtitle) if it doesn't have direct step content
    for (const sub of implSection.subsections) {
      const paras = extractParagraphs(sub.lines)
      const bullets = extractBullets(sub.lines)
      const desc = paras.length > 0
        ? paras.join(' ')
        : bullets.slice(0, 3).map(b => b.replace(/\*\*/g, '')).join('. ')
      if (desc) {
        implementationSteps.push({
          _key: genKey(),
          _type: 'object',
          title: sub.title.replace(/^\*\*/, '').replace(/\*\*$/, ''),
          description: desc.slice(0, 500), // text field, not blockContent
        })
      }
    }
  }

  // If steps came from bold-grouped content under the main subsection
  if (implementationSteps.length <= 1 && implSection?.subsections?.[0]) {
    implementationSteps.length = 0
    const lines = [...(implSection.lines || []), ...(implSection.subsections?.[0]?.lines || [])]
    let currentStep = null
    for (const line of lines) {
      const boldMatch = line.match(/^\*\*(.+?)(?:\s*--\s*(.+?))?\*\*:?$/) ||
        line.match(/^\*\*(.+?)\*\*:?\s*$/) ||
        line.match(/^\*\*(.+?) -- (.+?):?\*\*$/)
      if (boldMatch && !line.trim().startsWith('- ')) {
        if (currentStep) {
          implementationSteps.push(currentStep)
        }
        currentStep = {
          _key: genKey(),
          _type: 'object',
          title: boldMatch[0].replace(/\*\*/g, '').replace(/:$/, '').trim(),
          description: '',
        }
      } else if (line.trim().startsWith('- ') && currentStep) {
        const bullet = line.trim().replace(/^- /, '').replace(/\*\*/g, '')
        currentStep.description += (currentStep.description ? '. ' : '') + bullet
      }
    }
    if (currentStep) implementationSteps.push(currentStep)
  }

  // Differentiation section
  const diffSection = getSectionByKeyword(h2Sections, 'Why') ||
    getSectionByKeyword(h2Sections, 'Differentiation') ||
    getSectionByKeyword(h2Sections, 'Choose')
  const differentiationH2 = diffSection?.title || ''

  const differentiators = []
  if (diffSection?.subsections) {
    for (let i = 1; i < diffSection.subsections.length; i++) {
      const sub = diffSection.subsections[i]
      const paras = extractParagraphs(sub.lines)
      const bodyText = paras.join(' ')
      if (bodyText) {
        differentiators.push({
          _key: genKey(),
          _type: 'object',
          title: sub.title.replace(/^\*\*/, '').replace(/\*\*$/, ''),
          body: toBlockContent(bodyText),
        })
      }
    }
  }

  // If no subsection differentiators, try bold-grouped paragraphs
  if (differentiators.length === 0) {
    const diffLines = [...(diffSection?.lines || []), ...(diffSection?.subsections?.[0]?.lines || [])]
    let currentDiff = null
    for (const line of diffLines) {
      const boldMatch = line.match(/^\*\*(.+?):\*\*$/) || line.match(/^\*\*(.+?)\*\*$/)
      if (boldMatch && !line.trim().startsWith('- ')) {
        if (currentDiff && currentDiff.body) {
          differentiators.push({
            _key: genKey(),
            _type: 'object',
            title: currentDiff.title,
            body: toBlockContent(currentDiff.body),
          })
        }
        currentDiff = { title: boldMatch[1], body: '' }
      } else if (line.trim() && currentDiff) {
        currentDiff.body += (currentDiff.body ? ' ' : '') + line.trim()
      }
    }
    if (currentDiff && currentDiff.body) {
      differentiators.push({
        _key: genKey(),
        _type: 'object',
        title: currentDiff.title,
        body: toBlockContent(currentDiff.body),
      })
    }
  }

  // CTA section
  const ctaSection = getSectionByKeyword(h2Sections, 'Ready to') ||
    getSectionByKeyword(h2Sections, 'Transform')
  // Careful: "Transform" might match the first h2. Let's be more specific.
  const ctaSectionFinal = h2Sections.find(s =>
    s.title.toLowerCase().includes('ready to') ||
    (s.title.toLowerCase().includes('transform') && h2Sections.indexOf(s) > h2Sections.length - 3)
  ) || ctaSection

  const ctaH2 = ctaSectionFinal?.title || ''
  const ctaH3 = ctaSectionFinal?.subsections?.[0]?.title || ''
  const ctaLines = [...(ctaSectionFinal?.lines || []), ...(ctaSectionFinal?.subsections?.[0]?.lines || [])]
  const ctaParas = extractParagraphs(ctaLines)
  const ctaBodyText = ctaParas[0] || ''

  // CTA tagline - usually the last italicized line
  let ctaTagline = ''
  for (const line of ctaLines) {
    if (line.startsWith('*') && line.endsWith('*') && !line.startsWith('**')) {
      ctaTagline = line.replace(/^\*/, '').replace(/\*$/, '').trim()
    }
  }

  // FAQ section
  const faqSection = getSectionByKeyword(h2Sections, 'FAQ') ||
    getSectionByKeyword(h2Sections, 'Frequently')
  const faqs = faqSection ? parseFAQs(faqSection) : []

  // Build the set operation
  const patch = {
    // Hero
    h1: h1Section?.title || '',
    heroH2: heroH2Section?.title || '',
    heroH3: heroH3,
    heroBody: toBlockContent(heroBodyText),

    // Challenge
    challengeH2: challengeH2.replace(/^The\s+/, ''),
    challengeH3: challengeH3,
    operationalPressures: bulletsToBlockContent(opPressures),
    traditionalFailures: bulletsToBlockContent(tradFailures),

    // Solution
    solutionH2: solutionH2,
    solutionH3: solutionH3,
    solutionBody: toBlockContent(solutionBodyText),
    solutionLabel: solutionLabel || 'Core Capabilities',
    capabilities: capabilities.slice(0, 4), // max 4

    // Value
    valueH2: valueH2,
    valueH3: valueH3,
    valueCards: valueCards,

    // Security
    securityH2: 'Enterprise-Grade Security and Compliance',
    securityH3: securityH3,
    securityArchitecture: bulletsToBlockContent(secArchBullets),
    complianceFeatures: bulletsToBlockContent(complianceBullets),

    // Integration
    integrationH2: integrationH2,
    integrationH3: integrationH3,
    integrations: integrations,

    // Results
    performanceBullets: bulletsToBlockContent(performanceBullets),
    roiBullets: bulletsToBlockContent(roiBullets),

    // Implementation
    implementationH2: implementationH2,
    implementationSteps: implementationSteps.slice(0, 4), // max 4

    // Differentiation
    differentiationH2: differentiationH2,
    differentiators: differentiators,

    // CTA
    ctaH2: ctaH2,
    ctaSubheadline: ctaH3,
    ctaBody: toBlockContent(ctaBodyText),
    ctaButtonLabel: 'Start Free Trial',
    ctaTagline: ctaTagline,

    // FAQ
    faqTitle: 'Frequently Asked Questions',
    faqs: faqs.map(f => ({
      _key: genKey(),
      _type: 'object',
      question: f.question,
      answer: toBlockContent(f.answer),
    })),
  }

  return patch
}

// ── Sanity API ────────────────────────────────────────────────────────────

async function patchDocument(docId, setFields) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

  const mutations = [
    {
      patch: {
        id: docId,
        set: setFields,
      },
    },
  ]

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
    throw new Error(`Patch failed for ${docId}: ${resp.status} ${text}`)
  }

  return resp.json()
}

async function createDocument(docId, fields) {
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

  const doc = {
    _id: docId,
    _type: 'firmType',
    ...fields,
  }

  const mutations = [
    { createOrReplace: doc },
  ]

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
    throw new Error(`Create failed for ${docId}: ${resp.status} ${text}`)
  }

  return resp.json()
}

async function publishDocument(docId) {
  // Publishing = if there's a draft, we need to copy it to the published id
  // For non-draft docs, they're already published
  // Check if there's a draft version
  const url = `https://${PROJECT_ID}.api.sanity.io/v${API_VERSION}/data/mutate/${DATASET}`

  // The standard approach: create the published version from the draft
  // Since we patched the published ID directly, it should already be published
  // But let's also patch the draft if it exists
  const draftId = `drafts.${docId}`
  try {
    const mutations = [
      {
        patch: {
          id: draftId,
          ifRevisionID: undefined,
          unset: ['_id'], // This will fail gracefully if no draft exists
        },
      },
    ]
    // Actually, let's just try to delete the draft to publish
    const delMutations = [
      {
        delete: {
          id: draftId,
        },
      },
    ]
    await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({ mutations: delMutations }),
    })
  } catch (e) {
    // Draft may not exist, that's fine
  }
}

// ── Main ──────────────────────────────────────────────────────────────────

async function main() {
  console.log('=== Firm Type Content Migration ===')
  console.log(`Mode: ${DRY_RUN ? 'DRY RUN' : 'LIVE'}`)
  console.log('')

  const files = Object.entries(FILE_TO_DOC)

  for (const [fileName, docId] of files) {
    if (ONLY && !docId.includes(ONLY.toLowerCase())) continue

    const filePath = path.join(CONTENT_DIR, `${fileName}.md`)

    if (!fs.existsSync(filePath)) {
      console.log(`SKIP: ${fileName}.md not found`)
      continue
    }

    console.log(`Processing: ${fileName} -> ${docId}`)

    const content = fs.readFileSync(filePath, 'utf-8')
    const patch = buildPatch(content)

    if (DRY_RUN) {
      console.log(`  Would set ${Object.keys(patch).length} fields`)
      console.log(`  h1: ${patch.h1}`)
      console.log(`  challengeH2: ${patch.challengeH2}`)
      console.log(`  solutionH2: ${patch.solutionH2}`)
      console.log(`  capabilities: ${patch.capabilities.length} items`)
      console.log(`  valueCards: ${patch.valueCards.length} items`)
      console.log(`  faqs: ${patch.faqs.length} items`)
      console.log(`  opPressures: ${patch.operationalPressures.length} bullets`)
      console.log(`  tradFailures: ${patch.traditionalFailures.length} bullets`)
      console.log(`  implementationSteps: ${patch.implementationSteps.length} steps`)
      console.log(`  differentiators: ${patch.differentiators.length} items`)
      console.log(`  integrations: ${patch.integrations.length} categories`)
      console.log('')
      continue
    }

    try {
      let result
      try {
        result = await patchDocument(docId, patch)
        console.log(`  Patched: ${JSON.stringify(result).slice(0, 100)}`)
      } catch (patchErr) {
        if (patchErr.message.includes('not found') || patchErr.message.includes('404')) {
          // Document doesn't exist, create it with metadata
          const META = {
            'firmtype-multi-strategy': { title: 'Multi-Strategy', menuLabel: 'Multi-Strategy', slug: { _type: 'slug', current: 'multi-strategy' }, product: 'private-markets' },
          }
          const meta = META[docId] || {}
          console.log(`  Document not found, creating: ${docId}`)
          result = await createDocument(docId, { ...meta, ...patch })
          console.log(`  Created: ${JSON.stringify(result).slice(0, 100)}`)
        } else {
          throw patchErr
        }
      }

      await publishDocument(docId)
      console.log(`  Published: ${docId}`)
    } catch (err) {
      console.error(`  ERROR: ${err.message}`)
    }

    console.log('')
  }

  console.log('Done!')
}

main().catch(console.error)
