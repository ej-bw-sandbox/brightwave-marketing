import { defineType, defineField } from 'sanity'

export const platformFeature = defineType({
  name: 'platformFeature',
  title: 'Platform Feature',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Feature Name', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({
      name: 'menuLabel',
      title: 'Menu Label',
      type: 'string',
      description: 'Short 1-2 word label for navigation menus (e.g. "Agentic Workflows", "Reports")',
    }),
    defineField({
      name: 'menuCategory',
      title: 'Menu Category',
      type: 'string',
      description: 'Category grouping for the Platform navigation dropdown',
      options: {
        list: [
          { title: 'Analyze', value: 'Analyze' },
          { title: 'Collaborate', value: 'Collaborate' },
          { title: 'Create', value: 'Create' },
          { title: 'Productivity', value: 'Productivity' },
        ],
      },
    }),
    defineField({ name: 'tagline', title: 'Tagline', type: 'string' }),
    defineField({ name: 'heroH1', title: 'Hero H1', type: 'string' }),
    defineField({ name: 'heroBody', title: 'Hero Body', type: 'blockContent' }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroVideo', title: 'Hero Video', type: 'file' }),
    defineField({ name: 'overviewSubtitle', title: 'Overview Subtitle', type: 'string' }),
    defineField({ name: 'techCapabilities', title: 'Tech Capabilities', type: 'blockContent' }),
    defineField({ name: 'securityItems', title: 'Security Items', type: 'blockContent' }),
    defineField({ name: 'stats', title: 'Statistics', type: 'array', of: [{ type: 'stat' }] }),
    defineField({
      name: 'pillars',
      title: 'Feature Pillars',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'icon', title: 'Icon', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'steps',
      title: 'How It Works Steps',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'image', title: 'Image', type: 'image' },
        ],
      }],
    }),
    defineField({ name: 'relatedUseCases', title: 'Related Use Cases', type: 'array', of: [{ type: 'reference', to: [{ type: 'useCase' }] }] }),
    defineField({ name: 'relatedFeatures', title: 'Related Features', type: 'array', of: [{ type: 'reference', to: [{ type: 'platformFeature' }] }] }),
    defineField({ name: 'testimonialQuote', title: 'Testimonial Quote', type: 'text' }),
    defineField({ name: 'testimonialAttribution', title: 'Testimonial Attribution', type: 'string' }),
    defineField({ name: 'socialProofLogos', title: 'Logos', type: 'array', of: [{ type: 'image' }] }),
    defineField({ name: 'ctaHeadline', title: 'CTA Headline', type: 'string' }),
    defineField({ name: 'ctaBody', title: 'CTA Body', type: 'string' }),
    defineField({ name: 'ctaButtons', title: 'CTA Buttons', type: 'array', of: [{ type: 'cta' }] }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Analysis', value: 'analysis' },
          { title: 'Collaboration', value: 'collaboration' },
          { title: 'Reporting', value: 'reporting' },
          { title: 'Data Ingestion', value: 'data-ingestion' },
          { title: 'Security', value: 'security' },
        ],
      },
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'tagline', media: 'heroImage' },
  },
})
