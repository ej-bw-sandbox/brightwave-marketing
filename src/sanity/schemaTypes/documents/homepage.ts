import { defineType, defineField } from 'sanity'

export const homepage = defineType({
  name: 'homepage',
  title: 'Homepage',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeadline',
      title: 'Hero Headline',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroSubheadline',
      title: 'Hero Subheadline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'heroCtas',
      title: 'Hero CTAs',
      type: 'array',
      of: [{ type: 'cta' }],
      validation: (r) => r.max(2),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image/Video',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'heroVideoUrl',
      title: 'Hero Video URL',
      type: 'url',
      description: 'Optional: replaces hero image with embedded video',
    }),
    defineField({
      name: 'socialProofLogos',
      title: 'Social Proof Logos',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Company Name', type: 'string' },
            { name: 'logo', title: 'Logo', type: 'image' },
            { name: 'url', title: 'Link', type: 'url' },
          ],
        },
      ],
    }),
    defineField({
      name: 'socialProofHeadline',
      title: 'Social Proof Headline',
      type: 'string',
      description: 'e.g. "Featured in renowned publications and trusted by industry leaders."',
    }),
    defineField({
      name: 'metrics',
      title: 'Key Metrics',
      type: 'array',
      of: [{ type: 'stat' }],
      validation: (r) => r.max(4),
    }),
    defineField({
      name: 'featureSections',
      title: 'Feature Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'featureSection',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'image', title: 'Image', type: 'image', options: { hotspot: true } },
            { name: 'icon', title: 'Icon', type: 'string', description: 'Icon identifier from icon set' },
          ],
        },
      ],
    }),
    defineField({
      name: 'beforeAfter',
      title: 'Before/After Section',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'beforeItems', title: 'Before Items', type: 'array', of: [{ type: 'string' }] },
        { name: 'afterItems', title: 'After Items', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'testimonialRef' }],
    }),
    defineField({
      name: 'bottomCta',
      title: 'Bottom CTA Section',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'subheadline', title: 'Subheadline', type: 'string' },
        { name: 'ctas', title: 'CTAs', type: 'array', of: [{ type: 'cta' }] },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
})
