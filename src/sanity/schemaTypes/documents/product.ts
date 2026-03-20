import { defineType, defineField } from 'sanity'

export const product = defineType({
  name: 'product',
  title: 'Product',
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
      name: 'tagline',
      title: 'Tagline',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'blockContent',
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'features',
      title: 'Features',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'platformFeature' }] }],
    }),
    defineField({
      name: 'roles',
      title: 'Roles',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'icpPage' }] }],
    }),
    defineField({
      name: 'industries',
      title: 'Industries / Firm Types',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'firmType' }] }],
    }),
    defineField({
      name: 'useCases',
      title: 'Use Cases',
      type: 'array',
      of: [{ type: 'reference', to: [{ type: 'useCase' }] }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title', subtitle: 'tagline', media: 'heroImage' },
  },
})
