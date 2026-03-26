import { defineType, defineField } from 'sanity'

export const enterpriseSecurityCompliancePage = defineType({
  name: 'enterpriseSecurityCompliancePage',
  title: 'Enterprise Security & Compliance Page',
  type: 'document',
  fields: [
    defineField({ name: 'title', title: 'Page Title', type: 'string' }),
    defineField({ name: 'description', title: 'Meta Description', type: 'text', rows: 3 }),

    // Hero section
    defineField({ name: 'heroHeadline', title: 'Hero Headline', type: 'string', description: 'Main h1 heading' }),
    defineField({ name: 'heroSubtext', title: 'Hero Subtext', type: 'text', description: 'Paragraph below the headline' }),
    defineField({ name: 'heroPrimaryCta', title: 'Hero Primary CTA', type: 'cta' }),
    defineField({ name: 'heroSecondaryCta', title: 'Hero Secondary CTA', type: 'cta' }),

    // USP boxes below hero
    defineField({
      name: 'heroUsps',
      title: 'Hero USP Boxes',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
        ],
      }],
    }),

    // Core Security Pillars section
    defineField({ name: 'pillarsEyebrow', title: 'Pillars Section Eyebrow', type: 'string', description: 'e.g. "Core Security Pillars"' }),
    defineField({
      name: 'pillars',
      title: 'Security Pillars',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'title', title: 'Title', type: 'string' }),
          defineField({ name: 'description', title: 'Description', type: 'text' }),
          defineField({ name: 'image', title: 'Image', type: 'image', options: { hotspot: true } }),
          defineField({ name: 'imageAlt', title: 'Image Alt Text', type: 'string' }),
        ],
      }],
    }),

    // FAQ section
    defineField({ name: 'faqHeading', title: 'FAQ Heading', type: 'string' }),
    defineField({
      name: 'faqs',
      title: 'FAQ Items',
      type: 'array',
      of: [{
        type: 'object',
        fields: [
          defineField({ name: 'question', title: 'Question', type: 'string' }),
          defineField({ name: 'answer', title: 'Answer', type: 'text', rows: 5 }),
        ],
      }],
    }),

    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
})
