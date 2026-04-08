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
      name: 'contactForm',
      title: 'Contact Form',
      type: 'reference',
      to: [{ type: 'contactForm' }],
      description: 'The contact form to display on this page',
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
    defineField({
      name: 'readMoreUrl',
      title: 'Read More URL',
      type: 'string',
      description: 'URL for the Read More CTA (defaults to /blog)',
    }),
    defineField({
      name: 'linkedinLabel',
      title: 'LinkedIn Link Label',
      type: 'string',
      description: 'Display label for the LinkedIn social link (defaults to LinkedIn)',
    }),
    defineField({
      name: 'emptyStateText',
      title: 'Empty State Text',
      type: 'string',
      description: 'Message shown when no blog/post items are found (defaults to "No items found.")',
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    select: { title: 'headline' },
  },
})
