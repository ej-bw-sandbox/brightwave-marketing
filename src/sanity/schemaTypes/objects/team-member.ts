import { defineType } from 'sanity'

export const teamMember = defineType({
  name: 'teamMember',
  title: 'Team Member',
  type: 'object',
  fields: [
    { name: 'name', title: 'Name', type: 'string', validation: (r) => r.required() },
    { name: 'role', title: 'Role/Title', type: 'string', validation: (r) => r.required() },
    { name: 'prefix', title: 'Prefix', type: 'string', description: 'e.g. "Founder & CEO"' },
    { name: 'bio', title: 'Bio', type: 'text', rows: 6 },
    { name: 'image', title: 'Photo', type: 'image', options: { hotspot: true } },
    { name: 'linkedin', title: 'LinkedIn URL', type: 'url' },
    { name: 'twitter', title: 'Twitter/X URL', type: 'url' },
  ],
  preview: {
    select: { title: 'name', subtitle: 'role', media: 'image' },
  },
})
