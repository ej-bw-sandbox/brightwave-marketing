import { defineType, defineField } from 'sanity'

export const icpPage = defineType({
  name: 'icpPage',
  title: 'ICP / Persona Page',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero' },
    { name: 'value', title: 'Value Proposition' },
    { name: 'capabilities', title: 'Capabilities' },
    { name: 'workflow', title: 'Workflow' },
    { name: 'metrics', title: 'Metrics' },
    { name: 'security', title: 'Security' },
    { name: 'social', title: 'Social Proof' },
    { name: 'cta', title: 'CTA' },
    { name: 'relations', title: 'Relations' },
    { name: 'seoGroup', title: 'SEO' },
  ],
  fields: [
    defineField({ name: 'title', title: 'Persona Name', type: 'string', validation: (r) => r.required(), description: 'e.g. "Investment Analysts", "Portfolio Managers"' }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'product',
      title: 'Product',
      type: 'string',
      description: 'Which product this role is associated with',
      options: {
        list: [
          { title: 'Private Markets', value: 'private-markets' },
        ],
        layout: 'dropdown',
      },
    }),
    defineField({ name: 'menuLabel', title: 'Menu Label', type: 'string', description: 'Short label for navigation menus (e.g. "Analyst", "Managing Director")' }),
    defineField({ name: 'excerpt', title: 'Card Excerpt', type: 'text', rows: 3, description: 'Short description shown on the index/listing page card' }),

    // Hero group
    defineField({ name: 'h1', title: 'H1', type: 'string', group: 'hero' }),
    defineField({ name: 'heroTagline', title: 'Tagline', type: 'string', group: 'hero' }),
    defineField({ name: 'heroBody', title: 'Hero Body', type: 'blockContent', group: 'hero' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true }, group: 'hero' }),

    // Value group
    defineField({ name: 'valueH2', title: 'Value Section Headline', type: 'string', group: 'value' }),
    defineField({
      name: 'valuePillars',
      title: 'Value Pillars',
      type: 'array',
      group: 'value',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Pillar Title', type: 'string' },
        { name: 'bullets', title: 'Bullets', type: 'blockContent' },
      ] }],
      validation: (r) => r.max(3),
    }),

    // Capabilities group
    defineField({ name: 'capabilitiesH2', title: 'Capabilities Headline', type: 'string', group: 'capabilities' }),
    defineField({ name: 'capabilitiesSubtitle', title: 'Capabilities Subtitle', type: 'string', group: 'capabilities' }),
    defineField({
      name: 'capabilities',
      title: 'Capabilities',
      type: 'array',
      group: 'capabilities',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'intro', title: 'Intro Line', type: 'string', description: 'Short intro sentence displayed before the feature list' },
        { name: 'features', title: 'Features', type: 'blockContent', description: 'Feature bullet list for this capability' },
        { name: 'content', title: 'Content (legacy)', type: 'blockContent', description: 'Legacy content field — use Features instead for new content' },
      ] }],
      validation: (r) => r.max(3),
    }),

    // Workflow group
    defineField({ name: 'workflowH2', title: 'Workflow Section Headline', type: 'string', group: 'workflow' }),
    defineField({
      name: 'workflows',
      title: 'Workflow Comparisons',
      type: 'array',
      group: 'workflow',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Workflow Title', type: 'string' },
        { name: 'before', title: 'Before', type: 'string' },
        { name: 'after', title: 'After', type: 'string' },
      ] }],
      validation: (r) => r.max(3),
    }),

    // Metrics group
    defineField({ name: 'metricsH2', title: 'Metrics Headline', type: 'string', group: 'metrics' }),
    defineField({ name: 'metricsContent', title: 'Metrics Content', type: 'blockContent', group: 'metrics' }),

    // Security group
    defineField({ name: 'securityH2', title: 'Security Headline', type: 'string', group: 'security' }),
    defineField({ name: 'securityContent', title: 'Security Content', type: 'blockContent', group: 'security' }),

    // Social group
    defineField({ name: 'socialH2', title: 'Social Proof Headline', type: 'string', group: 'social' }),
    defineField({ name: 'testimonialQuote', title: 'Testimonial Quote', type: 'text', group: 'social' }),
    defineField({ name: 'testimonialAttribution', title: 'Testimonial Attribution', type: 'string', group: 'social', description: 'e.g. "Jane Doe, VP of Research at Acme Capital"' }),
    defineField({ name: 'socialContent', title: 'Social Proof Content', type: 'blockContent', group: 'social' }),
    defineField({ name: 'pricingContent', title: 'Pricing Content', type: 'blockContent', group: 'social' }),
    defineField({ name: 'purposeBuiltContent', title: 'Purpose Built Content', type: 'blockContent', group: 'social' }),

    // CTA group
    defineField({ name: 'ctaH2', title: 'CTA Headline', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaSubheadline', title: 'CTA Sub-headline', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaBody', title: 'CTA Body', type: 'blockContent', group: 'cta' }),
    defineField({ name: 'ctaButtonLabel', title: 'CTA Button Label', type: 'string', group: 'cta' }),
    defineField({ name: 'ctaTagline', title: 'CTA Tagline', type: 'string', group: 'cta' }),

    // Relations
    defineField({ name: 'relatedUseCases', title: 'Related Use Cases', type: 'array', of: [{ type: 'reference', to: [{ type: 'useCase' }] }], group: 'relations' }),
    defineField({ name: 'relatedCaseStudies', title: 'Related Case Studies', type: 'array', of: [{ type: 'reference', to: [{ type: 'caseStudy' }] }], group: 'relations' }),
    defineField({ name: 'relatedFeatures', title: 'Related Features', type: 'array', of: [{ type: 'reference', to: [{ type: 'platformFeature' }] }], group: 'relations' }),

    // SEO
    defineField({ name: 'seo', title: 'SEO', type: 'seo', group: 'seoGroup' }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
