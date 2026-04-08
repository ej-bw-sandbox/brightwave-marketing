/**
 * One-time seed script to populate the three contactForm singleton documents
 * in Sanity with content currently hardcoded in the codebase.
 *
 * Usage:
 *   npx tsx scripts/seed-forms.ts
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

/* ── Shared default fields (mirrors DEFAULT_FIELDS in ContactForm.tsx) ── */

const defaultFields = [
  {
    _key: 'firstName',
    fieldName: 'firstName',
    fieldLabel: 'First Name',
    fieldPlaceholder: 'First name',
    fieldType: 'text',
    isRequired: true,
  },
  {
    _key: 'lastName',
    fieldName: 'lastName',
    fieldLabel: 'Last Name',
    fieldPlaceholder: 'Last name',
    fieldType: 'text',
    isRequired: false,
  },
  {
    _key: 'email',
    fieldName: 'email',
    fieldLabel: 'Email',
    fieldPlaceholder: 'you@company.com',
    fieldType: 'email',
    isRequired: true,
  },
  {
    _key: 'company',
    fieldName: 'company',
    fieldLabel: 'Company',
    fieldPlaceholder: 'Company name',
    fieldType: 'text',
    isRequired: false,
  },
  {
    _key: 'message',
    fieldName: 'message',
    fieldLabel: 'Message',
    fieldPlaceholder: 'How can we help?',
    fieldType: 'textarea',
    isRequired: false,
  },
]

/* ── Document definitions ── */

const contactDoc = {
  _id: 'singleton;contact' as const,
  _type: 'contactForm',
  formTitle: 'Tell us a bit about yourself',
  formVariant: 'contact',
  fields: defaultFields,
  submitButtonText: 'Submit',
  successMessage: 'We received your message and will be in touch shortly.',
  errorMessage: 'Something went wrong. Please try again.',
  apiEndpoint: '/api/contact',
}

const referralDoc = {
  _id: 'singleton;referral' as const,
  _type: 'contactForm',
  formTitle: 'Tell us a bit about yourself',
  formVariant: 'referral',
  fields: defaultFields,
  referralCodeField: {
    fieldLabel: 'Referral Code',
    fieldPlaceholder: 'Enter your referral code',
    isRequired: false,
  },
  submitButtonText: 'Submit',
  successMessage: 'We received your message and will be in touch shortly.',
  errorMessage: 'Something went wrong. Please try again.',
  apiEndpoint: '/api/contact',
}

const partnersDoc = {
  _id: 'singleton;partners' as const,
  _type: 'contactForm',
  formTitle: 'Tell us a bit about yourself',
  formVariant: 'partners',
  fields: defaultFields,
  partnerTypeField: {
    fieldLabel: 'Partner Type',
    options: [
      { _key: 'pmi', value: 'private-markets-investors', label: 'Private markets investors' },
      { _key: 'ftc', value: 'financial-technology-consultants', label: 'Financial technology consultants' },
      { _key: 'ii', value: 'industry-influencers', label: 'Industry influencers' },
      { _key: 'ti', value: 'technology-integrators', label: 'Technology integrators' },
      { _key: 'bdp', value: 'business-development-professionals', label: 'Business development professionals' },
    ],
    isRequired: true,
  },
  submitButtonText: 'Submit',
  successMessage: 'We received your message and will be in touch shortly.',
  errorMessage: 'Something went wrong. Please try again.',
  apiEndpoint: '/api/contact',
}

/* ── Execute mutations ── */

async function main() {
  console.log(`Seeding contactForm singletons in project "${projectId}", dataset "${dataset}"...\n`)

  const tx = client.transaction()
  tx.createOrReplace(contactDoc)
  tx.createOrReplace(referralDoc)
  tx.createOrReplace(partnersDoc)

  const result = await tx.commit()
  console.log('Transaction committed successfully.')
  console.log(`  Documents affected: ${result.documentIds.length}`)
  console.log(`  IDs: ${result.documentIds.join(', ')}`)

  // Verify
  const docs = await client.fetch(
    '*[_id in ["singleton;contact","singleton;partners","singleton;referral"]]{ _id, formVariant, formTitle, submitButtonText }',
  )

  console.log('\nVerification:')
  for (const doc of docs) {
    console.log(`  ${doc._id} -> variant="${doc.formVariant}", title="${doc.formTitle}", button="${doc.submitButtonText}"`)
  }
  console.log('\nDone!')
}

main().catch((err) => {
  console.error('Seed failed:', err)
  process.exit(1)
})
