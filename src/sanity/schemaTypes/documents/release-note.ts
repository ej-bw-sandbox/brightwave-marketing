import { defineType, defineField } from 'sanity'

export const releaseNote = defineType({
  name: 'releaseNote',
  title: 'Release Note',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'releaseDate', title: 'Release Date', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'version', title: 'Version String', type: 'string', description: 'Optional: e.g. "v2.4.0"' }),
    defineField({
      name: 'updateType',
      title: 'Update Type',
      type: 'string',
      options: {
        list: [
          { title: 'Feature', value: 'feature' },
          { title: 'Improvement', value: 'improvement' },
          { title: 'Fix', value: 'fix' },
          { title: 'Multiple', value: 'multiple' },
        ],
      },
      initialValue: 'feature',
    }),
    defineField({ name: 'summary', title: 'Summary / Card Description', type: 'text', rows: 3 }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'body', title: 'Body', type: 'blockContent' }),
    defineField({ name: 'relatedFeatures', title: 'Related Platform Features', type: 'array', of: [{ type: 'reference', to: [{ type: 'platformFeature' }] }] }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  orderings: [
    { title: 'Release Date (Newest)', name: 'dateDesc', by: [{ field: 'releaseDate', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'releaseDate', media: 'featuredImage' },
  },
})
