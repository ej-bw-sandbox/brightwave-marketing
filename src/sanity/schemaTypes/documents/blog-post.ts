import { defineType, defineField } from 'sanity'

export const blogPost = defineType({
  name: 'blogPost',
  title: 'Blog Post',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string', validation: (r) => r.required() }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published Date',
      type: 'datetime',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'author',
      title: 'Author',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'categories',
      title: 'Categories',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'category' }] }],
    }),
    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: { layout: 'tags' },
    }),
    defineField({
      name: 'postType',
      title: 'Post Type',
      type: 'string',
      options: {
        list: [
          { title: 'Article', value: 'article' },
          { title: 'Insight', value: 'insight' },
          { title: 'Guide', value: 'guide' },
          { title: 'Interview', value: 'interview' },
        ],
      },
      initialValue: 'article',
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt / Card Description',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(200),
    }),
    defineField({
      name: 'featuredImage',
      title: 'Featured Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
      description: 'Full article content using Portable Text',
    }),
    defineField({
      name: 'externalUrl',
      title: 'External Link',
      type: 'url',
      description: 'If set, card links to external URL instead of internal post page',
    }),
    defineField({
      name: 'relatedUseCases',
      title: 'Related Use Cases',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'useCase' }] }],
    }),
    defineField({
      name: 'relatedFeatures',
      title: 'Related Features',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'platformFeature' }] }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  orderings: [
    { title: 'Published Date (Newest)', name: 'publishedAtDesc', by: [{ field: 'publishedAt', direction: 'desc' }] },
  ],
  preview: {
    select: { title: 'title', subtitle: 'publishedAt', media: 'featuredImage' },
  },
})
