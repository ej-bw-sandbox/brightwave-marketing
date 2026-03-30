import { defineType, defineField } from 'sanity'

export const firmType = defineType({
  name: 'firmType',
  title: 'Firm Type / Solution',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'challenge', title: 'Challenge' },
    { name: 'solution', title: 'Solution' },
    { name: 'value', title: 'Quantified Value' },
    { name: 'security', title: 'Security & Compliance' },
    { name: 'integration', title: 'Integration' },
    { name: 'results', title: 'Proven Results' },
    { name: 'implementation', title: 'Implementation' },
    { name: 'differentiation', title: 'Differentiation' },
    { name: 'cta', title: 'CTA' },
    { name: 'faq', title: 'FAQ' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    /* ── Core ─────────────────────────────────────────────────── */
    defineField({ name: 'title', title: 'Firm Type Name', type: 'string', validation: (r) => r.required(), description: 'e.g. "Private Equity", "Venture Capital"' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'string',
      description: 'Which product this firm type is associated with',
      options: {
        list: [
          { title: 'Private Markets', value: 'private-markets' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({ name: 'menuLabel', title: 'Menu Label', type: 'string', description: 'Short label for navigation menus (e.g. "Mega Fund", "Middle Market")' }),
    defineField({ name: 'excerpt', title: 'Card Excerpt', type: 'text', rows: 3, description: 'Short description shown on the index/listing page card' }),

    /* ── Hero ─────────────────────────────────────────────────── */
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'hero' }),
    defineField({ name: 'h1', title: 'H1', type: 'string', group: 'hero' }),
    defineField({ name: 'heroH2', title: 'H2 Value Prop', type: 'string', group: 'hero' }),
    defineField({ name: 'heroH3', title: 'H3 Quantified Benefit', type: 'string', group: 'hero' }),
    defineField({ name: 'heroBody', title: 'Hero Body', type: 'blockContent', group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, group: 'hero' }),

    /* ── Challenge ────────────────────────────────────────────── */
    defineField({ name: 'challengeH2', title: 'Challenge Headline', type: 'string', group: 'challenge' }),
    defineField({ name: 'challengeH3', title: 'Challenge Sub-headline', type: 'string', group: 'challenge' }),
    defineField({ name: 'operationalPressures', title: 'Operational Pressures', type: 'blockContent', group: 'challenge' }),
    defineField({ name: 'traditionalFailures', title: 'Where Traditional Approaches Fail', type: 'blockContent', group: 'challenge' }),

    /* ── Solution ─────────────────────────────────────────────── */
    defineField({ name: 'solutionH2', title: 'Solution Headline', type: 'string', group: 'solution' }),
    defineField({ name: 'solutionH3', title: 'Solution Sub-headline', type: 'string', group: 'solution' }),
    defineField({ name: 'solutionBody', title: 'Solution Body', type: 'blockContent', group: 'solution' }),
    defineField({ name: 'solutionLabel', title: 'Capabilities Label', type: 'string', description: 'e.g. "Core Capabilities"', group: 'solution' }),
    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      group: 'solution',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'bullets', title: 'Bullets', type: 'blockContent' },
      ] }],
      validation: (r) => r.max(4),
    }),

    /* ── Quantified Value ─────────────────────────────────────── */
    defineField({ name: 'valueH2', title: 'Value Headline', type: 'string', group: 'value' }),
    defineField({ name: 'valueH3', title: 'Value Sub-headline', type: 'string', group: 'value' }),
    defineField({
      name: 'valueCards',
      title: 'Value Cards',
      type: 'array',
      group: 'value',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'bullets', title: 'Bullets', type: 'blockContent' },
      ] }],
    }),
    defineField({ name: 'valueSummary', title: 'Value Summary Strip', type: 'blockContent', group: 'value' }),

    /* ── Security & Compliance ────────────────────────────────── */
    defineField({ name: 'securityH2', title: 'Security Headline', type: 'string', group: 'security' }),
    defineField({ name: 'securityH3', title: 'Security Sub-headline', type: 'string', group: 'security' }),
    defineField({ name: 'securityArchitecture', title: 'Security Architecture', type: 'blockContent', group: 'security' }),
    defineField({ name: 'complianceFeatures', title: 'Compliance Features', type: 'blockContent', group: 'security' }),

    /* ── Integration ──────────────────────────────────────────── */
    defineField({ name: 'integrationH2', title: 'Integration Headline', type: 'string', group: 'integration' }),
    defineField({ name: 'integrationH3', title: 'Integration Sub-headline', type: 'string', group: 'integration' }),
    defineField({
      name: 'integrations',
      title: 'Integration Categories',
      type: 'array',
      group: 'integration',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Category Title', type: 'string' },
        { name: 'bullets', title: 'Bullets', type: 'blockContent' },
      ] }],
    }),

    /* ── Proven Results ────────────────────────────────────────── */
    defineField({ name: 'resultsQuote', title: 'Testimonial Quote', type: 'text', rows: 4, group: 'results' }),
    defineField({ name: 'resultsAttribution', title: 'Quote Attribution', type: 'string', group: 'results' }),
    defineField({ name: 'performanceBullets', title: 'Performance Bullets', type: 'blockContent', group: 'results' }),
    defineField({ name: 'roiBullets', title: 'ROI Bullets', type: 'blockContent', group: 'results' }),

    /* ── Implementation ───────────────────────────────────────── */
    defineField({ name: 'implementationH2', title: 'Implementation Headline', type: 'string', group: 'implementation' }),
    defineField({
      name: 'implementationSteps',
      title: 'Implementation Steps',
      type: 'array',
      group: 'implementation',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Step Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text', rows: 3 },
      ] }],
      validation: (r) => r.max(4),
    }),

    /* ── Differentiation ──────────────────────────────────────── */
    defineField({ name: 'differentiationH2', title: 'Differentiation Headline', type: 'string', group: 'differentiation' }),
    defineField({
      name: 'differentiators',
      title: 'Differentiators',
      type: 'array',
      group: 'differentiation',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'body', title: 'Body', type: 'blockContent' },
      ] }],
    }),

    /* ── CTA ──────────────────────────────────────────────────── */
    defineField({ name: 'ctaH2', title: 'CTA Headline', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaSubheadline', title: 'CTA Sub-headline', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaBody', title: 'CTA Body', type: 'blockContent', group: 'cta' }),
    defineField({ name: 'ctaButtonLabel', title: 'CTA Button Label', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaTagline', title: 'CTA Tagline', type: 'string', group: 'cta' }),

    /* ── FAQ ──────────────────────────────────────────────────── */
    defineField({ name: 'faqTitle', title: 'FAQ Title', type: 'string', group: 'faq' }),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      group: 'faq',
      of: [{ type: 'object', fields: [
        { name: 'question', title: 'Question', type: 'string' },
        { name: 'answer', title: 'Answer', type: 'blockContent' },
      ] }],
    }),

    /* ── Relations (no group - appear at top level) ───────────── */
    defineField({ name: 'relatedCaseStudies', title: 'Related Case Studies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }] }),
    defineField({ name: 'relatedUseCases', title: 'Related Use Cases', type: 'array', of: [{ type: 'reference', to: [{ type: 'useCase' }] }] }),

    /* ── SEO ──────────────────────────────────────────────────── */
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seo' }),
  ],
  preview: {
    select: { title: 'title', media: 'heroImage' },
  },
})
