import { defineType, defineField } from 'sanity'

export const thankYouContactPage = defineType({
  name: 'thankYouContactPage',
  title: 'Thank You Contact Page',
  type: 'document',
  fields: [
    defineField({
      name: 'heroHeading',
      title: 'Hero Heading',
      type: 'string',
      description: 'Main heading displayed in the hero section',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroBody',
      title: 'Hero Body Text',
      type: 'text',
      rows: 4,
      description: 'Body text displayed below the heading',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'Text displayed on the call-to-action button',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'ctaUrl',
      title: 'CTA Button URL',
      type: 'url',
      description: 'URL the CTA button links to',
      validation: (r) => r.required().uri({ allowRelative: true, scheme: ['http', 'https'] }),
    }),
    defineField({
      name: 'heroImageUrl',
      title: 'Hero Image URL',
      type: 'string',
      description: 'Path to the hero image (e.g. /webflow-images/...)',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'heroImageAlt',
      title: 'Hero Image Alt Text',
      type: 'string',
      description: 'Alt text for the hero image',
    }),
    defineField({
      name: 'seo',
      title: 'SEO',
      type: 'seo',
    }),
  ],
  preview: {
    select: { title: 'heroHeading' },
  },
})
