import { defineType, defineField } from 'sanity'

export const newsPost = defineType({
  name: 'newsPost',
  title: 'News Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'publishedAt', title: 'Published Date', type: 'datetime', validation: (r) => r.required() }),
    defineField({ name: 'author', title: 'Author', type: 'reference', to: [{ type: 'author' }] }),
    defineField({ name: 'excerpt', title: 'Card Description', type: 'text', rows: 3 }),
    defineField({ name: 'featuredImage', title: 'Featured Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'pressLogo', title: 'Press/Publication Logo', type: 'image' }),
    defineField({ name: 'body', title: 'Content', type: 'blockContent' }),
    defineField({ name: 'externalUrl', title: 'External Link', type: 'url', description: 'Link to external press coverage' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  orderings: [
    { title: 'Date (Newest)', name: 'dateDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'featuredImage' },
  },
})
