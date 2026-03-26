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
    defineField({ name: 'dateLabel', title: 'Date Label', type: 'string', description: 'e.g. "March 2024"' }),
    defineField({ name: 'heroCta', title: 'Hero CTA', type: 'cta' }),
    defineField({ name: 'introText', title: 'Intro Text', type: 'text', description: 'Paragraph shown before the pillars section' }),
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
    defineField({ name: 'faqHeading', title: 'FAQ Heading', type: 'string', description: 'Heading above the FAQ accordion' }),
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
    defineField({ name: 'privacyHeading', title: 'Privacy Section Heading', type: 'string' }),
    defineField({ name: 'privacyBody', title: 'Privacy Section Body', type: 'blockContent' }),
    defineField({
      name: 'bottomCta',
      title: 'Bottom CTA',
      type: 'object',
      fields: [
        { name: 'heading', title: 'Heading', type: 'string' },
        { name: 'cta', title: 'CTA Button', type: 'cta' },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
})
