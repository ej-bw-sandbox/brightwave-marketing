import { defineType, defineField } from 'sanity'

export const comparison = defineType({
  name: 'comparison',
  title: 'Comparison Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'competitorName' },
      validation: (r) => r.required(),
      description: 'URL will be /comparisons/[slug]',
    }),
    defineField({ name: 'publishedAt', title: 'Publish Date', type: 'datetime' }),
    defineField({ name: 'competitorName', title: 'Competitor Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'competitorLogo', title: 'Competitor Logo', type: 'image' }),
    defineField({ name: 'competitorIcon', title: 'Competitor Small Icon', type: 'image' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 3 }),
    defineField({
      name: 'heroDescriptionList',
      title: 'Hero Description List',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Bullet list shown below the hero description',
    }),
    defineField({ name: 'comparisonCategory', title: 'Category', type: 'reference', to: [{ type: 'comparisonCategory' }] }),
    defineField({ name: 'stats', title: 'Comparison Statistics', type: 'array', of: [{ type: 'stat' }], validation: (r) => r.max(3) }),
    defineField({
      name: 'comparisonTable',
      title: 'Feature Comparison Table',
      type: 'array',
      of: [{
        type: 'object',
        name: 'comparisonRow',
        fields: [
          { name: 'feature', title: 'Feature', type: 'string' },
          { name: 'category', title: 'Category', type: 'string' },
          { name: 'tooltip', title: 'Tooltip Text', type: 'text', rows: 2, description: 'Info tooltip shown on hover' },
          { name: 'brightwaveValue', title: 'Brightwave', type: 'string', options: { list: ['yes', 'no', 'partial', 'superior'] } },
          { name: 'brightwaveText', title: 'Brightwave Custom Text', type: 'string', description: 'Optional text instead of icon' },
          { name: 'competitorValue', title: 'Competitor', type: 'string', options: { list: ['yes', 'no', 'partial', 'limited'] } },
          { name: 'competitorText', title: 'Competitor Custom Text', type: 'string', description: 'Optional text instead of icon' },
          { name: 'note', title: 'Note', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'contentBlocks',
      title: 'Content Blocks',
      type: 'array',
      of: [{
        type: 'object',
        name: 'contentBlock',
        fields: [
          { name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() },
          { name: 'text', title: 'Body (plain text)', type: 'text', rows: 4 },
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
          { name: 'icon', title: 'Icon', type: 'image', description: 'Small icon overlaid on the image' },
          { name: 'iconLabel', title: 'Icon Label', type: 'string', description: 'Short label displayed near icon overlay' },
        ],
        preview: {
          select: { title: 'title' },
        },
      }],
    }),
    defineField({
      name: 'useCaseFitItems',
      title: 'Use Case Fit Items',
      type: 'array',
      description: '"With Brightwave, You Can..." benefit items',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() },
          { name: 'description', title: 'Description', type: 'text', rows: 3 },
        ],
      }],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: 'faqs',
      title: 'FAQs',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() },
          { name: 'answer', title: 'Answer', type: 'text', rows: 5 },
        ],
      }],
    }),
    defineField({ name: 'testimonial', title: 'Testimonial', type: 'testimonialRef' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'competitorName', media: 'competitorLogo' },
  },
})
