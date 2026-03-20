import { defineType, defineField } from 'sanity'

export const contentPost = defineType({
  name: 'contentPost',
  title: 'Content Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: { source: 'title', maxLength: 96 },
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Blog', value: 'blog' },
          { title: 'News', value: 'news' },
          { title: 'Engineering Log', value: 'engineering-log' },
          { title: 'Release Notes', value: 'release-notes' },
        ],
        layout: 'radio',
      },
      validation: (r) => r.required(),
      initialValue: 'blog',
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
    }),
    defineField({
      name: 'excerpt',
      title: 'Excerpt',
      type: 'text',
      rows: 3,
      validation: (r) => r.max(300),
    }),
    defineField({
      name: 'coverImage',
      title: 'Cover Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'body',
      title: 'Body',
      type: 'blockContent',
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  orderings: [
    {
      title: 'Published Date (Newest)',
      name: 'publishedAtDesc',
      by: [{ field: 'publishedAt', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'category',
      media: 'coverImage',
    },
    prepare({ title, subtitle, media }) {
      const labels: Record<string, string> = {
        blog: 'Blog',
        news: 'News',
        'engineering-log': 'Engineering Log',
        'release-notes': 'Release Notes',
      }
      return {
        title: title || 'Untitled',
        subtitle: labels[subtitle as string] || subtitle,
        media,
      }
    },
  },
})
