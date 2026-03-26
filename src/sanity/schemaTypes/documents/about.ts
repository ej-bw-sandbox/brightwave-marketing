import { defineType, defineField } from 'sanity'

export const aboutPage = defineType({
  name: 'aboutPage',
  title: 'About Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'storyLabel', title: 'Story Section Label', type: 'string', description: 'e.g. "Our Story"' }),
    defineField({ name: 'story', title: 'Our Story', type: 'blockContent' }),
    defineField({ name: 'missionLabel', title: 'Mission Section Label', type: 'string', description: 'e.g. "Our Mission"' }),
    defineField({ name: 'mission', title: 'Mission Statement', type: 'text', rows: 4 }),
    defineField({ name: 'foundersLabel', title: 'Founders Section Label', type: 'string', description: 'e.g. "Founders"' }),
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
        { name: 'sectionTitle', title: 'Section Title', type: 'string', description: 'e.g. "Be part of Brightwave"' },
        { name: 'subtitle', title: 'Subtitle', type: 'string', description: 'e.g. "For Professionals"' },
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'description', title: 'Description', type: 'text' },
        { name: 'ctaLabel', title: 'CTA Button Label', type: 'string', description: 'e.g. "View Open Positions"' },
        { name: 'joinLabel', title: 'Join Team Button Label', type: 'string', description: 'e.g. "Join our team" / "Join the team"' },
        { name: 'cta', title: 'CTA', type: 'cta' },
        { name: 'jobBoardUrl', title: 'External Job Board URL', type: 'url' },
      ],
    }),
    defineField({
      name: 'investmentCta',
      title: 'Investment Firms CTA',
      type: 'object',
      fields: [
        { name: 'subtitle', title: 'Subtitle', type: 'string', description: 'e.g. "For Investment Firms"' },
        { name: 'headline', title: 'Headline', type: 'string' },
        { name: 'primaryCta', title: 'Primary CTA', type: 'cta' },
        { name: 'secondaryCta', title: 'Secondary CTA', type: 'cta' },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'About Page' }),
  },
})
