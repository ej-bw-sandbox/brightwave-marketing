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
      description: 'URL will be /vs/[slug]',
    }),
    defineField({ name: 'publishedAt', title: 'Publish Date', type: 'datetime' }),
    defineField({ name: 'competitorName', title: 'Competitor Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'competitorLogo', title: 'Competitor Logo', type: 'image' }),
    defineField({ name: 'competitorIcon', title: 'Competitor Small Icon', type: 'image' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 3 }),
    defineField({ name: 'keyPoints', title: 'Key Points (Hero)', type: 'blockContent' }),
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
          { name: 'brightwaveValue', title: 'Brightwave', type: 'string', options: { list: ['yes', 'no', 'partial', 'superior'] } },
          { name: 'competitorValue', title: 'Competitor', type: 'string', options: { list: ['yes', 'no', 'partial', 'limited'] } },
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
        fields: [
          { name: 'headline', title: 'Headline', type: 'string' },
          { name: 'body', title: 'Body', type: 'blockContent' },
          { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
        ],
      }],
    }),
    defineField({ name: 'testimonial', title: 'Testimonial', type: 'testimonialRef' }),
    defineField({ name: 'differentiators', title: 'Key Differentiators', type: 'array', of: [{ type: 'string' }], description: 'Used in structured data and meta descriptions' }),
    defineField({ name: 'bottomCta', title: 'Bottom CTA', type: 'object', fields: [
      { name: 'headline', title: 'Headline', type: 'string' },
      { name: 'ctas', title: 'CTAs', type: 'array', of: [{ type: 'cta' }] },
    ] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'competitorName', media: 'competitorLogo' },
  },
})
