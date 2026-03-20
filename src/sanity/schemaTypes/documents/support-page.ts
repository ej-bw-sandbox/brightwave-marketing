import { defineType, defineField } from 'sanity'

export const supportPage = defineType({
  name: 'supportPage',
  title: 'Support Page',
  type: 'document',
  fields: [
    defineField({
      name: 'headline',
      title: 'Headline',
      type: 'string',
    }),
    defineField({
      name: 'subheadline',
      title: 'Sub-headline',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({
      name: 'supportEmail',
      title: 'Support Email',
      type: 'string',
    }),
    defineField({
      name: 'supportChannels',
      title: 'Support Channels',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'url', title: 'URL', type: 'url' },
          { name: 'icon', title: 'Icon name', type: 'string' },
        ],
      }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'headline' },
    prepare({ title }) {
      return { title: title || 'Support Page' }
    },
  },
})
