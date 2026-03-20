import { defineType, defineField } from 'sanity'

export const productPage = defineType({
  name: 'productPage',
  title: 'Product Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Internal Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'headline', title: 'Hero Headline', type: 'string' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text', rows: 4 }),
    defineField({ name: 'heroImage', title: 'Hero Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'heroCtas', title: 'Hero CTAs', type: 'array', of: [{ type: 'cta' }] }),
    defineField({ name: 'metrics', title: 'Key Metrics', type: 'array', of: [{ type: 'stat' }] }),
    defineField({
      name: 'personaSections',
      title: 'Persona Sections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'persona', title: 'Persona Title', type: 'string' },
          { name: 'painPoint', title: 'Pain Point Description', type: 'text' },
        ],
      }],
    }),
    defineField({
      name: 'features',
      title: 'Feature Sections',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Feature Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'blockContent' },
          { name: 'image', title: 'Screenshot/Image', type: 'image', options: { hotspot: true } },
        ],
      }],
    }),
    defineField({
      name: 'useCaseSlider',
      title: 'Use Case Scenarios',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'number', title: 'Number', type: 'string' },
          { name: 'title', title: 'Scenario Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'whyBrightwave', title: 'Why Brightwave Works', type: 'text' },
        ],
      }],
    }),
    defineField({ name: 'testimonials', title: 'Testimonials', type: 'array', of: [{ type: 'testimonialRef' }] }),
    defineField({ name: 'bottomCta', title: 'Bottom CTA', type: 'object', fields: [
      { name: 'headline', title: 'Headline', type: 'string' },
      { name: 'ctas', title: 'CTAs', type: 'array', of: [{ type: 'cta' }] },
    ] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
