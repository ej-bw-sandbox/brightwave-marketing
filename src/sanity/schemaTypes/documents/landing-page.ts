import { defineType, defineField } from 'sanity'

export const landingPage = defineType({
  name: 'landingPage',
  title: 'Landing Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Internal Title', type: 'string', validation: (r) => r.required() }),
    defineField({ name: 'slug', title: 'Slug', type: 'slug', options: { source: 'title' }, validation: (r) => r.required() }),
    defineField({ name: 'heroTitle', title: 'Hero Title', type: 'blockContent' }),
    defineField({ name: 'heroDescription', title: 'Hero Description', type: 'text' }),
    defineField({ name: 'heroProductImage', title: 'Product Image', type: 'image', options: { hotspot: true } }),
    defineField({ name: 'hubspotFormId', title: 'HubSpot Form ID', type: 'string' }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [{ type: 'object', fields: [
        { name: 'title', title: 'Title', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
      ] }],
      validation: (r) => r.max(5),
    }),
    defineField({ name: 'stepProductImage', title: 'Steps Section Image', type: 'image' }),
    defineField({ name: 'testimonialRole', title: 'Testimonial Role', type: 'string' }),
    defineField({ name: 'testimonialText', title: 'Testimonial Text', type: 'text' }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'title' },
  },
})
