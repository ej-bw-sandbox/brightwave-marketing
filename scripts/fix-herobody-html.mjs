/**
 * Fix heroBody fields across firmType and icpPage documents that contain
 * raw HTML strings inside Portable Text spans.
 *
 * Run: node scripts/fix-herobody-html.mjs
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

function htmlToBlocks(html) {
  const blocks = []
  const pRegex = /<p>([\s\S]*?)<\/p>/gi
  let match
  while ((match = pRegex.exec(html)) !== null) {
    const inner = match[1].trim()
    if (!inner) continue
    blocks.push(makeBlock(inner))
  }
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
    _key: key(), _type: 'block',
    children: spans.length > 0 ? spans : [{ _key: key(), _type: 'span', marks: [], text: '' }],
    markDefs, style: 'normal',
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
    if (before) spans.push({ _key: key(), _type: 'span', marks: [...activeMarks], text: decodeEntities(before) })
    cursor = m.index + fullMatch.length
    if (!isClosing) {
      if (tag === 'strong' || tag === 'b') activeMarks.push('strong')
      else if (tag === 'em' || tag === 'i') activeMarks.push('em')
      else if (tag === 'a') {
        const href = attrs.match(/href="([^"]*)"/i)?.[1]
        if (href) { const lk = key(); markDefs.push({ _key: lk, _type: 'link', href, openInNewTab: true }); activeMarks.push(lk) }
      }
    } else {
      if (tag === 'strong' || tag === 'b') { const i = activeMarks.lastIndexOf('strong'); if (i >= 0) activeMarks.splice(i, 1) }
      else if (tag === 'em' || tag === 'i') { const i = activeMarks.lastIndexOf('em'); if (i >= 0) activeMarks.splice(i, 1) }
      else if (tag === 'a') { const i = activeMarks.findLastIndex(m => m !== 'strong' && m !== 'em'); if (i >= 0) activeMarks.splice(i, 1) }
    }
  }
  const remaining = html.slice(cursor)
  if (remaining) spans.push({ _key: key(), _type: 'span', marks: [...activeMarks], text: decodeEntities(remaining) })
}

function decodeEntities(t) {
  return t.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&nbsp;/g, ' ')
}

async function fixType(typeName) {
  const docs = await client.fetch(`*[_type == "${typeName}" && defined(heroBody)]{ _id, slug, heroBody }`)
  console.log(`\n--- ${typeName}: ${docs.length} docs with heroBody ---`)
  let fixed = 0
  for (const doc of docs) {
    const firstText = doc.heroBody?.[0]?.children?.[0]?.text || ''
    if (!firstText.includes('<p>') && !firstText.includes('<strong>')) {
      console.log(`  ⊘ ${doc.slug?.current} — clean`)
      continue
    }
    const newBlocks = htmlToBlocks(firstText)
    try {
      await client.patch(doc._id).set({ heroBody: newBlocks }).commit()
      console.log(`  ✓ ${doc.slug?.current} — ${newBlocks.length} blocks`)
      fixed++
    } catch {
      try {
        await client.patch(`drafts.${doc._id}`).set({ heroBody: newBlocks }).commit()
        console.log(`  ✓ ${doc.slug?.current} (draft) — ${newBlocks.length} blocks`)
        fixed++
      } catch (e) { console.error(`  ✗ ${doc.slug?.current}: ${e.message}`) }
    }
  }
  return fixed
}

async function main() {
  const f1 = await fixType('firmType')
  const f2 = await fixType('icpPage')
  console.log(`\nTotal fixed: ${f1 + f2}`)
}

main().catch(err => { console.error(err); process.exit(1) })
