import { defineType, defineField } from 'sanity'

export const comparisonCategory = defineType({
  name: 'comparisonCategory',
  title: 'Comparison Category',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
  ],
})
