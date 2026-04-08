/**
 * One-time seed script to populate the page singleton documents
 * in Sanity with content currently hardcoded in the codebase.
 *
 * Usage:
 *   npx tsx scripts/seed-pages.ts
 *
 * Requires env vars: SANITY_API_TOKEN, NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET
 */

import { createClient } from '@sanity/client'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const token = process.env.SANITY_API_TOKEN

if (!projectId || !dataset || !token) {
  console.error(
    'Missing required env vars. Set NEXT_PUBLIC_SANITY_PROJECT_ID, NEXT_PUBLIC_SANITY_DATASET, and SANITY_API_TOKEN.',
  )
  process.exit(1)
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: '2024-01-01',
  useCdn: false,
  token,
})

/* ── Document patches ── */

const contactPagePatch = {
  readMoreUrl: '/blog',
  linkedinLabel: 'LinkedIn',
  emptyStateText: 'No items found.',
}

const referralPagePatch = {
  readMoreUrl: '/blog',
  linkedinLabel: 'LinkedIn',
  emptyStateText: 'No items found.',
}

const partnersPagePatch = {
  stepCtaHeading: 'Step Into The Future Of Financial Research',
  stepCtaButtonLabel: 'Schedule a Trial',
  stepCtaButtonUrl: '/enterprise',
}

/* ── Execute mutations ── */

async function main() {
  console.log(`Seeding page singletons in project "${projectId}", dataset "${dataset}"...\n`)

  // Find existing page documents
  const [contactDoc, referralDoc, partnersDoc] = await Promise.all([
    client.fetch('*[_type == "contactPage"][0]{ _id }'),
    client.fetch('*[_type == "referralPage"][0]{ _id }'),
    client.fetch('*[_type == "partnersPage"][0]{ _id }'),
  ])

  const tx = client.transaction()

  if (contactDoc?._id) {
    tx.patch(contactDoc._id, (p) => p.set(contactPagePatch))
    console.log(`  Will patch contactPage (${contactDoc._id})`)
  } else {
    tx.createOrReplace({
      _id: 'singleton;contactPage',
      _type: 'contactPage',
      ...contactPagePatch,
    })
    console.log('  Will create contactPage singleton')
  }

  if (referralDoc?._id) {
    tx.patch(referralDoc._id, (p) => p.set(referralPagePatch))
    console.log(`  Will patch referralPage (${referralDoc._id})`)
  } else {
    tx.createOrReplace({
      _id: 'singleton;referralPage',
      _type: 'referralPage',
      ...referralPagePatch,
    })
    console.log('  Will create referralPage singleton')
  }

  if (partnersDoc?._id) {
    tx.patch(partnersDoc._id, (p) => p.set(partnersPagePatch))
    console.log(`  Will patch partnersPage (${partnersDoc._id})`)
  } else {
    tx.createOrReplace({
      _id: 'singleton;partnersPage',
      _type: 'partnersPage',
      ...partnersPagePatch,
    })
    console.log('  Will create partnersPage singleton')
  }

  const result = await tx.commit()
  console.log('\nTransaction committed successfully.')
  console.log(`  Documents affected: ${result.documentIds.length}`)
  console.log(`  IDs: ${result.documentIds.join(', ')}`)

  // Verify
  const docs = await client.fetch(
    `{
      "contact": *[_type == "contactPage"][0]{ _id, readMoreUrl, linkedinLabel, emptyStateText },
      "referral": *[_type == "referralPage"][0]{ _id, readMoreUrl, linkedinLabel, emptyStateText },
      "partners": *[_type == "partnersPage"][0]{ _id, stepCtaHeading, stepCtaButtonLabel, stepCtaButtonUrl }
    }`,
  )

  console.log('\nVerification:')
  if (docs.contact) {
    console.log(`  contactPage -> readMoreUrl="${docs.contact.readMoreUrl}", linkedinLabel="${docs.contact.linkedinLabel}", emptyStateText="${docs.contact.emptyStateText}"`)
  }
  if (docs.referral) {
    console.log(`  referralPage -> readMoreUrl="${docs.referral.readMoreUrl}", linkedinLabel="${docs.referral.linkedinLabel}", emptyStateText="${docs.referral.emptyStateText}"`)
  }
  if (docs.partners) {
    console.log(`  partnersPage -> stepCtaHeading="${docs.partners.stepCtaHeading}", stepCtaButtonLabel="${docs.partners.stepCtaButtonLabel}", stepCtaButtonUrl="${docs.partners.stepCtaButtonUrl}"`)
  }
  console.log('\nDone!')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
