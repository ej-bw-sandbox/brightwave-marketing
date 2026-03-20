import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'story', title: 'Our Story', type: 'blockContent' }),
    defineField({ name: 'mission', title: 'Mission Statement', type: 'text', rows: 4 }),
    defineField({
      name: 'teamMembers',
      title: 'Team Members',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'teamMember',
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
        },
      ],
    }),
    defineField({
      name: 'careersCta',
      title: 'Careers Section',
      type: 'object',
      fields: [
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'cta', title: 'CTA', type: 'cta' },
        { name: 'jobBoardUrl', title: 'External Job Board URL', type: 'url' },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})
