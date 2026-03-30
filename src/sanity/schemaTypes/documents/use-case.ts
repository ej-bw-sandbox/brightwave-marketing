import { defineType, defineField } from 'sanity'

export const useCase = defineType({
  name: 'useCase',
  title: 'Use Case',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'challenge', title: 'Challenge' },
    { name: 'solution', title: 'Solution' },
    { name: 'timeline', title: 'Timeline' },
    { name: 'features', title: 'Features' },
    { name: 'results', title: 'Results' },
    { name: 'social', title: 'Social Proof' },
    { name: 'cta', title: 'CTA' },
    { name: 'relations', title: 'Relations' },
    { name: 'seoGroup', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Use Case Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'string',
      description: 'Which product this use case is associated with',
      options: {
        list: [
          { title: 'Private Markets', value: 'private-markets' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({ name: 'menuLabel', title: 'Menu Label', type: 'string', description: 'Short label for navigation menus (e.g. "CIM Analysis", "Data Room Review")' }),
    defineField({ name: 'excerpt', title: 'Card Excerpt', type: 'text', rows: 3 }),

    /* ── Hero ── */
    defineField({ name: 'eyebrow', title: 'Eyebrow', type: 'string', group: 'hero' }),
    defineField({ name: 'h1', title: 'H1', type: 'string', group: 'hero' }),
    defineField({ name: 'heroSubtitle', title: 'H2 Subtitle', type: 'string', group: 'hero', description: 'Displayed below H1 in a smaller weight' }),
    defineField({ name: 'h2Hero', title: 'H2 Sub-headline (legacy)', type: 'string', group: 'hero', description: 'Legacy field — prefer heroSubtitle' }),
    defineField({ name: 'heroBody', title: 'Hero Body', type: 'blockContent', group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, group: 'hero' }),
    defineField({
      name: 'statPills',
      title: 'Stat Pills',
      type: 'array',
      group: 'hero',
      of: [{ type: 'object', fields: [
        { name: 'value', title: 'Value', type: 'string' },
        { name: 'label', title: 'Label', type: 'string' },
      ] }],
      validation: (r) => r.max(3),
    }),
    defineField({ name: 'stats', title: 'Key Statistics (legacy)', type: 'array', of: [{ type: 'stat' }], validation: (r) => r.max(3), group: 'hero' }),

    /* ── Challenge ── */
    defineField({ name: 'challengeH2', title: 'Challenge Section Headline', type: 'string', group: 'challenge' }),
    defineField({
      name: 'challenges',
      title: 'Challenges',
      type: 'array',
      group: 'challenge',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Challenge Title', type: 'string' },
        { name: 'bullets', title: 'Details', type: 'blockContent' },
      ] }],
      validation: (r) => r.max(3),
    }),

    /* ── Solution ── */
    defineField({ name: 'solutionH2', title: 'Solution Section Headline', type: 'string', group: 'solution' }),
    defineField({
      name: 'solutions',
      title: 'Solutions',
      type: 'array',
      group: 'solution',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Solution Title', type: 'string' },
        { name: 'body', title: 'Body', type: 'blockContent' },
        { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
      ] }],
      validation: (r) => r.max(3),
    }),

    /* ── Timeline ── */
    defineField({ name: 'timelineH2', title: 'Timeline Headline', type: 'string', group: 'timeline' }),
    defineField({
      name: 'beforeSteps',
      title: 'Before Steps',
      type: 'array',
      group: 'timeline',
      of: [{ type: 'object', fields: [
        { name: 'time', title: 'Time', type: 'string', description: 'e.g. "2-3 hours"' },
        { name: 'description', title: 'Description', type: 'string' },
      ] }],
    }),
    defineField({
      name: 'afterSteps',
      title: 'After Steps',
      type: 'array',
      group: 'timeline',
      of: [{ type: 'object', fields: [
        { name: 'time', title: 'Time', type: 'string', description: 'e.g. "5 minutes"' },
        { name: 'description', title: 'Description', type: 'string' },
      ] }],
    }),
    defineField({ name: 'beforeTotal', title: 'Before Total Time', type: 'string', group: 'timeline' }),
    defineField({ name: 'afterTotal', title: 'After Total Time', type: 'string', group: 'timeline' }),

    /* ── Features ── */
    defineField({ name: 'featuresH2', title: 'Features Section Headline', type: 'string', group: 'features' }),
    defineField({
      name: 'featureHighlights',
      title: 'Feature Highlights',
      type: 'array',
      group: 'features',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'bullets', title: 'Bullets', type: 'blockContent' },
      ] }],
    }),

    /* ── Results ── */
    defineField({ name: 'resultsH2', title: 'Results Headline', type: 'string', group: 'results' }),
    defineField({
      name: 'resultMetrics',
      title: 'Result Metrics',
      type: 'array',
      group: 'results',
      of: [{ type: 'object', fields: [
        { name: 'value', title: 'Value', type: 'string', description: 'e.g. "10x"' },
        { name: 'label', title: 'Label', type: 'string', description: 'e.g. "Faster Analysis"' },
        { name: 'description', title: 'Description', type: 'string' },
      ] }],
      validation: (r) => r.max(3),
    }),
    defineField({ name: 'specializationH2', title: 'Specialization Headline', type: 'string', group: 'results' }),
    defineField({
      name: 'specializations',
      title: 'Industry Specializations',
      type: 'array',
      group: 'results',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'bullets', title: 'Bullets', type: 'blockContent' },
      ] }],
      validation: (r) => r.max(3),
    }),

    /* ── Social Proof ── */
    defineField({ name: 'testimonialQuote', title: 'Testimonial Quote', type: 'text', group: 'social' }),
    defineField({ name: 'testimonialAttribution', title: 'Attribution', type: 'string', group: 'social', description: 'e.g. "Jane Doe, VP of Research at Acme Capital"' }),
    defineField({ name: 'technologyBullets', title: 'Technology Highlights', type: 'blockContent', group: 'social' }),
    defineField({ name: 'competitiveEdgeBullets', title: 'Competitive Edge Highlights', type: 'blockContent', group: 'social' }),

    /* ── CTA ── */
    defineField({ name: 'ctaH2', title: 'CTA Headline', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaBody', title: 'CTA Body', type: 'text', group: 'cta' }),
    defineField({ name: 'ctaPrimaryLabel', title: 'Primary CTA Label', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaSecondaryLabel', title: 'Secondary CTA Label', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaTertiaryLabel', title: 'Tertiary CTA Label', type: 'string', group: 'cta' }),

    /* ── Relations ── */
    defineField({ name: 'relatedFeatures', title: 'Related Features', type: 'array', of: [{ type: 'reference', to: [{ type: 'platformFeature' }] }], group: 'relations' }),
    defineField({ name: 'relatedCaseStudies', title: 'Related Case Studies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }], group: 'relations' }),
    defineField({ name: 'relatedFirmTypes', title: 'Related Firm Types', type: 'array', of: [{ type: 'reference', to: [{ type: 'firmType' }] }], group: 'relations' }),

    /* ── SEO ── */
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seoGroup' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'eyebrow', media: 'heroImage' },
  },
})
