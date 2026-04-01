import { defineType, defineField } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'content', title: 'Content' },
    { name: 'stats', title: 'Stats & Metrics' },
    { name: 'socialProof', title: 'Social Proof' },
    { name: 'related', title: 'Related' },
    { name: 'seo', title: 'SEO' },
  ],
  fields: [
    /* ── Hero ── */
    defineField({
      name: 'title',
      title: 'Company / Case Study Name',
      type: 'string',
      group: 'hero',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      group: 'hero',
      options: { source: 'title' },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Publish Date',
      type: 'datetime',
      group: 'hero',
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'reference',
      to: [{ type: 'caseStudyCategory' }],
      group: 'hero',
    }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      group: 'hero',
      options: {
        list: [
          'Private Equity',
          'Venture Capital',
          'Private Credit',
          'Hedge Fund',
          'Asset Management',
          'Investment Banking',
          'Consulting',
          'Legal',
          'Other',
        ],
      },
    }),
    defineField({
      name: 'firmSize',
      title: 'Firm Size / AUM Range',
      type: 'string',
      group: 'hero',
      options: {
        list: ['< $500M', '$500M - $1B', '$1B - $5B', '$5B - $20B', '$20B+'],
      },
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
      group: 'hero',
    }),
    defineField({
      name: 'heroDescription',
      title: 'Hero Description',
      type: 'text',
      rows: 4,
      group: 'hero',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero / Cover Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      description: 'Large hero image displayed below the title',
    }),
    defineField({
      name: 'thumbnail',
      title: 'Thumbnail Image',
      type: 'image',
      options: { hotspot: true },
      group: 'hero',
      description: 'Card thumbnail used in listing pages',
    }),
    defineField({
      name: 'excerpt',
      title: 'Card Preview Text',
      type: 'text',
      rows: 3,
      group: 'hero',
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'isFeatured',
      title: 'Feature in Top Slot',
      type: 'boolean',
      group: 'hero',
      initialValue: false,
    }),
    defineField({
      name: 'isFeaturedGrid',
      title: 'Feature in 3-Card Grid',
      type: 'boolean',
      group: 'hero',
      initialValue: false,
    }),

    /* ── Stats & Metrics ── */
    defineField({
      name: 'statsLight',
      title: 'Statistics (Light Box)',
      type: 'object',
      group: 'stats',
      fields: [
        {
          name: 'context',
          title: 'Context Label',
          type: 'string',
        },
        {
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [{ type: 'stat' }],
          validation: (r) => r.max(2),
        },
      ],
    }),
    defineField({
      name: 'statsDark',
      title: 'Statistics (Dark Box)',
      type: 'object',
      group: 'stats',
      fields: [
        {
          name: 'context',
          title: 'Context Label',
          type: 'string',
        },
        {
          name: 'stats',
          title: 'Stats',
          type: 'array',
          of: [{ type: 'stat' }],
          validation: (r) => r.max(2),
        },
      ],
    }),

    /* ── Content ── */
    defineField({
      name: 'body',
      title: 'Main Case Study Content',
      type: 'blockContent',
      group: 'content',
    }),

    /* ── Social Proof ── */
    defineField({
      name: 'pullQuotes',
      title: 'Pull Quotes',
      type: 'array',
      of: [{ type: 'testimonialRef' }],
      group: 'socialProof',
    }),
    defineField({
      name: 'testimonialQuote',
      title: 'Inline Testimonial Quote',
      type: 'text',
      rows: 4,
      group: 'socialProof',
      description: 'A standalone quote displayed as a callout block',
    }),
    defineField({
      name: 'testimonialAttribution',
      title: 'Inline Testimonial Attribution',
      type: 'string',
      group: 'socialProof',
      description: 'e.g. "Portfolio Manager, $4B Hedge Fund"',
    }),

    /* ── Related ── */
    defineField({
      name: 'relatedFirmType',
      title: 'Related Firm Type',
      type: 'reference',
      to: [{ type: 'firmType' }],
      group: 'related',
    }),
    defineField({
      name: 'relatedUseCases',
      title: 'Related Use Cases',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'useCase' }] }],
      group: 'related',
    }),
    defineField({
      name: 'relatedFeatures',
      title: 'Related Features',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'platformFeature' }] }],
      group: 'related',
    }),

    /* ── SEO ── */
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
      group: 'seo',
    }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'industry', media: 'thumbnail' },
  },
})
