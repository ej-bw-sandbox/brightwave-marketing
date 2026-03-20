import { defineType } from 'sanity'

export const speaker = defineType({
  name: 'speaker',
  title: 'Speaker',
  type: 'object',
  fields: [
    { name: 'name', title: 'Name', type: 'string' },
    { name: 'role', title: 'Role/Title', type: 'string' },
    { name: 'company', title: 'Company', type: 'string' },
    { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'linkedin', title: 'LinkedIn', type: 'url' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'company', media: 'image' },
  },
})
