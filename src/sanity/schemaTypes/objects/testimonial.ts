import { defineType } from 'sanity'

export const testimonialRef = defineType({
  name: 'testimonialRef',
  title: 'Testimonial Reference',
  type: 'reference',
  to: [{ type: 'testimonial' }],
})
