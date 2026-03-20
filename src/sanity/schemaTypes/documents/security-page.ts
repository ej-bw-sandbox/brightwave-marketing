import { defineType, defineField } from 'sanity'

export const securityPage = defineType({
  name: 'securityPage',
  title: 'Security Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Title', type: 'string' }),
    defineField({
      name: 'pageVariant',
      title: 'Page Variant',
      type: 'string',
      options: { list: [{ title: 'Overview (/security)', value: 'overview' }, { title: 'Enterprise (/enterprise-security-compliance)', value: 'enterprise' }] },
      validation: (r) => r.required(),
    }),
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text' }),
    defineField({ name: 'heroCta', title: 'Hero CTA', type: 'cta' }),
    defineField({
      name: 'pillars',
      title: 'Security Pillars',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'title', title: 'Title', type: 'string' },
          { name: 'description', title: 'Description', type: 'text' },
          { name: 'icon', title: 'Icon', type: 'string' },
        ],
      }],
    }),
    defineField({
      name: 'complianceBadges',
      title: 'Compliance Badges',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'label', title: 'Label', type: 'string' },
          { name: 'icon', title: 'Badge Icon', type: 'image' },
        ],
      }],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          { name: 'question', title: 'Question', type: 'string' },
          { name: 'answer', title: 'Answer', type: 'blockContent' },
        ],
      }],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
})
