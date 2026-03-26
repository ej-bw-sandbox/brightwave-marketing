import { defineType, defineField } from 'sanity'

export const contactPage = defineType({
  name: 'contactPage',
  title: 'Contact Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'supportingText', title: 'Supporting Text', type: 'text', rows: 3 }),
    defineField({
      name: 'linkedinUrl',
      title: 'LinkedIn URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'twitterUrl',
      title: 'Twitter / X URL',
      type: 'url',
      validation: (rule) => rule.uri({ scheme: ['https'] }),
    }),
    defineField({
      name: 'recentBlogsSectionTitle',
      title: 'Recent Blogs Section Title',
      type: 'string',
    }),
    defineField({
      name: 'latestPostsSectionTitle',
      title: 'Latest Posts Section Title',
      type: 'string',
    }),
    defineField({
      name: 'readMoreLabel',
      title: 'Read More CTA Label',
      type: 'string',
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'headline' },
  },
})
