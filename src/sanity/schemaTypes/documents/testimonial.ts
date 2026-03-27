import { defineType, defineField } from 'sanity'

export const testimonial = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  icon: () => '\u201C',
  fields: [
    defineField({
      name: 'quote',
      title: 'Quote',
      type: 'text',
      rows: 4,
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'authorName',
      title: 'Author Name',
      type: 'string',
      validation: (r) => r.required(),
    }),
    defineField({
      name: 'authorTitle',
      title: 'Author Title',
      type: 'string',
      description: 'e.g. "Portfolio Manager"',
    }),
    defineField({
      name: 'company',
      title: 'Company',
      type: 'string',
      description: 'e.g. "$4B Hedge Fund"',
    }),
    defineField({
      name: 'attribution',
      title: 'Attribution (legacy)',
      type: 'string',
      description:
        'Combined role/company string, e.g. "Portfolio Manager, $4B Hedge Fund". Prefer the separate Author Title + Company fields above.',
    }),
    defineField({
      name: 'authorImage',
      title: 'Author Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'companyLogo',
      title: 'Company Logo',
      type: 'image',
    }),
  ],
  preview: {
    select: {
      title: 'authorName',
      subtitle: 'company',
      media: 'authorImage',
    },
    prepare({ title, subtitle, media }) {
      return {
        title: title || 'Untitled testimonial',
        subtitle: subtitle || '',
        media,
      }
    },
  },
})
