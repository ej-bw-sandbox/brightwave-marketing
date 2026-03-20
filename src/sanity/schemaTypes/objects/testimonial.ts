import { defineType } from 'sanity'

export const testimonialRef = defineType({
  name: 'testimonialRef',
  title: 'Testimonial',
  type: 'object',
  fields: [
    { name: 'quote', title: 'Quote', type: 'text', rows: 4, validation: (r) => r.required() },
    { name: 'attribution', title: 'Attribution', type: 'string', description: 'e.g. "Portfolio Manager, $4B Hedge Fund"' },
    { name: 'authorName', title: 'Author Name', type: 'string' },
    { name: 'authorImage', title: 'Author Image', type: 'image', options: { hotspot: true } },
    { name: 'companyLogo', title: 'Company Logo', type: 'image' },
  ],
})
