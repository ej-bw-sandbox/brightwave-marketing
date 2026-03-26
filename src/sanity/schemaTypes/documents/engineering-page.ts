import { defineType, defineField } from 'sanity'

export const engineeringPage = defineType({
  name: 'engineeringPage',
  title: 'Engineering Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline (H1)', type: 'string' }),
    defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3 }),
    defineField({ name: 'featuredEyebrow', title: 'Featured Card Eyebrow', type: 'string' }),
    defineField({ name: 'searchLabel', title: 'Search Section Label', type: 'string' }),
    defineField({ name: 'searchPlaceholder', title: 'Search Input Placeholder', type: 'string' }),
    defineField({ name: 'sortByLabel', title: 'Sort By Label', type: 'string' }),
    defineField({ name: 'sortByDateLabel', title: 'Sort By Date Label', type: 'string' }),
    defineField({ name: 'sortAscendingLabel', title: 'Sort Ascending Label', type: 'string' }),
    defineField({ name: 'sortDescendingLabel', title: 'Sort Descending Label', type: 'string' }),
    defineField({ name: 'authorLabel', title: 'Author Filter Label', type: 'string' }),
    defineField({ name: 'emptyStateText', title: 'Empty State Text', type: 'string' }),
    defineField({ name: 'formSuccessMessage', title: 'Form Success Message', type: 'string' }),
    defineField({ name: 'formErrorMessage', title: 'Form Error Message', type: 'string' }),
    defineField({
      name: 'ctaTitleWords',
      title: 'CTA Title Words',
      type: 'array',
      description: 'Each word in the CTA title, in order: Step, Into, THe, Future, OF, FiNANCIAL, Research',
      of: [
        {
          type: 'object',
          fields: [
            defineField({ name: 'text', title: 'Word', type: 'string' }),
            defineField({
              name: 'variant',
              title: 'Variant',
              type: 'string',
              options: { list: ['highlight', 'grey'] },
            }),
          ],
          preview: {
            select: { title: 'text', subtitle: 'variant' },
          },
        },
      ],
    }),
    defineField({ name: 'ctaButtonText', title: 'CTA Button Text', type: 'string' }),
    defineField({
      name: 'ctaButtonUrl',
      title: 'CTA Button URL',
      type: 'string',
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'headline' },
  },
})
