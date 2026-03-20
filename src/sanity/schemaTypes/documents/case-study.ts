import { defineType, defineField } from 'sanity'

export const caseStudy = defineType({
  name: 'caseStudy',
  title: 'Case Study',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Company / Case Study Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'publishedAt', title: 'Publish Date', type: 'datetime' }),
    defineField({ name: 'companyLogo', title: 'Company Logo', type: 'image' }),
    defineField({ name: 'thumbnail', title: 'Thumbnail Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'excerpt', title: 'Card Preview Text', type: 'text', rows: 3, validation: (r) => r.max(200) }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 4 }),
    defineField({ name: 'category', title: 'Category', type: 'reference', to: [{ type: 'caseStudyCategory' }] }),
    defineField({
      name: 'industry',
      title: 'Industry',
      type: 'string',
      options: {
        list: ['Private Equity', 'Venture Capital', 'Private Credit', 'Hedge Fund',
               'Asset Management', 'Investment Banking', 'Consulting', 'Legal', 'Other'],
      },
    }),
    defineField({
      name: 'firmSize',
      title: 'Firm Size / AUM Range',
      type: 'string',
      options: { list: ['< $500M', '$500M - $1B', '$1B - $5B', '$5B - $20B', '$20B+'] },
    }),
    defineField({ name: 'isFeatured', title: 'Feature in Top Slot', type: 'boolean', initialValue: false }),
    defineField({ name: 'isFeaturedGrid', title: 'Feature in 3-Card Grid', type: 'boolean', initialValue: false }),
    defineField({
      name: 'statsLight',
      title: 'Statistics (Light Box)',
      type: 'object',
      fields: [
        { name: 'context', title: 'Context Label', type: 'string' },
        { name: 'stats', title: 'Stats', type: 'array', of: [{ type: 'stat' }], validation: (r) => r.max(2) },
      ],
    }),
    defineField({
      name: 'statsDark',
      title: 'Statistics (Dark Box)',
      type: 'object',
      fields: [
        { name: 'context', title: 'Context Label', type: 'string' },
        { name: 'stats', title: 'Stats', type: 'array', of: [{ type: 'stat' }], validation: (r) => r.max(2) },
      ],
    }),
    defineField({ name: 'body', title: 'Main Case Study Content', type: 'blockContent' }),
    defineField({ name: 'pullQuotes', title: 'Pull Quotes', type: 'array', of: [{ type: 'testimonialRef' }] }),
    defineField({ name: 'relatedFirmType', title: 'Related Firm Type', type: 'reference', to: [{ type: 'firmType' }] }),
    defineField({ name: 'relatedUseCases', title: 'Related Use Cases', type: 'array', of: [{ type: 'reference', to: [{ type: 'useCase' }] }] }),
    defineField({ name: 'relatedFeatures', title: 'Related Features', type: 'array', of: [{ type: 'reference', to: [{ type: 'platformFeature' }] }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'industry', media: 'thumbnail' },
  },
})
