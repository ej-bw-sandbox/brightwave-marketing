/**
 * Render generated-designs HTML files to WebP images and upload to Sanity heroImage fields.
 *
 * Run: node scripts/render-and-upload-designs.mjs
 */

import { createClient } from '@sanity/client'
import { chromium } from 'playwright'
import { readdir } from 'fs/promises'
import { resolve } from 'path'
import 'dotenv/config'

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const BASE = resolve('generated-designs')

// Map category dirs to Sanity document ID prefixes
const CATEGORIES = [
  { dir: 'features',   prefix: 'feature-' },
  { dir: 'firm-types', prefix: 'firmtype-' },
  { dir: 'icps',       prefix: 'icp-' },
  { dir: 'use-cases',  prefix: 'usecase-' },
]

// Some slugs don't match the ID directly — handle known exceptions
const ID_OVERRIDES = {
  'usecase-board-review-materials': 'usecase-board-materials-review',
  'usecase-due-dilligence-synthesis': 'usecase-dd-report-synthesis',
  'icp-senior-manager': 'icp-senior',
}

async function main() {
  console.log('=== Render & Upload Design Images ===\n')

  const browser = await chromium.launch()
  const context = await browser.newContext({
    viewport: { width: 1200, height: 630 },
    deviceScaleFactor: 2,
  })

  let total = 0
  let success = 0
  let failed = 0

  for (const { dir, prefix } of CATEGORIES) {
    const dirPath = resolve(BASE, dir)
    const files = (await readdir(dirPath)).filter(f => f.endsWith('.html'))
    console.log(`\n--- ${dir} (${files.length} files) ---`)

    for (const file of files) {
      const slug = file.replace('.html', '')
      let docId = `${prefix}${slug}`

      // Check overrides
      if (ID_OVERRIDES[docId]) {
        docId = ID_OVERRIDES[docId]
      }

      total++
      const filePath = resolve(dirPath, file)
      const fileUrl = `file://${filePath}`

      try {
        // Render HTML to screenshot
        const page = await context.newPage()
        await page.goto(fileUrl, { waitUntil: 'networkidle', timeout: 15000 })
        // Wait for animations to settle
        await page.waitForTimeout(1000)

        const screenshot = await page.screenshot({
          type: 'png',
          fullPage: false,
        })
        await page.close()

        // Upload to Sanity as image asset
        const asset = await client.assets.upload('image', screenshot, {
          filename: `${slug}.png`,
          contentType: 'image/png',
        })

        // Patch the document — try published first, then draft
        try {
          await client.patch(docId)
            .set({
              heroImage: {
                _type: 'image',
                asset: { _type: 'reference', _ref: asset._id },
              },
            })
            .commit()
        } catch {
          // Try with drafts prefix
          await client.patch(`drafts.${docId}`)
            .set({
              heroImage: {
                _type: 'image',
                asset: { _type: 'reference', _ref: asset._id },
              },
            })
            .commit()
        }

        console.log(`  ✓ ${slug} → ${docId}`)
        success++
      } catch (err) {
        console.error(`  ✗ ${slug} → ${docId}: ${err.message}`)
        failed++
      }
    }
  }

  await browser.close()

  console.log(`\n=== Done: ${success}/${total} succeeded, ${failed} failed ===`)
}

main().catch(err => {
  console.error('Fatal:', err)
  process.exit(1)
})
