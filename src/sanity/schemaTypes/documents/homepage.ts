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
      name: 'comparisonSection',
      title: 'Comparison Section (Traditional vs Brightwave)',
      type: 'object',
      fields: [
        {
          name: 'leftLabel',
          title: 'Left Label',
          type: 'string',
          description: 'e.g. "Traditional Process"',
        },
        {
          name: 'leftStats',
          title: 'Left Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Value', type: 'string' },
                { name: 'description', title: 'Description', type: 'string' },
              ],
            },
          ],
        },
        {
          name: 'rightLabel',
          title: 'Right Label',
          type: 'string',
          description: 'e.g. "With Brightwave"',
        },
        {
          name: 'rightStats',
          title: 'Right Stats',
          type: 'array',
          of: [
            {
              type: 'object',
              fields: [
                { name: 'value', title: 'Value', type: 'string' },
                { name: 'description', title: 'Description', type: 'string' },
              ],
            },
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
      name: 'beforeAfter',
      title: 'Before/After Table Section',
      type: 'object',
      fields: [
        { name: 'beforeTitle', title: 'Before Title', type: 'string', description: 'e.g. "Before Brightwave"' },
        { name: 'afterTitle', title: 'After Title', type: 'string', description: 'e.g. "After Brightwave"' },
        { name: 'beforeItems', title: 'Before Items', type: 'array', of: [{ type: 'string' }] },
        { name: 'afterItems', title: 'After Items', type: 'array', of: [{ type: 'string' }] },
      ],
    }),
    defineField({
      name: 'testimonialsSectionLabel',
      title: 'Testimonials Section Label',
      type: 'string',
      description: 'e.g. "Testimonials"',
    }),
    defineField({
      name: 'testimonials',
      title: 'Testimonials',
      type: 'array',
      of: [{ type: 'testimonialRef' }],
    }),
    defineField({
      name: 'exploreSectionTitleLines',
      title: 'Explore Section Title Lines',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {
              name: 'segments',
              title: 'Text Segments',
              type: 'array',
              of: [
                {
                  type: 'object',
                  fields: [
                    { name: 'text', title: 'Text', type: 'string' },
                    {
                      name: 'style',
                      title: 'Style',
                      type: 'string',
                      options: { list: ['accent', 'muted'] },
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
      description: 'Each item is a line; each line has segments with accent or muted styling.',
    }),
    defineField({
      name: 'explorePlatformCards',
      title: 'Explore Platform Cards',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', title: 'Title', type: 'string' },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'lightImage', title: 'Light Mode Image', type: 'string', description: 'Path to light mode illustration' },
            { name: 'darkImage', title: 'Dark Mode Image', type: 'string', description: 'Path to dark mode illustration' },
            { name: 'ctaLabel', title: 'CTA Label', type: 'string' },
            { name: 'ctaUrl', title: 'CTA URL', type: 'string' },
          ],
        },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Homepage' }),
  },
})
