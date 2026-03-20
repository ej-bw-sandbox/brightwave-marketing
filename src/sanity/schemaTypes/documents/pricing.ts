import { defineType, defineField } from 'sanity'

export const pricingPage = defineType({
  name: 'pricingPage',
  title: 'Pricing Page',
  type: 'document',
  fields: [
    defineField({ name: 'headline', title: 'Headline', type: 'string' }),
    defineField({ name: 'subheadline', title: 'Subheadline', type: 'text' }),
    defineField({
      name: 'productSelector',
      title: 'Product Options',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Toggle options, e.g. ["Private Markets", "Public Markets"]',
    }),
    defineField({
      name: 'billingToggle',
      title: 'Show Billing Toggle',
      type: 'boolean',
      initialValue: true,
      description: 'Monthly/Annual toggle',
    }),
    defineField({
      name: 'plans',
      title: 'Pricing Plans',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'pricingPlan',
          fields: [
            { name: 'name', title: 'Plan Name', type: 'string', validation: (r) => r.required() },
            { name: 'description', title: 'Description', type: 'text' },
            { name: 'priceMonthly', title: 'Monthly Price', type: 'number' },
            { name: 'priceAnnual', title: 'Annual Price', type: 'number' },
            { name: 'priceLabel', title: 'Price Label Override', type: 'string', description: 'e.g. "Contact for Pricing"' },
            { name: 'priceSuffix', title: 'Price Suffix', type: 'string', description: 'e.g. "/month", "/seat per month"' },
            { name: 'userLimit', title: 'User Limit Label', type: 'string', description: 'e.g. "1 User", "Up to 10 Users"' },
            { name: 'isFeatured', title: 'Featured/Most Popular', type: 'boolean', initialValue: false },
            { name: 'features', title: 'Feature List', type: 'array', of: [{ type: 'string' }] },
            { name: 'cta', title: 'CTA', type: 'cta' },
            { name: 'trialNote', title: 'Trial Note', type: 'string', description: 'e.g. "7-day free trial"' },
            { name: 'product', title: 'Product', type: 'string', description: 'Which product toggle this plan belongs to' },
          ],
          preview: {
            select: { title: 'name', subtitle: 'priceLabel' },
          },
        },
      ],
    }),
    defineField({
      name: 'faq',
      title: 'FAQ Items',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'faqItem',
          fields: [
            { name: 'question', title: 'Question', type: 'string', validation: (r) => r.required() },
            { name: 'answer', title: 'Answer', type: 'blockContent' },
          ],
          preview: { select: { title: 'question' } },
        },
      ],
    }),
    defineField({ name: 'seo', title: 'SEO', type: 'seo' }),
  ],
  preview: {
    prepare: () => ({ title: 'Pricing Page' }),
  },
})
