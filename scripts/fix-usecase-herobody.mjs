/**
 * Fix use-case heroBody fields: convert raw HTML strings inside Portable Text
 * spans into proper Portable Text block arrays.
 *
 * Run: node scripts/fix-usecase-herobody.mjs
 */

import { createClient } from '@sanity/client'
import { nanoid } from 'nanoid'
import 'dotenv/config'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

function key() { return nanoid(12) }

/** Parse simple HTML (p, strong, em) into Portable Text blocks */
function htmlToBlocks(html) {
  const blocks = []
  // Extract <p>...</p> segments
  const pRegex = /<p>([\s\S]*?)<\/p>/gi
  let match
  while ((match = pRegex.exec(html)) !== null) {
    const inner = match[1].trim()
    if (!inner) continue
    blocks.push(makeBlock(inner))
  }
  // If no <p> tags found, treat the whole string as one block
  if (blocks.length === 0 && html.trim()) {
    blocks.push(makeBlock(html.replace(/<[^>]*>/g, '').trim()))
  }
  return blocks
}

function makeBlock(html) {
  const spans = []
  const markDefs = []
  parseInline(html, [], spans, markDefs)
  return {
    _key: key(),
    _type: 'block',
    children: spans.length > 0 ? spans : [{ _key: key(), _type: 'span', marks: [], text: '' }],
    markDefs,
    style: 'normal',
  }
}

function parseInline(html, activeMarks, spans, markDefs) {
  let cursor = 0
  const tagRegex = /<(\/?)(\w+)([^>]*)>/g
  let m
  while ((m = tagRegex.exec(html)) !== null) {
    const [fullMatch, isClosing, tagName, attrs] = m
    const tag = tagName.toLowerCase()
    const before = html.slice(cursor, m.index)
    if (before) {
      spans.push({ _key: key(), _type: 'span', marks: [...activeMarks], text: decodeEntities(before) })
    }
    cursor = m.index + fullMatch.length
    if (!isClosing) {
      if (tag === 'strong' || tag === 'b') activeMarks.push('strong')
      else if (tag === 'em' || tag === 'i') activeMarks.push('em')
      else if (tag === 'a') {
        const href = attrs.match(/href="([^"]*)"/i)?.[1]
        if (href) {
          const lk = key()
          markDefs.push({ _key: lk, _type: 'link', href, openInNewTab: true })
          activeMarks.push(lk)
        }
      }
    } else {
      if (tag === 'strong' || tag === 'b') popMark(activeMarks, 'strong')
      else if (tag === 'em' || tag === 'i') popMark(activeMarks, 'em')
      else if (tag === 'a') {
        const idx = activeMarks.findLastIndex(m => m !== 'strong' && m !== 'em')
        if (idx >= 0) activeMarks.splice(idx, 1)
      }
    }
  }
  const remaining = html.slice(cursor)
  if (remaining) {
    spans.push({ _key: key(), _type: 'span', marks: [...activeMarks], text: decodeEntities(remaining) })
  }
}

function popMark(marks, name) {
  const idx = marks.lastIndexOf(name)
  if (idx >= 0) marks.splice(idx, 1)
}

function decodeEntities(t) {
  return t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
}

async function main() {
  const docs = await client.fetch(`*[_type == "useCase"]{ _id, slug, heroBody }`)
  console.log(`Found ${docs.length} use cases\n`)

  let fixed = 0
  for (const doc of docs) {
    const body = doc.heroBody
    if (!body || !Array.isArray(body) || body.length === 0) continue

    // Check if first block's text contains HTML
    const firstText = body[0]?.children?.[0]?.text || ''
    if (!firstText.includes('<p>') && !firstText.includes('<strong>')) {
      console.log(`  ⊘ ${doc.slug.current} — already clean`)
      continue
    }

    const newBlocks = htmlToBlocks(firstText)

    try {
      await client.patch(doc._id)
        .set({ heroBody: newBlocks })
        .commit()
      console.log(`  ✓ ${doc.slug.current} — ${newBlocks.length} blocks`)
      fixed++
    } catch {
      // Try drafts prefix
      try {
        await client.patch(`drafts.${doc._id}`)
          .set({ heroBody: newBlocks })
          .commit()
        console.log(`  ✓ ${doc.slug.current} (draft) — ${newBlocks.length} blocks`)
        fixed++
      } catch (e) {
        console.error(`  ✗ ${doc.slug.current}: ${e.message}`)
      }
    }
  }

  console.log(`\nFixed ${fixed}/${docs.length} documents`)
}

main().catch(err => { console.error(err); process.exit(1) })
